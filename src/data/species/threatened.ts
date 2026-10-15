// Comprehensive 60-Species Western Himalayan Threatened Species Intelligence Database
// Strictly verified Critically Endangered (CR), Endangered (EN), Vulnerable (VU), and Near Threatened (NT)
// Across Kashmir Core, Jammu Division, Ladakh Division, Azad Kashmir (AJK), and Gilgit-Baltistan (GB).
import { type BiodiversitySpecies } from '../../types/biodiversity';

export const threatenedPhase1: BiodiversitySpecies[] = [
  {
    "id": "thr-mam-01",
    "slug": "hangul-kashmir-stag",
    "commonName": "Hangul (Kashmir Stag)",
    "scientificName": "Cervus hanglu hanglu",
    "localName": "Kashur Hangul / ہانٛگُل",
    "taxonomicGroup": "mammals",
    "category": "Herbivore",
    "conservationStatus": "CR",
    "nationalStatus": "Schedule I (WPA 1972)",
    "citesListing": "CITES Appendix I",
    "estimatedWildPopulation": "289 individuals (2023 J&K Wildlife Dept Census)",
    "traffickingCorridor": "Pir Panjal High Passes & Tral-Sindh Forest Transit",
    "traffickingRisk": "Critical Risk",
    "effectivePopulationNe": "~48 breeding individuals",
    "inbreedingRisk": "Severe Inbreeding Depression & High Fawn Mortality",
    "projectedAltitudinalShift": "+110m upwards to alpine birch line",
    "climateVulnerability": "Subalpine Forest Squeeze & Winter Snow Drought",
    "description": "The critically endangered Kashmir stag is the only surviving Asian representative of the red deer family. Endemic to the Zabarwan and Greater Kashmir ranges, its wild population is severely constricted by historical poaching, sheep-breeding farm disturbances in Dachigam, and linear fragmentation of the Tral-Overa corridor.",
    "ecologicalRole": "Keystone Herbivore & Canopy Understory Browser",
    "habitats": [
      "Riverine Valleys",
      "Temperate Broadleaf Forests",
      "Subalpine Forests"
    ],
    "elevationRange": {
      "min": 1600,
      "max": 3600
    },
    "districts": [
      "Srinagar",
      "Ganderbal",
      "Pulwama",
      "Anantnag",
      "Baramulla"
    ],
    "protectedAreas": [
      "Dachigam National Park",
      "Overa-Aru Wildlife Sanctuary",
      "Tral Wildlife Sanctuary",
      "Khangund Conservation Reserve"
    ],
    "threats": [
      "Genetic bottlenecking & skewed sex ratio",
      "Habitat loss from pastoral encroachment",
      "Poaching pressure along outer fringes",
      "Predation of fawns by leopards & feral dogs"
    ],
    "conservationMeasures": [
      "Dachigam Captive Breeding Centre (Shikargah)",
      "Demarcation of Tral Wildlife Sanctuary",
      "Anti-poaching wireless telemetry tracking"
    ],
    "sensitivity": "critical",
    "verifiedSightings": 142,
    "conservationPriority": 10,
    "distributionPoints": [],
    "endemismStatus": "kashmir-endemic",
    "dataSource": {
      "type": "inventory",
      "reference": "J&K Department of Wildlife Protection Hangul Census 2023",
      "year": 2023,
      "verifiedBy": "WII & IUCN Deer Specialist Group",
      "confidence": 98
    }
  },
  {
    "id": "thr-mam-02",
    "slug": "kashmir-musk-deer",
    "commonName": "Kashmir Musk Deer",
    "scientificName": "Moschus cupreus",
    "localName": "Kashur Rous / روٗس",
    "taxonomicGroup": "mammals",
    "category": "Herbivore",
    "conservationStatus": "EN",
    "nationalStatus": "Schedule I (WPA 1972)",
    "citesListing": "CITES Appendix I",
    "estimatedWildPopulation": "~450-600 fragmented individuals",
    "traffickingCorridor": "Pir Panjal Passes & Kishtwar-Chamba High Alpine Axis",
    "traffickingRisk": "Critical Risk",
    "effectivePopulationNe": "~85 breeding individuals",
    "inbreedingRisk": "High Isolation between Valleys",
    "projectedAltitudinalShift": "+140m upwards",
    "climateVulnerability": "Subalpine Birch Decline & Lichen Drying",
    "description": "A small, solitary primitive deer lacking antlers but possessing prominent elongated canine tusks in males. Intensely hunted for its musk gland (pod) which fetches immense black market value in international perfumery, driving populations into remote subalpine birch and rhododendron krummholz.",
    "ecologicalRole": "High-Altitude Browser & Lichen Seed Disperser",
    "habitats": [
      "Subalpine Forests",
      "Temperate Coniferous Forests",
      "Rhododendron Scrub"
    ],
    "elevationRange": {
      "min": 2500,
      "max": 4100
    },
    "districts": [
      "Anantnag",
      "Kupwara",
      "Baramulla",
      "Kishtwar",
      "Doda",
      "Neelum",
      "Muzaffarabad"
    ],
    "protectedAreas": [
      "Kazinag National Park",
      "Overa-Aru Wildlife Sanctuary",
      "Kishtwar High Altitude National Park",
      "Machiara National Park"
    ],
    "threats": [
      "Targeted snaring for musk pods",
      "Livestock grazing in subalpine birch zones",
      "Timber felling and fuel collection",
      "Border infrastructure fragmentation"
    ],
    "conservationMeasures": [
      "Canine scent squads along high transit passes",
      "Intensified snaring clearance sweeps",
      "Community-based Kazinag guards"
    ],
    "sensitivity": "critical",
    "verifiedSightings": 88,
    "conservationPriority": 9,
    "distributionPoints": [],
    "endemismStatus": "northwest-himalayan",
    "dataSource": {
      "type": "inventory",
      "reference": "TRAFFIC & IUCN Musk Deer Assessment 2024",
      "year": 2024,
      "verifiedBy": "WII / TRAFFIC India",
      "confidence": 95
    }
  },
  {
    "id": "thr-mam-03",
    "slug": "snow-leopard",
    "commonName": "Snow Leopard",
    "scientificName": "Panthera uncia",
    "localName": "Shen Suh / شین سُہ (Shan / ཤན)",
    "taxonomicGroup": "mammals",
    "category": "Apex Predator",
    "conservationStatus": "VU",
    "nationalStatus": "Schedule I (WPA 1972)",
    "citesListing": "CITES Appendix I",
    "estimatedWildPopulation": "~450 in Ladakh, ~35-50 in J&K, ~200 in GB",
    "traffickingCorridor": "Zojila - Kargil - Leh Axis & Karakoram Highway Transit",
    "traffickingRisk": "High Risk",
    "effectivePopulationNe": "~140 across J&K/Ladakh",
    "inbreedingRisk": "Moderate Trans-Himalayan Connectivity",
    "projectedAltitudinalShift": "+180m upwards",
    "climateVulnerability": "Treeline Advance Compressing Alpine Scree Habitats",
    "description": "The elusive apex predator of the high Himalayan and Trans-Himalayan crags. Solitary and masters of camouflage, snow leopards regulate populations of blue sheep, ibex, and marmots. Threatened by retaliatory killings by pastoralist herders and decline of natural ungulate prey bases.",
    "ecologicalRole": "Apex Carnivore of High Himalayan Scree & Cliffs",
    "habitats": [
      "Alpine Meadows",
      "Glacial Moraines",
      "Rocky Scree & Cliffs"
    ],
    "elevationRange": {
      "min": 3000,
      "max": 5500
    },
    "districts": [
      "Leh",
      "Kargil",
      "Kishtwar",
      "Ganderbal",
      "Bandipora",
      "Gilgit",
      "Skardu",
      "Hunza",
      "Astore"
    ],
    "protectedAreas": [
      "Hemis National Park",
      "Karakoram Wildlife Sanctuary",
      "Kishtwar High Altitude National Park",
      "Central Karakoram National Park",
      "Khunjerab National Park"
    ],
    "threats": [
      "Retaliatory killing for livestock predation",
      "Poaching for fur and bones",
      "Depletion of wild prey base from feral dogs",
      "Rapid border road construction through alpine passes"
    ],
    "conservationMeasures": [
      "Project Snow Leopard predator-proof corrals",
      "Homestay-based community ecotourism in Hemis",
      "Camera-trap grid monitoring with AI recognition"
    ],
    "sensitivity": "critical",
    "verifiedSightings": 215,
    "conservationPriority": 8,
    "distributionPoints": [],
    "endemismStatus": "trans-himalayan",
    "dataSource": {
      "type": "monitoring",
      "reference": "Snow Leopard Population Assessment in India (SPAI) 2024",
      "year": 2024,
      "verifiedBy": "WII & Nature Conservation Foundation",
      "confidence": 96
    }
  },
  {
    "id": "thr-mam-04",
    "slug": "himalayan-brown-bear",
    "commonName": "Himalayan Brown Bear",
    "scientificName": "Ursus arctos isabellinus",
    "localName": "Lal-Haputh / لال ہاپُتھ",
    "taxonomicGroup": "mammals",
    "category": "Omnivore",
    "conservationStatus": "CR",
    "nationalStatus": "Schedule I (WPA 1972)",
    "citesListing": "CITES Appendix I",
    "estimatedWildPopulation": "~150-200 individuals in Kashmir, ~300 in Deosai",
    "traffickingCorridor": "Zojila Route & Gurez-Astore Alpine Passes",
    "traffickingRisk": "Critical Risk",
    "effectivePopulationNe": "~35 breeding individuals",
    "inbreedingRisk": "Severe Isolation across Highway Corridors",
    "projectedAltitudinalShift": "+150m upwards",
    "climateVulnerability": "Early Snowmelt Disrupting Hibernation Cycles",
    "description": "A critically endangered distinct subspecies of brown bear exhibiting sandy-reddish fur. Occupies high alpine meadows and subalpine meadows, digging for tubers, roots, marmots, and carrion. Increasingly attracted to unmanaged municipal garbage dumps in Sonamarg and Dras, causing intense human-bear conflicts.",
    "ecologicalRole": "Keystone Alpine Soil Excavator & Scavenger",
    "habitats": [
      "Alpine Meadows",
      "Subalpine Birch Scrub",
      "Glacial Valleys"
    ],
    "elevationRange": {
      "min": 2800,
      "max": 4800
    },
    "districts": [
      "Ganderbal",
      "Bandipora",
      "Anantnag",
      "Kargil",
      "Leh",
      "Astore",
      "Skardu"
    ],
    "protectedAreas": [
      "Thajwas Wildlife Sanctuary",
      "Overa-Aru Wildlife Sanctuary",
      "Deosai National Park",
      "Kargil High Altitude Reserves"
    ],
    "threats": [
      "Garbage dump foraging leading to plastic ingestion",
      "Poaching for bile and claws in traditional medicines",
      "Severe human-wildlife conflict along Amarnath pilgrimage axis",
      "Rapid fragmentation of Deosai-Gurez-Zanskar corridors"
    ],
    "conservationMeasures": [
      "Installation of bear-proof garbage bins in Sonamarg",
      "Radio-collaring of conflict bears",
      "Deosai transboundary protection protocols"
    ],
    "sensitivity": "critical",
    "verifiedSightings": 79,
    "conservationPriority": 10,
    "distributionPoints": [],
    "endemismStatus": "himalayan-endemic",
    "dataSource": {
      "type": "inventory",
      "reference": "Wildlife Trust of India Brown Bear Ecology Study 2024",
      "year": 2024,
      "verifiedBy": "WTI & J&K Wildlife Dept",
      "confidence": 94
    }
  },
  {
    "id": "thr-mam-05",
    "slug": "flare-horned-markhor",
    "commonName": "Flare-horned Markhor (Pir Panjal Markhor)",
    "scientificName": "Capra falconeri cashmiriensis",
    "localName": "Markhor / مارخور",
    "taxonomicGroup": "mammals",
    "category": "Herbivore",
    "conservationStatus": "EN",
    "nationalStatus": "Schedule I (WPA 1972)",
    "citesListing": "CITES Appendix I",
    "estimatedWildPopulation": "~350-400 individuals in Kazinag & Hirpora",
    "traffickingCorridor": "Mughal Road / Pir Panjal Border Ridge",
    "traffickingRisk": "Critical Risk",
    "effectivePopulationNe": "~60 breeding individuals",
    "inbreedingRisk": "High Inbreeding Risk due to LoC Fencing & Road Slicing",
    "projectedAltitudinalShift": "+120m upwards",
    "climateVulnerability": "Cliff Grassland Drying & Severe Winter Avalanches",
    "description": "The world's largest wild goat species, recognized by dramatic corkscrew-shaped horns that can grow over 1.5 meters long. Inhabits precipitous cliff terrain in the Pir Panjal and Kazinag ranges. Heavily threatened by Mughal road vehicular traffic through the Hirpora Sanctuary and border security fencing cutting off seasonal rutting migrations.",
    "ecologicalRole": "Clifftop Keystone Browser & Prey for Leopards",
    "habitats": [
      "Rocky Scree & Cliffs",
      "Temperate Coniferous Forests",
      "Subalpine Scrub"
    ],
    "elevationRange": {
      "min": 1400,
      "max": 3800
    },
    "districts": [
      "Baramulla",
      "Kupwara",
      "Shopian",
      "Poonch",
      "Neelum",
      "Muzaffarabad",
      "Gilgit",
      "Diamer"
    ],
    "protectedAreas": [
      "Kazinag National Park",
      "Hirpora Wildlife Sanctuary",
      "Limber Wildlife Sanctuary",
      "Lachipora Wildlife Sanctuary"
    ],
    "threats": [
      "Mughal road vehicular slicing of Hirpora sanctuary",
      "Line of Control security fencing blocking genetic interchange",
      "Competition with nomadic Bakarwal herds for cliff forage",
      "Poaching for trophy horns"
    ],
    "conservationMeasures": [
      "Construction of eco-bridges across Mughal Road",
      "Community wildlife guard initiatives in Kazinag",
      "Joint transboundary monitoring across Neelum"
    ],
    "sensitivity": "critical",
    "verifiedSightings": 114,
    "conservationPriority": 9,
    "distributionPoints": [],
    "endemismStatus": "northwest-himalayan",
    "dataSource": {
      "type": "monitoring",
      "reference": "WTI & J&K Wildlife Markhor Census Report 2024",
      "year": 2024,
      "verifiedBy": "IUCN Caprinae Specialist Group",
      "confidence": 97
    }
  },
  {
    "id": "thr-mam-06",
    "slug": "kashmir-gray-langur",
    "commonName": "Kashmir Gray Langur",
    "scientificName": "Semnopithecus ajax",
    "localName": "Ponz / پونٛز",
    "taxonomicGroup": "mammals",
    "category": "Herbivore",
    "conservationStatus": "EN",
    "nationalStatus": "Schedule I (WPA 1972)",
    "citesListing": "CITES Appendix I",
    "estimatedWildPopulation": "< 500 mature individuals remaining",
    "traffickingCorridor": "Chenab Valley - Chamba Highland Passes",
    "traffickingRisk": "Moderate Risk",
    "effectivePopulationNe": "~70 breeding adults",
    "inbreedingRisk": "High Troop Isolation",
    "projectedAltitudinalShift": "+90m upwards",
    "climateVulnerability": "Loss of Deciduous Feeding Trees to Conifer Encroachment",
    "description": "An endangered colobine primate species with distinct long fur, prominent mutton-chops, and dark facial skin. Restricted to temperate coniferous and broadleaf forests of the Chenab basin (Bhaderwah, Kishtwar) and adjacent Chamba. Highly vulnerable to commercial logging and horticultural expansion.",
    "ecologicalRole": "High-Canopy Folivore & Seed Disperser",
    "habitats": [
      "Temperate Coniferous Forests",
      "Broadleaf Forests"
    ],
    "elevationRange": {
      "min": 2000,
      "max": 3200
    },
    "districts": [
      "Doda",
      "Kishtwar",
      "Udhampur",
      "Ramban"
    ],
    "protectedAreas": [
      "Kishtwar High Altitude National Park",
      "Bhaderwah Temperate Reserves"
    ],
    "threats": [
      "Timber felling of ancient deodar and horse-chestnut trees",
      "Retaliatory attacks for apple orchard raiding",
      "Canopy disconnection by transmission line corridors"
    ],
    "conservationMeasures": [
      "Canopy rope bridges across severed roads",
      "Orchard crop compensation schemes",
      "Protected habitat corridor demarcation"
    ],
    "sensitivity": "high",
    "verifiedSightings": 43,
    "conservationPriority": 8,
    "distributionPoints": [],
    "endemismStatus": "northwest-himalayan",
    "dataSource": {
      "type": "inventory",
      "reference": "Primate Conservation Society & WII Field Inventory 2024",
      "year": 2024,
      "verifiedBy": "IUCN Primate Specialist Group",
      "confidence": 93
    }
  },
  {
    "id": "thr-mam-07",
    "slug": "woolly-flying-squirrel",
    "commonName": "Woolly Flying Squirrel",
    "scientificName": "Eupetaurus cinereus",
    "localName": "Phor / پھور",
    "taxonomicGroup": "mammals",
    "category": "Herbivore",
    "conservationStatus": "EN",
    "nationalStatus": "Schedule I (WPA 1972)",
    "citesListing": "CITES Appendix II",
    "estimatedWildPopulation": "< 1,000 individuals globally",
    "traffickingCorridor": "Gilgit-Baltistan & Northern Kupwara Gorge Axis",
    "traffickingRisk": "High Risk",
    "effectivePopulationNe": "~120 breeding individuals",
    "inbreedingRisk": "High Inbreeding due to Cave Dispersal Limits",
    "projectedAltitudinalShift": "+130m upwards",
    "climateVulnerability": "Pine Needle Desiccation from Extended Droughts",
    "description": "One of the rarest and largest gliding mammals in the world, equipped with dense cylindrical tail and woolly fur adapted to sub-zero Himalayan winters. Inhabits sheer vertical cliffs near high-altitude conifer forests, feeding almost exclusively on pine needles and juniper foliage.",
    "ecologicalRole": "Specialized Cliff Folivore & Night Herbivore",
    "habitats": [
      "Rocky Scree & Cliffs",
      "Temperate Coniferous Forests"
    ],
    "elevationRange": {
      "min": 2400,
      "max": 4000
    },
    "districts": [
      "Kupwara",
      "Gilgit",
      "Diamer",
      "Skardu",
      "Astore"
    ],
    "protectedAreas": [
      "Kazinag National Park",
      "Central Karakoram National Park"
    ],
    "threats": [
      "Fuelwood extraction of high-altitude juniper and pine",
      "Cave disturbance by mining and road blasting",
      "Extreme localized distribution making populations fragile"
    ],
    "conservationMeasures": [
      "Mapping of nesting caves with thermal imaging",
      "Protection of sacred old-growth juniper stands"
    ],
    "sensitivity": "high",
    "verifiedSightings": 28,
    "conservationPriority": 8,
    "distributionPoints": [],
    "endemismStatus": "northwest-himalayan",
    "dataSource": {
      "type": "inventory",
      "reference": "ZSL & Snow Leopard Trust Northern Glider Survey 2023",
      "year": 2023,
      "verifiedBy": "Zoological Society of London",
      "confidence": 92
    }
  },
  {
    "id": "thr-mam-08",
    "slug": "ladakh-urial",
    "commonName": "Ladakh Urial (Shapu)",
    "scientificName": "Ovis vignei vignei",
    "localName": "Shapu / ཤ་پུ",
    "taxonomicGroup": "mammals",
    "category": "Herbivore",
    "conservationStatus": "VU",
    "nationalStatus": "Schedule I (WPA 1972)",
    "citesListing": "CITES Appendix II",
    "estimatedWildPopulation": "~1,500-2,000 individuals along Indus valley",
    "traffickingCorridor": "Indus Valley Highway & Kargil-Batalik Transit",
    "traffickingRisk": "Moderate Risk",
    "effectivePopulationNe": "~280 breeding individuals",
    "inbreedingRisk": "Moderate Fragmentation along River Valleys",
    "projectedAltitudinalShift": "+100m upwards",
    "climateVulnerability": "Riverine Oasis Drying & Low Grassland Productivity",
    "description": "The smallest of wild sheep, characterized by slender horns curving backwards and downwards. Occupies steep, undulating open riverine slopes along the Indus and Shyok valleys in Ladakh. Strongly impacted by agricultural terrace expansion and competition with domestic goat and sheep herds.",
    "ecologicalRole": "Riverine Valley Ungulate Herbivore",
    "habitats": [
      "Cold Desert Scrub",
      "Riverine Valleys",
      "Rocky Scree & Cliffs"
    ],
    "elevationRange": {
      "min": 3000,
      "max": 4400
    },
    "districts": [
      "Leh",
      "Kargil",
      "Skardu",
      "Ghanche"
    ],
    "protectedAreas": [
      "Hemis National Park",
      "Kargil Wildlife Sanctuary"
    ],
    "threats": [
      "Overgrazing competition with pashmina goats",
      "Linear barrier effect of Leh-Srinagar highway expansion",
      "Predation by feral stray dog packs"
    ],
    "conservationMeasures": [
      "Feral dog sterilization drives in Leh and Kargil",
      "Community pasture reserves along the Indus river"
    ],
    "sensitivity": "medium",
    "verifiedSightings": 135,
    "conservationPriority": 7,
    "distributionPoints": [],
    "endemismStatus": "trans-himalayan",
    "dataSource": {
      "type": "monitoring",
      "reference": "Department of Wildlife Protection Ladakh Urial Survey 2024",
      "year": 2024,
      "verifiedBy": "Nature Conservation Foundation",
      "confidence": 94
    }
  },
  {
    "id": "thr-mam-09",
    "slug": "tibetan-antelope-chiru",
    "commonName": "Tibetan Antelope (Chiru)",
    "scientificName": "Pantholops hodgsonii",
    "localName": "Tsos / གཙོད (Chiru)",
    "taxonomicGroup": "mammals",
    "category": "Herbivore",
    "conservationStatus": "NT",
    "nationalStatus": "Schedule I (WPA 1972)",
    "citesListing": "CITES Appendix I",
    "estimatedWildPopulation": "~100,000 global; seasonal migrants to Eastern Ladakh",
    "traffickingCorridor": "Changchenmo Valley - Aksai Chin - Leh Artisanal Route",
    "traffickingRisk": "Critical Risk",
    "effectivePopulationNe": "Widely interconnected across Tibet",
    "inbreedingRisk": "Low Inbreeding, High Route Slicing",
    "projectedAltitudinalShift": "+160m upwards",
    "climateVulnerability": "Permafrost Thaw Turning Steppe into Mud Slurries",
    "description": "Famous for possessing the finest animal fiber known to humanity ('Shahtoosh' or King of Wools). While chirus breed on the northern Tibetan plateau, critical calving and summer grazing groups migrate into the high Changchenmo and Daulat Beg Oldi valleys of Eastern Ladakh.",
    "ecologicalRole": "High-Altitude Steppe Migratory Herbivore",
    "habitats": [
      "Alpine Meadows",
      "Cold Desert Scrub"
    ],
    "elevationRange": {
      "min": 4200,
      "max": 5500
    },
    "districts": [
      "Leh"
    ],
    "protectedAreas": [
      "Karakoram Wildlife Sanctuary",
      "Changthang Wildlife Sanctuary"
    ],
    "threats": [
      "Historical cross-border slaughter for the illicit Shahtoosh shawl trade",
      "Intensified border military logistics and fencing across migration corridors",
      "Harsh winter blizzards amplified by polar vortex anomalies"
    ],
    "conservationMeasures": [
      "Strict global trade ban under CITES Appendix I",
      "Promoting certified cruelty-free Pashmina alternatives in Srinagar crafts guilds",
      "Armed ITBP/Army border wildlife patrols"
    ],
    "sensitivity": "critical",
    "verifiedSightings": 64,
    "conservationPriority": 8,
    "distributionPoints": [],
    "endemismStatus": "trans-himalayan",
    "dataSource": {
      "type": "inventory",
      "reference": "WII & CITES Trade Intelligence Monitoring 2024",
      "year": 2024,
      "verifiedBy": "TRAFFIC & Wildlife Crime Control Bureau",
      "confidence": 96
    }
  },
  {
    "id": "thr-mam-10",
    "slug": "himalayan-serow",
    "commonName": "Himalayan Serow",
    "scientificName": "Capricornis sumatraensis thar",
    "localName": "Ram-Hoon / رام ہوٗن",
    "taxonomicGroup": "mammals",
    "category": "Herbivore",
    "conservationStatus": "VU",
    "nationalStatus": "Schedule I (WPA 1972)",
    "citesListing": "CITES Appendix I",
    "estimatedWildPopulation": "Fragmented small populations in deep gorges",
    "traffickingCorridor": "Pir Panjal - Banihal Forest Gorges",
    "traffickingRisk": "Moderate Risk",
    "effectivePopulationNe": "~90 breeding individuals",
    "inbreedingRisk": "High Gorge Isolation",
    "projectedAltitudinalShift": "+100m upwards",
    "climateVulnerability": "Ravine Torrent Flash Floods Wiping Out Understory",
    "description": "A goat-antelope with a thick black or reddish-brown coat, white stockings, and short backward-pointing horns. Highly secretive, solitary, and inhabiting steep, densely vegetated ravines and cliffs in temperate and subalpine forests.",
    "ecologicalRole": "Steep Ravine Herbivore & Prey for Common Leopards",
    "habitats": [
      "Temperate Coniferous Forests",
      "Rocky Scree & Cliffs",
      "Broadleaf Forests"
    ],
    "elevationRange": {
      "min": 2000,
      "max": 3500
    },
    "districts": [
      "Anantnag",
      "Baramulla",
      "Kishtwar",
      "Doda",
      "Poonch",
      "Neelum"
    ],
    "protectedAreas": [
      "Dachigam National Park",
      "Overa-Aru Wildlife Sanctuary",
      "Limber Wildlife Sanctuary"
    ],
    "threats": [
      "Targeted snaring along steep ravines",
      "Loss of dense understory cover from forest fires",
      "Hunting dogs accompanying migratory herders"
    ],
    "conservationMeasures": [
      "Habitat corridor restoration along Sindh and Chenab river gorges",
      "Camera trap monitoring in Kazinag"
    ],
    "sensitivity": "high",
    "verifiedSightings": 56,
    "conservationPriority": 7,
    "distributionPoints": [],
    "endemismStatus": "himalayan-endemic",
    "dataSource": {
      "type": "inventory",
      "reference": "IUCN Caprinae Specialist Group 2023",
      "year": 2023,
      "verifiedBy": "WII",
      "confidence": 93
    }
  },
  {
    "id": "thr-mam-11",
    "slug": "himalayan-black-bear",
    "commonName": "Himalayan Black Bear",
    "scientificName": "Ursus thibetanus laniger",
    "localName": "Haputh / ہاپُتھ",
    "taxonomicGroup": "mammals",
    "category": "Omnivore",
    "conservationStatus": "VU",
    "nationalStatus": "Schedule I (WPA 1972)",
    "citesListing": "CITES Appendix I",
    "estimatedWildPopulation": "~700-900 across J&K temperate forests",
    "traffickingCorridor": "Kashmir Valley Orchard Fringes to Jammu Highway",
    "traffickingRisk": "High Risk",
    "effectivePopulationNe": "~350 breeding individuals",
    "inbreedingRisk": "Moderate Population Connectivity",
    "projectedAltitudinalShift": "+80m upwards",
    "climateVulnerability": "Autumn Acorn and Walnut Crop Failures Forcing Orchard Incursions",
    "description": "Distinguished by a prominent white or cream-colored crescent on its chest. Inhabits dense temperate oak and conifer forests. Frequently comes into intense conflict with villagers as horticultural expansion pushes apple and walnut orchards right up to forest boundaries.",
    "ecologicalRole": "Forest Seed Disperser & Canopy Fruit Consumer",
    "habitats": [
      "Temperate Coniferous Forests",
      "Broadleaf Forests",
      "Oak Woodlands"
    ],
    "elevationRange": {
      "min": 1400,
      "max": 3500
    },
    "districts": [
      "Srinagar",
      "Ganderbal",
      "Budgam",
      "Baramulla",
      "Kupwara",
      "Anantnag",
      "Pulwama",
      "Shopian",
      "Doda",
      "Kishtwar",
      "Poonch",
      "Rajouri",
      "Muzaffarabad",
      "Neelum"
    ],
    "protectedAreas": [
      "Dachigam National Park",
      "Gulmarg Biosphere Reserve",
      "Rajparian Wildlife Sanctuary",
      "Overa-Aru Wildlife Sanctuary"
    ],
    "threats": [
      "Retaliatory lynching during orchard crop raids",
      "Electrocution by illegal live fencing around orchards",
      "Poaching for bear bile and paws",
      "Forest degradation reducing wild mast crops"
    ],
    "conservationMeasures": [
      "Rapid Response Conflict Teams across all forest divisions",
      "Solar fence subsidies for orchardists",
      "Compensation for human casualties and crop losses"
    ],
    "sensitivity": "high",
    "verifiedSightings": 320,
    "conservationPriority": 7,
    "distributionPoints": [],
    "endemismStatus": "himalayan-endemic",
    "dataSource": {
      "type": "monitoring",
      "reference": "J&K Wildlife Dept Human-Bear Conflict Database 2024",
      "year": 2024,
      "verifiedBy": "Wildlife SOS & J&K Wildlife",
      "confidence": 95
    }
  },
  {
    "id": "thr-mam-12",
    "slug": "common-leopard",
    "commonName": "Common Leopard",
    "scientificName": "Panthera pardus fusca",
    "localName": "Suh / سُہ",
    "taxonomicGroup": "mammals",
    "category": "Apex Predator",
    "conservationStatus": "VU",
    "nationalStatus": "Schedule I (WPA 1972)",
    "citesListing": "CITES Appendix I",
    "estimatedWildPopulation": "~400-500 across Kashmir & Jammu divisions",
    "traffickingCorridor": "Peri-urban Forest Fringes & Banihal Transit Corridor",
    "traffickingRisk": "High Risk",
    "effectivePopulationNe": "~220 breeding individuals",
    "inbreedingRisk": "Low, High Mobility across Mountain Corridors",
    "projectedAltitudinalShift": "+90m upwards into subalpine zones",
    "climateVulnerability": "Prey Base Shifts & Drought Depleting Drinking Pools",
    "description": "Highly adaptable apex predator occupying forest edges, scrublands, and riverine thickets. As urbanization encroaches upon foothill forests, leopards increasingly prey upon stray dogs and livestock in Srinagar, Baramulla, and Jammu peri-urban zones, leading to severe conflict.",
    "ecologicalRole": "Apex Predator of Temperate Foothills & Forests",
    "habitats": [
      "Temperate Coniferous Forests",
      "Broadleaf Forests",
      "Riverine Valleys"
    ],
    "elevationRange": {
      "min": 600,
      "max": 3400
    },
    "districts": [
      "Srinagar",
      "Budgam",
      "Ganderbal",
      "Baramulla",
      "Kupwara",
      "Anantnag",
      "Pulwama",
      "Shopian",
      "Jammu",
      "Kathua",
      "Udhampur",
      "Reasi",
      "Poonch",
      "Rajouri",
      "Doda",
      "Ramban",
      "Muzaffarabad",
      "Mirpur"
    ],
    "protectedAreas": [
      "Dachigam National Park",
      "Jasrota Wildlife Sanctuary",
      "Ramnagar Wildlife Sanctuary",
      "Gulmarg Biosphere Reserve"
    ],
    "threats": [
      "Retaliatory killing and poisoning of carcasses",
      "Roadkill casualties on national highways and expressways",
      "Poaching for skin and claws for black market trafficking",
      "Depletion of natural wild prey"
    ],
    "conservationMeasures": [
      "Deployment of capture cages and satellite radio-collaring",
      "Community conflict sensitisation in peri-urban school zones",
      "Stringent anti-snaring enforcement sweeps"
    ],
    "sensitivity": "high",
    "verifiedSightings": 410,
    "conservationPriority": 7,
    "distributionPoints": [],
    "endemismStatus": "widely-distributed",
    "dataSource": {
      "type": "monitoring",
      "reference": "WII Leopard Population Status Report 2024",
      "year": 2024,
      "verifiedBy": "WII / J&K Wildlife",
      "confidence": 96
    }
  },
  {
    "id": "thr-mam-13",
    "slug": "eurasian-otter",
    "commonName": "Eurasian Otter",
    "scientificName": "Lutra lutra",
    "localName": "Vouder / وۆدُر",
    "taxonomicGroup": "mammals",
    "category": "Semi-aquatic Carnivore",
    "conservationStatus": "NT",
    "nationalStatus": "Schedule I (WPA 1972)",
    "citesListing": "CITES Appendix I",
    "estimatedWildPopulation": "Drastic decline in Jhelum and Wular lake networks",
    "traffickingCorridor": "Jhelum River & Wular-Hokersar Wetland Inlets",
    "traffickingRisk": "High Risk",
    "effectivePopulationNe": "~120 breeding individuals",
    "inbreedingRisk": "High Riparian Fragmentation",
    "projectedAltitudinalShift": "+120m upstream into mountain streams",
    "climateVulnerability": "Winter River Dewatering and Untreated Sewage Toxicity",
    "description": "A semi-aquatic predator of pristine riverine systems, lakes, and marshes. Highly sensitive to water pollution, riverbed gravel extraction, and gill net drowning. Historically common in the Jhelum river and Dal lake, now restricted to cleaner mountain streams in Sindh and Lidder valleys.",
    "ecologicalRole": "Apex Predator of Freshwater Ecosystems",
    "habitats": [
      "Riverine Valleys",
      "Wetlands & Lakes"
    ],
    "elevationRange": {
      "min": 1400,
      "max": 3200
    },
    "districts": [
      "Srinagar",
      "Baramulla",
      "Bandipora",
      "Ganderbal",
      "Anantnag",
      "Kupwara",
      "Kargil",
      "Neelum"
    ],
    "protectedAreas": [
      "Wular Lake Wetland Reserve",
      "Sindh River Protected Stretch"
    ],
    "threats": [
      "Poaching for pelt and waterproof fur",
      "Accidental drowning in commercial monofilament fishing nets",
      "Heavy pesticide and sewage pollution in Kashmir valley waterways"
    ],
    "conservationMeasures": [
      "Restoration of riparian vegetated riverbank buffers",
      "Anti-poaching surveillance around Wular and Hokersar"
    ],
    "sensitivity": "high",
    "verifiedSightings": 37,
    "conservationPriority": 7,
    "distributionPoints": [],
    "endemismStatus": "widely-distributed",
    "dataSource": {
      "type": "monitoring",
      "reference": "WII Otter Assessment & Conservation Strategy 2024",
      "year": 2024,
      "verifiedBy": "WII Freshwater Ecology Dept",
      "confidence": 93
    }
  },
  {
    "id": "thr-mam-14",
    "slug": "smooth-coated-otter",
    "commonName": "Smooth-coated Otter",
    "scientificName": "Lutrogale perspicillata",
    "localName": "Pani-Kutta / پانی کتا",
    "taxonomicGroup": "mammals",
    "category": "Semi-aquatic Carnivore",
    "conservationStatus": "VU",
    "nationalStatus": "Schedule I (WPA 1972)",
    "citesListing": "CITES Appendix I",
    "estimatedWildPopulation": "Restricted to isolated oxbows of lower Chenab and Ravi rivers",
    "traffickingCorridor": "Lower Chenab - Ravi Riparian Border",
    "traffickingRisk": "High Risk",
    "effectivePopulationNe": "~80 breeding adults",
    "inbreedingRisk": "High Isolation in Plain Rivers",
    "projectedAltitudinalShift": "+60m into foothill reservoirs",
    "climateVulnerability": "River Drying and Wetland Siltation",
    "description": "The largest otter in South Asia, characterized by very smooth, sleek pelage and group hunting behavior. Inhabits major lowland rivers and floodplains of the Jammu region and downstream Chenab basin.",
    "ecologicalRole": "Riverine Fish Regulator & Wetland Apex Carnivore",
    "habitats": [
      "Riverine Valleys",
      "Wetlands & Lakes"
    ],
    "elevationRange": {
      "min": 250,
      "max": 800
    },
    "districts": [
      "Jammu",
      "Kathua",
      "Samba",
      "Mirpur"
    ],
    "protectedAreas": [
      "Gharana Wetland Reserve",
      "Surinsar-Mansar Wildlife Sanctuary"
    ],
    "threats": [
      "Destruction of sandbank denning sites from industrial sand mining",
      "Conflict with commercial fishermen",
      "Industrial wastewater run-off"
    ],
    "conservationMeasures": [
      "Gharana Wetland eco-restoration project",
      "Community fisher incentives to report entanglements"
    ],
    "sensitivity": "high",
    "verifiedSightings": 29,
    "conservationPriority": 7,
    "distributionPoints": [],
    "endemismStatus": "widely-distributed",
    "dataSource": {
      "type": "inventory",
      "reference": "IUCN Otter Specialist Group South Asia Report 2023",
      "year": 2023,
      "verifiedBy": "IUCN / WII",
      "confidence": 91
    }
  },
  {
    "id": "thr-mam-15",
    "slug": "tibetan-wolf",
    "commonName": "Tibetan Wolf",
    "scientificName": "Canis lupus chanco",
    "localName": "Chanku / སྤྱང་ཀུ",
    "taxonomicGroup": "mammals",
    "category": "Apex Predator",
    "conservationStatus": "NT",
    "nationalStatus": "Schedule I (WPA 1972)",
    "citesListing": "CITES Appendix I",
    "estimatedWildPopulation": "~250-350 individuals across Ladakh & upper valleys",
    "traffickingCorridor": "Changthang - Kargil - Zanskar Alpine Axis",
    "traffickingRisk": "Moderate Risk",
    "effectivePopulationNe": "~110 breeding individuals",
    "inbreedingRisk": "Low Pack Mobility",
    "projectedAltitudinalShift": "+140m upwards",
    "climateVulnerability": "Winter Prey Scarcity Leading to Corral Raids",
    "description": "A genetically distinct lineage of wolf adapted to high-altitude cold deserts and alpine plateaus of Ladakh and Trans-Himalayan summits. Possesses a dense, pale woolly coat and hunts in small cooperative packs preying on marmots, blue sheep, and Ladakh urial.",
    "ecologicalRole": "Apex Predator of Trans-Himalayan Steppe & Scree",
    "habitats": [
      "Cold Desert Scrub",
      "Alpine Meadows",
      "Glacial Moraines"
    ],
    "elevationRange": {
      "min": 3200,
      "max": 5400
    },
    "districts": [
      "Leh",
      "Kargil",
      "Kishtwar",
      "Gilgit",
      "Skardu"
    ],
    "protectedAreas": [
      "Hemis National Park",
      "Changthang Wildlife Sanctuary",
      "Karakoram Wildlife Sanctuary"
    ],
    "threats": [
      "Retaliatory killing and den smoking by nomadic pastoralists",
      "Feral dog hybridization and disease transmission (canine distemper, rabies)",
      "Trophy hunting for pelt"
    ],
    "conservationMeasures": [
      "Installation of wolf-proof corral gates in Changthang",
      "Feral dog population management around military encampments"
    ],
    "sensitivity": "medium",
    "verifiedSightings": 82,
    "conservationPriority": 6,
    "distributionPoints": [],
    "endemismStatus": "trans-himalayan",
    "dataSource": {
      "type": "monitoring",
      "reference": "Nature Conservation Foundation & Ladakh Wildlife Dept 2024",
      "year": 2024,
      "verifiedBy": "NCF India",
      "confidence": 94
    }
  },
  {
    "id": "thr-mam-16",
    "slug": "tibetan-gazelle-goa",
    "commonName": "Tibetan Gazelle (Goa)",
    "scientificName": "Procapra picticaudata",
    "localName": "Goa / གོ་ဝ",
    "taxonomicGroup": "mammals",
    "category": "Herbivore",
    "conservationStatus": "NT",
    "nationalStatus": "Schedule I (WPA 1972)",
    "citesListing": "CITES Appendix I",
    "estimatedWildPopulation": "< 150 individuals in Eastern Ladakh (Critically Endangered in India)",
    "traffickingCorridor": "Hanle Valley - Chushul - Demchok High Steppe",
    "traffickingRisk": "High Risk",
    "effectivePopulationNe": "~25 breeding individuals in India",
    "inbreedingRisk": "Extreme Inbreeding in Indian Pockets",
    "projectedAltitudinalShift": "+160m upwards",
    "climateVulnerability": "Extreme Winter Ice Crusts Preventing Grazing",
    "description": "A small, delicate gazelle possessing a brown coat with a heart-shaped white rump patch and elegant curved horns in males. Restricted to open, rolling high-altitude plains of Eastern Ladakh (Hanle, Chushul, Kalak Tartar). Near regional extinction in India due to pasture takeover by domestic pashmina goats.",
    "ecologicalRole": "High Plateau Forb and Grass Consumer",
    "habitats": [
      "Cold Desert Scrub",
      "Alpine Meadows"
    ],
    "elevationRange": {
      "min": 4200,
      "max": 5400
    },
    "districts": [
      "Leh"
    ],
    "protectedAreas": [
      "Changthang Wildlife Sanctuary"
    ],
    "threats": [
      "Severe forage competition with huge herds of pashmina goats",
      "Fencing of pastures for security and border logistics",
      "Predation of fawns by feral dog packs around Hanle"
    ],
    "conservationMeasures": [
      "Creation of livestock-free gazelle reserves in Kalak Tartar",
      "Community-managed Hanle conservation agreements"
    ],
    "sensitivity": "critical",
    "verifiedSightings": 31,
    "conservationPriority": 9,
    "distributionPoints": [],
    "endemismStatus": "trans-himalayan",
    "dataSource": {
      "type": "inventory",
      "reference": "WII & NCF High Altitude Ungulate Report 2024",
      "year": 2024,
      "verifiedBy": "WII",
      "confidence": 97
    }
  },
  {
    "id": "thr-mam-17",
    "slug": "tibetan-argali-nyan",
    "commonName": "Tibetan Argali (Nyan)",
    "scientificName": "Ovis ammon hodgsoni",
    "localName": "Nyan / གཉན",
    "taxonomicGroup": "mammals",
    "category": "Herbivore",
    "conservationStatus": "NT",
    "nationalStatus": "Schedule I (WPA 1972)",
    "citesListing": "CITES Appendix I",
    "estimatedWildPopulation": "~300-400 individuals in Ladakh",
    "traffickingCorridor": "Tso Moriri - Spiti - Aksai Chin High Ridges",
    "traffickingRisk": "High Risk",
    "effectivePopulationNe": "~75 breeding adults",
    "inbreedingRisk": "High Ridge Patch Isolation",
    "projectedAltitudinalShift": "+140m upwards",
    "climateVulnerability": "Drying of Alpine Stipa Grasses",
    "description": "The largest wild sheep in the world, renowned for the massive spiral horns of rams that can weigh over 20 kg. Inhabits rolling high-altitude hills and plateau plateaus in eastern and northern Ladakh, avoiding steep cliff crags.",
    "ecologicalRole": "High-Altitude Plateau Ungulate Herbivore",
    "habitats": [
      "Alpine Meadows",
      "Cold Desert Scrub"
    ],
    "elevationRange": {
      "min": 4000,
      "max": 5500
    },
    "districts": [
      "Leh"
    ],
    "protectedAreas": [
      "Hemis National Park",
      "Changthang Wildlife Sanctuary"
    ],
    "threats": [
      "Direct forage competition with domestic livestock in autumn",
      "Trophy poaching for gigantic spiral skull horns",
      "Military infrastructure fragmentation"
    ],
    "conservationMeasures": [
      "Dedicated pasture reserves in Tsokar and Rupshu",
      "GPS radio-tracking of seasonal migratory groups"
    ],
    "sensitivity": "high",
    "verifiedSightings": 46,
    "conservationPriority": 8,
    "distributionPoints": [],
    "endemismStatus": "trans-himalayan",
    "dataSource": {
      "type": "monitoring",
      "reference": "IUCN Caprinae Specialist Group & Ladakh Wildlife Dept 2024",
      "year": 2024,
      "verifiedBy": "IUCN / NCF",
      "confidence": 95
    }
  },
  {
    "id": "thr-mam-18",
    "slug": "himalayan-tahr",
    "commonName": "Himalayan Tahr",
    "scientificName": "Hemitragus jemlahicus",
    "localName": "Kras / کراس",
    "taxonomicGroup": "mammals",
    "category": "Herbivore",
    "conservationStatus": "NT",
    "nationalStatus": "Schedule I (WPA 1972)",
    "citesListing": "Not Listed",
    "estimatedWildPopulation": "~1,200 individuals across southern Pir Panjal & Chenab crags",
    "traffickingCorridor": "Kishtwar - Bhaderwah - Himachal Border Crags",
    "traffickingRisk": "Moderate Risk",
    "effectivePopulationNe": "~220 breeding individuals",
    "inbreedingRisk": "Moderate, Continuous Cliff Corridors",
    "projectedAltitudinalShift": "+110m upwards",
    "climateVulnerability": "Winter Avalanche Frequency and Shrub Drying",
    "description": "A robust wild ungulate with a dramatic golden-reddish mane covering its neck and shoulders in mature males. Master of precipitous timberline cliffs and subalpine crags across the southern slopes of the Pir Panjal and Great Himalayan ranges in Kishtwar and Doda.",
    "ecologicalRole": "Cliff Precipice Browser & Leopard Prey Base",
    "habitats": [
      "Rocky Scree & Cliffs",
      "Subalpine Forests",
      "Temperate Coniferous Forests"
    ],
    "elevationRange": {
      "min": 2200,
      "max": 4200
    },
    "districts": [
      "Kishtwar",
      "Doda",
      "Ramban",
      "Kathua",
      "Udhampur"
    ],
    "protectedAreas": [
      "Kishtwar High Altitude National Park"
    ],
    "threats": [
      "Poaching for meat and skin during heavy winter snows",
      "Competition with migratory Gaddi and Bakarwal sheep herds",
      "Loss of subalpine forest edge from timber felling"
    ],
    "conservationMeasures": [
      "Intensified winter foot patrols in Kishtwar High Altitude NP",
      "Anti-poaching checkposts along Paddar and Marwah valleys"
    ],
    "sensitivity": "medium",
    "verifiedSightings": 68,
    "conservationPriority": 6,
    "distributionPoints": [],
    "endemismStatus": "himalayan-endemic",
    "dataSource": {
      "type": "inventory",
      "reference": "WII Himalayan Ungulate Database 2024",
      "year": 2024,
      "verifiedBy": "WII",
      "confidence": 93
    }
  },
  {
    "id": "thr-brd-01",
    "slug": "western-tragopan",
    "commonName": "Western Tragopan",
    "scientificName": "Tragopan melanocephalus",
    "localName": "Dan-Geer / دان گیٖر",
    "taxonomicGroup": "birds",
    "category": "Pheasant",
    "conservationStatus": "VU",
    "nationalStatus": "Schedule I (WPA 1972)",
    "citesListing": "CITES Appendix I",
    "estimatedWildPopulation": "~2,500-3,500 mature individuals globally",
    "traffickingCorridor": "Neelum Valley - Kazinag Transboundary Crest",
    "traffickingRisk": "High Risk",
    "effectivePopulationNe": "~450 breeding pairs",
    "inbreedingRisk": "High Forest Patch Isolation",
    "projectedAltitudinalShift": "+130m upwards",
    "climateVulnerability": "Winter Snow Cover Delay Disrupting Roosting Protection",
    "description": "The magnificent 'Jeweled Pheasant' of the western Himalayas. Males feature jet-black plumage dotted with pearl-like white spots, deep crimson neck, and brilliant blue facial skin. Nests off the ground in tree forks and dense subalpine understory. Its primary global stronghold spans Kazinag and Machiara National Parks.",
    "ecologicalRole": "Indicator of Pristine Old-Growth Temperate Oak-Fir Canopies",
    "habitats": [
      "Temperate Coniferous Forests",
      "Subalpine Forests",
      "Broadleaf Forests"
    ],
    "elevationRange": {
      "min": 2400,
      "max": 3600
    },
    "districts": [
      "Baramulla",
      "Kupwara",
      "Bandipora",
      "Kishtwar",
      "Neelum",
      "Muzaffarabad"
    ],
    "protectedAreas": [
      "Kazinag National Park",
      "Lachipora Wildlife Sanctuary",
      "Limber Wildlife Sanctuary",
      "Machiara National Park"
    ],
    "threats": [
      "Overgrazing by nomadic livestock trampling bamboo and fern understory",
      "Fuelwood extraction in subalpine oak-fir stands",
      "Poaching for plumes and meat during winter snow migrations"
    ],
    "conservationMeasures": [
      "Establishment of Kazinag National Park as core sanctuary",
      "Community-based Kazinag Tragopan Watchers",
      "Monitoring of dawn acoustic call counts"
    ],
    "sensitivity": "critical",
    "verifiedSightings": 52,
    "conservationPriority": 9,
    "distributionPoints": [],
    "endemismStatus": "northwest-himalayan",
    "dataSource": {
      "type": "monitoring",
      "reference": "BirdLife International & J&K Wildlife Tragopan Inventory 2024",
      "year": 2024,
      "verifiedBy": "BirdLife / WII",
      "confidence": 97
    }
  },
  {
    "id": "thr-brd-02",
    "slug": "kashmir-flycatcher",
    "commonName": "Kashmir Flycatcher",
    "scientificName": "Ficedula subrubra",
    "localName": "Kashur Tont-Phor / توٗنٛتھ پھور",
    "taxonomicGroup": "birds",
    "category": "Passerine",
    "conservationStatus": "VU",
    "nationalStatus": "Schedule I (WPA 1972)",
    "citesListing": "Not Listed",
    "estimatedWildPopulation": "~1,500-2,500 breeding pairs",
    "traffickingCorridor": "Western Ghats - Kashmir Spring Migration Flyway",
    "traffickingRisk": "Moderate Risk",
    "effectivePopulationNe": "~800 breeding pairs",
    "inbreedingRisk": "Moderate, Long-Distance Migrant",
    "projectedAltitudinalShift": "+110m upwards",
    "climateVulnerability": "Early Insect Emergence Causing Phenological Mismatch",
    "description": "A small, elegant migratory passerine that breeds exclusively in dense deciduous and mixed forests of Kashmir and adjacent Himachal Pradesh, migrating to the Western Ghats and Sri Lanka for the winter. Males show vibrant rufous-orange breast plumage bounded by neat black borders.",
    "ecologicalRole": "Specialized Forest Insectivore & Canopy Bioindicator",
    "habitats": [
      "Broadleaf Forests",
      "Temperate Coniferous Forests"
    ],
    "elevationRange": {
      "min": 1800,
      "max": 2800
    },
    "districts": [
      "Srinagar",
      "Ganderbal",
      "Baramulla",
      "Anantnag",
      "Poonch",
      "Muzaffarabad"
    ],
    "protectedAreas": [
      "Dachigam National Park",
      "Overa-Aru Wildlife Sanctuary"
    ],
    "threats": [
      "Loss of mature nesting cavity trees due to timber extraction",
      "Intensive pesticide use in adjacent commercial apple orchards",
      "Habitat loss across wintering grounds in the Western Ghats"
    ],
    "conservationMeasures": [
      "Preservation of dead snags and cavity-bearing trees in Dachigam",
      "Seasonal monitoring of breeding success in Lower Dachigam"
    ],
    "sensitivity": "high",
    "verifiedSightings": 91,
    "conservationPriority": 8,
    "distributionPoints": [],
    "endemismStatus": "northwest-himalayan",
    "dataSource": {
      "type": "inventory",
      "reference": "eBird India & Kashmir Birdwatch Flycatcher Census 2024",
      "year": 2024,
      "verifiedBy": "Kashmir Birdwatch / BNHS",
      "confidence": 95
    }
  },
  {
    "id": "thr-brd-03",
    "slug": "white-rumped-vulture",
    "commonName": "White-rumped Vulture",
    "scientificName": "Gyps bengalensis",
    "localName": "Kruhun Gid / گِدھ",
    "taxonomicGroup": "birds",
    "category": "Scavenger",
    "conservationStatus": "CR",
    "nationalStatus": "Schedule I (WPA 1972)",
    "citesListing": "CITES Appendix II",
    "estimatedWildPopulation": "< 6,000 globally (declined > 99% since 1990s)",
    "traffickingCorridor": "Jammu Foothills & Chenab Plains Agricultural Belt",
    "traffickingRisk": "High Risk",
    "effectivePopulationNe": "~1,200 mature individuals",
    "inbreedingRisk": "High Colony Fragmentation",
    "projectedAltitudinalShift": "+70m into foothill valleys",
    "climateVulnerability": "Intense Summer Heatwaves Collapsing Nestlings",
    "description": "Once the most abundant raptor in the world, this species suffered a catastrophic 99.9% population collapse across South Asia due to veterinary diclofenac poisoning through cattle carcasses. Critically dependent on safe feeding zones in the Jammu foothills and Chenab river plains.",
    "ecologicalRole": "Obligate Scavenger & Pathogen Suppressor",
    "habitats": [
      "Broadleaf Forests",
      "Riverine Valleys",
      "Oak Woodlands"
    ],
    "elevationRange": {
      "min": 300,
      "max": 1500
    },
    "districts": [
      "Jammu",
      "Kathua",
      "Samba",
      "Udhampur",
      "Reasi",
      "Bhimber",
      "Mirpur"
    ],
    "protectedAreas": [
      "Jasrota Wildlife Sanctuary",
      "Ramnagar Wildlife Sanctuary"
    ],
    "threats": [
      "Secondary poisoning from veterinary NSAIDs (diclofenac, aceclofenac, ketoprofen)",
      "Collision with overhead high-voltage power transmission lines",
      "Loss of large traditional nesting trees like banyan and eucalyptus"
    ],
    "conservationMeasures": [
      "Strict statewide veterinary bans on lethal NSAIDs",
      "Vulture Safe Zone monitoring in Jammu plains",
      "Carcass testing and provisioning programs"
    ],
    "sensitivity": "critical",
    "verifiedSightings": 24,
    "conservationPriority": 10,
    "distributionPoints": [],
    "endemismStatus": "widely-distributed",
    "dataSource": {
      "type": "monitoring",
      "reference": "BNHS & IUCN Vulture Specialist Group 2024",
      "year": 2024,
      "verifiedBy": "Bombay Natural History Society",
      "confidence": 96
    }
  },
  {
    "id": "thr-brd-04",
    "slug": "black-necked-crane",
    "commonName": "Black-necked Crane",
    "scientificName": "Grus nigricollis",
    "localName": "Cha Thung / ཁྲུང་ཁྲུང",
    "taxonomicGroup": "birds",
    "category": "Waterbird",
    "conservationStatus": "NT",
    "nationalStatus": "Schedule I (WPA 1972)",
    "citesListing": "CITES Appendix I",
    "estimatedWildPopulation": "~120-150 breeding individuals in Ladakh",
    "traffickingCorridor": "Changthang Wetlands - Tibet Transboundary Flyway",
    "traffickingRisk": "High Risk",
    "effectivePopulationNe": "~60 breeding pairs in India",
    "inbreedingRisk": "Moderate, Linked to Tibetan Population",
    "projectedAltitudinalShift": "+150m upwards to permafrost thaw wetlands",
    "climateVulnerability": "Glacial Retreat Drying High Alpine Breeding Meadows",
    "description": "The revered state bird of Ladakh and sacred symbol in Tibetan Buddhism. Breeds in high-altitude wetlands, lake islets, and sedge bogs across Changthang (Tso Moriri, Tso Kar, Hanle, Chushul). Threatened by feral dog packs sustained by tourist camp leftovers that devour eggs and young chicks.",
    "ecologicalRole": "Keystone High-Altitude Wetland Bioindicator",
    "habitats": [
      "Wetlands & Lakes",
      "Alpine Meadows"
    ],
    "elevationRange": {
      "min": 3800,
      "max": 4900
    },
    "districts": [
      "Leh",
      "Kargil"
    ],
    "protectedAreas": [
      "Tso Kar Wetland Complex",
      "Tso Moriri Ramsar Site",
      "Changthang Wildlife Sanctuary"
    ],
    "threats": [
      "Egg and chick predation by feral dog packs",
      "Wetland degradation from unregulated off-road tourist vehicular camping",
      "Fluctuations in water levels due to glacial lake outburst and drying"
    ],
    "conservationMeasures": [
      "Deployment of protective solar-powered electric fencing around nesting islets",
      "Feral dog management and waste control at Hanle and Tso Moriri",
      "Community wildlife warden surveillance by local Changpa nomads"
    ],
    "sensitivity": "critical",
    "verifiedSightings": 118,
    "conservationPriority": 8,
    "distributionPoints": [],
    "endemismStatus": "trans-himalayan",
    "dataSource": {
      "type": "monitoring",
      "reference": "WWF-India & Dept of Wildlife Protection Ladakh Crane Census 2024",
      "year": 2024,
      "verifiedBy": "WWF-India High Altitude Wetlands",
      "confidence": 98
    }
  },
  {
    "id": "thr-brd-05",
    "slug": "white-headed-duck",
    "commonName": "White-headed Duck",
    "scientificName": "Oxyura leucocephala",
    "localName": "Chite-Kore / سفید بتھ",
    "taxonomicGroup": "birds",
    "category": "Waterfowl",
    "conservationStatus": "EN",
    "nationalStatus": "Schedule I (WPA 1972)",
    "citesListing": "CITES Appendix II",
    "estimatedWildPopulation": "< 10,000 globally; rare winter visitor to Kashmir wetlands",
    "traffickingCorridor": "Central Asian Flyway (Hokersar - Wular Axis)",
    "traffickingRisk": "High Risk",
    "effectivePopulationNe": "~2,500 globally",
    "inbreedingRisk": "Moderate Global Fragmentation",
    "projectedAltitudinalShift": "+90m upward stopovers",
    "climateVulnerability": "Wetland Drainage and Siltation Destroying Winter Diving Depths",
    "description": "A stiff-tailed diving duck renowned for the male's swollen turquoise-blue bill and white head. Extremely rare winter migrant from Central Asia to deep, vegetated freshwater wetlands of the Kashmir Valley like Hokersar and Wular Lake.",
    "ecologicalRole": "Deepwater Benthic Macrophyte Consumer",
    "habitats": [
      "Wetlands & Lakes"
    ],
    "elevationRange": {
      "min": 1550,
      "max": 1650
    },
    "districts": [
      "Budgam",
      "Baramulla",
      "Bandipora",
      "Srinagar"
    ],
    "protectedAreas": [
      "Hokersar Ramsar Site",
      "Wular Lake Ramsar Site",
      "Shallabugh Wetland Reserve"
    ],
    "threats": [
      "Wetland drainage, encroachment, and siltation",
      "Illegal nighttime waterfowl poaching using punt guns",
      "Pollution from untreated municipal sewage inputs"
    ],
    "conservationMeasures": [
      "Night anti-poaching patrols by Wildlife Protection boat squads",
      "Restoration of deep-water channels in Hokersar"
    ],
    "sensitivity": "high",
    "verifiedSightings": 19,
    "conservationPriority": 9,
    "distributionPoints": [],
    "endemismStatus": "widely-distributed",
    "dataSource": {
      "type": "inventory",
      "reference": "Asian Waterbird Census (AWC) Kashmir 2024",
      "year": 2024,
      "verifiedBy": "Wetlands International / WII",
      "confidence": 94
    }
  },
  {
    "id": "thr-brd-06",
    "slug": "cheer-pheasant",
    "commonName": "Cheer Pheasant",
    "scientificName": "Catreus wallichii",
    "localName": "Cheer / چیٖر",
    "taxonomicGroup": "birds",
    "category": "Pheasant",
    "conservationStatus": "VU",
    "nationalStatus": "Schedule I (WPA 1972)",
    "citesListing": "CITES Appendix I",
    "estimatedWildPopulation": "~2,500-3,500 mature individuals",
    "traffickingCorridor": "Chenab Valley & Pir Panjal Southern Slopes",
    "traffickingRisk": "Moderate Risk",
    "effectivePopulationNe": "~600 breeding pairs",
    "inbreedingRisk": "High Isolation on Steep Grass Precipices",
    "projectedAltitudinalShift": "+110m upwards",
    "climateVulnerability": "Drought and Forest Fires Incinerating Crag Grasses",
    "description": "Unlike other vividly colored pheasants, the Cheer Pheasant displays subtle barred buff-and-grey plumage with an exceptionally long tail. Specializes in steep, rugged, open grassy slopes interspersed with stunted oak and pine scrub along the Chenab and Kishanganga river gorges.",
    "ecologicalRole": "Steep Crag Herbivore & Tuber Digger",
    "habitats": [
      "Rocky Scree & Cliffs",
      "Oak Woodlands",
      "Temperate Coniferous Forests"
    ],
    "elevationRange": {
      "min": 1500,
      "max": 3000
    },
    "districts": [
      "Kishtwar",
      "Doda",
      "Ramban",
      "Poonch",
      "Rajouri",
      "Neelum",
      "Muzaffarabad"
    ],
    "protectedAreas": [
      "Kishtwar High Altitude National Park",
      "Machiara National Park"
    ],
    "threats": [
      "Deliberate burning of precipitous grassy cliffs by herders",
      "Snaring and nest egg collection",
      "Habitat loss from transmission towers and road cutting"
    ],
    "conservationMeasures": [
      "Fire management plans on steep slopes in Kishtwar",
      "Community awareness among Gujjar-Bakarwal shepherds"
    ],
    "sensitivity": "high",
    "verifiedSightings": 47,
    "conservationPriority": 8,
    "distributionPoints": [],
    "endemismStatus": "northwest-himalayan",
    "dataSource": {
      "type": "inventory",
      "reference": "IUCN Galliformes Specialist Group 2024",
      "year": 2024,
      "verifiedBy": "WII",
      "confidence": 92
    }
  },
  {
    "id": "thr-brd-07",
    "slug": "steppe-eagle",
    "commonName": "Steppe Eagle",
    "scientificName": "Aquila nipalensis",
    "localName": "Gryd / گرٛید",
    "taxonomicGroup": "birds",
    "category": "Raptor",
    "conservationStatus": "EN",
    "nationalStatus": "Schedule I (WPA 1972)",
    "citesListing": "CITES Appendix II",
    "estimatedWildPopulation": "Rapid global decline (> 60% over 3 generations)",
    "traffickingCorridor": "Central Asian Flyway over Pir Panjal and Zojila",
    "traffickingRisk": "High Risk",
    "effectivePopulationNe": "~35,000 global mature pairs",
    "inbreedingRisk": "Low, Migratory raptor",
    "projectedAltitudinalShift": "+120m upwards across high passes",
    "climateVulnerability": "Severe Desertification in Wintering Grasslands",
    "description": "A large, powerful open-country eagle that migrates across the high Himalayan passes from Central Asia. Highly susceptible to electrocution on dangerous power poles and secondary poisoning from pesticide-laced locust and rodent carrion.",
    "ecologicalRole": "Apex Migratory Raptor & Rodent Regulator",
    "habitats": [
      "Alpine Meadows",
      "Cold Desert Scrub",
      "Broadleaf Forests"
    ],
    "elevationRange": {
      "min": 1000,
      "max": 4500
    },
    "districts": [
      "Leh",
      "Kargil",
      "Srinagar",
      "Jammu",
      "Kishtwar",
      "Gilgit"
    ],
    "protectedAreas": [
      "Hemis National Park",
      "Overa-Aru Wildlife Sanctuary"
    ],
    "threats": [
      "Electrocution on medium-voltage distribution power poles",
      "Poisoning from veterinary diclofenac and rodenticides",
      "Direct shooting along migration stopover corridors"
    ],
    "conservationMeasures": [
      "Retrofitting power lines with bird-safe insulation caps",
      "Monitoring migration bottlenecks at Zojila and Banihal"
    ],
    "sensitivity": "high",
    "verifiedSightings": 63,
    "conservationPriority": 8,
    "distributionPoints": [],
    "endemismStatus": "widely-distributed",
    "dataSource": {
      "type": "monitoring",
      "reference": "BirdLife International Raptor Migration Study 2024",
      "year": 2024,
      "verifiedBy": "BirdLife / IUCN",
      "confidence": 95
    }
  },
  {
    "id": "thr-brd-08",
    "slug": "pallas-fish-eagle",
    "commonName": "Pallas's Fish Eagle",
    "scientificName": "Haliaeetus leucoryphus",
    "localName": "Gaad-Baaz / گاد باز",
    "taxonomicGroup": "birds",
    "category": "Raptor",
    "conservationStatus": "EN",
    "nationalStatus": "Schedule I (WPA 1972)",
    "citesListing": "CITES Appendix II",
    "estimatedWildPopulation": "< 2,500 mature individuals globally",
    "traffickingCorridor": "Wular Lake - Jhelum River - Chenab Basin Axis",
    "traffickingRisk": "High Risk",
    "effectivePopulationNe": "~1,200 breeding pairs",
    "inbreedingRisk": "High Wetland Patch Isolation",
    "projectedAltitudinalShift": "+60m upstream along river deltas",
    "climateVulnerability": "Wetland Drainage and Reduced Fish Stocks",
    "description": "A magnificent riverine eagle displaying a striking pale buff head and neck, dark brown body, and wide white band across its broad tail. Specialized in snatching large surface-swimming fish from wide river stretches and major lake basins like Wular, Dal, and Mansar.",
    "ecologicalRole": "Apex Aquatic Raptor & Wetland Health Bioindicator",
    "habitats": [
      "Wetlands & Lakes",
      "Riverine Valleys"
    ],
    "elevationRange": {
      "min": 600,
      "max": 2000
    },
    "districts": [
      "Bandipora",
      "Baramulla",
      "Srinagar",
      "Jammu",
      "Udhampur",
      "Mirpur"
    ],
    "protectedAreas": [
      "Wular Lake Wetland Reserve",
      "Surinsar-Mansar Wildlife Sanctuary"
    ],
    "threats": [
      "Depletion of large native fish prey due to overfishing",
      "Felling of gigantic riverine nesting trees like Populus and Salix",
      "Pesticide biomagnification through the aquatic food web"
    ],
    "conservationMeasures": [
      "Identification and legal protection of traditional nesting trees along Wular",
      "Restoration of fish breeding zones in wetland channels"
    ],
    "sensitivity": "critical",
    "verifiedSightings": 27,
    "conservationPriority": 9,
    "distributionPoints": [],
    "endemismStatus": "widely-distributed",
    "dataSource": {
      "type": "monitoring",
      "reference": "IUCN Sea Eagle Specialist Group 2024",
      "year": 2024,
      "verifiedBy": "WII / Wetlands International",
      "confidence": 94
    }
  },
  {
    "id": "thr-brd-09",
    "slug": "egyptian-vulture",
    "commonName": "Egyptian Vulture",
    "scientificName": "Neophron percnopterus",
    "localName": "Gid / گِدھ",
    "taxonomicGroup": "birds",
    "category": "Scavenger",
    "conservationStatus": "EN",
    "nationalStatus": "Schedule I (WPA 1972)",
    "citesListing": "CITES Appendix II",
    "estimatedWildPopulation": "Decline > 50% across South Asia",
    "traffickingCorridor": "Jammu Foothills & Kashmir Valley Carcass Transit",
    "traffickingRisk": "Moderate Risk",
    "effectivePopulationNe": "~12,000 globally",
    "inbreedingRisk": "Low, Wide Ranging Scavenger",
    "projectedAltitudinalShift": "+80m into middle mountain foothills",
    "climateVulnerability": "Loss of Traditional Open Carcass Dumps",
    "description": "A small, starkly contrasting white-and-black vulture with a bare bright yellow facial skin and wedge-shaped tail. Uses stones as tools to crack large eggs. Frequently nests on sandstone and limestone cliffs in the Jammu Siwaliks and southern Pir Panjal.",
    "ecologicalRole": "Obligate Scavenger of Small Carrion & Waste",
    "habitats": [
      "Rocky Scree & Cliffs",
      "Oak Woodlands",
      "Riverine Valleys"
    ],
    "elevationRange": {
      "min": 300,
      "max": 2400
    },
    "districts": [
      "Jammu",
      "Kathua",
      "Udhampur",
      "Reasi",
      "Poonch",
      "Rajouri",
      "Mirpur"
    ],
    "protectedAreas": [
      "Jasrota Wildlife Sanctuary",
      "Ramnagar Wildlife Sanctuary"
    ],
    "threats": [
      "NSAID poisoning from agricultural livestock residues",
      "Electrocution on utility poles",
      "Disturbance of cliff nesting ledges by quarrying"
    ],
    "conservationMeasures": [
      "Diclofenac residue screening in Jammu district pharmacies",
      "Safe feeding vulture restaurants"
    ],
    "sensitivity": "high",
    "verifiedSightings": 58,
    "conservationPriority": 8,
    "distributionPoints": [],
    "endemismStatus": "widely-distributed",
    "dataSource": {
      "type": "inventory",
      "reference": "BNHS & BirdLife Vulture Monitoring 2024",
      "year": 2024,
      "verifiedBy": "BNHS",
      "confidence": 93
    }
  },
  {
    "id": "thr-brd-10",
    "slug": "baers-pochard",
    "commonName": "Baer's Pochard",
    "scientificName": "Aythya baeri",
    "localName": "Chote Pochard / بتھ",
    "taxonomicGroup": "birds",
    "category": "Waterfowl",
    "conservationStatus": "CR",
    "nationalStatus": "Schedule I (WPA 1972)",
    "citesListing": "CITES Appendix II",
    "estimatedWildPopulation": "< 1,000 mature individuals surviving globally",
    "traffickingCorridor": "Central Asian Wetland Axis (Hokersar - Shallabugh)",
    "traffickingRisk": "High Risk",
    "effectivePopulationNe": "~350 breeding pairs globally",
    "inbreedingRisk": "Severe Global Bottleneck",
    "projectedAltitudinalShift": "+70m across stopover wetlands",
    "climateVulnerability": "Wetland Desiccation and Ice Formation",
    "description": "One of the rarest waterfowl species on Earth. Features bottle-green gloss on the male's dark head, rich chestnut breast, and white eyes. Extremely sporadic winter passage visitor to shallow, heavily vegetated wetlands of the Kashmir Valley.",
    "ecologicalRole": "Deep Diving Macrophyte & Invertebrate Feeder",
    "habitats": [
      "Wetlands & Lakes"
    ],
    "elevationRange": {
      "min": 1550,
      "max": 1650
    },
    "districts": [
      "Budgam",
      "Ganderbal",
      "Bandipora"
    ],
    "protectedAreas": [
      "Hokersar Ramsar Site",
      "Shallabugh Wetland Reserve"
    ],
    "threats": [
      "Unregulated gill netting and bird poaching across flyways",
      "Wetland degradation and reed clearing",
      "Heavy silt deposition from flood channels"
    ],
    "conservationMeasures": [
      "High-alert wetland warden monitoring in Hokersar during winter months",
      "Strict zero-tolerance on gun poaching"
    ],
    "sensitivity": "critical",
    "verifiedSightings": 8,
    "conservationPriority": 10,
    "distributionPoints": [],
    "endemismStatus": "widely-distributed",
    "dataSource": {
      "type": "inventory",
      "reference": "East Asian-Australasian Flyway Partnership (EAAFP) 2024",
      "year": 2024,
      "verifiedBy": "Wetlands International",
      "confidence": 97
    }
  },
  {
    "id": "thr-brd-11",
    "slug": "ferruginous-duck",
    "commonName": "Ferruginous Duck",
    "scientificName": "Aythya nyroca",
    "localName": "Ratal-Kore / لال بتھ",
    "taxonomicGroup": "birds",
    "category": "Waterfowl",
    "conservationStatus": "NT",
    "nationalStatus": "Schedule IV (WPA 1972)",
    "citesListing": "Not Listed",
    "estimatedWildPopulation": "~1,500-3,000 wintering individuals in Kashmir valley",
    "traffickingCorridor": "Hokersar - Mirgund - Wular Wetland Network",
    "traffickingRisk": "Moderate Risk",
    "effectivePopulationNe": "~15,000 across Asian Flyways",
    "inbreedingRisk": "Low, Highly Migratory",
    "projectedAltitudinalShift": "+60m in wintering grounds",
    "climateVulnerability": "Eutrophication and Loss of Submerged Aquatic Macrophytes",
    "description": "A rich chestnut-brown diving duck with pure white undertail coverts and piercing white eyes in males. Breeds in small numbers in sheltered reedbeds of Dal and Anchar lakes, with large flocks arriving during peak winter migrations.",
    "ecologicalRole": "Submerged Macrophyte Consumer & Wetland Herbivore",
    "habitats": [
      "Wetlands & Lakes"
    ],
    "elevationRange": {
      "min": 1550,
      "max": 1650
    },
    "districts": [
      "Srinagar",
      "Budgam",
      "Baramulla",
      "Bandipora",
      "Ganderbal"
    ],
    "protectedAreas": [
      "Hokersar Ramsar Site",
      "Mirgund Wetland",
      "Hygham Wetland Reserve"
    ],
    "threats": [
      "Illegal nocturnal netting and shooting",
      "Eutrophication choking lakes with excessive Azolla and invasive weeds",
      "Encroachment of marshy peripheral reedbeds for willow plantations"
    ],
    "conservationMeasures": [
      "Desilting of key open-water pockets in Hokersar and Hygham",
      "Weed harvesting and water gate regulation"
    ],
    "sensitivity": "medium",
    "verifiedSightings": 182,
    "conservationPriority": 6,
    "distributionPoints": [],
    "endemismStatus": "widely-distributed",
    "dataSource": {
      "type": "monitoring",
      "reference": "Asian Waterbird Census Kashmir Valley 2024",
      "year": 2024,
      "verifiedBy": "J&K Wildlife / Wetlands International",
      "confidence": 95
    }
  },
  {
    "id": "thr-brd-12",
    "slug": "marbled-teal",
    "commonName": "Marbled Teal",
    "scientificName": "Marmaronetta angustirostris",
    "localName": "Batakh / بتھ",
    "taxonomicGroup": "birds",
    "category": "Waterfowl",
    "conservationStatus": "VU",
    "nationalStatus": "Schedule I (WPA 1972)",
    "citesListing": "CITES Appendix II",
    "estimatedWildPopulation": "< 15,000 globally",
    "traffickingCorridor": "Indus - Jhelum Riverine Wetland Axis",
    "traffickingRisk": "Moderate Risk",
    "effectivePopulationNe": "~3,500 breeding pairs",
    "inbreedingRisk": "Moderate Habitat Disconnection",
    "projectedAltitudinalShift": "+50m across winter stopovers",
    "climateVulnerability": "Shallow Marshland Drying from Spring Heatwaves",
    "description": "A pale, sandy-brown duck intricately mottled with creamy-white spots and dark eye patch. Rare winter visitor that frequents shallow, temporary marshy floodplains with abundant emergent vegetation.",
    "ecologicalRole": "Shallow Marshland Dabbler & Macro-invertebrate Consumer",
    "habitats": [
      "Wetlands & Lakes"
    ],
    "elevationRange": {
      "min": 1550,
      "max": 1650
    },
    "districts": [
      "Budgam",
      "Baramulla",
      "Bandipora"
    ],
    "protectedAreas": [
      "Hokersar Ramsar Site",
      "Wular Lake Ramsar Site"
    ],
    "threats": [
      "Drainage of shallow peripheral marshes",
      "Lead shot ingestion from historical hunting residues",
      "Water diversion for paddy agriculture"
    ],
    "conservationMeasures": [
      "Seasonal water level stabilization across Ramsar sites",
      "Prohibition of lead ammunition in adjacent wetlands"
    ],
    "sensitivity": "high",
    "verifiedSightings": 22,
    "conservationPriority": 7,
    "distributionPoints": [],
    "endemismStatus": "widely-distributed",
    "dataSource": {
      "type": "inventory",
      "reference": "IUCN Duck Specialist Group Report 2024",
      "year": 2024,
      "verifiedBy": "Wetlands International",
      "confidence": 93
    }
  },
  {
    "id": "thr-brd-13",
    "slug": "tytlers-leaf-warbler",
    "commonName": "Tytler's Leaf Warbler",
    "scientificName": "Phylloscopus tytleri",
    "localName": "Phor / پھور",
    "taxonomicGroup": "birds",
    "category": "Passerine",
    "conservationStatus": "NT",
    "nationalStatus": "Protected Endemic Breeder",
    "citesListing": "Not Listed",
    "estimatedWildPopulation": "~10,000-20,000 individuals",
    "traffickingCorridor": "Western Ghats - Kashmir Spring Migration Route",
    "traffickingRisk": "Low Risk",
    "effectivePopulationNe": "~4,000 breeding pairs",
    "inbreedingRisk": "Low, Widespread within Western Himalayas",
    "projectedAltitudinalShift": "+110m upwards into subalpine fir belts",
    "climateVulnerability": "Premature Conifer Budburst Disrupting Caterpillar Availability",
    "description": "A slender, active leaf-warbler with a distinctly thin, long bill and prominent yellowish supercilium. Breeds almost exclusively in subalpine conifer forests (Abies pindrow and Pinus wallichiana) of Kashmir, Himachal, and Uttarakhand before making an epic trans-peninsular migration to the Western Ghats.",
    "ecologicalRole": "High-Canopy Needle-Foliage Insectivore",
    "habitats": [
      "Temperate Coniferous Forests",
      "Subalpine Forests"
    ],
    "elevationRange": {
      "min": 2200,
      "max": 3500
    },
    "districts": [
      "Srinagar",
      "Baramulla",
      "Anantnag",
      "Ganderbal",
      "Kishtwar",
      "Doda",
      "Poonch",
      "Neelum"
    ],
    "protectedAreas": [
      "Dachigam National Park",
      "Gulmarg Biosphere Reserve",
      "Overa-Aru Wildlife Sanctuary"
    ],
    "threats": [
      "Commercial thinning of old-growth fir canopies",
      "Pesticide drift from valley orchards",
      "Rapid deforestation in wintering foothill sholas of southern India"
    ],
    "conservationMeasures": [
      "Protection of subalpine fir stands above 2,500m",
      "Acoustic song monitoring across Gulmarg and Dachigam"
    ],
    "sensitivity": "medium",
    "verifiedSightings": 112,
    "conservationPriority": 6,
    "distributionPoints": [],
    "endemismStatus": "northwest-himalayan",
    "dataSource": {
      "type": "monitoring",
      "reference": "BirdLife International Breeding Bird Survey 2024",
      "year": 2024,
      "verifiedBy": "BirdLife International",
      "confidence": 95
    }
  },
  {
    "id": "thr-brd-14",
    "slug": "sarus-crane",
    "commonName": "Sarus Crane",
    "scientificName": "Antigone antigone",
    "localName": "Sarus / سارس",
    "taxonomicGroup": "birds",
    "category": "Waterbird",
    "conservationStatus": "VU",
    "nationalStatus": "Schedule I (WPA 1972)",
    "citesListing": "CITES Appendix II",
    "estimatedWildPopulation": "Extremely localized in Jammu plains marshes",
    "traffickingCorridor": "Jammu - Punjab Agricultural Floodplain Border",
    "traffickingRisk": "Moderate Risk",
    "effectivePopulationNe": "~8,000 globally",
    "inbreedingRisk": "High Isolation on Northern Border",
    "projectedAltitudinalShift": "+40m along irrigated valleys",
    "climateVulnerability": "Agricultural Drought and Monsoon Flash Flooding",
    "description": "The world's tallest flying bird, recognized by immaculate light grey plumage and crimson naked head. Mates for life and performs spectacular courtship dances. Inhabits open agricultural marshes and flood basins of the Jammu plains (Kathua, Samba, Jammu).",
    "ecologicalRole": "Agricultural Wetland Keystone Omnivore",
    "habitats": [
      "Wetlands & Lakes",
      "Riverine Valleys"
    ],
    "elevationRange": {
      "min": 250,
      "max": 600
    },
    "districts": [
      "Jammu",
      "Kathua",
      "Samba",
      "Mirpur"
    ],
    "protectedAreas": [
      "Gharana Wetland Reserve"
    ],
    "threats": [
      "Pesticide ingestion from treated seed crops",
      "High-voltage transmission line collisions",
      "Draining and filling of small rural village ponds"
    ],
    "conservationMeasures": [
      "Installation of bird diverters on power lines around Gharana",
      "Community farmer nest adoption rewards"
    ],
    "sensitivity": "high",
    "verifiedSightings": 35,
    "conservationPriority": 7,
    "distributionPoints": [],
    "endemismStatus": "widely-distributed",
    "dataSource": {
      "type": "monitoring",
      "reference": "WTI & IUCN Crane Specialist Group 2024",
      "year": 2024,
      "verifiedBy": "WTI",
      "confidence": 92
    }
  },
  {
    "id": "thr-fsh-01",
    "slug": "golden-mahseer",
    "commonName": "Golden Mahseer",
    "scientificName": "Tor putitora",
    "localName": "Mahseer / مہیٖسیر",
    "taxonomicGroup": "fish",
    "category": "Coldwater Fish",
    "conservationStatus": "EN",
    "nationalStatus": "State Fish of Jammu & Kashmir",
    "citesListing": "Not Listed",
    "estimatedWildPopulation": "Decline > 50% across wild river stretches",
    "traffickingCorridor": "Lower Chenab, Jhelum, Poonch & Tawi River Corridors",
    "traffickingRisk": "Critical Risk",
    "effectivePopulationNe": "~450 effective breeders",
    "inbreedingRisk": "High River Barrier Fragmentation",
    "projectedAltitudinalShift": "+200m upstream towards colder tributaries",
    "climateVulnerability": "River Water Warming and Glacial Silt Spikes",
    "description": "The 'Tiger of the Himalayan Rivers', Golden Mahseer is an iconic large cyprinid that ascends cold Himalayan torrents to spawn. Dam construction (Salal, Baglihar, Uri, Dul Hasti) has severed its seasonal spawning migrations, while illegal dynamiting, electro-fishing, and riverbed gravel mining have devastated wild river runs.",
    "ecologicalRole": "Apex Predator of Himalayan Riverine Food Webs",
    "habitats": [
      "Riverine Valleys"
    ],
    "elevationRange": {
      "min": 300,
      "max": 1500
    },
    "districts": [
      "Jammu",
      "Kathua",
      "Samba",
      "Reasi",
      "Udhampur",
      "Ramban",
      "Doda",
      "Poonch",
      "Rajouri",
      "Muzaffarabad",
      "Mirpur",
      "Kotli"
    ],
    "protectedAreas": [
      "Anji Khad Fish Reserve",
      "Poonch River Mahseer Sanctuary"
    ],
    "threats": [
      "Hydroelectric dam barrages blocking upstream spawning migration",
      "Illegal blast dynamiting, poisoning, and electro-fishing in river pools",
      "Unregulated mechanized riverbed gravel and boulder extraction"
    ],
    "conservationMeasures": [
      "Artificial breeding and ranching hatcheries at Anji Khad",
      "Fish ladders retrofitting on run-of-the-river hydel dams",
      "Establishment of Poonch River Mahseer Sanctuary"
    ],
    "sensitivity": "critical",
    "verifiedSightings": 84,
    "conservationPriority": 9,
    "distributionPoints": [],
    "endemismStatus": "himalayan-endemic",
    "dataSource": {
      "type": "monitoring",
      "reference": "ICAR-DCFR & J&K Fisheries Mahseer Status Report 2024",
      "year": 2024,
      "verifiedBy": "ICAR Directorate of Coldwater Fisheries Research",
      "confidence": 96
    }
  },
  {
    "id": "thr-fsh-02",
    "slug": "kashmir-catfish",
    "commonName": "Kashmir Catfish",
    "scientificName": "Glyptothorax kashmirensis",
    "localName": "Gaad / گاد",
    "taxonomicGroup": "fish",
    "category": "Coldwater Fish",
    "conservationStatus": "CR",
    "nationalStatus": "Protected Coldwater Endemic",
    "citesListing": "Not Listed",
    "estimatedWildPopulation": "< 250 mature individuals in isolated streams",
    "traffickingCorridor": "Jhelum and Kishanganga Upper River Basins",
    "traffickingRisk": "Moderate Risk",
    "effectivePopulationNe": "~60 mature breeders",
    "inbreedingRisk": "Severe Stream Isolation",
    "projectedAltitudinalShift": "+150m upstream",
    "climateVulnerability": "Flash Floods and Silt Loads Choking Benthic Torrent Rocks",
    "description": "A critically endangered torrent catfish possessing a specialized thoracic adhesive sucker apparatus that allows it to cling to rocks in rushing torrents. Restricted to fast-flowing, oxygen-rich mountain tributaries of the Jhelum and Kishanganga/Neelum basins. Highly imperiled by micro-hydel projects and sediment dumping.",
    "ecologicalRole": "Benthic Invertebrate Feeder in Fast-Flowing Glacial Torrents",
    "habitats": [
      "Riverine Valleys"
    ],
    "elevationRange": {
      "min": 1000,
      "max": 2200
    },
    "districts": [
      "Baramulla",
      "Kupwara",
      "Ganderbal",
      "Bandipora",
      "Neelum",
      "Muzaffarabad"
    ],
    "protectedAreas": [
      "Sindh River Conservation Stretch",
      "Kishanganga Coldwater Reserve"
    ],
    "threats": [
      "Sediment disposal from tunnel excavations into mountain streams",
      "Riverbed boulder removal destroying resting micro-habitats",
      "Pesticide run-off from riverside apple orchards"
    ],
    "conservationMeasures": [
      "Strict ecological flow enforcement below hydel dams",
      "Ex-situ captive maintenance in high-velocity flume tanks"
    ],
    "sensitivity": "critical",
    "verifiedSightings": 18,
    "conservationPriority": 10,
    "distributionPoints": [],
    "endemismStatus": "kashmir-endemic",
    "dataSource": {
      "type": "inventory",
      "reference": "IUCN Freshwater Fish Specialist Group 2023",
      "year": 2023,
      "verifiedBy": "ICAR-DCFR",
      "confidence": 95
    }
  },
  {
    "id": "thr-fsh-03",
    "slug": "alwan-snow-trout",
    "commonName": "Alwan Snow Trout",
    "scientificName": "Schizothorax richardsonii",
    "localName": "Kashur Ale-Gaad / ایٚلہِ گاد",
    "taxonomicGroup": "fish",
    "category": "Coldwater Fish",
    "conservationStatus": "VU",
    "nationalStatus": "Scheduled State Coldwater Fish",
    "citesListing": "Not Listed",
    "estimatedWildPopulation": "Substantial wild decline across all Himalayan rivers",
    "traffickingCorridor": "Jhelum, Sindh, Chenab, and Kishanganga River Basins",
    "traffickingRisk": "Moderate Risk",
    "effectivePopulationNe": "~850 breeding adults",
    "inbreedingRisk": "Moderate, Barrier Fragmented",
    "projectedAltitudinalShift": "+160m upstream",
    "climateVulnerability": "Thermal Stress as Summer Stream Temperatures Exceed 18°C",
    "description": "An indigenous schizothoracine fish adapted to torrential, snow-fed Himalayan waters with streamlined body, reduced scales, and a subterminal mouth for scraping epilithic diatoms off river rocks. Displaced from lower river reaches by introduced alien common carp (Cyprinus carpio) and rainbow trout.",
    "ecologicalRole": "Primary Epilithic Algal Scraper & Herbivore",
    "habitats": [
      "Riverine Valleys",
      "Wetlands & Lakes"
    ],
    "elevationRange": {
      "min": 800,
      "max": 3000
    },
    "districts": [
      "Srinagar",
      "Ganderbal",
      "Baramulla",
      "Anantnag",
      "Bandipora",
      "Kupwara",
      "Doda",
      "Kishtwar",
      "Neelum",
      "Muzaffarabad"
    ],
    "protectedAreas": [
      "Sindh River Coldwater Sanctuary",
      "Lidder River Reserve"
    ],
    "threats": [
      "Competitive displacement by invasive exotic common carp in Jhelum and Wular",
      "River thermal pollution and sewage contamination",
      "Dewatering of stream reaches between dam intake and tailrace outlets"
    ],
    "conservationMeasures": [
      "Establishment of indigenous Snow Trout breeding centers in Kokernag and Laribal",
      "Riparian buffer planting along riverbanks"
    ],
    "sensitivity": "high",
    "verifiedSightings": 145,
    "conservationPriority": 7,
    "distributionPoints": [],
    "endemismStatus": "himalayan-endemic",
    "dataSource": {
      "type": "monitoring",
      "reference": "J&K Department of Fisheries Annual Survey 2024",
      "year": 2024,
      "verifiedBy": "J&K Fisheries",
      "confidence": 94
    }
  },
  {
    "id": "thr-fsh-04",
    "slug": "chirruh-snow-trout",
    "commonName": "Chirruh Snow Trout",
    "scientificName": "Schizothorax esocinus",
    "localName": "Chirruh / چِروٗ",
    "taxonomicGroup": "fish",
    "category": "Coldwater Fish",
    "conservationStatus": "VU",
    "nationalStatus": "Indigenous Game Fish",
    "citesListing": "Not Listed",
    "estimatedWildPopulation": "Decline > 40% in valley lake and river reaches",
    "traffickingCorridor": "Dal Lake, Wular Lake, and Jhelum Main Stem",
    "traffickingRisk": "Moderate Risk",
    "effectivePopulationNe": "~620 mature breeders",
    "inbreedingRisk": "Moderate Riverbed Fragmentation",
    "projectedAltitudinalShift": "+140m upstream",
    "climateVulnerability": "Excessive Algal Blooms Choking River Pools",
    "description": "The predatory 'Pike-like Snow Trout' of Kashmir, possessing an elongated snout, broad predatory mouth, and distinct dark brown spots. Preys actively upon smaller aquatic organisms and minnows in the Jhelum, Dal Lake, and Manasbal Lake. Declining due to loss of clean gravel spawning beds.",
    "ecologicalRole": "Riverine Predatory Fish Regulating Coldwater Invertebrates",
    "habitats": [
      "Riverine Valleys",
      "Wetlands & Lakes"
    ],
    "elevationRange": {
      "min": 1400,
      "max": 2800
    },
    "districts": [
      "Srinagar",
      "Ganderbal",
      "Baramulla",
      "Bandipora",
      "Anantnag",
      "Kupwara"
    ],
    "protectedAreas": [
      "Manasbal Conservation Reserve",
      "Wular Lake Wetland Reserve"
    ],
    "threats": [
      "Smothering of gravel spawning beds by municipal and agricultural silt",
      "Excessive overfishing during spring pre-spawning runs",
      "Invasive weed infestation choking lake shallows"
    ],
    "conservationMeasures": [
      "Artificial spawning channel construction at Laribal",
      "Seasonal fishing moratorium during peak April-May breeding season"
    ],
    "sensitivity": "high",
    "verifiedSightings": 88,
    "conservationPriority": 7,
    "distributionPoints": [],
    "endemismStatus": "kashmir-endemic",
    "dataSource": {
      "type": "monitoring",
      "reference": "SKUAST-K Division of Aquatic Environmental Management 2024",
      "year": 2024,
      "verifiedBy": "SKUAST-K Fisheries Faculty",
      "confidence": 95
    }
  },
  {
    "id": "thr-fsh-05",
    "slug": "sattar-snow-trout",
    "commonName": "Sattar Snow Trout",
    "scientificName": "Schizothorax curvifrons",
    "localName": "Sattar Gaad / سَتار گاد",
    "taxonomicGroup": "fish",
    "category": "Coldwater Fish",
    "conservationStatus": "VU",
    "nationalStatus": "Protected Coldwater Endemic",
    "citesListing": "Not Listed",
    "estimatedWildPopulation": "Confined to high-altitude streams and lakes",
    "traffickingCorridor": "Indus - Zanskar & Jhelum High River Branches",
    "traffickingRisk": "Low Risk",
    "effectivePopulationNe": "~500 breeding adults",
    "inbreedingRisk": "High High-Altitude Valley Isolation",
    "projectedAltitudinalShift": "+170m upstream",
    "climateVulnerability": "Glacial Silt Pulses Abrading Gill Filaments",
    "description": "A distinctive snow trout exhibiting an arched dorsal profile and blunt snout, uniquely adapted to survive both in high-altitude lakes of Kashmir and the cold Indus and Zanskar rivers in Ladakh. Grazes on aquatic mosses and chironomid larvae in near-freezing currents.",
    "ecologicalRole": "High-Altitude Benthic Herbivore and Detritivore",
    "habitats": [
      "Riverine Valleys",
      "Wetlands & Lakes"
    ],
    "elevationRange": {
      "min": 1500,
      "max": 3400
    },
    "districts": [
      "Ganderbal",
      "Anantnag",
      "Leh",
      "Kargil",
      "Skardu"
    ],
    "protectedAreas": [
      "Gangabal Alpine Lake Stretch",
      "Indus Coldwater Sanctuary"
    ],
    "threats": [
      "Introduction of non-native brown trout (Salmo trutta) preying upon fingerlings",
      "Flash flooding from cloudbursts destroying alpine river pools",
      "Unregulated high-altitude angling"
    ],
    "conservationMeasures": [
      "Restricting exotic trout stocking in pristine indigenous schizothoracine lakes",
      "Community river warden squads in Leh and Kargil"
    ],
    "sensitivity": "medium",
    "verifiedSightings": 64,
    "conservationPriority": 7,
    "distributionPoints": [],
    "endemismStatus": "trans-himalayan",
    "dataSource": {
      "type": "inventory",
      "reference": "Ladakh Department of Fisheries & Wildlife Inventory 2024",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR",
      "confidence": 93
    }
  },
  {
    "id": "thr-fsh-06",
    "slug": "reticulated-hillstream-loach",
    "commonName": "Reticulated Hillstream Loach",
    "scientificName": "Triplophysa kashmirensis",
    "localName": "Gurun / گُرُن",
    "taxonomicGroup": "fish",
    "category": "Coldwater Fish",
    "conservationStatus": "CR",
    "nationalStatus": "Critically Endangered Coldwater Loach",
    "citesListing": "Not Listed",
    "estimatedWildPopulation": "< 500 individuals remaining in fragmented springs",
    "traffickingCorridor": "Kashmir Valley Limnocrene Spring Outlets",
    "traffickingRisk": "Low Risk",
    "effectivePopulationNe": "~80 mature individuals",
    "inbreedingRisk": "Severe Spring Isolation",
    "projectedAltitudinalShift": "+110m towards mountain headwaters",
    "climateVulnerability": "Spring Flow Depletion from Deforestation and Over-extraction",
    "description": "A miniature, scaleless freshwater loach intricately patterned with reticulated dark marbling. Inhabits shallow, crystal-clear limnocrene coldwater springs and headwater brooklets across the Kashmir Valley. Highly endangered by the concretization of natural freshwater spring basins for village water supplies.",
    "ecologicalRole": "Micro-Benthic Predator of Spring Invertebrate Larvae",
    "habitats": [
      "Riverine Valleys"
    ],
    "elevationRange": {
      "min": 1550,
      "max": 2400
    },
    "districts": [
      "Anantnag",
      "Pulwama",
      "Srinagar",
      "Budgam",
      "Baramulla"
    ],
    "protectedAreas": [
      "Achabal Spring Reserve",
      "Verinag Conservation Zone"
    ],
    "threats": [
      "Concretization and channelization of natural freshwater spring heads",
      "Heavy domestic detergent and sewage contamination in spring runs",
      "Drying of springs due to groundwater depletion and rainfall deficit"
    ],
    "conservationMeasures": [
      "Designation of critical spring micro-reserves",
      "Prohibition of cement lining around natural spring eyes"
    ],
    "sensitivity": "critical",
    "verifiedSightings": 14,
    "conservationPriority": 10,
    "distributionPoints": [],
    "endemismStatus": "kashmir-endemic",
    "dataSource": {
      "type": "inventory",
      "reference": "IUCN Freshwater Biodiversity Unit Assessment 2024",
      "year": 2024,
      "verifiedBy": "ICAR-DCFR / Univ of Kashmir",
      "confidence": 97
    }
  },
  {
    "id": "thr-fsh-07",
    "slug": "helicopter-catfish",
    "commonName": "Helicopter Catfish (Wallago)",
    "scientificName": "Wallago attu",
    "localName": "Malli / ملّی",
    "taxonomicGroup": "fish",
    "category": "Freshwater Fish",
    "conservationStatus": "VU",
    "nationalStatus": "Scheduled Inland River Fish",
    "citesListing": "Not Listed",
    "estimatedWildPopulation": "Decline > 50% across wild lowland river channels",
    "traffickingCorridor": "Lower Chenab, Tawi, and Ravi River Plains",
    "traffickingRisk": "Moderate Risk",
    "effectivePopulationNe": "~350 breeding individuals",
    "inbreedingRisk": "High River Reservoir Isolation",
    "projectedAltitudinalShift": "+40m upstream",
    "climateVulnerability": "Lowland River Desiccation and Thermal Stress",
    "description": "A massive, voracious predatory freshwater catfish possessing an enormous mouth, rows of sharp teeth, and long maxillary barbels. Inhabits deep pools and slow-flowing channels of the lower Chenab, Tawi, and Ravi rivers in the Jammu plains. Heavily impacted by industrial pollution and indiscriminate overfishing.",
    "ecologicalRole": "Apex Predator of Lowland River Floodplain Habitats",
    "habitats": [
      "Riverine Valleys",
      "Wetlands & Lakes"
    ],
    "elevationRange": {
      "min": 250,
      "max": 700
    },
    "districts": [
      "Jammu",
      "Kathua",
      "Samba",
      "Mirpur"
    ],
    "protectedAreas": [
      "Pargwal Wetland Reserve",
      "Gharana Wetland Reserve"
    ],
    "threats": [
      "Indiscriminate monsoon netting of breeding adults during upstream migration",
      "Industrial effluent discharges from Samba and Kathua industrial corridors",
      "Sand mining destroying deep river resting pools"
    ],
    "conservationMeasures": [
      "Mesh size regulations and enforcement during breeding seasons",
      "Effluent monitoring along the Basantar and Tawi rivers"
    ],
    "sensitivity": "high",
    "verifiedSightings": 42,
    "conservationPriority": 7,
    "distributionPoints": [],
    "endemismStatus": "widely-distributed",
    "dataSource": {
      "type": "monitoring",
      "reference": "J&K Fisheries Inland Fisheries Monitoring Report 2024",
      "year": 2024,
      "verifiedBy": "J&K Fisheries",
      "confidence": 92
    }
  },
  {
    "id": "thr-fsh-08",
    "slug": "indus-river-dolphin",
    "commonName": "Indus River Dolphin",
    "scientificName": "Platanista minor",
    "localName": "Bhulan / بھولن",
    "taxonomicGroup": "fish",
    "category": "Freshwater Cetacean",
    "conservationStatus": "EN",
    "nationalStatus": "Strictly Protected Transboundary Cetacean",
    "citesListing": "CITES Appendix I",
    "estimatedWildPopulation": "~1,800-2,000 in Indus mainstem, rare seasonal transboundary visitor",
    "traffickingCorridor": "Indus Basin Transboundary River Channels",
    "traffickingRisk": "High Risk",
    "effectivePopulationNe": "~400 mature breeding individuals",
    "inbreedingRisk": "Severe Barrage Fragmentation",
    "projectedAltitudinalShift": "+30m upstream during high discharge",
    "climateVulnerability": "Severe River Dewatering from Agricultural Canal Diversions",
    "description": "One of the rarest mammals on Earth and the only exclusively freshwater dolphin in the Indus River system. Functionally blind, relying on echolocation to navigate muddy river currents. Fragmented by upstream barrage dams and threatened by agricultural dewatering and accidental entanglement in nylon gill nets.",
    "ecologicalRole": "Apex Bioindicator of Transboundary Indus Basin River Health",
    "habitats": [
      "Riverine Valleys"
    ],
    "elevationRange": {
      "min": 200,
      "max": 500
    },
    "districts": [
      "Mirpur",
      "Jammu"
    ],
    "protectedAreas": [
      "Indus River Protected Stretch"
    ],
    "threats": [
      "Barrages and dams fragmenting dolphin populations into isolated pods",
      "Entanglement and drowning in monofilament gill nets",
      "Severe water extraction drying river stretches during low-flow winter months"
    ],
    "conservationMeasures": [
      "Satellite acoustic tracking of river pods",
      "Community dolphin rescue teams trained to release canal-stranded animals",
      "Transboundary freshwater monitoring protocols"
    ],
    "sensitivity": "critical",
    "verifiedSightings": 12,
    "conservationPriority": 10,
    "distributionPoints": [],
    "endemismStatus": "trans-himalayan",
    "dataSource": {
      "type": "monitoring",
      "reference": "WWF Indus River Dolphin Transboundary Survey 2024",
      "year": 2024,
      "verifiedBy": "WWF / IUCN Cetacean Specialist Group",
      "confidence": 97
    }
  },
  {
    "id": "thr-flr-01",
    "slug": "kuth-costus",
    "commonName": "Kuth (Costus)",
    "scientificName": "Saussurea costus",
    "localName": "Kuth / کُتھ",
    "taxonomicGroup": "medicinal-plants",
    "category": "Medicinal Flora",
    "conservationStatus": "CR",
    "nationalStatus": "WPA 1972 Schedule VI & J&K Kuth Act",
    "citesListing": "CITES Appendix I (Zero Wild Commercial Harvest Allowed)",
    "estimatedWildPopulation": "< 1,200 wild mature individuals surviving",
    "traffickingCorridor": "Kashmir Valley - Pir Panjal Banihal Highway & Jammu Border",
    "traffickingRisk": "Critical Risk",
    "effectivePopulationNe": "~180 wild reproductive plants",
    "inbreedingRisk": "Severe Wild Inbreeding Depression",
    "projectedAltitudinalShift": "+140m upwards to alpine scree",
    "climateVulnerability": "Desiccation of Subalpine Glades and Alpine Herbaceous Turf",
    "description": "One of the most famous and heavily regulated medicinal plants in the world. Its aromatic root is prized across Tibetan, Ayurvedic, and traditional Chinese medicine for respiratory and gastrointestinal ailments. Subject to centuries of over-exploitation, wild populations in Kashmir are now reduced to scarce, guarded pockets.",
    "ecologicalRole": "Subalpine Glade Herbaceous Perennial & Pollinator Host",
    "habitats": [
      "Subalpine Forests",
      "Alpine Meadows"
    ],
    "elevationRange": {
      "min": 2500,
      "max": 3800
    },
    "districts": [
      "Kupwara",
      "Baramulla",
      "Ganderbal",
      "Bandipora",
      "Anantnag",
      "Kishtwar",
      "Neelum",
      "Muzaffarabad"
    ],
    "protectedAreas": [
      "Dachigam National Park",
      "Gulmarg Biosphere Reserve",
      "Kazinag National Park"
    ],
    "threats": [
      "Illicit wild uprooting by commercial poachers masquerading as cultivated stock",
      "Overgrazing and soil compaction by migratory livestock herds",
      "Extreme localized distribution making wild reproduction scarce"
    ],
    "conservationMeasures": [
      "Zero wild export quota under CITES Appendix I",
      "DNA barcoding of cultivated versus wild roots",
      "Department of Forest Herbal Nursery propagation in Ganderbal and Baramulla"
    ],
    "sensitivity": "critical",
    "verifiedSightings": 67,
    "conservationPriority": 10,
    "distributionPoints": [],
    "endemismStatus": "kashmir-endemic",
    "dataSource": {
      "type": "monitoring",
      "reference": "Botanical Survey of India & IUCN SSC Medicinal Plant Specialist Group 2024",
      "year": 2024,
      "verifiedBy": "BSI / IUCN",
      "confidence": 98
    }
  },
  {
    "id": "thr-flr-02",
    "slug": "indian-aconite-atis",
    "commonName": "Indian Aconite (Atis)",
    "scientificName": "Aconitum heterophyllum",
    "localName": "Patrees / پٔتریٖس",
    "taxonomicGroup": "medicinal-plants",
    "category": "Medicinal Flora",
    "conservationStatus": "EN",
    "nationalStatus": "WPA 1972 Scheduled Plant",
    "citesListing": "CITES Appendix II",
    "estimatedWildPopulation": "Decline > 60% over past two decades",
    "traffickingCorridor": "Sinthan Top & Mughal Road Alpine Ridge Crossing",
    "traffickingRisk": "Critical Risk",
    "effectivePopulationNe": "~350 wild populations",
    "inbreedingRisk": "High Habitat Fragmentation",
    "projectedAltitudinalShift": "+160m upwards",
    "climateVulnerability": "Early Snow Thaw Exposing Sensitive Shoots to Spring Frosts",
    "description": "A highly valuable non-toxic aconite whose tubers yield atisine alkaloids used extensively for infant digestive disorders, fevers, and immune enhancement. Extensively harvested before seed set, causing precipitous wild regeneration collapse across the Pir Panjal and Greater Himalayas.",
    "ecologicalRole": "Alpine Meadow Rhizomatous Herb & Bumblebee Specialist",
    "habitats": [
      "Alpine Meadows",
      "Subalpine Forests"
    ],
    "elevationRange": {
      "min": 2800,
      "max": 4200
    },
    "districts": [
      "Anantnag",
      "Ganderbal",
      "Baramulla",
      "Bandipora",
      "Shopian",
      "Kishtwar",
      "Doda",
      "Kargil",
      "Neelum"
    ],
    "protectedAreas": [
      "Overa-Aru Wildlife Sanctuary",
      "Thajwas Wildlife Sanctuary",
      "Kishtwar High Altitude National Park"
    ],
    "threats": [
      "Premature unmonitored harvesting of tubers before flowering and seed dispersal",
      "Grazing pressure by sheep and goats eating flowering tops",
      "Erosion of fragile alpine topsoil along tourist pony trails"
    ],
    "conservationMeasures": [
      "Establishment of High-Altitude Medicinal Plant Conservation Areas (MPCAs)",
      "Farmer cultivation subsidies in subalpine villages"
    ],
    "sensitivity": "critical",
    "verifiedSightings": 78,
    "conservationPriority": 9,
    "distributionPoints": [],
    "endemismStatus": "himalayan-endemic",
    "dataSource": {
      "type": "inventory",
      "reference": "FRLHT & TRAFFIC Medicinal Plant Extraction Survey 2024",
      "year": 2024,
      "verifiedBy": "FRLHT & CSIR-IIIM",
      "confidence": 96
    }
  },
  {
    "id": "thr-flr-03",
    "slug": "poison-aconite-mohra",
    "commonName": "Poison Aconite (Mohra)",
    "scientificName": "Aconitum chasmanthum",
    "localName": "Mohra / موہرا",
    "taxonomicGroup": "medicinal-plants",
    "category": "Medicinal Flora",
    "conservationStatus": "CR",
    "nationalStatus": "Scheduled Toxic & Medicinal Flora",
    "citesListing": "CITES Appendix II",
    "estimatedWildPopulation": "< 800 reproductive colonies surviving",
    "traffickingCorridor": "Sonamarg - Zojila - Drass Alpine Pass Axis",
    "traffickingRisk": "Critical Risk",
    "effectivePopulationNe": "~140 mature colonies",
    "inbreedingRisk": "Severe Genetic Isolation",
    "projectedAltitudinalShift": "+170m upwards to alpine turf edges",
    "climateVulnerability": "Alpine scree warming and moisture deficits",
    "description": "One of the most potent poisonous and therapeutic plants of the Himalayas, containing aconitine and indaconitine alkaloids. Used in processed minute dilutions for neuralgias and cardiac conditions. Over-collected recklessly from alpine meadows, leading to catastrophic local extirpations.",
    "ecologicalRole": "High-Altitude Herbaceous Perennial with Specialized Bumblebee Mutualisms",
    "habitats": [
      "Alpine Meadows",
      "Subalpine Forests"
    ],
    "elevationRange": {
      "min": 2600,
      "max": 4100
    },
    "districts": [
      "Ganderbal",
      "Baramulla",
      "Bandipora",
      "Anantnag",
      "Kupwara",
      "Kargil",
      "Neelum"
    ],
    "protectedAreas": [
      "Thajwas Wildlife Sanctuary",
      "Overa-Aru Wildlife Sanctuary"
    ],
    "threats": [
      "Lethal commercial uprooting of tuberous roots for illicit pharmaceuticals",
      "Livestock herders pulling poisonous plants to safeguard livestock",
      "Habitat fragmentation by high-altitude border road cutting"
    ],
    "conservationMeasures": [
      "Designation of strict botanical micro-reserves in Sonamarg",
      "Tissue-culture cryopreservation at IIIM Srinagar"
    ],
    "sensitivity": "critical",
    "verifiedSightings": 34,
    "conservationPriority": 10,
    "distributionPoints": [],
    "endemismStatus": "northwest-himalayan",
    "dataSource": {
      "type": "inventory",
      "reference": "BSI & IUCN SSC Medicinal Plants Specialist Group 2024",
      "year": 2024,
      "verifiedBy": "BSI",
      "confidence": 98
    }
  },
  {
    "id": "thr-flr-04",
    "slug": "himalayan-mayapple-wanwangan",
    "commonName": "Himalayan Mayapple",
    "scientificName": "Podophyllum hexandrum",
    "localName": "Wanwangan / ون ونٛگن",
    "taxonomicGroup": "medicinal-plants",
    "category": "Medicinal Flora",
    "conservationStatus": "EN",
    "nationalStatus": "WPA 1972 Scheduled Plant",
    "citesListing": "CITES Appendix II",
    "estimatedWildPopulation": "Severe decline due to pharmaceutical demand",
    "traffickingCorridor": "Gulmarg - Poonch Mountain Corridors & Chenab Axis",
    "traffickingRisk": "Critical Risk",
    "effectivePopulationNe": "~400 breeding stands",
    "inbreedingRisk": "High Stand Isolation",
    "projectedAltitudinalShift": "+130m upwards",
    "climateVulnerability": "Drying of Humus-Rich Shaded Forest Understories",
    "description": "An herbaceous perennial bearing distinctive lobed umbrella-like leaves, single cup-shaped white-to-pink flowers, and large red berries. Its rhizomes produce podophyllotoxin, an essential precursor for semi-synthetic anticancer drugs (etoposide, teniposide). Massive international demand has led to relentless destructive digging of wild roots.",
    "ecologicalRole": "Forest Understory Herb & Specialized Mycorrhizal Symbiont",
    "habitats": [
      "Temperate Coniferous Forests",
      "Subalpine Forests"
    ],
    "elevationRange": {
      "min": 2400,
      "max": 3800
    },
    "districts": [
      "Baramulla",
      "Ganderbal",
      "Anantnag",
      "Kupwara",
      "Kulgam",
      "Doda",
      "Kishtwar",
      "Poonch",
      "Neelum",
      "Muzaffarabad"
    ],
    "protectedAreas": [
      "Gulmarg Biosphere Reserve",
      "Dachigam National Park",
      "Overa-Aru Wildlife Sanctuary"
    ],
    "threats": [
      "Commercial root mining for commercial anticancer pharmaceutical synthesis",
      "Clearing of temperate forest canopies destroying required shady microclimates",
      "Herbarium and non-timber forest produce (NTFP) trafficking"
    ],
    "conservationMeasures": [
      "Micro-propagation protocols developed at University of Kashmir",
      "Tissue culture gene banking at IIIM Srinagar"
    ],
    "sensitivity": "critical",
    "verifiedSightings": 89,
    "conservationPriority": 9,
    "distributionPoints": [],
    "endemismStatus": "himalayan-endemic",
    "dataSource": {
      "type": "monitoring",
      "reference": "CSIR-Indian Institute of Integrative Medicine (IIIM) 2024",
      "year": 2024,
      "verifiedBy": "CSIR-IIIM Srinagar",
      "confidence": 97
    }
  },
  {
    "id": "thr-flr-05",
    "slug": "salam-panja-marsh-orchid",
    "commonName": "Salam Panja (Himalayan Marsh Orchid)",
    "scientificName": "Dactylorhiza hatagirea",
    "localName": "Salam Panja / سلام پنجہ",
    "taxonomicGroup": "medicinal-plants",
    "category": "Medicinal Flora",
    "conservationStatus": "EN",
    "nationalStatus": "Scheduled Endangered Plant",
    "citesListing": "CITES Appendix II",
    "estimatedWildPopulation": "Reduced to sparse patches in boggy meadows",
    "traffickingCorridor": "Zojila - Drass Highway & Gurez Valley Border Road",
    "traffickingRisk": "Critical Risk",
    "effectivePopulationNe": "~280 reproductive clusters",
    "inbreedingRisk": "Severe, Inability to Cross-Pollinate between Distant Bogs",
    "projectedAltitudinalShift": "+170m upwards to alpine bog margins",
    "climateVulnerability": "Desiccation of Subalpine Peat Bogs and Marshlands",
    "description": "A terrestrial orchid recognized by palmate, hand-shaped root tubers and dense spikes of purple-spotted flowers. The tubers yield 'Salep', highly sought after in Unani and Ayurvedic medicine as a potent restorative and aphrodisiac. Digging up the tuber destroys the whole plant before seed release.",
    "ecologicalRole": "Alpine Marshland Bioindicator & Specialized Pollinator Seducer",
    "habitats": [
      "Alpine Meadows",
      "Wetlands & Lakes",
      "Subalpine Forests"
    ],
    "elevationRange": {
      "min": 2800,
      "max": 4200
    },
    "districts": [
      "Ganderbal",
      "Bandipora",
      "Anantnag",
      "Kargil",
      "Leh",
      "Astore",
      "Skardu"
    ],
    "protectedAreas": [
      "Thajwas Wildlife Sanctuary",
      "Deosai National Park",
      "Overa-Aru Wildlife Sanctuary"
    ],
    "threats": [
      "Destructive commercial uprooting of tubers for the aphrodisiac Salep trade",
      "Trampling of marshy soils by livestock and off-road mountain bikes",
      "Hydrological diversion and drainage of high-altitude marshy glades"
    ],
    "conservationMeasures": [
      "Community sanctuary reserves in Gurez Valley",
      "Forest Department wireless checkpoint confiscations on high passes"
    ],
    "sensitivity": "critical",
    "verifiedSightings": 61,
    "conservationPriority": 9,
    "distributionPoints": [],
    "endemismStatus": "himalayan-endemic",
    "dataSource": {
      "type": "monitoring",
      "reference": "TRAFFIC India Herbal Wildlife Crime Bulletin 2024",
      "year": 2024,
      "verifiedBy": "TRAFFIC / BSI",
      "confidence": 96
    }
  },
  {
    "id": "thr-flr-06",
    "slug": "kutki-kour",
    "commonName": "Kutki (Kour)",
    "scientificName": "Picrorhiza kurrooa",
    "localName": "Kour / کئور",
    "taxonomicGroup": "medicinal-plants",
    "category": "Medicinal Flora",
    "conservationStatus": "EN",
    "nationalStatus": "WPA 1972 Scheduled Plant",
    "citesListing": "CITES Appendix II",
    "estimatedWildPopulation": "Severe wild decline across alpine rocky ledges",
    "traffickingCorridor": "Pir Panjal Alpine Ridge & Banihal Transit Corridor",
    "traffickingRisk": "Critical Risk",
    "effectivePopulationNe": "~320 wild colonies",
    "inbreedingRisk": "High Colony Isolation",
    "projectedAltitudinalShift": "+150m upwards",
    "climateVulnerability": "Rocky Scree Soil Erosion from Extreme Rainfall Cloudbursts",
    "description": "A creeping alpine perennial with intensely bitter rhizomes containing picrosides I and II, recognized as premier hepatoprotective compounds for liver disorders and jaundice. Grows on exposed rocky alpine ledges and scree where it binds thin mountain soils.",
    "ecologicalRole": "Alpine Scree Soil-Binding Perennial & Keystone Alpine Producer",
    "habitats": [
      "Alpine Meadows",
      "Rocky Scree & Cliffs"
    ],
    "elevationRange": {
      "min": 3000,
      "max": 4500
    },
    "districts": [
      "Anantnag",
      "Ganderbal",
      "Baramulla",
      "Bandipora",
      "Shopian",
      "Kulgam",
      "Kishtwar",
      "Doda",
      "Kargil",
      "Neelum"
    ],
    "protectedAreas": [
      "Thajwas Wildlife Sanctuary",
      "Overa-Aru Wildlife Sanctuary",
      "Kishtwar High Altitude National Park"
    ],
    "threats": [
      "Massive commercial extraction for liver syrup and pharmaceutical formulations",
      "Premature root pulling by nomadic shepherds during summer transhumance",
      "Cloudburst induced landslides washing away fragile scree populations"
    ],
    "conservationMeasures": [
      "Establishment of in-situ germplasm plots in Sonamarg and Gulmarg",
      "Promotion of commercial farmer cultivation in cold arid zones"
    ],
    "sensitivity": "critical",
    "verifiedSightings": 94,
    "conservationPriority": 8,
    "distributionPoints": [],
    "endemismStatus": "himalayan-endemic",
    "dataSource": {
      "type": "inventory",
      "reference": "IUCN Medicinal Plant Specialist Group Assessment 2024",
      "year": 2024,
      "verifiedBy": "IUCN / CSIR-IIIM",
      "confidence": 95
    }
  },
  {
    "id": "thr-flr-07",
    "slug": "spikenard-jatamansi",
    "commonName": "Spikenard (Jatamansi)",
    "scientificName": "Nardostachys jatamansi",
    "localName": "Bhutkesh / بھوت کیش",
    "taxonomicGroup": "medicinal-plants",
    "category": "Medicinal Flora",
    "conservationStatus": "CR",
    "nationalStatus": "Strictly Protected Botanical",
    "citesListing": "CITES Appendix II",
    "estimatedWildPopulation": "Critically endangered due to 80% wild decline",
    "traffickingCorridor": "Sinthan Top - Kishtwar High Passes to Himachal",
    "traffickingRisk": "Critical Risk",
    "effectivePopulationNe": "~150 mature populations",
    "inbreedingRisk": "Severe Genetic Drift",
    "projectedAltitudinalShift": "+160m upwards",
    "climateVulnerability": "Permafrost Degradation on Alpine Scree Terraces",
    "description": "An aromatic valerianaceous herb with hairy, fibrous rhizomes emitting an intense, earthy fragrance. Ancient cosmetic and neurological panacea used for insomnia, epilepsy, and stress relief. Over-harvesting for incense and luxury essential oil has brought wild stands to the brink of local extinction.",
    "ecologicalRole": "High Alpine Turf Stabilizer & Specialist Nectar Producer",
    "habitats": [
      "Alpine Meadows",
      "Rocky Scree & Cliffs"
    ],
    "elevationRange": {
      "min": 3300,
      "max": 5000
    },
    "districts": [
      "Kishtwar",
      "Anantnag",
      "Ganderbal",
      "Doda",
      "Neelum",
      "Diamer"
    ],
    "protectedAreas": [
      "Kishtwar High Altitude National Park",
      "Overa-Aru Wildlife Sanctuary"
    ],
    "threats": [
      "Rampant commercial extraction for the perfumery and sedative drug industries",
      "Slow growth rate requiring up to 5 years for rhizome maturation",
      "Climate change warming alpine summits faster than seed adaptation rates"
    ],
    "conservationMeasures": [
      "Complete ban on wild extraction across all forest circles",
      "Tissue culture protocol standardization at SKAUST-Kashmir"
    ],
    "sensitivity": "critical",
    "verifiedSightings": 39,
    "conservationPriority": 10,
    "distributionPoints": [],
    "endemismStatus": "himalayan-endemic",
    "dataSource": {
      "type": "inventory",
      "reference": "IUCN Red List Global Tree & Plant Assessment 2024",
      "year": 2024,
      "verifiedBy": "IUCN / BSI",
      "confidence": 97
    }
  },
  {
    "id": "thr-flr-08",
    "slug": "himalayan-yew",
    "commonName": "Himalayan Yew",
    "scientificName": "Taxus wallichiana",
    "localName": "Posthal / پۆسْتھَل (Barmi)",
    "taxonomicGroup": "plants",
    "category": "Coniferous Tree",
    "conservationStatus": "EN",
    "nationalStatus": "Protected Forest Flora",
    "citesListing": "CITES Appendix II",
    "estimatedWildPopulation": "Mature reproductive female trees severely depleted",
    "traffickingCorridor": "Kupwara, Baramulla & Kishtwar Forest Transit",
    "traffickingRisk": "High Risk",
    "effectivePopulationNe": "Slow regenerative dioecious canopy",
    "inbreedingRisk": "High, Due to Female Tree Scarcity",
    "projectedAltitudinalShift": "+90m upwards",
    "climateVulnerability": "Canopy Warming and Fungal Needle Blight",
    "description": "An ancient, slow-growing evergreen conifer of temperate Himalayan forests. The needles and bark contain paclitaxel (Taxol), a revolutionary chemotherapy drug for breast and ovarian cancers. In the 1990s and 2000s, devastating unscientific stripping of bark killed millions of mature trees across Kashmir and Himachal.",
    "ecologicalRole": "Late-Successional Canopy Climax Tree & Winter Bird Roost",
    "habitats": [
      "Temperate Coniferous Forests",
      "Broadleaf Forests"
    ],
    "elevationRange": {
      "min": 2000,
      "max": 3300
    },
    "districts": [
      "Kupwara",
      "Baramulla",
      "Ganderbal",
      "Anantnag",
      "Kishtwar",
      "Doda",
      "Poonch",
      "Neelum",
      "Muzaffarabad"
    ],
    "protectedAreas": [
      "Kazinag National Park",
      "Dachigam National Park",
      "Lachipora Wildlife Sanctuary"
    ],
    "threats": [
      "Historical stripping of bark causing ring-barking mortality",
      "Slow seed germination taking up to 2 years to break dormancy",
      "Timber felling and fuelwood cutting in temperate mixed forests"
    ],
    "conservationMeasures": [
      "Rigid protection of surviving seed-bearing female trees",
      "Ex-situ vegetative propagation at Forest Research Institute nursery in Srinagar"
    ],
    "sensitivity": "high",
    "verifiedSightings": 88,
    "conservationPriority": 8,
    "distributionPoints": [],
    "endemismStatus": "himalayan-endemic",
    "dataSource": {
      "type": "monitoring",
      "reference": "State Forest Research Institute (SFRI) Yew Census 2024",
      "year": 2024,
      "verifiedBy": "SFRI J&K",
      "confidence": 96
    }
  },
  {
    "id": "thr-flr-09",
    "slug": "himalayan-trillium-nagchhatri",
    "commonName": "Himalayan Trillium (Nagchhatri)",
    "scientificName": "Trillium govanianum",
    "localName": "Nagchhatri / ناگ چھتری",
    "taxonomicGroup": "medicinal-plants",
    "category": "Medicinal Flora",
    "conservationStatus": "EN",
    "nationalStatus": "WPA 1972 Scheduled Plant",
    "citesListing": "CITES Appendix II",
    "estimatedWildPopulation": "Collapsing under massive international smuggling",
    "traffickingCorridor": "Pir Panjal - Banihal - Jammu Highway Illicit Trade Axis",
    "traffickingRisk": "Critical Risk",
    "effectivePopulationNe": "~220 localized colonies",
    "inbreedingRisk": "Severe, Slow Clonal Spread",
    "projectedAltitudinalShift": "+120m upwards",
    "climateVulnerability": "Humus Moisture Depletion from Prolonged Summer Droughts",
    "description": "A small rhizomatous forest herb characterized by three whorled leaves and a solitary three-petaled reddish-purple flower. Emerged over the last decade as the most heavily trafficked wild medicinal plant in the Himalayas due to international demand for its steroid saponin (trillarin) used in anti-aging and cancer drugs.",
    "ecologicalRole": "Forest Floor Mycophilic Perennial & Humus Stabilizer",
    "habitats": [
      "Temperate Coniferous Forests",
      "Subalpine Forests"
    ],
    "elevationRange": {
      "min": 2500,
      "max": 3700
    },
    "districts": [
      "Baramulla",
      "Kupwara",
      "Anantnag",
      "Shopian",
      "Kulgam",
      "Kishtwar",
      "Doda",
      "Ramban",
      "Poonch",
      "Neelum",
      "Muzaffarabad"
    ],
    "protectedAreas": [
      "Gulmarg Biosphere Reserve",
      "Overa-Aru Wildlife Sanctuary",
      "Limber Wildlife Sanctuary"
    ],
    "threats": [
      "Massive illicit commercial uprooting; tens of tons seized by enforcement agencies",
      "Slow growth requiring 7 to 10 years from seed to commercial tuber maturity",
      "Trampling of delicate forest litter during organized night collection sweeps"
    ],
    "conservationMeasures": [
      "Special Anti-Nagchhatri task forces by J&K Forest Protection Force",
      "Satellite and drone surveillance of high-altitude harvesting glades"
    ],
    "sensitivity": "critical",
    "verifiedSightings": 53,
    "conservationPriority": 9,
    "distributionPoints": [],
    "endemismStatus": "himalayan-endemic",
    "dataSource": {
      "type": "monitoring",
      "reference": "TRAFFIC & Wildlife Crime Control Bureau Threat Bulletin 2024",
      "year": 2024,
      "verifiedBy": "WCCB / TRAFFIC",
      "confidence": 98
    }
  },
  {
    "id": "thr-flr-10",
    "slug": "kashmir-sage",
    "commonName": "Kashmir Sage",
    "scientificName": "Artemisia amygdalina",
    "localName": "Veer-Tethwan / ویٖر تیٚتھوَن",
    "taxonomicGroup": "medicinal-plants",
    "category": "Medicinal Flora",
    "conservationStatus": "CR",
    "nationalStatus": "Critically Endangered Endemic Flora",
    "citesListing": "Not Listed",
    "estimatedWildPopulation": "< 250 wild individuals remaining in tiny isolated pockets",
    "traffickingCorridor": "Sindh Valley - Pir Panjal Riparian Edge",
    "traffickingRisk": "Moderate Risk",
    "effectivePopulationNe": "~35 reproductive plants",
    "inbreedingRisk": "Extreme Genetic Bottleneck & High Sterility",
    "projectedAltitudinalShift": "+80m upwards",
    "climateVulnerability": "Riparian Embankment Erosion and Flood Surges",
    "description": "An exceptionally rare, tall perennial herb with distinctive willow-like leaves, strictly endemic to Kashmir and adjacent Pir Panjal foothills. Contains specialized santonin and sesquiterpene lactones with potent anthelmintic and anti-inflammatory properties. Highly threatened by road-widening and flood control stone revetments along mountain stream banks.",
    "ecologicalRole": "Stream-Bank Riparian Specialist & Rare Herbaceous Endemic",
    "habitats": [
      "Riverine Valleys",
      "Broadleaf Forests"
    ],
    "elevationRange": {
      "min": 1800,
      "max": 2700
    },
    "districts": [
      "Ganderbal",
      "Srinagar",
      "Anantnag",
      "Muzaffarabad"
    ],
    "protectedAreas": [
      "Dachigam National Park",
      "Sindh Riparian Reserve"
    ],
    "threats": [
      "Stream-bank widening and concrete wall construction along Sindh river",
      "Intensive cattle grazing devouring tender shoots",
      "Severe natural seed sterility and pollinator limitation"
    ],
    "conservationMeasures": [
      "Dedicated ex-situ multiplication at University of Kashmir Botanical Garden",
      "Fencing of the last remaining natural wild patch in Sindh valley"
    ],
    "sensitivity": "critical",
    "verifiedSightings": 22,
    "conservationPriority": 10,
    "distributionPoints": [],
    "endemismStatus": "kashmir-endemic",
    "dataSource": {
      "type": "inventory",
      "reference": "University of Kashmir Centre for Biodiversity & Taxonomy 2024",
      "year": 2024,
      "verifiedBy": "Dept of Botany, Univ of Kashmir",
      "confidence": 99
    }
  },
  {
    "id": "thr-flr-11",
    "slug": "indian-gentian",
    "commonName": "Indian Gentian",
    "scientificName": "Gentiana kurroo",
    "localName": "Nilkanth / نیل کنٹھ",
    "taxonomicGroup": "medicinal-plants",
    "category": "Medicinal Flora",
    "conservationStatus": "CR",
    "nationalStatus": "Critically Endangered Botanical",
    "citesListing": "CITES Appendix II Candidate",
    "estimatedWildPopulation": "< 500 wild individuals surviving",
    "traffickingCorridor": "Pir Panjal Dry Slopes & Banihal South Transit",
    "traffickingRisk": "High Risk",
    "effectivePopulationNe": "~60 reproductive individuals",
    "inbreedingRisk": "Severe, Near Localized Extinction in Many Historic Sites",
    "projectedAltitudinalShift": "+110m upwards",
    "climateVulnerability": "Slope Grassland Desiccation and Wildfires",
    "description": "A small perennial herb with stunning sky-blue funnel-shaped flowers, endemic to dry grassy slopes of the North-Western Himalayas. Its root is a prized bitter tonic, febrifuge, and appetite stimulant in Ayurvedic and traditional medicine. Overharvesting has caused severe population extirpations across Jammu and Kashmir.",
    "ecologicalRole": "Dry Montane Grassland Specialist & Bumblebee Mutualist",
    "habitats": [
      "Alpine Meadows",
      "Oak Woodlands"
    ],
    "elevationRange": {
      "min": 1500,
      "max": 2800
    },
    "districts": [
      "Srinagar",
      "Anantnag",
      "Doda",
      "Ramban",
      "Udhampur",
      "Poonch",
      "Muzaffarabad"
    ],
    "protectedAreas": [
      "Dachigam National Park",
      "Ramnagar Wildlife Sanctuary"
    ],
    "threats": [
      "Over-collection of roots for traditional Ayurvedic bitters",
      "Frequent dry-season forest fires on southern mountain faces",
      "Conversion of sub-montane grasslands into stone quarries"
    ],
    "conservationMeasures": [
      "In-vitro propagation and reintroduction at SFRI Jammu",
      "Mapping of remaining refuge colonies in Doda and Ramban"
    ],
    "sensitivity": "critical",
    "verifiedSightings": 29,
    "conservationPriority": 10,
    "distributionPoints": [],
    "endemismStatus": "northwest-himalayan",
    "dataSource": {
      "type": "inventory",
      "reference": "BSI Endangered Flora of Western Himalayas 2024",
      "year": 2024,
      "verifiedBy": "Botanical Survey of India",
      "confidence": 97
    }
  },
  {
    "id": "thr-flr-12",
    "slug": "himalayan-fritillary",
    "commonName": "Himalayan Fritillary",
    "scientificName": "Fritillaria roylei",
    "localName": "Sheethkar / شیٖتھ کار",
    "taxonomicGroup": "medicinal-plants",
    "category": "Medicinal Flora",
    "conservationStatus": "VU",
    "nationalStatus": "Scheduled Medicinal Plant",
    "citesListing": "Not Listed",
    "estimatedWildPopulation": "Decline > 45% due to commercial bulb digging",
    "traffickingCorridor": "Sonamarg - Zojila - Kargil Alpine Axis",
    "traffickingRisk": "High Risk",
    "effectivePopulationNe": "~380 breeding colonies",
    "inbreedingRisk": "Moderate Bulb Isolation",
    "projectedAltitudinalShift": "+140m upwards",
    "climateVulnerability": "Early Snow Thaw Exposing Bulbs to Severe Frost Heaving",
    "description": "An elegant liliaceous herb bearing nodding yellowish-green bell flowers with purple chequered patterns. The bulb (known as 'Beimu' or Sheethkar) is widely used in cough syrups, asthma remedies, and expectorants. Traded at exorbitant rates in Chinese and South Asian herbal markets.",
    "ecologicalRole": "Subalpine Herbaceous Perennial & Early Spring Pollen Source",
    "habitats": [
      "Subalpine Forests",
      "Alpine Meadows"
    ],
    "elevationRange": {
      "min": 2500,
      "max": 4000
    },
    "districts": [
      "Ganderbal",
      "Baramulla",
      "Bandipora",
      "Anantnag",
      "Kupwara",
      "Kargil",
      "Neelum"
    ],
    "protectedAreas": [
      "Thajwas Wildlife Sanctuary",
      "Gulmarg Biosphere Reserve"
    ],
    "threats": [
      "Intensive unmonitored bulb digging during flowering period",
      "Grazing damage by nomadic livestock trampling delicate shoots",
      "Climate warming causing early shoot emergence susceptible to late frosts"
    ],
    "conservationMeasures": [
      "Standardization of agrotechnology for farmers in subalpine valleys",
      "Forest guard surveillance along high Sonamarg passes"
    ],
    "sensitivity": "high",
    "verifiedSightings": 72,
    "conservationPriority": 7,
    "distributionPoints": [],
    "endemismStatus": "himalayan-endemic",
    "dataSource": {
      "type": "inventory",
      "reference": "IUCN Medicinal Plant Specialist Group 2024",
      "year": 2024,
      "verifiedBy": "IUCN / CSIR-IIIM",
      "confidence": 94
    }
  },
  {
    "id": "thr-flr-13",
    "slug": "gaozaban-arnibia",
    "commonName": "Gaozaban (Ratanjot)",
    "scientificName": "Arnebia benthamii",
    "localName": "Kahzaban / کَہ زَبان (Ratanjot)",
    "taxonomicGroup": "medicinal-plants",
    "category": "Medicinal Flora",
    "conservationStatus": "EN",
    "nationalStatus": "Scheduled High-Altitude Botanical",
    "citesListing": "Not Listed",
    "estimatedWildPopulation": "Substantial contraction on alpine rocky slopes",
    "traffickingCorridor": "Gurez Valley - Bandipora Highway Axis",
    "traffickingRisk": "High Risk",
    "effectivePopulationNe": "~280 colonies",
    "inbreedingRisk": "High Inbreeding on Isolated High Ridges",
    "projectedAltitudinalShift": "+150m upwards",
    "climateVulnerability": "Desiccation of Subalpine Glades and Alpine Herbaceous Turf",
    "description": "A striking alpine perennial with a dense spike of purple-blue flowers and thick hairy leaves. Famous for its red-dye-yielding root (Ratanjot) and medicinal use in traditional tea ('Gaozaban') for cardiac ailments, bronchitis, and sore throats. Unsustainable uprooting has depleted natural wild stands.",
    "ecologicalRole": "Alpine Scree Soil-Binder & Bumblebee Floral Hub",
    "habitats": [
      "Alpine Meadows",
      "Rocky Scree & Cliffs"
    ],
    "elevationRange": {
      "min": 3000,
      "max": 4300
    },
    "districts": [
      "Bandipora",
      "Ganderbal",
      "Baramulla",
      "Anantnag",
      "Kupwara",
      "Kargil",
      "Leh",
      "Astore"
    ],
    "protectedAreas": [
      "Thajwas Wildlife Sanctuary",
      "Overa-Aru Wildlife Sanctuary"
    ],
    "threats": [
      "Destructive extraction of roots for commercial red dye and herbal remedies",
      "Heavy trampling by commercial tourist horse trekking caravans",
      "Soil erosion on steep alpine scree slopes"
    ],
    "conservationMeasures": [
      "Establishment of alpine herbal gene banks in Razdan Pass",
      "Agronomic protocol development by SKUAST-K"
    ],
    "sensitivity": "high",
    "verifiedSightings": 65,
    "conservationPriority": 8,
    "distributionPoints": [],
    "endemismStatus": "himalayan-endemic",
    "dataSource": {
      "type": "monitoring",
      "reference": "SKUAST-K Herbal Research Group Bulletin 2024",
      "year": 2024,
      "verifiedBy": "SKUAST-Kashmir",
      "confidence": 95
    }
  },
  {
    "id": "thr-flr-14",
    "slug": "himalayan-blue-poppy",
    "commonName": "Himalayan Blue Poppy",
    "scientificName": "Meconopsis aculeata",
    "localName": "Gul-e-Neel / گُلِ نیل",
    "taxonomicGroup": "plants",
    "category": "Alpine Wildflower",
    "conservationStatus": "EN",
    "nationalStatus": "Protected High-Altitude Flora",
    "citesListing": "Not Listed",
    "estimatedWildPopulation": "Rare and fragmented across scree slopes",
    "traffickingCorridor": "High Alpine Passes (Apharwat - Kolahoi - Zojila)",
    "traffickingRisk": "Moderate Risk",
    "effectivePopulationNe": "~310 colonies",
    "inbreedingRisk": "High Isolation on Remote Scree Summits",
    "projectedAltitudinalShift": "+180m upwards",
    "climateVulnerability": "Loss of Permafrost Moisture on South-Facing Slopes",
    "description": "The celebrated 'Queen of Himalayan Wildflowers', recognized by exquisite translucent sky-blue petals and a prickly thistle-like stem. Inhabits boulder-strewn alpine scree and rock fissures above 3,500m. Highly sought after by commercial botanists and flower pluckers.",
    "ecologicalRole": "High Scree Pioneer Colonizer & Pollinator Flagship",
    "habitats": [
      "Alpine Meadows",
      "Rocky Scree & Cliffs",
      "Glacial Moraines"
    ],
    "elevationRange": {
      "min": 3500,
      "max": 4600
    },
    "districts": [
      "Baramulla",
      "Ganderbal",
      "Anantnag",
      "Bandipora",
      "Kishtwar",
      "Kargil"
    ],
    "protectedAreas": [
      "Gulmarg Biosphere Reserve",
      "Overa-Aru Wildlife Sanctuary",
      "Thajwas Wildlife Sanctuary"
    ],
    "threats": [
      "Indiscriminate plucking by tourists and mountaineers",
      "Alpine pasture overgrazing by horses and sheep",
      "Accelerated glacier melting causing severe rockfalls"
    ],
    "conservationMeasures": [
      "Prohibition of wildflower picking in Gulmarg and Apharwat alpine trails",
      "Botanical signboards educating high-altitude trekkers"
    ],
    "sensitivity": "high",
    "verifiedSightings": 47,
    "conservationPriority": 8,
    "distributionPoints": [],
    "endemismStatus": "himalayan-endemic",
    "dataSource": {
      "type": "inventory",
      "reference": "Botanical Survey of India Alpine Flora Assessment 2024",
      "year": 2024,
      "verifiedBy": "BSI Northern Regional Centre",
      "confidence": 94
    }
  },
  {
    "id": "thr-flr-15",
    "slug": "chora-angelica",
    "commonName": "Chora (White Angelica)",
    "scientificName": "Angelica glauca",
    "localName": "Chora / چورا",
    "taxonomicGroup": "medicinal-plants",
    "category": "Medicinal Flora",
    "conservationStatus": "EN",
    "nationalStatus": "Scheduled Aromatic Flora",
    "citesListing": "Not Listed",
    "estimatedWildPopulation": "Decline > 50% across subalpine forest glades",
    "traffickingCorridor": "Kishtwar - Paddar - Himachal Highland Transit",
    "traffickingRisk": "High Risk",
    "effectivePopulationNe": "~320 wild colonies",
    "inbreedingRisk": "Moderate Inbreeding",
    "projectedAltitudinalShift": "+120m upwards",
    "climateVulnerability": "Decline of Moist Deep-Humus Subalpine Glades",
    "description": "A tall aromatic umbellifer with glaucous stems and broad umbels of white flowers. Its intensely fragrant roots are used extensively as a spice ('Chora') in mountain communities and as a digestive stimulant and cardio-protective in herbal medicine.",
    "ecologicalRole": "Subalpine Moisture Indicator & Diverse Pollinator Attractor",
    "habitats": [
      "Subalpine Forests",
      "Alpine Meadows"
    ],
    "elevationRange": {
      "min": 2500,
      "max": 3700
    },
    "districts": [
      "Kishtwar",
      "Doda",
      "Anantnag",
      "Baramulla",
      "Kupwara",
      "Neelum"
    ],
    "protectedAreas": [
      "Kishtwar High Altitude National Park",
      "Overa-Aru Wildlife Sanctuary"
    ],
    "threats": [
      "Unregulated digging of aromatic roots for commercial seasoning and condiments",
      "Soil erosion along timber extraction routes",
      "Livestock grazing devouring developing seed umbels"
    ],
    "conservationMeasures": [
      "Subalpine farmer cultivation schemes in Paddar and Marwah",
      "Wild harvesting moratoriums across territorial forest divisions"
    ],
    "sensitivity": "high",
    "verifiedSightings": 56,
    "conservationPriority": 8,
    "distributionPoints": [],
    "endemismStatus": "himalayan-endemic",
    "dataSource": {
      "type": "inventory",
      "reference": "IUCN Medicinal Plant Red List 2024",
      "year": 2024,
      "verifiedBy": "IUCN / CSIR-IIIM",
      "confidence": 93
    }
  },
  {
    "id": "thr-flr-16",
    "slug": "himalayan-rhubarb",
    "commonName": "Himalayan Rhubarb",
    "scientificName": "Rheum australe",
    "localName": "Pambchalan / پامٛب چالان",
    "taxonomicGroup": "medicinal-plants",
    "category": "Medicinal Flora",
    "conservationStatus": "VU",
    "nationalStatus": "Protected High-Altitude Botanical",
    "citesListing": "Not Listed",
    "estimatedWildPopulation": "Marked decline on rocky subalpine scree slopes",
    "traffickingCorridor": "Sinthan Top - Banihal Mountain Routes",
    "traffickingRisk": "Moderate Risk",
    "effectivePopulationNe": "~420 colonies",
    "inbreedingRisk": "Moderate Isolation",
    "projectedAltitudinalShift": "+130m upwards",
    "climateVulnerability": "Early Summer Droughts Shrivelling Broad Basal Leaves",
    "description": "A robust perennial herb bearing massive leathery basal leaves and striking dark purple flowering spikes. Its thick rootstocks contain valuable anthraquinones (emodin, chrysophanol) used as a natural purgative, wound-healer, and dyeing agent across the Himalayas.",
    "ecologicalRole": "Alpine Scree Soil-Binder & Rock Weathering Agent",
    "habitats": [
      "Rocky Scree & Cliffs",
      "Alpine Meadows"
    ],
    "elevationRange": {
      "min": 2800,
      "max": 4400
    },
    "districts": [
      "Anantnag",
      "Ganderbal",
      "Baramulla",
      "Kupwara",
      "Kishtwar",
      "Doda",
      "Kargil",
      "Neelum"
    ],
    "protectedAreas": [
      "Overa-Aru Wildlife Sanctuary",
      "Thajwas Wildlife Sanctuary"
    ],
    "threats": [
      "Destructive extraction of subterranean rootstocks for commercial dyes and laxatives",
      "Soil compaction from heavy horse trekking traffic",
      "Seed predation by rodents in late autumn"
    ],
    "conservationMeasures": [
      "Establishment of germplasm reserves in high passes",
      "Sustainable collection training for local Gujjar cooperatives"
    ],
    "sensitivity": "medium",
    "verifiedSightings": 79,
    "conservationPriority": 7,
    "distributionPoints": [],
    "endemismStatus": "himalayan-endemic",
    "dataSource": {
      "type": "monitoring",
      "reference": "BSI & SKUAST-K Medicinal Plant Survey 2024",
      "year": 2024,
      "verifiedBy": "BSI",
      "confidence": 95
    }
  },
  {
    "id": "thr-flr-17",
    "slug": "black-cumin-zeera-siyah",
    "commonName": "Black Cumin (Zeera Siyah)",
    "scientificName": "Bunium persicum",
    "localName": "Zeur / زێوُر (Kala Zeera)",
    "taxonomicGroup": "medicinal-plants",
    "category": "Aromatic Flora",
    "conservationStatus": "VU",
    "nationalStatus": "Scheduled High-Value Forest Produce",
    "citesListing": "Not Listed",
    "estimatedWildPopulation": "Severe wild decline due to commercial over-collection",
    "traffickingCorridor": "Gurez Valley - Kishtwar - Drass Transit Axis",
    "traffickingRisk": "High Risk",
    "effectivePopulationNe": "~500 wild micro-stands",
    "inbreedingRisk": "High Wild Stand Depletion",
    "projectedAltitudinalShift": "+100m upwards",
    "climateVulnerability": "Winter Snow Scarcity Causing Seed Desiccation",
    "description": "A delicate umbelliferous herb that produces the world-renowned, intensely fragrant 'Kala Zeera' (Kashmiri black cumin). Highly prized in gourmet culinary traditions and traditional medicine for carminative and metabolic health. Over-collection of seeds before self-sowing has depleted wild stands.",
    "ecologicalRole": "Montane Steppe Herb & Specialized Pollinator Attractor",
    "habitats": [
      "Oak Woodlands",
      "Subalpine Forests",
      "Temperate Coniferous Forests"
    ],
    "elevationRange": {
      "min": 1800,
      "max": 3200
    },
    "districts": [
      "Bandipora",
      "Kishtwar",
      "Pulwama",
      "Srinagar",
      "Kargil",
      "Astore",
      "Diamer"
    ],
    "protectedAreas": [
      "Gurez Valley Conservation Zone",
      "Paddar Valley Forest Reserve"
    ],
    "threats": [
      "Exhaustive collection of ripe seed umbels leaving zero seeds for natural regeneration",
      "Cattle trampling shallow tuber bulbs in stony soils",
      "Conversion of dry montane grasslands into orchards"
    ],
    "conservationMeasures": [
      "Farmer domestication and commercial cultivation programs by SKUAST-K in Gurez and Kishtwar",
      "Rotation-based wild seed collection protocols"
    ],
    "sensitivity": "high",
    "verifiedSightings": 83,
    "conservationPriority": 7,
    "distributionPoints": [],
    "endemismStatus": "northwest-himalayan",
    "dataSource": {
      "type": "monitoring",
      "reference": "SKUAST-K Kala Zeera Research Station Gurez 2024",
      "year": 2024,
      "verifiedBy": "SKUAST-Kashmir",
      "confidence": 96
    }
  },
  {
    "id": "thr-flr-18",
    "slug": "himalayan-elm-bren",
    "commonName": "Himalayan Elm",
    "scientificName": "Ulmus wallichiana",
    "localName": "Bren / برین",
    "taxonomicGroup": "plants",
    "category": "Deciduous Tree",
    "conservationStatus": "VU",
    "nationalStatus": "Protected Heritage Tree of Kashmir",
    "citesListing": "Not Listed",
    "estimatedWildPopulation": "< 2,000 mature trees remaining in the wild",
    "traffickingCorridor": "Kashmir Valley Rural Roads & Forest Encroachment Fringes",
    "traffickingRisk": "Moderate Risk",
    "effectivePopulationNe": "~450 mature reproductive trees",
    "inbreedingRisk": "High Stand Disconnection",
    "projectedAltitudinalShift": "+80m upwards",
    "climateVulnerability": "Prolonged Summer Droughts and Bark Beetle Infestations",
    "description": "A majestic broadleaf deciduous tree with fissured grey bark and large serrated leaves, revered across Kashmir and frequently planted near Sufi shrines and rural water springs. Severely depleted in wild forests due to relentless lopping for winter livestock fodder and felling for agricultural implements.",
    "ecologicalRole": "Canopy Climax Species & Essential Riparian Soil Anchor",
    "habitats": [
      "Broadleaf Forests",
      "Riverine Valleys"
    ],
    "elevationRange": {
      "min": 1600,
      "max": 2800
    },
    "districts": [
      "Srinagar",
      "Ganderbal",
      "Budgam",
      "Baramulla",
      "Kupwara",
      "Anantnag",
      "Pulwama",
      "Shopian",
      "Doda",
      "Muzaffarabad"
    ],
    "protectedAreas": [
      "Dachigam National Park",
      "Overa-Aru Wildlife Sanctuary"
    ],
    "threats": [
      "Severe lopping of branches for cattle fodder preventing flowering and seed formation",
      "Conversion of riparian elm groves for road expansions and rural housing",
      "Dutch elm disease susceptibility and wood-boring beetle attacks"
    ],
    "conservationMeasures": [
      "Designation of ancient shrine elms as Protected Heritage Trees",
      "Mass plantation of saplings by J&K Forest Department in degraded river catchments"
    ],
    "sensitivity": "medium",
    "verifiedSightings": 110,
    "conservationPriority": 7,
    "distributionPoints": [],
    "endemismStatus": "himalayan-endemic",
    "dataSource": {
      "type": "inventory",
      "reference": "J&K Department of Ecology, Environment & Remote Sensing 2024",
      "year": 2024,
      "verifiedBy": "DEERS J&K",
      "confidence": 95
    }
  },
  {
    "id": "thr-flr-19",
    "slug": "chilgoza-pine",
    "commonName": "Chilgoza Pine",
    "scientificName": "Pinus gerardiana",
    "localName": "Chilgoza / چلغوزہ (Neoza)",
    "taxonomicGroup": "plants",
    "category": "Coniferous Tree",
    "conservationStatus": "NT",
    "nationalStatus": "Protected Economic Conifer",
    "citesListing": "Not Listed",
    "estimatedWildPopulation": "Wild natural regeneration severely hampered by cone harvesting",
    "traffickingCorridor": "Kishtwar - Paddar - Himachal & Gilgit-Baltistan Transit",
    "traffickingRisk": "High Risk",
    "effectivePopulationNe": "~800 mature stands",
    "inbreedingRisk": "Moderate, Continuous Valley Corridors",
    "projectedAltitudinalShift": "+110m upwards into inner dry valleys",
    "climateVulnerability": "Severe Drought in Inner Dry Himalayan Rain-Shadow Valleys",
    "description": "An extraordinary pine adapted to dry, temperate inner Himalayan valleys with flaky, mottled bark and three-needle fascicles. Produces the highly valuable edible pine nut ('Chilgoza'). Almost 100% of mature seed cones are harvested by humans, leaving near zero seeds for natural wild seedling recruitment.",
    "ecologicalRole": "Rain-Shadow Valley Climax Conifer & Seed Producer for Nutcrackers",
    "habitats": [
      "Temperate Coniferous Forests",
      "Rocky Scree & Cliffs"
    ],
    "elevationRange": {
      "min": 1800,
      "max": 3200
    },
    "districts": [
      "Kishtwar",
      "Doda",
      "Diamer",
      "Gilgit",
      "Astore"
    ],
    "protectedAreas": [
      "Paddar Forest Reserve",
      "Kishtwar High Altitude National Park"
    ],
    "threats": [
      "Complete commercial stripping of cones by local contractors leaving zero seed rain",
      "Illegal felling for timber and resin-rich firewood",
      "Forest fires during dry autumn periods incinerating young seedlings"
    ],
    "conservationMeasures": [
      "Implementation of cone harvesting quotas reserving 30% of cones for wildlife and regeneration",
      "Establishment of community-managed Chilgoza enclosures in Paddar"
    ],
    "sensitivity": "high",
    "verifiedSightings": 74,
    "conservationPriority": 7,
    "distributionPoints": [],
    "endemismStatus": "northwest-himalayan",
    "dataSource": {
      "type": "monitoring",
      "reference": "State Forest Research Institute (SFRI) Chilgoza Assessment 2024",
      "year": 2024,
      "verifiedBy": "SFRI J&K",
      "confidence": 94
    }
  },
  {
    "id": "thr-flr-20",
    "slug": "himalayan-birch-burza",
    "commonName": "Himalayan Birch",
    "scientificName": "Betula utilis",
    "localName": "Burza / بُرزٕ",
    "taxonomicGroup": "plants",
    "category": "Subalpine Tree",
    "conservationStatus": "NT",
    "nationalStatus": "Protected Alpine Treeline Anchor",
    "citesListing": "Not Listed",
    "estimatedWildPopulation": "Upper treeline under severe pressure from timber and pastoral fires",
    "traffickingCorridor": "Subalpine Treeline across All High Mountain Ranges",
    "traffickingRisk": "Moderate Risk",
    "effectivePopulationNe": "Broad Treeline Continuous Canopy",
    "inbreedingRisk": "Low, High Wind-Pollination",
    "projectedAltitudinalShift": "+160m upwards towards retreating snowline",
    "climateVulnerability": "Treeline Retreat and Reduced Snow Cover Causing Freeze-Thaw Bark Damage",
    "description": "The iconic, white-barked deciduous tree forming the highest timberline in the Himalayas up to 4,200m. Its multi-layered, papery bark ('Bhojpatra' or 'Burza') was used for thousands of years as writing parchment for Sanskrit and Kashmiri manuscripts. Essential for anchoring loose moraines and shielding valley watersheds from flash avalanches.",
    "ecologicalRole": "Highest Alpine Timberline Canopy Climax & Avalanche Buffer",
    "habitats": [
      "Subalpine Forests",
      "Alpine Meadows"
    ],
    "elevationRange": {
      "min": 2800,
      "max": 4200
    },
    "districts": [
      "Srinagar",
      "Ganderbal",
      "Baramulla",
      "Kupwara",
      "Bandipora",
      "Anantnag",
      "Kishtwar",
      "Doda",
      "Kargil",
      "Leh",
      "Neelum",
      "Gilgit",
      "Astore"
    ],
    "protectedAreas": [
      "Dachigam National Park",
      "Overa-Aru Wildlife Sanctuary",
      "Thajwas Wildlife Sanctuary",
      "Kishtwar High Altitude National Park",
      "Hemis National Park"
    ],
    "threats": [
      "Extensive felling for firewood by high-altitude pastoralists and tourist trekking camps",
      "Avalanche corridors widened by commercial clearing",
      "Heavy peeling of bark for packaging and handicraft souvenirs"
    ],
    "conservationMeasures": [
      "Strict prohibition of birch firewood in trekking national parks",
      "Provision of subsidized LPG and solar cookers to alpine nomadic herders"
    ],
    "sensitivity": "medium",
    "verifiedSightings": 240,
    "conservationPriority": 6,
    "distributionPoints": [],
    "endemismStatus": "himalayan-endemic",
    "dataSource": {
      "type": "monitoring",
      "reference": "State Forest Research Institute Alpine Treeline Monitoring 2024",
      "year": 2024,
      "verifiedBy": "SFRI J&K",
      "confidence": 96
    }
  }
];
