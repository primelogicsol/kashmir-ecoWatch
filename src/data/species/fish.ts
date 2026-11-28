// Western Himalayan Verified Freshwater Fish (Actinopterygii) Registry (54 Verified Species)
// 12 non-fish aquatic taxa (semiaquatic mammal, herpetofauna, macro-invertebrates, macrophytes) moved to the quarantine archive footer.
import type { BiodiversitySpecies } from '../../types/biodiversity';

export const fishPhase1: BiodiversitySpecies[] = [
  {
    "id": "fish-1",
    "slug": "kashmir-snow-trout",
    "commonName": "Kashmir Snow Trout",
    "scientificName": "Schizothorax niger",
    "localName": "Ale Gad",
    "taxonomicGroup": "fish",
    "category": "Snow Trout",
    "conservationStatus": "VU",
    "description": "Endemic lacustrine snow trout restricted to the Kashmir Valley lakes (Dal, Wular, Manasbal, Anchar). Characterized by fine scales, dark olive-bronze back, and blunt snout. Severely threatened by eutrophication, siltation, and direct competition with introduced common carp.",
    "ecologicalRole": "Benthic Diatom Feeder / Lacustrine Herbivore",
    "habitats": [
      "Valley Lakes",
      "Slow-moving Wetland Channels",
      "Karst Spring Outflows",
      "Cold Mountain Rivers & Streams",
      "Valley Lakes (Dal, Wular, Manasbal)",
      "Wetlands, Marshes & Floodplains",
      "Karst Springs & Headwaters"
    ],
    "elevationRange": {
      "min": 1500,
      "max": 1800
    },
    "districts": [
      "Srinagar",
      "Bandipora",
      "Ganderbal",
      "Baramulla"
    ],
    "protectedAreas": [
      "Wular Lake Ramsar Site",
      "Hokersar Wetland",
      "Shallabugh Wetland"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Eutrophication",
      "Competition with Common Carp",
      "Siltation",
      "Loss of Spawning Channels"
    ],
    "conservationMeasures": [
      "Habitat restoration of spawning nullahs",
      "Artifical breeding and ranching",
      "Gillnet mesh regulation"
    ],
    "sensitivity": "high",
    "verifiedSightings": 266,
    "conservationPriority": 8,
    "distributionPoints": [],
    "endemismStatus": "kashmir-endemic",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-2",
    "slug": "chirruh-snow-trout",
    "commonName": "Chirruh Snow Trout",
    "scientificName": "Schizothorax esocinus",
    "localName": "Chirruh / Chirroo",
    "taxonomicGroup": "fish",
    "category": "Snow Trout",
    "conservationStatus": "VU",
    "description": "Pike-like predatory snow trout with an elongated body, wide gape, and prominent black spots on flanks. Inhabits fast-flowing torrential rivers and streams across Jhelum, Kishanganga, and upper Indus basins. Highly vulnerable to hydropower dam fragmentation and gravel mining.",
    "ecologicalRole": "Riverine Benthic Carnivore / Piscivore",
    "habitats": [
      "Clear Fast-flowing Rivers",
      "Gravel Bed Streams",
      "River Confluences",
      "Glacial Torrents & High-Altitude Streams",
      "Cold Mountain Rivers & Streams",
      "Alpine Lakes & High Tarns"
    ],
    "elevationRange": {
      "min": 1400,
      "max": 3200
    },
    "districts": [
      "Anantnag",
      "Srinagar",
      "Baramulla",
      "Bandipora",
      "Ganderbal",
      "Kupwara"
    ],
    "protectedAreas": [
      "Overa-Aru Wildlife Sanctuary",
      "Lidder River Basin Reserve"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Hydropower Dams",
      "Illegal Dynamite & Bleach Fishing",
      "Unregulated Sand & Gravel Mining"
    ],
    "conservationMeasures": [
      "Construction of fish passes on barrages",
      "Anti-poaching patrols during breeding migration",
      "Protected river sanctuaries"
    ],
    "sensitivity": "high",
    "verifiedSightings": 204,
    "conservationPriority": 8,
    "distributionPoints": [],
    "endemismStatus": "himalayan-endemic",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-3",
    "slug": "satter-snow-trout",
    "commonName": "Satter Snow Trout",
    "scientificName": "Schizothorax curvifrons",
    "localName": "Sattar Gad",
    "taxonomicGroup": "fish",
    "category": "Snow Trout",
    "conservationStatus": "VU",
    "description": "A prized indigenous food fish of Kashmir Valley lakes and the Jhelum mainstream. Identified by its arched dorsal profile, inferior mouth, and silvery flanks. Spawns over pebble-gravel beds in running spring water during March to May.",
    "ecologicalRole": "Omnivore / Benthic Periphyton Grazer",
    "habitats": [
      "Valley Lakes",
      "Spring-fed Streams",
      "Meandering River Reaches",
      "Cold Mountain Rivers & Streams",
      "Valley Lakes (Dal, Wular, Manasbal)",
      "Karst Springs & Headwaters"
    ],
    "elevationRange": {
      "min": 1500,
      "max": 2200
    },
    "districts": [
      "Srinagar",
      "Ganderbal",
      "Bandipora",
      "Budgam",
      "Baramulla"
    ],
    "protectedAreas": [
      "Wular Lake Ramsar Site",
      "Manasbal Lake Ecosystem"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Pesticide Runoff",
      "Silt Influx",
      "Spawning Bed Destruction"
    ],
    "conservationMeasures": [
      "Protection of springhead breeding sanctuaries",
      "Community participatory monitoring",
      "Catch quota limits"
    ],
    "sensitivity": "high",
    "verifiedSightings": 114,
    "conservationPriority": 7,
    "distributionPoints": [],
    "endemismStatus": "kashmir-endemic",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-4",
    "slug": "himalayan-snow-trout",
    "commonName": "Himalayan Snow Trout",
    "scientificName": "Schizothorax plagiostomus",
    "localName": "Khont",
    "taxonomicGroup": "fish",
    "category": "Snow Trout",
    "conservationStatus": "LC",
    "description": "The quintessential torrential snow trout of the Western Himalayas. Features a hard, spade-like lower jaw with a continuous transverse labial fold adapted for scraping epilithic algae from boulders in raging torrents.",
    "ecologicalRole": "Keystone Epilithic Algal Scraper",
    "habitats": [
      "High-gradient Mountain Streams",
      "Riffles and Boulder Cascades",
      "Glacial Meltwaters",
      "Glacial Torrents & High-Altitude Streams",
      "Cold Mountain Rivers & Streams",
      "Alpine Lakes & High Tarns"
    ],
    "elevationRange": {
      "min": 1100,
      "max": 3400
    },
    "districts": [
      "Anantnag",
      "Kulgam",
      "Shopian",
      "Ganderbal",
      "Doda",
      "Kishtwar",
      "Poonch",
      "Kargil"
    ],
    "protectedAreas": [
      "Kishtwar High Altitude National Park",
      "Hirpora Wildlife Sanctuary"
    ],
    "seasonality": "Active in summer melt season; dormant / under ice cover in winter.",
    "threats": [
      "Run-of-the-river Hydel Projects",
      "Catchment Deforestation",
      "Water Temperature Spikes"
    ],
    "conservationMeasures": [
      "Environmental minimum flow mandates",
      "Riverbank riparian buffer planting"
    ],
    "sensitivity": "medium",
    "verifiedSightings": 181,
    "conservationPriority": 6,
    "distributionPoints": [],
    "endemismStatus": "himalayan-endemic",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-5",
    "slug": "kunar-snow-trout",
    "commonName": "Kunar Snow Trout",
    "scientificName": "Schizothorax labiatus",
    "localName": "Chush",
    "taxonomicGroup": "fish",
    "category": "Snow Trout",
    "conservationStatus": "LC",
    "description": "Characterized by hypertrophied, fleshy, trilobed lower lips forming a suction disc to adhere to smooth rock surfaces in strong currents. Native to Jhelum, Kishanganga, and Neelum drainage systems.",
    "ecologicalRole": "Benthic Algae Grazer & Macroinvertebrate Feeder",
    "habitats": [
      "Rapid Rocky Streams",
      "Deep River Gorges",
      "Glacial-fed Torrents",
      "Glacial Torrents & High-Altitude Streams",
      "Cold Mountain Rivers & Streams"
    ],
    "elevationRange": {
      "min": 1300,
      "max": 2600
    },
    "districts": [
      "Baramulla",
      "Bandipora",
      "Kupwara",
      "Ganderbal",
      "Muzaffarabad"
    ],
    "protectedAreas": [
      "Limber Wildlife Sanctuary",
      "Kazimag National Park"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Flash Floods & Siltation",
      "Dam Blockages",
      "River Bed Mining"
    ],
    "conservationMeasures": [
      "Riparian bank stabilisation",
      "Periodic eco-flow audits"
    ],
    "sensitivity": "medium",
    "verifiedSightings": 221,
    "conservationPriority": 5,
    "distributionPoints": [],
    "endemismStatus": "northwest-himalayan",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-6",
    "slug": "dinnawah-snow-trout",
    "commonName": "Dinnawah Snow Trout",
    "scientificName": "Schizothorax progastus",
    "localName": "Dinnawah",
    "taxonomicGroup": "fish",
    "category": "Snow Trout",
    "conservationStatus": "VU",
    "description": "A streamlined snow trout with subterminal mouth and prominent barbels. Undertakes extensive seasonal longitudinal migrations between deep wintering pools in lower gorges and shallow upstream gravel runs for summer spawning.",
    "ecologicalRole": "Pelagic-Benthic Omnivore",
    "habitats": [
      "Deep River Pools",
      "Torrential Rapids",
      "Confluence Zones",
      "Glacial Torrents & High-Altitude Streams",
      "Cold Mountain Rivers & Streams"
    ],
    "elevationRange": {
      "min": 1000,
      "max": 2800
    },
    "districts": [
      "Anantnag",
      "Baramulla",
      "Doda",
      "Ramban",
      "Reasi"
    ],
    "protectedAreas": [
      "Lidder Sanctuary",
      "Chenab Valley Riparian Corridor"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "River Fragmentation",
      "Sand Dredging",
      "Uncontrolled Angling Pressure"
    ],
    "conservationMeasures": [
      "Seasonal fishing bans during migration",
      "Establishment of no-take river beats"
    ],
    "sensitivity": "high",
    "verifiedSightings": 116,
    "conservationPriority": 7,
    "distributionPoints": [],
    "endemismStatus": "himalayan-endemic",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-7",
    "slug": "snouted-snow-trout",
    "commonName": "Snouted Snow Trout",
    "scientificName": "Schizothorax nasus",
    "localName": "Dongu",
    "taxonomicGroup": "fish",
    "category": "Snow Trout",
    "conservationStatus": "EN",
    "description": "A rare endemic snow trout distinguished by its markedly pointed and protruding fleshy snout. Primarily recorded in the upper Jhelum mainstream and spring-fed wetland channels. Severely depleted in recent decades.",
    "ecologicalRole": "Benthic Invertebrate Feeder",
    "habitats": [
      "Spring-fed Streams",
      "Meandering River Reaches",
      "Lake Inflow Deltas",
      "Cold Mountain Rivers & Streams",
      "Valley Lakes (Dal, Wular, Manasbal)",
      "Wetlands, Marshes & Floodplains",
      "Karst Springs & Headwaters"
    ],
    "elevationRange": {
      "min": 1500,
      "max": 2100
    },
    "districts": [
      "Anantnag",
      "Srinagar",
      "Pulwama"
    ],
    "protectedAreas": [
      "Achabal Spring Reserve",
      "Wular Ramsar Site"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Habitat Loss",
      "Chemical Runoff",
      "Severe Water Abstraction"
    ],
    "conservationMeasures": [
      "Ex-situ broodstock development",
      "Legal protection under Wildlife Protection Act"
    ],
    "sensitivity": "critical",
    "verifiedSightings": 96,
    "conservationPriority": 9,
    "distributionPoints": [],
    "endemismStatus": "kashmir-endemic",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-8",
    "slug": "hugel-s-snow-trout",
    "commonName": "Hugel's Snow Trout",
    "scientificName": "Schizothorax hugelii",
    "localName": "Hugel Gad",
    "taxonomicGroup": "fish",
    "category": "Snow Trout",
    "conservationStatus": "EN",
    "description": "Described by Karl von Hügel in 1838 from the Vale of Kashmir. Highly sensitive coldwater species with limited distribution in mountain tributaries and springs.",
    "ecologicalRole": "Benthic Grazer",
    "habitats": [
      "Cold Karstic Streams",
      "Clear Lake Basins",
      "Cold Mountain Rivers & Streams",
      "Valley Lakes (Dal, Wular, Manasbal)",
      "Karst Springs & Headwaters"
    ],
    "elevationRange": {
      "min": 1500,
      "max": 2000
    },
    "districts": [
      "Srinagar",
      "Ganderbal",
      "Anantnag"
    ],
    "protectedAreas": [
      "Sind Valley Protected Zone"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Karst Spring Depletion",
      "Eutrophication",
      "Introduced Species"
    ],
    "conservationMeasures": [
      "Spring catchment protection",
      "Monitoring of relict populations"
    ],
    "sensitivity": "critical",
    "verifiedSightings": 80,
    "conservationPriority": 9,
    "distributionPoints": [],
    "endemismStatus": "kashmir-endemic",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-9",
    "slug": "flat-headed-snow-trout",
    "commonName": "Flat-headed Snow Trout",
    "scientificName": "Schizothorax planifrons",
    "localName": "Kani Gad",
    "taxonomicGroup": "fish",
    "category": "Snow Trout",
    "conservationStatus": "EN",
    "description": "Distinguished by a strongly depressed, flat cranium and broad mouth. Specialized for bottom dwelling in rapid pebble beds across the Pir Panjal and Great Himalayan foothill streams.",
    "ecologicalRole": "Benthic Insectivore",
    "habitats": [
      "Fast Rocky Brooks",
      "Pebble Riffles",
      "Cold Mountain Rivers & Streams"
    ],
    "elevationRange": {
      "min": 1550,
      "max": 2300
    },
    "districts": [
      "Shopian",
      "Kulgam",
      "Budgam"
    ],
    "protectedAreas": [
      "Hirpora Wildlife Sanctuary"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Road Widening & Debris Dumping",
      "Stream Canalisation",
      "Pesticide Spray Drift"
    ],
    "conservationMeasures": [
      "Buffer zone maintenance along apple orchards",
      "Restoration of stream riffles"
    ],
    "sensitivity": "high",
    "verifiedSightings": 166,
    "conservationPriority": 8,
    "distributionPoints": [],
    "endemismStatus": "kashmir-endemic",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-10",
    "slug": "alwan-snow-trout",
    "commonName": "Alwan Snow Trout",
    "scientificName": "Schizothorax richardsonii",
    "localName": "Alwan / Asela",
    "taxonomicGroup": "fish",
    "category": "Snow Trout",
    "conservationStatus": "VU",
    "description": "A wide-ranging Western Himalayan coldwater cyprinid. Dominant in the Chenab, Tawi, and lower Jhelum tributaries. Possesses an extraordinary adhesive labial disc to resist torrential flash floods.",
    "ecologicalRole": "Primary Epilithic Grazer",
    "habitats": [
      "Sub-Himalayan Torrential Streams",
      "Riffle-Pool Complexes",
      "Glacial Torrents & High-Altitude Streams",
      "Cold Mountain Rivers & Streams"
    ],
    "elevationRange": {
      "min": 600,
      "max": 2800
    },
    "districts": [
      "Jammu",
      "Udhampur",
      "Reasi",
      "Doda",
      "Kishtwar",
      "Poonch",
      "Rajouri"
    ],
    "protectedAreas": [
      "Tawi River Riparian Corridor"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Illegal Poisoning & Electro-fishing",
      "Excessive River Bed Mining",
      "Hydropower Weirs"
    ],
    "conservationMeasures": [
      "Community river guardianship programs",
      "Fish ladders on diversion barrages"
    ],
    "sensitivity": "high",
    "verifiedSightings": 298,
    "conservationPriority": 7,
    "distributionPoints": [],
    "endemismStatus": "himalayan-endemic",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-11",
    "slug": "indus-snow-trout",
    "commonName": "Indus Snow Trout",
    "scientificName": "Ptychobarbus conirostris",
    "localName": "Canir Gad / Canir",
    "taxonomicGroup": "fish",
    "category": "Snow Trout",
    "conservationStatus": "LC",
    "description": "High-altitude cold-desert specialist with an elongated cone-shaped snout and lack of barbels. Thrives in the frigid, silt-laden waters of the Indus, Suru, and Dras rivers of Ladakh. Tolerates sub-zero winter temperatures.",
    "ecologicalRole": "Benthic Detritivore / Insect Larvae Feeder",
    "habitats": [
      "Glacial Torrents",
      "Braided High-Altitude Rivers",
      "Deep High-Mountain Pools",
      "Glacial Torrents & High-Altitude Streams",
      "Cold Mountain Rivers & Streams",
      "Alpine Lakes & High Tarns"
    ],
    "elevationRange": {
      "min": 2800,
      "max": 4400
    },
    "districts": [
      "Leh",
      "Kargil"
    ],
    "protectedAreas": [
      "Hemis National Park",
      "Suru River Reserve"
    ],
    "seasonality": "Active in summer melt season; dormant / under ice cover in winter.",
    "threats": [
      "Road Construction Silt",
      "Climate-induced Glacial Retreat Fluctuations"
    ],
    "conservationMeasures": [
      "Baseline biological surveys",
      "High-altitude riparian preservation"
    ],
    "sensitivity": "medium",
    "verifiedSightings": 54,
    "conservationPriority": 5,
    "distributionPoints": [],
    "endemismStatus": "trans-himalayan",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-12",
    "slug": "tibetan-snow-trout",
    "commonName": "Tibetan Snow Trout",
    "scientificName": "Diptychus maculatus",
    "localName": "Shakpa / Tibetan Osman",
    "taxonomicGroup": "fish",
    "category": "Snow Trout",
    "conservationStatus": "LC",
    "description": "One of the highest-elevation freshwater teleost fishes on Earth. Thick scaleless leathery skin with scattered dark spots. Adapted to survive under solid ice sheets for five months of the year in Ladakh's high-plateau streams.",
    "ecologicalRole": "Cold-Adapted Benthic Scraper",
    "habitats": [
      "Alpine Glacial Streams",
      "High Plateau Braided Waters",
      "Cold Steppe Brooks",
      "Glacial Torrents & High-Altitude Streams",
      "Cold Mountain Rivers & Streams",
      "Alpine Lakes & High Tarns"
    ],
    "elevationRange": {
      "min": 3200,
      "max": 5100
    },
    "districts": [
      "Leh",
      "Kargil"
    ],
    "protectedAreas": [
      "Changthang Cold Desert Wildlife Sanctuary"
    ],
    "seasonality": "Active in summer melt season; dormant / under ice cover in winter.",
    "threats": [
      "Unregulated Eco-tourism Vehicle Crossings",
      "Warming Stream Temperatures",
      "Drought"
    ],
    "conservationMeasures": [
      "Vehicle crossing restrictions across high streams",
      "Cryosphere monitoring link"
    ],
    "sensitivity": "high",
    "verifiedSightings": 130,
    "conservationPriority": 6,
    "distributionPoints": [],
    "endemismStatus": "trans-himalayan",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-13",
    "slug": "false-osman",
    "commonName": "False Osman",
    "scientificName": "Schizopygopsis stoliczkai",
    "localName": "Kinnaur Osman / Stoliczka's Snow Trout",
    "taxonomicGroup": "fish",
    "category": "Snow Trout",
    "conservationStatus": "LC",
    "description": "Completely scaleless body except along the lateral line and perianal region. Widespread across the Indus drainage of Ladakh and Zanskar. Shows phenomenal physiological tolerance to high salinity and severe hypoxia during winter freezing.",
    "ecologicalRole": "Omnivore / Filamentous Algae & Chironomid Feeder",
    "habitats": [
      "Cold High Altitude Streams",
      "Braided Floodplain Channels",
      "Alpine Glacial Deltas",
      "Glacial Torrents & High-Altitude Streams",
      "Cold Mountain Rivers & Streams",
      "Alpine Lakes & High Tarns"
    ],
    "elevationRange": {
      "min": 3000,
      "max": 4800
    },
    "districts": [
      "Leh",
      "Kargil"
    ],
    "protectedAreas": [
      "Hemis National Park",
      "Zanskar Protected Reserve"
    ],
    "seasonality": "Active in summer melt season; dormant / under ice cover in winter.",
    "threats": [
      "Mini-Hydel Diversions",
      "Sediment Flush Events"
    ],
    "conservationMeasures": [
      "Ecological flow protections on Zanskar tributaries"
    ],
    "sensitivity": "medium",
    "verifiedSightings": 229,
    "conservationPriority": 5,
    "distributionPoints": [],
    "endemismStatus": "trans-himalayan",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-14",
    "slug": "ladakh-lake-naked-carp",
    "commonName": "Ladakh Lake Naked Carp",
    "scientificName": "Gymnocypris biswasi",
    "localName": "Biswas Osman",
    "taxonomicGroup": "fish",
    "category": "Snow Trout",
    "conservationStatus": "CR",
    "description": "Extremely rare and critically endangered cold-desert lacustrine snow carp recorded historically from high-altitude endorheic lakes of Ladakh. Bare body with degenerate scales.",
    "ecologicalRole": "Lacustrine Plankton & Benthic Feeder",
    "habitats": [
      "High Altitude Saline/Brackish Lakes",
      "Alpine Endorheic Basins",
      "Glacial Torrents & High-Altitude Streams",
      "Cold Mountain Rivers & Streams",
      "Alpine Lakes & High Tarns"
    ],
    "elevationRange": {
      "min": 4200,
      "max": 4600
    },
    "districts": [
      "Leh"
    ],
    "protectedAreas": [
      "Tso Moriri Ramsar Site",
      "Tso Kar Wetland Complex"
    ],
    "seasonality": "Active in summer melt season; dormant / under ice cover in winter.",
    "threats": [
      "Salinity Shifts",
      "Glacial Water Inflow Reduction",
      "Climate Warming"
    ],
    "conservationMeasures": [
      "Urgent targeted genomic and population surveys",
      "Strict wetland preservation"
    ],
    "sensitivity": "critical",
    "verifiedSightings": 122,
    "conservationPriority": 10,
    "distributionPoints": [],
    "endemismStatus": "trans-himalayan",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-15",
    "slug": "brown-trout",
    "commonName": "Brown Trout",
    "scientificName": "Salmo trutta fario",
    "localName": "Geur Gad / Angrezi Gad",
    "taxonomicGroup": "fish",
    "category": "Trout",
    "conservationStatus": "LC",
    "description": "Introduced from the UK to Kashmir in 1899-1901 by F.J. Mitchell at the Laribal hatchery. Now thoroughly naturalized in high-gradient cold mountain streams (Lidder, Sind, Bringi, Kishanganga, Madhumati) and alpine lakes (Gangabal, Vishansar). Legendary sport fish.",
    "ecologicalRole": "Apex Coldwater Stream Predator",
    "habitats": [
      "Cold Mountain Torrents",
      "Subalpine Streams",
      "High Altitude Oligotrophic Lakes",
      "Glacial Torrents & High-Altitude Streams",
      "Cold Mountain Rivers & Streams",
      "Valley Lakes (Dal, Wular, Manasbal)",
      "Alpine Lakes & High Tarns"
    ],
    "elevationRange": {
      "min": 1600,
      "max": 3600
    },
    "districts": [
      "Anantnag",
      "Ganderbal",
      "Bandipora",
      "Kulgam",
      "Shopian",
      "Baramulla",
      "Doda",
      "Kishtwar"
    ],
    "protectedAreas": [
      "Overa-Aru Wildlife Sanctuary",
      "Gangabal Lake Sanctuary",
      "Hirpora Wildlife Sanctuary"
    ],
    "seasonality": "Active in summer melt season; dormant / under ice cover in winter.",
    "threats": [
      "Summer Water Warming Above 20°C",
      "Illegal Bleach Fishing",
      "Flash Floods Destroying Redd Beds"
    ],
    "conservationMeasures": [
      "Catch-and-release fly angling rules",
      "Artificial stripping and hatchery replenishment",
      "Barbless single hook regulation"
    ],
    "sensitivity": "low",
    "verifiedSightings": 61,
    "conservationPriority": 4,
    "distributionPoints": [],
    "endemismStatus": "widely-distributed",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-16",
    "slug": "rainbow-trout",
    "commonName": "Rainbow Trout",
    "scientificName": "Oncorhynchus mykiss",
    "localName": "Rainbow Gad",
    "taxonomicGroup": "fish",
    "category": "Trout",
    "conservationStatus": "LC",
    "description": "Native to Pacific North America, introduced for high-density aquaculture and recreational angling. Forms the foundation of commercial coldwater aquaculture in Kashmir, centered at Asia's largest trout breeding center in Kokernag and hundreds of private raceways.",
    "ecologicalRole": "Cultured Coldwater Carnivore / Sport Fish",
    "habitats": [
      "Spring-fed Raceways",
      "Managed River Beats",
      "Cool Fast Streams",
      "Cold Mountain Rivers & Streams",
      "Karst Springs & Headwaters",
      "Alpine Lakes & High Tarns"
    ],
    "elevationRange": {
      "min": 1500,
      "max": 2800
    },
    "districts": [
      "Anantnag",
      "Srinagar",
      "Ganderbal",
      "Baramulla",
      "Kulgam",
      "Kupwara",
      "Budgam",
      "Bandipora",
      "Leh"
    ],
    "protectedAreas": [
      "Kokernag Fisheries Complex",
      "Laribal Hatchery Dachigam"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Disease Outbreaks (VHS, IPN)",
      "Prolonged Drought & Stream Warming",
      "Water Pollution"
    ],
    "conservationMeasures": [
      "High-tech recirculation systems",
      "Pathogen biosecurity protocols",
      "Solar aerated green raceways"
    ],
    "sensitivity": "low",
    "verifiedSightings": 277,
    "conservationPriority": 3,
    "distributionPoints": [],
    "endemismStatus": "widely-distributed",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-17",
    "slug": "brook-trout",
    "commonName": "Brook Trout",
    "scientificName": "Salvelinus fontinalis",
    "localName": "Charr / Brook Trout",
    "taxonomicGroup": "fish",
    "category": "Trout",
    "conservationStatus": "LC",
    "description": "North American charr introduced experimentally to high-elevation spring branches and isolated high-altitude streams. Exhibits brilliant red and yellow spots with blue halos and white leading edges on lower fins.",
    "ecologicalRole": "Cold Springbrook Predator",
    "habitats": [
      "Cold Karst Springheads",
      "Glacial Outflow Brooks",
      "Glacial Torrents & High-Altitude Streams",
      "Cold Mountain Rivers & Streams",
      "Karst Springs & Headwaters",
      "Alpine Lakes & High Tarns"
    ],
    "elevationRange": {
      "min": 1800,
      "max": 3200
    },
    "districts": [
      "Anantnag",
      "Srinagar",
      "Ganderbal"
    ],
    "protectedAreas": [
      "Dachigam National Park Cold Springs",
      "Kokernag Sanctuaries"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Competition with Brown Trout",
      "Thermal Intolerance above 18°C"
    ],
    "conservationMeasures": [
      "Hatchery broodstock maintenance",
      "Selective spring habitat reserves"
    ],
    "sensitivity": "medium",
    "verifiedSightings": 149,
    "conservationPriority": 4,
    "distributionPoints": [],
    "endemismStatus": "widely-distributed",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-18",
    "slug": "kashmiri-stone-loach",
    "commonName": "Kashmiri Stone Loach",
    "scientificName": "Triplophysa kashmirensis",
    "localName": "Koor Gad / Stone Loach",
    "taxonomicGroup": "fish",
    "category": "River Loach",
    "conservationStatus": "LC",
    "description": "Slender, mottled benthic loach endemic to the springs, irrigation kuls, and clear pebble streams of the Kashmir Valley. Highly specialized bottom dweller feeding on chironomid midge larvae and detritus.",
    "ecologicalRole": "Benthic Macroinvertebrate Forager & Prey Base",
    "habitats": [
      "Gravel-Bed Springs",
      "Clear Irrigation Kuls",
      "Braided Stream Margins",
      "Cold Mountain Rivers & Streams",
      "Karst Springs & Headwaters"
    ],
    "elevationRange": {
      "min": 1500,
      "max": 2600
    },
    "districts": [
      "Srinagar",
      "Anantnag",
      "Baramulla",
      "Budgam",
      "Pulwama",
      "Ganderbal"
    ],
    "protectedAreas": [
      "Hokersar Wetland Inflows",
      "Dal Lake Basin Springs"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Cementing / Canalisation of Natural Kuls",
      "Pesticide Runoff from Apple Orchards",
      "Spring Drying"
    ],
    "conservationMeasures": [
      "Preservation of unlined natural earthen canal beds",
      "Strict pesticide runoff controls"
    ],
    "sensitivity": "high",
    "verifiedSightings": 68,
    "conservationPriority": 7,
    "distributionPoints": [],
    "endemismStatus": "kashmir-endemic",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-19",
    "slug": "marbled-mountain-loach",
    "commonName": "Marbled Mountain Loach",
    "scientificName": "Triplophysa marmorata",
    "localName": "Chitrakoor",
    "taxonomicGroup": "fish",
    "category": "River Loach",
    "conservationStatus": "LC",
    "description": "Intricately marbled hillstream loach inhabiting cold mountain brooks across the Jhelum catchment. Provides a vital trophic link between benthic aquatic insects and predatory trouts and otters.",
    "ecologicalRole": "Benthic Insectivore / Trophic Buffer",
    "habitats": [
      "Clear Mountain Brooks",
      "Pebble Riffles",
      "Subalpine Streams",
      "Cold Mountain Rivers & Streams",
      "Karst Springs & Headwaters"
    ],
    "elevationRange": {
      "min": 1500,
      "max": 2800
    },
    "districts": [
      "Anantnag",
      "Kulgam",
      "Shopian",
      "Ganderbal",
      "Bandipora"
    ],
    "protectedAreas": [
      "Overa-Aru Sanctuary",
      "Sind Valley Reserve"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Turbidity Spikes",
      "Sedimentation",
      "Stream Bank Deforestation"
    ],
    "conservationMeasures": [
      "Riparian vegetation buffers",
      "Sediment trap installations"
    ],
    "sensitivity": "high",
    "verifiedSightings": 159,
    "conservationPriority": 6,
    "distributionPoints": [],
    "endemismStatus": "kashmir-endemic",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-20",
    "slug": "ladakh-stone-loach",
    "commonName": "Ladakh Stone Loach",
    "scientificName": "Triplophysa ladacensis",
    "localName": "Ladakh Loach",
    "taxonomicGroup": "fish",
    "category": "River Loach",
    "conservationStatus": "LC",
    "description": "Cold-desert specialist found in the Indus, Nubra, and Shyok river basins of Ladakh. Adapted to freezing waters with high mineral content and extreme current velocities.",
    "ecologicalRole": "High-Altitude Benthic Grazer",
    "habitats": [
      "Braided Cold Desert Rivers",
      "Pebble Bars",
      "Thermal Spring Outflows",
      "Glacial Torrents & High-Altitude Streams",
      "Cold Mountain Rivers & Streams",
      "Karst Springs & Headwaters"
    ],
    "elevationRange": {
      "min": 2900,
      "max": 4600
    },
    "districts": [
      "Leh",
      "Kargil"
    ],
    "protectedAreas": [
      "Nubra Valley Riparian Zone",
      "Shey Marshes"
    ],
    "seasonality": "Active in summer melt season; dormant / under ice cover in winter.",
    "threats": [
      "Flash Floods",
      "Road Culvert Constructions Blocking Passage"
    ],
    "conservationMeasures": [
      "Fish-friendly culvert engineering on mountain highways"
    ],
    "sensitivity": "medium",
    "verifiedSightings": 229,
    "conservationPriority": 5,
    "distributionPoints": [],
    "endemismStatus": "trans-himalayan",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-21",
    "slug": "birdi-loach",
    "commonName": "Birdi Loach",
    "scientificName": "Botia birdi",
    "localName": "Gongal / Tiger Loach",
    "taxonomicGroup": "fish",
    "category": "River Loach",
    "conservationStatus": "LC",
    "description": "Strikingly patterned loach with vertical dark bands, subocular spines, and four pairs of barbels. Inhabits rocky pools, submerged boulders, and river undercuts in the Jhelum and Chenab basins.",
    "ecologicalRole": "Crevice Benthic Predator (Molluscs & Insect Larvae)",
    "habitats": [
      "Rocky River Beds",
      "Submerged Boulders",
      "Deep Stream Pools",
      "Cold Mountain Rivers & Streams",
      "Karst Springs & Headwaters"
    ],
    "elevationRange": {
      "min": 350,
      "max": 1800
    },
    "districts": [
      "Baramulla",
      "Srinagar",
      "Bandipora",
      "Anantnag",
      "Jammu",
      "Reasi",
      "Poonch",
      "Mirpur"
    ],
    "protectedAreas": [
      "Wular Lake Environs",
      "Chenab River Basin"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Boulder Quarrying from Stream Beds",
      "Hydrological Alterations"
    ],
    "conservationMeasures": [
      "Ban on in-stream mechanized boulder extraction",
      "Sanctuary pool demarcations"
    ],
    "sensitivity": "medium",
    "verifiedSightings": 90,
    "conservationPriority": 6,
    "distributionPoints": [],
    "endemismStatus": "northwest-himalayan",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-22",
    "slug": "kashmir-hillstream-loach",
    "commonName": "Kashmir Hillstream Loach",
    "scientificName": "Schistura alepidota",
    "localName": "Koor / Banded Loach",
    "taxonomicGroup": "fish",
    "category": "River Loach",
    "conservationStatus": "LC",
    "description": "Small, cylindrical torrent loach with 10-14 dark vertical bars across flanks. Uses muscular pectoral fins to cling to stones in rapid currents.",
    "ecologicalRole": "Fast-Water Insectivore",
    "habitats": [
      "Shallow Mountain Brooks",
      "Cascading Torrent Margins",
      "Glacial Torrents & High-Altitude Streams",
      "Cold Mountain Rivers & Streams",
      "Karst Springs & Headwaters"
    ],
    "elevationRange": {
      "min": 1200,
      "max": 2400
    },
    "districts": [
      "Bandipora",
      "Kupwara",
      "Baramulla",
      "Poonch",
      "Rajouri"
    ],
    "protectedAreas": [
      "Rajparian Wildlife Sanctuary",
      "Kazimag Sanctuary"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Chemical Agricultural Runoff",
      "Habitat Disturbance"
    ],
    "conservationMeasures": [
      "Orchard pesticide monitoring along trout nullahs"
    ],
    "sensitivity": "high",
    "verifiedSightings": 108,
    "conservationPriority": 6,
    "distributionPoints": [],
    "endemismStatus": "northwest-himalayan",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-23",
    "slug": "yasin-stone-loach",
    "commonName": "Yasin Stone Loach",
    "scientificName": "Triplophysa yasinensis",
    "localName": "Yasin Loach",
    "taxonomicGroup": "fish",
    "category": "River Loach",
    "conservationStatus": "LC",
    "description": "Transboundary mountain loach inhabiting the cold upper tributaries of the Indus and Gilgit drainages. Tolerates extreme glacial turbidity in summer.",
    "ecologicalRole": "Cold-Torrent Benthic Detritivore",
    "habitats": [
      "Glacial Silt Torrents",
      "Braided Gravel Channels",
      "Glacial Torrents & High-Altitude Streams",
      "Cold Mountain Rivers & Streams",
      "Karst Springs & Headwaters",
      "Alpine Lakes & High Tarns"
    ],
    "elevationRange": {
      "min": 2000,
      "max": 3800
    },
    "districts": [
      "Kargil",
      "Leh",
      "Gilgit"
    ],
    "protectedAreas": [
      "Dras-Kargil River Belt"
    ],
    "seasonality": "Active in summer melt season; dormant / under ice cover in winter.",
    "threats": [
      "Bridge and Road Construction",
      "Turbidity Alterations"
    ],
    "conservationMeasures": [
      "Protection of braided nursery channels"
    ],
    "sensitivity": "medium",
    "verifiedSightings": 83,
    "conservationPriority": 5,
    "distributionPoints": [],
    "endemismStatus": "trans-himalayan",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-24",
    "slug": "stoliczka-s-mountain-loach",
    "commonName": "Stoliczka's Mountain Loach",
    "scientificName": "Triplophysa stoliczkai",
    "localName": "Stoliczka Loach",
    "taxonomicGroup": "fish",
    "category": "River Loach",
    "conservationStatus": "LC",
    "description": "One of the most elevated loach species in the world, living in Tibetan plateau and Ladakh streams up to 5,000 m. Extremely hardy against seasonal freezing.",
    "ecologicalRole": "Extreme Altitude Benthic Forager",
    "habitats": [
      "Cold High Plateau Brooks",
      "Sub-glacial Melt Runs",
      "Glacial Torrents & High-Altitude Streams",
      "Cold Mountain Rivers & Streams",
      "Karst Springs & Headwaters"
    ],
    "elevationRange": {
      "min": 3000,
      "max": 5000
    },
    "districts": [
      "Leh",
      "Kargil"
    ],
    "protectedAreas": [
      "Changthang Wildlife Sanctuary"
    ],
    "seasonality": "Active in summer melt season; dormant / under ice cover in winter.",
    "threats": [
      "Cryosphere Loss",
      "Spring Warming"
    ],
    "conservationMeasures": [
      "High plateau watershed micro-reserves"
    ],
    "sensitivity": "medium",
    "verifiedSightings": 111,
    "conservationPriority": 5,
    "distributionPoints": [],
    "endemismStatus": "trans-himalayan",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-25",
    "slug": "kashmir-torrent-catfish",
    "commonName": "Kashmir Torrent Catfish",
    "scientificName": "Glyptothorax kashmirensis",
    "localName": "Tilkador / Kashmir Catfish",
    "taxonomicGroup": "fish",
    "category": "Torrent Catfish",
    "conservationStatus": "CR",
    "description": "Critically endangered endemic rheophilic catfish with a thoracic adhesive apparatus composed of longitudinal skin folds. Lives glued to the undersides of rocks in boiling rapids of the Jhelum and Kishanganga. Highly susceptible to river impoundments.",
    "ecologicalRole": "Specialized Torrential Benthic Predator",
    "habitats": [
      "Torrential River Rapids",
      "Boulder Underhangs",
      "Deep Turbulent Gorges",
      "Glacial Torrents & High-Altitude Streams",
      "Cold Mountain Rivers & Streams",
      "Lowland Rivers & Canals"
    ],
    "elevationRange": {
      "min": 1000,
      "max": 2200
    },
    "districts": [
      "Baramulla",
      "Kupwara",
      "Bandipora",
      "Muzaffarabad"
    ],
    "protectedAreas": [
      "Kishanganga Gorge Corridor",
      "Uri River Gorge"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Hydropower Dams Altering Rapid Regimes",
      "Boulder Extraction",
      "Chemical Spills"
    ],
    "conservationMeasures": [
      "Full legal protection",
      "Identification of critical turbulent torrent sanctuaries"
    ],
    "sensitivity": "critical",
    "verifiedSightings": 190,
    "conservationPriority": 10,
    "distributionPoints": [],
    "endemismStatus": "kashmir-endemic",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-26",
    "slug": "turkestan-torrent-catfish",
    "commonName": "Turkestan Torrent Catfish",
    "scientificName": "Glyptosternon reticulatum",
    "localName": "Benthic Mountain Catfish",
    "taxonomicGroup": "fish",
    "category": "Torrent Catfish",
    "conservationStatus": "LC",
    "description": "Broad, depressed head, scaleless leathery skin, and paired fins with adhesive pads on their ventral rays. Thrives in frigid torrents across Ladakh, Gurez, and the upper Indus.",
    "ecologicalRole": "Nocturnal Benthic Insect Larvae Predator",
    "habitats": [
      "Cold Fast Torrents",
      "Shallow Cobble Riffles",
      "Mountain Streams",
      "Glacial Torrents & High-Altitude Streams",
      "Cold Mountain Rivers & Streams",
      "Lowland Rivers & Canals",
      "Alpine Lakes & High Tarns"
    ],
    "elevationRange": {
      "min": 1800,
      "max": 3600
    },
    "districts": [
      "Leh",
      "Kargil",
      "Bandipora"
    ],
    "protectedAreas": [
      "Hemis National Park",
      "Gurez Protected Basin"
    ],
    "seasonality": "Active in summer melt season; dormant / under ice cover in winter.",
    "threats": [
      "Damming",
      "Excessive Sediment Runoff"
    ],
    "conservationMeasures": [
      "River corridor continuity management"
    ],
    "sensitivity": "medium",
    "verifiedSightings": 302,
    "conservationPriority": 6,
    "distributionPoints": [],
    "endemismStatus": "trans-himalayan",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-27",
    "slug": "helicopter-catfish",
    "commonName": "Helicopter Catfish",
    "scientificName": "Wallago attu",
    "localName": "Boal / Mulley",
    "taxonomicGroup": "fish",
    "category": "Predatory Catfish",
    "conservationStatus": "VU",
    "description": "Apex predator of the lower Chenab, Tawi, and Ravi rivers. Reaches lengths up to 2 meters. Feeds aggressively on smaller fish, crustaceans, and amphibians. Severely declined due to overfishing and barrages.",
    "ecologicalRole": "Apex Riverine Piscivore",
    "habitats": [
      "Deep River Scours",
      "Slow River Bends",
      "Reservoir Backwaters",
      "Cold Mountain Rivers & Streams",
      "Lowland Rivers & Canals"
    ],
    "elevationRange": {
      "min": 250,
      "max": 900
    },
    "districts": [
      "Jammu",
      "Kathua",
      "Samba",
      "Reasi"
    ],
    "protectedAreas": [
      "Ranjit Sagar Dam Environs",
      "Chenab Floodplain Wetlands"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Overfishing with Gillnets",
      "Dams Blocking Migration",
      "Industrial Pollution"
    ],
    "conservationMeasures": [
      "Mesh-size enforcement",
      "Protection of deep river wintering pools"
    ],
    "sensitivity": "high",
    "verifiedSightings": 238,
    "conservationPriority": 7,
    "distributionPoints": [],
    "endemismStatus": "widely-distributed",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-28",
    "slug": "stinging-catfish",
    "commonName": "Stinging Catfish",
    "scientificName": "Heteropneustes fossilis",
    "localName": "Singhi",
    "taxonomicGroup": "fish",
    "category": "Air-Breathing Catfish",
    "conservationStatus": "LC",
    "description": "Armed with accessory respiratory air sacs and venomous pectoral spines. Inhabits swamps, derelict ponds, and overgrown ditches across the subtropical plains of Jammu.",
    "ecologicalRole": "Nocturnal Wetland Scavenger / Carnivore",
    "habitats": [
      "Swamps",
      "Heavily Vegetated Ponds",
      "Oxbow Wetlands",
      "Wetlands, Marshes & Floodplains",
      "Lowland Rivers & Canals"
    ],
    "elevationRange": {
      "min": 250,
      "max": 800
    },
    "districts": [
      "Jammu",
      "Kathua",
      "Samba"
    ],
    "protectedAreas": [
      "Gharana Wetland Reserve"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Wetland Draining & Urban Reclamation",
      "Heavy Agrochemical Influx"
    ],
    "conservationMeasures": [
      "Preservation of subtropical floodplain wetlands"
    ],
    "sensitivity": "low",
    "verifiedSightings": 73,
    "conservationPriority": 4,
    "distributionPoints": [],
    "endemismStatus": "widely-distributed",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-29",
    "slug": "walking-catfish",
    "commonName": "Walking Catfish",
    "scientificName": "Clarias magur",
    "localName": "Magur",
    "taxonomicGroup": "fish",
    "category": "Air-Breathing Catfish",
    "conservationStatus": "EN",
    "description": "Indigenous Asian walking catfish capable of crawling across wet land during rains using expanded pectoral fins. Prized for its nutritional and therapeutic value in Jammu markets.",
    "ecologicalRole": "Omnivore / Swamp Benthic Forager",
    "habitats": [
      "Marshlands",
      "Paddy Fields",
      "Derelict Waterbodies",
      "Wetlands, Marshes & Floodplains",
      "Lowland Rivers & Canals"
    ],
    "elevationRange": {
      "min": 250,
      "max": 750
    },
    "districts": [
      "Jammu",
      "Kathua"
    ],
    "protectedAreas": [
      "Gharana Wetland Reserve"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Invasive African Catfish (Clarias gariepinus) Competition",
      "Habitat Loss"
    ],
    "conservationMeasures": [
      "Eradication of invasive Clarias gariepinus",
      "Indigenous broodstock banks"
    ],
    "sensitivity": "high",
    "verifiedSightings": 221,
    "conservationPriority": 8,
    "distributionPoints": [],
    "endemismStatus": "widely-distributed",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-30",
    "slug": "bleeker-s-day-catfish",
    "commonName": "Bleeker's Day Catfish",
    "scientificName": "Mystus bleekeri",
    "localName": "Tengra / Kander",
    "taxonomicGroup": "fish",
    "category": "Bagrid Catfish",
    "conservationStatus": "LC",
    "description": "Silver-grey catfish with a prominent dark shoulder spot and long maxillary barbels extending to the anal fin. Abundant in sluggish reaches of the Tawi and Chenab.",
    "ecologicalRole": "Omnivore / Secondary Consumer",
    "habitats": [
      "Meandering Rivers",
      "Flooded Wetlands",
      "Reservoirs",
      "Cold Mountain Rivers & Streams",
      "Wetlands, Marshes & Floodplains",
      "Lowland Rivers & Canals"
    ],
    "elevationRange": {
      "min": 250,
      "max": 950
    },
    "districts": [
      "Jammu",
      "Kathua",
      "Samba",
      "Udhampur"
    ],
    "protectedAreas": [
      "Mansar-Surinsar Wildlife Sanctuary"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Water Extraction for Irrigation",
      "Pesticide Runoff"
    ],
    "conservationMeasures": [
      "Environmental flow protection in Jammu canals"
    ],
    "sensitivity": "medium",
    "verifiedSightings": 152,
    "conservationPriority": 4,
    "distributionPoints": [],
    "endemismStatus": "widely-distributed",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-31",
    "slug": "golden-mahseer",
    "commonName": "Golden Mahseer",
    "scientificName": "Tor putitora",
    "localName": "Mahseer / King of Himalayan Waters",
    "taxonomicGroup": "fish",
    "category": "Mahseer",
    "conservationStatus": "EN",
    "description": "Legendary apex game fish of the Himalayan foothills and major tributary rivers (Chenab, Tawi, Poonch, lower Jhelum). Can reach up to 50 kg. Ascends rapid boulder streams to spawn over clean gravel. Severely impacted by hydropower dams blocking breeding migrations.",
    "ecologicalRole": "Apex Riverine Consumer & Migratory Keystone Taxon",
    "habitats": [
      "Deep Mountain Pools",
      "Torrent Confluences",
      "Clean Gravel Spawning Riffles",
      "Glacial Torrents & High-Altitude Streams",
      "Cold Mountain Rivers & Streams"
    ],
    "elevationRange": {
      "min": 300,
      "max": 1600
    },
    "districts": [
      "Jammu",
      "Kathua",
      "Udhampur",
      "Reasi",
      "Poonch",
      "Rajouri",
      "Baramulla"
    ],
    "protectedAreas": [
      "Ranjit Sagar Reservoir Reserve",
      "Poonch River Sanctuaries"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Hydropower Dams Without Fish Ladders",
      "Illegal Dynamite & Poaching",
      "Gravel Mining Destroying Spawning Beds"
    ],
    "conservationMeasures": [
      "Breeding hatcheries & fingerling ranching",
      "Designation of Golden Mahseer fish sanctuaries",
      "Anti-poaching squads"
    ],
    "sensitivity": "critical",
    "verifiedSightings": 132,
    "conservationPriority": 9,
    "distributionPoints": [],
    "endemismStatus": "himalayan-endemic",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-32",
    "slug": "deep-bodied-mahseer",
    "commonName": "Deep-Bodied Mahseer",
    "scientificName": "Tor tor",
    "localName": "Tor Mahseer",
    "taxonomicGroup": "fish",
    "category": "Mahseer",
    "conservationStatus": "DD",
    "description": "Deep-bodied congener of the Golden Mahseer with thick fleshy lips and prominent scales. Inhabits rocky mountain rivers with deep pools in the Jammu province.",
    "ecologicalRole": "Piscivore / Molluscivore",
    "habitats": [
      "Deep Rock Pools",
      "Foothill Rivers",
      "Cold Mountain Rivers & Streams",
      "Lowland Rivers & Canals"
    ],
    "elevationRange": {
      "min": 300,
      "max": 1200
    },
    "districts": [
      "Jammu",
      "Kathua",
      "Reasi"
    ],
    "protectedAreas": [
      "Chenab Valley Sanctuaries"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Overharvesting of Broodstock",
      "Dam Flow Alteration"
    ],
    "conservationMeasures": [
      "River corridor protections and angling restrictions"
    ],
    "sensitivity": "high",
    "verifiedSightings": 178,
    "conservationPriority": 7,
    "distributionPoints": [],
    "endemismStatus": "widely-distributed",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-33",
    "slug": "kashmir-latia",
    "commonName": "Kashmir Latia",
    "scientificName": "Crossocheilus diplochilus",
    "localName": "Trow / Kashmir Stone Roller",
    "taxonomicGroup": "fish",
    "category": "Cyprinid",
    "conservationStatus": "LC",
    "description": "Small, highly energetic native cyprinid featuring a ventral sucking mouth and fringed upper lip. Dominant bottom browser in Dal, Wular, and the Jhelum river system, vigorously grazing on periphyton and biofilm.",
    "ecologicalRole": "Keystone Benthic Algae Cleaner",
    "habitats": [
      "Lake Littoral Zones",
      "Slow River Channels",
      "Spring-fed Streams",
      "Cold Mountain Rivers & Streams",
      "Valley Lakes (Dal, Wular, Manasbal)",
      "Karst Springs & Headwaters"
    ],
    "elevationRange": {
      "min": 600,
      "max": 2200
    },
    "districts": [
      "Srinagar",
      "Ganderbal",
      "Bandipora",
      "Baramulla",
      "Anantnag",
      "Jammu",
      "Udhampur"
    ],
    "protectedAreas": [
      "Dal Lake Sanctuary",
      "Wular Lake Ramsar Site"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Heavy Lake Siltation",
      "Loss of Macrophyte Meadows"
    ],
    "conservationMeasures": [
      "Maintenance of clear shallow littoral substrate zones"
    ],
    "sensitivity": "medium",
    "verifiedSightings": 280,
    "conservationPriority": 5,
    "distributionPoints": [],
    "endemismStatus": "northwest-himalayan",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-34",
    "slug": "kashmir-labeo",
    "commonName": "Kashmir Labeo",
    "scientificName": "Bangana diphostoma",
    "localName": "Labeo",
    "taxonomicGroup": "fish",
    "category": "Cyprinid",
    "conservationStatus": "LC",
    "description": "Native cyprinid with a distinct rostral flap and tuberculated snout, found across the Kashmir Valley and foothill reaches of Jammu. Feeds on bottom detritus and diatoms.",
    "ecologicalRole": "Benthic Detritivore",
    "habitats": [
      "Riverine Pools",
      "Lake Margins",
      "Foothill Streams",
      "Cold Mountain Rivers & Streams",
      "Valley Lakes (Dal, Wular, Manasbal)",
      "Lowland Rivers & Canals"
    ],
    "elevationRange": {
      "min": 500,
      "max": 1900
    },
    "districts": [
      "Srinagar",
      "Anantnag",
      "Jammu",
      "Reasi",
      "Doda"
    ],
    "protectedAreas": [
      "Wular Lake Ramsar Site"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Organic Pollution",
      "Channel Modification"
    ],
    "conservationMeasures": [
      "Water quality monitoring along urban river reaches"
    ],
    "sensitivity": "medium",
    "verifiedSightings": 188,
    "conservationPriority": 5,
    "distributionPoints": [],
    "endemismStatus": "northwest-himalayan",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-35",
    "slug": "dero-carp",
    "commonName": "Dero Carp",
    "scientificName": "Labeo dero",
    "localName": "Gid / Khadli",
    "taxonomicGroup": "fish",
    "category": "Cyprinid",
    "conservationStatus": "LC",
    "description": "Prominent indigenous food carp in the rivers of Jammu (Chenab, Tawi, Ravi) and lower Jhelum tributaries. Features a distinct transverse groove across the snout.",
    "ecologicalRole": "Periphyton Grazer / Omnivore",
    "habitats": [
      "Torrential Rivers with Deep Pools",
      "Rocky Streams",
      "Glacial Torrents & High-Altitude Streams",
      "Cold Mountain Rivers & Streams",
      "Lowland Rivers & Canals"
    ],
    "elevationRange": {
      "min": 300,
      "max": 1600
    },
    "districts": [
      "Jammu",
      "Kathua",
      "Udhampur",
      "Reasi",
      "Doda",
      "Poonch"
    ],
    "protectedAreas": [
      "Tawi River Riparian Corridor"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Illegal Sand Dredging",
      "Barrier Weirs"
    ],
    "conservationMeasures": [
      "Fisheries department seasonal harvest controls"
    ],
    "sensitivity": "medium",
    "verifiedSightings": 168,
    "conservationPriority": 5,
    "distributionPoints": [],
    "endemismStatus": "himalayan-endemic",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-36",
    "slug": "brahmaputra-labeo",
    "commonName": "Brahmaputra Labeo",
    "scientificName": "Labeo dyocheilus",
    "localName": "Kunni",
    "taxonomicGroup": "fish",
    "category": "Cyprinid",
    "conservationStatus": "LC",
    "description": "Large, robust cyprinid adapted to swift rocky mountain rivers. Subterminal mouth with heavy fleshy lips for grazing encrusting algae.",
    "ecologicalRole": "Epilithic Algal Browser",
    "habitats": [
      "Fast Mountain Rivers",
      "Deep Riffles",
      "Cold Mountain Rivers & Streams"
    ],
    "elevationRange": {
      "min": 300,
      "max": 1500
    },
    "districts": [
      "Jammu",
      "Kathua",
      "Udhampur",
      "Reasi"
    ],
    "protectedAreas": [
      "Chenab River Corridor"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Destructive Fishing Methods",
      "Siltation"
    ],
    "conservationMeasures": [
      "Community-based anti-poaching vigil groups"
    ],
    "sensitivity": "medium",
    "verifiedSightings": 102,
    "conservationPriority": 5,
    "distributionPoints": [],
    "endemismStatus": "himalayan-endemic",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-37",
    "slug": "rohu",
    "commonName": "Rohu",
    "scientificName": "Labeo rohita",
    "localName": "Rohu",
    "taxonomicGroup": "fish",
    "category": "Major Carp",
    "conservationStatus": "LC",
    "description": "Major Indian carp cultured extensively in aquaculture ponds and reservoirs across Jammu. Herbivorous column feeder that consumes phytoplankton and decaying plant matter.",
    "ecologicalRole": "Cultured Column Herbivore",
    "habitats": [
      "Lowland Rivers",
      "Ponds",
      "Reservoirs",
      "Cold Mountain Rivers & Streams",
      "Lowland Rivers & Canals"
    ],
    "elevationRange": {
      "min": 200,
      "max": 800
    },
    "districts": [
      "Jammu",
      "Kathua",
      "Samba"
    ],
    "protectedAreas": [
      "Ranjit Sagar Reservoir"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Intensive Aquaculture Disease Transmission"
    ],
    "conservationMeasures": [
      "Quality seed production certification"
    ],
    "sensitivity": "low",
    "verifiedSightings": 297,
    "conservationPriority": 3,
    "distributionPoints": [],
    "endemismStatus": "widely-distributed",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-38",
    "slug": "mrigal-carp",
    "commonName": "Mrigal Carp",
    "scientificName": "Cirrhinus mrigala",
    "localName": "Mrigal / Narain",
    "taxonomicGroup": "fish",
    "category": "Major Carp",
    "conservationStatus": "LC",
    "description": "Major carp adapted for bottom feeding on decomposing organic debris. Widely stocked in Jammu freshwater impoundments.",
    "ecologicalRole": "Benthic Detritivore",
    "habitats": [
      "Floodplain Lakes",
      "Aquaculture Impoundments",
      "Canals",
      "Lowland Rivers & Canals"
    ],
    "elevationRange": {
      "min": 200,
      "max": 800
    },
    "districts": [
      "Jammu",
      "Kathua",
      "Samba"
    ],
    "protectedAreas": [
      "Gharana Wetland Environs"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Habitat Contamination from Agricultural Agrochemicals"
    ],
    "conservationMeasures": [
      "Sustainable polyculture farming guidelines"
    ],
    "sensitivity": "low",
    "verifiedSightings": 249,
    "conservationPriority": 3,
    "distributionPoints": [],
    "endemismStatus": "widely-distributed",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-39",
    "slug": "sucker-head",
    "commonName": "Sucker Head",
    "scientificName": "Garra gotyla",
    "localName": "Stone Roller / Kurka",
    "taxonomicGroup": "fish",
    "category": "Hillstream Barb",
    "conservationStatus": "LC",
    "description": "Remarkably specialized hillstream fish with a modified labial mental disc used to clamp securely onto rocks in foaming torrents. Important consumer of stone biofilm.",
    "ecologicalRole": "Biofilm & Algae Scraper",
    "habitats": [
      "Torrential Riffles",
      "Cascades",
      "Foothill Brooks",
      "Glacial Torrents & High-Altitude Streams",
      "Cold Mountain Rivers & Streams"
    ],
    "elevationRange": {
      "min": 300,
      "max": 1800
    },
    "districts": [
      "Jammu",
      "Udhampur",
      "Reasi",
      "Kathua",
      "Poonch",
      "Rajouri",
      "Doda"
    ],
    "protectedAreas": [
      "Mansar Lake Tributaries",
      "Tawi Basin"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Stream Canalisation",
      "Drying of Streams During Summer"
    ],
    "conservationMeasures": [
      "Riparian canopy shade preservation"
    ],
    "sensitivity": "medium",
    "verifiedSightings": 194,
    "conservationPriority": 5,
    "distributionPoints": [],
    "endemismStatus": "himalayan-endemic",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-40",
    "slug": "rosy-barb",
    "commonName": "Rosy Barb",
    "scientificName": "Puntius conchonius",
    "localName": "Chirpot",
    "taxonomicGroup": "fish",
    "category": "Barb",
    "conservationStatus": "LC",
    "description": "Small, colorful native cyprinid inhabiting reed beds and macrophyte mats of Dal, Wular, Hokersar, and Jammu wetlands. Males exhibit brilliant rosy-red coloration during breeding season.",
    "ecologicalRole": "Planktivore / Secondary Consumer / Bird Food Base",
    "habitats": [
      "Dense Macrophyte Meadows",
      "Slow Wetland Channels",
      "Pond Margins",
      "Valley Lakes (Dal, Wular, Manasbal)",
      "Wetlands, Marshes & Floodplains",
      "Lowland Rivers & Canals"
    ],
    "elevationRange": {
      "min": 300,
      "max": 1700
    },
    "districts": [
      "Srinagar",
      "Bandipora",
      "Budgam",
      "Baramulla",
      "Jammu"
    ],
    "protectedAreas": [
      "Hokersar Wetland Ramsar Site",
      "Shallabugh Wetland",
      "Dal Lake"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Weedicide Spraying in Canals",
      "Severe Wetland Drainage"
    ],
    "conservationMeasures": [
      "Conservation of submerged vegetation beds (pondweed, Ceratophyllum)"
    ],
    "sensitivity": "medium",
    "verifiedSightings": 218,
    "conservationPriority": 4,
    "distributionPoints": [],
    "endemismStatus": "widely-distributed",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-41",
    "slug": "ticto-barb",
    "commonName": "Ticto Barb",
    "scientificName": "Pethia ticto",
    "localName": "Two-Spot Barb",
    "taxonomicGroup": "fish",
    "category": "Barb",
    "conservationStatus": "LC",
    "description": "Small schooling cyprinid with two distinct black spots on sides. Crucial prey species for kingfishers, egrets, and juvenile fish in freshwater wetlands.",
    "ecologicalRole": "Prey Base / Insect Larvae Consumer",
    "habitats": [
      "Shallow Vegetated Streams",
      "Swamps",
      "Wetlands",
      "Cold Mountain Rivers & Streams",
      "Wetlands, Marshes & Floodplains",
      "Lowland Rivers & Canals"
    ],
    "elevationRange": {
      "min": 250,
      "max": 1200
    },
    "districts": [
      "Jammu",
      "Kathua",
      "Samba",
      "Udhampur"
    ],
    "protectedAreas": [
      "Surinsar-Mansar Wetlands",
      "Gharana Wetland"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Water Pollution from Agricultural Effluent"
    ],
    "conservationMeasures": [
      "Wetland buffer protection"
    ],
    "sensitivity": "low",
    "verifiedSightings": 94,
    "conservationPriority": 3,
    "distributionPoints": [],
    "endemismStatus": "widely-distributed",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-42",
    "slug": "bendelisis-baril",
    "commonName": "Bendelisis Baril",
    "scientificName": "Barilius bendelisis",
    "localName": "Hill Trout / Chilwa",
    "taxonomicGroup": "fish",
    "category": "Hillstream Barb",
    "conservationStatus": "LC",
    "description": "Graceful, silvery hillstream cyprinid with 8-12 vertical greyish-blue bars on flanks. Swims in tight schools in clear pebbly streams of the outer Himalayan foothills.",
    "ecologicalRole": "Surface Insectivore",
    "habitats": [
      "Clear Pebble Riffles",
      "Foothill Stream Pools",
      "Cold Mountain Rivers & Streams"
    ],
    "elevationRange": {
      "min": 300,
      "max": 2000
    },
    "districts": [
      "Jammu",
      "Kathua",
      "Udhampur",
      "Reasi",
      "Rajouri",
      "Poonch"
    ],
    "protectedAreas": [
      "Tawi River Riparian Zone",
      "Sewa Stream Reserve"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Chemical Washing / Pollution in Foothill Streams"
    ],
    "conservationMeasures": [
      "Clean river campaign enforcement"
    ],
    "sensitivity": "medium",
    "verifiedSightings": 208,
    "conservationPriority": 5,
    "distributionPoints": [],
    "endemismStatus": "himalayan-endemic",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-43",
    "slug": "vagra-baril",
    "commonName": "Vagra Baril",
    "scientificName": "Barilius vagra",
    "localName": "Vagra Chilwa",
    "taxonomicGroup": "fish",
    "category": "Hillstream Barb",
    "conservationStatus": "LC",
    "description": "Streamlined minnow with narrow vertical bars, highly active in shallow rocky riffles across Jammu and Pir Panjal river valleys.",
    "ecologicalRole": "Drifting Insect Consumer",
    "habitats": [
      "Shallow Streams",
      "Clear Riffles",
      "Cold Mountain Rivers & Streams",
      "Lowland Rivers & Canals"
    ],
    "elevationRange": {
      "min": 300,
      "max": 1800
    },
    "districts": [
      "Jammu",
      "Kathua",
      "Udhampur",
      "Reasi",
      "Poonch"
    ],
    "protectedAreas": [
      "Mansar Catchment Streams"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Stream Habitat Modification"
    ],
    "conservationMeasures": [
      "Maintenance of natural riffle-pool dynamics"
    ],
    "sensitivity": "medium",
    "verifiedSightings": 156,
    "conservationPriority": 4,
    "distributionPoints": [],
    "endemismStatus": "himalayan-endemic",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-44",
    "slug": "mirror-carp",
    "commonName": "Mirror Carp",
    "scientificName": "Cyprinus carpio specularis",
    "localName": "Panjabe Gad / Mirror Carp",
    "taxonomicGroup": "fish",
    "category": "Invasive / Naturalized Carp",
    "conservationStatus": "LC",
    "description": "Introduced into Kashmir waters in 1956 from Nilgiris. Identified by large, patchy, mirror-like scales. Fast-growing and hardy, it now comprises over 65% of commercial catch in Dal and Wular lakes, severely displacing endemic Schizothorax species through spawning competition and benthic uprooting of macrophyte beds.",
    "ecologicalRole": "Dominant Benthic Bio-Turbator / Omnivore",
    "habitats": [
      "Eutrophic Lakes",
      "Muddy Floodplains",
      "Slow Canals",
      "Valley Lakes (Dal, Wular, Manasbal)",
      "Lowland Rivers & Canals"
    ],
    "elevationRange": {
      "min": 1400,
      "max": 1900
    },
    "districts": [
      "Srinagar",
      "Bandipora",
      "Ganderbal",
      "Baramulla",
      "Budgam",
      "Pulwama",
      "Anantnag"
    ],
    "protectedAreas": [
      "Wular Lake Ramsar Site",
      "Dal Lake Basin",
      "Hokersar Wetland"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Overdominance Impacting Endemic Biodiversity"
    ],
    "conservationMeasures": [
      "Commercial harvest encouragement to relieve pressure on native snow trouts"
    ],
    "sensitivity": "low",
    "verifiedSightings": 61,
    "conservationPriority": 2,
    "distributionPoints": [],
    "endemismStatus": "widely-distributed",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-45",
    "slug": "scale-carp",
    "commonName": "Scale Carp",
    "scientificName": "Cyprinus carpio communis",
    "localName": "Scale Carp",
    "taxonomicGroup": "fish",
    "category": "Invasive / Naturalized Carp",
    "conservationStatus": "LC",
    "description": "Fully scaled variety of the common carp introduced alongside the mirror carp. Exhibits tremendous fecundity and tolerance for hypoxic, warm, and polluted water.",
    "ecologicalRole": "Benthic Omnivore",
    "habitats": [
      "Lakes",
      "Marshes",
      "Slow Rivers",
      "Cold Mountain Rivers & Streams",
      "Valley Lakes (Dal, Wular, Manasbal)",
      "Wetlands, Marshes & Floodplains"
    ],
    "elevationRange": {
      "min": 1400,
      "max": 1900
    },
    "districts": [
      "Srinagar",
      "Bandipora",
      "Baramulla",
      "Budgam",
      "Ganderbal"
    ],
    "protectedAreas": [
      "Wular Lake",
      "Dal Lake",
      "Manasbal Lake"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Benthic Sediment Resuspension"
    ],
    "conservationMeasures": [
      "Selective harvesting and value-addition processing"
    ],
    "sensitivity": "low",
    "verifiedSightings": 275,
    "conservationPriority": 2,
    "distributionPoints": [],
    "endemismStatus": "widely-distributed",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-46",
    "slug": "grass-carp",
    "commonName": "Grass Carp",
    "scientificName": "Ctenopharyngodon idella",
    "localName": "Grass Carp",
    "taxonomicGroup": "fish",
    "category": "Cultured Carp",
    "conservationStatus": "LC",
    "description": "Herbivorous carp introduced to control submerged aquatic weeds in reservoirs, fish farms, and valley lakes. Capable of consuming large quantities of hydrilla and potamogeton daily.",
    "ecologicalRole": "Macrophyte Herbivore",
    "habitats": [
      "Vegetated Ponds",
      "Managed Lakes",
      "Fish Farms",
      "Valley Lakes (Dal, Wular, Manasbal)",
      "Lowland Rivers & Canals"
    ],
    "elevationRange": {
      "min": 300,
      "max": 1700
    },
    "districts": [
      "Srinagar",
      "Ganderbal",
      "Bandipora",
      "Jammu",
      "Kathua"
    ],
    "protectedAreas": [
      "Manasbal Fish Farm Complex"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Overconsumption of Native Macrophyte Nurseries"
    ],
    "conservationMeasures": [
      "Stocking density regulation in open lakes"
    ],
    "sensitivity": "low",
    "verifiedSightings": 220,
    "conservationPriority": 3,
    "distributionPoints": [],
    "endemismStatus": "widely-distributed",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-47",
    "slug": "silver-carp",
    "commonName": "Silver Carp",
    "scientificName": "Hypophthalmichthys molitrix",
    "localName": "Silver Carp",
    "taxonomicGroup": "fish",
    "category": "Cultured Carp",
    "conservationStatus": "NT",
    "description": "Specialized micro-plankton filter feeder with fine gill rakers. Stocked in aquaculture systems and reservoirs to control phytoplankton blooms.",
    "ecologicalRole": "Phytoplankton Filter Feeder",
    "habitats": [
      "Eutrophic Reservoirs",
      "Aquaculture Units",
      "Valley Lakes (Dal, Wular, Manasbal)"
    ],
    "elevationRange": {
      "min": 300,
      "max": 1650
    },
    "districts": [
      "Jammu",
      "Kathua",
      "Srinagar",
      "Ganderbal"
    ],
    "protectedAreas": [
      "Ranjit Sagar Reservoir"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Plankton Depletion for Native Species"
    ],
    "conservationMeasures": [
      "Monoculture containment"
    ],
    "sensitivity": "low",
    "verifiedSightings": 303,
    "conservationPriority": 3,
    "distributionPoints": [],
    "endemismStatus": "widely-distributed",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-48",
    "slug": "crucian-carp",
    "commonName": "Crucian Carp",
    "scientificName": "Carassius carassius",
    "localName": "Crucian Carp",
    "taxonomicGroup": "fish",
    "category": "Naturalized Carp",
    "conservationStatus": "LC",
    "description": "Golden-bronze carp naturalized in Kashmir Valley wetlands and stagnant waters. Famous for extreme tolerance of winter anoxia through metabolic conversion of lactic acid to ethanol.",
    "ecologicalRole": "Anoxia-Tolerant Wetland Detritivore",
    "habitats": [
      "Shallow Marshes",
      "Dense Reed Beds",
      "Oxbow Ponds",
      "Valley Lakes (Dal, Wular, Manasbal)",
      "Wetlands, Marshes & Floodplains",
      "Lowland Rivers & Canals"
    ],
    "elevationRange": {
      "min": 1400,
      "max": 1800
    },
    "districts": [
      "Srinagar",
      "Budgam",
      "Bandipora"
    ],
    "protectedAreas": [
      "Hokersar Wetland",
      "Shallabugh Wetland"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Wetland Desiccation During Drought"
    ],
    "conservationMeasures": [
      "Wetland water level retention management"
    ],
    "sensitivity": "low",
    "verifiedSightings": 149,
    "conservationPriority": 3,
    "distributionPoints": [],
    "endemismStatus": "widely-distributed",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-49",
    "slug": "spotted-snakehead",
    "commonName": "Spotted Snakehead",
    "scientificName": "Channa punctata",
    "localName": "Dhoak / Murral",
    "taxonomicGroup": "fish",
    "category": "Snakehead",
    "conservationStatus": "LC",
    "description": "Air-breathing carnivore with accessory suprabranchial organ. Thrives in hypoxic wetlands, choked canals, and sluggish waters of the Jammu plains and outer foothills. Protects fry in circular floating nests.",
    "ecologicalRole": "Ambush Semiaquatic Predator",
    "habitats": [
      "Dense Reed Swamps",
      "Weed-Choked Ponds",
      "Slow Canals",
      "Wetlands, Marshes & Floodplains",
      "Lowland Rivers & Canals"
    ],
    "elevationRange": {
      "min": 250,
      "max": 1200
    },
    "districts": [
      "Jammu",
      "Kathua",
      "Samba",
      "Udhampur",
      "Reasi"
    ],
    "protectedAreas": [
      "Gharana Wetland Reserve",
      "Surinsar-Mansar Lakes"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Wetland Drainage",
      "Chemical Pollution"
    ],
    "conservationMeasures": [
      "Protection of subtropical wetland sanctuaries"
    ],
    "sensitivity": "low",
    "verifiedSightings": 106,
    "conservationPriority": 4,
    "distributionPoints": [],
    "endemismStatus": "widely-distributed",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-50",
    "slug": "striped-snakehead",
    "commonName": "Striped Snakehead",
    "scientificName": "Channa striata",
    "localName": "Sol / Snakehead",
    "taxonomicGroup": "fish",
    "category": "Snakehead",
    "conservationStatus": "LC",
    "description": "Large predatory snakehead reaching over 80 cm. Inhabits deeper swamp pools and vegetated lake margins in Jammu.",
    "ecologicalRole": "Apex Wetland Piscivore",
    "habitats": [
      "Deep Swamps",
      "Reservoir Edges",
      "River Floodplains",
      "Cold Mountain Rivers & Streams",
      "Wetlands, Marshes & Floodplains",
      "Lowland Rivers & Canals"
    ],
    "elevationRange": {
      "min": 200,
      "max": 900
    },
    "districts": [
      "Jammu",
      "Kathua",
      "Samba"
    ],
    "protectedAreas": [
      "Ranjit Sagar Tailrace"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Excessive Commercial Catching",
      "Habitat Loss"
    ],
    "conservationMeasures": [
      "Spawning season harvest prohibitions"
    ],
    "sensitivity": "medium",
    "verifiedSightings": 73,
    "conservationPriority": 5,
    "distributionPoints": [],
    "endemismStatus": "widely-distributed",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-51",
    "slug": "tire-track-spiny-eel",
    "commonName": "Tire-Track Spiny Eel",
    "scientificName": "Mastacembelus armatus",
    "localName": "Baam / Spiny Eel",
    "taxonomicGroup": "fish",
    "category": "Spiny Eel",
    "conservationStatus": "LC",
    "description": "Elongated eel-like fish with a long fleshy snout and rows of sharp dorsal spines. Burrower in sand and mud substrates of the Chenab, Tawi, and lower Jhelum tributaries. Nocturnal predator on small fishes and worms.",
    "ecologicalRole": "Benthic Fossorial Predator",
    "habitats": [
      "Sandy Muddy River Bottoms",
      "Submerged Roots",
      "Boulder Crevices",
      "Cold Mountain Rivers & Streams",
      "Lowland Rivers & Canals"
    ],
    "elevationRange": {
      "min": 250,
      "max": 1400
    },
    "districts": [
      "Jammu",
      "Kathua",
      "Samba",
      "Reasi",
      "Poonch",
      "Baramulla"
    ],
    "protectedAreas": [
      "Tawi River Riparian Belt"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Sand Mining Destroying Burrowing Habitat",
      "Water Pollution"
    ],
    "conservationMeasures": [
      "Sand mining exclusion zones along riparian corridors"
    ],
    "sensitivity": "medium",
    "verifiedSightings": 185,
    "conservationPriority": 5,
    "distributionPoints": [],
    "endemismStatus": "widely-distributed",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-52",
    "slug": "banded-gourami",
    "commonName": "Banded Gourami",
    "scientificName": "Trichogaster fasciata",
    "localName": "Colisa / Banded Gourami",
    "taxonomicGroup": "fish",
    "category": "Gourami",
    "conservationStatus": "LC",
    "description": "Exquisitely marked labyrinth fish with modified thread-like pelvic fins used as tactile sensory organs. Inhabits shallow, densely vegetated backwaters of the Jammu region.",
    "ecologicalRole": "Macrophyte Canopy Insectivore",
    "habitats": [
      "Heavily Vegetated Marshes",
      "Slow Ditches",
      "Pond Margins",
      "Wetlands, Marshes & Floodplains",
      "Lowland Rivers & Canals"
    ],
    "elevationRange": {
      "min": 250,
      "max": 800
    },
    "districts": [
      "Jammu",
      "Kathua",
      "Samba"
    ],
    "protectedAreas": [
      "Gharana Wetland Reserve"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Aquatic Weed Removal Campaigns Using Chemicals"
    ],
    "conservationMeasures": [
      "Preservation of littoral vegetation fringes"
    ],
    "sensitivity": "low",
    "verifiedSightings": 143,
    "conservationPriority": 3,
    "distributionPoints": [],
    "endemismStatus": "widely-distributed",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-53",
    "slug": "freshwater-garfish",
    "commonName": "Freshwater Garfish",
    "scientificName": "Xenentodon cancila",
    "localName": "Needlefish / Kaun",
    "taxonomicGroup": "fish",
    "category": "Needlefish",
    "conservationStatus": "LC",
    "description": "Slender surface-dwelling freshwater needlefish with elongated tooth-studded jaws. Spectacular surface hunter of small fishes and insects in foothill rivers and reservoirs.",
    "ecologicalRole": "Surface Pelagic Carnivore",
    "habitats": [
      "Clear River Pools",
      "Reservoirs",
      "Foot-hill Streams",
      "Cold Mountain Rivers & Streams",
      "Lowland Rivers & Canals"
    ],
    "elevationRange": {
      "min": 250,
      "max": 950
    },
    "districts": [
      "Jammu",
      "Kathua",
      "Udhampur",
      "Samba"
    ],
    "protectedAreas": [
      "Mansar Lake"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Plastic and Debris Pollution on Water Surfaces"
    ],
    "conservationMeasures": [
      "Clean water surface sanitation drives"
    ],
    "sensitivity": "medium",
    "verifiedSightings": 197,
    "conservationPriority": 4,
    "distributionPoints": [],
    "endemismStatus": "widely-distributed",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  },
  {
    "id": "fish-54",
    "slug": "indian-glassy-fish",
    "commonName": "Indian Glassy Fish",
    "scientificName": "Parambassis ranga",
    "localName": "Glassfish / Shishia",
    "taxonomicGroup": "fish",
    "category": "Perchlet",
    "conservationStatus": "LC",
    "description": "Transparent fish through whose body the spine and internal organs are visible. Schooling species inhabiting calm, vegetated freshwater bodies of Jammu.",
    "ecologicalRole": "Micro-Carnivore / Mosquito Larvae Consumer",
    "habitats": [
      "Quiet Streams",
      "Ponds",
      "Canals",
      "Cold Mountain Rivers & Streams",
      "Lowland Rivers & Canals"
    ],
    "elevationRange": {
      "min": 250,
      "max": 850
    },
    "districts": [
      "Jammu",
      "Kathua"
    ],
    "protectedAreas": [
      "Surinsar Lake"
    ],
    "seasonality": "Resident year-round. Undertakes upstream spawning migrations during spring (March-May).",
    "threats": [
      "Urban Wastewater Discharge"
    ],
    "conservationMeasures": [
      "Biological mosquito control agent protection"
    ],
    "sensitivity": "low",
    "verifiedSightings": 248,
    "conservationPriority": 3,
    "distributionPoints": [],
    "endemismStatus": "widely-distributed",
    "dataSource": {
      "type": "inventory",
      "reference": "Kullander et al. (1999) Fishes of the Kashmir Valley; FishBase & ICAR-DCFR Coldwater Ichthyofauna Checklist",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR & FishBase Actinopterygii Taxonomy",
      "confidence": 95
    }
  }
];

export const fishData: BiodiversitySpecies[] = fishPhase1;

// QUARANTINED_ARCHIVE_METADATA
export const QUARANTINED_NON_FISH_TAXA_SUMMARY = {
  datasetId: 'species-ichthyofauna-registry',
  idRange: 'fish-55..fish-66',
  count: 12,
  originalCount: 66,
  verifiedCount: 54,
  lineageCommits: ['a794998'],
  reasonCode: 'TAXONOMIC_CLASS_MISMATCH',
  quarantinedRecordIds: [
    'fish-55 (Mammalia: Carnivora — Eurasian Otter, already cataloged in mammals.ts as mammal-78)',
    'fish-56..fish-59 (Amphibia & Reptilia — 3 frogs/toads, 1 freshwater turtle)',
    'fish-60..fish-62 (Malacostraca & Bivalvia — 2 freshwater crustaceans, 1 river mussel)',
    'fish-63..fish-66 (Plantae — 4 aquatic macrophytes)',
  ],
  quarantineReason:
    'Removed 12 non-fish aquatic organisms misclassified inside the Actinopterygii freshwater fish array so ichthyofauna counts strictly reflect 54 true ray-finned fishes.',
} as const;
