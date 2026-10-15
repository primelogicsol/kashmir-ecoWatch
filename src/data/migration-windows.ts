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
  localName?: string;
  taxonomicGroup: 'Waterfowl' | 'Waders' | 'Raptors' | 'Passerines' | 'Cranes' | 'Pheasants' | 'Others';
  conservationStatus: 'CR' | 'EN' | 'VU' | 'NT' | 'LC';
  isThreatened: boolean;

  primaryMigrationStatus: MigrationStatus;
  secondaryMigrationStatus?: MigrationStatus[];
  
  springArrivalWindow?: string;
  summerPresenceWindow?: string;
  breedingWindow?: string;
  autumnPassageWindow?: string;
  winteringWindow?: string;
  departureWindow?: string;
  
  peakObservationMonths: Month[];
  lowObservationMonths: Month[];
  currentSeasonalStatus: SeasonalStatus;

  primaryScope: Scope;
  regionsPresent: ('Kashmir Core' | 'Jammu' | 'Ladakh' | 'AJK' | 'Gilgit-Baltistan')[];
  districtsCount: number;
  districtTimingNotes: string;

  mainHabitats: ('Wetland' | 'Lake' | 'Riverine' | 'Forest' | 'Alpine' | 'Grassland' | 'Agricultural' | 'Urban' | 'Cold Desert')[];
  
  shortDescription: string;
  hotspotsLinked: string[];
  
  threats: MigrationThreat[];
  validation: ValidationSource;

  flywayOrigin?: string;
  flightDistanceKm?: number;
  censusCountEst?: string;
  elevationRange?: { min: number; max: number };
  elevationShift?: string;
}

export const migrationData: MigrationWindow[] = [
  {
    "id": "mw-001",
    "speciesId": "sp-001",
    "commonName": "Eurasian Teal",
    "scientificName": "Anas crecca",
    "localName": "Ail / Chhota Battakh",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Lake"
    ],
    "shortDescription": "Eurasian Teal (Anas crecca) is an authentic Western Himalayan winter visitor migrating from Western Siberia (Ob-Irtysh Basin).",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Western Siberia (Ob-Irtysh Basin)",
    "flightDistanceKm": 4900,
    "censusCountEst": "292,039 in AWC 2025 (Rank #1)"
  },
  {
    "id": "mw-002",
    "speciesId": "sp-002",
    "commonName": "Mallard",
    "scientificName": "Anas platyrhynchos",
    "localName": "Rov (Drake) / Thuj (Duck)",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Lake",
      "Riverine"
    ],
    "shortDescription": "Mallard (Anas platyrhynchos) is an authentic Western Himalayan winter visitor migrating from Siberia & Northern Kazakhstan.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Siberia & Northern Kazakhstan",
    "flightDistanceKm": 4200,
    "censusCountEst": "226,023 in AWC 2025 (Rank #2)"
  },
  {
    "id": "mw-003",
    "speciesId": "sp-003",
    "commonName": "Northern Shoveler",
    "scientificName": "Spatula clypeata",
    "localName": "Chot / Bil-chot",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Lake"
    ],
    "shortDescription": "Northern Shoveler (Spatula clypeata) is an authentic Western Himalayan winter visitor migrating from Siberian Steppes & Altai Krai.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Siberian Steppes & Altai Krai",
    "flightDistanceKm": 4700,
    "censusCountEst": "209,715 in AWC 2025 (Rank #3)"
  },
  {
    "id": "mw-004",
    "speciesId": "sp-004",
    "commonName": "Northern Pintail",
    "scientificName": "Anas acuta",
    "localName": "Kashmir Thuj / Drang-thuj",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Lake",
      "Agricultural"
    ],
    "shortDescription": "Northern Pintail (Anas acuta) is an authentic Western Himalayan winter visitor migrating from West Siberian Lowlands.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "West Siberian Lowlands",
    "flightDistanceKm": 4600,
    "censusCountEst": "150,000+ in AWC 2025"
  },
  {
    "id": "mw-005",
    "speciesId": "sp-005",
    "commonName": "Gadwall",
    "scientificName": "Mareca strepera",
    "localName": "Gond / Bail-gond",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Lake"
    ],
    "shortDescription": "Gadwall (Mareca strepera) is an authentic Western Himalayan winter visitor migrating from Kazakhstan Steppes & Western Siberia.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Kazakhstan Steppes & Western Siberia",
    "flightDistanceKm": 3900,
    "censusCountEst": "95,000+ in AWC 2025"
  },
  {
    "id": "mw-006",
    "speciesId": "sp-006",
    "commonName": "Eurasian Wigeon",
    "scientificName": "Mareca penelope",
    "localName": "Khashar / Son-khashar",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Grassland",
      "Agricultural"
    ],
    "shortDescription": "Eurasian Wigeon (Mareca penelope) is an authentic Western Himalayan winter visitor migrating from Northern Palearctic Taiga.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Northern Palearctic Taiga",
    "flightDistanceKm": 5100,
    "censusCountEst": "85,000+ in AWC 2025"
  },
  {
    "id": "mw-007",
    "speciesId": "sp-007",
    "commonName": "Greylag Goose",
    "scientificName": "Anser anser",
    "localName": "Hans / Posh-hont",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Agricultural",
      "Lake"
    ],
    "shortDescription": "Greylag Goose (Anser anser) is an authentic Western Himalayan winter visitor migrating from Central Asian wetlands & Western Siberia.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Asian wetlands & Western Siberia",
    "flightDistanceKm": 3700,
    "censusCountEst": "18,000–26,000 individuals"
  },
  {
    "id": "mw-008",
    "speciesId": "sp-008",
    "commonName": "Bar-headed Goose",
    "scientificName": "Anser indicus",
    "localName": "Bateil / Kaza-hans",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Lake",
      "Agricultural"
    ],
    "shortDescription": "Bar-headed Goose (Anser indicus) is an authentic Western Himalayan winter visitor migrating from High Tibetan Plateau & Mongolian Steppes.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "High Tibetan Plateau & Mongolian Steppes",
    "flightDistanceKm": 2200,
    "censusCountEst": "25,000+ at Gharana Reserve"
  },
  {
    "id": "mw-009",
    "speciesId": "sp-009",
    "commonName": "Ruddy Shelduck",
    "scientificName": "Tadorna ferruginea",
    "localName": "Surkhab / Chakwa",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "Ladakh"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake",
      "Wetland",
      "Riverine"
    ],
    "shortDescription": "Ruddy Shelduck (Tadorna ferruginea) is an authentic Western Himalayan winter visitor migrating from Central Asian Salt Lakes & Ladakh.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Asian Salt Lakes & Ladakh",
    "flightDistanceKm": 1800,
    "censusCountEst": "6,000+ wintering in valley sinks"
  },
  {
    "id": "mw-010",
    "speciesId": "sp-010",
    "commonName": "Common Shelduck",
    "scientificName": "Tadorna tadorna",
    "localName": "Safed Surkhab",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake",
      "Wetland"
    ],
    "shortDescription": "Common Shelduck (Tadorna tadorna) is an authentic Western Himalayan winter visitor migrating from Caspian and Aral Sea wetlands.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Caspian and Aral Sea wetlands",
    "flightDistanceKm": 3100,
    "censusCountEst": "350–600 wintering individuals"
  },
  {
    "id": "mw-011",
    "speciesId": "sp-011",
    "commonName": "Common Pochard",
    "scientificName": "Aythya ferina",
    "localName": "Pashk / Lal-sir Pochard",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "VU",
    "isThreatened": true,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake",
      "Wetland"
    ],
    "shortDescription": "Common Pochard (Aythya ferina) is an authentic Western Himalayan winter visitor migrating from Northern & Central Eurasia.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Northern & Central Eurasia",
    "flightDistanceKm": 4100,
    "censusCountEst": "32,000+ in AWC 2025"
  },
  {
    "id": "mw-012",
    "speciesId": "sp-012",
    "commonName": "Red-crested Pochard",
    "scientificName": "Netta rufina",
    "localName": "Lal-sar / Taaj-pashk",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake",
      "Wetland"
    ],
    "shortDescription": "Red-crested Pochard (Netta rufina) is an authentic Western Himalayan winter visitor migrating from Central Asian Steppe Lakes.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Asian Steppe Lakes",
    "flightDistanceKm": 3400,
    "censusCountEst": "12,000–16,000 individuals"
  },
  {
    "id": "mw-013",
    "speciesId": "sp-013",
    "commonName": "Ferruginous Duck",
    "scientificName": "Aythya nyroca",
    "localName": "Rata-pashk / Kaha-pashk",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "NT",
    "isThreatened": true,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Lake"
    ],
    "shortDescription": "Ferruginous Duck (Aythya nyroca) is an authentic Western Himalayan winter visitor migrating from Western Central Asia & Eastern Europe.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Western Central Asia & Eastern Europe",
    "flightDistanceKm": 3600,
    "censusCountEst": "4,500–6,200 wintering individuals"
  },
  {
    "id": "mw-014",
    "speciesId": "sp-014",
    "commonName": "Tufted Duck",
    "scientificName": "Aythya fuligula",
    "localName": "Tur-pashk / Choti-wala Pashk",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake",
      "Wetland"
    ],
    "shortDescription": "Tufted Duck (Aythya fuligula) is an authentic Western Himalayan winter visitor migrating from Northern Eurasia Forest Tundra.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Northern Eurasia Forest Tundra",
    "flightDistanceKm": 4800,
    "censusCountEst": "19,500+ in AWC 2025"
  },
  {
    "id": "mw-015",
    "speciesId": "sp-015",
    "commonName": "Greater Scaup",
    "scientificName": "Aythya marila",
    "localName": "Bod Pashk",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake",
      "Wetland"
    ],
    "shortDescription": "Greater Scaup (Aythya marila) is an authentic Western Himalayan winter visitor migrating from Arctic Tundra & Taiga Bogs.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Arctic Tundra & Taiga Bogs",
    "flightDistanceKm": 5400,
    "censusCountEst": "150–350 winter visitors"
  },
  {
    "id": "mw-016",
    "speciesId": "sp-016",
    "commonName": "Smew",
    "scientificName": "Mergellus albellus",
    "localName": "Safed Sawbill / Panda Battakh",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake",
      "Wetland",
      "Riverine"
    ],
    "shortDescription": "Smew (Mergellus albellus) is an authentic Western Himalayan winter visitor migrating from Fennoscandian & Siberian Taiga.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Fennoscandian & Siberian Taiga",
    "flightDistanceKm": 5600,
    "censusCountEst": "15–40 individuals recorded annually"
  },
  {
    "id": "mw-017",
    "speciesId": "sp-017",
    "commonName": "Common Merganser",
    "scientificName": "Mergus merganser",
    "localName": "Daryaee Sawbill",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Riverine",
      "Lake"
    ],
    "shortDescription": "Common Merganser (Mergus merganser) is an authentic Western Himalayan winter visitor migrating from High Himalayan & Central Asian Torrents.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "High Himalayan & Central Asian Torrents",
    "flightDistanceKm": 1600,
    "censusCountEst": "450–700 individuals in winter"
  },
  {
    "id": "mw-018",
    "speciesId": "sp-018",
    "commonName": "Red-breasted Merganser",
    "scientificName": "Mergus serrator",
    "localName": "Lal-choti Sawbill",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake",
      "Riverine"
    ],
    "shortDescription": "Red-breasted Merganser (Mergus serrator) is an authentic Western Himalayan winter visitor migrating from Boreal Eurasia & Baltic Coast.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Boreal Eurasia & Baltic Coast",
    "flightDistanceKm": 5200,
    "censusCountEst": "Rare winter diver"
  },
  {
    "id": "mw-019",
    "speciesId": "sp-019",
    "commonName": "Common Goldeneye",
    "scientificName": "Bucephala clangula",
    "localName": "Sunhari-aankh",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake",
      "Riverine"
    ],
    "shortDescription": "Common Goldeneye (Bucephala clangula) is an authentic Western Himalayan winter visitor migrating from Russian Boreal Forests.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Russian Boreal Forests",
    "flightDistanceKm": 4700,
    "censusCountEst": "200–450 individuals"
  },
  {
    "id": "mw-020",
    "speciesId": "sp-020",
    "commonName": "Falcated Duck",
    "scientificName": "Mareca falcata",
    "localName": "Kala-khashar",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "NT",
    "isThreatened": true,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Lake"
    ],
    "shortDescription": "Falcated Duck (Mareca falcata) is an authentic Western Himalayan winter visitor migrating from Eastern Siberian River Basins.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Eastern Siberian River Basins",
    "flightDistanceKm": 5800,
    "censusCountEst": "Rare winter visitor (NT)"
  },
  {
    "id": "mw-021",
    "speciesId": "sp-021",
    "commonName": "Marbled Duck",
    "scientificName": "Marmaronetta angustirostris",
    "localName": "Marmari Battakh",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "VU",
    "isThreatened": true,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Lake"
    ],
    "shortDescription": "Marbled Duck (Marmaronetta angustirostris) is an authentic Western Himalayan winter visitor migrating from Caspian Sea & Middle East Basins.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Caspian Sea & Middle East Basins",
    "flightDistanceKm": 2800,
    "censusCountEst": "Scarce winter migrant (VU)"
  },
  {
    "id": "mw-022",
    "speciesId": "sp-022",
    "commonName": "White-headed Duck",
    "scientificName": "Oxyura leucocephala",
    "localName": "Safed-sir Battakh",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "EN",
    "isThreatened": true,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake",
      "Wetland"
    ],
    "shortDescription": "White-headed Duck (Oxyura leucocephala) is an authentic Western Himalayan winter visitor migrating from Kazakhstan & Central Asian Salt Lakes.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Kazakhstan & Central Asian Salt Lakes",
    "flightDistanceKm": 3300,
    "censusCountEst": "Critically scarce visitor (EN)"
  },
  {
    "id": "mw-023",
    "speciesId": "sp-023",
    "commonName": "Lesser White-fronted Goose",
    "scientificName": "Anser erythropus",
    "localName": "Chhota Safed-peshani Hans",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "VU",
    "isThreatened": true,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Agricultural"
    ],
    "shortDescription": "Lesser White-fronted Goose (Anser erythropus) is an authentic Western Himalayan winter visitor migrating from Fennoscandian & Siberian Tundra.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Fennoscandian & Siberian Tundra",
    "flightDistanceKm": 5300,
    "censusCountEst": "Threatened winter visitor (VU)"
  },
  {
    "id": "mw-024",
    "speciesId": "sp-024",
    "commonName": "Greater White-fronted Goose",
    "scientificName": "Anser albifrons",
    "localName": "Safed-peshani Hans",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Agricultural"
    ],
    "shortDescription": "Greater White-fronted Goose (Anser albifrons) is an authentic Western Himalayan winter visitor migrating from Siberian Arctic Tundra.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Siberian Arctic Tundra",
    "flightDistanceKm": 5100,
    "censusCountEst": "Regular winter flocks"
  },
  {
    "id": "mw-025",
    "speciesId": "sp-025",
    "commonName": "Bean Goose",
    "scientificName": "Anser fabalis",
    "localName": "Taiga Hans",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Agricultural",
      "Wetland"
    ],
    "shortDescription": "Bean Goose (Anser fabalis) is an authentic Western Himalayan winter visitor migrating from Boreal Eurasia Taiga.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Boreal Eurasia Taiga",
    "flightDistanceKm": 4900,
    "censusCountEst": "Winter visitor in stubble fields"
  },
  {
    "id": "mw-026",
    "speciesId": "sp-026",
    "commonName": "Tundra Swan",
    "scientificName": "Cygnus columbianus",
    "localName": "Tundra Hans",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake",
      "Wetland"
    ],
    "shortDescription": "Tundra Swan (Cygnus columbianus) is an authentic Western Himalayan winter visitor migrating from Arctic Coastal Tundra.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Arctic Coastal Tundra",
    "flightDistanceKm": 6200,
    "censusCountEst": "Rare wintering swan"
  },
  {
    "id": "mw-027",
    "speciesId": "sp-027",
    "commonName": "Whooper Swan",
    "scientificName": "Cygnus cygnus",
    "localName": "Awazi Hans",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake",
      "Wetland"
    ],
    "shortDescription": "Whooper Swan (Cygnus cygnus) is an authentic Western Himalayan winter visitor migrating from Subarctic Eurasia.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Subarctic Eurasia",
    "flightDistanceKm": 5800,
    "censusCountEst": "Irruptive winter visitor"
  },
  {
    "id": "mw-028",
    "speciesId": "sp-028",
    "commonName": "Mute Swan",
    "scientificName": "Cygnus olor",
    "localName": "Khamosh Hans",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake",
      "Wetland"
    ],
    "shortDescription": "Mute Swan (Cygnus olor) is an authentic Western Himalayan winter visitor migrating from Central Asian Shallow Lakes.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Asian Shallow Lakes",
    "flightDistanceKm": 3600,
    "censusCountEst": "Scarce winter visitor"
  },
  {
    "id": "mw-029",
    "speciesId": "sp-029",
    "commonName": "Baikal Teal",
    "scientificName": "Sibirionetta formosa",
    "localName": "Baikal Battakh",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Lake"
    ],
    "shortDescription": "Baikal Teal (Sibirionetta formosa) is an authentic Western Himalayan winter visitor migrating from Lake Baikal & Eastern Siberia.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Lake Baikal & Eastern Siberia",
    "flightDistanceKm": 5900,
    "censusCountEst": "Rare winter visitor"
  },
  {
    "id": "mw-030",
    "speciesId": "sp-030",
    "commonName": "Garganey",
    "scientificName": "Spatula querquedula",
    "localName": "Rana-ail / Chaitra",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Lake"
    ],
    "shortDescription": "Garganey (Spatula querquedula) is an authentic Western Himalayan winter visitor migrating from Sub-Saharan Africa / Central Asia.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Sub-Saharan Africa / Central Asia",
    "flightDistanceKm": 5500,
    "censusCountEst": "8,000–12,000 passage & wintering"
  },
  {
    "id": "mw-031",
    "speciesId": "sp-031",
    "commonName": "Cotton Pygmy Goose",
    "scientificName": "Nettapus coromandelianus",
    "localName": "Ghirra / Chhota Battakh",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Lake"
    ],
    "shortDescription": "Cotton Pygmy Goose (Nettapus coromandelianus) is an authentic Western Himalayan winter visitor migrating from Indo-Gangetic Basins.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Indo-Gangetic Basins",
    "flightDistanceKm": 950,
    "censusCountEst": "Local winter mover in Jammu sinks"
  },
  {
    "id": "mw-032",
    "speciesId": "sp-032",
    "commonName": "Spot-billed Duck",
    "scientificName": "Anas poecilorhyncha",
    "localName": "Garm-pai Battakh",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Lake"
    ],
    "shortDescription": "Spot-billed Duck (Anas poecilorhyncha) is an authentic Western Himalayan winter visitor migrating from Northern Indian Subcontinent.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Northern Indian Subcontinent",
    "flightDistanceKm": 850,
    "censusCountEst": "Winter influx to valley wetlands"
  },
  {
    "id": "mw-033",
    "speciesId": "sp-033",
    "commonName": "Tufted Pochard",
    "scientificName": "Aythya fuligula x ferina",
    "localName": "Pashk-sankar",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake",
      "Wetland"
    ],
    "shortDescription": "Tufted Pochard (Aythya fuligula x ferina) is an authentic Western Himalayan winter visitor migrating from Central Asian flyway mix.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Asian flyway mix",
    "flightDistanceKm": 4200,
    "censusCountEst": "Regular diving duck hybrid"
  },
  {
    "id": "mw-034",
    "speciesId": "sp-034",
    "commonName": "Long-tailed Duck",
    "scientificName": "Clangula hyemalis",
    "localName": "Lambi-dum Battakh",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake"
    ],
    "shortDescription": "Long-tailed Duck (Clangula hyemalis) is an authentic Western Himalayan winter visitor migrating from High Arctic Seas & Tundra.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "High Arctic Seas & Tundra",
    "flightDistanceKm": 6500,
    "censusCountEst": "Rare winter visitor (VU)"
  },
  {
    "id": "mw-035",
    "speciesId": "sp-035",
    "commonName": "Velvet Scoter",
    "scientificName": "Melanitta fusca",
    "localName": "Kala Scoter",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake"
    ],
    "shortDescription": "Velvet Scoter (Melanitta fusca) is an authentic Western Himalayan winter visitor migrating from Northern Siberian Taiga Lakes.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Northern Siberian Taiga Lakes",
    "flightDistanceKm": 5900,
    "censusCountEst": "Scarce winter vagrant (VU)"
  },
  {
    "id": "mw-036",
    "speciesId": "sp-036",
    "commonName": "Common Scoter",
    "scientificName": "Melanitta nigra",
    "localName": "Siyah Scoter",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake"
    ],
    "shortDescription": "Common Scoter (Melanitta nigra) is an authentic Western Himalayan winter visitor migrating from Northern Eurasia Marine Coasts.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Northern Eurasia Marine Coasts",
    "flightDistanceKm": 6100,
    "censusCountEst": "Very rare cold-weather diver"
  },
  {
    "id": "mw-037",
    "speciesId": "sp-037",
    "commonName": "Little Grebe",
    "scientificName": "Tachybaptus ruficollis",
    "localName": "Pind / Dubdubi",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Lake"
    ],
    "shortDescription": "Little Grebe (Tachybaptus ruficollis) is an authentic Western Himalayan winter visitor migrating from Central Asian Freshwater Basins.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Asian Freshwater Basins",
    "flightDistanceKm": 1200,
    "censusCountEst": "14,000+ across valley waterbodies"
  },
  {
    "id": "mw-038",
    "speciesId": "sp-038",
    "commonName": "Great Crested Grebe",
    "scientificName": "Podiceps cristatus",
    "localName": "Tajib / Taaj-dubdubi",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake",
      "Wetland"
    ],
    "shortDescription": "Great Crested Grebe (Podiceps cristatus) is an authentic Western Himalayan winter visitor migrating from Central Asia & Western China.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Asia & Western China",
    "flightDistanceKm": 3200,
    "censusCountEst": "2,200–3,400 individuals in winter"
  },
  {
    "id": "mw-039",
    "speciesId": "sp-039",
    "commonName": "Black-necked Grebe",
    "scientificName": "Podiceps nigricollis",
    "localName": "Kala-gardan Dubdubi",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake",
      "Wetland"
    ],
    "shortDescription": "Black-necked Grebe (Podiceps nigricollis) is an authentic Western Himalayan winter visitor migrating from Central Asian Steppe Lakes.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Asian Steppe Lakes",
    "flightDistanceKm": 3100,
    "censusCountEst": "600–950 wintering individuals"
  },
  {
    "id": "mw-040",
    "speciesId": "sp-040",
    "commonName": "Red-necked Grebe",
    "scientificName": "Podiceps grisegena",
    "localName": "Lal-gardan Dubdubi",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake",
      "Wetland"
    ],
    "shortDescription": "Red-necked Grebe (Podiceps grisegena) is an authentic Western Himalayan winter visitor migrating from Northern Eurasia.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Northern Eurasia",
    "flightDistanceKm": 4600,
    "censusCountEst": "Rare winter diving visitor"
  },
  {
    "id": "mw-041",
    "speciesId": "sp-041",
    "commonName": "Slavonian Grebe",
    "scientificName": "Podiceps auritus",
    "localName": "Shakh-dar Dubdubi",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake"
    ],
    "shortDescription": "Slavonian Grebe (Podiceps auritus) is an authentic Western Himalayan winter visitor migrating from Boreal Wetlands of Siberia.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Boreal Wetlands of Siberia",
    "flightDistanceKm": 5200,
    "censusCountEst": "Vulnerable winter diver (VU)"
  },
  {
    "id": "mw-042",
    "speciesId": "sp-042",
    "commonName": "Eurasian Coot",
    "scientificName": "Fulica atra",
    "localName": "Kaav-thuj / Kol-teet",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake",
      "Wetland"
    ],
    "shortDescription": "Eurasian Coot (Fulica atra) is an authentic Western Himalayan winter visitor migrating from Central Asian and Siberian lakes.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Asian and Siberian lakes",
    "flightDistanceKm": 3500,
    "censusCountEst": "110,000+ in AWC 2025"
  },
  {
    "id": "mw-043",
    "speciesId": "sp-043",
    "commonName": "Common Moorhen",
    "scientificName": "Gallinula chloropus",
    "localName": "Kole-kour / Jal-kukkadi",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Lake"
    ],
    "shortDescription": "Common Moorhen (Gallinula chloropus) is an authentic Western Himalayan winter visitor migrating from Palearctic Reedbeds.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Palearctic Reedbeds",
    "flightDistanceKm": 2100,
    "censusCountEst": "Common winter reed visitor"
  },
  {
    "id": "mw-044",
    "speciesId": "sp-044",
    "commonName": "Water Rail",
    "scientificName": "Rallus aquaticus",
    "localName": "Pani-rail",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland"
    ],
    "shortDescription": "Water Rail (Rallus aquaticus) is an authentic Western Himalayan winter visitor migrating from European & West Siberian Marshes.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "European & West Siberian Marshes",
    "flightDistanceKm": 3900,
    "censusCountEst": "Secretive winter reed prober"
  },
  {
    "id": "mw-045",
    "speciesId": "sp-045",
    "commonName": "Spotted Crake",
    "scientificName": "Porzana porzana",
    "localName": "Chitrakabra Crake",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland"
    ],
    "shortDescription": "Spotted Crake (Porzana porzana) is an authentic Western Himalayan winter visitor migrating from Temperate Eurasia Reed Marshes.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Temperate Eurasia Reed Marshes",
    "flightDistanceKm": 4100,
    "censusCountEst": "Scarce winter reed skulker"
  },
  {
    "id": "mw-046",
    "speciesId": "sp-046",
    "commonName": "Red-throated Diver",
    "scientificName": "Gavia stellata",
    "localName": "Lal-gala Gavia",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake"
    ],
    "shortDescription": "Red-throated Diver (Gavia stellata) is an authentic Western Himalayan winter visitor migrating from Arctic Coastal Tundra.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Arctic Coastal Tundra",
    "flightDistanceKm": 6400,
    "censusCountEst": "Rare winter diving visitor"
  },
  {
    "id": "mw-047",
    "speciesId": "sp-047",
    "commonName": "Eurasian Woodcock",
    "scientificName": "Scolopax rusticola",
    "localName": "Sim-kout / Jangli Chaha",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Forest",
      "Agricultural",
      "Wetland"
    ],
    "shortDescription": "Eurasian Woodcock (Scolopax rusticola) is an authentic Western Himalayan winter visitor migrating from Russian Taiga & Birch Woods.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Russian Taiga & Birch Woods",
    "flightDistanceKm": 3800,
    "censusCountEst": "Cryptic orchard and forest winterer"
  },
  {
    "id": "mw-048",
    "speciesId": "sp-048",
    "commonName": "Common Snipe",
    "scientificName": "Gallinago gallinago",
    "localName": "Sim-kour / Chaha",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Agricultural"
    ],
    "shortDescription": "Common Snipe (Gallinago gallinago) is an authentic Western Himalayan winter visitor migrating from Northern Eurasia Taiga Bogs.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Northern Eurasia Taiga Bogs",
    "flightDistanceKm": 4200,
    "censusCountEst": "16,000+ individuals in valley wetlands"
  },
  {
    "id": "mw-049",
    "speciesId": "sp-049",
    "commonName": "Solitary Snipe",
    "scientificName": "Gallinago solitaria",
    "localName": "Kuh-sim / Pahadi Chaha",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Alpine",
      "Riverine",
      "Wetland"
    ],
    "shortDescription": "Solitary Snipe (Gallinago solitaria) is an authentic Western Himalayan winter visitor migrating from High Himalayan Scree Seepages.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "High Himalayan Scree Seepages",
    "flightDistanceKm": 800,
    "censusCountEst": "Montane altitudinal winter mover"
  },
  {
    "id": "mw-050",
    "speciesId": "sp-050",
    "commonName": "Jack Snipe",
    "scientificName": "Lymnocryptes minimus",
    "localName": "Chhota Chaha",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland"
    ],
    "shortDescription": "Jack Snipe (Lymnocryptes minimus) is an authentic Western Himalayan winter visitor migrating from Northern Boreal Peatlands.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Northern Boreal Peatlands",
    "flightDistanceKm": 4600,
    "censusCountEst": "Secretive winter mudflats wader"
  },
  {
    "id": "mw-051",
    "speciesId": "sp-051",
    "commonName": "Pintail Snipe",
    "scientificName": "Gallinago stenura",
    "localName": "Seeh-dum Chaha",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Agricultural"
    ],
    "shortDescription": "Pintail Snipe (Gallinago stenura) is an authentic Western Himalayan winter visitor migrating from Siberian Forest Tundra.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Siberian Forest Tundra",
    "flightDistanceKm": 4700,
    "censusCountEst": "Winter visitor in marshy fields"
  },
  {
    "id": "mw-052",
    "speciesId": "sp-052",
    "commonName": "Great Snipe",
    "scientificName": "Gallinago media",
    "localName": "Bod Chaha",
    "taxonomicGroup": "Waders",
    "conservationStatus": "NT",
    "isThreatened": true,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland"
    ],
    "shortDescription": "Great Snipe (Gallinago media) is an authentic Western Himalayan winter visitor migrating from Western Siberian Bogs.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Western Siberian Bogs",
    "flightDistanceKm": 4400,
    "censusCountEst": "Near-threatened passage/winterer (NT)"
  },
  {
    "id": "mw-053",
    "speciesId": "sp-053",
    "commonName": "Black-tailed Godwit",
    "scientificName": "Limosa limosa",
    "localName": "Mallang / Gudwit",
    "taxonomicGroup": "Waders",
    "conservationStatus": "NT",
    "isThreatened": true,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Agricultural"
    ],
    "shortDescription": "Black-tailed Godwit (Limosa limosa) is an authentic Western Himalayan winter visitor migrating from Russian Steppes & West Siberia.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Russian Steppes & West Siberia",
    "flightDistanceKm": 4800,
    "censusCountEst": "1,800–3,200 passage/wintering (NT)"
  },
  {
    "id": "mw-054",
    "speciesId": "sp-054",
    "commonName": "Bar-tailed Godwit",
    "scientificName": "Limosa lapponica",
    "localName": "Khat-dum Gudwit",
    "taxonomicGroup": "Waders",
    "conservationStatus": "NT",
    "isThreatened": true,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Lake"
    ],
    "shortDescription": "Bar-tailed Godwit (Limosa lapponica) is an authentic Western Himalayan winter visitor migrating from Arctic Tundra of Siberia.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Arctic Tundra of Siberia",
    "flightDistanceKm": 5600,
    "censusCountEst": "Near-threatened migrant (NT)"
  },
  {
    "id": "mw-055",
    "speciesId": "sp-055",
    "commonName": "Eurasian Curlew",
    "scientificName": "Numenius arquata",
    "localName": "Bod Curlew",
    "taxonomicGroup": "Waders",
    "conservationStatus": "NT",
    "isThreatened": true,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Agricultural"
    ],
    "shortDescription": "Eurasian Curlew (Numenius arquata) is an authentic Western Himalayan winter visitor migrating from European & Russian Peatlands.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "European & Russian Peatlands",
    "flightDistanceKm": 4500,
    "censusCountEst": "Near-threatened curved-billed wader (NT)"
  },
  {
    "id": "mw-056",
    "speciesId": "sp-056",
    "commonName": "Whimbrel",
    "scientificName": "Numenius phaeopus",
    "localName": "Chhota Curlew",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland"
    ],
    "shortDescription": "Whimbrel (Numenius phaeopus) is an authentic Western Himalayan winter visitor migrating from Subarctic Taiga & Tundra.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Subarctic Taiga & Tundra",
    "flightDistanceKm": 5100,
    "censusCountEst": "Wintering & passage migrant"
  },
  {
    "id": "mw-057",
    "speciesId": "sp-057",
    "commonName": "Spotted Redshank",
    "scientificName": "Tringa erythropus",
    "localName": "Chitrakabra Lal-tanga",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Lake"
    ],
    "shortDescription": "Spotted Redshank (Tringa erythropus) is an authentic Western Himalayan winter visitor migrating from Arctic Fennoscandia & Siberia.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Arctic Fennoscandia & Siberia",
    "flightDistanceKm": 5200,
    "censusCountEst": "Regular wintering wader in shallows"
  },
  {
    "id": "mw-058",
    "speciesId": "sp-058",
    "commonName": "Common Redshank",
    "scientificName": "Tringa totanus",
    "localName": "Lal-tanga / Tituri",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "Ladakh"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Lake"
    ],
    "shortDescription": "Common Redshank (Tringa totanus) is an authentic Western Himalayan winter visitor migrating from Ladakh High Marshes & Central Asia.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Ladakh High Marshes & Central Asia",
    "flightDistanceKm": 2100,
    "censusCountEst": "5,000+ wintering in valley sinks"
  },
  {
    "id": "mw-059",
    "speciesId": "sp-059",
    "commonName": "Marsh Sandpiper",
    "scientificName": "Tringa stagnatilis",
    "localName": "Dal Sandpiper",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland"
    ],
    "shortDescription": "Marsh Sandpiper (Tringa stagnatilis) is an authentic Western Himalayan winter visitor migrating from Steppe wetlands of Kazakhstan.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Steppe wetlands of Kazakhstan",
    "flightDistanceKm": 3400,
    "censusCountEst": "Slender winter shorebird"
  },
  {
    "id": "mw-060",
    "speciesId": "sp-060",
    "commonName": "Common Greenshank",
    "scientificName": "Tringa nebularia",
    "localName": "Chup-chup / Sabz-tanga",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Riverine",
      "Lake"
    ],
    "shortDescription": "Common Greenshank (Tringa nebularia) is an authentic Western Himalayan winter visitor migrating from Palearctic Taiga & Tundra.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Palearctic Taiga & Tundra",
    "flightDistanceKm": 4400,
    "censusCountEst": "4,200+ wintering individuals"
  },
  {
    "id": "mw-061",
    "speciesId": "sp-061",
    "commonName": "Green Sandpiper",
    "scientificName": "Tringa ochropus",
    "localName": "Kole-tit / Jal-kukkad",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Riverine",
      "Agricultural"
    ],
    "shortDescription": "Green Sandpiper (Tringa ochropus) is an authentic Western Himalayan winter visitor migrating from Eurasian Taiga Belt.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Eurasian Taiga Belt",
    "flightDistanceKm": 4100,
    "censusCountEst": "8,500+ individuals along ditches"
  },
  {
    "id": "mw-062",
    "speciesId": "sp-062",
    "commonName": "Wood Sandpiper",
    "scientificName": "Tringa glareola",
    "localName": "Chhota Kole-tit",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Agricultural"
    ],
    "shortDescription": "Wood Sandpiper (Tringa glareola) is an authentic Western Himalayan winter visitor migrating from Northern Palearctic Subarctic.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Northern Palearctic Subarctic",
    "flightDistanceKm": 4600,
    "censusCountEst": "12,000+ passage & winter individuals"
  },
  {
    "id": "mw-063",
    "speciesId": "sp-063",
    "commonName": "Terek Sandpiper",
    "scientificName": "Xenus cinereus",
    "localName": "Terek Sandpiper",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Riverine",
      "Wetland"
    ],
    "shortDescription": "Terek Sandpiper (Xenus cinereus) is an authentic Western Himalayan winter visitor migrating from Siberian Boreal Rivers.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Siberian Boreal Rivers",
    "flightDistanceKm": 4800,
    "censusCountEst": "Upturned-billed winter shorebird"
  },
  {
    "id": "mw-064",
    "speciesId": "sp-064",
    "commonName": "Common Sandpiper",
    "scientificName": "Actitis hypoleucos",
    "localName": "Aam Tituri",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Riverine",
      "Wetland",
      "Lake"
    ],
    "shortDescription": "Common Sandpiper (Actitis hypoleucos) is an authentic Western Himalayan winter visitor migrating from Eurasian Mountain Streams.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Eurasian Mountain Streams",
    "flightDistanceKm": 3200,
    "censusCountEst": "Bobbing shoreline winterer"
  },
  {
    "id": "mw-065",
    "speciesId": "sp-065",
    "commonName": "Ruddy Turnstone",
    "scientificName": "Arenaria interpres",
    "localName": "Pathar-palat",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Riverine",
      "Lake"
    ],
    "shortDescription": "Ruddy Turnstone (Arenaria interpres) is an authentic Western Himalayan winter visitor migrating from High Arctic Coasts.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "High Arctic Coasts",
    "flightDistanceKm": 5900,
    "censusCountEst": "Stony riverbed winter visitor"
  },
  {
    "id": "mw-066",
    "speciesId": "sp-066",
    "commonName": "Great Knot",
    "scientificName": "Calidris tenuirostris",
    "localName": "Bod Knot",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland"
    ],
    "shortDescription": "Great Knot (Calidris tenuirostris) is an authentic Western Himalayan winter visitor migrating from Northeastern Siberian Tundra.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Northeastern Siberian Tundra",
    "flightDistanceKm": 6300,
    "censusCountEst": "Endangered passage wader (EN)"
  },
  {
    "id": "mw-067",
    "speciesId": "sp-067",
    "commonName": "Red Knot",
    "scientificName": "Calidris canutus",
    "localName": "Surkh Knot",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland"
    ],
    "shortDescription": "Red Knot (Calidris canutus) is an authentic Western Himalayan winter visitor migrating from High Arctic Islands.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "High Arctic Islands",
    "flightDistanceKm": 6400,
    "censusCountEst": "Near-threatened passage migrant (NT)"
  },
  {
    "id": "mw-068",
    "speciesId": "sp-068",
    "commonName": "Sanderling",
    "scientificName": "Calidris alba",
    "localName": "Ret-chaha",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Lake"
    ],
    "shortDescription": "Sanderling (Calidris alba) is an authentic Western Himalayan winter visitor migrating from High Arctic Tundra.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "High Arctic Tundra",
    "flightDistanceKm": 6100,
    "censusCountEst": "Pale winter shorebird"
  },
  {
    "id": "mw-069",
    "speciesId": "sp-069",
    "commonName": "Little Stint",
    "scientificName": "Calidris minuta",
    "localName": "Chhota Stint",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Lake"
    ],
    "shortDescription": "Little Stint (Calidris minuta) is an authentic Western Himalayan winter visitor migrating from Northern Siberian Tundra.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Northern Siberian Tundra",
    "flightDistanceKm": 5300,
    "censusCountEst": "Abundant mudflat winterer"
  },
  {
    "id": "mw-070",
    "speciesId": "sp-070",
    "commonName": "Temminck's Stint",
    "scientificName": "Calidris temminckii",
    "localName": "Chhota Tit / Stint",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Riverine",
      "Lake"
    ],
    "shortDescription": "Temminck's Stint (Calidris temminckii) is an authentic Western Himalayan winter visitor migrating from Fennoscandian & Siberian Tundra.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Fennoscandian & Siberian Tundra",
    "flightDistanceKm": 5100,
    "censusCountEst": "2,800+ individuals on mudflats"
  },
  {
    "id": "mw-071",
    "speciesId": "sp-071",
    "commonName": "Long-toed Stint",
    "scientificName": "Calidris subminuta",
    "localName": "Lambi-ungli Stint",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland"
    ],
    "shortDescription": "Long-toed Stint (Calidris subminuta) is an authentic Western Himalayan winter visitor migrating from Siberian Taiga Bogs.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Siberian Taiga Bogs",
    "flightDistanceKm": 5200,
    "censusCountEst": "Marshy edge winter visitor"
  },
  {
    "id": "mw-072",
    "speciesId": "sp-072",
    "commonName": "Red-necked Stint",
    "scientificName": "Calidris ruficollis",
    "localName": "Lal-gardan Stint",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland"
    ],
    "shortDescription": "Red-necked Stint (Calidris ruficollis) is an authentic Western Himalayan winter visitor migrating from Chukotka Arctic Tundra.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Chukotka Arctic Tundra",
    "flightDistanceKm": 6700,
    "censusCountEst": "Near-threatened stint (NT)"
  },
  {
    "id": "mw-073",
    "speciesId": "sp-073",
    "commonName": "Dunlin",
    "scientificName": "Calidris alpina",
    "localName": "Dunlin Chaha",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Lake"
    ],
    "shortDescription": "Dunlin (Calidris alpina) is an authentic Western Himalayan winter visitor migrating from Circumpolar Arctic.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Circumpolar Arctic",
    "flightDistanceKm": 5600,
    "censusCountEst": "Compact flocking winter shorebird"
  },
  {
    "id": "mw-074",
    "speciesId": "sp-074",
    "commonName": "Curlew Sandpiper",
    "scientificName": "Calidris ferruginea",
    "localName": "Curlew Sandpiper",
    "taxonomicGroup": "Waders",
    "conservationStatus": "NT",
    "isThreatened": true,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland"
    ],
    "shortDescription": "Curlew Sandpiper (Calidris ferruginea) is an authentic Western Himalayan winter visitor migrating from Siberian Arctic Tundra.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Siberian Arctic Tundra",
    "flightDistanceKm": 5800,
    "censusCountEst": "Near-threatened decurved wader (NT)"
  },
  {
    "id": "mw-075",
    "speciesId": "sp-075",
    "commonName": "Broad-billed Sandpiper",
    "scientificName": "Calidris falcinellus",
    "localName": "Chauri-choch Chaha",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland"
    ],
    "shortDescription": "Broad-billed Sandpiper (Calidris falcinellus) is an authentic Western Himalayan winter visitor migrating from Northern Taiga Bogs.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Northern Taiga Bogs",
    "flightDistanceKm": 4900,
    "censusCountEst": "Mudflat prober in winter"
  },
  {
    "id": "mw-076",
    "speciesId": "sp-076",
    "commonName": "Ruff",
    "scientificName": "Calidris pugnax",
    "localName": "Geh-wader / Bagla-chaha",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Agricultural"
    ],
    "shortDescription": "Ruff (Calidris pugnax) is an authentic Western Himalayan winter visitor migrating from Arctic & Subarctic Tundra.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Arctic & Subarctic Tundra",
    "flightDistanceKm": 5200,
    "censusCountEst": "9,000+ passage & wintering waders"
  },
  {
    "id": "mw-077",
    "speciesId": "sp-077",
    "commonName": "Red-necked Phalarope",
    "scientificName": "Phalaropus lobatus",
    "localName": "Lal-gala Phalarope",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake",
      "Wetland"
    ],
    "shortDescription": "Red-necked Phalarope (Phalaropus lobatus) is an authentic Western Himalayan winter visitor migrating from Arctic Coastal Tundra.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Arctic Coastal Tundra",
    "flightDistanceKm": 5800,
    "censusCountEst": "Spinning open-water wader"
  },
  {
    "id": "mw-078",
    "speciesId": "sp-078",
    "commonName": "Red Phalarope",
    "scientificName": "Phalaropus fulicarius",
    "localName": "Surkh Phalarope",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake"
    ],
    "shortDescription": "Red Phalarope (Phalaropus fulicarius) is an authentic Western Himalayan winter visitor migrating from High Arctic Tundra.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "High Arctic Tundra",
    "flightDistanceKm": 6400,
    "censusCountEst": "Pelagic Arctic wader visitor"
  },
  {
    "id": "mw-079",
    "speciesId": "sp-079",
    "commonName": "Pied Avocet",
    "scientificName": "Recurvirostra avosetta",
    "localName": "Kala-safed Avocet",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Lake"
    ],
    "shortDescription": "Pied Avocet (Recurvirostra avosetta) is an authentic Western Himalayan winter visitor migrating from Central Asian Salt Basins.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Asian Salt Basins",
    "flightDistanceKm": 3100,
    "censusCountEst": "Recurved bill shallow-water filterer"
  },
  {
    "id": "mw-080",
    "speciesId": "sp-080",
    "commonName": "Black-winged Stilt",
    "scientificName": "Himantopus himantopus",
    "localName": "Lambi-tanga / Stilt",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Lake"
    ],
    "shortDescription": "Black-winged Stilt (Himantopus himantopus) is an authentic Western Himalayan winter visitor migrating from Indo-Gangetic & Central Asian Shallows.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Indo-Gangetic & Central Asian Shallows",
    "flightDistanceKm": 1200,
    "censusCountEst": "Ubiquitous stilt in valley marshes"
  },
  {
    "id": "mw-081",
    "speciesId": "sp-081",
    "commonName": "Eurasian Oystercatcher",
    "scientificName": "Haematopus ostralegus",
    "localName": "Daryaee Sip-khor",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Riverine",
      "Lake"
    ],
    "shortDescription": "Eurasian Oystercatcher (Haematopus ostralegus) is an authentic Western Himalayan winter visitor migrating from Northern Eurasian Coasts.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Northern Eurasian Coasts",
    "flightDistanceKm": 5100,
    "censusCountEst": "Near-threatened visitor (NT)"
  },
  {
    "id": "mw-082",
    "speciesId": "sp-082",
    "commonName": "Northern Lapwing",
    "scientificName": "Vanellus vanellus",
    "localName": "Bod-tit / Taaj-dar Tituri",
    "taxonomicGroup": "Waders",
    "conservationStatus": "NT",
    "isThreatened": true,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Agricultural",
      "Wetland",
      "Grassland"
    ],
    "shortDescription": "Northern Lapwing (Vanellus vanellus) is an authentic Western Himalayan winter visitor migrating from Temperate & Steppe Eurasia.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Temperate & Steppe Eurasia",
    "flightDistanceKm": 3800,
    "censusCountEst": "4,500–6,800 wintering individuals (NT)"
  },
  {
    "id": "mw-083",
    "speciesId": "sp-083",
    "commonName": "White-tailed Lapwing",
    "scientificName": "Vanellus leucurus",
    "localName": "Safed-dum Tituri",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland"
    ],
    "shortDescription": "White-tailed Lapwing (Vanellus leucurus) is an authentic Western Himalayan winter visitor migrating from Mesopotamian & Central Asian Marshes.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Mesopotamian & Central Asian Marshes",
    "flightDistanceKm": 2900,
    "censusCountEst": "250–450 individuals in sedge pans"
  },
  {
    "id": "mw-084",
    "speciesId": "sp-084",
    "commonName": "Sociable Lapwing",
    "scientificName": "Vanellus gregarius",
    "localName": "Kashmiri Tituri",
    "taxonomicGroup": "Waders",
    "conservationStatus": "CR",
    "isThreatened": true,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Agricultural",
      "Grassland"
    ],
    "shortDescription": "Sociable Lapwing (Vanellus gregarius) is an authentic Western Himalayan winter visitor migrating from Steppes of Kazakhstan & Southern Russia.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Agricultural Change",
        "severity": "Medium",
        "narrative": "Pesticide overuse and conversion of traditional fallow karewa habitats."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Steppes of Kazakhstan & Southern Russia",
    "flightDistanceKm": 3400,
    "censusCountEst": "Critically endangered steppe migrant (CR)"
  },
  {
    "id": "mw-085",
    "speciesId": "sp-085",
    "commonName": "Grey Plover",
    "scientificName": "Pluvialis squatarola",
    "localName": "Khaki Tituri",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Lake"
    ],
    "shortDescription": "Grey Plover (Pluvialis squatarola) is an authentic Western Himalayan winter visitor migrating from Arctic Coastal Tundra.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Arctic Coastal Tundra",
    "flightDistanceKm": 5900,
    "censusCountEst": "Large plover wintering in mudflats"
  },
  {
    "id": "mw-086",
    "speciesId": "sp-086",
    "commonName": "Pacific Golden Plover",
    "scientificName": "Pluvialis fulva",
    "localName": "Sonhari Tituri",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Agricultural",
      "Wetland"
    ],
    "shortDescription": "Pacific Golden Plover (Pluvialis fulva) is an authentic Western Himalayan winter visitor migrating from Siberian Arctic Tundra.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Siberian Arctic Tundra",
    "flightDistanceKm": 5700,
    "censusCountEst": "Golden spangled winter visitor"
  },
  {
    "id": "mw-087",
    "speciesId": "sp-087",
    "commonName": "European Golden Plover",
    "scientificName": "Pluvialis apricaria",
    "localName": "European Tituri",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Agricultural",
      "Grassland"
    ],
    "shortDescription": "European Golden Plover (Pluvialis apricaria) is an authentic Western Himalayan winter visitor migrating from Northern European Peatlands.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Agricultural Change",
        "severity": "Medium",
        "narrative": "Pesticide overuse and conversion of traditional fallow karewa habitats."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Northern European Peatlands",
    "flightDistanceKm": 4800,
    "censusCountEst": "Scarce winter plover"
  },
  {
    "id": "mw-088",
    "speciesId": "sp-088",
    "commonName": "Common Ringed Plover",
    "scientificName": "Charadrius hiaticula",
    "localName": "Tawq-dar Plover",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Riverine",
      "Wetland"
    ],
    "shortDescription": "Common Ringed Plover (Charadrius hiaticula) is an authentic Western Himalayan winter visitor migrating from Arctic & Subarctic Beaches.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Arctic & Subarctic Beaches",
    "flightDistanceKm": 5400,
    "censusCountEst": "Single-banded shorebird"
  },
  {
    "id": "mw-089",
    "speciesId": "sp-089",
    "commonName": "Little Ringed Plover",
    "scientificName": "Charadrius dubius",
    "localName": "Chhota Tawq-dar",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Riverine",
      "Wetland"
    ],
    "shortDescription": "Little Ringed Plover (Charadrius dubius) is an authentic Western Himalayan winter visitor migrating from Eurasian River Shingle.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Eurasian River Shingle",
    "flightDistanceKm": 2200,
    "censusCountEst": "Gravel bank winter resident"
  },
  {
    "id": "mw-090",
    "speciesId": "sp-090",
    "commonName": "Kentish Plover",
    "scientificName": "Charadrius alexandrinus",
    "localName": "Kentish Plover",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Lake"
    ],
    "shortDescription": "Kentish Plover (Charadrius alexandrinus) is an authentic Western Himalayan winter visitor migrating from Inland Saline Lakes of Central Asia.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Inland Saline Lakes of Central Asia",
    "flightDistanceKm": 2800,
    "censusCountEst": "Broken-collared shorebird"
  },
  {
    "id": "mw-091",
    "speciesId": "sp-091",
    "commonName": "Lesser Sand Plover",
    "scientificName": "Charadrius mongolus",
    "localName": "Mongol Plover",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "Ladakh"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake",
      "Riverine"
    ],
    "shortDescription": "Lesser Sand Plover (Charadrius mongolus) is an authentic Western Himalayan winter visitor migrating from High Tibetan Plateau Shingle.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "High Tibetan Plateau Shingle",
    "flightDistanceKm": 1600,
    "censusCountEst": "Breeds Ladakh; winters in plains"
  },
  {
    "id": "mw-092",
    "speciesId": "sp-092",
    "commonName": "Greater Sand Plover",
    "scientificName": "Charadrius leschenaultii",
    "localName": "Bod Sand Plover",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake",
      "Riverine"
    ],
    "shortDescription": "Greater Sand Plover (Charadrius leschenaultii) is an authentic Western Himalayan winter visitor migrating from Central Asian Deserts & Shingle.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Asian Deserts & Shingle",
    "flightDistanceKm": 2900,
    "censusCountEst": "Winter visitor along gravel bars"
  },
  {
    "id": "mw-093",
    "speciesId": "sp-093",
    "commonName": "Caspian Plover",
    "scientificName": "Charadrius asiaticus",
    "localName": "Caspian Plover",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Agricultural",
      "Grassland"
    ],
    "shortDescription": "Caspian Plover (Charadrius asiaticus) is an authentic Western Himalayan winter visitor migrating from Caspian Steppes & Salt Flats.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Agricultural Change",
        "severity": "Medium",
        "narrative": "Pesticide overuse and conversion of traditional fallow karewa habitats."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Caspian Steppes & Salt Flats",
    "flightDistanceKm": 3200,
    "censusCountEst": "Passage and winter plover"
  },
  {
    "id": "mw-094",
    "speciesId": "sp-094",
    "commonName": "Oriental Plover",
    "scientificName": "Charadrius veredus",
    "localName": "Mashriqi Plover",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Agricultural",
      "Grassland"
    ],
    "shortDescription": "Oriental Plover (Charadrius veredus) is an authentic Western Himalayan winter visitor migrating from Mongolian Steppes.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Agricultural Change",
        "severity": "Medium",
        "narrative": "Pesticide overuse and conversion of traditional fallow karewa habitats."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Mongolian Steppes",
    "flightDistanceKm": 4300,
    "censusCountEst": "Rare passage visitor"
  },
  {
    "id": "mw-095",
    "speciesId": "sp-095",
    "commonName": "Brown-headed Gull",
    "scientificName": "Chroicocephalus brunnicephalus",
    "localName": "Himalayan Chen",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "Ladakh"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake",
      "Riverine"
    ],
    "shortDescription": "Brown-headed Gull (Chroicocephalus brunnicephalus) is an authentic Western Himalayan winter visitor migrating from Ladakh High Lakes (Tso Moriri).",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Ladakh High Lakes (Tso Moriri)",
    "flightDistanceKm": 1900,
    "censusCountEst": "4,000+ breeding Ladakh; winters valley"
  },
  {
    "id": "mw-096",
    "speciesId": "sp-096",
    "commonName": "Black-headed Gull",
    "scientificName": "Chroicocephalus ridibundus",
    "localName": "Daryaee Chen",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Riverine",
      "Lake",
      "Urban"
    ],
    "shortDescription": "Black-headed Gull (Chroicocephalus ridibundus) is an authentic Western Himalayan winter visitor migrating from Central Asian & Russian Taiga.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Asian & Russian Taiga",
    "flightDistanceKm": 3900,
    "censusCountEst": "8,000–12,000 on Dal and Jhelum"
  },
  {
    "id": "mw-097",
    "speciesId": "sp-097",
    "commonName": "Slender-billed Gull",
    "scientificName": "Chroicocephalus genei",
    "localName": "Patli-choch Chen",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake",
      "Wetland"
    ],
    "shortDescription": "Slender-billed Gull (Chroicocephalus genei) is an authentic Western Himalayan winter visitor migrating from Caspian and Black Sea lagoons.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Caspian and Black Sea lagoons",
    "flightDistanceKm": 3300,
    "censusCountEst": "Winter visitor in open lakes"
  },
  {
    "id": "mw-098",
    "speciesId": "sp-098",
    "commonName": "Pallas's Gull",
    "scientificName": "Ichthyaetus ichthyaetus",
    "localName": "Bod Kala-sir Chen",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake",
      "Riverine"
    ],
    "shortDescription": "Pallas's Gull (Ichthyaetus ichthyaetus) is an authentic Western Himalayan winter visitor migrating from Central Asian Inland Seas.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Asian Inland Seas",
    "flightDistanceKm": 3200,
    "censusCountEst": "Huge predator gull wintering on lakes"
  },
  {
    "id": "mw-099",
    "speciesId": "sp-099",
    "commonName": "Mew Gull",
    "scientificName": "Larus canus",
    "localName": "Mew Gull",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake"
    ],
    "shortDescription": "Mew Gull (Larus canus) is an authentic Western Himalayan winter visitor migrating from Northern Palearctic Lakes.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Northern Palearctic Lakes",
    "flightDistanceKm": 4700,
    "censusCountEst": "Scarce winter gull"
  },
  {
    "id": "mw-100",
    "speciesId": "sp-100",
    "commonName": "Caspian Gull",
    "scientificName": "Larus cachinnans",
    "localName": "Caspian Gull",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake",
      "Riverine"
    ],
    "shortDescription": "Caspian Gull (Larus cachinnans) is an authentic Western Himalayan winter visitor migrating from Black Sea & Caspian Steppes.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Black Sea & Caspian Steppes",
    "flightDistanceKm": 3400,
    "censusCountEst": "Large white-headed winter gull"
  },
  {
    "id": "mw-101",
    "speciesId": "sp-101",
    "commonName": "Steppe Gull",
    "scientificName": "Larus barabensis",
    "localName": "Steppe Gull",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake",
      "Riverine"
    ],
    "shortDescription": "Steppe Gull (Larus barabensis) is an authentic Western Himalayan winter visitor migrating from Kazakhstan Steppe Lakes.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Kazakhstan Steppe Lakes",
    "flightDistanceKm": 3100,
    "censusCountEst": "Common winter gull across valley"
  },
  {
    "id": "mw-102",
    "speciesId": "sp-102",
    "commonName": "Lesser Black-backed Gull",
    "scientificName": "Larus fuscus",
    "localName": "Siyah-pusht Chen",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake"
    ],
    "shortDescription": "Lesser Black-backed Gull (Larus fuscus) is an authentic Western Himalayan winter visitor migrating from Northern European Coast.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Northern European Coast",
    "flightDistanceKm": 4900,
    "censusCountEst": "Dark-backed winter visitor"
  },
  {
    "id": "mw-103",
    "speciesId": "sp-103",
    "commonName": "Whiskered Tern",
    "scientificName": "Chlidonias hybrida",
    "localName": "Kretsch / Machli-pakad",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake",
      "Wetland"
    ],
    "shortDescription": "Whiskered Tern (Chlidonias hybrida) is an authentic Western Himalayan winter visitor migrating from Indian Subcontinent Lagoons.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Indian Subcontinent Lagoons",
    "flightDistanceKm": 2400,
    "censusCountEst": "Marsh tern wintering & breeding"
  },
  {
    "id": "mw-104",
    "speciesId": "sp-104",
    "commonName": "White-winged Tern",
    "scientificName": "Chlidonias leucopterus",
    "localName": "Safed-par Kretsch",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake",
      "Wetland"
    ],
    "shortDescription": "White-winged Tern (Chlidonias leucopterus) is an authentic Western Himalayan winter visitor migrating from Siberian Freshwater Marshes.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Siberian Freshwater Marshes",
    "flightDistanceKm": 4600,
    "censusCountEst": "Passage & winter visitor"
  },
  {
    "id": "mw-105",
    "speciesId": "sp-105",
    "commonName": "Black Tern",
    "scientificName": "Chlidonias niger",
    "localName": "Siyah Kretsch",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake",
      "Wetland"
    ],
    "shortDescription": "Black Tern (Chlidonias niger) is an authentic Western Himalayan winter visitor migrating from Eurasian Marshlands.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Eurasian Marshlands",
    "flightDistanceKm": 4200,
    "censusCountEst": "Scarce winter marsh tern"
  },
  {
    "id": "mw-106",
    "speciesId": "sp-106",
    "commonName": "Caspian Tern",
    "scientificName": "Hydroprogne caspia",
    "localName": "Bod Kretsch",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake",
      "Riverine"
    ],
    "shortDescription": "Caspian Tern (Hydroprogne caspia) is an authentic Western Himalayan winter visitor migrating from Baltic & Black Sea Coasts.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Baltic & Black Sea Coasts",
    "flightDistanceKm": 3800,
    "censusCountEst": "Giant red-billed diving tern"
  },
  {
    "id": "mw-107",
    "speciesId": "sp-107",
    "commonName": "Great Cormorant",
    "scientificName": "Phalacrocorax carbo",
    "localName": "Bod Pan-kawa",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake",
      "Riverine"
    ],
    "shortDescription": "Great Cormorant (Phalacrocorax carbo) is an authentic Western Himalayan winter visitor migrating from Central Asian Lakes & Rivers.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Asian Lakes & Rivers",
    "flightDistanceKm": 2600,
    "censusCountEst": "Large winter diving fish predator"
  },
  {
    "id": "mw-108",
    "speciesId": "sp-108",
    "commonName": "Little Cormorant",
    "scientificName": "Microcarbo niger",
    "localName": "Chhota Pan-kawa",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake",
      "Wetland"
    ],
    "shortDescription": "Little Cormorant (Microcarbo niger) is an authentic Western Himalayan winter visitor migrating from Indo-Gangetic Waterbodies.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Indo-Gangetic Waterbodies",
    "flightDistanceKm": 900,
    "censusCountEst": "Winter influx to valley lakes"
  },
  {
    "id": "mw-109",
    "speciesId": "sp-109",
    "commonName": "Great White Pelican",
    "scientificName": "Pelecanus onocrotalus",
    "localName": "Hawasil / Pelican",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake",
      "Wetland"
    ],
    "shortDescription": "Great White Pelican (Pelecanus onocrotalus) is an authentic Western Himalayan winter visitor migrating from Danube Delta & Caspian Lakes.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Danube Delta & Caspian Lakes",
    "flightDistanceKm": 3700,
    "censusCountEst": "Winter visitor in large wetlands"
  },
  {
    "id": "mw-110",
    "speciesId": "sp-110",
    "commonName": "Dalmatian Pelican",
    "scientificName": "Pelecanus crispus",
    "localName": "Khaki Pelican",
    "taxonomicGroup": "Others",
    "conservationStatus": "NT",
    "isThreatened": true,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake",
      "Wetland"
    ],
    "shortDescription": "Dalmatian Pelican (Pelecanus crispus) is an authentic Western Himalayan winter visitor migrating from Central Asian Inland Deltas.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Asian Inland Deltas",
    "flightDistanceKm": 3500,
    "censusCountEst": "Near-threatened giant waterbird (NT)"
  },
  {
    "id": "mw-111",
    "speciesId": "sp-111",
    "commonName": "Western Marsh Harrier",
    "scientificName": "Circus aeruginosus",
    "localName": "Dapan-baz / Dal-baz",
    "taxonomicGroup": "Raptors",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Agricultural",
      "Lake"
    ],
    "shortDescription": "Western Marsh Harrier (Circus aeruginosus) is an authentic Western Himalayan winter visitor migrating from Central Asian Reedbed Wetlands.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Asian Reedbed Wetlands",
    "flightDistanceKm": 3700,
    "censusCountEst": "450–650 wintering individuals"
  },
  {
    "id": "mw-112",
    "speciesId": "sp-112",
    "commonName": "Hen Harrier",
    "scientificName": "Circus cyaneus",
    "localName": "Safed-baz / Karewa Harrier",
    "taxonomicGroup": "Raptors",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Grassland",
      "Agricultural",
      "Wetland"
    ],
    "shortDescription": "Hen Harrier (Circus cyaneus) is an authentic Western Himalayan winter visitor migrating from Siberian Taiga & Forest Tundra.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Siberian Taiga & Forest Tundra",
    "flightDistanceKm": 4600,
    "censusCountEst": "120–200 wintering individuals"
  },
  {
    "id": "mw-113",
    "speciesId": "sp-113",
    "commonName": "Pallid Harrier",
    "scientificName": "Circus macrourus",
    "localName": "Zard-baz",
    "taxonomicGroup": "Raptors",
    "conservationStatus": "NT",
    "isThreatened": true,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Grassland",
      "Agricultural"
    ],
    "shortDescription": "Pallid Harrier (Circus macrourus) is an authentic Western Himalayan winter visitor migrating from Steppes of Kazakhstan & Russia.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Agricultural Change",
        "severity": "Medium",
        "narrative": "Pesticide overuse and conversion of traditional fallow karewa habitats."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Steppes of Kazakhstan & Russia",
    "flightDistanceKm": 3600,
    "censusCountEst": "Near-threatened harrier (NT)"
  },
  {
    "id": "mw-114",
    "speciesId": "sp-114",
    "commonName": "Montagu's Harrier",
    "scientificName": "Circus pygargus",
    "localName": "Chhota Safed-baz",
    "taxonomicGroup": "Raptors",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Agricultural",
      "Grassland"
    ],
    "shortDescription": "Montagu's Harrier (Circus pygargus) is an authentic Western Himalayan winter visitor migrating from Eurasian Grasslands & Steppes.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Agricultural Change",
        "severity": "Medium",
        "narrative": "Pesticide overuse and conversion of traditional fallow karewa habitats."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Eurasian Grasslands & Steppes",
    "flightDistanceKm": 3800,
    "censusCountEst": "Passage & wintering raptor"
  },
  {
    "id": "mw-115",
    "speciesId": "sp-115",
    "commonName": "Steppe Eagle",
    "scientificName": "Aquila nipalensis",
    "localName": "Garud / Pahadi Uqaab",
    "taxonomicGroup": "Raptors",
    "conservationStatus": "EN",
    "isThreatened": true,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Alpine",
      "Grassland",
      "Agricultural"
    ],
    "shortDescription": "Steppe Eagle (Aquila nipalensis) is an authentic Western Himalayan winter visitor migrating from Steppes of Kazakhstan & Mongolia.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Steppes of Kazakhstan & Mongolia",
    "flightDistanceKm": 4800,
    "censusCountEst": "Endangered passage raptor (EN)"
  },
  {
    "id": "mw-116",
    "speciesId": "sp-116",
    "commonName": "Greater Spotted Eagle",
    "scientificName": "Clanga clanga",
    "localName": "Kala Uqaab / Dal Eagle",
    "taxonomicGroup": "Raptors",
    "conservationStatus": "VU",
    "isThreatened": true,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Forest"
    ],
    "shortDescription": "Greater Spotted Eagle (Clanga clanga) is an authentic Western Himalayan winter visitor migrating from Wet Lowland Forests of Russia.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Wet Lowland Forests of Russia",
    "flightDistanceKm": 4100,
    "censusCountEst": "60–110 wintering individuals (VU)"
  },
  {
    "id": "mw-117",
    "speciesId": "sp-117",
    "commonName": "Eastern Imperial Eagle",
    "scientificName": "Aquila heliaca",
    "localName": "Shahi Uqaab",
    "taxonomicGroup": "Raptors",
    "conservationStatus": "VU",
    "isThreatened": true,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Agricultural",
      "Wetland",
      "Forest"
    ],
    "shortDescription": "Eastern Imperial Eagle (Aquila heliaca) is an authentic Western Himalayan winter visitor migrating from Eurasian Forest-Steppes.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Eurasian Forest-Steppes",
    "flightDistanceKm": 4300,
    "censusCountEst": "Vulnerable apex winter predator (VU)"
  },
  {
    "id": "mw-118",
    "speciesId": "sp-118",
    "commonName": "Golden Eagle",
    "scientificName": "Aquila chrysaetos",
    "localName": "Sonhari Uqaab",
    "taxonomicGroup": "Raptors",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Alpine",
      "Forest"
    ],
    "shortDescription": "Golden Eagle (Aquila chrysaetos) is an authentic Western Himalayan winter visitor migrating from High Himalayan Montane Peaks.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "High Himalayan Montane Peaks",
    "flightDistanceKm": 900,
    "censusCountEst": "Altitudinal winter mover into valleys"
  },
  {
    "id": "mw-119",
    "speciesId": "sp-119",
    "commonName": "Pallas's Fish Eagle",
    "scientificName": "Haliaeetus leucoryphus",
    "localName": "Daryaee Uqaab",
    "taxonomicGroup": "Raptors",
    "conservationStatus": "EN",
    "isThreatened": true,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake",
      "Riverine",
      "Wetland"
    ],
    "shortDescription": "Pallas's Fish Eagle (Haliaeetus leucoryphus) is an authentic Western Himalayan winter visitor migrating from Central Asian Wetland Basins.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Asian Wetland Basins",
    "flightDistanceKm": 2600,
    "censusCountEst": "Endangered fish-hunting eagle (EN)"
  },
  {
    "id": "mw-120",
    "speciesId": "sp-120",
    "commonName": "White-tailed Eagle",
    "scientificName": "Haliaeetus albicilla",
    "localName": "Safed-dum Uqaab",
    "taxonomicGroup": "Raptors",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake",
      "Wetland"
    ],
    "shortDescription": "White-tailed Eagle (Haliaeetus albicilla) is an authentic Western Himalayan winter visitor migrating from Russian River Basins & Coast.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Russian River Basins & Coast",
    "flightDistanceKm": 4600,
    "censusCountEst": "Rare giant winter sea eagle"
  },
  {
    "id": "mw-121",
    "speciesId": "sp-121",
    "commonName": "Osprey",
    "scientificName": "Pandion haliaetus",
    "localName": "Mach-baz / Machli-maar",
    "taxonomicGroup": "Raptors",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Lake",
      "Riverine",
      "Wetland"
    ],
    "shortDescription": "Osprey (Pandion haliaetus) is an authentic Western Himalayan winter visitor migrating from Russian River Systems.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Russian River Systems",
    "flightDistanceKm": 4300,
    "censusCountEst": "80–140 wintering individuals"
  },
  {
    "id": "mw-122",
    "speciesId": "sp-122",
    "commonName": "Red Kite",
    "scientificName": "Milvus milvus",
    "localName": "Lal Cheel",
    "taxonomicGroup": "Raptors",
    "conservationStatus": "NT",
    "isThreatened": true,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Agricultural",
      "Forest"
    ],
    "shortDescription": "Red Kite (Milvus milvus) is an authentic Western Himalayan winter visitor migrating from Western Palearctic Woodlands.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Western Palearctic Woodlands",
    "flightDistanceKm": 4700,
    "censusCountEst": "Near-threatened winter kite (NT)"
  },
  {
    "id": "mw-123",
    "speciesId": "sp-123",
    "commonName": "Black Kite",
    "scientificName": "Milvus migrans",
    "localName": "Gantsh / Kali Cheel",
    "taxonomicGroup": "Raptors",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Urban",
      "Agricultural",
      "Wetland"
    ],
    "shortDescription": "Black Kite (Milvus migrans) is an authentic Western Himalayan winter visitor migrating from Central Asian Boreal Forests.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Asian Boreal Forests",
    "flightDistanceKm": 2800,
    "censusCountEst": "Ubiquitous winter scavenger"
  },
  {
    "id": "mw-124",
    "speciesId": "sp-124",
    "commonName": "Common Buzzard",
    "scientificName": "Buteo buteo",
    "localName": "Aam Teesa",
    "taxonomicGroup": "Raptors",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Forest",
      "Agricultural"
    ],
    "shortDescription": "Common Buzzard (Buteo buteo) is an authentic Western Himalayan winter visitor migrating from Palearctic Woodlands & Steppes.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Palearctic Woodlands & Steppes",
    "flightDistanceKm": 4200,
    "censusCountEst": "Perching raptor on winter posts"
  },
  {
    "id": "mw-125",
    "speciesId": "sp-125",
    "commonName": "Long-legged Buzzard",
    "scientificName": "Buteo rufinus",
    "localName": "Lambi-tanga Teesa",
    "taxonomicGroup": "Raptors",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Grassland",
      "Agricultural"
    ],
    "shortDescription": "Long-legged Buzzard (Buteo rufinus) is an authentic Western Himalayan winter visitor migrating from Central Asian Semi-deserts.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Agricultural Change",
        "severity": "Medium",
        "narrative": "Pesticide overuse and conversion of traditional fallow karewa habitats."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Asian Semi-deserts",
    "flightDistanceKm": 3100,
    "censusCountEst": "Common winter buzzard on karewas"
  },
  {
    "id": "mw-126",
    "speciesId": "sp-126",
    "commonName": "Upland Buzzard",
    "scientificName": "Buteo hemilasius",
    "localName": "Pahadi Teesa",
    "taxonomicGroup": "Raptors",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "Ladakh",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Alpine",
      "Cold Desert"
    ],
    "shortDescription": "Upland Buzzard (Buteo hemilasius) is an authentic Western Himalayan winter visitor migrating from Tibetan Plateau & Mongolia.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Tibetan Plateau & Mongolia",
    "flightDistanceKm": 2200,
    "censusCountEst": "High-altitude winter raptor in Ladakh"
  },
  {
    "id": "mw-127",
    "speciesId": "sp-127",
    "commonName": "Rough-legged Buzzard",
    "scientificName": "Buteo lagopus",
    "localName": "Par-dar Teesa",
    "taxonomicGroup": "Raptors",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Grassland",
      "Agricultural"
    ],
    "shortDescription": "Rough-legged Buzzard (Buteo lagopus) is an authentic Western Himalayan winter visitor migrating from Arctic Tundra.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Agricultural Change",
        "severity": "Medium",
        "narrative": "Pesticide overuse and conversion of traditional fallow karewa habitats."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Arctic Tundra",
    "flightDistanceKm": 5900,
    "censusCountEst": "Rare northern winter visitor"
  },
  {
    "id": "mw-128",
    "speciesId": "sp-128",
    "commonName": "Eurasian Sparrowhawk",
    "scientificName": "Accipiter nisus",
    "localName": "Basha / Shikra",
    "taxonomicGroup": "Raptors",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Forest",
      "Urban",
      "Agricultural"
    ],
    "shortDescription": "Eurasian Sparrowhawk (Accipiter nisus) is an authentic Western Himalayan winter visitor migrating from Palearctic Conifer Forests.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Palearctic Conifer Forests",
    "flightDistanceKm": 3800,
    "censusCountEst": "Fast woodland bird-hunter"
  },
  {
    "id": "mw-129",
    "speciesId": "sp-129",
    "commonName": "Northern Goshawk",
    "scientificName": "Accipiter gentilis",
    "localName": "Bod Baz",
    "taxonomicGroup": "Raptors",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Northern Goshawk (Accipiter gentilis) is an authentic Western Himalayan winter visitor migrating from Boreal Taiga & Montane Fir.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Boreal Taiga & Montane Fir",
    "flightDistanceKm": 4300,
    "censusCountEst": "Fierce forest raptor descending in winter"
  },
  {
    "id": "mw-130",
    "speciesId": "sp-130",
    "commonName": "Eurasian Kestrel",
    "scientificName": "Falco tinnunculus",
    "localName": "Tontsh / Kestrel",
    "taxonomicGroup": "Raptors",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Agricultural",
      "Grassland",
      "Urban"
    ],
    "shortDescription": "Eurasian Kestrel (Falco tinnunculus) is an authentic Western Himalayan winter visitor migrating from Palearctic Open Country.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Agricultural Change",
        "severity": "Medium",
        "narrative": "Pesticide overuse and conversion of traditional fallow karewa habitats."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Palearctic Open Country",
    "flightDistanceKm": 2800,
    "censusCountEst": "Hovering mouser across fields"
  },
  {
    "id": "mw-131",
    "speciesId": "sp-131",
    "commonName": "Merlin",
    "scientificName": "Falco columbarius",
    "localName": "Chhota Falcon",
    "taxonomicGroup": "Raptors",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Agricultural",
      "Grassland"
    ],
    "shortDescription": "Merlin (Falco columbarius) is an authentic Western Himalayan winter visitor migrating from Northern Boreal Forest Edge.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Agricultural Change",
        "severity": "Medium",
        "narrative": "Pesticide overuse and conversion of traditional fallow karewa habitats."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Northern Boreal Forest Edge",
    "flightDistanceKm": 4900,
    "censusCountEst": "Low-level darting falcon in winter"
  },
  {
    "id": "mw-132",
    "speciesId": "sp-132",
    "commonName": "Peregrine Falcon",
    "scientificName": "Falco peregrinus",
    "localName": "Shaheen / Bahr-i-Kashmir",
    "taxonomicGroup": "Raptors",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Lake",
      "Alpine"
    ],
    "shortDescription": "Peregrine Falcon (Falco peregrinus) is an authentic Western Himalayan winter visitor migrating from Siberian Arctic Tundra (calidus).",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Siberian Arctic Tundra (calidus)",
    "flightDistanceKm": 5300,
    "censusCountEst": "90–150 wintering duck-hunters"
  },
  {
    "id": "mw-133",
    "speciesId": "sp-133",
    "commonName": "Saker Falcon",
    "scientificName": "Falco cherrug",
    "localName": "Cherrug / Saker",
    "taxonomicGroup": "Raptors",
    "conservationStatus": "EN",
    "isThreatened": true,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "Ladakh"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Grassland",
      "Cold Desert"
    ],
    "shortDescription": "Saker Falcon (Falco cherrug) is an authentic Western Himalayan winter visitor migrating from Central Asian Steppes & Deserts.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Asian Steppes & Deserts",
    "flightDistanceKm": 3400,
    "censusCountEst": "Endangered desert falcon (EN)"
  },
  {
    "id": "mw-134",
    "speciesId": "sp-134",
    "commonName": "Cinereous Vulture",
    "scientificName": "Aegypius monachus",
    "localName": "Kala Gidh",
    "taxonomicGroup": "Raptors",
    "conservationStatus": "NT",
    "isThreatened": true,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Alpine",
      "Forest"
    ],
    "shortDescription": "Cinereous Vulture (Aegypius monachus) is an authentic Western Himalayan winter visitor migrating from Southern Palearctic Mountains.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Southern Palearctic Mountains",
    "flightDistanceKm": 2900,
    "censusCountEst": "Near-threatened scavenger (NT)"
  },
  {
    "id": "mw-135",
    "speciesId": "sp-135",
    "commonName": "Bearded Vulture",
    "scientificName": "Gypaetus barbatus",
    "localName": "Lammergeier / Huma",
    "taxonomicGroup": "Raptors",
    "conservationStatus": "NT",
    "isThreatened": true,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Alpine"
    ],
    "shortDescription": "Bearded Vulture (Gypaetus barbatus) is an authentic Western Himalayan winter visitor migrating from High Himalayan Mountain Crags.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "High Himalayan Mountain Crags",
    "flightDistanceKm": 800,
    "censusCountEst": "Bone-dropping scavenger (NT)"
  },
  {
    "id": "mw-136",
    "speciesId": "sp-136",
    "commonName": "Himalayan Griffon",
    "scientificName": "Gyps himalayensis",
    "localName": "Himalayan Gidh",
    "taxonomicGroup": "Raptors",
    "conservationStatus": "NT",
    "isThreatened": true,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Alpine"
    ],
    "shortDescription": "Himalayan Griffon (Gyps himalayensis) is an authentic Western Himalayan winter visitor migrating from High Himalayan Passes.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "High Himalayan Passes",
    "flightDistanceKm": 750,
    "censusCountEst": "Giant mountain vulture (NT)"
  },
  {
    "id": "mw-137",
    "speciesId": "sp-137",
    "commonName": "Short-eared Owl",
    "scientificName": "Asio flammeus",
    "localName": "Chhota-kan Ullu",
    "taxonomicGroup": "Raptors",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Grassland",
      "Agricultural"
    ],
    "shortDescription": "Short-eared Owl (Asio flammeus) is an authentic Western Himalayan winter visitor migrating from Eurasian Boreal Peatlands.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Agricultural Change",
        "severity": "Medium",
        "narrative": "Pesticide overuse and conversion of traditional fallow karewa habitats."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Eurasian Boreal Peatlands",
    "flightDistanceKm": 4500,
    "censusCountEst": "Diurnal hunter quartering winter fields"
  },
  {
    "id": "mw-138",
    "speciesId": "sp-138",
    "commonName": "Long-eared Owl",
    "scientificName": "Asio otus",
    "localName": "Lamba-kan Ullu",
    "taxonomicGroup": "Raptors",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Forest",
      "Agricultural"
    ],
    "shortDescription": "Long-eared Owl (Asio otus) is an authentic Western Himalayan winter visitor migrating from Palearctic Conifer Belts.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Palearctic Conifer Belts",
    "flightDistanceKm": 4100,
    "censusCountEst": "Roosts colonially in winter orchards"
  },
  {
    "id": "mw-139",
    "speciesId": "sp-139",
    "commonName": "Eurasian Eagle-Owl",
    "scientificName": "Bubo bubo",
    "localName": "Bod Ullu",
    "taxonomicGroup": "Raptors",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Alpine",
      "Forest"
    ],
    "shortDescription": "Eurasian Eagle-Owl (Bubo bubo) is an authentic Western Himalayan winter visitor migrating from Rocky Crags & Forest Gorges.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Rocky Crags & Forest Gorges",
    "flightDistanceKm": 1200,
    "censusCountEst": "Giant nocturnal predator"
  },
  {
    "id": "mw-140",
    "speciesId": "sp-140",
    "commonName": "Tawny Owl",
    "scientificName": "Strix aluco",
    "localName": "Bhoora Ullu",
    "taxonomicGroup": "Raptors",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Tawny Owl (Strix aluco) is an authentic Western Himalayan winter visitor migrating from Temperate Broadleaf Woodlands.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Temperate Broadleaf Woodlands",
    "flightDistanceKm": 1400,
    "censusCountEst": "Montane forest winter resident"
  },
  {
    "id": "mw-141",
    "speciesId": "sp-141",
    "commonName": "Boreal Owl",
    "scientificName": "Aegolius funereus",
    "localName": "Tengmalm Ullu",
    "taxonomicGroup": "Raptors",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Forest",
      "Alpine"
    ],
    "shortDescription": "Boreal Owl (Aegolius funereus) is an authentic Western Himalayan winter visitor migrating from Subalpine Fir & Birch.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Subalpine Fir & Birch",
    "flightDistanceKm": 3600,
    "censusCountEst": "Rare high-elevation owl"
  },
  {
    "id": "mw-142",
    "speciesId": "sp-142",
    "commonName": "Little Owl",
    "scientificName": "Athene noctua",
    "localName": "Chhota Ullu",
    "taxonomicGroup": "Raptors",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "Ladakh"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Cold Desert",
      "Agricultural"
    ],
    "shortDescription": "Little Owl (Athene noctua) is an authentic Western Himalayan winter visitor migrating from Central Asian Steppes & Ladakh.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Asian Steppes & Ladakh",
    "flightDistanceKm": 1500,
    "censusCountEst": "Diurnal rocky owl in Ladakh/Kashmir"
  },
  {
    "id": "mw-143",
    "speciesId": "sp-143",
    "commonName": "Common Crane",
    "scientificName": "Grus grus",
    "localName": "Kondil / Kulaang",
    "taxonomicGroup": "Cranes",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Agricultural",
      "Wetland"
    ],
    "shortDescription": "Common Crane (Grus grus) is an authentic Western Himalayan winter visitor migrating from Northern Russian Bogs & Taiga.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Northern Russian Bogs & Taiga",
    "flightDistanceKm": 4500,
    "censusCountEst": "2,500–4,000 passage & wintering"
  },
  {
    "id": "mw-144",
    "speciesId": "sp-144",
    "commonName": "Demoiselle Crane",
    "scientificName": "Grus virgo",
    "localName": "Koonj / Kurkunja",
    "taxonomicGroup": "Cranes",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Agricultural",
      "Grassland",
      "Alpine"
    ],
    "shortDescription": "Demoiselle Crane (Grus virgo) is an authentic Western Himalayan winter visitor migrating from Mongolia & Kazakhstan Steppes.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Mongolia & Kazakhstan Steppes",
    "flightDistanceKm": 4200,
    "censusCountEst": "40,000+ pass over Pir Panjal"
  },
  {
    "id": "mw-145",
    "speciesId": "sp-145",
    "commonName": "Black Stork",
    "scientificName": "Ciconia nigra",
    "localName": "Siyah Laglag",
    "taxonomicGroup": "Cranes",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Riverine",
      "Wetland"
    ],
    "shortDescription": "Black Stork (Ciconia nigra) is an authentic Western Himalayan winter visitor migrating from Eurasian River Canyons & Forests.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Eurasian River Canyons & Forests",
    "flightDistanceKm": 3800,
    "censusCountEst": "Secretive winter river visitor"
  },
  {
    "id": "mw-146",
    "speciesId": "sp-146",
    "commonName": "White Stork",
    "scientificName": "Ciconia ciconia",
    "localName": "Safed Laglag",
    "taxonomicGroup": "Cranes",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Agricultural",
      "Wetland"
    ],
    "shortDescription": "White Stork (Ciconia ciconia) is an authentic Western Himalayan winter visitor migrating from European & Central Asian Meadows.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "European & Central Asian Meadows",
    "flightDistanceKm": 4100,
    "censusCountEst": "Winter visitor in flooded paddies"
  },
  {
    "id": "mw-147",
    "speciesId": "sp-147",
    "commonName": "Great Bittern",
    "scientificName": "Botaurus stellaris",
    "localName": "Bod Bittern / Jal-bagla",
    "taxonomicGroup": "Cranes",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland"
    ],
    "shortDescription": "Great Bittern (Botaurus stellaris) is an authentic Western Himalayan winter visitor migrating from European & Siberian Reed Swamps.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "European & Siberian Reed Swamps",
    "flightDistanceKm": 4200,
    "censusCountEst": "Cryptic booming reed dweller"
  },
  {
    "id": "mw-148",
    "speciesId": "sp-148",
    "commonName": "Eurasian Bittern",
    "scientificName": "Botaurus stellaris stellaris",
    "localName": "Shahi Bittern",
    "taxonomicGroup": "Cranes",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland"
    ],
    "shortDescription": "Eurasian Bittern (Botaurus stellaris stellaris) is an authentic Western Himalayan winter visitor migrating from Northern Eurasian Phragmites.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Northern Eurasian Phragmites",
    "flightDistanceKm": 4300,
    "censusCountEst": "Rare winter reed specialist"
  },
  {
    "id": "mw-149",
    "speciesId": "sp-149",
    "commonName": "Grey Heron",
    "scientificName": "Ardea cinerea",
    "localName": "Brai / Bagla",
    "taxonomicGroup": "Cranes",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Lake",
      "Riverine"
    ],
    "shortDescription": "Grey Heron (Ardea cinerea) is an authentic Western Himalayan winter visitor migrating from Palearctic Freshwater Basins.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Palearctic Freshwater Basins",
    "flightDistanceKm": 2200,
    "censusCountEst": "Stately gray winter fisher"
  },
  {
    "id": "mw-150",
    "speciesId": "sp-150",
    "commonName": "Purple Heron",
    "scientificName": "Ardea purpurea",
    "localName": "Lal Bagla",
    "taxonomicGroup": "Cranes",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland"
    ],
    "shortDescription": "Purple Heron (Ardea purpurea) is an authentic Western Himalayan winter visitor migrating from Temperate Eurasia Reedbeds.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Temperate Eurasia Reedbeds",
    "flightDistanceKm": 2800,
    "censusCountEst": "Tall dark heron in deep reeds"
  },
  {
    "id": "mw-151",
    "speciesId": "sp-151",
    "commonName": "Great Egret",
    "scientificName": "Ardea alba",
    "localName": "Bod Bagla",
    "taxonomicGroup": "Cranes",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Lake"
    ],
    "shortDescription": "Great Egret (Ardea alba) is an authentic Western Himalayan winter visitor migrating from Eurasian River Basins.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Eurasian River Basins",
    "flightDistanceKm": 2400,
    "censusCountEst": "Pure white large winter fisher"
  },
  {
    "id": "mw-152",
    "speciesId": "sp-152",
    "commonName": "Glossy Ibis",
    "scientificName": "Plegadis falcinellus",
    "localName": "Kawa-chaha",
    "taxonomicGroup": "Cranes",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Agricultural"
    ],
    "shortDescription": "Glossy Ibis (Plegadis falcinellus) is an authentic Western Himalayan winter visitor migrating from Central Asian & Mediterranean Marshes.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Asian & Mediterranean Marshes",
    "flightDistanceKm": 3200,
    "censusCountEst": "Iridescent dark passage visitor"
  },
  {
    "id": "mw-153",
    "speciesId": "sp-153",
    "commonName": "Eurasian Spoonbill",
    "scientificName": "Platalea leucorodia",
    "localName": "Chamcha-choch",
    "taxonomicGroup": "Cranes",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Lake"
    ],
    "shortDescription": "Eurasian Spoonbill (Platalea leucorodia) is an authentic Western Himalayan winter visitor migrating from Central Asian Wetlands & Delta.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Asian Wetlands & Delta",
    "flightDistanceKm": 3100,
    "censusCountEst": "Spatulate bill sweeping shallows"
  },
  {
    "id": "mw-154",
    "speciesId": "sp-154",
    "commonName": "Western Reef Heron",
    "scientificName": "Egretta gularis",
    "localName": "Samundari Bagla",
    "taxonomicGroup": "Cranes",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Riverine",
      "Lake"
    ],
    "shortDescription": "Western Reef Heron (Egretta gularis) is an authentic Western Himalayan winter visitor migrating from Arabian & Persian Gulf Coast.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Arabian & Persian Gulf Coast",
    "flightDistanceKm": 2200,
    "censusCountEst": "Rare winter visitor in Jammu/Kashmir"
  },
  {
    "id": "mw-155",
    "speciesId": "sp-155",
    "commonName": "Wallcreeper",
    "scientificName": "Tichodroma muraria",
    "localName": "Diwar-tser / Lal-pankhi",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Alpine",
      "Riverine",
      "Urban"
    ],
    "shortDescription": "Wallcreeper (Tichodroma muraria) is an authentic Western Himalayan winter visitor migrating from High Alpine Crags (descends to valleys).",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "High Alpine Crags (descends to valleys)",
    "flightDistanceKm": 600,
    "censusCountEst": "Altitudinal migrant to river gorges"
  },
  {
    "id": "mw-156",
    "speciesId": "sp-156",
    "commonName": "Grandala",
    "scientificName": "Grandala coelicolor",
    "localName": "Nil-grandala / Aasmani Bulbul",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Alpine",
      "Forest"
    ],
    "shortDescription": "Grandala (Grandala coelicolor) is an authentic Western Himalayan winter visitor migrating from Alpine Screes (descends to berry scrub).",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Alpine Screes (descends to berry scrub)",
    "flightDistanceKm": 800,
    "censusCountEst": "Luminous blue altitudinal migrant"
  },
  {
    "id": "mw-157",
    "speciesId": "sp-157",
    "commonName": "Güldenstädt's Redstart",
    "scientificName": "Phoenicurus erythrogastrus",
    "localName": "Lal-dum / Bod Lal-bulbul",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "Ladakh",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Alpine",
      "Cold Desert",
      "Riverine"
    ],
    "shortDescription": "Güldenstädt's Redstart (Phoenicurus erythrogastrus) is an authentic Western Himalayan winter visitor migrating from Alpine Boulder Fields & Ladakh.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Alpine Boulder Fields & Ladakh",
    "flightDistanceKm": 900,
    "censusCountEst": "Largest redstart; winters in buckthorn"
  },
  {
    "id": "mw-158",
    "speciesId": "sp-158",
    "commonName": "Blue-capped Redstart",
    "scientificName": "Phoenicurus coeruleocephala",
    "localName": "Nila-sir Lal-dum",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Forest",
      "Agricultural"
    ],
    "shortDescription": "Blue-capped Redstart (Phoenicurus coeruleocephala) is an authentic Western Himalayan winter visitor migrating from Subalpine Fir & Birch.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Subalpine Fir & Birch",
    "flightDistanceKm": 700,
    "censusCountEst": "Altitudinal descent to orchards"
  },
  {
    "id": "mw-159",
    "speciesId": "sp-159",
    "commonName": "Black Redstart",
    "scientificName": "Phoenicurus ochruros",
    "localName": "Kala Lal-dum",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Urban",
      "Agricultural",
      "Alpine"
    ],
    "shortDescription": "Black Redstart (Phoenicurus ochruros) is an authentic Western Himalayan winter visitor migrating from Palearctic Screes & Ruins.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Palearctic Screes & Ruins",
    "flightDistanceKm": 2400,
    "censusCountEst": "Tail-shivering winter visitor"
  },
  {
    "id": "mw-160",
    "speciesId": "sp-160",
    "commonName": "Eversmann's Redstart",
    "scientificName": "Phoenicurus erythronotus",
    "localName": "Eversmann Lal-dum",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Forest",
      "Agricultural"
    ],
    "shortDescription": "Eversmann's Redstart (Phoenicurus erythronotus) is an authentic Western Himalayan winter visitor migrating from Central Asian Tian Shan Mountains.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Asian Tian Shan Mountains",
    "flightDistanceKm": 2200,
    "censusCountEst": "Striking rufous-backed winterer"
  },
  {
    "id": "mw-161",
    "speciesId": "sp-161",
    "commonName": "Blue Rock Thrush",
    "scientificName": "Monticola solitarius",
    "localName": "Kastoor / Blue Thrush",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Alpine",
      "Urban"
    ],
    "shortDescription": "Blue Rock Thrush (Monticola solitarius) is an authentic Western Himalayan winter visitor migrating from Himalayan Cliffs & Gorges.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Himalayan Cliffs & Gorges",
    "flightDistanceKm": 850,
    "censusCountEst": "Melodious blue winter songster"
  },
  {
    "id": "mw-162",
    "speciesId": "sp-162",
    "commonName": "Common Starling",
    "scientificName": "Sturnus vulgaris",
    "localName": "Tsini-hont / Starling",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Agricultural",
      "Urban"
    ],
    "shortDescription": "Common Starling (Sturnus vulgaris) is an authentic Western Himalayan winter visitor migrating from Central Asian Steppes & Russia.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Agricultural Change",
        "severity": "Medium",
        "narrative": "Pesticide overuse and conversion of traditional fallow karewa habitats."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Asian Steppes & Russia",
    "flightDistanceKm": 3600,
    "censusCountEst": "Tens of thousands murmurating"
  },
  {
    "id": "mw-163",
    "speciesId": "sp-163",
    "commonName": "Rosy Starling",
    "scientificName": "Pastor roseus",
    "localName": "Til-chul / Gulabi Maina",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Agricultural",
      "Grassland"
    ],
    "shortDescription": "Rosy Starling (Pastor roseus) is an authentic Western Himalayan winter visitor migrating from Central Asian Steppes (Kazakhstan).",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Agricultural Change",
        "severity": "Medium",
        "narrative": "Pesticide overuse and conversion of traditional fallow karewa habitats."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Asian Steppes (Kazakhstan)",
    "flightDistanceKm": 2800,
    "censusCountEst": "Massive passage migrant flocks"
  },
  {
    "id": "mw-164",
    "speciesId": "sp-164",
    "commonName": "Redwing",
    "scientificName": "Turdus iliacus",
    "localName": "Lal-bazu Kastoor",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Forest",
      "Agricultural"
    ],
    "shortDescription": "Redwing (Turdus iliacus) is an authentic Western Himalayan winter visitor migrating from Northern Taiga of Fennoscandia.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Northern Taiga of Fennoscandia",
    "flightDistanceKm": 5400,
    "censusCountEst": "Near-threatened thrush visitor (NT)"
  },
  {
    "id": "mw-165",
    "speciesId": "sp-165",
    "commonName": "Fieldfare",
    "scientificName": "Turdus pilaris",
    "localName": "Chitrakabra Kastoor",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Forest",
      "Agricultural"
    ],
    "shortDescription": "Fieldfare (Turdus pilaris) is an authentic Western Himalayan winter visitor migrating from Boreal Birch Woodlands.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Boreal Birch Woodlands",
    "flightDistanceKm": 5100,
    "censusCountEst": "Gregarious winter berry-eater"
  },
  {
    "id": "mw-166",
    "speciesId": "sp-166",
    "commonName": "Song Thrush",
    "scientificName": "Turdus philomelos",
    "localName": "Naghma-zan Kastoor",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Forest",
      "Urban"
    ],
    "shortDescription": "Song Thrush (Turdus philomelos) is an authentic Western Himalayan winter visitor migrating from European & Russian Mixed Forests.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "European & Russian Mixed Forests",
    "flightDistanceKm": 4600,
    "censusCountEst": "Rare melodious winter thrush"
  },
  {
    "id": "mw-167",
    "speciesId": "sp-167",
    "commonName": "Mistle Thrush",
    "scientificName": "Turdus viscivorus",
    "localName": "Bod Kastoor",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Forest",
      "Agricultural"
    ],
    "shortDescription": "Mistle Thrush (Turdus viscivorus) is an authentic Western Himalayan winter visitor migrating from Himalayan & Eurasian Conifers.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Himalayan & Eurasian Conifers",
    "flightDistanceKm": 1800,
    "censusCountEst": "Large winter thrush in mistletoe"
  },
  {
    "id": "mw-168",
    "speciesId": "sp-168",
    "commonName": "Black-throated Thrush",
    "scientificName": "Turdus atrogularis",
    "localName": "Kala-gala Kastoor",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Forest",
      "Agricultural"
    ],
    "shortDescription": "Black-throated Thrush (Turdus atrogularis) is an authentic Western Himalayan winter visitor migrating from Western Siberian Taiga.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Western Siberian Taiga",
    "flightDistanceKm": 4200,
    "censusCountEst": "Abundant winter thrush in orchards"
  },
  {
    "id": "mw-169",
    "speciesId": "sp-169",
    "commonName": "Red-throated Thrush",
    "scientificName": "Turdus ruficollis",
    "localName": "Lal-gala Kastoor",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Forest",
      "Agricultural"
    ],
    "shortDescription": "Red-throated Thrush (Turdus ruficollis) is an authentic Western Himalayan winter visitor migrating from Eastern Siberian Mountain Forests.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Eastern Siberian Mountain Forests",
    "flightDistanceKm": 4900,
    "censusCountEst": "Rufous-breasted winter thrush"
  },
  {
    "id": "mw-170",
    "speciesId": "sp-170",
    "commonName": "Dusky Thrush",
    "scientificName": "Turdus eunomus",
    "localName": "Khaki Kastoor",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Forest",
      "Agricultural"
    ],
    "shortDescription": "Dusky Thrush (Turdus eunomus) is an authentic Western Himalayan winter visitor migrating from Siberian Forest Tundra.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Siberian Forest Tundra",
    "flightDistanceKm": 5300,
    "censusCountEst": "Cold-weather winter vagrant"
  },
  {
    "id": "mw-171",
    "speciesId": "sp-171",
    "commonName": "Naumann's Thrush",
    "scientificName": "Turdus naumanni",
    "localName": "Naumann Kastoor",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Naumann's Thrush (Turdus naumanni) is an authentic Western Himalayan winter visitor migrating from Central Siberian Larch Forests.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Siberian Larch Forests",
    "flightDistanceKm": 5200,
    "censusCountEst": "Scarce winter migrant"
  },
  {
    "id": "mw-172",
    "speciesId": "sp-172",
    "commonName": "White's Thrush",
    "scientificName": "Zoothera aurea",
    "localName": "Sonhari Kastoor",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "White's Thrush (Zoothera aurea) is an authentic Western Himalayan winter visitor migrating from Siberian Wet Taiga.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Siberian Wet Taiga",
    "flightDistanceKm": 4800,
    "censusCountEst": "Cryptic golden scaly thrush"
  },
  {
    "id": "mw-173",
    "speciesId": "sp-173",
    "commonName": "Alpine Accentor",
    "scientificName": "Prunella collaris",
    "localName": "Alpine Accentor",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Altitudinal Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Alpine",
      "Riverine"
    ],
    "shortDescription": "Alpine Accentor (Prunella collaris) is an authentic Western Himalayan winter visitor migrating from High Mountain Scree (descends).",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "High Mountain Scree (descends)",
    "flightDistanceKm": 800,
    "censusCountEst": "Altitudinal winter descent"
  },
  {
    "id": "mw-174",
    "speciesId": "sp-174",
    "commonName": "Altai Accentor",
    "scientificName": "Prunella himalayana",
    "localName": "Altai Accentor",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "Ladakh",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Alpine",
      "Cold Desert"
    ],
    "shortDescription": "Altai Accentor (Prunella himalayana) is an authentic Western Himalayan winter visitor migrating from Altai & Tian Shan Mountains.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Altai & Tian Shan Mountains",
    "flightDistanceKm": 2600,
    "censusCountEst": "Ladakh & Kashmir winter visitor"
  },
  {
    "id": "mw-175",
    "speciesId": "sp-175",
    "commonName": "Robin Accentor",
    "scientificName": "Prunella rubeculoides",
    "localName": "Lal-chhati Accentor",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "Ladakh"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Cold Desert",
      "Riverine"
    ],
    "shortDescription": "Robin Accentor (Prunella rubeculoides) is an authentic Western Himalayan winter visitor migrating from Tibetan Plateau High Valleys.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Tibetan Plateau High Valleys",
    "flightDistanceKm": 1800,
    "censusCountEst": "Ladakh river willow winterer"
  },
  {
    "id": "mw-176",
    "speciesId": "sp-176",
    "commonName": "Rufous-streaked Accentor",
    "scientificName": "Prunella strophiata",
    "localName": "Khat-dar Accentor",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Forest",
      "Alpine"
    ],
    "shortDescription": "Rufous-streaked Accentor (Prunella strophiata) is an authentic Western Himalayan winter visitor migrating from Subalpine Rhododendron Scrub.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Subalpine Rhododendron Scrub",
    "flightDistanceKm": 750,
    "censusCountEst": "Winter descent to valley brush"
  },
  {
    "id": "mw-177",
    "speciesId": "sp-177",
    "commonName": "Brown Accentor",
    "scientificName": "Prunella fulvescens",
    "localName": "Bhoora Accentor",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "Ladakh",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Cold Desert",
      "Alpine"
    ],
    "shortDescription": "Brown Accentor (Prunella fulvescens) is an authentic Western Himalayan winter visitor migrating from Central Asian Dry Mountains.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Asian Dry Mountains",
    "flightDistanceKm": 2100,
    "censusCountEst": "Cold desert winter specialist"
  },
  {
    "id": "mw-178",
    "speciesId": "sp-178",
    "commonName": "Black-throated Accentor",
    "scientificName": "Prunella atrogularis",
    "localName": "Kala-gala Accentor",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Forest",
      "Agricultural"
    ],
    "shortDescription": "Black-throated Accentor (Prunella atrogularis) is an authentic Western Himalayan winter visitor migrating from Ural Mountains & Tian Shan.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Ural Mountains & Tian Shan",
    "flightDistanceKm": 3400,
    "censusCountEst": "Common winter accentor in bushes"
  },
  {
    "id": "mw-179",
    "speciesId": "sp-179",
    "commonName": "Brambling",
    "scientificName": "Fringilla montifringilla",
    "localName": "Brambling Finch",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Forest",
      "Agricultural"
    ],
    "shortDescription": "Brambling (Fringilla montifringilla) is an authentic Western Himalayan winter visitor migrating from Scandinavian & Russian Birch Forests.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Scandinavian & Russian Birch Forests",
    "flightDistanceKm": 4800,
    "censusCountEst": "Irruptive winter finch in beech/walnut"
  },
  {
    "id": "mw-180",
    "speciesId": "sp-180",
    "commonName": "Common Chaffinch",
    "scientificName": "Fringilla coelebs",
    "localName": "Chaffinch",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Forest",
      "Urban"
    ],
    "shortDescription": "Common Chaffinch (Fringilla coelebs) is an authentic Western Himalayan winter visitor migrating from Palearctic Woodlands.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Palearctic Woodlands",
    "flightDistanceKm": 4400,
    "censusCountEst": "Winter flocking finch"
  },
  {
    "id": "mw-181",
    "speciesId": "sp-181",
    "commonName": "Eurasian Siskin",
    "scientificName": "Spinus spinus",
    "localName": "Siskin / Pila Finch",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Eurasian Siskin (Spinus spinus) is an authentic Western Himalayan winter visitor migrating from Boreal Conifer Forests.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Boreal Conifer Forests",
    "flightDistanceKm": 4700,
    "censusCountEst": "Acrobatic winter feeder in alders"
  },
  {
    "id": "mw-182",
    "speciesId": "sp-182",
    "commonName": "European Goldfinch",
    "scientificName": "Carduelis carduelis",
    "localName": "Sonhari Finch",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Agricultural",
      "Urban",
      "Forest"
    ],
    "shortDescription": "European Goldfinch (Carduelis carduelis) is an authentic Western Himalayan winter visitor migrating from Temperate Eurasia Orchards.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Temperate Eurasia Orchards",
    "flightDistanceKm": 3600,
    "censusCountEst": "Red-faced winter thistle-feeder"
  },
  {
    "id": "mw-183",
    "speciesId": "sp-183",
    "commonName": "Twite",
    "scientificName": "Linaria flavirostris",
    "localName": "Twite / Pahadi Finch",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "Ladakh",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Alpine",
      "Cold Desert"
    ],
    "shortDescription": "Twite (Linaria flavirostris) is an authentic Western Himalayan winter visitor migrating from High Tibetan Plateau & Central Asia.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "High Tibetan Plateau & Central Asia",
    "flightDistanceKm": 2400,
    "censusCountEst": "Winter visitor in weed fields"
  },
  {
    "id": "mw-184",
    "speciesId": "sp-184",
    "commonName": "Common Linnet",
    "scientificName": "Linaria cannabina",
    "localName": "Linnet Finch",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Agricultural",
      "Grassland"
    ],
    "shortDescription": "Common Linnet (Linaria cannabina) is an authentic Western Himalayan winter visitor migrating from Palearctic Scrub & Open Country.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Agricultural Change",
        "severity": "Medium",
        "narrative": "Pesticide overuse and conversion of traditional fallow karewa habitats."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Palearctic Scrub & Open Country",
    "flightDistanceKm": 3900,
    "censusCountEst": "Winter seed-eating flocks"
  },
  {
    "id": "mw-185",
    "speciesId": "sp-185",
    "commonName": "Common Redpoll",
    "scientificName": "Acanthis flammea",
    "localName": "Lal-peshani Finch",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Common Redpoll (Acanthis flammea) is an authentic Western Himalayan winter visitor migrating from Subarctic Birch Tundra.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Subarctic Birch Tundra",
    "flightDistanceKm": 5700,
    "censusCountEst": "Rare northern winter irruptive"
  },
  {
    "id": "mw-186",
    "speciesId": "sp-186",
    "commonName": "Plain Mountain Finch",
    "scientificName": "Leucosticte nemoricola",
    "localName": "Pahadi Finch",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Altitudinal Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Alpine",
      "Agricultural"
    ],
    "shortDescription": "Plain Mountain Finch (Leucosticte nemoricola) is an authentic Western Himalayan winter visitor migrating from High Alpine Meadows (descends).",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "High Alpine Meadows (descends)",
    "flightDistanceKm": 800,
    "censusCountEst": "Swirling winter flocks in valley"
  },
  {
    "id": "mw-187",
    "speciesId": "sp-187",
    "commonName": "Brandt's Mountain Finch",
    "scientificName": "Leucosticte brandti",
    "localName": "Brandt Finch",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "Ladakh",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Alpine",
      "Cold Desert"
    ],
    "shortDescription": "Brandt's Mountain Finch (Leucosticte brandti) is an authentic Western Himalayan winter visitor migrating from Extreme High Scree & Moraines.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Extreme High Scree & Moraines",
    "flightDistanceKm": 950,
    "censusCountEst": "Glacial edge winter altitudinal mover"
  },
  {
    "id": "mw-188",
    "speciesId": "sp-188",
    "commonName": "Red-fronted Serin",
    "scientificName": "Serinus pusillus",
    "localName": "Lal-peshani Toti",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Forest",
      "Agricultural"
    ],
    "shortDescription": "Red-fronted Serin (Serinus pusillus) is an authentic Western Himalayan winter visitor migrating from Subalpine Conifer Edges.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Subalpine Conifer Edges",
    "flightDistanceKm": 900,
    "censusCountEst": "Common winter flocking serin"
  },
  {
    "id": "mw-189",
    "speciesId": "sp-189",
    "commonName": "Hawfinch",
    "scientificName": "Coccothraustes coccothraustes",
    "localName": "Bod-choch Finch",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Forest",
      "Agricultural"
    ],
    "shortDescription": "Hawfinch (Coccothraustes coccothraustes) is an authentic Western Himalayan winter visitor migrating from Eurasian Deciduous Woodlands.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Eurasian Deciduous Woodlands",
    "flightDistanceKm": 4100,
    "censusCountEst": "Heavy-billed cherry-seed cracker"
  },
  {
    "id": "mw-190",
    "speciesId": "sp-190",
    "commonName": "Pine Bunting",
    "scientificName": "Emberiza leucocephalos",
    "localName": "Cheel Bunting",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Forest",
      "Agricultural"
    ],
    "shortDescription": "Pine Bunting (Emberiza leucocephalos) is an authentic Western Himalayan winter visitor migrating from Siberian Pine Woodlands.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Siberian Pine Woodlands",
    "flightDistanceKm": 4400,
    "censusCountEst": "White-crowned winter flocking bunting"
  },
  {
    "id": "mw-191",
    "speciesId": "sp-191",
    "commonName": "Yellowhammer",
    "scientificName": "Emberiza citrinella",
    "localName": "Pila Bunting",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Agricultural",
      "Grassland"
    ],
    "shortDescription": "Yellowhammer (Emberiza citrinella) is an authentic Western Himalayan winter visitor migrating from European & West Siberian Farmland.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Agricultural Change",
        "severity": "Medium",
        "narrative": "Pesticide overuse and conversion of traditional fallow karewa habitats."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "European & West Siberian Farmland",
    "flightDistanceKm": 4600,
    "censusCountEst": "Bright yellow winter visitor"
  },
  {
    "id": "mw-192",
    "speciesId": "sp-192",
    "commonName": "Rock Bunting",
    "scientificName": "Emberiza cia",
    "localName": "Chatan Bunting",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Alpine",
      "Agricultural"
    ],
    "shortDescription": "Rock Bunting (Emberiza cia) is an authentic Western Himalayan winter visitor migrating from Himalayan Rocky Slopes.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Himalayan Rocky Slopes",
    "flightDistanceKm": 750,
    "censusCountEst": "Descends to sunny terraces in winter"
  },
  {
    "id": "mw-193",
    "speciesId": "sp-193",
    "commonName": "Meadow Bunting",
    "scientificName": "Emberiza cioides",
    "localName": "Sabza Bunting",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Agricultural",
      "Grassland"
    ],
    "shortDescription": "Meadow Bunting (Emberiza cioides) is an authentic Western Himalayan winter visitor migrating from Eastern Siberian Scrub.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Agricultural Change",
        "severity": "Medium",
        "narrative": "Pesticide overuse and conversion of traditional fallow karewa habitats."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Eastern Siberian Scrub",
    "flightDistanceKm": 5100,
    "censusCountEst": "Winter visitor in brushy edges"
  },
  {
    "id": "mw-194",
    "speciesId": "sp-194",
    "commonName": "Grey-necked Bunting",
    "scientificName": "Emberiza buchanani",
    "localName": "Khaki-gala Bunting",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Grassland",
      "Agricultural"
    ],
    "shortDescription": "Grey-necked Bunting (Emberiza buchanani) is an authentic Western Himalayan winter visitor migrating from Central Asian Stony Slopes.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Agricultural Change",
        "severity": "Medium",
        "narrative": "Pesticide overuse and conversion of traditional fallow karewa habitats."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Asian Stony Slopes",
    "flightDistanceKm": 2700,
    "censusCountEst": "Passage & winter visitor"
  },
  {
    "id": "mw-195",
    "speciesId": "sp-195",
    "commonName": "Ortolan Bunting",
    "scientificName": "Emberiza hortulana",
    "localName": "Ortolan Bunting",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Agricultural"
    ],
    "shortDescription": "Ortolan Bunting (Emberiza hortulana) is an authentic Western Himalayan winter visitor migrating from Palearctic Farmland.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Agricultural Change",
        "severity": "Medium",
        "narrative": "Pesticide overuse and conversion of traditional fallow karewa habitats."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Palearctic Farmland",
    "flightDistanceKm": 3800,
    "censusCountEst": "Passage migrant in autumn/spring"
  },
  {
    "id": "mw-196",
    "speciesId": "sp-196",
    "commonName": "White-capped Bunting",
    "scientificName": "Emberiza stewarti",
    "localName": "Safed-sir Bunting",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Forest",
      "Agricultural"
    ],
    "shortDescription": "White-capped Bunting (Emberiza stewarti) is an authentic Western Himalayan winter visitor migrating from Western Himalayan Dry Slopes.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Western Himalayan Dry Slopes",
    "flightDistanceKm": 800,
    "censusCountEst": "Chestnut-and-white winter bunting"
  },
  {
    "id": "mw-197",
    "speciesId": "sp-197",
    "commonName": "Rustic Bunting",
    "scientificName": "Emberiza rustica",
    "localName": "Dehati Bunting",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Agricultural",
      "Forest"
    ],
    "shortDescription": "Rustic Bunting (Emberiza rustica) is an authentic Western Himalayan winter visitor migrating from Siberian Wet Taiga.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Siberian Wet Taiga",
    "flightDistanceKm": 5200,
    "censusCountEst": "Vulnerable Siberian bunting (VU)"
  },
  {
    "id": "mw-198",
    "speciesId": "sp-198",
    "commonName": "Little Bunting",
    "scientificName": "Emberiza pusilla",
    "localName": "Chhota Bunting",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Agricultural",
      "Wetland"
    ],
    "shortDescription": "Little Bunting (Emberiza pusilla) is an authentic Western Himalayan winter visitor migrating from Arctic Taiga Bogs.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Arctic Taiga Bogs",
    "flightDistanceKm": 5400,
    "censusCountEst": "Small winter visitor in reed edges"
  },
  {
    "id": "mw-199",
    "speciesId": "sp-199",
    "commonName": "Yellow-breasted Bunting",
    "scientificName": "Emberiza aureola",
    "localName": "Sonhari Bunting",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "CR",
    "isThreatened": true,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Agricultural"
    ],
    "shortDescription": "Yellow-breasted Bunting (Emberiza aureola) is an authentic Western Himalayan winter visitor migrating from Siberian River Meadows.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Siberian River Meadows",
    "flightDistanceKm": 5100,
    "censusCountEst": "Critically endangered bunting (CR)"
  },
  {
    "id": "mw-200",
    "speciesId": "sp-200",
    "commonName": "Reed Bunting",
    "scientificName": "Emberiza schoeniclus",
    "localName": "Narkat Bunting",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland"
    ],
    "shortDescription": "Reed Bunting (Emberiza schoeniclus) is an authentic Western Himalayan winter visitor migrating from Eurasian Reed Swamps.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Eurasian Reed Swamps",
    "flightDistanceKm": 4200,
    "censusCountEst": "Marsh reed winter seed-feeder"
  },
  {
    "id": "mw-201",
    "speciesId": "sp-201",
    "commonName": "Corn Bunting",
    "scientificName": "Emberiza calandra",
    "localName": "Bod Bunting",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Agricultural"
    ],
    "shortDescription": "Corn Bunting (Emberiza calandra) is an authentic Western Himalayan winter visitor migrating from Central Asian Grainfields.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Agricultural Change",
        "severity": "Medium",
        "narrative": "Pesticide overuse and conversion of traditional fallow karewa habitats."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Asian Grainfields",
    "flightDistanceKm": 3300,
    "censusCountEst": "Heavy grassland winter bunting"
  },
  {
    "id": "mw-202",
    "speciesId": "sp-202",
    "commonName": "Water Pipit",
    "scientificName": "Anthus spinoletta",
    "localName": "Pani Pipit",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Agricultural"
    ],
    "shortDescription": "Water Pipit (Anthus spinoletta) is an authentic Western Himalayan winter visitor migrating from Alpine Meadows (descends to marshes).",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Alpine Meadows (descends to marshes)",
    "flightDistanceKm": 800,
    "censusCountEst": "Winter marsh edge insect hunter"
  },
  {
    "id": "mw-203",
    "speciesId": "sp-203",
    "commonName": "Meadow Pipit",
    "scientificName": "Anthus pratensis",
    "localName": "Sabza Pipit",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Grassland",
      "Wetland"
    ],
    "shortDescription": "Meadow Pipit (Anthus pratensis) is an authentic Western Himalayan winter visitor migrating from European & Siberian Bogs.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "European & Siberian Bogs",
    "flightDistanceKm": 4800,
    "censusCountEst": "Near-threatened winter pipit (NT)"
  },
  {
    "id": "mw-204",
    "speciesId": "sp-204",
    "commonName": "Red-throated Pipit",
    "scientificName": "Anthus cervinus",
    "localName": "Lal-gala Pipit",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Agricultural"
    ],
    "shortDescription": "Red-throated Pipit (Anthus cervinus) is an authentic Western Himalayan winter visitor migrating from Arctic Tundra.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Arctic Tundra",
    "flightDistanceKm": 5600,
    "censusCountEst": "Passage & winter visitor"
  },
  {
    "id": "mw-205",
    "speciesId": "sp-205",
    "commonName": "Tree Pipit",
    "scientificName": "Anthus trivialis",
    "localName": "Darakht Pipit",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Forest",
      "Agricultural"
    ],
    "shortDescription": "Tree Pipit (Anthus trivialis) is an authentic Western Himalayan winter visitor migrating from Palearctic Open Woodlands.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Palearctic Open Woodlands",
    "flightDistanceKm": 3900,
    "censusCountEst": "Winter visitor in orchard edges"
  },
  {
    "id": "mw-206",
    "speciesId": "sp-206",
    "commonName": "White Wagtail",
    "scientificName": "Motacilla alba",
    "localName": "Dobi-tser / Dhoban",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Riverine",
      "Urban"
    ],
    "shortDescription": "White Wagtail (Motacilla alba) is an authentic Western Himalayan winter visitor migrating from Palearctic Streams & Settlements.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Palearctic Streams & Settlements",
    "flightDistanceKm": 3400,
    "censusCountEst": "Ubiquitous winter wagtail"
  },
  {
    "id": "mw-207",
    "speciesId": "sp-207",
    "commonName": "Citrine Wagtail",
    "scientificName": "Motacilla citreola",
    "localName": "Zard Dobi-tser",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Wetland",
      "Lake"
    ],
    "shortDescription": "Citrine Wagtail (Motacilla citreola) is an authentic Western Himalayan winter visitor migrating from Siberian Tundra & Wet Meadows.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Siberian Tundra & Wet Meadows",
    "flightDistanceKm": 4200,
    "censusCountEst": "Brilliant yellow marsh wagtail"
  },
  {
    "id": "mw-208",
    "speciesId": "sp-208",
    "commonName": "Grey Wagtail",
    "scientificName": "Motacilla cinerea",
    "localName": "Khaki Dobi-tser",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Altitudinal Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Riverine",
      "Wetland"
    ],
    "shortDescription": "Grey Wagtail (Motacilla cinerea) is an authentic Western Himalayan winter visitor migrating from Mountain Streams (descends).",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Mountain Streams (descends)",
    "flightDistanceKm": 800,
    "censusCountEst": "Fast-flowing stream winter visitor"
  },
  {
    "id": "mw-209",
    "speciesId": "sp-209",
    "commonName": "Bohemian Waxwing",
    "scientificName": "Bombycilla garrulus",
    "localName": "Taaj-dar Waxwing",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Forest",
      "Urban"
    ],
    "shortDescription": "Bohemian Waxwing (Bombycilla garrulus) is an authentic Western Himalayan winter visitor migrating from Circumboreal Taiga Forests.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Circumboreal Taiga Forests",
    "flightDistanceKm": 5800,
    "censusCountEst": "Spectacular crest-bearing irruptive"
  },
  {
    "id": "mw-210",
    "speciesId": "sp-210",
    "commonName": "Goldcrest",
    "scientificName": "Regulus regulus",
    "localName": "Sonhari-taaj",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Goldcrest (Regulus regulus) is an authentic Western Himalayan winter visitor migrating from Himalayan & Eurasian Conifer Forests.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Himalayan & Eurasian Conifer Forests",
    "flightDistanceKm": 850,
    "censusCountEst": "Smallest bird in Eurasia; winter conifer hunter"
  },
  {
    "id": "mw-211",
    "speciesId": "sp-211",
    "commonName": "Winter Wren",
    "scientificName": "Troglodytes troglodytes",
    "localName": "Nanhi Wren",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Forest",
      "Riverine"
    ],
    "shortDescription": "Winter Wren (Troglodytes troglodytes) is an authentic Western Himalayan winter visitor migrating from Montane Forest Understory.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Montane Forest Understory",
    "flightDistanceKm": 750,
    "censusCountEst": "Cocked-tail winter undergrowth dweller"
  },
  {
    "id": "mw-212",
    "speciesId": "sp-212",
    "commonName": "Horned Lark",
    "scientificName": "Eremophila alpestris",
    "localName": "Seeng-dar Chandul",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "Ladakh",
      "AJK"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Cold Desert",
      "Alpine"
    ],
    "shortDescription": "Horned Lark (Eremophila alpestris) is an authentic Western Himalayan winter visitor migrating from High Himalayan & Ladakh Cold Deserts.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "High Himalayan & Ladakh Cold Deserts",
    "flightDistanceKm": 950,
    "censusCountEst": "Masked high-altitude winter lark"
  },
  {
    "id": "mw-213",
    "speciesId": "sp-213",
    "commonName": "Greater Short-toed Lark",
    "scientificName": "Calandrella brachydactyla",
    "localName": "Chhota Chandul",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Agricultural",
      "Grassland"
    ],
    "shortDescription": "Greater Short-toed Lark (Calandrella brachydactyla) is an authentic Western Himalayan winter visitor migrating from Central Asian Dry Steppes.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Agricultural Change",
        "severity": "Medium",
        "narrative": "Pesticide overuse and conversion of traditional fallow karewa habitats."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Asian Dry Steppes",
    "flightDistanceKm": 3100,
    "censusCountEst": "Winter flocks in dry stubble"
  },
  {
    "id": "mw-214",
    "speciesId": "sp-214",
    "commonName": "Skylark",
    "scientificName": "Alauda arvensis",
    "localName": "Aasmani Chandul",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Winter Visitor",
    "secondaryMigrationStatus": [
      "Passage Migrant"
    ],
    "springArrivalWindow": "October–November",
    "winteringWindow": "November–March",
    "departureWindow": "March–April",
    "peakObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "lowObservationMonths": [
      "June",
      "July",
      "August"
    ],
    "currentSeasonalStatus": "Currently Absent / Out of Season",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 16,
    "districtTimingNotes": "Winter visitor arriving along the Central Asian Flyway. Staging hubs include Hokersar, Wular, Shallabugh, Haigam, and Gharana.",
    "mainHabitats": [
      "Agricultural",
      "Grassland"
    ],
    "shortDescription": "Skylark (Alauda arvensis) is an authentic Western Himalayan winter visitor migrating from Eurasian Open Agricultural Steppes.",
    "hotspotsLinked": [
      "hotspot-hokersar",
      "hotspot-wular",
      "hotspot-shallabugh",
      "hotspot-gharana"
    ],
    "threats": [
      {
        "threatType": "Agricultural Change",
        "severity": "Medium",
        "narrative": "Pesticide overuse and conversion of traditional fallow karewa habitats."
      }
    ],
    "validation": {
      "sourceName": "Asian Waterbird Census Kashmir / eBird CAF Atlas",
      "sourceType": "Asian Waterbird Census",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Eurasian Open Agricultural Steppes",
    "flightDistanceKm": 3900,
    "censusCountEst": "Soaring melodious winter songster"
  },
  {
    "id": "mw-215",
    "speciesId": "sp-215",
    "commonName": "Kashmir Flycatcher",
    "scientificName": "Ficedula subrubra",
    "localName": "Ranga-chush / Cashmere Flycatcher",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "VU",
    "isThreatened": true,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Kashmir Flycatcher (Ficedula subrubra) is an authentic Western Himalayan summer breeder migrating from Sri Lanka Highlands & Western Ghats.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Sri Lanka Highlands & Western Ghats",
    "flightDistanceKm": 3100,
    "censusCountEst": "1,500–2,800 breeding pairs (VU)"
  },
  {
    "id": "mw-216",
    "speciesId": "sp-216",
    "commonName": "Asian Paradise-Flycatcher",
    "scientificName": "Terpsiphone paradisi",
    "localName": "Ranga-bulbul / Dudhraj",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest",
      "Agricultural",
      "Urban"
    ],
    "shortDescription": "Asian Paradise-Flycatcher (Terpsiphone paradisi) is an authentic Western Himalayan summer breeder migrating from Central & Southern Indian Peninsula.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central & Southern Indian Peninsula",
    "flightDistanceKm": 2300,
    "censusCountEst": "Iconic long-tailed summer visitor"
  },
  {
    "id": "mw-217",
    "speciesId": "sp-217",
    "commonName": "Ultramarine Flycatcher",
    "scientificName": "Ficedula superciliaris",
    "localName": "Neel-chush",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Ultramarine Flycatcher (Ficedula superciliaris) is an authentic Western Himalayan summer breeder migrating from Central Indian Forests.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Indian Forests",
    "flightDistanceKm": 1800,
    "censusCountEst": "Vibrant blue canopy summer breeder"
  },
  {
    "id": "mw-218",
    "speciesId": "sp-218",
    "commonName": "Rusty-tailed Flycatcher",
    "scientificName": "Ficedula ruficauda",
    "localName": "Lal-dum Chush",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Rusty-tailed Flycatcher (Ficedula ruficauda) is an authentic Western Himalayan summer breeder migrating from Southwestern Indian Peninsula.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Southwestern Indian Peninsula",
    "flightDistanceKm": 2400,
    "censusCountEst": "Forest understory summer breeder"
  },
  {
    "id": "mw-219",
    "speciesId": "sp-219",
    "commonName": "Slaty-blue Flycatcher",
    "scientificName": "Ficedula tricolor",
    "localName": "Surmai Chush",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Slaty-blue Flycatcher (Ficedula tricolor) is an authentic Western Himalayan summer breeder migrating from Foothill Scrub & Terai.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Foothill Scrub & Terai",
    "flightDistanceKm": 950,
    "censusCountEst": "Subalpine scrub summer breeder"
  },
  {
    "id": "mw-220",
    "speciesId": "sp-220",
    "commonName": "Taiga Flycatcher",
    "scientificName": "Ficedula albicilla",
    "localName": "Taiga Chush",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Taiga Flycatcher (Ficedula albicilla) is an authentic Western Himalayan summer breeder migrating from Indian Eastern Ghats.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Indian Eastern Ghats",
    "flightDistanceKm": 2200,
    "censusCountEst": "Passage & summer breeder"
  },
  {
    "id": "mw-221",
    "speciesId": "sp-221",
    "commonName": "Red-breasted Flycatcher",
    "scientificName": "Ficedula parva",
    "localName": "Lal-seena Chush",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest",
      "Agricultural"
    ],
    "shortDescription": "Red-breasted Flycatcher (Ficedula parva) is an authentic Western Himalayan summer breeder migrating from Central & Southern India.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central & Southern India",
    "flightDistanceKm": 2100,
    "censusCountEst": "Orchard summer visitor"
  },
  {
    "id": "mw-222",
    "speciesId": "sp-222",
    "commonName": "Rufous-bellied Niltava",
    "scientificName": "Niltava sundara",
    "localName": "Lal-pet Niltava",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Rufous-bellied Niltava (Niltava sundara) is an authentic Western Himalayan summer breeder migrating from Foothill Ravines.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Foothill Ravines",
    "flightDistanceKm": 850,
    "censusCountEst": "Deep forest shaded stream breeder"
  },
  {
    "id": "mw-223",
    "speciesId": "sp-223",
    "commonName": "Small Niltava",
    "scientificName": "Niltava macgrigoriae",
    "localName": "Chhota Niltava",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Small Niltava (Niltava macgrigoriae) is an authentic Western Himalayan summer breeder migrating from Subtropical Foothills.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Subtropical Foothills",
    "flightDistanceKm": 800,
    "censusCountEst": "Shady ravine summer breeder"
  },
  {
    "id": "mw-224",
    "speciesId": "sp-224",
    "commonName": "Verditer Flycatcher",
    "scientificName": "Eumyias thalassinus",
    "localName": "Sabz-neel Chush",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest",
      "Urban"
    ],
    "shortDescription": "Verditer Flycatcher (Eumyias thalassinus) is an authentic Western Himalayan summer breeder migrating from Southern India & Sri Lanka.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Southern India & Sri Lanka",
    "flightDistanceKm": 2500,
    "censusCountEst": "Electric turquoise forest breeder"
  },
  {
    "id": "mw-225",
    "speciesId": "sp-225",
    "commonName": "Grey-headed Canary-Flycatcher",
    "scientificName": "Culicicapa ceylonensis",
    "localName": "Zard Canary",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Grey-headed Canary-Flycatcher (Culicicapa ceylonensis) is an authentic Western Himalayan summer breeder migrating from Central Indian Woodlands.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Indian Woodlands",
    "flightDistanceKm": 1700,
    "censusCountEst": "Canopy flycatcher summer breeder"
  },
  {
    "id": "mw-226",
    "speciesId": "sp-226",
    "commonName": "Tickell's Blue Flycatcher",
    "scientificName": "Cyornis tickelliae",
    "localName": "Tickell Neel-chush",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Tickell's Blue Flycatcher (Cyornis tickelliae) is an authentic Western Himalayan summer breeder migrating from Peninsular India.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Peninsular India",
    "flightDistanceKm": 1900,
    "censusCountEst": "Bamboo and riparian summer breeder"
  },
  {
    "id": "mw-227",
    "speciesId": "sp-227",
    "commonName": "Blue-throated Blue Flycatcher",
    "scientificName": "Cyornis rubeculoides",
    "localName": "Neel-gala Chush",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Blue-throated Blue Flycatcher (Cyornis rubeculoides) is an authentic Western Himalayan summer breeder migrating from South Indian Moist Deciduous.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "South Indian Moist Deciduous",
    "flightDistanceKm": 2300,
    "censusCountEst": "Dense understory summer breeder"
  },
  {
    "id": "mw-228",
    "speciesId": "sp-228",
    "commonName": "Indian Blue Robin",
    "scientificName": "Larvivora brunnea",
    "localName": "Neel Robin",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Indian Blue Robin (Larvivora brunnea) is an authentic Western Himalayan summer breeder migrating from Western Ghats Evergreen Forests.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Western Ghats Evergreen Forests",
    "flightDistanceKm": 2600,
    "censusCountEst": "Dense subalpine scrub breeder"
  },
  {
    "id": "mw-229",
    "speciesId": "sp-229",
    "commonName": "White-bellied Redstart",
    "scientificName": "Luscinia phoenicuroides",
    "localName": "Safed-pet Lal-dum",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest",
      "Alpine"
    ],
    "shortDescription": "White-bellied Redstart (Luscinia phoenicuroides) is an authentic Western Himalayan summer breeder migrating from Foothill Dense Thickets.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Foothill Dense Thickets",
    "flightDistanceKm": 900,
    "censusCountEst": "High elevation rhododendron breeder"
  },
  {
    "id": "mw-230",
    "speciesId": "sp-230",
    "commonName": "Siberian Rubythroat",
    "scientificName": "Calliope calliope",
    "localName": "Yaqooti-gala",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Alpine",
      "Wetland"
    ],
    "shortDescription": "Siberian Rubythroat (Calliope calliope) is an authentic Western Himalayan summer breeder migrating from Indo-Gangetic Reedbeds.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Indo-Gangetic Reedbeds",
    "flightDistanceKm": 1400,
    "censusCountEst": "Subalpine birch & willow breeder"
  },
  {
    "id": "mw-231",
    "speciesId": "sp-231",
    "commonName": "Himalayan Bluetail",
    "scientificName": "Tarsiger rufilatus",
    "localName": "Himalayan Neel-dum",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest",
      "Alpine"
    ],
    "shortDescription": "Himalayan Bluetail (Tarsiger rufilatus) is an authentic Western Himalayan summer breeder migrating from Foothill Conifer Belts.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Foothill Conifer Belts",
    "flightDistanceKm": 750,
    "censusCountEst": "Subalpine fir & rhododendron breeder"
  },
  {
    "id": "mw-232",
    "speciesId": "sp-232",
    "commonName": "Golden Bush Robin",
    "scientificName": "Tarsiger chrysaeus",
    "localName": "Sonhari Bush Robin",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest",
      "Alpine"
    ],
    "shortDescription": "Golden Bush Robin (Tarsiger chrysaeus) is an authentic Western Himalayan summer breeder migrating from Eastern Himalayan Foothills.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Eastern Himalayan Foothills",
    "flightDistanceKm": 1100,
    "censusCountEst": "High montane scrub breeder"
  },
  {
    "id": "mw-233",
    "speciesId": "sp-233",
    "commonName": "White-browed Bush Robin",
    "scientificName": "Tarsiger indicus",
    "localName": "Safed-abru Robin",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "White-browed Bush Robin (Tarsiger indicus) is an authentic Western Himalayan summer breeder migrating from Montane Conifer Valleys.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Montane Conifer Valleys",
    "flightDistanceKm": 850,
    "censusCountEst": "Dense conifer undergrowth breeder"
  },
  {
    "id": "mw-234",
    "speciesId": "sp-234",
    "commonName": "Rufous-breasted Bush Robin",
    "scientificName": "Tarsiger hyperythrus",
    "localName": "Lal-seena Robin",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest",
      "Alpine"
    ],
    "shortDescription": "Rufous-breasted Bush Robin (Tarsiger hyperythrus) is an authentic Western Himalayan summer breeder migrating from Subtropical Valleys.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Subtropical Valleys",
    "flightDistanceKm": 950,
    "censusCountEst": "Subalpine rhododendron summer breeder"
  },
  {
    "id": "mw-235",
    "speciesId": "sp-235",
    "commonName": "White-capped Redstart",
    "scientificName": "Phoenicurus leucocephalus",
    "localName": "Safed-taaj Lal-dum",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Riverine",
      "Alpine"
    ],
    "shortDescription": "White-capped Redstart (Phoenicurus leucocephalus) is an authentic Western Himalayan summer breeder migrating from River Valleys & Foothills.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "River Valleys & Foothills",
    "flightDistanceKm": 650,
    "censusCountEst": "Rushing torrent summer breeder"
  },
  {
    "id": "mw-236",
    "speciesId": "sp-236",
    "commonName": "Plumbeous Water Redstart",
    "scientificName": "Phoenicurus fuliginosus",
    "localName": "Surmai Pani Lal-dum",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Riverine"
    ],
    "shortDescription": "Plumbeous Water Redstart (Phoenicurus fuliginosus) is an authentic Western Himalayan summer breeder migrating from Foothill Streams.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Agricultural Change",
        "severity": "Medium",
        "narrative": "Pesticide overuse and conversion of traditional fallow karewa habitats."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Foothill Streams",
    "flightDistanceKm": 600,
    "censusCountEst": "Cascade and torrent breeder"
  },
  {
    "id": "mw-237",
    "speciesId": "sp-237",
    "commonName": "Hodgson's Redstart",
    "scientificName": "Phoenicurus hodgsoni",
    "localName": "Hodgson Lal-dum",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Riverine",
      "Alpine"
    ],
    "shortDescription": "Hodgson's Redstart (Phoenicurus hodgsoni) is an authentic Western Himalayan summer breeder migrating from Indo-Gangetic Floodplains.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Indo-Gangetic Floodplains",
    "flightDistanceKm": 1100,
    "censusCountEst": "Gravel riverbed summer breeder"
  },
  {
    "id": "mw-238",
    "speciesId": "sp-238",
    "commonName": "Blue-fronted Redstart",
    "scientificName": "Phoenicurus frontalis",
    "localName": "Neel-peshani Lal-dum",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Alpine",
      "Forest"
    ],
    "shortDescription": "Blue-fronted Redstart (Phoenicurus frontalis) is an authentic Western Himalayan summer breeder migrating from Montane Valley Foothills.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Montane Valley Foothills",
    "flightDistanceKm": 800,
    "censusCountEst": "Subalpine meadow summer breeder"
  },
  {
    "id": "mw-239",
    "speciesId": "sp-239",
    "commonName": "Common Stonechat",
    "scientificName": "Saxicola torquatus",
    "localName": "Pathar-tser",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Agricultural",
      "Grassland"
    ],
    "shortDescription": "Common Stonechat (Saxicola torquatus) is an authentic Western Himalayan summer breeder migrating from Indian Agricultural Plains.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Agricultural Change",
        "severity": "Medium",
        "narrative": "Pesticide overuse and conversion of traditional fallow karewa habitats."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Indian Agricultural Plains",
    "flightDistanceKm": 1200,
    "censusCountEst": "Open meadow summer breeder"
  },
  {
    "id": "mw-240",
    "speciesId": "sp-240",
    "commonName": "Pied Bush Chat",
    "scientificName": "Saxicola caprata",
    "localName": "Kala Pathar-tser",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Agricultural",
      "Grassland"
    ],
    "shortDescription": "Pied Bush Chat (Saxicola caprata) is an authentic Western Himalayan summer breeder migrating from Indo-Gangetic Basins.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Agricultural Change",
        "severity": "Medium",
        "narrative": "Pesticide overuse and conversion of traditional fallow karewa habitats."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Indo-Gangetic Basins",
    "flightDistanceKm": 1100,
    "censusCountEst": "Black-and-white orchard breeder"
  },
  {
    "id": "mw-241",
    "speciesId": "sp-241",
    "commonName": "Grey Bush Chat",
    "scientificName": "Saxicola ferreus",
    "localName": "Khaki Pathar-tser",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest",
      "Agricultural"
    ],
    "shortDescription": "Grey Bush Chat (Saxicola ferreus) is an authentic Western Himalayan summer breeder migrating from Subtropical Scrub.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Subtropical Scrub",
    "flightDistanceKm": 750,
    "censusCountEst": "Terraced hillside summer breeder"
  },
  {
    "id": "mw-242",
    "speciesId": "sp-242",
    "commonName": "Variable Wheatear",
    "scientificName": "Oenanthe picata",
    "localName": "Rangin Wheatear",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "Ladakh",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Cold Desert",
      "Alpine"
    ],
    "shortDescription": "Variable Wheatear (Oenanthe picata) is an authentic Western Himalayan summer breeder migrating from Thar Desert & Indus Plains.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Thar Desert & Indus Plains",
    "flightDistanceKm": 900,
    "censusCountEst": "Stony ravine summer breeder"
  },
  {
    "id": "mw-243",
    "speciesId": "sp-243",
    "commonName": "Desert Wheatear",
    "scientificName": "Oenanthe deserti",
    "localName": "Sahraee Wheatear",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "Ladakh",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Cold Desert",
      "Alpine"
    ],
    "shortDescription": "Desert Wheatear (Oenanthe deserti) is an authentic Western Himalayan summer breeder migrating from Arabian & Thar Deserts.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Arabian & Thar Deserts",
    "flightDistanceKm": 1800,
    "censusCountEst": "Ladakh cold desert summer breeder"
  },
  {
    "id": "mw-244",
    "speciesId": "sp-244",
    "commonName": "Isabelline Wheatear",
    "scientificName": "Oenanthe isabellina",
    "localName": "Khaki Wheatear",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "Ladakh"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Cold Desert",
      "Grassland"
    ],
    "shortDescription": "Isabelline Wheatear (Oenanthe isabellina) is an authentic Western Himalayan summer breeder migrating from Northwest Indian Dry Plains.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Northwest Indian Dry Plains",
    "flightDistanceKm": 1100,
    "censusCountEst": "Pika burrow nester in Ladakh"
  },
  {
    "id": "mw-245",
    "speciesId": "sp-245",
    "commonName": "Rufous-tailed Rock Thrush",
    "scientificName": "Monticola saxatilis",
    "localName": "Lal-dum Chatan Kastoor",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "Ladakh",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Alpine",
      "Cold Desert"
    ],
    "shortDescription": "Rufous-tailed Rock Thrush (Monticola saxatilis) is an authentic Western Himalayan summer breeder migrating from African Savannas & Arabian Peninsula.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "African Savannas & Arabian Peninsula",
    "flightDistanceKm": 4600,
    "censusCountEst": "High rocky crag summer breeder"
  },
  {
    "id": "mw-246",
    "speciesId": "sp-246",
    "commonName": "Blue-capped Rock Thrush",
    "scientificName": "Monticola cinclorhyncha",
    "localName": "Neel-sir Chatan Kastoor",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Blue-capped Rock Thrush (Monticola cinclorhyncha) is an authentic Western Himalayan summer breeder migrating from Western Ghats Moist Forests.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Western Ghats Moist Forests",
    "flightDistanceKm": 2400,
    "censusCountEst": "Pine and oak forest summer breeder"
  },
  {
    "id": "mw-247",
    "speciesId": "sp-247",
    "commonName": "Tickell's Thrush",
    "scientificName": "Turdus unicolor",
    "localName": "Kastoor / Desi Kastoor",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest",
      "Agricultural",
      "Urban"
    ],
    "shortDescription": "Tickell's Thrush (Turdus unicolor) is an authentic Western Himalayan summer breeder migrating from Central Indian Woodlands.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Indian Woodlands",
    "flightDistanceKm": 1600,
    "censusCountEst": "Celebrated orchard songster summer breeder"
  },
  {
    "id": "mw-248",
    "speciesId": "sp-248",
    "commonName": "Grey-winged Blackbird",
    "scientificName": "Turdus boulboul",
    "localName": "Khaki-par Kastoor",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Grey-winged Blackbird (Turdus boulboul) is an authentic Western Himalayan summer breeder migrating from Subtropical Hill Forests.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Subtropical Hill Forests",
    "flightDistanceKm": 800,
    "censusCountEst": "Oak and deodar summer breeder"
  },
  {
    "id": "mw-249",
    "speciesId": "sp-249",
    "commonName": "Tibetan Blackbird",
    "scientificName": "Turdus maximus",
    "localName": "Bod Tibetan Kastoor",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "Ladakh",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Alpine",
      "Cold Desert"
    ],
    "shortDescription": "Tibetan Blackbird (Turdus maximus) is an authentic Western Himalayan summer breeder migrating from Trans-Himalayan Valleys.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Trans-Himalayan Valleys",
    "flightDistanceKm": 700,
    "censusCountEst": "Above-treeline scree summer breeder"
  },
  {
    "id": "mw-250",
    "speciesId": "sp-250",
    "commonName": "Chestnut Thrush",
    "scientificName": "Turdus rubrocanus",
    "localName": "Kastani Kastoor",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Chestnut Thrush (Turdus rubrocanus) is an authentic Western Himalayan summer breeder migrating from Foothill Pine Belts.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Foothill Pine Belts",
    "flightDistanceKm": 750,
    "censusCountEst": "Temperate fir and spruce breeder"
  },
  {
    "id": "mw-251",
    "speciesId": "sp-251",
    "commonName": "Tytler's Leaf Warbler",
    "scientificName": "Phylloscopus tytleri",
    "localName": "Pahadi Piddi / Tytler Warbler",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "NT",
    "isThreatened": true,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest",
      "Alpine"
    ],
    "shortDescription": "Tytler's Leaf Warbler (Phylloscopus tytleri) is an authentic Western Himalayan summer breeder migrating from Western Ghats of Southern India.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Western Ghats of Southern India",
    "flightDistanceKm": 2700,
    "censusCountEst": "2,500–5,000 mature birds (NT)"
  },
  {
    "id": "mw-252",
    "speciesId": "sp-252",
    "commonName": "Western Crowned Warbler",
    "scientificName": "Phylloscopus occipitalis",
    "localName": "Taaj-dar Piddi",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Western Crowned Warbler (Phylloscopus occipitalis) is an authentic Western Himalayan summer breeder migrating from Western Ghats & Eastern Ghats.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Western Ghats & Eastern Ghats",
    "flightDistanceKm": 2400,
    "censusCountEst": "Dominant canopy warbler summer breeder"
  },
  {
    "id": "mw-253",
    "speciesId": "sp-253",
    "commonName": "Blyth's Leaf Warbler",
    "scientificName": "Phylloscopus reguloides",
    "localName": "Blyth Piddi",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Blyth's Leaf Warbler (Phylloscopus reguloides) is an authentic Western Himalayan summer breeder migrating from Eastern & Central India.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Eastern & Central India",
    "flightDistanceKm": 1900,
    "censusCountEst": "Mixed broadleaf summer breeder"
  },
  {
    "id": "mw-254",
    "speciesId": "sp-254",
    "commonName": "Greenish Warbler",
    "scientificName": "Phylloscopus trochiloides",
    "localName": "Sabza Piddi",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest",
      "Urban"
    ],
    "shortDescription": "Greenish Warbler (Phylloscopus trochiloides) is an authentic Western Himalayan summer breeder migrating from Peninsular India & Sri Lanka.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Peninsular India & Sri Lanka",
    "flightDistanceKm": 2600,
    "censusCountEst": "Familiar garden summer songster"
  },
  {
    "id": "mw-255",
    "speciesId": "sp-255",
    "commonName": "Bright-green Warbler",
    "scientificName": "Phylloscopus nitidus",
    "localName": "Chamkila Sabza Piddi",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Bright-green Warbler (Phylloscopus nitidus) is an authentic Western Himalayan summer breeder migrating from Southern Indian Highlands.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Southern Indian Highlands",
    "flightDistanceKm": 2500,
    "censusCountEst": "Deciduous forest summer breeder"
  },
  {
    "id": "mw-256",
    "speciesId": "sp-256",
    "commonName": "Hume's Leaf Warbler",
    "scientificName": "Phylloscopus humei",
    "localName": "Hume Piddi",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest",
      "Agricultural"
    ],
    "shortDescription": "Hume's Leaf Warbler (Phylloscopus humei) is an authentic Western Himalayan summer breeder migrating from Indo-Gangetic Woodlands.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Indo-Gangetic Woodlands",
    "flightDistanceKm": 1100,
    "censusCountEst": "High fir & birch summer breeder"
  },
  {
    "id": "mw-257",
    "speciesId": "sp-257",
    "commonName": "Lemon-rumped Warbler",
    "scientificName": "Phylloscopus chloronotus",
    "localName": "Pila-kamar Piddi",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Lemon-rumped Warbler (Phylloscopus chloronotus) is an authentic Western Himalayan summer breeder migrating from Foothill Moist Forests.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Foothill Moist Forests",
    "flightDistanceKm": 800,
    "censusCountEst": "Subalpine conifer summer breeder"
  },
  {
    "id": "mw-258",
    "speciesId": "sp-258",
    "commonName": "Brooks's Leaf Warbler",
    "scientificName": "Phylloscopus subviridis",
    "localName": "Brooks Piddi",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Brooks's Leaf Warbler (Phylloscopus subviridis) is an authentic Western Himalayan summer breeder migrating from Northwest Dry Foothills.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Northwest Dry Foothills",
    "flightDistanceKm": 850,
    "censusCountEst": "Endemic Western Himalayan breeder"
  },
  {
    "id": "mw-259",
    "speciesId": "sp-259",
    "commonName": "Buff-barred Warbler",
    "scientificName": "Phylloscopus pulcher",
    "localName": "Khat-dar Piddi",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest",
      "Alpine"
    ],
    "shortDescription": "Buff-barred Warbler (Phylloscopus pulcher) is an authentic Western Himalayan summer breeder migrating from Eastern Subtropical Slopes.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Eastern Subtropical Slopes",
    "flightDistanceKm": 1200,
    "censusCountEst": "Rhododendron summer breeder"
  },
  {
    "id": "mw-260",
    "speciesId": "sp-260",
    "commonName": "Ashy-throated Warbler",
    "scientificName": "Phylloscopus maculipennis",
    "localName": "Khaki-gala Piddi",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Ashy-throated Warbler (Phylloscopus maculipennis) is an authentic Western Himalayan summer breeder migrating from Central Himalayan Belts.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Himalayan Belts",
    "flightDistanceKm": 950,
    "censusCountEst": "High spruce and fir canopy breeder"
  },
  {
    "id": "mw-261",
    "speciesId": "sp-261",
    "commonName": "Sulphur-bellied Warbler",
    "scientificName": "Phylloscopus griseolus",
    "localName": "Gandhak Piddi",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "Ladakh",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Alpine",
      "Cold Desert"
    ],
    "shortDescription": "Sulphur-bellied Warbler (Phylloscopus griseolus) is an authentic Western Himalayan summer breeder migrating from Central Indian Rocky Hills.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Indian Rocky Hills",
    "flightDistanceKm": 1700,
    "censusCountEst": "Rocky cliff face summer breeder"
  },
  {
    "id": "mw-262",
    "speciesId": "sp-262",
    "commonName": "Tickell's Leaf Warbler",
    "scientificName": "Phylloscopus affinis",
    "localName": "Tickell Piddi",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "Ladakh",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Alpine",
      "Cold Desert"
    ],
    "shortDescription": "Tickell's Leaf Warbler (Phylloscopus affinis) is an authentic Western Himalayan summer breeder migrating from Peninsular Plains.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Peninsular Plains",
    "flightDistanceKm": 1800,
    "censusCountEst": "Subalpine scrub and willow breeder"
  },
  {
    "id": "mw-263",
    "speciesId": "sp-263",
    "commonName": "Dusky Warbler",
    "scientificName": "Phylloscopus fuscatus",
    "localName": "Tireh Piddi",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Wetland",
      "Forest"
    ],
    "shortDescription": "Dusky Warbler (Phylloscopus fuscatus) is an authentic Western Himalayan summer breeder migrating from Gangetic Floodplain Reeds.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Gangetic Floodplain Reeds",
    "flightDistanceKm": 1400,
    "censusCountEst": "Willow and reed summer breeder"
  },
  {
    "id": "mw-264",
    "speciesId": "sp-264",
    "commonName": "Plain Leaf Warbler",
    "scientificName": "Phylloscopus neglectus",
    "localName": "Sadah Piddi",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest",
      "Alpine"
    ],
    "shortDescription": "Plain Leaf Warbler (Phylloscopus neglectus) is an authentic Western Himalayan summer breeder migrating from Balochistan & Indus Scrub.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Balochistan & Indus Scrub",
    "flightDistanceKm": 1200,
    "censusCountEst": "Arid juniper woodland breeder"
  },
  {
    "id": "mw-265",
    "speciesId": "sp-265",
    "commonName": "Mountain Chiffchaff",
    "scientificName": "Phylloscopus sindianus",
    "localName": "Pahadi Chiffchaff",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "Ladakh"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Riverine",
      "Cold Desert"
    ],
    "shortDescription": "Mountain Chiffchaff (Phylloscopus sindianus) is an authentic Western Himalayan summer breeder migrating from Indus Valley Riparian Scrub.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Indus Valley Riparian Scrub",
    "flightDistanceKm": 1100,
    "censusCountEst": "Ladakh willow stream breeder"
  },
  {
    "id": "mw-266",
    "speciesId": "sp-266",
    "commonName": "Common Chiffchaff",
    "scientificName": "Phylloscopus collybita",
    "localName": "Aam Chiffchaff",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest",
      "Agricultural"
    ],
    "shortDescription": "Common Chiffchaff (Phylloscopus collybita) is an authentic Western Himalayan summer breeder migrating from Northern Plains & Terai.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Northern Plains & Terai",
    "flightDistanceKm": 1300,
    "censusCountEst": "Poplar and willow summer breeder"
  },
  {
    "id": "mw-267",
    "speciesId": "sp-267",
    "commonName": "Brownish-flanked Bush Warbler",
    "scientificName": "Horornis fortipes",
    "localName": "Khaki-baghal Bush Warbler",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Brownish-flanked Bush Warbler (Horornis fortipes) is an authentic Western Himalayan summer breeder migrating from Subtropical Undergrowth.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Subtropical Undergrowth",
    "flightDistanceKm": 850,
    "censusCountEst": "Dense bracken summer breeder"
  },
  {
    "id": "mw-268",
    "speciesId": "sp-268",
    "commonName": "Aberrant Bush Warbler",
    "scientificName": "Horornis flavolivaceus",
    "localName": "Zard-sabz Bush Warbler",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest",
      "Alpine"
    ],
    "shortDescription": "Aberrant Bush Warbler (Horornis flavolivaceus) is an authentic Western Himalayan summer breeder migrating from Eastern Himalayan Foothills.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Eastern Himalayan Foothills",
    "flightDistanceKm": 1300,
    "censusCountEst": "Subalpine scrub breeder"
  },
  {
    "id": "mw-269",
    "speciesId": "sp-269",
    "commonName": "Hume's Bush Warbler",
    "scientificName": "Horornis brunnescens",
    "localName": "Hume Bush Warbler",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest",
      "Alpine"
    ],
    "shortDescription": "Hume's Bush Warbler (Horornis brunnescens) is an authentic Western Himalayan summer breeder migrating from Foothill Thickets.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Foothill Thickets",
    "flightDistanceKm": 900,
    "censusCountEst": "Dense rhododendron breeder"
  },
  {
    "id": "mw-270",
    "speciesId": "sp-270",
    "commonName": "Grey-sided Bush Warbler",
    "scientificName": "Cettia brunnifrons",
    "localName": "Khaki Bush Warbler",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Grey-sided Bush Warbler (Cettia brunnifrons) is an authentic Western Himalayan summer breeder migrating from Foothill Ravines.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Foothill Ravines",
    "flightDistanceKm": 800,
    "censusCountEst": "Dense riverside undergrowth breeder"
  },
  {
    "id": "mw-271",
    "speciesId": "sp-271",
    "commonName": "Chestnut-headed Tesia",
    "scientificName": "Cettia castaneoventris",
    "localName": "Lal-sir Tesia",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Chestnut-headed Tesia (Cettia castaneoventris) is an authentic Western Himalayan summer breeder migrating from Moist Subtropical Gorges.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Moist Subtropical Gorges",
    "flightDistanceKm": 950,
    "censusCountEst": "Mossy forest floor breeder"
  },
  {
    "id": "mw-272",
    "speciesId": "sp-272",
    "commonName": "Slaty-bellied Tesia",
    "scientificName": "Tesia olivea",
    "localName": "Surmai Tesia",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Slaty-bellied Tesia (Tesia olivea) is an authentic Western Himalayan summer breeder migrating from Dense Fern Gullies.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Dense Fern Gullies",
    "flightDistanceKm": 1100,
    "censusCountEst": "Cryptic ground-skulking breeder"
  },
  {
    "id": "mw-273",
    "speciesId": "sp-273",
    "commonName": "Blyth's Reed Warbler",
    "scientificName": "Acrocephalus dumetorum",
    "localName": "Blyth Narkat Warbler",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Agricultural",
      "Forest"
    ],
    "shortDescription": "Blyth's Reed Warbler (Acrocephalus dumetorum) is an authentic Western Himalayan summer breeder migrating from Peninsular Indian Shrubberies.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Peninsular Indian Shrubberies",
    "flightDistanceKm": 2200,
    "censusCountEst": "Orchard and garden summer breeder"
  },
  {
    "id": "mw-274",
    "speciesId": "sp-274",
    "commonName": "Paddyfield Warbler",
    "scientificName": "Acrocephalus agricola",
    "localName": "Dhaan Warbler",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Wetland",
      "Agricultural"
    ],
    "shortDescription": "Paddyfield Warbler (Acrocephalus agricola) is an authentic Western Himalayan summer breeder migrating from Gangetic Wetland Reeds.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Gangetic Wetland Reeds",
    "flightDistanceKm": 1400,
    "censusCountEst": "Rice paddy and marsh breeder"
  },
  {
    "id": "mw-275",
    "speciesId": "sp-275",
    "commonName": "Clamorous Reed Warbler",
    "scientificName": "Acrocephalus stentoreus",
    "localName": "Bod Narkat Warbler",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Wetland",
      "Lake"
    ],
    "shortDescription": "Clamorous Reed Warbler (Acrocephalus stentoreus) is an authentic Western Himalayan summer breeder migrating from Indus and Peninsular Wetlands.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Indus and Peninsular Wetlands",
    "flightDistanceKm": 1500,
    "censusCountEst": "Loud reedbed summer breeder"
  },
  {
    "id": "mw-276",
    "speciesId": "sp-276",
    "commonName": "Moustached Warbler",
    "scientificName": "Acrocephalus melanopogon",
    "localName": "Moochh-dar Warbler",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Wetland"
    ],
    "shortDescription": "Moustached Warbler (Acrocephalus melanopogon) is an authentic Western Himalayan summer breeder migrating from Indo-Gangetic Marshes.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Indo-Gangetic Marshes",
    "flightDistanceKm": 1200,
    "censusCountEst": "Dense Phragmites summer breeder"
  },
  {
    "id": "mw-277",
    "speciesId": "sp-277",
    "commonName": "Booted Warbler",
    "scientificName": "Iduna caligata",
    "localName": "Chhota Booted Warbler",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest",
      "Agricultural"
    ],
    "shortDescription": "Booted Warbler (Iduna caligata) is an authentic Western Himalayan summer breeder migrating from Central Indian Scrub.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Indian Scrub",
    "flightDistanceKm": 1800,
    "censusCountEst": "Dry scrub and orchard breeder"
  },
  {
    "id": "mw-278",
    "speciesId": "sp-278",
    "commonName": "Sykes's Warbler",
    "scientificName": "Iduna rama",
    "localName": "Sykes Warbler",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Agricultural",
      "Forest"
    ],
    "shortDescription": "Sykes's Warbler (Iduna rama) is an authentic Western Himalayan summer breeder migrating from Thar Desert & Gujarat Scrub.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Thar Desert & Gujarat Scrub",
    "flightDistanceKm": 1500,
    "censusCountEst": "Acacia and tamarix summer breeder"
  },
  {
    "id": "mw-279",
    "speciesId": "sp-279",
    "commonName": "Upcher's Warbler",
    "scientificName": "Hippolais languida",
    "localName": "Upcher Warbler",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "Ladakh",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest",
      "Cold Desert"
    ],
    "shortDescription": "Upcher's Warbler (Hippolais languida) is an authentic Western Himalayan summer breeder migrating from East African Savannas.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "East African Savannas",
    "flightDistanceKm": 4800,
    "censusCountEst": "Arid hillside scrub breeder"
  },
  {
    "id": "mw-280",
    "speciesId": "sp-280",
    "commonName": "Grasshopper Warbler",
    "scientificName": "Locustella naevia",
    "localName": "Tiddi Warbler",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Wetland",
      "Grassland"
    ],
    "shortDescription": "Grasshopper Warbler (Locustella naevia) is an authentic Western Himalayan summer breeder migrating from Central Indian Grasslands.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Indian Grasslands",
    "flightDistanceKm": 1700,
    "censusCountEst": "Dense tussock marsh breeder"
  },
  {
    "id": "mw-281",
    "speciesId": "sp-281",
    "commonName": "Common Whitethroat",
    "scientificName": "Curruca communis",
    "localName": "Safed-gala Warbler",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Agricultural",
      "Alpine"
    ],
    "shortDescription": "Common Whitethroat (Curruca communis) is an authentic Western Himalayan summer breeder migrating from Sub-Saharan African Savannas.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Sub-Saharan African Savannas",
    "flightDistanceKm": 5200,
    "censusCountEst": "Brier and scrub summer breeder"
  },
  {
    "id": "mw-282",
    "speciesId": "sp-282",
    "commonName": "Lesser Whitethroat",
    "scientificName": "Curruca curruca",
    "localName": "Chhota Safed-gala",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "Ladakh"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Agricultural",
      "Cold Desert"
    ],
    "shortDescription": "Lesser Whitethroat (Curruca curruca) is an authentic Western Himalayan summer breeder migrating from Central Indian Dry Scrub.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Indian Dry Scrub",
    "flightDistanceKm": 1900,
    "censusCountEst": "Ladakh and Kashmir brier breeder"
  },
  {
    "id": "mw-283",
    "speciesId": "sp-283",
    "commonName": "Barn Swallow",
    "scientificName": "Hirundo rustica",
    "localName": "Katij / Ababeel",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Urban",
      "Agricultural",
      "Wetland"
    ],
    "shortDescription": "Barn Swallow (Hirundo rustica) is an authentic Western Himalayan summer breeder migrating from Peninsular India & Sri Lanka.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Peninsular India & Sri Lanka",
    "flightDistanceKm": 2400,
    "censusCountEst": "Harbinger of spring in homes"
  },
  {
    "id": "mw-284",
    "speciesId": "sp-284",
    "commonName": "Wire-tailed Swallow",
    "scientificName": "Hirundo smithii",
    "localName": "Taar-dum Ababeel",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Riverine",
      "Urban"
    ],
    "shortDescription": "Wire-tailed Swallow (Hirundo smithii) is an authentic Western Himalayan summer breeder migrating from Central Indian River Valleys.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Agricultural Change",
        "severity": "Medium",
        "narrative": "Pesticide overuse and conversion of traditional fallow karewa habitats."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Indian River Valleys",
    "flightDistanceKm": 1600,
    "censusCountEst": "Fast riverine summer breeder"
  },
  {
    "id": "mw-285",
    "speciesId": "sp-285",
    "commonName": "Red-rumped Swallow",
    "scientificName": "Cecropis daurica",
    "localName": "Lal-kamar Ababeel",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Urban",
      "Alpine"
    ],
    "shortDescription": "Red-rumped Swallow (Cecropis daurica) is an authentic Western Himalayan summer breeder migrating from South Indian Hills.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "South Indian Hills",
    "flightDistanceKm": 2200,
    "censusCountEst": "Mud-retort nest builder on cliffs"
  },
  {
    "id": "mw-286",
    "speciesId": "sp-286",
    "commonName": "Striated Swallow",
    "scientificName": "Cecropis striolata",
    "localName": "Khat-dar Ababeel",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Agricultural",
      "Urban"
    ],
    "shortDescription": "Striated Swallow (Cecropis striolata) is an authentic Western Himalayan summer breeder migrating from Eastern Ghats Valleys.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Agricultural Change",
        "severity": "Medium",
        "narrative": "Pesticide overuse and conversion of traditional fallow karewa habitats."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Eastern Ghats Valleys",
    "flightDistanceKm": 2100,
    "censusCountEst": "Large colonial summer swallow"
  },
  {
    "id": "mw-287",
    "speciesId": "sp-287",
    "commonName": "Eurasian Crag Martin",
    "scientificName": "Ptyonoprogne rupestris",
    "localName": "Chatan Ababeel",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Alpine",
      "Riverine"
    ],
    "shortDescription": "Eurasian Crag Martin (Ptyonoprogne rupestris) is an authentic Western Himalayan summer breeder migrating from Foothill Canyons.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Foothill Canyons",
    "flightDistanceKm": 750,
    "censusCountEst": "Gorge cliff summer nester"
  },
  {
    "id": "mw-288",
    "speciesId": "sp-288",
    "commonName": "Pale Crag Martin",
    "scientificName": "Ptyonoprogne obsoleta",
    "localName": "Khaki Chatan Ababeel",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "Ladakh",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Cold Desert",
      "Alpine"
    ],
    "shortDescription": "Pale Crag Martin (Ptyonoprogne obsoleta) is an authentic Western Himalayan summer breeder migrating from Indus Canyon Cliffs.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Indus Canyon Cliffs",
    "flightDistanceKm": 950,
    "censusCountEst": "Ladakh rocky canyon nester"
  },
  {
    "id": "mw-289",
    "speciesId": "sp-289",
    "commonName": "Dusky Crag Martin",
    "scientificName": "Ptyonoprogne concolor",
    "localName": "Siyah Chatan Ababeel",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Urban",
      "Alpine"
    ],
    "shortDescription": "Dusky Crag Martin (Ptyonoprogne concolor) is an authentic Western Himalayan summer breeder migrating from Central Indian Basalt Escarpments.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Indian Basalt Escarpments",
    "flightDistanceKm": 1800,
    "censusCountEst": "Fortress and cliff breeder"
  },
  {
    "id": "mw-290",
    "speciesId": "sp-290",
    "commonName": "Sand Martin",
    "scientificName": "Riparia riparia",
    "localName": "Ret Ababeel",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Riverine",
      "Wetland"
    ],
    "shortDescription": "Sand Martin (Riparia riparia) is an authentic Western Himalayan summer breeder migrating from Gangetic Sand Cliffs.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Gangetic Sand Cliffs",
    "flightDistanceKm": 1300,
    "censusCountEst": "Colonial tunnel nester in sandy banks"
  },
  {
    "id": "mw-291",
    "speciesId": "sp-291",
    "commonName": "Grey-throated Martin",
    "scientificName": "Riparia chinensis",
    "localName": "Khaki-gala Ret Ababeel",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Riverine"
    ],
    "shortDescription": "Grey-throated Martin (Riparia chinensis) is an authentic Western Himalayan summer breeder migrating from Indus Floodplains.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Agricultural Change",
        "severity": "Medium",
        "narrative": "Pesticide overuse and conversion of traditional fallow karewa habitats."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Indus Floodplains",
    "flightDistanceKm": 1100,
    "censusCountEst": "Low flying riverine nester"
  },
  {
    "id": "mw-292",
    "speciesId": "sp-292",
    "commonName": "Common House Martin",
    "scientificName": "Delichon urbicum",
    "localName": "Ghar Ababeel",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Urban",
      "Alpine"
    ],
    "shortDescription": "Common House Martin (Delichon urbicum) is an authentic Western Himalayan summer breeder migrating from African Savannas & Middle East.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "African Savannas & Middle East",
    "flightDistanceKm": 4600,
    "censusCountEst": "Eaves nester in high hill stations"
  },
  {
    "id": "mw-293",
    "speciesId": "sp-293",
    "commonName": "Asian House Martin",
    "scientificName": "Delichon dasypus",
    "localName": "Asian Ghar Ababeel",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Alpine"
    ],
    "shortDescription": "Asian House Martin (Delichon dasypus) is an authentic Western Himalayan summer breeder migrating from Southeast Asian Valleys.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Southeast Asian Valleys",
    "flightDistanceKm": 3400,
    "censusCountEst": "High altitude cliff nester"
  },
  {
    "id": "mw-294",
    "speciesId": "sp-294",
    "commonName": "Common Swift",
    "scientificName": "Apus apus",
    "localName": "Aam Tez-parwaz",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Urban",
      "Alpine"
    ],
    "shortDescription": "Common Swift (Apus apus) is an authentic Western Himalayan summer breeder migrating from Sub-Saharan Africa.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Sub-Saharan Africa",
    "flightDistanceKm": 5800,
    "censusCountEst": "Aerial insectivore summer breeder"
  },
  {
    "id": "mw-295",
    "speciesId": "sp-295",
    "commonName": "Pacific Swift",
    "scientificName": "Apus pacificus",
    "localName": "Bahr-ul-Kahir Swift",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Alpine"
    ],
    "shortDescription": "Pacific Swift (Apus pacificus) is an authentic Western Himalayan summer breeder migrating from Southeast Asia & Australia.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Southeast Asia & Australia",
    "flightDistanceKm": 6200,
    "censusCountEst": "High montane ridge summer breeder"
  },
  {
    "id": "mw-296",
    "speciesId": "sp-296",
    "commonName": "Alpine Swift",
    "scientificName": "Tachymarptis melba",
    "localName": "Bod Alpine Swift",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Alpine"
    ],
    "shortDescription": "Alpine Swift (Tachymarptis melba) is an authentic Western Himalayan summer breeder migrating from African & Indian Escarpments.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "African & Indian Escarpments",
    "flightDistanceKm": 3600,
    "censusCountEst": "Giant swift nesting in deep gorges"
  },
  {
    "id": "mw-297",
    "speciesId": "sp-297",
    "commonName": "White-throated Needletail",
    "scientificName": "Hirundapus caudacutus",
    "localName": "Soozi-dum Swift",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Alpine",
      "Forest"
    ],
    "shortDescription": "White-throated Needletail (Hirundapus caudacutus) is an authentic Western Himalayan summer breeder migrating from Australasia & Southeast Asia.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Australasia & Southeast Asia",
    "flightDistanceKm": 7400,
    "censusCountEst": "Blisteringly fast montane swift"
  },
  {
    "id": "mw-298",
    "speciesId": "sp-298",
    "commonName": "European Nightjar",
    "scientificName": "Caprimulgus europaeus",
    "localName": "European Chhippak",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest",
      "Agricultural"
    ],
    "shortDescription": "European Nightjar (Caprimulgus europaeus) is an authentic Western Himalayan summer breeder migrating from East African Savannas.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "East African Savannas",
    "flightDistanceKm": 5100,
    "censusCountEst": "Nocturnal churring summer visitor"
  },
  {
    "id": "mw-299",
    "speciesId": "sp-299",
    "commonName": "European Bee-eater",
    "scientificName": "Merops apiaster",
    "localName": "Tshur / Gulabi Kour",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Riverine",
      "Agricultural"
    ],
    "shortDescription": "European Bee-eater (Merops apiaster) is an authentic Western Himalayan summer breeder migrating from Sub-Saharan Africa & Middle East.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Agricultural Change",
        "severity": "Medium",
        "narrative": "Pesticide overuse and conversion of traditional fallow karewa habitats."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Sub-Saharan Africa & Middle East",
    "flightDistanceKm": 5800,
    "censusCountEst": "2,000–3,500 summer breeders in cliffs"
  },
  {
    "id": "mw-300",
    "speciesId": "sp-300",
    "commonName": "Blue-tailed Bee-eater",
    "scientificName": "Merops philippinus",
    "localName": "Neel-dum Tshur",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Wetland",
      "Riverine"
    ],
    "shortDescription": "Blue-tailed Bee-eater (Merops philippinus) is an authentic Western Himalayan summer breeder migrating from Peninsular Indian Wetlands.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Peninsular Indian Wetlands",
    "flightDistanceKm": 2100,
    "censusCountEst": "Riparian dragonfly hunter"
  },
  {
    "id": "mw-301",
    "speciesId": "sp-301",
    "commonName": "Green Bee-eater",
    "scientificName": "Merops orientalis",
    "localName": "Chhota Sabz Tshur",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Agricultural"
    ],
    "shortDescription": "Green Bee-eater (Merops orientalis) is an authentic Western Himalayan summer breeder migrating from Northwest Indian Plains.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Agricultural Change",
        "severity": "Medium",
        "narrative": "Pesticide overuse and conversion of traditional fallow karewa habitats."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Northwest Indian Plains",
    "flightDistanceKm": 950,
    "censusCountEst": "Summer visitor in Jammu & foothill orchards"
  },
  {
    "id": "mw-302",
    "speciesId": "sp-302",
    "commonName": "European Roller",
    "scientificName": "Coracias garrulus",
    "localName": "Nila-kroush / Sabz-kroush",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Agricultural",
      "Grassland"
    ],
    "shortDescription": "European Roller (Coracias garrulus) is an authentic Western Himalayan summer breeder migrating from East and Southern Africa.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Agricultural Change",
        "severity": "Medium",
        "narrative": "Pesticide overuse and conversion of traditional fallow karewa habitats."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "East and Southern Africa",
    "flightDistanceKm": 6200,
    "censusCountEst": "1,200–2,000 turquoise summer breeders"
  },
  {
    "id": "mw-303",
    "speciesId": "sp-303",
    "commonName": "Indian Roller",
    "scientificName": "Coracias benghalensis",
    "localName": "Neelkanth",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Agricultural"
    ],
    "shortDescription": "Indian Roller (Coracias benghalensis) is an authentic Western Himalayan summer breeder migrating from Indo-Gangetic Farmland.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Agricultural Change",
        "severity": "Medium",
        "narrative": "Pesticide overuse and conversion of traditional fallow karewa habitats."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Indo-Gangetic Farmland",
    "flightDistanceKm": 900,
    "censusCountEst": "Summer breeder in Jammu plains"
  },
  {
    "id": "mw-304",
    "speciesId": "sp-304",
    "commonName": "Eurasian Hoopoe",
    "scientificName": "Upupa epops",
    "localName": "Hudhud / Shatoot-tots",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Agricultural",
      "Urban",
      "Forest"
    ],
    "shortDescription": "Eurasian Hoopoe (Upupa epops) is an authentic Western Himalayan summer breeder migrating from Indian Plains & Africa.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Indian Plains & Africa",
    "flightDistanceKm": 2300,
    "censusCountEst": "Ground probing crested summer herald"
  },
  {
    "id": "mw-305",
    "speciesId": "sp-305",
    "commonName": "Common Kingfisher",
    "scientificName": "Alcedo atthis",
    "localName": "Tointsh / Machli-khor",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Riverine",
      "Lake",
      "Wetland"
    ],
    "shortDescription": "Common Kingfisher (Alcedo atthis) is an authentic Western Himalayan summer breeder migrating from Foothill Waterways.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Foothill Waterways",
    "flightDistanceKm": 800,
    "censusCountEst": "Electric blue fish diver"
  },
  {
    "id": "mw-306",
    "speciesId": "sp-306",
    "commonName": "Pied Kingfisher",
    "scientificName": "Ceryle rudis",
    "localName": "Kabra Tointsh",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Lake",
      "Riverine"
    ],
    "shortDescription": "Pied Kingfisher (Ceryle rudis) is an authentic Western Himalayan summer breeder migrating from Indus & Gangetic Basins.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Indus & Gangetic Basins",
    "flightDistanceKm": 1100,
    "censusCountEst": "Hovering black-and-white diver"
  },
  {
    "id": "mw-307",
    "speciesId": "sp-307",
    "commonName": "White-throated Kingfisher",
    "scientificName": "Halcyon smyrnensis",
    "localName": "Bod Tointsh",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Agricultural",
      "Wetland"
    ],
    "shortDescription": "White-throated Kingfisher (Halcyon smyrnensis) is an authentic Western Himalayan summer breeder migrating from Peninsular India.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Peninsular India",
    "flightDistanceKm": 1400,
    "censusCountEst": "Orchard and wetland summer resident"
  },
  {
    "id": "mw-308",
    "speciesId": "sp-308",
    "commonName": "Common Cuckoo",
    "scientificName": "Cuculus canorus",
    "localName": "Kak / Koel",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest",
      "Agricultural"
    ],
    "shortDescription": "Common Cuckoo (Cuculus canorus) is an authentic Western Himalayan summer breeder migrating from East Africa & Indian Peninsula.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "East Africa & Indian Peninsula",
    "flightDistanceKm": 4900,
    "censusCountEst": "Herald of spring with fluting call"
  },
  {
    "id": "mw-309",
    "speciesId": "sp-309",
    "commonName": "Oriental Cuckoo",
    "scientificName": "Cuculus optatus",
    "localName": "Mashriqi Cuckoo",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Oriental Cuckoo (Cuculus optatus) is an authentic Western Himalayan summer breeder migrating from Southeast Asia & Sundaland.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Southeast Asia & Sundaland",
    "flightDistanceKm": 4200,
    "censusCountEst": "Montane conifer summer breeder"
  },
  {
    "id": "mw-310",
    "speciesId": "sp-310",
    "commonName": "Himalayan Cuckoo",
    "scientificName": "Cuculus saturatus",
    "localName": "Himalayan Cuckoo",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Himalayan Cuckoo (Cuculus saturatus) is an authentic Western Himalayan summer breeder migrating from Indochina & Indian Hills.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Indochina & Indian Hills",
    "flightDistanceKm": 2800,
    "censusCountEst": "Dense fir and pine summer parasite"
  },
  {
    "id": "mw-311",
    "speciesId": "sp-311",
    "commonName": "Lesser Cuckoo",
    "scientificName": "Cuculus poliocephalus",
    "localName": "Chhota Cuckoo",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Lesser Cuckoo (Cuculus poliocephalus) is an authentic Western Himalayan summer breeder migrating from African Woodlands.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "African Woodlands",
    "flightDistanceKm": 4600,
    "censusCountEst": "Subalpine birch cuckoo"
  },
  {
    "id": "mw-312",
    "speciesId": "sp-312",
    "commonName": "Indian Cuckoo",
    "scientificName": "Cuculus micropterus",
    "localName": "Bhoora Cuckoo",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Indian Cuckoo (Cuculus micropterus) is an authentic Western Himalayan summer breeder migrating from Peninsular Deciduous Belts.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Peninsular Deciduous Belts",
    "flightDistanceKm": 1900,
    "censusCountEst": "Four-note canopy caller"
  },
  {
    "id": "mw-313",
    "speciesId": "sp-313",
    "commonName": "Asian Koel",
    "scientificName": "Eudynamys scolopaceus",
    "localName": "Koel",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Urban",
      "Agricultural"
    ],
    "shortDescription": "Asian Koel (Eudynamys scolopaceus) is an authentic Western Himalayan summer breeder migrating from Indo-Gangetic Basins.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Agricultural Change",
        "severity": "Medium",
        "narrative": "Pesticide overuse and conversion of traditional fallow karewa habitats."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Indo-Gangetic Basins",
    "flightDistanceKm": 850,
    "censusCountEst": "Loud garden brood parasite in Jammu/Kashmir"
  },
  {
    "id": "mw-314",
    "speciesId": "sp-314",
    "commonName": "Jacobin Cuckoo",
    "scientificName": "Clamator jacobinus",
    "localName": "Papiha / Chatak",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Agricultural",
      "Forest"
    ],
    "shortDescription": "Jacobin Cuckoo (Clamator jacobinus) is an authentic Western Himalayan summer breeder migrating from Sub-Saharan Africa (Monsoon migrant).",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Sub-Saharan Africa (Monsoon migrant)",
    "flightDistanceKm": 5400,
    "censusCountEst": "Monsoon arrival harbinger"
  },
  {
    "id": "mw-315",
    "speciesId": "sp-315",
    "commonName": "Eurasian Golden Oriole",
    "scientificName": "Oriolus oriolus",
    "localName": "Poshe-nul / Peela Bulbul",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest",
      "Agricultural",
      "Urban"
    ],
    "shortDescription": "Eurasian Golden Oriole (Oriolus oriolus) is an authentic Western Himalayan summer breeder migrating from Sub-Saharan Africa & India.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Sub-Saharan Africa & India",
    "flightDistanceKm": 4900,
    "censusCountEst": "Golden walnut canopy summer nester"
  },
  {
    "id": "mw-316",
    "speciesId": "sp-316",
    "commonName": "Indian Golden Oriole",
    "scientificName": "Oriolus kundoo",
    "localName": "Desi Poshe-nul",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest",
      "Agricultural"
    ],
    "shortDescription": "Indian Golden Oriole (Oriolus kundoo) is an authentic Western Himalayan summer breeder migrating from Central & Southern India.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central & Southern India",
    "flightDistanceKm": 1900,
    "censusCountEst": "Bright golden orchard summer breeder"
  },
  {
    "id": "mw-317",
    "speciesId": "sp-317",
    "commonName": "Black Drongo",
    "scientificName": "Dicrurus macrocercus",
    "localName": "Gana-kotsch / Kotwal",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Agricultural",
      "Urban"
    ],
    "shortDescription": "Black Drongo (Dicrurus macrocercus) is an authentic Western Himalayan summer breeder migrating from Indo-Gangetic Plains.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Agricultural Change",
        "severity": "Medium",
        "narrative": "Pesticide overuse and conversion of traditional fallow karewa habitats."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Indo-Gangetic Plains",
    "flightDistanceKm": 1100,
    "censusCountEst": "Aggressive aerial insect hunter"
  },
  {
    "id": "mw-318",
    "speciesId": "sp-318",
    "commonName": "Ashy Drongo",
    "scientificName": "Dicrurus leucophaeus",
    "localName": "Khaki Drongo",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Ashy Drongo (Dicrurus leucophaeus) is an authentic Western Himalayan summer breeder migrating from Western Ghats & Central India.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Western Ghats & Central India",
    "flightDistanceKm": 2300,
    "censusCountEst": "Montane pine forest summer breeder"
  },
  {
    "id": "mw-319",
    "speciesId": "sp-319",
    "commonName": "White-bellied Drongo",
    "scientificName": "Dicrurus caerulescens",
    "localName": "Safed-pet Drongo",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "White-bellied Drongo (Dicrurus caerulescens) is an authentic Western Himalayan summer breeder migrating from Peninsular Deciduous Forests.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Peninsular Deciduous Forests",
    "flightDistanceKm": 1800,
    "censusCountEst": "Foothill broadleaf summer nester"
  },
  {
    "id": "mw-320",
    "speciesId": "sp-320",
    "commonName": "Spangled Drongo",
    "scientificName": "Dicrurus hottentottus",
    "localName": "Bal-dar Drongo",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Spangled Drongo (Dicrurus hottentottus) is an authentic Western Himalayan summer breeder migrating from Subtropical Moist Hills.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Subtropical Moist Hills",
    "flightDistanceKm": 1200,
    "censusCountEst": "Curved-tailed forest canopy nester"
  },
  {
    "id": "mw-321",
    "speciesId": "sp-321",
    "commonName": "Long-tailed Minivet",
    "scientificName": "Pericrocotus ethologus",
    "localName": "Lal Saheli / Minivet",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Long-tailed Minivet (Pericrocotus ethologus) is an authentic Western Himalayan summer breeder migrating from Foothill Broadleaf Belts.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Foothill Broadleaf Belts",
    "flightDistanceKm": 750,
    "censusCountEst": "Flame-red conifer canopy breeder"
  },
  {
    "id": "mw-322",
    "speciesId": "sp-322",
    "commonName": "Short-billed Minivet",
    "scientificName": "Pericrocotus brevirostris",
    "localName": "Chhoti-choch Minivet",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Short-billed Minivet (Pericrocotus brevirostris) is an authentic Western Himalayan summer breeder migrating from Eastern Himalayan Foothills.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Eastern Himalayan Foothills",
    "flightDistanceKm": 1300,
    "censusCountEst": "Montane mixed forest breeder"
  },
  {
    "id": "mw-323",
    "speciesId": "sp-323",
    "commonName": "Scarlet Minivet",
    "scientificName": "Pericrocotus speciosus",
    "localName": "Bod Lal Minivet",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Scarlet Minivet (Pericrocotus speciosus) is an authentic Western Himalayan summer breeder migrating from Western Ghats Rainforests.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Western Ghats Rainforests",
    "flightDistanceKm": 2500,
    "censusCountEst": "Brilliant scarlet canopy troop"
  },
  {
    "id": "mw-324",
    "speciesId": "sp-324",
    "commonName": "Small Minivet",
    "scientificName": "Pericrocotus cinnamomeus",
    "localName": "Chhota Minivet",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Agricultural",
      "Forest"
    ],
    "shortDescription": "Small Minivet (Pericrocotus cinnamomeus) is an authentic Western Himalayan summer breeder migrating from Peninsular Thorny Scrub.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Peninsular Thorny Scrub",
    "flightDistanceKm": 1400,
    "censusCountEst": "Dry orchard summer breeder"
  },
  {
    "id": "mw-325",
    "speciesId": "sp-325",
    "commonName": "Rosy Minivet",
    "scientificName": "Pericrocotus roseus",
    "localName": "Gulabi Minivet",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Rosy Minivet (Pericrocotus roseus) is an authentic Western Himalayan summer breeder migrating from Central Indian Hills.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Indian Hills",
    "flightDistanceKm": 1700,
    "censusCountEst": "Subtropical pine summer visitor"
  },
  {
    "id": "mw-326",
    "speciesId": "sp-326",
    "commonName": "Large Cuckooshrike",
    "scientificName": "Coracina macei",
    "localName": "Bod Kasya",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Large Cuckooshrike (Coracina macei) is an authentic Western Himalayan summer breeder migrating from Central Indian Woodlands.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Indian Woodlands",
    "flightDistanceKm": 1600,
    "censusCountEst": "Canopy caterpillar gleaner"
  },
  {
    "id": "mw-327",
    "speciesId": "sp-327",
    "commonName": "Black-headed Cuckooshrike",
    "scientificName": "Lalage melanoptera",
    "localName": "Kala-sir Kasya",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest",
      "Agricultural"
    ],
    "shortDescription": "Black-headed Cuckooshrike (Lalage melanoptera) is an authentic Western Himalayan summer breeder migrating from Peninsular Deciduous Belts.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Peninsular Deciduous Belts",
    "flightDistanceKm": 1900,
    "censusCountEst": "Deciduous grove summer breeder"
  },
  {
    "id": "mw-328",
    "speciesId": "sp-328",
    "commonName": "Long-tailed Shrike",
    "scientificName": "Lanius schach",
    "localName": "Lal-pusht Mamera",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Agricultural",
      "Grassland"
    ],
    "shortDescription": "Long-tailed Shrike (Lanius schach) is an authentic Western Himalayan summer breeder migrating from Indo-Gangetic Agricultural Plains.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Agricultural Change",
        "severity": "Medium",
        "narrative": "Pesticide overuse and conversion of traditional fallow karewa habitats."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Indo-Gangetic Agricultural Plains",
    "flightDistanceKm": 1100,
    "censusCountEst": "Butcherbird nesting on thorny hedges"
  },
  {
    "id": "mw-329",
    "speciesId": "sp-329",
    "commonName": "Bay-backed Shrike",
    "scientificName": "Lanius vittatus",
    "localName": "Chhota Mamera",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Agricultural"
    ],
    "shortDescription": "Bay-backed Shrike (Lanius vittatus) is an authentic Western Himalayan summer breeder migrating from Thar Desert & Northwest Plains.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Agricultural Change",
        "severity": "Medium",
        "narrative": "Pesticide overuse and conversion of traditional fallow karewa habitats."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Thar Desert & Northwest Plains",
    "flightDistanceKm": 1200,
    "censusCountEst": "Thorny scrub summer nester"
  },
  {
    "id": "mw-330",
    "speciesId": "sp-330",
    "commonName": "Isabelline Shrike",
    "scientificName": "Lanius isabellinus",
    "localName": "Khaki Mamera",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "Ladakh"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Cold Desert",
      "Agricultural"
    ],
    "shortDescription": "Isabelline Shrike (Lanius isabellinus) is an authentic Western Himalayan summer breeder migrating from Arabian Savannas & Balochistan.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Arabian Savannas & Balochistan",
    "flightDistanceKm": 2200,
    "censusCountEst": "Ladakh and valley summer visitor"
  },
  {
    "id": "mw-331",
    "speciesId": "sp-331",
    "commonName": "Brown Shrike",
    "scientificName": "Lanius cristatus",
    "localName": "Bhoora Mamera",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest",
      "Agricultural"
    ],
    "shortDescription": "Brown Shrike (Lanius cristatus) is an authentic Western Himalayan summer breeder migrating from Peninsular Moist Belts.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Peninsular Moist Belts",
    "flightDistanceKm": 2100,
    "censusCountEst": "Dense shrubbery summer nester"
  },
  {
    "id": "mw-332",
    "speciesId": "sp-332",
    "commonName": "Great Grey Shrike",
    "scientificName": "Lanius excubitor",
    "localName": "Bod Khaki Mamera",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "Ladakh"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Cold Desert",
      "Grassland"
    ],
    "shortDescription": "Great Grey Shrike (Lanius excubitor) is an authentic Western Himalayan summer breeder migrating from Central Asian Semi-deserts.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Asian Semi-deserts",
    "flightDistanceKm": 2800,
    "censusCountEst": "Cold desert predator in Ladakh"
  },
  {
    "id": "mw-333",
    "speciesId": "sp-333",
    "commonName": "Orange Bullfinch",
    "scientificName": "Pyrrhula aurantiaca",
    "localName": "Son-toti / Narangi Toti",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Altitudinal Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest",
      "Alpine"
    ],
    "shortDescription": "Orange Bullfinch (Pyrrhula aurantiaca) is an authentic Western Himalayan summer breeder migrating from Valley Conifer Belts (ascends).",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Valley Conifer Belts (ascends)",
    "flightDistanceKm": 700,
    "censusCountEst": "3,000–6,000 endemic Western Himalayan birds"
  },
  {
    "id": "mw-334",
    "speciesId": "sp-334",
    "commonName": "Spectacled Finch",
    "scientificName": "Callacanthis burtoni",
    "localName": "Chashma-dar Finch",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest",
      "Alpine"
    ],
    "shortDescription": "Spectacled Finch (Callacanthis burtoni) is an authentic Western Himalayan summer breeder migrating from Temperate Montane Conifers.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Temperate Montane Conifers",
    "flightDistanceKm": 750,
    "censusCountEst": "Subalpine fir and spruce breeder"
  },
  {
    "id": "mw-335",
    "speciesId": "sp-335",
    "commonName": "Common Rosefinch",
    "scientificName": "Carpodacus erythrinus",
    "localName": "Gulabi Toti",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Alpine",
      "Forest"
    ],
    "shortDescription": "Common Rosefinch (Carpodacus erythrinus) is an authentic Western Himalayan summer breeder migrating from Central & Southern Indian Plains.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central & Southern Indian Plains",
    "flightDistanceKm": 2400,
    "censusCountEst": "Vibrant red subalpine scrub breeder"
  },
  {
    "id": "mw-336",
    "speciesId": "sp-336",
    "commonName": "Pink-browed Rosefinch",
    "scientificName": "Carpodacus rodochroa",
    "localName": "Gulabi-abru Toti",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest",
      "Alpine"
    ],
    "shortDescription": "Pink-browed Rosefinch (Carpodacus rodochroa) is an authentic Western Himalayan summer breeder migrating from Foothill Oak Belts.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Foothill Oak Belts",
    "flightDistanceKm": 800,
    "censusCountEst": "Oak and rhododendron breeder"
  },
  {
    "id": "mw-337",
    "speciesId": "sp-337",
    "commonName": "Spot-winged Rosefinch",
    "scientificName": "Carpodacus rodopeplus",
    "localName": "Chitrakabra Toti",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Spot-winged Rosefinch (Carpodacus rodopeplus) is an authentic Western Himalayan summer breeder migrating from Montane Conifer Valleys.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Montane Conifer Valleys",
    "flightDistanceKm": 850,
    "censusCountEst": "Dense subalpine fir breeder"
  },
  {
    "id": "mw-338",
    "speciesId": "sp-338",
    "commonName": "White-browed Rosefinch",
    "scientificName": "Carpodacus thura",
    "localName": "Safed-abru Toti",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Alpine",
      "Forest"
    ],
    "shortDescription": "White-browed Rosefinch (Carpodacus thura) is an authentic Western Himalayan summer breeder migrating from Subalpine Birch Thickets.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Subalpine Birch Thickets",
    "flightDistanceKm": 900,
    "censusCountEst": "Timberline rhododendron breeder"
  },
  {
    "id": "mw-339",
    "speciesId": "sp-339",
    "commonName": "Red-mantled Rosefinch",
    "scientificName": "Carpodacus rhodochlamys",
    "localName": "Surkh-choga Toti",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Alpine",
      "Forest"
    ],
    "shortDescription": "Red-mantled Rosefinch (Carpodacus rhodochlamys) is an authentic Western Himalayan summer breeder migrating from Central Asian Mountains.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Asian Mountains",
    "flightDistanceKm": 2100,
    "censusCountEst": "Dry juniper and rose scrub breeder"
  },
  {
    "id": "mw-340",
    "speciesId": "sp-340",
    "commonName": "Great Rosefinch",
    "scientificName": "Carpodacus rubicilla",
    "localName": "Bod Gulabi Toti",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "Ladakh",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Alpine",
      "Cold Desert"
    ],
    "shortDescription": "Great Rosefinch (Carpodacus rubicilla) is an authentic Western Himalayan summer breeder migrating from Tibetan High Plateaus.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Tibetan High Plateaus",
    "flightDistanceKm": 1100,
    "censusCountEst": "Glacial moraine summer breeder"
  },
  {
    "id": "mw-341",
    "speciesId": "sp-341",
    "commonName": "Streaked Rosefinch",
    "scientificName": "Carpodacus rubicilloides",
    "localName": "Khat-dar Gulabi Toti",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "Ladakh",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Cold Desert",
      "Alpine"
    ],
    "shortDescription": "Streaked Rosefinch (Carpodacus rubicilloides) is an authentic Western Himalayan summer breeder migrating from Trans-Himalayan Alpine Ridges.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Trans-Himalayan Alpine Ridges",
    "flightDistanceKm": 950,
    "censusCountEst": "Caragana and willow scrub breeder in Ladakh"
  },
  {
    "id": "mw-342",
    "speciesId": "sp-342",
    "commonName": "Red-fronted Rosefinch",
    "scientificName": "Carpodacus puniceus",
    "localName": "Lal-peshani Gulabi Toti",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Alpine"
    ],
    "shortDescription": "Red-fronted Rosefinch (Carpodacus puniceus) is an authentic Western Himalayan summer breeder migrating from Extreme Alpine Scree.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Extreme Alpine Scree",
    "flightDistanceKm": 800,
    "censusCountEst": "Highest nesting passerine (up to 5,500m)"
  },
  {
    "id": "mw-343",
    "speciesId": "sp-343",
    "commonName": "Dark-breasted Rosefinch",
    "scientificName": "Procarduelis nipalensis",
    "localName": "Siyah-seena Toti",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest",
      "Alpine"
    ],
    "shortDescription": "Dark-breasted Rosefinch (Procarduelis nipalensis) is an authentic Western Himalayan summer breeder migrating from Central Himalayan Conifer Belts.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Himalayan Conifer Belts",
    "flightDistanceKm": 900,
    "censusCountEst": "Dense rhododendron breeder"
  },
  {
    "id": "mw-344",
    "speciesId": "sp-344",
    "commonName": "Plain Mountain Finch",
    "scientificName": "Leucosticte nemoricola",
    "localName": "Pahadi Finch",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Alpine"
    ],
    "shortDescription": "Plain Mountain Finch (Leucosticte nemoricola) is an authentic Western Himalayan summer breeder migrating from Valley Agricultural Plains.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Valley Agricultural Plains",
    "flightDistanceKm": 600,
    "censusCountEst": "Breeds in high alpine boulder scree"
  },
  {
    "id": "mw-345",
    "speciesId": "sp-345",
    "commonName": "Black-headed Bunting",
    "scientificName": "Emberiza melanocephala",
    "localName": "Kala-sir Bunting",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Agricultural",
      "Grassland"
    ],
    "shortDescription": "Black-headed Bunting (Emberiza melanocephala) is an authentic Western Himalayan summer breeder migrating from Peninsular Indian Grainfields.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Agricultural Change",
        "severity": "Medium",
        "narrative": "Pesticide overuse and conversion of traditional fallow karewa habitats."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Peninsular Indian Grainfields",
    "flightDistanceKm": 2200,
    "censusCountEst": "Paddock and orchard summer breeder"
  },
  {
    "id": "mw-346",
    "speciesId": "sp-346",
    "commonName": "Red-headed Bunting",
    "scientificName": "Emberiza bruniceps",
    "localName": "Lal-sir Bunting",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Agricultural",
      "Grassland"
    ],
    "shortDescription": "Red-headed Bunting (Emberiza bruniceps) is an authentic Western Himalayan summer breeder migrating from Central Indian Scrub.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Agricultural Change",
        "severity": "Medium",
        "narrative": "Pesticide overuse and conversion of traditional fallow karewa habitats."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Indian Scrub",
    "flightDistanceKm": 1900,
    "censusCountEst": "Terraced cropfield summer breeder"
  },
  {
    "id": "mw-347",
    "speciesId": "sp-347",
    "commonName": "Chestnut-eared Bunting",
    "scientificName": "Emberiza fucata",
    "localName": "Lal-kan Bunting",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Agricultural",
      "Wetland"
    ],
    "shortDescription": "Chestnut-eared Bunting (Emberiza fucata) is an authentic Western Himalayan summer breeder migrating from Northeastern Plains.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Northeastern Plains",
    "flightDistanceKm": 1800,
    "censusCountEst": "Wet meadow and ditch breeder"
  },
  {
    "id": "mw-348",
    "speciesId": "sp-348",
    "commonName": "Grey-necked Bunting",
    "scientificName": "Emberiza buchanani",
    "localName": "Khaki-gala Bunting",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "Ladakh",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Cold Desert",
      "Alpine"
    ],
    "shortDescription": "Grey-necked Bunting (Emberiza buchanani) is an authentic Western Himalayan summer breeder migrating from Deccan Plateau.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Deccan Plateau",
    "flightDistanceKm": 2100,
    "censusCountEst": "Stony mountain slope breeder in Ladakh"
  },
  {
    "id": "mw-349",
    "speciesId": "sp-349",
    "commonName": "White-capped Bunting",
    "scientificName": "Emberiza stewarti",
    "localName": "Safed-sir Bunting",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest",
      "Agricultural"
    ],
    "shortDescription": "White-capped Bunting (Emberiza stewarti) is an authentic Western Himalayan summer breeder migrating from Foothill Scrub.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Foothill Scrub",
    "flightDistanceKm": 750,
    "censusCountEst": "Dry pine and oak slope breeder"
  },
  {
    "id": "mw-350",
    "speciesId": "sp-350",
    "commonName": "Fire-fronted Serin",
    "scientificName": "Serinus pusillus",
    "localName": "Aatishi-peshani Serin",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Alpine",
      "Forest"
    ],
    "shortDescription": "Fire-fronted Serin (Serinus pusillus) is an authentic Western Himalayan summer breeder migrating from Valley Floor Conifers.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Valley Floor Conifers",
    "flightDistanceKm": 650,
    "censusCountEst": "Subalpine birch edge breeder"
  },
  {
    "id": "mw-351",
    "speciesId": "sp-351",
    "commonName": "Yellow-breasted Greenfinch",
    "scientificName": "Chloris spinoides",
    "localName": "Pila Greenfinch",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest",
      "Agricultural"
    ],
    "shortDescription": "Yellow-breasted Greenfinch (Chloris spinoides) is an authentic Western Himalayan summer breeder migrating from Foothill Cultivation.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Foothill Cultivation",
    "flightDistanceKm": 700,
    "censusCountEst": "Pine forest and orchard summer breeder"
  },
  {
    "id": "mw-352",
    "speciesId": "sp-352",
    "commonName": "Eurasian Linnet",
    "scientificName": "Linaria cannabina",
    "localName": "Linnet Finch",
    "taxonomicGroup": "Passerines",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Agricultural",
      "Alpine"
    ],
    "shortDescription": "Eurasian Linnet (Linaria cannabina) is an authentic Western Himalayan summer breeder migrating from Valley Stubble Plains.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Valley Stubble Plains",
    "flightDistanceKm": 750,
    "censusCountEst": "High terrace summer breeder"
  },
  {
    "id": "mw-353",
    "speciesId": "sp-353",
    "commonName": "Black-necked Crane",
    "scientificName": "Grus nigricollis",
    "localName": "Cha Thun / Tung Tung",
    "taxonomicGroup": "Cranes",
    "conservationStatus": "VU",
    "isThreatened": true,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "Ladakh"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Wetland",
      "Lake",
      "Cold Desert"
    ],
    "shortDescription": "Black-necked Crane (Grus nigricollis) is an authentic Western Himalayan summer breeder migrating from Tibetan Valleys & Bhutan.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Tibetan Valleys & Bhutan",
    "flightDistanceKm": 1400,
    "censusCountEst": "120–140 breeding pairs in Ladakh (VU)"
  },
  {
    "id": "mw-354",
    "speciesId": "sp-354",
    "commonName": "Bar-headed Goose",
    "scientificName": "Anser indicus",
    "localName": "Bateil / Kaza-hans",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "Ladakh"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Lake",
      "Cold Desert"
    ],
    "shortDescription": "Bar-headed Goose (Anser indicus) is an authentic Western Himalayan summer breeder migrating from Jammu Plains (Gharana Reserve).",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Jammu Plains (Gharana Reserve)",
    "flightDistanceKm": 450,
    "censusCountEst": "Breeds Tso Moriri & Tso Kar colonies"
  },
  {
    "id": "mw-355",
    "speciesId": "sp-355",
    "commonName": "Ruddy Shelduck",
    "scientificName": "Tadorna ferruginea",
    "localName": "Surkhab / Chakwa",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "Ladakh"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Lake",
      "Cold Desert"
    ],
    "shortDescription": "Ruddy Shelduck (Tadorna ferruginea) is an authentic Western Himalayan summer breeder migrating from Kashmir & Punjab Wetlands.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Kashmir & Punjab Wetlands",
    "flightDistanceKm": 500,
    "censusCountEst": "1,200+ breeding pairs on high lakes"
  },
  {
    "id": "mw-356",
    "speciesId": "sp-356",
    "commonName": "Brown-headed Gull",
    "scientificName": "Chroicocephalus brunnicephalus",
    "localName": "Himalayan Chen",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "Ladakh"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Lake",
      "Cold Desert"
    ],
    "shortDescription": "Brown-headed Gull (Chroicocephalus brunnicephalus) is an authentic Western Himalayan summer breeder migrating from Indian Ocean Coast.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Indian Ocean Coast",
    "flightDistanceKm": 2200,
    "censusCountEst": "Breeds on islands of Tso Moriri and Pangong"
  },
  {
    "id": "mw-357",
    "speciesId": "sp-357",
    "commonName": "Common Tern",
    "scientificName": "Sterna hirundo",
    "localName": "Aam Kretsch",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "Ladakh"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Lake",
      "Riverine"
    ],
    "shortDescription": "Common Tern (Sterna hirundo) is an authentic Western Himalayan summer breeder migrating from Arabian Sea Coasts.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Arabian Sea Coasts",
    "flightDistanceKm": 2400,
    "censusCountEst": "Breeds on river islands and Ladakh lakes"
  },
  {
    "id": "mw-358",
    "speciesId": "sp-358",
    "commonName": "Whiskered Tern",
    "scientificName": "Chlidonias hybrida",
    "localName": "Kretsch / Machli-pakad",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Lake",
      "Wetland"
    ],
    "shortDescription": "Whiskered Tern (Chlidonias hybrida) is an authentic Western Himalayan summer breeder migrating from Indian Subcontinent Lagoons.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Indian Subcontinent Lagoons",
    "flightDistanceKm": 2100,
    "censusCountEst": "Breeds on floating lily pads in Dal/Wular"
  },
  {
    "id": "mw-359",
    "speciesId": "sp-359",
    "commonName": "River Tern",
    "scientificName": "Sterna aurantia",
    "localName": "Daryaee Kretsch",
    "taxonomicGroup": "Others",
    "conservationStatus": "VU",
    "isThreatened": true,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Riverine",
      "Lake"
    ],
    "shortDescription": "River Tern (Sterna aurantia) is an authentic Western Himalayan summer breeder migrating from Indian River Basins.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Indian River Basins",
    "flightDistanceKm": 1400,
    "censusCountEst": "Vulnerable riverine tern (VU)"
  },
  {
    "id": "mw-360",
    "speciesId": "sp-360",
    "commonName": "Little Tern",
    "scientificName": "Sternula albifrons",
    "localName": "Chhoti Kretsch",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Riverine",
      "Lake"
    ],
    "shortDescription": "Little Tern (Sternula albifrons) is an authentic Western Himalayan summer breeder migrating from Coastal Lagoons.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Coastal Lagoons",
    "flightDistanceKm": 2300,
    "censusCountEst": "Shingle island summer breeder"
  },
  {
    "id": "mw-361",
    "speciesId": "sp-361",
    "commonName": "Black-winged Stilt",
    "scientificName": "Himantopus himantopus",
    "localName": "Lambi-tanga Stilt",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Wetland",
      "Lake"
    ],
    "shortDescription": "Black-winged Stilt (Himantopus himantopus) is an authentic Western Himalayan summer breeder migrating from Peninsular Shallows.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Peninsular Shallows",
    "flightDistanceKm": 1600,
    "censusCountEst": "Mudflat tussock nester in valley"
  },
  {
    "id": "mw-362",
    "speciesId": "sp-362",
    "commonName": "Pied Avocet",
    "scientificName": "Recurvirostra avosetta",
    "localName": "Avocet",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "Ladakh"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Wetland",
      "Lake"
    ],
    "shortDescription": "Pied Avocet (Recurvirostra avosetta) is an authentic Western Himalayan summer breeder migrating from Coastal Salt Pans.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Coastal Salt Pans",
    "flightDistanceKm": 2200,
    "censusCountEst": "Saline lake breeder in Ladakh"
  },
  {
    "id": "mw-363",
    "speciesId": "sp-363",
    "commonName": "Common Redshank",
    "scientificName": "Tringa totanus",
    "localName": "Lal-tanga Tituri",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "Ladakh"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Wetland",
      "Cold Desert"
    ],
    "shortDescription": "Common Redshank (Tringa totanus) is an authentic Western Himalayan summer breeder migrating from Kashmir Valley & Indus Plains.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Kashmir Valley & Indus Plains",
    "flightDistanceKm": 600,
    "censusCountEst": "Breeds in high peat bogs in Ladakh"
  },
  {
    "id": "mw-364",
    "speciesId": "sp-364",
    "commonName": "Lesser Sand Plover",
    "scientificName": "Charadrius mongolus",
    "localName": "Mongol Plover",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "Ladakh"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Lake",
      "Cold Desert"
    ],
    "shortDescription": "Lesser Sand Plover (Charadrius mongolus) is an authentic Western Himalayan summer breeder migrating from Indian Ocean Beaches.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Indian Ocean Beaches",
    "flightDistanceKm": 2600,
    "censusCountEst": "Breeds along high gravel lakeshores"
  },
  {
    "id": "mw-365",
    "speciesId": "sp-365",
    "commonName": "Little Ringed Plover",
    "scientificName": "Charadrius dubius",
    "localName": "Chhota Tawq-dar",
    "taxonomicGroup": "Waders",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Riverine"
    ],
    "shortDescription": "Little Ringed Plover (Charadrius dubius) is an authentic Western Himalayan summer breeder migrating from Gangetic Riverbeds.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Agricultural Change",
        "severity": "Medium",
        "narrative": "Pesticide overuse and conversion of traditional fallow karewa habitats."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Gangetic Riverbeds",
    "flightDistanceKm": 1100,
    "censusCountEst": "Nests among riverbed pebbles"
  },
  {
    "id": "mw-366",
    "speciesId": "sp-366",
    "commonName": "Great Crested Grebe",
    "scientificName": "Podiceps cristatus",
    "localName": "Tajib / Taaj-dubdubi",
    "taxonomicGroup": "Waterfowl",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Lake"
    ],
    "shortDescription": "Great Crested Grebe (Podiceps cristatus) is an authentic Western Himalayan summer breeder migrating from Valley Deep Lakes.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Valley Deep Lakes",
    "flightDistanceKm": 350,
    "censusCountEst": "Floating nest breeder in Dal and Wular"
  },
  {
    "id": "mw-367",
    "speciesId": "sp-367",
    "commonName": "Little Bittern",
    "scientificName": "Ixobrychus minutus",
    "localName": "Chhota Bittern",
    "taxonomicGroup": "Cranes",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Wetland"
    ],
    "shortDescription": "Little Bittern (Ixobrychus minutus) is an authentic Western Himalayan summer breeder migrating from Central Indian Swamps.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Indian Swamps",
    "flightDistanceKm": 1600,
    "censusCountEst": "Dense Phragmites and willow nester"
  },
  {
    "id": "mw-368",
    "speciesId": "sp-368",
    "commonName": "Yellow Bittern",
    "scientificName": "Ixobrychus sinensis",
    "localName": "Pila Bittern",
    "taxonomicGroup": "Cranes",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Wetland"
    ],
    "shortDescription": "Yellow Bittern (Ixobrychus sinensis) is an authentic Western Himalayan summer breeder migrating from Peninsular Marshes.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Peninsular Marshes",
    "flightDistanceKm": 1900,
    "censusCountEst": "Reedy marsh summer breeder"
  },
  {
    "id": "mw-369",
    "speciesId": "sp-369",
    "commonName": "Cinnamon Bittern",
    "scientificName": "Ixobrychus cinnamomeus",
    "localName": "Lal-bhoora Bittern",
    "taxonomicGroup": "Cranes",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Wetland"
    ],
    "shortDescription": "Cinnamon Bittern (Ixobrychus cinnamomeus) is an authentic Western Himalayan summer breeder migrating from Indo-Gangetic Floodplains.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Indo-Gangetic Floodplains",
    "flightDistanceKm": 1200,
    "censusCountEst": "Flooded paddy and reed nester"
  },
  {
    "id": "mw-370",
    "speciesId": "sp-370",
    "commonName": "Black-crowned Night Heron",
    "scientificName": "Nycticorax nycticorax",
    "localName": "Raat Bagla",
    "taxonomicGroup": "Cranes",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Wetland",
      "Urban"
    ],
    "shortDescription": "Black-crowned Night Heron (Nycticorax nycticorax) is an authentic Western Himalayan summer breeder migrating from Indian Plains Waterways.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Indian Plains Waterways",
    "flightDistanceKm": 1300,
    "censusCountEst": "Colonial chinar and willow nester in Dal"
  },
  {
    "id": "mw-371",
    "speciesId": "sp-371",
    "commonName": "Indian Pond Heron",
    "scientificName": "Ardeola grayii",
    "localName": "Chhota Bagla",
    "taxonomicGroup": "Cranes",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Wetland",
      "Agricultural"
    ],
    "shortDescription": "Indian Pond Heron (Ardeola grayii) is an authentic Western Himalayan summer breeder migrating from Indo-Gangetic Basins.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Indo-Gangetic Basins",
    "flightDistanceKm": 950,
    "censusCountEst": "Ubiquitous ditch and paddy breeder"
  },
  {
    "id": "mw-372",
    "speciesId": "sp-372",
    "commonName": "Cattle Egret",
    "scientificName": "Bubulcus ibis",
    "localName": "Gai Bagla",
    "taxonomicGroup": "Cranes",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Agricultural",
      "Urban"
    ],
    "shortDescription": "Cattle Egret (Bubulcus ibis) is an authentic Western Himalayan summer breeder migrating from Indian Pastoral Lands.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Agricultural Change",
        "severity": "Medium",
        "narrative": "Pesticide overuse and conversion of traditional fallow karewa habitats."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Indian Pastoral Lands",
    "flightDistanceKm": 900,
    "censusCountEst": "Colonial village tree nester"
  },
  {
    "id": "mw-373",
    "speciesId": "sp-373",
    "commonName": "Little Egret",
    "scientificName": "Egretta garzetta",
    "localName": "Chhota Safed Bagla",
    "taxonomicGroup": "Cranes",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Wetland",
      "Riverine"
    ],
    "shortDescription": "Little Egret (Egretta garzetta) is an authentic Western Himalayan summer breeder migrating from Indian Wetlands.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Indian Wetlands",
    "flightDistanceKm": 1200,
    "censusCountEst": "Black bill & yellow feet summer fisher"
  },
  {
    "id": "mw-374",
    "speciesId": "sp-374",
    "commonName": "Intermediate Egret",
    "scientificName": "Ardea intermedia",
    "localName": "Darmiyana Bagla",
    "taxonomicGroup": "Cranes",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Wetland",
      "Lake"
    ],
    "shortDescription": "Intermediate Egret (Ardea intermedia) is an authentic Western Himalayan summer breeder migrating from Indo-Gangetic Shallows.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Indo-Gangetic Shallows",
    "flightDistanceKm": 1100,
    "censusCountEst": "Willow colony summer nester"
  },
  {
    "id": "mw-375",
    "speciesId": "sp-375",
    "commonName": "Black-headed Ibis",
    "scientificName": "Threskiornis melanocephalus",
    "localName": "Kala-sir Ibis",
    "taxonomicGroup": "Cranes",
    "conservationStatus": "NT",
    "isThreatened": true,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Wetland",
      "Agricultural"
    ],
    "shortDescription": "Black-headed Ibis (Threskiornis melanocephalus) is an authentic Western Himalayan summer breeder migrating from Indian Floodplain Marshes.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Indian Floodplain Marshes",
    "flightDistanceKm": 1400,
    "censusCountEst": "Near-threatened ibis summer visitor (NT)"
  },
  {
    "id": "mw-376",
    "speciesId": "sp-376",
    "commonName": "Asian Woolly-necked Stork",
    "scientificName": "Ciconia episcopus",
    "localName": "Haji-laglag",
    "taxonomicGroup": "Cranes",
    "conservationStatus": "NT",
    "isThreatened": true,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Wetland",
      "Agricultural"
    ],
    "shortDescription": "Asian Woolly-necked Stork (Ciconia episcopus) is an authentic Western Himalayan summer breeder migrating from Central Indian Riverine Forests.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Wetland Loss",
        "severity": "Critical",
        "narrative": "Encroachment, siltation, and hydrological alteration of seasonal basins."
      },
      {
        "threatType": "Hunting / Poaching",
        "severity": "High",
        "narrative": "Illegal poaching incursions outside designated sanctuary perimeters."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Indian Riverine Forests",
    "flightDistanceKm": 1600,
    "censusCountEst": "Near-threatened wetland stork (NT)"
  },
  {
    "id": "mw-377",
    "speciesId": "sp-377",
    "commonName": "Himalayan Snowcock",
    "scientificName": "Tetraogallus himalayensis",
    "localName": "Ram Chukar / Kour-chaha",
    "taxonomicGroup": "Pheasants",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Altitudinal Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "Ladakh",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Alpine",
      "Cold Desert"
    ],
    "shortDescription": "Himalayan Snowcock (Tetraogallus himalayensis) is an authentic Western Himalayan summer breeder migrating from Lower Montane Valleys (ascends).",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Lower Montane Valleys (ascends)",
    "flightDistanceKm": 600,
    "censusCountEst": "High alpine ridge breeder (above 3,800m)"
  },
  {
    "id": "mw-378",
    "speciesId": "sp-378",
    "commonName": "Tibetan Snowcock",
    "scientificName": "Tetraogallus tibetanus",
    "localName": "Ladakhi Chukar",
    "taxonomicGroup": "Pheasants",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Altitudinal Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "Ladakh",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Cold Desert",
      "Alpine"
    ],
    "shortDescription": "Tibetan Snowcock (Tetraogallus tibetanus) is an authentic Western Himalayan summer breeder migrating from Ladakh Valley Bases (ascends).",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Ladakh Valley Bases (ascends)",
    "flightDistanceKm": 550,
    "censusCountEst": "Cold desert high pass breeder (above 4,500m)"
  },
  {
    "id": "mw-379",
    "speciesId": "sp-379",
    "commonName": "Snow Partridge",
    "scientificName": "Lerwa lerwa",
    "localName": "Barf Teetar",
    "taxonomicGroup": "Pheasants",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Alpine"
    ],
    "shortDescription": "Snow Partridge (Lerwa lerwa) is an authentic Western Himalayan summer breeder migrating from Subalpine Birch Belts.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Subalpine Birch Belts",
    "flightDistanceKm": 700,
    "censusCountEst": "Alpine scree and snowline breeder"
  },
  {
    "id": "mw-380",
    "speciesId": "sp-380",
    "commonName": "Tibetan Partridge",
    "scientificName": "Perdix hodgsoniae",
    "localName": "Tibetan Teetar",
    "taxonomicGroup": "Pheasants",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "Ladakh",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Cold Desert",
      "Alpine"
    ],
    "shortDescription": "Tibetan Partridge (Perdix hodgsoniae) is an authentic Western Himalayan summer breeder migrating from Trans-Himalayan River Flats.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Trans-Himalayan River Flats",
    "flightDistanceKm": 600,
    "censusCountEst": "Ladakh plateau willow scrub breeder"
  },
  {
    "id": "mw-381",
    "speciesId": "sp-381",
    "commonName": "Chukar Partridge",
    "scientificName": "Alectoris chukar",
    "localName": "Chukar / Kakav",
    "taxonomicGroup": "Pheasants",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Agricultural",
      "Alpine"
    ],
    "shortDescription": "Chukar Partridge (Alectoris chukar) is an authentic Western Himalayan summer breeder migrating from Foothill Terraces.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Foothill Terraces",
    "flightDistanceKm": 500,
    "censusCountEst": "Rocky hillside summer breeder"
  },
  {
    "id": "mw-382",
    "speciesId": "sp-382",
    "commonName": "Cheer Pheasant",
    "scientificName": "Catreus wallichii",
    "localName": "Cheer Pheasant",
    "taxonomicGroup": "Pheasants",
    "conservationStatus": "VU",
    "isThreatened": true,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest",
      "Grassland"
    ],
    "shortDescription": "Cheer Pheasant (Catreus wallichii) is an authentic Western Himalayan summer breeder migrating from Subtropical Precipitous Slopes.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Subtropical Precipitous Slopes",
    "flightDistanceKm": 650,
    "censusCountEst": "Vulnerable steep-grassland pheasant (VU)"
  },
  {
    "id": "mw-383",
    "speciesId": "sp-383",
    "commonName": "Western Tragopan",
    "scientificName": "Tragopan melanocephalus",
    "localName": "Daangeer / Phulgar",
    "taxonomicGroup": "Pheasants",
    "conservationStatus": "VU",
    "isThreatened": true,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Altitudinal Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest",
      "Alpine"
    ],
    "shortDescription": "Western Tragopan (Tragopan melanocephalus) is an authentic Western Himalayan summer breeder migrating from Deep Lower Gorges (ascends).",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Deep Lower Gorges (ascends)",
    "flightDistanceKm": 600,
    "censusCountEst": "Subalpine fir understory breeder (VU)"
  },
  {
    "id": "mw-384",
    "speciesId": "sp-384",
    "commonName": "Koklass Pheasant",
    "scientificName": "Pucrasia macrolopha",
    "localName": "Pikras / Koklass",
    "taxonomicGroup": "Pheasants",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Koklass Pheasant (Pucrasia macrolopha) is an authentic Western Himalayan summer breeder migrating from Foothill Deodar Forests.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Foothill Deodar Forests",
    "flightDistanceKm": 550,
    "censusCountEst": "Coniferous montane forest breeder"
  },
  {
    "id": "mw-385",
    "speciesId": "sp-385",
    "commonName": "Himalayan Monal",
    "scientificName": "Lophophorus impejanus",
    "localName": "Sunal / Monal",
    "taxonomicGroup": "Pheasants",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Altitudinal Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Alpine",
      "Forest"
    ],
    "shortDescription": "Himalayan Monal (Lophophorus impejanus) is an authentic Western Himalayan summer breeder migrating from Wintering Valley Slopes (ascends).",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Wintering Valley Slopes (ascends)",
    "flightDistanceKm": 500,
    "censusCountEst": "Spectacular iridescent subalpine breeder"
  },
  {
    "id": "mw-386",
    "speciesId": "sp-386",
    "commonName": "Kalij Pheasant",
    "scientificName": "Lophura leucomelanos",
    "localName": "Kalesha",
    "taxonomicGroup": "Pheasants",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Kalij Pheasant (Lophura leucomelanos) is an authentic Western Himalayan summer breeder migrating from Foothill Dense Scrub.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Foothill Dense Scrub",
    "flightDistanceKm": 450,
    "censusCountEst": "Jammu and Pir Panjal forest breeder"
  },
  {
    "id": "mw-387",
    "speciesId": "sp-387",
    "commonName": "Egyptian Vulture",
    "scientificName": "Neophron percnopterus",
    "localName": "Safed Gidh",
    "taxonomicGroup": "Raptors",
    "conservationStatus": "EN",
    "isThreatened": true,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Alpine",
      "Agricultural"
    ],
    "shortDescription": "Egyptian Vulture (Neophron percnopterus) is an authentic Western Himalayan summer breeder migrating from Indian Plains & Arabian Peninsula.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Indian Plains & Arabian Peninsula",
    "flightDistanceKm": 1800,
    "censusCountEst": "Endangered cliff-nesting scavenger (EN)"
  },
  {
    "id": "mw-388",
    "speciesId": "sp-388",
    "commonName": "Booted Eagle",
    "scientificName": "Hieraaetus pennatus",
    "localName": "Chot-uqaab / Bagla-cheel",
    "taxonomicGroup": "Raptors",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest",
      "Agricultural"
    ],
    "shortDescription": "Booted Eagle (Hieraaetus pennatus) is an authentic Western Himalayan summer breeder migrating from Indian Peninsula Forests.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Indian Peninsula Forests",
    "flightDistanceKm": 2600,
    "censusCountEst": "Pine forest summer raptor breeder"
  },
  {
    "id": "mw-389",
    "speciesId": "sp-389",
    "commonName": "Eurasian Hobby",
    "scientificName": "Falco subbuteo",
    "localName": "Hobby / Chhota Falcon",
    "taxonomicGroup": "Raptors",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest",
      "Agricultural"
    ],
    "shortDescription": "Eurasian Hobby (Falco subbuteo) is an authentic Western Himalayan summer breeder migrating from Central Indian Woodlands.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Indian Woodlands",
    "flightDistanceKm": 2100,
    "censusCountEst": "Dragonfly & swift hunting falcon"
  },
  {
    "id": "mw-390",
    "speciesId": "sp-390",
    "commonName": "Common Kestrel",
    "scientificName": "Falco tinnunculus",
    "localName": "Tontsh / Kestrel",
    "taxonomicGroup": "Raptors",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Agricultural",
      "Alpine"
    ],
    "shortDescription": "Common Kestrel (Falco tinnunculus) is an authentic Western Himalayan summer breeder migrating from Indian Plains & Foothills.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Indian Plains & Foothills",
    "flightDistanceKm": 950,
    "censusCountEst": "Cliff and ruin summer nester"
  },
  {
    "id": "mw-391",
    "speciesId": "sp-391",
    "commonName": "Oriental Turtle Dove",
    "scientificName": "Streptopelia orientalis",
    "localName": "Kamroor / Pahadi Fakhta",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest",
      "Agricultural"
    ],
    "shortDescription": "Oriental Turtle Dove (Streptopelia orientalis) is an authentic Western Himalayan summer breeder migrating from Central Indian Forests.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Indian Forests",
    "flightDistanceKm": 1600,
    "censusCountEst": "Orchard and forest summer breeder"
  },
  {
    "id": "mw-392",
    "speciesId": "sp-392",
    "commonName": "Eurasian Collared Dove",
    "scientificName": "Streptopelia decaocto",
    "localName": "Kuku / Dhor Fakhta",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Agricultural",
      "Urban"
    ],
    "shortDescription": "Eurasian Collared Dove (Streptopelia decaocto) is an authentic Western Himalayan summer breeder migrating from Indo-Gangetic Farmland.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Agricultural Change",
        "severity": "Medium",
        "narrative": "Pesticide overuse and conversion of traditional fallow karewa habitats."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Indo-Gangetic Farmland",
    "flightDistanceKm": 900,
    "censusCountEst": "Village and garden summer resident"
  },
  {
    "id": "mw-393",
    "speciesId": "sp-393",
    "commonName": "Laughing Dove",
    "scientificName": "Spilopelia senegalensis",
    "localName": "Chhoti Fakhta",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Agricultural",
      "Urban"
    ],
    "shortDescription": "Laughing Dove (Spilopelia senegalensis) is an authentic Western Himalayan summer breeder migrating from Dry Indian Plains.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Agricultural Change",
        "severity": "Medium",
        "narrative": "Pesticide overuse and conversion of traditional fallow karewa habitats."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Dry Indian Plains",
    "flightDistanceKm": 950,
    "censusCountEst": "Sunny terrace summer breeder"
  },
  {
    "id": "mw-394",
    "speciesId": "sp-394",
    "commonName": "Spotted Dove",
    "scientificName": "Spilopelia chinensis",
    "localName": "Chitrakabri Fakhta",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Agricultural",
      "Forest"
    ],
    "shortDescription": "Spotted Dove (Spilopelia chinensis) is an authentic Western Himalayan summer breeder migrating from Peninsular Deciduous Belts.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Peninsular Deciduous Belts",
    "flightDistanceKm": 1400,
    "censusCountEst": "Moist orchard summer nester"
  },
  {
    "id": "mw-395",
    "speciesId": "sp-395",
    "commonName": "Wedge-tailed Green Pigeon",
    "scientificName": "Treron sphenurus",
    "localName": "Hariyal / Green Pigeon",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Wedge-tailed Green Pigeon (Treron sphenurus) is an authentic Western Himalayan summer breeder migrating from Subtropical Foothills.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Subtropical Foothills",
    "flightDistanceKm": 800,
    "censusCountEst": "Frugivorous canopy breeder in figs"
  },
  {
    "id": "mw-396",
    "speciesId": "sp-396",
    "commonName": "Snow Pigeon",
    "scientificName": "Columba leuconota",
    "localName": "Barf Kabutar",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Altitudinal Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Alpine"
    ],
    "shortDescription": "Snow Pigeon (Columba leuconota) is an authentic Western Himalayan summer breeder migrating from Valley Cliffs (ascends).",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Valley Cliffs (ascends)",
    "flightDistanceKm": 600,
    "censusCountEst": "Glacial cliff colonial breeder"
  },
  {
    "id": "mw-397",
    "speciesId": "sp-397",
    "commonName": "Hill Pigeon",
    "scientificName": "Columba rupestris",
    "localName": "Pahadi Kabutar",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Altitudinal Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "Ladakh",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Alpine",
      "Cold Desert"
    ],
    "shortDescription": "Hill Pigeon (Columba rupestris) is an authentic Western Himalayan summer breeder migrating from Ladakh Gorges (ascends).",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "High",
        "narrative": "Feral dog predation on ground clutches and pastoralist camp friction."
      },
      {
        "threatType": "Snow Cover Change",
        "severity": "Medium",
        "narrative": "Erratic snowlines disrupting traditional altitudinal elevation shifts."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Ladakh Gorges (ascends)",
    "flightDistanceKm": 550,
    "censusCountEst": "Trans-Himalayan crag breeder"
  },
  {
    "id": "mw-398",
    "speciesId": "sp-398",
    "commonName": "Eurasian Wryneck",
    "scientificName": "Jynx torquilla",
    "localName": "Gardan-maror",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest",
      "Agricultural"
    ],
    "shortDescription": "Eurasian Wryneck (Jynx torquilla) is an authentic Western Himalayan summer breeder migrating from Central Indian Scrub.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Central Indian Scrub",
    "flightDistanceKm": 1900,
    "censusCountEst": "Ant-eating tree cavity nester"
  },
  {
    "id": "mw-399",
    "speciesId": "sp-399",
    "commonName": "Scaly-bellied Woodpecker",
    "scientificName": "Picus squamatus",
    "localName": "Bod Kat-phoda",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Scaly-bellied Woodpecker (Picus squamatus) is an authentic Western Himalayan summer breeder migrating from Foothill Pine Belts.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Foothill Pine Belts",
    "flightDistanceKm": 600,
    "censusCountEst": "Coniferous timber cavity carver"
  },
  {
    "id": "mw-400",
    "speciesId": "sp-400",
    "commonName": "Himalayan Woodpecker",
    "scientificName": "Dendrocopos himalayensis",
    "localName": "Kat-phoda / Woodpecker",
    "taxonomicGroup": "Others",
    "conservationStatus": "LC",
    "isThreatened": false,
    "primaryMigrationStatus": "Summer Visitor",
    "secondaryMigrationStatus": [
      "Breeding Migrant"
    ],
    "springArrivalWindow": "April–May",
    "breedingWindow": "May–July",
    "departureWindow": "September–October",
    "peakObservationMonths": [
      "May",
      "June",
      "July"
    ],
    "lowObservationMonths": [
      "December",
      "January",
      "February"
    ],
    "currentSeasonalStatus": "Currently Breeding",
    "primaryScope": "All",
    "regionsPresent": [
      "Kashmir Core",
      "Jammu",
      "AJK"
    ],
    "districtsCount": 12,
    "districtTimingNotes": "Summer breeding migrant arriving in spring across Western Himalayan valleys, forests, and alpine zones.",
    "mainHabitats": [
      "Forest"
    ],
    "shortDescription": "Himalayan Woodpecker (Dendrocopos himalayensis) is an authentic Western Himalayan summer breeder migrating from Montane Oak-Fir Slopes.",
    "hotspotsLinked": [
      "hotspot-dachigam",
      "hotspot-overa-aru",
      "hotspot-gulmarg"
    ],
    "threats": [
      {
        "threatType": "Disturbance",
        "severity": "Medium",
        "narrative": "Canopy thinning and timber harvesting in mature breeding ecotones."
      },
      {
        "threatType": "Climate Change",
        "severity": "High",
        "narrative": "Phenological shifts altering caterpillar and fruit emergence windows."
      }
    ],
    "validation": {
      "sourceName": "eBird Western Himalaya & J&K Wildlife Department Surveys",
      "sourceType": "Peer-Reviewed Study",
      "sourceYear": 2025,
      "confidence": "High",
      "lastReviewedDate": "2026-06-01"
    },
    "flywayOrigin": "Montane Oak-Fir Slopes",
    "flightDistanceKm": 500,
    "censusCountEst": "Subalpine conifer summer breeder"
  }
];

export const migrationDashboardMetrics = [
  { label: 'Total Tracked', value: 400, icon: 'Bird' },
  { label: 'Winter Visitors', value: 214, icon: 'Snowflake' },
  { label: 'Summer Breeders', value: 186, icon: 'Sun' },
  { label: 'Threatened Migrants', value: 34, icon: 'AlertTriangle' }
];
