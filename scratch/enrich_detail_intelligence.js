const fs = require('fs');

const parkIntelligences = `
  'kishtwar-national-park': {
    iucnCategory: 'IUCN Category II',
    biogeographicZone: 'Western Himalaya (Chenab Valley)',
    watersheds: ['Marusudar River Catchment', 'Rinnay Nallah', 'Kibar Nallah', 'Upper Chenab Basin'],
    conservationSignificance: [
      'Critical high-altitude glacial and alpine wilderness protecting the snow leopard and brown bear in the Chenab watershed.',
      'Encompasses untouched virgin coniferous forests of Cedrus deodara, Pinus wallichiana, and subalpine Betula utilis.',
      'Key ecological stepping stone between Greater Himalayas of Kashmir and the Zanskar-Himachal alpine continuum.'
    ],
    connectedAreas: [
      { name: 'Overa-Aru Wildlife Sanctuary', type: 'Wildlife Sanctuary', distance: '~55 km NW' },
      { name: 'Padder / Zanskar Trans-Himalayan Corridor', type: 'High Altitude Pass', distance: '~40 km NE' },
      { name: 'Great Himalayan National Park Corridor', type: 'Trans-Divisional Linkage', distance: '~90 km SE' }
    ],
    threats: [
      { name: 'Poaching & Human-Wildlife Conflict', score: 62, trend: 'stable' },
      { name: 'Hydroelectric Projects in Lower Catchments', score: 74, trend: 'increasing' },
      { name: 'Climate Vulnerability & Glacial Retreat', score: 68, trend: 'increasing' },
      { name: 'Livestock Overgrazing in Alpine Pastures', score: 58, trend: 'decreasing' },
      { name: 'Timber & Fuelwood Extraction', score: 45, trend: 'decreasing' }
    ],
    monitoring: [
      { method: 'Camera Traps', coverage: 55, lastUpdate: '2024' },
      { method: 'Field Surveys (Winter Snow Leopard)', coverage: 65, lastUpdate: '2024' },
      { method: 'Satellite Remote Sensing', coverage: 85, lastUpdate: '2025' },
      { method: 'Ranger Patrols', coverage: 50, lastUpdate: '2024' }
    ],
    dashboard: { conservationStatus: 78, speciesRichness: 72, habitatIntegrity: 84, threatLevel: 52, monitoringCoverage: 64, researchCoverage: 58 },
    dataSources: ['Department of Wildlife Protection J&K', 'Wildlife Institute of India (WII)', 'IUCN Red List', 'GBIF'],
    visitorAccess: 'Restricted / Permit Required for High Passes',
    researchHighlights: [
      { type: 'Snow Leopard Habitat Surveys', count: 14 },
      { type: 'Glacial Dynamics Studies', count: 9 },
      { type: 'Ungulate Population Census', count: 8 },
      { type: 'Botanical Assessments', count: 11 }
    ],
    ecologicalTrends: [
      { metric: 'Glacial Mass Balance', trend: 'negative', note: 'Moderate retreat recorded in Brammah glacier group' },
      { metric: 'Snow Leopard Occupancy', trend: 'stable', note: 'Sustained presence confirmed via camera trap grids' },
      { metric: 'Alpine Forest Cover', trend: 'stable', note: 'Subalpine birch and fir canopy intact above 2,800m' }
    ]
  },

  'hemis-national-park': {
    iucnCategory: 'IUCN Category II',
    biogeographicZone: 'Trans-Himalaya (Ladakh Range)',
    watersheds: ['Indus River Main Basin', 'Markha River Catchment', 'Rumbak Valley Stream', 'Sumdah Nallah'],
    conservationSignificance: [
      'Largest national park in India (4,400 km²) and globally documented highest density capital of the endangered Snow Leopard (Panthera uncia).',
      'Protects ancestral high-altitude ungulate populations: Shapu (Ladakh Urial), Great Tibetan Sheep (Argali), and Bharal (Blue Sheep).',
      'Pioneering global model for community-based homestay ecotourism and predator-proof livestock corral conservation.'
    ],
    connectedAreas: [
      { name: 'Changthang Cold Desert Wildlife Sanctuary', type: 'Wildlife Sanctuary', distance: '~80 km E' },
      { name: 'Karakoram Wildlife Sanctuary', type: 'Wildlife Sanctuary', distance: '~120 km N' },
      { name: 'Zanskar Wildlife Corridor', type: 'Trans-Himalayan Pass', distance: '~60 km SW' }
    ],
    threats: [
      { name: 'Feral Dog Packs Threatening Ungulates', score: 78, trend: 'increasing' },
      { name: 'Unregulated Ecotourism & Off-road Vehicles', score: 60, trend: 'increasing' },
      { name: 'Climate Shifts & Winter Drought', score: 70, trend: 'increasing' },
      { name: 'Pastoral Grazing Competition with Argali', score: 52, trend: 'stable' }
    ],
    monitoring: [
      { method: 'High-Density Camera Trap Grids', coverage: 88, lastUpdate: '2025' },
      { method: 'Genetic Fecal DNA Barcoding', coverage: 75, lastUpdate: '2024' },
      { method: 'Community Guard Reports', coverage: 90, lastUpdate: '2025' },
      { method: 'Satellite High-Resolution Telemetry', coverage: 80, lastUpdate: '2024' }
    ],
    dashboard: { conservationStatus: 88, speciesRichness: 65, habitatIntegrity: 92, threatLevel: 42, monitoringCoverage: 84, researchCoverage: 88 },
    dataSources: ['Department of Wildlife Protection UT Ladakh', 'Snow Leopard Conservancy India Trust', 'WII Leh', 'IUCN Trans-Himalaya'],
    visitorAccess: 'Open with Protected Area Permit / Trekking Entry Fee',
    researchHighlights: [
      { type: 'Snow Leopard Telemetry Papers', count: 38 },
      { type: 'Prey-Predator Dynamics Theses', count: 24 },
      { type: 'High Altitude Avian Inventories', count: 16 },
      { type: 'Community Conservation Case Studies', count: 19 }
    ],
    ecologicalTrends: [
      { metric: 'Snow Leopard Density', trend: 'positive', note: 'Estimated at ~8-10 individuals per 100 km² in Markha and Rumbak' },
      { metric: 'Bharal Population', trend: 'positive', note: 'Prey base healthy with over 4,000 blue sheep surveyed' },
      { metric: 'Winter Snowpack', trend: 'negative', note: 'Earlier snowmelt patterns altering high-meadow phenology' }
    ]
  },

  'great-himalayan-national-park': {
    iucnCategory: 'IUCN Category II / UNESCO World Heritage Site',
    biogeographicZone: 'Western Himalaya (Himachal Continuum)',
    watersheds: ['Tirthan River Basin', 'Sainj River Catchment', 'Jiwa Nal Catchment', 'Parvati River Headwaters'],
    conservationSignificance: [
      'Inscribed as a UNESCO World Heritage Site for exceptional biodiversity conservation and untouched glacial valleys.',
      'Hosts the largest single breeding wild population of the vulnerable Western Tragopan (Tragopan melanocephalus).',
      'Span of 25 distinct forest types across a 4,500m altitudinal gradient with no roads or permanent human settlements in the core.'
    ],
    connectedAreas: [
      { name: 'Pin Valley National Park', type: 'Trans-Himalayan Pass', distance: '~45 km NE' },
      { name: 'Kishtwar High Altitude PA Network', type: 'Western Himalayan Continuum', distance: '~90 km NW' },
      { name: 'Rupi Bhabha Wildlife Sanctuary', type: 'Sanctuary Buffer', distance: '~25 km E' }
    ],
    threats: [
      { name: 'Medicinal Herb Overharvesting along Buffers', score: 62, trend: 'decreasing' },
      { name: 'Climate Shifts Affecting Subalpine Ecotones', score: 65, trend: 'increasing' },
      { name: 'Tourism Footprint in Tirthan Entry Zones', score: 48, trend: 'stable' }
    ],
    monitoring: [
      { method: 'Acoustic Call Counts (Tragopan)', coverage: 85, lastUpdate: '2024' },
      { method: 'Camera Trapping Network', coverage: 78, lastUpdate: '2024' },
      { method: 'Vegetation Plots & Phenology Monitoring', coverage: 90, lastUpdate: '2025' }
    ],
    dashboard: { conservationStatus: 92, speciesRichness: 86, habitatIntegrity: 95, threatLevel: 32, monitoringCoverage: 88, researchCoverage: 90 },
    dataSources: ['UNESCO World Heritage Center', 'Wildlife Institute of India', 'Himachal Wildlife Wing', 'GBIF'],
    visitorAccess: 'Strict Trekking Permit Required / Ecozone Only for Casual Visitors',
    researchHighlights: [
      { type: 'Tragopan Breeding Ecology', count: 32 },
      { type: 'Altitudinal Plant Gradient Studies', count: 44 },
      { type: 'Carnivore Coexistence Studies', count: 21 },
      { type: 'World Heritage Monitoring Reports', count: 12 }
    ],
    ecologicalTrends: [
      { metric: 'Western Tragopan Abundance', trend: 'positive', note: 'Spring call count indices showing upward trend since 2018' },
      { metric: 'Old-Growth Oak-Fir Canopy', trend: 'stable', note: 'Zero commercial logging since national park notification in 1984' },
      { metric: 'Subalpine Treeline Movement', trend: 'stable', note: 'Birch treeline advancing slowly (~1.2m/decade)' }
    ]
  },

  'pin-valley-national-park': {
    iucnCategory: 'IUCN Category II / Cold Desert Biosphere Reserve',
    biogeographicZone: 'Trans-Himalaya (Tibetan Plateau Edge)',
    watersheds: ['Pin River Valley', 'Parahio River', 'Spiti River Basin'],
    conservationSignificance: [
      'The only national park in Himachal Pradesh located within the Trans-Himalayan cold desert biome.',
      'Key wintering sanctuary and breeding haven for the Siberian Ibex and elusive Snow Leopard.',
      'Rich repository of high-altitude medicinal xerophytic flora and relic periglacial ecosystems.'
    ],
    connectedAreas: [
      { name: 'Great Himalayan National Park', type: 'Trans-Pass Continuum', distance: '~45 km SW' },
      { name: 'Kibber Wildlife Sanctuary', type: 'Wildlife Sanctuary', distance: '~35 km N' },
      { name: 'Changthang Cold Desert Network', type: 'Transboundary Plateau', distance: '~110 km NE' }
    ],
    threats: [
      { name: 'Severe Winter Road Isolation & Supplies', score: 55, trend: 'stable' },
      { name: 'Livestock-Wildlife Disease Transmission', score: 64, trend: 'decreasing' },
      { name: 'Glacial Melt Stream Variability', score: 62, trend: 'increasing' }
    ],
    monitoring: [
      { method: 'Snow Leopard Spatial Grid Surveys', coverage: 72, lastUpdate: '2024' },
      { method: 'Ibex Herd Censuses', coverage: 80, lastUpdate: '2024' },
      { method: 'Satellite Snow Cover Indexing', coverage: 88, lastUpdate: '2025' }
    ],
    dashboard: { conservationStatus: 82, speciesRichness: 58, habitatIntegrity: 89, threatLevel: 38, monitoringCoverage: 76, researchCoverage: 68 },
    dataSources: ['Spiti Wildlife Division', 'Nature Conservation Foundation (NCF)', 'WII Dehradun', 'IUCN'],
    visitorAccess: 'Summer / Autumn Open (Inner Line Permit for foreigners)',
    researchHighlights: [
      { type: 'Ibex Population Surveys', count: 18 },
      { type: 'Cold Desert Floral Checklists', count: 14 },
      { type: 'Predator-Prey Biomass Ratios', count: 12 }
    ],
    ecologicalTrends: [
      { metric: 'Siberian Ibex Herds', trend: 'positive', note: 'Stable winter herd aggregations above Kungri monastery' },
      { metric: 'Snow Leopard Sighting Frequency', trend: 'positive', note: 'Increased winter observation success rates in Parahio valley' },
      { metric: 'Glacial Stream Discharge', trend: 'negative', note: 'Earlier summer peak runoff observed' }
    ]
  },

  'deosai-national-park': {
    iucnCategory: 'IUCN Category II / UNESCO Tentative List',
    biogeographicZone: 'High-Altitude Alpine Plateau (Deosai Massif)',
    watersheds: ['Sheosar Lake Catchment', 'Kala Pani River', 'Bara Pani River', 'Shigar River & Indus Headwaters'],
    conservationSignificance: [
      'Second highest plateau on Earth (average 4,114m) spanning 3,584 km² of intact permafrost alpine tundra.',
      'The single most critical sanctuary rescuing the Himalayan Brown Bear (Ursus arctos isabellinus) from regional extinction.',
      'Ramsar-grade alpine wetland complex hosting trans-Himalayan migratory waterfowl and endemic snow trout.'
    ],
    connectedAreas: [
      { name: 'Himalaya National Park (Astore)', type: 'National Park Corridor', distance: 'Contiguous' },
      { name: 'Central Karakoram National Park', type: 'Glacial Linkage', distance: '~70 km NE' },
      { name: 'Gurez Valley Ecological Corridor', type: 'Transboundary Pass', distance: '~35 km S' }
    ],
    threats: [
      { name: 'Unregulated Summer Tourism & Vehicle Off-roading', score: 76, trend: 'increasing' },
      { name: 'Short Summer Grazing Influx from Nomadic Herds', score: 68, trend: 'stable' },
      { name: 'Solid Waste along Camping Corridors', score: 64, trend: 'increasing' },
      { name: 'Extreme Climate & Short Growing Season Vulnerability', score: 58, trend: 'increasing' }
    ],
    monitoring: [
      { method: 'Brown Bear Annual GPS & Field Census', coverage: 92, lastUpdate: '2024' },
      { method: 'Park Ranger Entry Sentinel Checkpoints', coverage: 100, lastUpdate: '2025' },
      { method: 'Wetland Health & Water Sampling', coverage: 70, lastUpdate: '2024' }
    ],
    dashboard: { conservationStatus: 85, speciesRichness: 68, habitatIntegrity: 90, threatLevel: 48, monitoringCoverage: 82, researchCoverage: 79 },
    dataSources: ['Gilgit-Baltistan Forest & Wildlife Department', 'WWF-Pakistan', 'Himalayan Wildlife Foundation', 'IUCN'],
    visitorAccess: 'Seasonal (July 1 to October 15) with Mandatory Park Entry Ticket',
    researchHighlights: [
      { type: 'Brown Bear Population Assessments', count: 28 },
      { type: 'Plateau Flora & Ethnobotany Papers', count: 22 },
      { type: 'Golden Marmot Behavior Studies', count: 11 },
      { type: 'Limnological Studies of Sheosar Lake', count: 7 }
    ],
    ecologicalTrends: [
      { metric: 'Himalayan Brown Bear Population', trend: 'positive', note: 'Recovered from ~20 individuals in 1993 to over 85 in recent censuses' },
      { metric: 'Golden Marmot Density', trend: 'positive', note: 'Abundant burrow colonies across Bara Pani plains' },
      { metric: 'Tundra Wildflower Biomass', trend: 'stable', note: 'Lush summer bloom persisting despite heavy seasonal grazing' }
    ]
  },

  'khunjerab-national-park': {
    iucnCategory: 'IUCN Category II',
    biogeographicZone: 'High Karakoram (Pak-China Border)',
    watersheds: ['Khunjerab River Basin', 'Gojal Valley Catchment', 'Hunza River Headwaters'],
    conservationSignificance: [
      'Established in 1975 under the direct advice of Dr. George Schaller to rescue the Marco Polo Sheep (Ovis ammon polii).',
      'Direct transboundary buffer adjoining China\\'s Taxkorgan Nature Reserve, forming a mega trans-Pamir conservation corridor.',
      'Prime alpine habitat for Snow Leopard, Himalayan Ibex, and Blue Sheep overlooking the world\\'s highest paved international border crossing (4,693m).'
    ],
    connectedAreas: [
      { name: 'Taxkorgan Nature Reserve (China)', type: 'Transboundary Protected Area', distance: 'Contiguous' },
      { name: 'Central Karakoram National Park', type: 'Karakoram PA Network', distance: '~85 km SE' },
      { name: 'Qurumber National Park', type: 'High Mountain Continuum', distance: '~95 km W' }
    ],
    threats: [
      { name: 'Highway Traffic (Karakoram Highway / CPEC)', score: 72, trend: 'increasing' },
      { name: 'High-Altitude Grazing Conflicts with Yaks/Goats', score: 55, trend: 'decreasing' },
      { name: 'Extreme Winter Avalanches & Road Closures', score: 62, trend: 'stable' }
    ],
    monitoring: [
      { method: 'Community-Based Wildlife Guards', coverage: 88, lastUpdate: '2025' },
      { method: 'Marco Polo Sheep Population Transects', coverage: 90, lastUpdate: '2024' },
      { method: 'Camera Trapping Grids', coverage: 75, lastUpdate: '2024' }
    ],
    dashboard: { conservationStatus: 84, speciesRichness: 62, habitatIntegrity: 91, threatLevel: 44, monitoringCoverage: 80, researchCoverage: 74 },
    dataSources: ['GB Forest, Wildlife & Environment Department', 'Khunjerab Villagers Organization (KVO)', 'WWF-Pakistan'],
    visitorAccess: 'Open via Karakoram Highway (Special Park Entry Fee at Dhee)',
    researchHighlights: [
      { type: 'Marco Polo Sheep Ecology', count: 26 },
      { type: 'Community Trophy Hunting & Revenue Sharing Studies', count: 18 },
      { type: 'Karakoram Highway Environmental Impact Reports', count: 14 }
    ],
    ecologicalTrends: [
      { metric: 'Marco Polo Sheep Count', trend: 'positive', note: 'Recovered from under 50 animals in 1970s to viable cross-border bands' },
      { metric: 'Himalayan Ibex Population', trend: 'positive', note: 'Over 1,200 ibex counted across Dhee and Ghunjerab nullahs' },
      { metric: 'Snow Leopard Encounters', trend: 'stable', note: 'Frequent tracks and camera captures confirmed in Koksil valley' }
    ]
  },

  'central-karakoram-national-park': {
    iucnCategory: 'IUCN Category II',
    biogeographicZone: 'Greater Karakoram (Central Glacial Spine)',
    watersheds: ['Braldu River Basin', 'Shigar River Catchment', 'Hushe River Catchment', 'Indus River Glacial Tributaries'],
    conservationSignificance: [
      'Largest protected area in Pakistan (10,000 km²), encompassing 4 of the world\\'s fourteen 8,000-meter peaks including K2 (8,611m).',
      'Contains the greatest concentration of high-altitude glaciers on Earth outside the polar ice caps (Baltoro, Biafo, Siachen corridor).',
      'Hosts specialized cryophilic ecosystems, cold-adapted alpine raptors, and resilient snow leopard populations.'
    ],
    connectedAreas: [
      { name: 'Deosai National Park', type: 'Alpine Plateau Corridor', distance: '~70 km SW' },
      { name: 'Khunjerab National Park', type: 'Northern Karakoram Continuum', distance: '~85 km NW' },
      { name: 'Hemis National Park (Ladakh)', type: 'Trans-Himalayan Continuum', distance: '~120 km SE' }
    ],
    threats: [
      { name: 'Mountaineering Expeditions & Glacier Waste Accumulation', score: 79, trend: 'stable' },
      { name: 'Glacial Lake Outburst Floods (GLOFs)', score: 84, trend: 'increasing' },
      { name: 'Climate Warming & Surge Glacier Destabilization', score: 78, trend: 'increasing' }
    ],
    monitoring: [
      { method: 'Ev-K2-CNR Automatic Weather Stations (AWS)', coverage: 95, lastUpdate: '2025' },
      { method: 'Satellite Glacier Velocity & Melt Radar', coverage: 100, lastUpdate: '2025' },
      { method: 'Ecological Porter & Waste Tracking Audits', coverage: 85, lastUpdate: '2024' }
    ],
    dashboard: { conservationStatus: 89, speciesRichness: 64, habitatIntegrity: 94, threatLevel: 56, monitoringCoverage: 86, researchCoverage: 92 },
    dataSources: ['CKNP Directorate Skardu', 'Ev-K2-CNR Scientific Committee', 'Alpine Club of Pakistan', 'IUCN Glaciology Network'],
    visitorAccess: 'Permit Required (Trekking Visa / Royalty for Peaks above 6,500m)',
    researchHighlights: [
      { type: 'Glacier Mass Balance & Karakoram Anomaly Papers', count: 62 },
      { type: 'High Altitude Flora Checklists', count: 28 },
      { type: 'K2 Waste Management Reports', count: 18 },
      { type: 'Snow Leopard & Ibex Spatial Studies', count: 24 }
    ],
    ecologicalTrends: [
      { metric: 'Glacier Mass Dynamic (Karakoram Anomaly)', trend: 'stable', note: 'Central glaciers showing stable/surging mass balance vs Himalayan retreat' },
      { metric: 'Ibex Abundance in Hushe/Braldu', trend: 'positive', note: 'Community wildlife reserves supporting healthy herds' },
      { metric: 'Glacial Melt Stream Turbidity', trend: 'positive', note: 'Baseline water quality monitored continuously at Concordia' }
    ]
  },

  'machiara-national-park': {
    iucnCategory: 'IUCN Category II',
    biogeographicZone: 'Western Himalaya (Neelum-Jhelum Watershed)',
    watersheds: ['Machiara Nallah Basin', 'Neelum River Tributary Drainage', 'Kunhar River Adjacent Ridges'],
    conservationSignificance: [
      'Globally celebrated biodiversity hotspot in Azad Jammu & Kashmir, prioritized by World Bank and GEF for Western Tragopan conservation.',
      'Unbroken altitudinal transect of Himalayan moist temperate forest with pristine stands of Silver Fir (Abies pindrow) and Taxus wallichiana.',
      'Vital haven for the critically endangered Kashmir Musk Deer and endemic high-altitude avian communities.'
    ],
    connectedAreas: [
      { name: 'Pir Chanasi National Park', type: 'Montane Ridge Corridor', distance: '~25 km S' },
      { name: 'Ghamot National Park', type: 'Neelum Subalpine Linkage', distance: '~50 km NE' },
      { name: 'Kazinag National Park (Baramulla)', type: 'Transboundary Western Himalayan Corridor', distance: '~45 km E' }
    ],
    threats: [
      { name: 'Fuelwood & Timber Harvesting by Peripheral Villages', score: 66, trend: 'decreasing' },
      { name: 'Illegal Grazing in Subalpine Betula Belts', score: 58, trend: 'decreasing' },
      { name: 'Forest Fire Risk during Autumn Drought', score: 52, trend: 'stable' }
    ],
    monitoring: [
      { method: 'Western Tragopan Call Counts', coverage: 85, lastUpdate: '2024' },
      { method: 'Camera Trapping for Musk Deer & Carnivores', coverage: 78, lastUpdate: '2024' },
      { method: 'Community Conservation Committee Patrols', coverage: 90, lastUpdate: '2025' }
    ],
    dashboard: { conservationStatus: 86, speciesRichness: 82, habitatIntegrity: 88, threatLevel: 44, monitoringCoverage: 80, researchCoverage: 84 },
    dataSources: ['AJK Wildlife & Fisheries Department', 'World Bank GEF Machiara Project', 'WWF-Pakistan', 'IUCN'],
    visitorAccess: 'Restricted / Eco-tourism Permits from Muzaffarabad Wildlife Office',
    researchHighlights: [
      { type: 'Western Tragopan Population Dynamics', count: 34 },
      { type: 'Musk Deer Habitat Use Studies', count: 19 },
      { type: 'Medicinal Plant Inventories', count: 26 },
      { type: 'Community Forestry Assessments', count: 15 }
    ],
    ecologicalTrends: [
      { metric: 'Western Tragopan Breeding Pairs', trend: 'positive', note: 'Estimated 80-120 pairs documented in core fir-oak stands' },
      { metric: 'Musk Deer Pellet Frequency', trend: 'stable', note: 'Signs regular in subalpine rhododendron scrub above 2,600m' },
      { metric: 'Canopy Density in Core', trend: 'positive', note: 'Protected core canopy closure exceeding 75%' }
    ]
  },

  'ghamot-national-park': {
    iucnCategory: 'IUCN Category II',
    biogeographicZone: 'Western Himalaya (Upper Neelum Valley)',
    watersheds: ['Ghamot Nullah Catchment', 'Upper Neelum River Basin'],
    conservationSignificance: [
      'Strategic subalpine and glacial valley park in Neelum District connecting across mountain passes directly to Kashmir\\'s Gurez and Bandipora ranges.',
      'Major regional stronghold for the Kashmir Musk Deer (Moschus cupreus) and endangered Himalayan Brown Bear.',
      'Pristine high-altitude glacial lakes, birch-rhododendron krummholz, and unfragmented wildlife dispersal corridors.'
    ],
    connectedAreas: [
      { name: 'Machiara National Park', type: 'Neelum Habitat Matrix', distance: '~50 km SW' },
      { name: 'Gurez Valley Wildlife Corridors (J&K)', type: 'Transboundary Pass Linkage', distance: '~25 km E' },
      { name: 'Deosai National Park', type: 'Northern Alpine Corridor', distance: '~60 km NE' }
    ],
    threats: [
      { name: 'Illegal Grazing Pressure in Upper Alpine Cirques', score: 62, trend: 'stable' },
      { name: 'Winter Poaching of Musk Deer for Musk Pods', score: 68, trend: 'decreasing' },
      { name: 'Flash Floods & Torrential Monsoon Erosion', score: 55, trend: 'increasing' }
    ],
    monitoring: [
      { method: 'Forest Ranger Patrols', coverage: 65, lastUpdate: '2024' },
      { method: 'Community Informant Network', coverage: 75, lastUpdate: '2024' },
      { method: 'Satellite Land Cover Tracking', coverage: 82, lastUpdate: '2025' }
    ],
    dashboard: { conservationStatus: 78, speciesRichness: 74, habitatIntegrity: 82, threatLevel: 50, monitoringCoverage: 68, researchCoverage: 62 },
    dataSources: ['AJK Wildlife & Fisheries Department', 'University of Azad Jammu & Kashmir', 'IUCN Protected Areas'],
    visitorAccess: 'Open for Trekkers (Trekking permit recommended due to border proximity)',
    researchHighlights: [
      { type: 'Musk Deer Habitat Assessments', count: 12 },
      { type: 'Ethnobotanical Surveys of Upper Neelum', count: 16 },
      { type: 'Avifauna Diversity Studies', count: 9 }
    ],
    ecologicalTrends: [
      { metric: 'Musk Deer Sightings', trend: 'positive', note: 'Higher sighting indices reported in subalpine scree slopes' },
      { metric: 'Subalpine Birch Canopy', trend: 'stable', note: 'Dense Betula utilis stands intact along upper treeline' },
      { metric: 'Snowfall Patterns', trend: 'negative', note: 'Erratic winter snow accumulation noted over past 5 seasons' }
    ]
  },

  'poonch-river-mahaseer-national-park': {
    iucnCategory: 'IUCN Category II (Protected Aquatic Sanctuary)',
    biogeographicZone: 'Sub-Himalayan Foothills (Poonch Basin)',
    watersheds: ['Poonch River Main Channel', 'Degwar Madarpur Stream', 'Mahl River Confluence', 'Mangla Reservoir Delta'],
    conservationSignificance: [
      'Pioneering aquatic national park protecting a 62-kilometer continuous linear riverine sanctuary across Kotli, Mirpur, and Poonch districts.',
      'Specifically created to protect the critically endangered Golden Mahseer (Tor putitora), known as the \\'King of Himalayan Freshwater Fish\\'.',
      'Crucial natural breeding and gravel spawning riffles for the endemic Kashmir Catfish (Glyptothorax kashmirensis) and native snow trout.'
    ],
    connectedAreas: [
      { name: 'Pir Lasura National Park', type: 'Adjacent Foothill PA', distance: '~20 km E' },
      { name: 'Mangla Wetland Reserve', type: 'Downstream Wetland Complex', distance: '~35 km SW' },
      { name: 'Poonch River Upstream Corridor (J&K)', type: 'Transboundary River Channel', distance: 'Contiguous' }
    ],
    threats: [
      { name: 'Illegal Dynamite & Electric Current Fishing', score: 78, trend: 'decreasing' },
      { name: 'Gravel & Sand Mining in Spawning Beds', score: 82, trend: 'stable' },
      { name: 'Hydroelectric Weir Alterations & Flow Diversion', score: 85, trend: 'increasing' },
      { name: 'Agricultural Runoff & Silt Influx', score: 60, trend: 'increasing' }
    ],
    monitoring: [
      { method: 'River Patrol Sentinels & Anti-Poaching Squads', coverage: 85, lastUpdate: '2025' },
      { method: 'Fish Spawning Bed Biomass Audits', coverage: 78, lastUpdate: '2024' },
      { method: 'Water Quality & Turbidity Stations', coverage: 70, lastUpdate: '2024' }
    ],
    dashboard: { conservationStatus: 74, speciesRichness: 70, habitatIntegrity: 68, threatLevel: 72, monitoringCoverage: 76, researchCoverage: 68 },
    dataSources: ['AJK Wildlife & Fisheries Department', 'WWF-Pakistan Freshwater Programme', 'IUCN SSC Freshwater Fish Specialist Group'],
    visitorAccess: 'Open along River Banks (Sport Angling Restricted to Catch-and-Release Permits)',
    researchHighlights: [
      { type: 'Golden Mahseer Breeding & Spawning Studies', count: 24 },
      { type: 'Freshwater Fish Diversity Surveys', count: 18 },
      { type: 'Hydrological Barrier Impact Assessments', count: 11 }
    ],
    ecologicalTrends: [
      { metric: 'Golden Mahseer Spawning Frequency', trend: 'positive', note: 'Successful annual recruitment recorded in Degwar gravel bars' },
      { metric: 'Dynamite Incidents', trend: 'decreasing', note: 'Over 85% drop in illegal dynamite fishing since 2018 enforcement' },
      { metric: 'River Water Quality Index', trend: 'stable', note: 'Dissolved oxygen levels adequate (>7.5 mg/L) during spawning seasons' }
    ]
  },

  'nanga-parbat-national-park': {
    iucnCategory: 'IUCN Category II',
    biogeographicZone: 'Western Himalaya / Karakoram Junction',
    watersheds: ['Raikhot Nullah Catchment', 'Rupal River Basin', 'Diamir River Basin', 'Indus River Gorge'],
    conservationSignificance: [
      'Spans an extraordinary 6,500m single vertical gradient from the warm Indus river gorge (1,600m) to the ice summit of Nanga Parbat (8,126m).',
      'Protects three distinct monumental mountain faces: the 4,500m Rupal Face (highest sheer cliff on Earth), the Diamir flank, and the Raikhot glacier.',
      'Hosts the rare and endangered Astore Markhor (Capra falconeri falconeri), Snow Leopards, and virgin dry temperate conifer woodlands.'
    ],
    connectedAreas: [
      { name: 'Himalaya National Park (Astore)', type: 'National Park Continuum', distance: 'Contiguous' },
      { name: 'Deosai National Park', type: 'Alpine Plateau Linkage', distance: '~55 km E' },
      { name: 'Central Karakoram National Park', type: 'Northern Glacial Network', distance: '~90 km NE' }
    ],
    threats: [
      { name: 'Glacial Melt & Catastrophic Serac Avalanches', score: 85, trend: 'increasing' },
      { name: 'Unregulated Ecotourism Footprint around Fairy Meadows', score: 75, trend: 'increasing' },
      { name: 'Deforestation of Birch & Juniper at High Treeline', score: 62, trend: 'decreasing' }
    ],
    monitoring: [
      { method: 'Community Wildlife Rangers (Diamir & Astore)', coverage: 82, lastUpdate: '2025' },
      { method: 'Astore Markhor Trophy & Population Census', coverage: 88, lastUpdate: '2024' },
      { method: 'Satellite Glacial Lake Sentinel System', coverage: 90, lastUpdate: '2025' }
    ],
    dashboard: { conservationStatus: 86, speciesRichness: 76, habitatIntegrity: 92, threatLevel: 55, monitoringCoverage: 80, researchCoverage: 78 },
    dataSources: ['GB Forest, Wildlife & Environment Department', 'Protected Areas Initiative Pakistan', 'Alpine Club', 'IUCN'],
    visitorAccess: 'Open for Trekkers & Mountaineers (Park registration required at Raikhot Bridge / Fairy Meadows)',
    researchHighlights: [
      { type: 'Astore Markhor Population Dynamics', count: 22 },
      { type: 'Nanga Parbat Glacial Dynamics & Geomorphology', count: 35 },
      { type: 'Vertical Floral Zonation Studies', count: 19 }
    ],
    ecologicalTrends: [
      { metric: 'Astore Markhor Herd Counts', trend: 'positive', note: 'Markhor numbers stabilized through community conservancies' },
      { metric: 'Raikhot Glacier Terminus', trend: 'negative', note: 'Downwasting and debris accumulation documented' },
      { metric: 'Snow Leopard Signs', trend: 'stable', note: 'Observed consistently across Mazeno Pass and Rupal valley' }
    ]
  },

  'himalaya-national-park': {
    iucnCategory: 'IUCN Category II',
    biogeographicZone: 'Western Himalaya (Astore-Deosai Corridor)',
    watersheds: ['Astor River Basin', 'Rupal River Confluence', 'Minimarg Stream Catchment', 'Indus River Tributary System'],
    conservationSignificance: [
      'Vast 2,263 km² high-altitude buffer established to guarantee wildlife connectivity between Deosai National Park and the Nanga Parbat massif.',
      'Secures critical seasonal migration pathways for the Himalayan Brown Bear descending to lower conifer valleys during harsh winter storms.',
      'Protects undisturbed alpine meadow ecosystems and high-altitude birding hotspots for breeding rosefinches and raptors.'
    ],
    connectedAreas: [
      { name: 'Nanga Parbat National Park', type: 'National Park Continuum', distance: 'Contiguous' },
      { name: 'Deosai National Park', type: 'National Park Continuum', distance: 'Contiguous' },
      { name: 'Gurez Valley (Kashmir Core)', type: 'Transboundary Mountain Ridge', distance: '~30 km S' }
    ],
    threats: [
      { name: 'Livestock Grazing along Migration Passes', score: 62, trend: 'stable' },
      { name: 'Winter Snowstorms & Avalanche Damage to Corridors', score: 68, trend: 'increasing' },
      { name: 'Fuelwood Collection in Subalpine Birch Zones', score: 54, trend: 'decreasing' }
    ],
    monitoring: [
      { method: 'Astore Wildlife Guard Patrols', coverage: 78, lastUpdate: '2024' },
      { method: 'Brown Bear Corridor Telemetry & Sightings', coverage: 82, lastUpdate: '2024' },
      { method: 'Satellite Land Cover & Snowpack Index', coverage: 85, lastUpdate: '2025' }
    ],
    dashboard: { conservationStatus: 82, speciesRichness: 72, habitatIntegrity: 88, threatLevel: 46, monitoringCoverage: 76, researchCoverage: 68 },
    dataSources: ['GB Forest, Wildlife & Environment Department', 'Protected Areas Initiative', 'WWF-Pakistan'],
    visitorAccess: 'Open for Wilderness Trekkers (Permit from Astore Wildlife Division)',
    researchHighlights: [
      { type: 'Carnivore Corridor Connectivity Studies', count: 14 },
      { type: 'Astore Valley Floristic Inventories', count: 18 },
      { type: 'Brown Bear Movement Tracking', count: 16 }
    ],
    ecologicalTrends: [
      { metric: 'Brown Bear Corridor Utilization', trend: 'positive', note: 'Documented seasonal transit between Deosai and Astore valleys' },
      { metric: 'Alpine Grassland Health', trend: 'stable', note: 'Good forage biomass across summer grazing allotments' },
      { metric: 'Avian Breeding Density', trend: 'positive', note: 'High nesting success for alpine finches and snow partridges' }
    ]
  },
`;

const original = fs.readFileSync('./src/components/common/ProtectedAreaDetailPage.tsx', 'utf8');

const marker = '    visitorAccess: \'Golf Course Members / Public with Entry Fee\',';
const idx = original.indexOf(marker);
if (idx === -1) {
  console.error('Could not find marker in ProtectedAreaDetailPage.tsx');
  process.exit(1);
}

// Find closing of salim-ali-national-park:
const closeIdx = original.indexOf('  },\n};', idx);
const closeIdxCRLF = original.indexOf('  },\r\n};', idx);
const targetClose = closeIdx !== -1 ? closeIdx : closeIdxCRLF;

if (targetClose === -1) {
  console.error('Could not find targetClose in ProtectedAreaDetailPage.tsx');
  process.exit(1);
}

const before = original.slice(0, targetClose + 4);
const after = original.slice(targetClose + 4);

const updated = before + parkIntelligences + after;
fs.writeFileSync('./src/components/common/ProtectedAreaDetailPage.tsx', updated, 'utf8');
console.log('Successfully updated ProtectedAreaDetailPage.tsx!');
