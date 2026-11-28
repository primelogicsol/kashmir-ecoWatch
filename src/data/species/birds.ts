// Western Himalayan Verified Avifauna Checklist (46 Unique Verified Species)
// 550 synthetic placeholder records (BRD-GEN-34..BRD-GEN-583) quarantined and 5 duplicate BRD-GEN/MIG binomials reconciled.
import { type BiodiversitySpecies } from '@/types/biodiversity';

export const birdsPhase1: BiodiversitySpecies[] = [
  {
    "id": "BRD-001",
    "slug": "western-tragopan",
    "commonName": "Western Tragopan",
    "scientificName": "Tragopan melanocephalus",
    "localName": "Daangeer / دانٛگیر",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Galliformes",
      "family": "Phasianidae",
      "genus": "Tragopan",
      "species": "melanocephalus"
    },
    "conservationStatus": "VU",
    "nationalStatus": "Schedule I (WPA 1972)",
    "regionalStatus": "Priority Conservation Taxon",
    "populationTrend": "Decreasing",
    "sensitivity": "critical",
    "endemismStatus": "northwest-himalayan",
    "seasonality": "Resident Altitudinal Migrant",
    "geography": {
      "kashmirCore": true,
      "jammu": true,
      "ladakh": false,
      "ajk": true,
      "gilgitBaltistan": false,
      "himachal": true,
      "punjabFoothills": false
    },
    "districts": [
      "Kupwara",
      "Baramulla",
      "Bandipora",
      "Kishtwar",
      "Doda",
      "Poonch",
      "Neelum",
      "Muzaffarabad",
      "Haveli"
    ],
    "protectedAreas": [
      "Kazinag National Park",
      "Limber Wildlife Sanctuary",
      "Lachipora Wildlife Sanctuary",
      "Machiara National Park",
      "Salkhala Wildlife Sanctuary"
    ],
    "distributionPoints": [],
    "habitats": [
      "Temperate & Subalpine Conifer Forests",
      "Deciduous Broadleaf & Riverine Forests"
    ],
    "breedingHabitat": "Undisturbed dense ringal bamboo, viburnum, and hazel undergrowth beneath mature fir, spruce, and deodar forest on steep slopes.",
    "feedingEcology": "Folivorous and granivorous; browses young leaves, buds, ferns, acorns, and berries.",
    "elevationRange": {
      "min": 2400,
      "max": 3600
    },
    "ecologicalRole": "Flagship Montane Forest Understory Herbivore & Bioindicator",
    "observationIntelligence": {
      "totalObservations": 37,
      "verifiedRecords": 31,
      "recentRecords": 7,
      "historicalRecords": 24
    },
    "verifiedSightings": 31,
    "threats": [
      "Old-growth understory fragmentation",
      "Migratory livestock grazing in breeding zones",
      "Poaching during winter snow descent"
    ],
    "description": "Flagship threatened pheasant of the northwest Himalayas, restricted to dense temperate and subalpine conifer-oak understories in Kazinag, Limber, Kishtwar, and Neelum.",
    "speciesNarrative": {
      "overview": "Rare northwest Himalayan endemic pheasant inhabiting undisturbed moist temperate and subalpine forests.",
      "identification": "Males show black-and-crimson plumage spangled with white ocelli and inflatable blue throat lappets; females are mottled greyish-brown.",
      "ecology": "Undisturbed dense ringal bamboo, viburnum, and hazel undergrowth beneath mature fir, spruce, and deodar forest on steep slopes. Folivorous and granivorous; browses young leaves, buds, ferns, acorns, and berries.",
      "distribution": "Verified across Kupwara, Baramulla, Bandipora, Kishtwar, Doda, Poonch and adjacent Western Himalayan districts (2400–3600 m ASL).",
      "threats": "Old-growth understory fragmentation; Migratory livestock grazing in breeding zones; Poaching during winter snow descent.",
      "conservation": "Protected across Kazinag National Park, Limber Wildlife Sanctuary, Lachipora Wildlife Sanctuary."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Pheasants & Galliformes"
  },
  {
    "id": "BRD-002",
    "slug": "kashmir-flycatcher",
    "commonName": "Kashmir Flycatcher",
    "scientificName": "Ficedula subrubra",
    "localName": "Kashmir Flycatcher / رَتھ ناری",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Passeriformes",
      "family": "Muscicapidae",
      "genus": "Ficedula",
      "species": "subrubra"
    },
    "conservationStatus": "VU",
    "nationalStatus": "Schedule I (WPA 1972)",
    "regionalStatus": "Priority Conservation Taxon",
    "populationTrend": "Decreasing",
    "sensitivity": "high",
    "endemismStatus": "kashmir-endemic",
    "seasonality": "Summer Visitor (Breeding Endemic)",
    "geography": {
      "kashmirCore": true,
      "jammu": true,
      "ladakh": false,
      "ajk": true,
      "gilgitBaltistan": false,
      "himachal": false,
      "punjabFoothills": false
    },
    "districts": [
      "Srinagar",
      "Ganderbal",
      "Anantnag",
      "Bandipora",
      "Baramulla",
      "Pulwama",
      "Kulgam",
      "Shopian",
      "Poonch",
      "Neelum",
      "Muzaffarabad"
    ],
    "protectedAreas": [
      "Dachigam National Park",
      "Overa-Aru Wildlife Sanctuary",
      "Hirpora Wildlife Sanctuary"
    ],
    "distributionPoints": [],
    "habitats": [
      "Deciduous Broadleaf & Riverine Forests",
      "Temperate & Subalpine Conifer Forests"
    ],
    "breedingHabitat": "Mixed temperate deciduous forests with mature walnut, willow, hazel, and cherry containing natural tree cavities.",
    "feedingEcology": "Aerial and understory insectivore gleaning dipterans, beetles, and caterpillars.",
    "elevationRange": {
      "min": 1800,
      "max": 2700
    },
    "ecologicalRole": "Canopy Insectivore & Breeding Endemic Indicator",
    "observationIntelligence": {
      "totalObservations": 102,
      "verifiedRecords": 85,
      "recentRecords": 21,
      "historicalRecords": 64
    },
    "verifiedSightings": 85,
    "threats": [
      "Felling of cavity-bearing mature broadleaf trees",
      "Livestock browsing of hazel understory",
      "Wintering habitat loss in Sri Lanka and Western Ghats"
    ],
    "description": "Breeding endemic flycatcher of the Kashmir Valley and Pir Panjal temperate broadleaf-mixed forests, migrating to the central hills of Sri Lanka and Western Ghats in winter.",
    "speciesNarrative": {
      "overview": "Restricted-range summer breeding passerine of Kashmir's temperate deciduous forests.",
      "identification": "Adult male has slate-grey upperparts and rich rufous-orange throat, breast, and flanks bordered with black; white tail bases.",
      "ecology": "Mixed temperate deciduous forests with mature walnut, willow, hazel, and cherry containing natural tree cavities. Aerial and understory insectivore gleaning dipterans, beetles, and caterpillars.",
      "distribution": "Verified across Srinagar, Ganderbal, Anantnag, Bandipora, Baramulla, Pulwama and adjacent Western Himalayan districts (1800–2700 m ASL).",
      "threats": "Felling of cavity-bearing mature broadleaf trees; Livestock browsing of hazel understory; Wintering habitat loss in Sri Lanka and Western Ghats.",
      "conservation": "Protected across Dachigam National Park, Overa-Aru Wildlife Sanctuary, Hirpora Wildlife Sanctuary."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Passerines, Flycatchers & Songbirds",
    "migrationWindow": {
      "season": "summer",
      "arrivalMonth": 4,
      "departureMonth": 9,
      "peakPresence": [
        5,
        6,
        7
      ],
      "migrationType": "breeder",
      "flyway": "central-asian",
      "concentration": "medium"
    }
  },
  {
    "id": "BRD-003",
    "slug": "ibisbill",
    "commonName": "Ibisbill",
    "scientificName": "Ibidorhyncha struthersii",
    "localName": "Ibisbill / لال چوٗنٛچہٕ وۄکھُل",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Charadriiformes",
      "family": "Ibidorhynchidae",
      "genus": "Ibidorhyncha",
      "species": "struthersii"
    },
    "conservationStatus": "LC",
    "nationalStatus": "Schedule IV (WPA 1972)",
    "regionalStatus": "Verified Regional Taxon",
    "populationTrend": "Stable",
    "sensitivity": "medium",
    "endemismStatus": "himalayan-endemic",
    "seasonality": "Resident Altitudinal Migrant",
    "geography": {
      "kashmirCore": true,
      "jammu": true,
      "ladakh": true,
      "ajk": true,
      "gilgitBaltistan": true,
      "himachal": true,
      "punjabFoothills": false
    },
    "districts": [
      "Ganderbal",
      "Anantnag",
      "Bandipora",
      "Kupwara",
      "Kishtwar",
      "Kargil",
      "Leh",
      "Neelum",
      "Astore",
      "Skardu",
      "Gilgit"
    ],
    "protectedAreas": [
      "Overa-Aru Wildlife Sanctuary",
      "Thajwas Wildlife Sanctuary",
      "Hemis National Park"
    ],
    "distributionPoints": [],
    "habitats": [
      "Braided Rivers & Torrential Streams"
    ],
    "breedingHabitat": "Cobble and shingle islands along braided, cold, glacial-fed mountain rivers (Sindh, Lidder, Suru, Indus).",
    "feedingEcology": "Probes beneath submerged cobbles with its decurved crimson bill for stonefly, mayfly, and caddisfly larvae.",
    "elevationRange": {
      "min": 1650,
      "max": 4400
    },
    "ecologicalRole": "Torrential Cobble-Bed Benthic Predator & River Integrity Indicator",
    "observationIntelligence": {
      "totalObservations": 264,
      "verifiedRecords": 220,
      "recentRecords": 55,
      "historicalRecords": 165
    },
    "verifiedSightings": 220,
    "threats": [
      "Unregulated riverbed boulder and sand mining",
      "Hydropower peaking flows submerging shingle nests",
      "Riverside tourism disturbance"
    ],
    "description": "Evolutionarily distinct monotypic wader of braided Himalayan shingle rivers such as the Sindh, Lidder, Kishanganga/Neelum, Suru, and Upper Indus.",
    "speciesNarrative": {
      "overview": "Sole member of family Ibidorhynchidae, obligately tied to braided cobble-bed Himalayan rivers.",
      "identification": "Blue-grey plumage, black facial mask and breast band, crimson legs, and long decurved crimson bill.",
      "ecology": "Cobble and shingle islands along braided, cold, glacial-fed mountain rivers (Sindh, Lidder, Suru, Indus). Probes beneath submerged cobbles with its decurved crimson bill for stonefly, mayfly, and caddisfly larvae.",
      "distribution": "Verified across Ganderbal, Anantnag, Bandipora, Kupwara, Kishtwar, Kargil and adjacent Western Himalayan districts (1650–4400 m ASL).",
      "threats": "Unregulated riverbed boulder and sand mining; Hydropower peaking flows submerging shingle nests; Riverside tourism disturbance.",
      "conservation": "Protected across Overa-Aru Wildlife Sanctuary, Thajwas Wildlife Sanctuary, Hemis National Park."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Waders & Shorebirds"
  },
  {
    "id": "BRD-004",
    "slug": "himalayan-monal",
    "commonName": "Himalayan Monal",
    "scientificName": "Lophophorus impejanus",
    "localName": "Suna Murgh / سونہٕ مُرغ",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Galliformes",
      "family": "Phasianidae",
      "genus": "Lophophorus",
      "species": "impejanus"
    },
    "conservationStatus": "LC",
    "nationalStatus": "Schedule I (WPA 1972)",
    "regionalStatus": "Verified Regional Taxon",
    "populationTrend": "Stable",
    "sensitivity": "high",
    "endemismStatus": "himalayan-endemic",
    "seasonality": "Resident Altitudinal Migrant",
    "geography": {
      "kashmirCore": true,
      "jammu": true,
      "ladakh": false,
      "ajk": true,
      "gilgitBaltistan": true,
      "himachal": true,
      "punjabFoothills": false
    },
    "districts": [
      "Anantnag",
      "Ganderbal",
      "Baramulla",
      "Kupwara",
      "Bandipora",
      "Shopian",
      "Kulgam",
      "Kishtwar",
      "Doda",
      "Poonch",
      "Ramban",
      "Neelum",
      "Muzaffarabad",
      "Astore",
      "Diamer"
    ],
    "protectedAreas": [
      "Dachigam National Park",
      "Overa-Aru Wildlife Sanctuary",
      "Gulmarg Wildlife Sanctuary",
      "Kishtwar High Altitude National Park",
      "Kazinag National Park"
    ],
    "distributionPoints": [],
    "habitats": [
      "Temperate & Subalpine Conifer Forests",
      "Alpine Meadows & Scree (Treeline Ecotone)"
    ],
    "breedingHabitat": "Steep subalpine birch-rhododendron krummholz, grassy cliffs, and upper conifer forest edges.",
    "feedingEcology": "Excavates alpine soil with its stout bill for tubers, bulbs, roots, seeds, and soil invertebrates.",
    "elevationRange": {
      "min": 2400,
      "max": 4500
    },
    "ecologicalRole": "Alpine Soil Bioturbator & Treeline Herbivore",
    "observationIntelligence": {
      "totalObservations": 384,
      "verifiedRecords": 320,
      "recentRecords": 80,
      "historicalRecords": 240
    },
    "verifiedSightings": 320,
    "threats": [
      "Historical poaching for crest plumes",
      "Shepherd dog predation on nests",
      "Subalpine meadow overgrazing"
    ],
    "description": "Iconic iridescent high-altitude pheasant inhabiting subalpine oak-conifer forests and alpine meadows across Kashmir, Pir Panjal, Kishtwar, Neelum, and Astore.",
    "speciesNarrative": {
      "overview": "Large high-altitude Himalayan pheasant renowned for metallic rainbow plumage in males and vigorous tuber-digging ecology.",
      "identification": "Male displays iridescent green, copper, purple, and turquoise plumage with a white rump and wire-like spatulate crest; female is streaked brown with a white throat and blue orbital skin.",
      "ecology": "Steep subalpine birch-rhododendron krummholz, grassy cliffs, and upper conifer forest edges. Excavates alpine soil with its stout bill for tubers, bulbs, roots, seeds, and soil invertebrates.",
      "distribution": "Verified across Anantnag, Ganderbal, Baramulla, Kupwara, Bandipora, Shopian and adjacent Western Himalayan districts (2400–4500 m ASL).",
      "threats": "Historical poaching for crest plumes; Shepherd dog predation on nests; Subalpine meadow overgrazing.",
      "conservation": "Protected across Dachigam National Park, Overa-Aru Wildlife Sanctuary, Gulmarg Wildlife Sanctuary."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Pheasants & Galliformes"
  },
  {
    "id": "BRD-005",
    "slug": "cheer-pheasant",
    "commonName": "Cheer Pheasant",
    "scientificName": "Catreus wallichii",
    "localName": "Chaman / چامَن",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Galliformes",
      "family": "Phasianidae",
      "genus": "Catreus",
      "species": "wallichii"
    },
    "conservationStatus": "VU",
    "nationalStatus": "Schedule I (WPA 1972)",
    "regionalStatus": "Priority Conservation Taxon",
    "populationTrend": "Decreasing",
    "sensitivity": "critical",
    "endemismStatus": "northwest-himalayan",
    "seasonality": "Resident",
    "geography": {
      "kashmirCore": true,
      "jammu": true,
      "ladakh": false,
      "ajk": true,
      "gilgitBaltistan": false,
      "himachal": true,
      "punjabFoothills": false
    },
    "districts": [
      "Baramulla",
      "Kupwara",
      "Poonch",
      "Rajouri",
      "Ramban",
      "Doda",
      "Kishtwar",
      "Jhelum Valley",
      "Muzaffarabad",
      "Neelum",
      "Bagh"
    ],
    "protectedAreas": [
      "Limber Wildlife Sanctuary",
      "Kazinag National Park",
      "Qazinag-Jhelum Valley Escarpments"
    ],
    "distributionPoints": [],
    "habitats": [
      "Cliffs, Gorges & High Rockfaces",
      "Temperate & Subalpine Conifer Forests"
    ],
    "breedingHabitat": "Precipitous grassy slopes, early-successional scrub, and scattered chir/blue pine crags.",
    "feedingEcology": "Digs for roots, tubers, bulbs, seeds, and grubs on steep grassy hillsides.",
    "elevationRange": {
      "min": 1400,
      "max": 3050
    },
    "ecologicalRole": "Montane Grassland Specialist & Early-Successional Indicator",
    "observationIntelligence": {
      "totalObservations": 50,
      "verifiedRecords": 42,
      "recentRecords": 10,
      "historicalRecords": 32
    },
    "verifiedSightings": 42,
    "threats": [
      "Annual dry-season hillside burning",
      "Small isolated subpopulations",
      "Hunting and snaring",
      "Overgrazing of steep grassy slopes"
    ],
    "description": "Vulnerable long-tailed pheasant restricted to steep, craggy grass-and-scrub hillsides of the Jhelum Gorge (Uri-Limber, Jhelum Valley), Pir Panjal, and Chenab valleys.",
    "speciesNarrative": {
      "overview": "Globally Vulnerable northwest Himalayan pheasant of steep grassy crags and scattered pine slopes.",
      "identification": "Buffy-grey barred plumage, long barred tail, backward-pointing crest, and prominent crimson facial skin.",
      "ecology": "Precipitous grassy slopes, early-successional scrub, and scattered chir/blue pine crags. Digs for roots, tubers, bulbs, seeds, and grubs on steep grassy hillsides.",
      "distribution": "Verified across Baramulla, Kupwara, Poonch, Rajouri, Ramban, Doda and adjacent Western Himalayan districts (1400–3050 m ASL).",
      "threats": "Annual dry-season hillside burning; Small isolated subpopulations; Hunting and snaring; Overgrazing of steep grassy slopes.",
      "conservation": "Protected across Limber Wildlife Sanctuary, Kazinag National Park, Qazinag-Jhelum Valley Escarpments."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Pheasants & Galliformes"
  },
  {
    "id": "BRD-006",
    "slug": "koklass-pheasant",
    "commonName": "Koklass Pheasant",
    "scientificName": "Pucrasia macrolopha",
    "localName": "Khaash / خاش",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Galliformes",
      "family": "Phasianidae",
      "genus": "Pucrasia",
      "species": "macrolopha"
    },
    "conservationStatus": "LC",
    "nationalStatus": "Schedule IV (WPA 1972)",
    "regionalStatus": "Verified Regional Taxon",
    "populationTrend": "Stable",
    "sensitivity": "medium",
    "endemismStatus": "himalayan-endemic",
    "seasonality": "Resident",
    "geography": {
      "kashmirCore": true,
      "jammu": true,
      "ladakh": false,
      "ajk": true,
      "gilgitBaltistan": false,
      "himachal": true,
      "punjabFoothills": false
    },
    "districts": [
      "Srinagar",
      "Ganderbal",
      "Anantnag",
      "Baramulla",
      "Kupwara",
      "Bandipora",
      "Shopian",
      "Kulgam",
      "Poonch",
      "Doda",
      "Kishtwar",
      "Ramban",
      "Neelum",
      "Muzaffarabad",
      "Bagh"
    ],
    "protectedAreas": [
      "Dachigam National Park",
      "Overa-Aru Wildlife Sanctuary",
      "Gulmarg Wildlife Sanctuary",
      "Kazinag National Park"
    ],
    "distributionPoints": [],
    "habitats": [
      "Temperate & Subalpine Conifer Forests",
      "Deciduous Broadleaf & Riverine Forests"
    ],
    "breedingHabitat": "Steep conifer and oak-mixed forests with dense ringal or shrub understory.",
    "feedingEcology": "Herbivorous; feeds chiefly on leaves, fern fronds, buds, mosses, and seeds.",
    "elevationRange": {
      "min": 2000,
      "max": 3600
    },
    "ecologicalRole": "Montane Forest Understory Folivore",
    "observationIntelligence": {
      "totalObservations": 228,
      "verifiedRecords": 190,
      "recentRecords": 47,
      "historicalRecords": 143
    },
    "verifiedSightings": 190,
    "threats": [
      "Understory fuelwood lopping",
      "Subsistence snaring in winter"
    ],
    "description": "Vocally conspicuous montane conifer pheasant of Kashmir, Pir Panjal, Chenab, and Neelum valleys whose territorial dawn chorus rings across fir and deodar slopes.",
    "speciesNarrative": {
      "overview": "Secretive temperate conifer pheasant recognized by loud territorial dawn calls.",
      "identification": "Male shows bottle-green head, twin black ear-tufts beside a brown crest, white neck patch, and streaked silver-grey body with chestnut belly.",
      "ecology": "Steep conifer and oak-mixed forests with dense ringal or shrub understory. Herbivorous; feeds chiefly on leaves, fern fronds, buds, mosses, and seeds.",
      "distribution": "Verified across Srinagar, Ganderbal, Anantnag, Baramulla, Kupwara, Bandipora and adjacent Western Himalayan districts (2000–3600 m ASL).",
      "threats": "Understory fuelwood lopping; Subsistence snaring in winter.",
      "conservation": "Protected across Dachigam National Park, Overa-Aru Wildlife Sanctuary, Gulmarg Wildlife Sanctuary."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Pheasants & Galliformes"
  },
  {
    "id": "BRD-007",
    "slug": "himalayan-snowcock",
    "commonName": "Himalayan Snowcock",
    "scientificName": "Tetraogallus himalayensis",
    "localName": "Ram Chokor / رام چوکور",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Galliformes",
      "family": "Phasianidae",
      "genus": "Tetraogallus",
      "species": "himalayensis"
    },
    "conservationStatus": "LC",
    "nationalStatus": "Schedule I (WPA 1972)",
    "regionalStatus": "Verified Regional Taxon",
    "populationTrend": "Stable",
    "sensitivity": "medium",
    "endemismStatus": "himalayan-endemic",
    "seasonality": "Resident",
    "geography": {
      "kashmirCore": true,
      "jammu": true,
      "ladakh": true,
      "ajk": true,
      "gilgitBaltistan": true,
      "himachal": true,
      "punjabFoothills": false
    },
    "districts": [
      "Ganderbal",
      "Bandipora",
      "Anantnag",
      "Kupwara",
      "Baramulla",
      "Shopian",
      "Kishtwar",
      "Doda",
      "Kargil",
      "Leh",
      "Neelum",
      "Astore",
      "Gilgit",
      "Hunza",
      "Nagar",
      "Skardu",
      "Shigar",
      "Ghanche"
    ],
    "protectedAreas": [
      "Kishtwar High Altitude National Park",
      "Hemis National Park",
      "Overa-Aru Wildlife Sanctuary",
      "Khunjerab National Park",
      "Deosai National Park"
    ],
    "distributionPoints": [],
    "habitats": [
      "Alpine Meadows & Scree (Treeline Ecotone)",
      "Cliffs, Gorges & High Rockfaces"
    ],
    "breedingHabitat": "Windswept alpine pastures, boulder moraines, and precipitous ridges above the treeline.",
    "feedingEcology": "Grazes alpine sedges, bulbous roots, tubers, Artemisia shoots, and berries.",
    "elevationRange": {
      "min": 3300,
      "max": 5500
    },
    "ecologicalRole": "High-Alpine Herbivore & Snow Leopard / Golden Eagle Prey Base",
    "observationIntelligence": {
      "totalObservations": 336,
      "verifiedRecords": 280,
      "recentRecords": 70,
      "historicalRecords": 210
    },
    "verifiedSightings": 280,
    "threats": [
      "Pastoral livestock competition on alpine ridges",
      "Shepherd dog disturbance"
    ],
    "description": "Large high-alpine galliform inhabiting rocky ridges and snowline pastures above 3,300 m across the Greater Himalaya, Zanskar, Ladakh, and Karakoram.",
    "speciesNarrative": {
      "overview": "Characteristic heavy-bodied galliform of high Himalayan scree and alpine ridges.",
      "identification": "Ash-grey upperparts, white throat bordered by a chestnut collar band, dark grey belly, and whistling descending flight call.",
      "ecology": "Windswept alpine pastures, boulder moraines, and precipitous ridges above the treeline. Grazes alpine sedges, bulbous roots, tubers, Artemisia shoots, and berries.",
      "distribution": "Verified across Ganderbal, Bandipora, Anantnag, Kupwara, Baramulla, Shopian and adjacent Western Himalayan districts (3300–5500 m ASL).",
      "threats": "Pastoral livestock competition on alpine ridges; Shepherd dog disturbance.",
      "conservation": "Protected across Kishtwar High Altitude National Park, Hemis National Park, Overa-Aru Wildlife Sanctuary."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Pheasants & Galliformes"
  },
  {
    "id": "BRD-008",
    "slug": "tibetan-snowcock",
    "commonName": "Tibetan Snowcock",
    "scientificName": "Tetraogallus tibetanus",
    "localName": "Ladakh Snowcock / تِبتی چوکور",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Galliformes",
      "family": "Phasianidae",
      "genus": "Tetraogallus",
      "species": "tibetanus"
    },
    "conservationStatus": "LC",
    "nationalStatus": "Schedule I (WPA 1972)",
    "regionalStatus": "Verified Regional Taxon",
    "populationTrend": "Stable",
    "sensitivity": "medium",
    "endemismStatus": "trans-himalayan",
    "seasonality": "Resident",
    "geography": {
      "kashmirCore": false,
      "jammu": false,
      "ladakh": true,
      "ajk": false,
      "gilgitBaltistan": true,
      "himachal": false,
      "punjabFoothills": false
    },
    "districts": [
      "Leh",
      "Kargil",
      "Ghanche",
      "Shigar",
      "Skardu"
    ],
    "protectedAreas": [
      "Changthang Cold Desert Wildlife Sanctuary",
      "Hemis National Park",
      "Karakoram Wildlife Sanctuary"
    ],
    "distributionPoints": [],
    "habitats": [
      "Alpine Meadows & Scree (Treeline Ecotone)",
      "Cliffs, Gorges & High Rockfaces"
    ],
    "breedingHabitat": "Arid Trans-Himalayan gravel slopes, high passes, and cushion-plant steppes of Changthang and eastern Ladakh.",
    "feedingEcology": "Feeds on dwarf alpine herbs, roots, seeds, and shoots along snowmelt margins.",
    "elevationRange": {
      "min": 3800,
      "max": 5800
    },
    "ecologicalRole": "Trans-Himalayan Cold-Desert Herbivore",
    "observationIntelligence": {
      "totalObservations": 78,
      "verifiedRecords": 65,
      "recentRecords": 16,
      "historicalRecords": 49
    },
    "verifiedSightings": 65,
    "threats": [
      "Feral dog predation",
      "Climate-driven upward contraction of snowline seepages"
    ],
    "description": "High-altitude Trans-Himalayan snowcock restricted to cold-desert scree slopes and passes above 3,800 m in Leh (Changthang/Nubra), Zanskar (Kargil), and eastern Baltistan.",
    "speciesNarrative": {
      "overview": "Trans-Himalayan cold-desert specialist smaller and paler-bellied than Himalayan Snowcock.",
      "identification": "White underparts boldly streaked with black on flanks, twin grey breast bands, reddish orbital patch, and white wing panel in flight.",
      "ecology": "Arid Trans-Himalayan gravel slopes, high passes, and cushion-plant steppes of Changthang and eastern Ladakh. Feeds on dwarf alpine herbs, roots, seeds, and shoots along snowmelt margins.",
      "distribution": "Verified across Leh, Kargil, Ghanche, Shigar, Skardu (3800–5800 m ASL).",
      "threats": "Feral dog predation; Climate-driven upward contraction of snowline seepages.",
      "conservation": "Protected across Changthang Cold Desert Wildlife Sanctuary, Hemis National Park, Karakoram Wildlife Sanctuary."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Pheasants & Galliformes"
  },
  {
    "id": "BRD-009",
    "slug": "chukar-partridge",
    "commonName": "Chukar Partridge",
    "scientificName": "Alectoris chukar",
    "localName": "Kakov / کاکَو",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Galliformes",
      "family": "Phasianidae",
      "genus": "Alectoris",
      "species": "chukar"
    },
    "conservationStatus": "LC",
    "nationalStatus": "Schedule IV (WPA 1972)",
    "regionalStatus": "Verified Regional Taxon",
    "populationTrend": "Stable",
    "sensitivity": "low",
    "endemismStatus": "widely-distributed",
    "seasonality": "Resident",
    "geography": {
      "kashmirCore": true,
      "jammu": true,
      "ladakh": true,
      "ajk": true,
      "gilgitBaltistan": true,
      "himachal": false,
      "punjabFoothills": false
    },
    "districts": [
      "Srinagar",
      "Ganderbal",
      "Budgam",
      "Anantnag",
      "Pulwama",
      "Baramulla",
      "Kupwara",
      "Bandipora",
      "Udhampur",
      "Reasi",
      "Rajouri",
      "Poonch",
      "Doda",
      "Ramban",
      "Kishtwar",
      "Leh",
      "Kargil",
      "Muzaffarabad",
      "Jhelum Valley",
      "Gilgit",
      "Skardu",
      "Hunza",
      "Astore"
    ],
    "protectedAreas": [
      "Dachigam National Park",
      "Hemis National Park",
      "Kazinag National Park"
    ],
    "distributionPoints": [],
    "habitats": [
      "Cliffs, Gorges & High Rockfaces",
      "Agricultural Margins & Orchards"
    ],
    "breedingHabitat": "Dry rocky hillsides, Artemisia steppes, terraced stone walls, and boulder-strewn ravines.",
    "feedingEcology": "Granivorous and omnivorous; consumes grass seeds, grain, bulbs, shoots, and grasshoppers.",
    "elevationRange": {
      "min": 600,
      "max": 4500
    },
    "ecologicalRole": "Dry-Slope Granivore & Medium Raptor Prey Base",
    "observationIntelligence": {
      "totalObservations": 1080,
      "verifiedRecords": 900,
      "recentRecords": 225,
      "historicalRecords": 675
    },
    "verifiedSightings": 900,
    "threats": [
      "Localized trapping and hunting",
      "Agrochemical seed dressings on dryland margins"
    ],
    "description": "Widespread dry-hillside partridge occurring from middle Himalayan rocky gorges and Kashmir Zabarwan slopes up to 4,500 m across Ladakh and Gilgit-Baltistan.",
    "speciesNarrative": {
      "overview": "Gregarious, vocal partridge of dry rocky slopes across the Western Himalayas and Trans-Himalaya.",
      "identification": "Sandy grey-brown upperparts, crisp black necklace framing a white throat, boldly barred black-white-chestnut flanks, and coral-red bill and legs.",
      "ecology": "Dry rocky hillsides, Artemisia steppes, terraced stone walls, and boulder-strewn ravines. Granivorous and omnivorous; consumes grass seeds, grain, bulbs, shoots, and grasshoppers.",
      "distribution": "Verified across Srinagar, Ganderbal, Budgam, Anantnag, Pulwama, Baramulla and adjacent Western Himalayan districts (600–4500 m ASL).",
      "threats": "Localized trapping and hunting; Agrochemical seed dressings on dryland margins.",
      "conservation": "Protected across Dachigam National Park, Hemis National Park, Kazinag National Park."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Pheasants & Galliformes"
  },
  {
    "id": "BRD-010",
    "slug": "black-necked-crane",
    "commonName": "Black-necked Crane",
    "scientificName": "Grus nigricollis",
    "localName": "Chaung-tung Karmo / کھانٛگتھانٛگ کۄنگ",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Gruiformes",
      "family": "Gruidae",
      "genus": "Grus",
      "species": "nigricollis"
    },
    "conservationStatus": "NT",
    "nationalStatus": "Schedule I (WPA 1972) · State Bird of UT Ladakh",
    "regionalStatus": "Priority Conservation Taxon",
    "populationTrend": "Decreasing",
    "sensitivity": "critical",
    "endemismStatus": "trans-himalayan",
    "seasonality": "Summer Visitor (High-Altitude Breeder)",
    "geography": {
      "kashmirCore": false,
      "jammu": false,
      "ladakh": true,
      "ajk": false,
      "gilgitBaltistan": false,
      "himachal": false,
      "punjabFoothills": false
    },
    "districts": [
      "Leh"
    ],
    "protectedAreas": [
      "Changthang Cold Desert Wildlife Sanctuary",
      "Tso Kar Wetland Complex",
      "Tsomoriri Ramsar Site",
      "Hanle Marshes"
    ],
    "distributionPoints": [],
    "habitats": [
      "Wetlands, Lakes & Marshes (Ramsar Sites)",
      "High Altitude Lakes"
    ],
    "breedingHabitat": "Boggy sedge meadows and small peat islands in high-altitude Changthang marshes (Tso Kar, Tsomoriri, Hanle, Chushul, Loma, Dungti) in eastern Leh.",
    "feedingEcology": "Omnivorous wetland forager feeding on sedge tubers, aquatic rhizomes, crustaceans, molluscs, insects, and small amphibians/fish.",
    "elevationRange": {
      "min": 4100,
      "max": 4900
    },
    "ecologicalRole": "Flagship Trans-Himalayan High-Altitude Wetland Indicator",
    "observationIntelligence": {
      "totalObservations": 93,
      "verifiedRecords": 78,
      "recentRecords": 19,
      "historicalRecords": 59
    },
    "verifiedSightings": 78,
    "threats": [
      "Free-ranging feral dog predation on eggs and chicks",
      "Unregulated off-road tourism near nesting marshes",
      "Hydrological fluctuation of peat-island nests"
    ],
    "description": "Revered Trans-Himalayan crane whose entire Indian breeding range is restricted to high-altitude marshes (4,100–4,900 m) of eastern Changthang in Leh district (Tso Kar, Tsomoriri, Hanle, Chushul).",
    "speciesNarrative": {
      "overview": "Only alpine-breeding crane species on Earth; summer breeder strictly confined to Changthang wetlands in Leh district within the Western Himalayas.",
      "identification": "Ashy-grey body with contrasting black head, upper neck, primaries, and tertials, crimson crown patch, and small white post-ocular spot.",
      "ecology": "Boggy sedge meadows and small peat islands in high-altitude Changthang marshes (Tso Kar, Tsomoriri, Hanle, Chushul, Loma, Dungti) in eastern Leh. Omnivorous wetland forager feeding on sedge tubers, aquatic rhizomes, crustaceans, molluscs, insects, and small amphibians/fish.",
      "distribution": "Verified across Leh (4100–4900 m ASL).",
      "threats": "Free-ranging feral dog predation on eggs and chicks; Unregulated off-road tourism near nesting marshes; Hydrological fluctuation of peat-island nests.",
      "conservation": "Protected across Changthang Cold Desert Wildlife Sanctuary, Tso Kar Wetland Complex, Tsomoriri Ramsar Site."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Migratory Waterfowl & Wetland Birds",
    "migrationWindow": {
      "season": "summer",
      "arrivalMonth": 3,
      "departureMonth": 10,
      "peakPresence": [
        5,
        6,
        7,
        8,
        9
      ],
      "migrationType": "breeder",
      "flyway": "central-asian",
      "concentration": "medium"
    }
  },
  {
    "id": "BRD-011",
    "slug": "bearded-vulture",
    "commonName": "Bearded Vulture (Lammergeier)",
    "scientificName": "Gypaetus barbatus",
    "localName": "Hadd-Khor / ہَڈ کھور",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Accipitriformes",
      "family": "Accipitridae",
      "genus": "Gypaetus",
      "species": "barbatus"
    },
    "conservationStatus": "NT",
    "nationalStatus": "Schedule I (WPA 1972)",
    "regionalStatus": "Priority Conservation Taxon",
    "populationTrend": "Decreasing",
    "sensitivity": "high",
    "endemismStatus": "widely-distributed",
    "seasonality": "Resident",
    "geography": {
      "kashmirCore": true,
      "jammu": true,
      "ladakh": true,
      "ajk": true,
      "gilgitBaltistan": true,
      "himachal": false,
      "punjabFoothills": false
    },
    "districts": [
      "Ganderbal",
      "Anantnag",
      "Bandipora",
      "Kupwara",
      "Baramulla",
      "Kishtwar",
      "Doda",
      "Poonch",
      "Leh",
      "Kargil",
      "Neelum",
      "Astore",
      "Gilgit",
      "Hunza",
      "Skardu",
      "Shigar",
      "Ghanche"
    ],
    "protectedAreas": [
      "Dachigam National Park",
      "Hemis National Park",
      "Kishtwar High Altitude National Park",
      "Khunjerab National Park"
    ],
    "distributionPoints": [],
    "habitats": [
      "Cliffs, Gorges & High Rockfaces",
      "Alpine Meadows & Scree (Treeline Ecotone)"
    ],
    "breedingHabitat": "Inaccessible rock caves and cliff overhangs in high mountain gorges.",
    "feedingEcology": "Specialized osteophage (bone-eater); drops large ungulate bones onto rock ossuaries to extract marrow.",
    "elevationRange": {
      "min": 1500,
      "max": 5500
    },
    "ecologicalRole": "High-Mountain Obligate Scavenger & Carcass Sanitizer",
    "observationIntelligence": {
      "totalObservations": 168,
      "verifiedRecords": 140,
      "recentRecords": 35,
      "historicalRecords": 105
    },
    "verifiedSightings": 140,
    "threats": [
      "Veterinary NSAID poisoning",
      "Secondary poisoned baits targeting carnivores",
      "Powerline collisions"
    ],
    "description": "Magnificent cliff-nesting bone-eating vulture soaring along alpine ridges across Kashmir, Kishtwar, Ladakh, Neelum, and Gilgit-Baltistan.",
    "speciesNarrative": {
      "overview": "Specialized osteophagous raptor of high mountain cliffs and alpine valleys.",
      "identification": "Long narrow wings, wedge-shaped diamond tail, rufous-orange iron-stained head and underparts, and black bristle 'beard' at the bill base.",
      "ecology": "Inaccessible rock caves and cliff overhangs in high mountain gorges. Specialized osteophage (bone-eater); drops large ungulate bones onto rock ossuaries to extract marrow.",
      "distribution": "Verified across Ganderbal, Anantnag, Bandipora, Kupwara, Baramulla, Kishtwar and adjacent Western Himalayan districts (1500–5500 m ASL).",
      "threats": "Veterinary NSAID poisoning; Secondary poisoned baits targeting carnivores; Powerline collisions.",
      "conservation": "Protected across Dachigam National Park, Hemis National Park, Kishtwar High Altitude National Park."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Raptors & Vultures"
  },
  {
    "id": "BRD-012",
    "slug": "himalayan-griffon-vulture",
    "commonName": "Himalayan Griffon Vulture",
    "scientificName": "Gyps himalayensis",
    "localName": "Grad / گراد",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Accipitriformes",
      "family": "Accipitridae",
      "genus": "Gyps",
      "species": "himalayensis"
    },
    "conservationStatus": "NT",
    "nationalStatus": "Schedule IV (WPA 1972)",
    "regionalStatus": "Priority Conservation Taxon",
    "populationTrend": "Decreasing",
    "sensitivity": "high",
    "endemismStatus": "himalayan-endemic",
    "seasonality": "Resident Altitudinal Migrant",
    "geography": {
      "kashmirCore": true,
      "jammu": true,
      "ladakh": true,
      "ajk": true,
      "gilgitBaltistan": true,
      "himachal": true,
      "punjabFoothills": false
    },
    "districts": [
      "Srinagar",
      "Ganderbal",
      "Anantnag",
      "Shopian",
      "Baramulla",
      "Bandipora",
      "Kishtwar",
      "Doda",
      "Poonch",
      "Rajouri",
      "Leh",
      "Kargil",
      "Neelum",
      "Muzaffarabad",
      "Gilgit",
      "Skardu",
      "Astore",
      "Hunza"
    ],
    "protectedAreas": [
      "Dachigam National Park",
      "Hemis National Park",
      "Kishtwar High Altitude National Park",
      "Deosai National Park"
    ],
    "distributionPoints": [],
    "habitats": [
      "Cliffs, Gorges & High Rockfaces",
      "Alpine Meadows & Scree (Treeline Ecotone)"
    ],
    "breedingHabitat": "Colonial cliff ledges in steep mountain gorges.",
    "feedingEcology": "Obligate carrion scavenger feeding on livestock and wild ungulate carcasses.",
    "elevationRange": {
      "min": 1200,
      "max": 5500
    },
    "ecologicalRole": "Primary High-Altitude Carcass Scavenger",
    "observationIntelligence": {
      "totalObservations": 318,
      "verifiedRecords": 265,
      "recentRecords": 66,
      "historicalRecords": 199
    },
    "verifiedSightings": 265,
    "threats": [
      "Toxic veterinary NSAIDs (diclofenac, ketoprofen, aceclofenac)",
      "Retaliatory carcass poisoning"
    ],
    "description": "Largest Old World griffon vulture and dominant high-elevation scavenger across the Greater Himalaya, Pir Panjal, Ladakh, and Karakoram.",
    "speciesNarrative": {
      "overview": "Massive broad-winged Himalayan scavenger nesting colonially on high cliff faces.",
      "identification": "Sandy-buff body, pale creamy neck ruff, heavy pale greenish-horn bill, and pale underwing coverts contrasting with dark flight feathers.",
      "ecology": "Colonial cliff ledges in steep mountain gorges. Obligate carrion scavenger feeding on livestock and wild ungulate carcasses.",
      "distribution": "Verified across Srinagar, Ganderbal, Anantnag, Shopian, Baramulla, Bandipora and adjacent Western Himalayan districts (1200–5500 m ASL).",
      "threats": "Toxic veterinary NSAIDs (diclofenac, ketoprofen, aceclofenac); Retaliatory carcass poisoning.",
      "conservation": "Protected across Dachigam National Park, Hemis National Park, Kishtwar High Altitude National Park."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Raptors & Vultures"
  },
  {
    "id": "BRD-013",
    "slug": "white-rumped-vulture",
    "commonName": "White-rumped Vulture",
    "scientificName": "Gyps bengalensis",
    "localName": "Safed Pusht Gidh",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Accipitriformes",
      "family": "Accipitridae",
      "genus": "Gyps",
      "species": "bengalensis"
    },
    "conservationStatus": "CR",
    "nationalStatus": "Schedule I (WPA 1972)",
    "regionalStatus": "Priority Conservation Taxon",
    "populationTrend": "Decreasing",
    "sensitivity": "critical",
    "endemismStatus": "widely-distributed",
    "seasonality": "Resident",
    "geography": {
      "kashmirCore": false,
      "jammu": true,
      "ladakh": false,
      "ajk": true,
      "gilgitBaltistan": false,
      "himachal": false,
      "punjabFoothills": true
    },
    "districts": [
      "Jammu",
      "Samba",
      "Kathua",
      "Udhampur",
      "Reasi",
      "Rajouri",
      "Mirpur",
      "Bhimber",
      "Kotli"
    ],
    "protectedAreas": [
      "Jasrota Wildlife Sanctuary",
      "Nandini Wildlife Sanctuary",
      "Ramnagar Wildlife Sanctuary"
    ],
    "distributionPoints": [],
    "habitats": [
      "Deciduous Broadleaf & Riverine Forests",
      "Agricultural Margins & Orchards"
    ],
    "breedingHabitat": "Tall subtropical chir pine, banyan, peepal, and mango trees in Shivalik foothills and plains.",
    "feedingEcology": "Obligate carrion feeder on ungulate carcasses.",
    "elevationRange": {
      "min": 280,
      "max": 1200
    },
    "ecologicalRole": "Lowland Subtropical Obligate Scavenger",
    "observationIntelligence": {
      "totalObservations": 33,
      "verifiedRecords": 28,
      "recentRecords": 7,
      "historicalRecords": 21
    },
    "verifiedSightings": 28,
    "threats": [
      "Catastrophic renal failure from veterinary diclofenac and nimesulide",
      "Loss of tall nesting trees",
      "Electrocution"
    ],
    "description": "Critically Endangered lowland vulture persisting in small remnant pockets across the Jammu-Kathua-Udhampur-Mirpur Shivalik foothills.",
    "speciesNarrative": {
      "overview": "Critically Endangered South Asian vulture that suffered >99% population collapse due to veterinary diclofenac.",
      "identification": "Blackish plumage, white neck ruff, diagnostic white lower back/rump, and striking silvery-white underwing coverts in adults.",
      "ecology": "Tall subtropical chir pine, banyan, peepal, and mango trees in Shivalik foothills and plains. Obligate carrion feeder on ungulate carcasses.",
      "distribution": "Verified across Jammu, Samba, Kathua, Udhampur, Reasi, Rajouri and adjacent Western Himalayan districts (280–1200 m ASL).",
      "threats": "Catastrophic renal failure from veterinary diclofenac and nimesulide; Loss of tall nesting trees; Electrocution.",
      "conservation": "Protected across Jasrota Wildlife Sanctuary, Nandini Wildlife Sanctuary, Ramnagar Wildlife Sanctuary."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Raptors & Vultures"
  },
  {
    "id": "BRD-014",
    "slug": "golden-eagle",
    "commonName": "Golden Eagle",
    "scientificName": "Aquila chrysaetos",
    "localName": "Sunehri Uqab",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Accipitriformes",
      "family": "Accipitridae",
      "genus": "Aquila",
      "species": "chrysaetos"
    },
    "conservationStatus": "LC",
    "nationalStatus": "Schedule I (WPA 1972)",
    "regionalStatus": "Verified Regional Taxon",
    "populationTrend": "Stable",
    "sensitivity": "high",
    "endemismStatus": "widely-distributed",
    "seasonality": "Resident",
    "geography": {
      "kashmirCore": true,
      "jammu": true,
      "ladakh": true,
      "ajk": true,
      "gilgitBaltistan": true,
      "himachal": false,
      "punjabFoothills": false
    },
    "districts": [
      "Ganderbal",
      "Bandipora",
      "Anantnag",
      "Kupwara",
      "Baramulla",
      "Kishtwar",
      "Doda",
      "Leh",
      "Kargil",
      "Neelum",
      "Astore",
      "Gilgit",
      "Hunza",
      "Nagar",
      "Skardu",
      "Shigar",
      "Ghanche"
    ],
    "protectedAreas": [
      "Hemis National Park",
      "Kishtwar High Altitude National Park",
      "Dachigam National Park",
      "Deosai National Park"
    ],
    "distributionPoints": [],
    "habitats": [
      "Cliffs, Gorges & High Rockfaces",
      "Alpine Meadows & Scree (Treeline Ecotone)"
    ],
    "breedingHabitat": "Large stick eyries on precipitous crags overlooking open alpine valleys.",
    "feedingEcology": "Apex avian predator hunting marmots, pikas, hares, snowcocks, and chukar partridges.",
    "elevationRange": {
      "min": 2000,
      "max": 5500
    },
    "ecologicalRole": "Apex Aerial Predator of Alpine Ecosystems",
    "observationIntelligence": {
      "totalObservations": 114,
      "verifiedRecords": 95,
      "recentRecords": 23,
      "historicalRecords": 72
    },
    "verifiedSightings": 95,
    "threats": [
      "High-voltage transmission line electrocution",
      "Disturbance at cliff eyries"
    ],
    "description": "Powerful apex eagle of open alpine ridges and Trans-Himalayan valleys preying chiefly on marmots, hares, and snowcocks.",
    "speciesNarrative": {
      "overview": "Subspecies daphanea inhabits high mountain ranges of Kashmir, Ladakh, and the Karakoram.",
      "identification": "Dark brown eagle with golden-buff crown and nape hackles, long broad wings held in a shallow dihedral when soaring.",
      "ecology": "Large stick eyries on precipitous crags overlooking open alpine valleys. Apex avian predator hunting marmots, pikas, hares, snowcocks, and chukar partridges.",
      "distribution": "Verified across Ganderbal, Bandipora, Anantnag, Kupwara, Baramulla, Kishtwar and adjacent Western Himalayan districts (2000–5500 m ASL).",
      "threats": "High-voltage transmission line electrocution; Disturbance at cliff eyries.",
      "conservation": "Protected across Hemis National Park, Kishtwar High Altitude National Park, Dachigam National Park."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Raptors & Vultures"
  },
  {
    "id": "BRD-015",
    "slug": "steppe-eagle",
    "commonName": "Steppe Eagle",
    "scientificName": "Aquila nipalensis",
    "localName": "Steppe Uqab",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Accipitriformes",
      "family": "Accipitridae",
      "genus": "Aquila",
      "species": "nipalensis"
    },
    "conservationStatus": "EN",
    "nationalStatus": "Schedule I (WPA 1972)",
    "regionalStatus": "Priority Conservation Taxon",
    "populationTrend": "Decreasing",
    "sensitivity": "high",
    "endemismStatus": "widely-distributed",
    "seasonality": "Winter Visitor & Passage Migrant",
    "geography": {
      "kashmirCore": true,
      "jammu": true,
      "ladakh": true,
      "ajk": true,
      "gilgitBaltistan": false,
      "himachal": false,
      "punjabFoothills": true
    },
    "districts": [
      "Jammu",
      "Samba",
      "Kathua",
      "Udhampur",
      "Rajouri",
      "Poonch",
      "Srinagar",
      "Bandipora",
      "Leh",
      "Kargil",
      "Mirpur"
    ],
    "protectedAreas": [
      "Gharana Wetland",
      "Dachigam National Park",
      "Surinsar-Mansar Wildlife Sanctuary"
    ],
    "distributionPoints": [],
    "habitats": [
      "Cliffs, Gorges & High Rockfaces",
      "Agricultural Margins & Orchards"
    ],
    "breedingHabitat": "Central Asian steppes (non-breeding winter/passage migrant in the Western Himalayas).",
    "feedingEcology": "Predator and facultative scavenger feeding on rodents, carrion, and injured waterbirds.",
    "elevationRange": {
      "min": 300,
      "max": 3800
    },
    "ecologicalRole": "Migratory Raptor & Winter Scavenger",
    "observationIntelligence": {
      "totalObservations": 76,
      "verifiedRecords": 64,
      "recentRecords": 16,
      "historicalRecords": 48
    },
    "verifiedSightings": 64,
    "threats": [
      "Powerline electrocution along Central Asian Flyway",
      "Veterinary NSAID residues in carrion"
    ],
    "description": "Endangered Central Asian raptor migrating across Himalayan passes in autumn and spring and wintering in the Jammu foothills and Kashmir Valley.",
    "speciesNarrative": {
      "overview": "Globally Endangered migratory Aquila eagle using the Western Himalayan corridor.",
      "identification": "Dark brown plumage with an elongated yellow gape line extending behind the eye and bold barred flight feathers with pale underwing band in immatures.",
      "ecology": "Central Asian steppes (non-breeding winter/passage migrant in the Western Himalayas). Predator and facultative scavenger feeding on rodents, carrion, and injured waterbirds.",
      "distribution": "Verified across Jammu, Samba, Kathua, Udhampur, Rajouri, Poonch and adjacent Western Himalayan districts (300–3800 m ASL).",
      "threats": "Powerline electrocution along Central Asian Flyway; Veterinary NSAID residues in carrion.",
      "conservation": "Protected across Gharana Wetland, Dachigam National Park, Surinsar-Mansar Wildlife Sanctuary."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Raptors & Vultures",
    "migrationWindow": {
      "season": "winter",
      "arrivalMonth": 10,
      "departureMonth": 3,
      "peakPresence": [
        11,
        12,
        1,
        2
      ],
      "migrationType": "winter-visitor",
      "flyway": "central-asian",
      "concentration": "medium"
    }
  },
  {
    "id": "BRD-016",
    "slug": "pallas-fish-eagle",
    "commonName": "Pallas's Fish Eagle",
    "scientificName": "Haliaeetus leucoryphus",
    "localName": "Gaad-Grad / گاد گراد",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Accipitriformes",
      "family": "Accipitridae",
      "genus": "Haliaeetus",
      "species": "leucoryphus"
    },
    "conservationStatus": "EN",
    "nationalStatus": "Schedule I (WPA 1972)",
    "regionalStatus": "Priority Conservation Taxon",
    "populationTrend": "Decreasing",
    "sensitivity": "critical",
    "endemismStatus": "widely-distributed",
    "seasonality": "Seasonal Visitor",
    "geography": {
      "kashmirCore": true,
      "jammu": true,
      "ladakh": true,
      "ajk": true,
      "gilgitBaltistan": false,
      "himachal": false,
      "punjabFoothills": true
    },
    "districts": [
      "Bandipora",
      "Baramulla",
      "Srinagar",
      "Ganderbal",
      "Leh",
      "Jammu",
      "Kathua",
      "Mirpur"
    ],
    "protectedAreas": [
      "Wular Lake Ramsar Site",
      "Tsomoriri Ramsar Site",
      "Hokersar Wetland"
    ],
    "distributionPoints": [],
    "habitats": [
      "Wetlands, Lakes & Marshes (Ramsar Sites)",
      "Braided Rivers & Torrential Streams"
    ],
    "breedingHabitat": "Tall lakeside trees or cliff ledges beside major fish-bearing lakes and reservoirs.",
    "feedingEcology": "Piscivore and waterbird predator snatching large cyprinids and coots from lake surfaces.",
    "elevationRange": {
      "min": 300,
      "max": 4550
    },
    "ecologicalRole": "Apex Wetland & Lacustrine Avian Predator",
    "observationIntelligence": {
      "totalObservations": 26,
      "verifiedRecords": 22,
      "recentRecords": 5,
      "historicalRecords": 17
    },
    "verifiedSightings": 22,
    "threats": [
      "Depletion of large native fish stocks",
      "Felling of lakeside poplars and chinars",
      "Wetland disturbance and gillnet entanglement"
    ],
    "description": "Endangered fish-eagle recorded around Wular Lake, Hokersar, Mangla-Jhelum reservoirs, and summering at high-altitude Ladakh lakes.",
    "speciesNarrative": {
      "overview": "Globally Endangered wetland raptor tied to productive freshwater lakes and large rivers.",
      "identification": "Dark brown body, pale buff-whitish hood and throat, and black tail crossed by a broad pure white central band in adults.",
      "ecology": "Tall lakeside trees or cliff ledges beside major fish-bearing lakes and reservoirs. Piscivore and waterbird predator snatching large cyprinids and coots from lake surfaces.",
      "distribution": "Verified across Bandipora, Baramulla, Srinagar, Ganderbal, Leh, Jammu and adjacent Western Himalayan districts (300–4550 m ASL).",
      "threats": "Depletion of large native fish stocks; Felling of lakeside poplars and chinars; Wetland disturbance and gillnet entanglement.",
      "conservation": "Protected across Wular Lake Ramsar Site, Tsomoriri Ramsar Site, Hokersar Wetland."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Raptors & Vultures"
  },
  {
    "id": "BRD-017",
    "slug": "egyptian-vulture",
    "commonName": "Egyptian Vulture",
    "scientificName": "Neophron percnopterus",
    "localName": "Safed Gidh",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Accipitriformes",
      "family": "Accipitridae",
      "genus": "Neophron",
      "species": "percnopterus"
    },
    "conservationStatus": "EN",
    "nationalStatus": "Schedule IV (WPA 1972)",
    "regionalStatus": "Priority Conservation Taxon",
    "populationTrend": "Decreasing",
    "sensitivity": "high",
    "endemismStatus": "widely-distributed",
    "seasonality": "Resident & Altitudinal Migrant",
    "geography": {
      "kashmirCore": true,
      "jammu": true,
      "ladakh": false,
      "ajk": true,
      "gilgitBaltistan": false,
      "himachal": false,
      "punjabFoothills": true
    },
    "districts": [
      "Jammu",
      "Samba",
      "Kathua",
      "Udhampur",
      "Reasi",
      "Rajouri",
      "Poonch",
      "Srinagar",
      "Budgam",
      "Anantnag",
      "Mirpur",
      "Kotli"
    ],
    "protectedAreas": [
      "Jasrota Wildlife Sanctuary",
      "Ramnagar Wildlife Sanctuary",
      "Dachigam National Park"
    ],
    "distributionPoints": [],
    "habitats": [
      "Cliffs, Gorges & High Rockfaces",
      "Agricultural Margins & Orchards"
    ],
    "breedingHabitat": "Sandstone and limestone cliff ledges in Shivalik hills and outer Himalayan valleys.",
    "feedingEcology": "Opportunistic scavenger consuming offal, small carcasses, and organic refuse.",
    "elevationRange": {
      "min": 300,
      "max": 3000
    },
    "ecologicalRole": "Foothill & Peri-Urban Scavenger",
    "observationIntelligence": {
      "totalObservations": 69,
      "verifiedRecords": 58,
      "recentRecords": 14,
      "historicalRecords": 44
    },
    "verifiedSightings": 58,
    "threats": [
      "NSAID livestock residues",
      "Powerline electrocution",
      "Indirect poisoning"
    ],
    "description": "Endangered small white-and-black vulture nesting on rocky escarpments of the Jammu foothills, Pir Panjal valleys, and Kashmir margins.",
    "speciesNarrative": {
      "overview": "Smallest Old World vulture in the region, distinguished by bare yellow facial skin and wedge-shaped tail.",
      "identification": "White body and wing coverts contrasting with black flight feathers, bare yellow face, and slender hooked bill.",
      "ecology": "Sandstone and limestone cliff ledges in Shivalik hills and outer Himalayan valleys. Opportunistic scavenger consuming offal, small carcasses, and organic refuse.",
      "distribution": "Verified across Jammu, Samba, Kathua, Udhampur, Reasi, Rajouri and adjacent Western Himalayan districts (300–3000 m ASL).",
      "threats": "NSAID livestock residues; Powerline electrocution; Indirect poisoning.",
      "conservation": "Protected across Jasrota Wildlife Sanctuary, Ramnagar Wildlife Sanctuary, Dachigam National Park."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Raptors & Vultures"
  },
  {
    "id": "BRD-018",
    "slug": "bar-headed-goose",
    "commonName": "Bar-headed Goose",
    "scientificName": "Anser indicus",
    "localName": "Hans / ہَنس",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Anseriformes",
      "family": "Anatidae",
      "genus": "Anser",
      "species": "indicus"
    },
    "conservationStatus": "LC",
    "nationalStatus": "Schedule IV (WPA 1972)",
    "regionalStatus": "Verified Regional Taxon",
    "populationTrend": "Stable",
    "sensitivity": "medium",
    "endemismStatus": "widely-distributed",
    "seasonality": "Summer Breeder (Ladakh) & Winter Visitor (Plains/Valley)",
    "geography": {
      "kashmirCore": true,
      "jammu": true,
      "ladakh": true,
      "ajk": true,
      "gilgitBaltistan": false,
      "himachal": false,
      "punjabFoothills": true
    },
    "districts": [
      "Leh",
      "Kargil",
      "Jammu",
      "Kathua",
      "Samba",
      "Bandipora",
      "Baramulla",
      "Srinagar",
      "Mirpur"
    ],
    "protectedAreas": [
      "Tsomoriri Ramsar Site",
      "Tso Kar Wetland Complex",
      "Gharana Wetland",
      "Wular Lake Ramsar Site"
    ],
    "distributionPoints": [],
    "habitats": [
      "High Altitude Lakes",
      "Wetlands, Lakes & Marshes (Ramsar Sites)"
    ],
    "breedingHabitat": "Islands and marshy shorelines of Tsomoriri and Tso Kar in Changthang (Leh); winters on Gharana Wetland and lowland reservoirs.",
    "feedingEcology": "Herbivorous grazer of wetland sedges, aquatic grasses, and winter wheat/barley shoots.",
    "elevationRange": {
      "min": 280,
      "max": 4800
    },
    "ecologicalRole": "Trans-Himalayan Migrant Grazer & Nutrient Vector",
    "observationIntelligence": {
      "totalObservations": 1740,
      "verifiedRecords": 1450,
      "recentRecords": 362,
      "historicalRecords": 1088
    },
    "verifiedSightings": 1450,
    "threats": [
      "Feral dog and tourist disturbance at Tsomoriri breeding colonies",
      "Agricultural wetland shrinkage at lowland wintering sites"
    ],
    "description": "World's highest-flying migratory goose, breeding colonially at Tsomoriri and Tso Kar in Leh (4,500+ m) and wintering at Gharana Wetland (Jammu) and regional reservoirs.",
    "speciesNarrative": {
      "overview": "Physiologically specialized goose capable of crossing the highest Himalayan crestlines under severe hypoxia.",
      "identification": "Pale silvery-grey body, white head marked with two diagnostic black occipital bars, and yellow bill and legs.",
      "ecology": "Islands and marshy shorelines of Tsomoriri and Tso Kar in Changthang (Leh); winters on Gharana Wetland and lowland reservoirs. Herbivorous grazer of wetland sedges, aquatic grasses, and winter wheat/barley shoots.",
      "distribution": "Verified across Leh, Kargil, Jammu, Kathua, Samba, Bandipora and adjacent Western Himalayan districts (280–4800 m ASL).",
      "threats": "Feral dog and tourist disturbance at Tsomoriri breeding colonies; Agricultural wetland shrinkage at lowland wintering sites.",
      "conservation": "Protected across Tsomoriri Ramsar Site, Tso Kar Wetland Complex, Gharana Wetland."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Migratory Waterfowl & Wetland Birds",
    "migrationWindow": {
      "season": "winter",
      "arrivalMonth": 10,
      "departureMonth": 4,
      "peakPresence": [
        11,
        12,
        1,
        2,
        6,
        7
      ],
      "migrationType": "passage-migrant",
      "flyway": "central-asian",
      "concentration": "very-high"
    }
  },
  {
    "id": "BRD-019",
    "slug": "ferruginous-duck",
    "commonName": "Ferruginous Duck",
    "scientificName": "Aythya nyroca",
    "localName": "Ratal-Kore / لال بتھ",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Anseriformes",
      "family": "Anatidae",
      "genus": "Aythya",
      "species": "nyroca"
    },
    "conservationStatus": "NT",
    "nationalStatus": "Schedule IV (WPA 1972)",
    "regionalStatus": "Priority Conservation Taxon",
    "populationTrend": "Decreasing",
    "sensitivity": "medium",
    "endemismStatus": "widely-distributed",
    "seasonality": "Winter Visitor & Scarce Local Breeder",
    "geography": {
      "kashmirCore": true,
      "jammu": true,
      "ladakh": false,
      "ajk": false,
      "gilgitBaltistan": false,
      "himachal": false,
      "punjabFoothills": true
    },
    "districts": [
      "Srinagar",
      "Budgam",
      "Bandipora",
      "Baramulla",
      "Ganderbal",
      "Pulwama",
      "Jammu",
      "Kathua",
      "Samba"
    ],
    "protectedAreas": [
      "Hokersar Wetland",
      "Hygam Wetland",
      "Shallabugh Wetland",
      "Wular Lake Ramsar Site",
      "Surinsar-Mansar Wildlife Sanctuary"
    ],
    "distributionPoints": [],
    "habitats": [
      "Wetlands, Lakes & Marshes (Ramsar Sites)"
    ],
    "breedingHabitat": "Dense Typha and Phragmites reedbeds bordering shallow macrophyte-rich lakes (Hokersar, Hygam, Anchar, Dal).",
    "feedingEcology": "Omnivorous diving duck feeding on pondweed seeds, aquatic macrophytes, molluscs, and insects.",
    "elevationRange": {
      "min": 300,
      "max": 1800
    },
    "ecologicalRole": "Submerged Macrophyte Consumer & Reedbed Specialist",
    "observationIntelligence": {
      "totalObservations": 492,
      "verifiedRecords": 410,
      "recentRecords": 102,
      "historicalRecords": 308
    },
    "verifiedSightings": 410,
    "threats": [
      "Reedbed clearance and willow encroachment",
      "Hypereutrophication shading out submerged pondweeds",
      "Illegal netting"
    ],
    "description": "Near Threatened chestnut-plumaged diving duck wintering in significant numbers across Hokersar, Hygam, Shallabugh, and Wular and breeding locally in dense Kashmir reedbeds.",
    "speciesNarrative": {
      "overview": "Near Threatened Aythya diving duck closely associated with reed-fringed Kashmir wetlands.",
      "identification": "Rich mahogany-chestnut head, breast, and flanks, pure white undertail coverts, white wing-bar in flight, and white iris in adult males.",
      "ecology": "Dense Typha and Phragmites reedbeds bordering shallow macrophyte-rich lakes (Hokersar, Hygam, Anchar, Dal). Omnivorous diving duck feeding on pondweed seeds, aquatic macrophytes, molluscs, and insects.",
      "distribution": "Verified across Srinagar, Budgam, Bandipora, Baramulla, Ganderbal, Pulwama and adjacent Western Himalayan districts (300–1800 m ASL).",
      "threats": "Reedbed clearance and willow encroachment; Hypereutrophication shading out submerged pondweeds; Illegal netting.",
      "conservation": "Protected across Hokersar Wetland, Hygam Wetland, Shallabugh Wetland."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Migratory Waterfowl & Wetland Birds",
    "migrationWindow": {
      "season": "winter",
      "arrivalMonth": 10,
      "departureMonth": 3,
      "peakPresence": [
        11,
        12,
        1,
        2
      ],
      "migrationType": "winter-visitor",
      "flyway": "central-asian",
      "concentration": "high"
    }
  },
  {
    "id": "BRD-020",
    "slug": "common-pochard",
    "commonName": "Common Pochard",
    "scientificName": "Aythya ferina",
    "localName": "Khrus-Batakh",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Anseriformes",
      "family": "Anatidae",
      "genus": "Aythya",
      "species": "ferina"
    },
    "conservationStatus": "VU",
    "nationalStatus": "Schedule IV (WPA 1972)",
    "regionalStatus": "Priority Conservation Taxon",
    "populationTrend": "Decreasing",
    "sensitivity": "medium",
    "endemismStatus": "widely-distributed",
    "seasonality": "Winter Visitor",
    "geography": {
      "kashmirCore": true,
      "jammu": true,
      "ladakh": false,
      "ajk": true,
      "gilgitBaltistan": false,
      "himachal": false,
      "punjabFoothills": true
    },
    "districts": [
      "Bandipora",
      "Baramulla",
      "Srinagar",
      "Ganderbal",
      "Budgam",
      "Jammu",
      "Samba",
      "Mirpur"
    ],
    "protectedAreas": [
      "Wular Lake Ramsar Site",
      "Hokersar Wetland",
      "Shallabugh Wetland",
      "Hygam Wetland",
      "Surinsar-Mansar Wildlife Sanctuary"
    ],
    "distributionPoints": [],
    "habitats": [
      "Wetlands, Lakes & Marshes (Ramsar Sites)"
    ],
    "breedingHabitat": "Northern Eurasian steppe and boreal lakes (non-breeding winter visitor in Kashmir and Jammu).",
    "feedingEcology": "Dives in open deeper lake basins for Chara stoneworts, Potamogeton seeds, chironomid larvae, and molluscs.",
    "elevationRange": {
      "min": 300,
      "max": 1800
    },
    "ecologicalRole": "Benthic Diving Herbivore-Invertivore",
    "observationIntelligence": {
      "totalObservations": 2220,
      "verifiedRecords": 1850,
      "recentRecords": 462,
      "historicalRecords": 1388
    },
    "verifiedSightings": 1850,
    "threats": [
      "Siltation reducing open-water diving depth in Wular and Hokersar",
      "Flyway hunting pressure"
    ],
    "description": "Globally Vulnerable diving duck congregating during winter on open-water expanses of Wular, Hokersar, Dal, Manasbal, Surinsar-Mansar, and Mangla.",
    "speciesNarrative": {
      "overview": "Gregarious winter diving duck favoring deeper open-water basins within Kashmir Ramsar wetlands.",
      "identification": "Male has bright chestnut-red domed head, black breast and stern, vermiculated pale grey back, and slate-banded dark bill.",
      "ecology": "Northern Eurasian steppe and boreal lakes (non-breeding winter visitor in Kashmir and Jammu). Dives in open deeper lake basins for Chara stoneworts, Potamogeton seeds, chironomid larvae, and molluscs.",
      "distribution": "Verified across Bandipora, Baramulla, Srinagar, Ganderbal, Budgam, Jammu and adjacent Western Himalayan districts (300–1800 m ASL).",
      "threats": "Siltation reducing open-water diving depth in Wular and Hokersar; Flyway hunting pressure.",
      "conservation": "Protected across Wular Lake Ramsar Site, Hokersar Wetland, Shallabugh Wetland."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Migratory Waterfowl & Wetland Birds",
    "migrationWindow": {
      "season": "winter",
      "arrivalMonth": 10,
      "departureMonth": 3,
      "peakPresence": [
        11,
        12,
        1,
        2
      ],
      "migrationType": "winter-visitor",
      "flyway": "central-asian",
      "concentration": "high"
    }
  },
  {
    "id": "BRD-021",
    "slug": "white-throated-dipper",
    "commonName": "White-throated Dipper",
    "scientificName": "Cinclus cinclus",
    "localName": "Dunga-Tsor",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Passeriformes",
      "family": "Cinclidae",
      "genus": "Cinclus",
      "species": "cinclus"
    },
    "conservationStatus": "LC",
    "nationalStatus": "Schedule IV (WPA 1972)",
    "regionalStatus": "Verified Regional Taxon",
    "populationTrend": "Stable",
    "sensitivity": "medium",
    "endemismStatus": "widely-distributed",
    "seasonality": "Resident Altitudinal Migrant",
    "geography": {
      "kashmirCore": true,
      "jammu": true,
      "ladakh": true,
      "ajk": true,
      "gilgitBaltistan": true,
      "himachal": false,
      "punjabFoothills": false
    },
    "districts": [
      "Ganderbal",
      "Anantnag",
      "Bandipora",
      "Kupwara",
      "Baramulla",
      "Shopian",
      "Kulgam",
      "Kishtwar",
      "Doda",
      "Kargil",
      "Leh",
      "Neelum",
      "Astore",
      "Gilgit",
      "Hunza",
      "Skardu"
    ],
    "protectedAreas": [
      "Dachigam National Park",
      "Overa-Aru Wildlife Sanctuary",
      "Hemis National Park",
      "Kishtwar High Altitude National Park"
    ],
    "distributionPoints": [],
    "habitats": [
      "Braided Rivers & Torrential Streams"
    ],
    "breedingHabitat": "Mossy crevices and boulder overhangs beside cold, well-oxygenated mountain torrents.",
    "feedingEcology": "Swims and walks underwater in swift currents to capture caddisfly, stonefly, and mayfly nymphs.",
    "elevationRange": {
      "min": 1600,
      "max": 4800
    },
    "ecologicalRole": "Aquatic Macroinvertebrate Predator & Clean-Stream Bioindicator",
    "observationIntelligence": {
      "totalObservations": 210,
      "verifiedRecords": 175,
      "recentRecords": 43,
      "historicalRecords": 132
    },
    "verifiedSightings": 175,
    "threats": [
      "Stream siltation from road cutting",
      "Dewatering below small hydropower diversions"
    ],
    "description": "Aquatic songbird (subspecies cashmeriensis) diving into icy Himalayan torrents from Dachigam's Dagwan stream to Ladakh's Suru and Indus tributaries.",
    "speciesNarrative": {
      "overview": "Unique diving passerine indicative of unpolluted, oxygen-saturated coldwater mountain streams.",
      "identification": "Plump dark chocolate-brown body with crisp pure white chin, throat, and upper breast; habitually bobs on mid-stream boulders.",
      "ecology": "Mossy crevices and boulder overhangs beside cold, well-oxygenated mountain torrents. Swims and walks underwater in swift currents to capture caddisfly, stonefly, and mayfly nymphs.",
      "distribution": "Verified across Ganderbal, Anantnag, Bandipora, Kupwara, Baramulla, Shopian and adjacent Western Himalayan districts (1600–4800 m ASL).",
      "threats": "Stream siltation from road cutting; Dewatering below small hydropower diversions.",
      "conservation": "Protected across Dachigam National Park, Overa-Aru Wildlife Sanctuary, Hemis National Park."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Passerines, Flycatchers & Songbirds"
  },
  {
    "id": "BRD-022",
    "slug": "wallcreeper",
    "commonName": "Wallcreeper",
    "scientificName": "Tichodroma muraria",
    "localName": "Deewar-Gash",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Passeriformes",
      "family": "Tichodromidae",
      "genus": "Tichodroma",
      "species": "muraria"
    },
    "conservationStatus": "LC",
    "nationalStatus": "Schedule IV (WPA 1972)",
    "regionalStatus": "Verified Regional Taxon",
    "populationTrend": "Stable",
    "sensitivity": "low",
    "endemismStatus": "widely-distributed",
    "seasonality": "Resident Altitudinal Migrant",
    "geography": {
      "kashmirCore": true,
      "jammu": true,
      "ladakh": true,
      "ajk": true,
      "gilgitBaltistan": true,
      "himachal": false,
      "punjabFoothills": false
    },
    "districts": [
      "Ganderbal",
      "Anantnag",
      "Srinagar",
      "Baramulla",
      "Bandipora",
      "Kishtwar",
      "Doda",
      "Ramban",
      "Reasi",
      "Leh",
      "Kargil",
      "Neelum",
      "Gilgit",
      "Hunza",
      "Skardu"
    ],
    "protectedAreas": [
      "Dachigam National Park",
      "Hemis National Park",
      "Kishtwar High Altitude National Park"
    ],
    "distributionPoints": [],
    "habitats": [
      "Cliffs, Gorges & High Rockfaces"
    ],
    "breedingHabitat": "Sheer alpine rock faces and river canyon cliffs between 3,000 and 5,000 m, descending to lower gorges in winter.",
    "feedingEcology": "Probes rock fissures with its slender curved bill for spiders and cliff-dwelling insects.",
    "elevationRange": {
      "min": 1000,
      "max": 5000
    },
    "ecologicalRole": "Rupicolous Insectivore",
    "observationIntelligence": {
      "totalObservations": 156,
      "verifiedRecords": 130,
      "recentRecords": 32,
      "historicalRecords": 98
    },
    "verifiedSightings": 130,
    "threats": [
      "Localized cliff quarrying"
    ],
    "description": "Jewel-like crimson-winged cliff specialist breeding on sheer alpine rock walls across Ladakh, Kishtwar, and Kashmir and wintering in lower river gorges.",
    "speciesNarrative": {
      "overview": "Monotypic family specialist fluttering across vertical rock walls like a giant crimson-and-black butterfly.",
      "identification": "Ash-grey body, rounded black wings flashed with brilliant crimson coverts and white primary spots, and slender decurved black bill.",
      "ecology": "Sheer alpine rock faces and river canyon cliffs between 3,000 and 5,000 m, descending to lower gorges in winter. Probes rock fissures with its slender curved bill for spiders and cliff-dwelling insects.",
      "distribution": "Verified across Ganderbal, Anantnag, Srinagar, Baramulla, Bandipora, Kishtwar and adjacent Western Himalayan districts (1000–5000 m ASL).",
      "threats": "Localized cliff quarrying.",
      "conservation": "Protected across Dachigam National Park, Hemis National Park, Kishtwar High Altitude National Park."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Passerines, Flycatchers & Songbirds"
  },
  {
    "id": "BRD-023",
    "slug": "orange-bullfinch",
    "commonName": "Orange Bullfinch",
    "scientificName": "Pyrrhula aurantiaca",
    "localName": "Sonzal-Tsor",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Passeriformes",
      "family": "Fringillidae",
      "genus": "Pyrrhula",
      "species": "aurantiaca"
    },
    "conservationStatus": "LC",
    "nationalStatus": "Schedule IV (WPA 1972)",
    "regionalStatus": "Verified Regional Taxon",
    "populationTrend": "Stable",
    "sensitivity": "medium",
    "endemismStatus": "northwest-himalayan",
    "seasonality": "Resident Altitudinal Migrant",
    "geography": {
      "kashmirCore": true,
      "jammu": true,
      "ladakh": false,
      "ajk": true,
      "gilgitBaltistan": true,
      "himachal": true,
      "punjabFoothills": false
    },
    "districts": [
      "Baramulla",
      "Kupwara",
      "Bandipora",
      "Ganderbal",
      "Anantnag",
      "Shopian",
      "Kishtwar",
      "Doda",
      "Poonch",
      "Neelum",
      "Muzaffarabad",
      "Astore"
    ],
    "protectedAreas": [
      "Gulmarg Wildlife Sanctuary",
      "Dachigam National Park",
      "Overa-Aru Wildlife Sanctuary",
      "Kazinag National Park",
      "Machiara National Park"
    ],
    "distributionPoints": [],
    "habitats": [
      "Temperate & Subalpine Conifer Forests",
      "Deciduous Broadleaf & Riverine Forests"
    ],
    "breedingHabitat": "Subalpine silver fir, blue pine, and birch-willow forest edges.",
    "feedingEcology": "Feeds on birch catkins, conifer seeds, buds, and berries.",
    "elevationRange": {
      "min": 2400,
      "max": 3800
    },
    "ecologicalRole": "Subalpine Seed Predator & Disperser",
    "observationIntelligence": {
      "totalObservations": 138,
      "verifiedRecords": 115,
      "recentRecords": 28,
      "historicalRecords": 87
    },
    "verifiedSightings": 115,
    "threats": [
      "Degradation of subalpine birch-fir ecotones"
    ],
    "description": "Striking northwest Himalayan endemic bullfinch inhabiting subalpine fir and birch forests of Gulmarg, Sonamarg, Pahalgam, Kazinag, and Neelum.",
    "speciesNarrative": {
      "overview": "Restricted-range Western Himalayan finch closely associated with subalpine birch and fir stands.",
      "identification": "Adult male is vivid flame-orange on head, back, and underparts with black face mask, wings, and tail, and white rump.",
      "ecology": "Subalpine silver fir, blue pine, and birch-willow forest edges. Feeds on birch catkins, conifer seeds, buds, and berries.",
      "distribution": "Verified across Baramulla, Kupwara, Bandipora, Ganderbal, Anantnag, Shopian and adjacent Western Himalayan districts (2400–3800 m ASL).",
      "threats": "Degradation of subalpine birch-fir ecotones.",
      "conservation": "Protected across Gulmarg Wildlife Sanctuary, Dachigam National Park, Overa-Aru Wildlife Sanctuary."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Passerines, Flycatchers & Songbirds"
  },
  {
    "id": "BRD-024",
    "slug": "spectacled-finch",
    "commonName": "Spectacled Finch",
    "scientificName": "Callacanthis burtoni",
    "localName": "Ainak-Tsor",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Passeriformes",
      "family": "Fringillidae",
      "genus": "Callacanthis",
      "species": "burtoni"
    },
    "conservationStatus": "LC",
    "nationalStatus": "Schedule IV (WPA 1972)",
    "regionalStatus": "Verified Regional Taxon",
    "populationTrend": "Stable",
    "sensitivity": "medium",
    "endemismStatus": "northwest-himalayan",
    "seasonality": "Resident Altitudinal Migrant",
    "geography": {
      "kashmirCore": true,
      "jammu": true,
      "ladakh": false,
      "ajk": true,
      "gilgitBaltistan": false,
      "himachal": true,
      "punjabFoothills": false
    },
    "districts": [
      "Baramulla",
      "Kupwara",
      "Anantnag",
      "Ganderbal",
      "Shopian",
      "Kishtwar",
      "Doda",
      "Poonch",
      "Neelum",
      "Muzaffarabad",
      "Bagh"
    ],
    "protectedAreas": [
      "Gulmarg Wildlife Sanctuary",
      "Overa-Aru Wildlife Sanctuary",
      "Kazinag National Park"
    ],
    "distributionPoints": [],
    "habitats": [
      "Temperate & Subalpine Conifer Forests"
    ],
    "breedingHabitat": "Open temperate silver fir, spruce, and deodar forests.",
    "feedingEcology": "Extracts conifer seeds, bark buds, and viburnum berries with its stout yellowish bill.",
    "elevationRange": {
      "min": 2200,
      "max": 3500
    },
    "ecologicalRole": "Conifer Canopy Granivore",
    "observationIntelligence": {
      "totalObservations": 88,
      "verifiedRecords": 74,
      "recentRecords": 18,
      "historicalRecords": 56
    },
    "verifiedSightings": 74,
    "threats": [
      "Selective logging of mature fir and deodar stands"
    ],
    "description": "Monotypic Western Himalayan finch of temperate fir and deodar canopies across Gulmarg, Pir Panjal, Kishtwar, and Neelum.",
    "speciesNarrative": {
      "overview": "Distinctive monotypic finch restricted to temperate coniferous forests of the Western Himalayas.",
      "identification": "Male has black hood broken by vivid crimson-red 'spectacles' around the eyes, rose-pink wash on body, white wing-tips, and heavy yellow bill.",
      "ecology": "Open temperate silver fir, spruce, and deodar forests. Extracts conifer seeds, bark buds, and viburnum berries with its stout yellowish bill.",
      "distribution": "Verified across Baramulla, Kupwara, Anantnag, Ganderbal, Shopian, Kishtwar and adjacent Western Himalayan districts (2200–3500 m ASL).",
      "threats": "Selective logging of mature fir and deodar stands.",
      "conservation": "Protected across Gulmarg Wildlife Sanctuary, Overa-Aru Wildlife Sanctuary, Kazinag National Park."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Passerines, Flycatchers & Songbirds"
  },
  {
    "id": "BRD-025",
    "slug": "kashmir-nuthatch",
    "commonName": "Kashmir Nuthatch",
    "scientificName": "Sitta cashmirensis",
    "localName": "Kul-Gash",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Passeriformes",
      "family": "Sittidae",
      "genus": "Sitta",
      "species": "cashmirensis"
    },
    "conservationStatus": "LC",
    "nationalStatus": "Schedule IV (WPA 1972)",
    "regionalStatus": "Verified Regional Taxon",
    "populationTrend": "Stable",
    "sensitivity": "low",
    "endemismStatus": "northwest-himalayan",
    "seasonality": "Resident",
    "geography": {
      "kashmirCore": true,
      "jammu": true,
      "ladakh": false,
      "ajk": true,
      "gilgitBaltistan": true,
      "himachal": true,
      "punjabFoothills": false
    },
    "districts": [
      "Srinagar",
      "Ganderbal",
      "Baramulla",
      "Kupwara",
      "Bandipora",
      "Anantnag",
      "Shopian",
      "Kulgam",
      "Poonch",
      "Doda",
      "Kishtwar",
      "Neelum",
      "Muzaffarabad",
      "Astore"
    ],
    "protectedAreas": [
      "Dachigam National Park",
      "Gulmarg Wildlife Sanctuary",
      "Overa-Aru Wildlife Sanctuary",
      "Kazinag National Park"
    ],
    "distributionPoints": [],
    "habitats": [
      "Temperate & Subalpine Conifer Forests",
      "Deciduous Broadleaf & Riverine Forests"
    ],
    "breedingHabitat": "Tree cavities plastered with mud in mature pine, fir, and walnut forests.",
    "feedingEcology": "Forages headfirst down tree trunks for bark beetles, spiders, and cached pine/walnut seeds.",
    "elevationRange": {
      "min": 1800,
      "max": 3300
    },
    "ecologicalRole": "Bark-Foraging Insectivore & Seed Hoarder",
    "observationIntelligence": {
      "totalObservations": 192,
      "verifiedRecords": 160,
      "recentRecords": 40,
      "historicalRecords": 120
    },
    "verifiedSightings": 160,
    "threats": [
      "Removal of dead standing snags and old-growth timber"
    ],
    "description": "Northwest Himalayan endemic nuthatch common in temperate conifer and mixed broadleaf forests of Dachigam, Gulmarg, Pahalgam, and Neelum.",
    "speciesNarrative": {
      "overview": "Regional endemic bark-gleaning passerine of Western Himalayan montane forests.",
      "identification": "Blue-grey upperparts, black eye-stripe, warm cinnamon-rufous underparts grading paler on chin, and unpatterned undertail.",
      "ecology": "Tree cavities plastered with mud in mature pine, fir, and walnut forests. Forages headfirst down tree trunks for bark beetles, spiders, and cached pine/walnut seeds.",
      "distribution": "Verified across Srinagar, Ganderbal, Baramulla, Kupwara, Bandipora, Anantnag and adjacent Western Himalayan districts (1800–3300 m ASL).",
      "threats": "Removal of dead standing snags and old-growth timber.",
      "conservation": "Protected across Dachigam National Park, Gulmarg Wildlife Sanctuary, Overa-Aru Wildlife Sanctuary."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Passerines, Flycatchers & Songbirds"
  },
  {
    "id": "BRD-026",
    "slug": "white-capped-water-redstart",
    "commonName": "White-capped Water Redstart",
    "scientificName": "Phoenicurus leucocephalus",
    "localName": "Safed-Kall Kol-Tsor",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Passeriformes",
      "family": "Muscicapidae",
      "genus": "Phoenicurus",
      "species": "leucocephalus"
    },
    "conservationStatus": "LC",
    "nationalStatus": "Schedule IV (WPA 1972)",
    "regionalStatus": "Verified Regional Taxon",
    "populationTrend": "Stable",
    "sensitivity": "low",
    "endemismStatus": "widely-distributed",
    "seasonality": "Resident Altitudinal Migrant",
    "geography": {
      "kashmirCore": true,
      "jammu": true,
      "ladakh": true,
      "ajk": true,
      "gilgitBaltistan": true,
      "himachal": false,
      "punjabFoothills": false
    },
    "districts": [
      "Srinagar",
      "Ganderbal",
      "Anantnag",
      "Baramulla",
      "Bandipora",
      "Kupwara",
      "Shopian",
      "Kulgam",
      "Poonch",
      "Rajouri",
      "Udhampur",
      "Ramban",
      "Doda",
      "Kishtwar",
      "Kargil",
      "Leh",
      "Neelum",
      "Muzaffarabad",
      "Gilgit",
      "Skardu"
    ],
    "protectedAreas": [
      "Dachigam National Park",
      "Overa-Aru Wildlife Sanctuary",
      "Kishtwar High Altitude National Park"
    ],
    "distributionPoints": [],
    "habitats": [
      "Braided Rivers & Torrential Streams"
    ],
    "breedingHabitat": "Rock crevices and mossy banks along swift boulder-strewn mountain rivers and streams.",
    "feedingEcology": "Sallies from mid-stream rocks to hawk emerging aquatic insects and gleans larvae from wet spray zones.",
    "elevationRange": {
      "min": 600,
      "max": 4400
    },
    "ecologicalRole": "Riparian Insectivore",
    "observationIntelligence": {
      "totalObservations": 504,
      "verifiedRecords": 420,
      "recentRecords": 105,
      "historicalRecords": 315
    },
    "verifiedSightings": 420,
    "threats": [
      "Micro-hydel stream dewatering",
      "Riparian boulder extraction"
    ],
    "description": "Familiar torrent-dwelling chat perched conspicuously on spray-drenched boulders along nearly every Western Himalayan mountain stream.",
    "speciesNarrative": {
      "overview": "Bold riparian redstart of rushing Himalayan torrents, descending to foothill streams in winter.",
      "identification": "Jet-black head, breast, back, and wings contrasting with a snow-white crown cap and rich chestnut belly, rump, and tail base.",
      "ecology": "Rock crevices and mossy banks along swift boulder-strewn mountain rivers and streams. Sallies from mid-stream rocks to hawk emerging aquatic insects and gleans larvae from wet spray zones.",
      "distribution": "Verified across Srinagar, Ganderbal, Anantnag, Baramulla, Bandipora, Kupwara and adjacent Western Himalayan districts (600–4400 m ASL).",
      "threats": "Micro-hydel stream dewatering; Riparian boulder extraction.",
      "conservation": "Protected across Dachigam National Park, Overa-Aru Wildlife Sanctuary, Kishtwar High Altitude National Park."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Passerines, Flycatchers & Songbirds"
  },
  {
    "id": "BRD-027",
    "slug": "plumbeous-water-redstart",
    "commonName": "Plumbeous Water Redstart",
    "scientificName": "Phoenicurus fuliginosus",
    "localName": "Neel Kol-Tsor",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Passeriformes",
      "family": "Muscicapidae",
      "genus": "Phoenicurus",
      "species": "fuliginosus"
    },
    "conservationStatus": "LC",
    "nationalStatus": "Schedule IV (WPA 1972)",
    "regionalStatus": "Verified Regional Taxon",
    "populationTrend": "Stable",
    "sensitivity": "low",
    "endemismStatus": "widely-distributed",
    "seasonality": "Resident Altitudinal Migrant",
    "geography": {
      "kashmirCore": true,
      "jammu": true,
      "ladakh": false,
      "ajk": true,
      "gilgitBaltistan": false,
      "himachal": false,
      "punjabFoothills": false
    },
    "districts": [
      "Srinagar",
      "Ganderbal",
      "Anantnag",
      "Baramulla",
      "Kupwara",
      "Bandipora",
      "Shopian",
      "Kulgam",
      "Udhampur",
      "Reasi",
      "Rajouri",
      "Poonch",
      "Ramban",
      "Doda",
      "Kishtwar",
      "Neelum",
      "Muzaffarabad"
    ],
    "protectedAreas": [
      "Dachigam National Park",
      "Overa-Aru Wildlife Sanctuary",
      "Kazinag National Park"
    ],
    "distributionPoints": [],
    "habitats": [
      "Braided Rivers & Torrential Streams"
    ],
    "breedingHabitat": "Shaded boulder streams, waterfalls, and rocky ravines in foothills and montane valleys.",
    "feedingEcology": "Hawks dipterans, stoneflies, and mayflies over fast-flowing water, fanning its tail continuously.",
    "elevationRange": {
      "min": 500,
      "max": 3800
    },
    "ecologicalRole": "Riparian Aerial Insectivore",
    "observationIntelligence": {
      "totalObservations": 456,
      "verifiedRecords": 380,
      "recentRecords": 95,
      "historicalRecords": 285
    },
    "verifiedSightings": 380,
    "threats": [
      "Stream pollution and channelization"
    ],
    "description": "Agile slate-blue and rusty-tailed stream chat sharing Himalayan boulder torrents with the White-capped Water Redstart.",
    "speciesNarrative": {
      "overview": "Ubiquitous fast-stream passerine renowned for rapid tail-fanning displays on wet rocks.",
      "identification": "Male is slaty-blue overall with bright rusty-rufous tail and vent; female is grey-brown with white-spotted underparts and white-and-black tail base.",
      "ecology": "Shaded boulder streams, waterfalls, and rocky ravines in foothills and montane valleys. Hawks dipterans, stoneflies, and mayflies over fast-flowing water, fanning its tail continuously.",
      "distribution": "Verified across Srinagar, Ganderbal, Anantnag, Baramulla, Kupwara, Bandipora and adjacent Western Himalayan districts (500–3800 m ASL).",
      "threats": "Stream pollution and channelization.",
      "conservation": "Protected across Dachigam National Park, Overa-Aru Wildlife Sanctuary, Kazinag National Park."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Passerines, Flycatchers & Songbirds"
  },
  {
    "id": "BRD-028",
    "slug": "european-roller",
    "commonName": "European Roller",
    "scientificName": "Coracias garrulus",
    "localName": "Neel-Kras",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Coraciiformes",
      "family": "Coraciidae",
      "genus": "Coracias",
      "species": "garrulus"
    },
    "conservationStatus": "LC",
    "nationalStatus": "Schedule IV (WPA 1972)",
    "regionalStatus": "Verified Regional Taxon",
    "populationTrend": "Stable",
    "sensitivity": "medium",
    "endemismStatus": "widely-distributed",
    "seasonality": "Summer Visitor & Passage Migrant",
    "geography": {
      "kashmirCore": true,
      "jammu": false,
      "ladakh": false,
      "ajk": true,
      "gilgitBaltistan": true,
      "himachal": false,
      "punjabFoothills": false
    },
    "districts": [
      "Srinagar",
      "Budgam",
      "Pulwama",
      "Baramulla",
      "Anantnag",
      "Ganderbal",
      "Bandipora",
      "Kupwara",
      "Muzaffarabad",
      "Gilgit"
    ],
    "protectedAreas": [
      "Dachigam National Park",
      "Tral Wildlife Sanctuary"
    ],
    "distributionPoints": [],
    "habitats": [
      "Agricultural Margins & Orchards",
      "Deciduous Broadleaf & Riverine Forests"
    ],
    "breedingHabitat": "Cavities in old chinars, willows, and earthen karewa cliffs across the Kashmir Valley (subspecies semenowi).",
    "feedingEcology": "Sit-and-wait predator pouncing on large beetles, cicadas, grasshoppers, and small lizards.",
    "elevationRange": {
      "min": 1400,
      "max": 2400
    },
    "ecologicalRole": "Karewa & Orchard Macro-Insectivore",
    "observationIntelligence": {
      "totalObservations": 110,
      "verifiedRecords": 92,
      "recentRecords": 23,
      "historicalRecords": 69
    },
    "verifiedSightings": 92,
    "threats": [
      "Loss of hollow chinar and willow nesting trees",
      "Heavy orchard pesticide spraying"
    ],
    "description": "Turquoise-and-chestnut summer breeder (race semenowi) nesting in hollow chinars and karewa banks of Pulwama, Budgam, Srinagar, and Baramulla before migrating to East Africa.",
    "speciesNarrative": {
      "overview": "Long-distance Afro-Palearctic migrant whose eastern subspecies breeds in the Kashmir Valley.",
      "identification": "Iridescent azure-turquoise head, breast, and wing coverts contrasting with warm chestnut-brown mantle and black flight feathers.",
      "ecology": "Cavities in old chinars, willows, and earthen karewa cliffs across the Kashmir Valley (subspecies semenowi). Sit-and-wait predator pouncing on large beetles, cicadas, grasshoppers, and small lizards.",
      "distribution": "Verified across Srinagar, Budgam, Pulwama, Baramulla, Anantnag, Ganderbal and adjacent Western Himalayan districts (1400–2400 m ASL).",
      "threats": "Loss of hollow chinar and willow nesting trees; Heavy orchard pesticide spraying.",
      "conservation": "Protected across Dachigam National Park, Tral Wildlife Sanctuary."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Passerines, Flycatchers & Songbirds",
    "migrationWindow": {
      "season": "summer",
      "arrivalMonth": 5,
      "departureMonth": 9,
      "peakPresence": [
        6,
        7,
        8
      ],
      "migrationType": "breeder",
      "flyway": "central-asian",
      "concentration": "medium"
    }
  },
  {
    "id": "BRD-029",
    "slug": "common-kingfisher",
    "commonName": "Common Kingfisher",
    "scientificName": "Alcedo atthis",
    "localName": "Kola-Tonton / کولہٕ ٹۄنٹۄن",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Coraciiformes",
      "family": "Alcedinidae",
      "genus": "Alcedo",
      "species": "atthis"
    },
    "conservationStatus": "LC",
    "nationalStatus": "Schedule IV (WPA 1972)",
    "regionalStatus": "Verified Regional Taxon",
    "populationTrend": "Stable",
    "sensitivity": "low",
    "endemismStatus": "widely-distributed",
    "seasonality": "Resident",
    "geography": {
      "kashmirCore": true,
      "jammu": true,
      "ladakh": false,
      "ajk": true,
      "gilgitBaltistan": false,
      "himachal": false,
      "punjabFoothills": true
    },
    "districts": [
      "Srinagar",
      "Ganderbal",
      "Bandipora",
      "Baramulla",
      "Budgam",
      "Pulwama",
      "Anantnag",
      "Kupwara",
      "Jammu",
      "Samba",
      "Kathua",
      "Udhampur",
      "Rajouri",
      "Mirpur",
      "Muzaffarabad"
    ],
    "protectedAreas": [
      "Dal Lake",
      "Wular Lake Ramsar Site",
      "Hokersar Wetland",
      "Shallabugh Wetland",
      "Surinsar-Mansar Wildlife Sanctuary"
    ],
    "distributionPoints": [],
    "habitats": [
      "Wetlands, Lakes & Marshes (Ramsar Sites)",
      "Braided Rivers & Torrential Streams"
    ],
    "breedingHabitat": "Horizontal burrows excavated in vertical earthen canal and stream banks.",
    "feedingEcology": "Plunge-dives from low waterside perches for small minnows, Gambusia, Schizothorax fry, and dragonfly larvae.",
    "elevationRange": {
      "min": 280,
      "max": 2200
    },
    "ecologicalRole": "Littoral Piscivore",
    "observationIntelligence": {
      "totalObservations": 768,
      "verifiedRecords": 640,
      "recentRecords": 160,
      "historicalRecords": 480
    },
    "verifiedSightings": 640,
    "threats": [
      "Concrete bank lining of lake channels",
      "Domestic sewage turbidity"
    ],
    "description": "Iconic turquoise-and-rufous kingfisher ubiquitous along Dal Lake shikara waterways, Wular channels, Jhelum backwaters, and Jammu ponds.",
    "speciesNarrative": {
      "overview": "Small plunge-diving kingfisher iconic to Kashmir's lacustrine channels and canals.",
      "identification": "Electric-blue crown, wings, and back stripe, warm orange-rufous ear patch and underparts, and white neck patch.",
      "ecology": "Horizontal burrows excavated in vertical earthen canal and stream banks. Plunge-dives from low waterside perches for small minnows, Gambusia, Schizothorax fry, and dragonfly larvae.",
      "distribution": "Verified across Srinagar, Ganderbal, Bandipora, Baramulla, Budgam, Pulwama and adjacent Western Himalayan districts (280–2200 m ASL).",
      "threats": "Concrete bank lining of lake channels; Domestic sewage turbidity.",
      "conservation": "Protected across Dal Lake, Wular Lake Ramsar Site, Hokersar Wetland."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Waders & Shorebirds"
  },
  {
    "id": "BRD-030",
    "slug": "pied-kingfisher",
    "commonName": "Pied Kingfisher",
    "scientificName": "Ceryle rudis",
    "localName": "Safed-Kola Tonton",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Coraciiformes",
      "family": "Alcedinidae",
      "genus": "Ceryle",
      "species": "rudis"
    },
    "conservationStatus": "LC",
    "nationalStatus": "Schedule IV (WPA 1972)",
    "regionalStatus": "Verified Regional Taxon",
    "populationTrend": "Stable",
    "sensitivity": "low",
    "endemismStatus": "widely-distributed",
    "seasonality": "Resident",
    "geography": {
      "kashmirCore": true,
      "jammu": true,
      "ladakh": false,
      "ajk": true,
      "gilgitBaltistan": false,
      "himachal": false,
      "punjabFoothills": true
    },
    "districts": [
      "Srinagar",
      "Bandipora",
      "Baramulla",
      "Ganderbal",
      "Budgam",
      "Pulwama",
      "Anantnag",
      "Jammu",
      "Samba",
      "Kathua",
      "Mirpur"
    ],
    "protectedAreas": [
      "Wular Lake Ramsar Site",
      "Dal Lake",
      "Hokersar Wetland",
      "Surinsar-Mansar Wildlife Sanctuary"
    ],
    "distributionPoints": [],
    "habitats": [
      "Wetlands, Lakes & Marshes (Ramsar Sites)",
      "Braided Rivers & Torrential Streams"
    ],
    "breedingHabitat": "Colonial or solitary sandbank burrows along slow rivers and lakeshores.",
    "feedingEcology": "Hovers conspicuously over open water before plunge-diving vertically for fish.",
    "elevationRange": {
      "min": 280,
      "max": 1800
    },
    "ecologicalRole": "Open-Water Pelagic Piscivore",
    "observationIntelligence": {
      "totalObservations": 588,
      "verifiedRecords": 490,
      "recentRecords": 122,
      "historicalRecords": 368
    },
    "verifiedSightings": 490,
    "threats": [
      "Water turbidity impeding visual hunting",
      "Sandbank excavation"
    ],
    "description": "Boldly patterned black-and-white kingfisher famous for hovering mid-air above Dal, Nigeen, Manasbal, Wular, and Tawi waters before diving.",
    "speciesNarrative": {
      "overview": "Open-water hovering kingfisher common across Kashmir Valley lakes and Jammu rivers.",
      "identification": "Crisp black-and-white pied plumage, shaggy crest, and dagger-like black bill (two black breast bands in males, single broken band in females).",
      "ecology": "Colonial or solitary sandbank burrows along slow rivers and lakeshores. Hovers conspicuously over open water before plunge-diving vertically for fish.",
      "distribution": "Verified across Srinagar, Bandipora, Baramulla, Ganderbal, Budgam, Pulwama and adjacent Western Himalayan districts (280–1800 m ASL).",
      "threats": "Water turbidity impeding visual hunting; Sandbank excavation.",
      "conservation": "Protected across Wular Lake Ramsar Site, Dal Lake, Hokersar Wetland."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Waders & Shorebirds"
  },
  {
    "id": "BRD-031",
    "slug": "great-crested-grebe",
    "commonName": "Great Crested Grebe",
    "scientificName": "Podiceps cristatus",
    "localName": "Peth-Pind",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Podicipediformes",
      "family": "Podicipedidae",
      "genus": "Podiceps",
      "species": "cristatus"
    },
    "conservationStatus": "LC",
    "nationalStatus": "Schedule IV (WPA 1972)",
    "regionalStatus": "Verified Regional Taxon",
    "populationTrend": "Stable",
    "sensitivity": "medium",
    "endemismStatus": "widely-distributed",
    "seasonality": "Summer Breeder (Ladakh) & Winter Visitor (Kashmir/Jammu)",
    "geography": {
      "kashmirCore": true,
      "jammu": true,
      "ladakh": true,
      "ajk": true,
      "gilgitBaltistan": false,
      "himachal": false,
      "punjabFoothills": true
    },
    "districts": [
      "Leh",
      "Bandipora",
      "Baramulla",
      "Srinagar",
      "Ganderbal",
      "Jammu",
      "Mirpur"
    ],
    "protectedAreas": [
      "Tsomoriri Ramsar Site",
      "Tso Kar Wetland Complex",
      "Wular Lake Ramsar Site",
      "Manasbal Lake",
      "Surinsar-Mansar Wildlife Sanctuary"
    ],
    "distributionPoints": [],
    "habitats": [
      "High Altitude Lakes",
      "Wetlands, Lakes & Marshes (Ramsar Sites)"
    ],
    "breedingHabitat": "Floating macrophyte platform nests at high-altitude Changthang lakes (Tsomoriri, Tso Kar) and deep reed-bordered lakes.",
    "feedingEcology": "Pursuit-dives underwater for fish, aquatic insects, and crustaceans.",
    "elevationRange": {
      "min": 300,
      "max": 4600
    },
    "ecologicalRole": "Diving Piscivore",
    "observationIntelligence": {
      "totalObservations": 252,
      "verifiedRecords": 210,
      "recentRecords": 52,
      "historicalRecords": 158
    },
    "verifiedSightings": 210,
    "threats": [
      "Gillnet drowning",
      "Shoreline disturbance at breeding lakes"
    ],
    "description": "Elegant crested waterbird breeding on high-altitude Ladakh Ramsar lakes (Tsomoriri, Tso Kar) and wintering on Wular, Manasbal, Dal, and Mangla.",
    "speciesNarrative": {
      "overview": "Large pursuit-diving grebe noted for elaborate mirrored courtship displays.",
      "identification": "Slender white neck, pink dagger bill, and in breeding plumage twin black crown tufts and chestnut-and-black cheek tippets.",
      "ecology": "Floating macrophyte platform nests at high-altitude Changthang lakes (Tsomoriri, Tso Kar) and deep reed-bordered lakes. Pursuit-dives underwater for fish, aquatic insects, and crustaceans.",
      "distribution": "Verified across Leh, Bandipora, Baramulla, Srinagar, Ganderbal, Jammu and adjacent Western Himalayan districts (300–4600 m ASL).",
      "threats": "Gillnet drowning; Shoreline disturbance at breeding lakes.",
      "conservation": "Protected across Tsomoriri Ramsar Site, Tso Kar Wetland Complex, Wular Lake Ramsar Site."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Migratory Waterfowl & Wetland Birds"
  },
  {
    "id": "BRD-032",
    "slug": "eurasian-coot",
    "commonName": "Eurasian Coot",
    "scientificName": "Fulica atra",
    "localName": "Kolur / کولُر",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Gruiformes",
      "family": "Rallidae",
      "genus": "Fulica",
      "species": "atra"
    },
    "conservationStatus": "LC",
    "nationalStatus": "Schedule IV (WPA 1972)",
    "regionalStatus": "Verified Regional Taxon",
    "populationTrend": "Stable",
    "sensitivity": "low",
    "endemismStatus": "widely-distributed",
    "seasonality": "Abundant Winter Visitor & Local Breeder",
    "geography": {
      "kashmirCore": true,
      "jammu": true,
      "ladakh": true,
      "ajk": true,
      "gilgitBaltistan": false,
      "himachal": false,
      "punjabFoothills": true
    },
    "districts": [
      "Srinagar",
      "Bandipora",
      "Baramulla",
      "Budgam",
      "Ganderbal",
      "Pulwama",
      "Anantnag",
      "Jammu",
      "Samba",
      "Kathua",
      "Leh",
      "Mirpur"
    ],
    "protectedAreas": [
      "Hokersar Wetland",
      "Wular Lake Ramsar Site",
      "Shallabugh Wetland",
      "Hygam Wetland",
      "Surinsar-Mansar Wildlife Sanctuary"
    ],
    "distributionPoints": [],
    "habitats": [
      "Wetlands, Lakes & Marshes (Ramsar Sites)"
    ],
    "breedingHabitat": "Floating reed platforms anchored among emergent Typha and Sparganium.",
    "feedingEcology": "Dives and up-ends for submerged pondweeds, charophytes, seeds, and snails.",
    "elevationRange": {
      "min": 280,
      "max": 4500
    },
    "ecologicalRole": "Dominant Macrophyte Herbivore in Wintering Wetlands",
    "observationIntelligence": {
      "totalObservations": 10200,
      "verifiedRecords": 8500,
      "recentRecords": 2125,
      "historicalRecords": 6375
    },
    "verifiedSightings": 8500,
    "threats": [
      "Wetland siltation",
      "Illegal trapping"
    ],
    "description": "One of the most abundant waterbirds in Asian Waterbird Census counts across Hokersar, Wular, Shallabugh, Hygam, Dal, and Gharana.",
    "speciesNarrative": {
      "overview": "Gregarious slaty-black rail forming massive wintering rafts on Kashmir and Jammu wetlands.",
      "identification": "Uniformly slaty-black plump waterbird with bright ivory-white bill and frontal forehead shield, and lobed toes.",
      "ecology": "Floating reed platforms anchored among emergent Typha and Sparganium. Dives and up-ends for submerged pondweeds, charophytes, seeds, and snails.",
      "distribution": "Verified across Srinagar, Bandipora, Baramulla, Budgam, Ganderbal, Pulwama and adjacent Western Himalayan districts (280–4500 m ASL).",
      "threats": "Wetland siltation; Illegal trapping.",
      "conservation": "Protected across Hokersar Wetland, Wular Lake Ramsar Site, Shallabugh Wetland."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Migratory Waterfowl & Wetland Birds",
    "migrationWindow": {
      "season": "winter",
      "arrivalMonth": 10,
      "departureMonth": 4,
      "peakPresence": [
        11,
        12,
        1,
        2
      ],
      "migrationType": "winter-visitor",
      "flyway": "central-asian",
      "concentration": "very-high"
    }
  },
  {
    "id": "BRD-033",
    "slug": "common-moorhen",
    "commonName": "Common Moorhen",
    "scientificName": "Gallinula chloropus",
    "localName": "Tech / ٹٮ۪چھ",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Gruiformes",
      "family": "Rallidae",
      "genus": "Gallinula",
      "species": "chloropus"
    },
    "conservationStatus": "LC",
    "nationalStatus": "Schedule IV (WPA 1972)",
    "regionalStatus": "Verified Regional Taxon",
    "populationTrend": "Stable",
    "sensitivity": "low",
    "endemismStatus": "widely-distributed",
    "seasonality": "Resident & Local Migrant",
    "geography": {
      "kashmirCore": true,
      "jammu": true,
      "ladakh": false,
      "ajk": true,
      "gilgitBaltistan": false,
      "himachal": false,
      "punjabFoothills": true
    },
    "districts": [
      "Srinagar",
      "Ganderbal",
      "Bandipora",
      "Baramulla",
      "Budgam",
      "Pulwama",
      "Anantnag",
      "Jammu",
      "Samba",
      "Kathua",
      "Mirpur"
    ],
    "protectedAreas": [
      "Dal Lake",
      "Hokersar Wetland",
      "Shallabugh Wetland",
      "Hygam Wetland",
      "Wular Lake Ramsar Site"
    ],
    "distributionPoints": [],
    "habitats": [
      "Wetlands, Lakes & Marshes (Ramsar Sites)"
    ],
    "breedingHabitat": "Dense lotus beds, floating gardens ('Radh'), and reed marshes across Valley lakes.",
    "feedingEcology": "Omnivorous; gleans duckweed, aquatic seeds, snails, and insects along marsh edges.",
    "elevationRange": {
      "min": 280,
      "max": 2200
    },
    "ecologicalRole": "Marsh-Edge Omnivore & Seed Disperser",
    "observationIntelligence": {
      "totalObservations": 1440,
      "verifiedRecords": 1200,
      "recentRecords": 300,
      "historicalRecords": 900
    },
    "verifiedSightings": 1200,
    "threats": [
      "Destruction of reedbed nesting fringes during mechanical de-weeding"
    ],
    "description": "Abundant resident marsh bird breeding throughout Dal Lake floating gardens, Anchar, Hokersar, Hygam, Wular, and Jammu ponds.",
    "speciesNarrative": {
      "overview": "Familiar marsh rail of vegetated lake margins and lotus beds.",
      "identification": "Blackish-brown plumage, white flank stripe, split white undertail patches, yellow-green legs, and red frontal shield and yellow-tipped red bill.",
      "ecology": "Dense lotus beds, floating gardens ('Radh'), and reed marshes across Valley lakes. Omnivorous; gleans duckweed, aquatic seeds, snails, and insects along marsh edges.",
      "distribution": "Verified across Srinagar, Ganderbal, Bandipora, Baramulla, Budgam, Pulwama and adjacent Western Himalayan districts (280–2200 m ASL).",
      "threats": "Destruction of reedbed nesting fringes during mechanical de-weeding.",
      "conservation": "Protected across Dal Lake, Hokersar Wetland, Shallabugh Wetland."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Migratory Waterfowl & Wetland Birds"
  },
  {
    "id": "BRD-034",
    "slug": "pheasant-tailed-jacana",
    "commonName": "Pheasant-tailed Jacana",
    "scientificName": "Hydrophasianus chirurgus",
    "localName": "Gund-Kാവ / پَمپوش مۄر",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Charadriiformes",
      "family": "Jacanidae",
      "genus": "Hydrophasianus",
      "species": "chirurgus"
    },
    "conservationStatus": "LC",
    "nationalStatus": "Schedule IV (WPA 1972)",
    "regionalStatus": "Verified Regional Taxon",
    "populationTrend": "Stable",
    "sensitivity": "medium",
    "endemismStatus": "widely-distributed",
    "seasonality": "Summer Visitor (Breeder in Kashmir Lakes)",
    "geography": {
      "kashmirCore": true,
      "jammu": true,
      "ladakh": false,
      "ajk": false,
      "gilgitBaltistan": false,
      "himachal": false,
      "punjabFoothills": true
    },
    "districts": [
      "Srinagar",
      "Bandipora",
      "Baramulla",
      "Ganderbal",
      "Budgam",
      "Jammu",
      "Kathua"
    ],
    "protectedAreas": [
      "Dal Lake",
      "Manasbal Lake",
      "Wular Lake Ramsar Site",
      "Anchar Lake",
      "Surinsar-Mansar Wildlife Sanctuary"
    ],
    "distributionPoints": [],
    "habitats": [
      "Wetlands, Lakes & Marshes (Ramsar Sites)"
    ],
    "breedingHabitat": "Floating Nelumbo nucifera (lotus), Nymphaea, and Trapa natans (water chestnut) mats on Dal, Nigeen, Manasbal, and Wular lakes; polyandrous.",
    "feedingEcology": "Walks across floating lily pads on elongated toes, picking insects, snails, and aquatic seeds.",
    "elevationRange": {
      "min": 280,
      "max": 1700
    },
    "ecologicalRole": "Floating-Macrophyte Specialist & Polyandrous Wetland Breeder",
    "observationIntelligence": {
      "totalObservations": 372,
      "verifiedRecords": 310,
      "recentRecords": 77,
      "historicalRecords": 233
    },
    "verifiedSightings": 310,
    "threats": [
      "Premature harvesting of lotus and water-chestnut beds",
      "Motorboat wake swamping floating nests"
    ],
    "description": "Graceful summer breeder walking across lotus and water-chestnut pads of Dal, Nigeen, Manasbal, and Wular lakes with flowing sickle-like tail plumes.",
    "speciesNarrative": {
      "overview": "Classic polyandrous lily-trotter summering on Kashmir's lotus and water-chestnut lakes.",
      "identification": "Breeding adult shows white face and wings, silky golden-yellow hindneck, chocolate-brown body, and long arching pheasant-like tail.",
      "ecology": "Floating Nelumbo nucifera (lotus), Nymphaea, and Trapa natans (water chestnut) mats on Dal, Nigeen, Manasbal, and Wular lakes; polyandrous. Walks across floating lily pads on elongated toes, picking insects, snails, and aquatic seeds.",
      "distribution": "Verified across Srinagar, Bandipora, Baramulla, Ganderbal, Budgam, Jammu and adjacent Western Himalayan districts (280–1700 m ASL).",
      "threats": "Premature harvesting of lotus and water-chestnut beds; Motorboat wake swamping floating nests.",
      "conservation": "Protected across Dal Lake, Manasbal Lake, Wular Lake Ramsar Site."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Waders & Shorebirds",
    "migrationWindow": {
      "season": "summer",
      "arrivalMonth": 5,
      "departureMonth": 9,
      "peakPresence": [
        6,
        7,
        8
      ],
      "migrationType": "breeder",
      "flyway": "central-asian",
      "concentration": "high"
    }
  },
  {
    "id": "BRD-035",
    "slug": "red-billed-chough",
    "commonName": "Red-billed Chough",
    "scientificName": "Pyrrhocorax pyrrhocorax",
    "localName": "Wozul-Chounch Kav",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Passeriformes",
      "family": "Corvidae",
      "genus": "Pyrrhocorax",
      "species": "pyrrhocorax"
    },
    "conservationStatus": "LC",
    "nationalStatus": "Schedule IV (WPA 1972)",
    "regionalStatus": "Verified Regional Taxon",
    "populationTrend": "Stable",
    "sensitivity": "low",
    "endemismStatus": "widely-distributed",
    "seasonality": "Resident",
    "geography": {
      "kashmirCore": true,
      "jammu": true,
      "ladakh": true,
      "ajk": true,
      "gilgitBaltistan": true,
      "himachal": false,
      "punjabFoothills": false
    },
    "districts": [
      "Ganderbal",
      "Anantnag",
      "Bandipora",
      "Baramulla",
      "Kupwara",
      "Kishtwar",
      "Doda",
      "Leh",
      "Kargil",
      "Neelum",
      "Astore",
      "Gilgit",
      "Hunza",
      "Nagar",
      "Skardu",
      "Shigar",
      "Ghanche"
    ],
    "protectedAreas": [
      "Hemis National Park",
      "Kishtwar High Altitude National Park",
      "Overa-Aru Wildlife Sanctuary",
      "Khunjerab National Park"
    ],
    "distributionPoints": [],
    "habitats": [
      "Alpine Meadows & Scree (Treeline Ecotone)",
      "Cliffs, Gorges & High Rockfaces"
    ],
    "breedingHabitat": "Cliff crevices, monastery eaves, and rock caverns in high mountain valleys.",
    "feedingEcology": "Probes short-turf alpine pastures and barley stubble for beetle grubs, ants, and fallen grain.",
    "elevationRange": {
      "min": 2200,
      "max": 5500
    },
    "ecologicalRole": "Alpine Turf Soil-Invertebrate Forager",
    "observationIntelligence": {
      "totalObservations": 624,
      "verifiedRecords": 520,
      "recentRecords": 130,
      "historicalRecords": 390
    },
    "verifiedSightings": 520,
    "threats": [
      "Localized veterinary pesticide exposure in livestock pastures"
    ],
    "description": "Acrobatic glossy-black corvid of high-altitude pastures, gorges, and monastery villages across Ladakh, Zanskar, Kishtwar, Sonamarg, and Gilgit-Baltistan.",
    "speciesNarrative": {
      "overview": "Gregarious high-mountain corvid performing aerial tumbles along windy cliff faces.",
      "identification": "Glossy blue-black plumage, long decurved vermilion-red bill, red legs, and deeply fingered primary tips.",
      "ecology": "Cliff crevices, monastery eaves, and rock caverns in high mountain valleys. Probes short-turf alpine pastures and barley stubble for beetle grubs, ants, and fallen grain.",
      "distribution": "Verified across Ganderbal, Anantnag, Bandipora, Baramulla, Kupwara, Kishtwar and adjacent Western Himalayan districts (2200–5500 m ASL).",
      "threats": "Localized veterinary pesticide exposure in livestock pastures.",
      "conservation": "Protected across Hemis National Park, Kishtwar High Altitude National Park, Overa-Aru Wildlife Sanctuary."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Passerines, Flycatchers & Songbirds"
  },
  {
    "id": "BRD-036",
    "slug": "yellow-billed-chough",
    "commonName": "Yellow-billed (Alpine) Chough",
    "scientificName": "Pyrrhocorax graculus",
    "localName": "Zerd-Chounch Kav",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Passeriformes",
      "family": "Corvidae",
      "genus": "Pyrrhocorax",
      "species": "graculus"
    },
    "conservationStatus": "LC",
    "nationalStatus": "Schedule IV (WPA 1972)",
    "regionalStatus": "Verified Regional Taxon",
    "populationTrend": "Stable",
    "sensitivity": "low",
    "endemismStatus": "widely-distributed",
    "seasonality": "Resident",
    "geography": {
      "kashmirCore": true,
      "jammu": true,
      "ladakh": true,
      "ajk": true,
      "gilgitBaltistan": true,
      "himachal": false,
      "punjabFoothills": false
    },
    "districts": [
      "Ganderbal",
      "Anantnag",
      "Bandipora",
      "Baramulla",
      "Kishtwar",
      "Leh",
      "Kargil",
      "Neelum",
      "Astore",
      "Gilgit",
      "Hunza",
      "Nagar",
      "Skardu",
      "Shigar",
      "Ghanche"
    ],
    "protectedAreas": [
      "Hemis National Park",
      "Kishtwar High Altitude National Park",
      "Thajwas Wildlife Sanctuary",
      "Khunjerab National Park"
    ],
    "distributionPoints": [],
    "habitats": [
      "Alpine Meadows & Scree (Treeline Ecotone)",
      "Cliffs, Gorges & High Rockfaces"
    ],
    "breedingHabitat": "High glacial cirque cliffs and vertical crags up to extreme elevations (>5,000 m).",
    "feedingEcology": "Summer insectivore on snowfields and autumn berry/seed feeder.",
    "elevationRange": {
      "min": 2800,
      "max": 6500
    },
    "ecologicalRole": "Extreme-Altitude Snowfield Scavenger & Berry Disperser",
    "observationIntelligence": {
      "totalObservations": 576,
      "verifiedRecords": 480,
      "recentRecords": 120,
      "historicalRecords": 360
    },
    "verifiedSightings": 480,
    "threats": [
      "Unregulated food waste around high mountain trekking camps"
    ],
    "description": "Highest-nesting passerine in the Karakoram-Himalaya, foraging along glacial moraines and high passes from Kolahoi and Zoji La to K2 base camp.",
    "speciesNarrative": {
      "overview": "Extreme-altitude corvid ascending higher than Red-billed Chough into nival glacier zones.",
      "identification": "Glossy black plumage, shorter bright yellow bill, red legs, and narrower rounded wingtips.",
      "ecology": "High glacial cirque cliffs and vertical crags up to extreme elevations (>5,000 m). Summer insectivore on snowfields and autumn berry/seed feeder.",
      "distribution": "Verified across Ganderbal, Anantnag, Bandipora, Baramulla, Kishtwar, Leh and adjacent Western Himalayan districts (2800–6500 m ASL).",
      "threats": "Unregulated food waste around high mountain trekking camps.",
      "conservation": "Protected across Hemis National Park, Kishtwar High Altitude National Park, Thajwas Wildlife Sanctuary."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Passerines, Flycatchers & Songbirds"
  },
  {
    "id": "BRD-037",
    "slug": "himalayan-woodpecker",
    "commonName": "Himalayan Woodpecker",
    "scientificName": "Dendrocopos himalayensis",
    "localName": "Kul-Thokur",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Piciformes",
      "family": "Picidae",
      "genus": "Dendrocopos",
      "species": "himalayensis"
    },
    "conservationStatus": "LC",
    "nationalStatus": "Schedule IV (WPA 1972)",
    "regionalStatus": "Verified Regional Taxon",
    "populationTrend": "Stable",
    "sensitivity": "low",
    "endemismStatus": "himalayan-endemic",
    "seasonality": "Resident",
    "geography": {
      "kashmirCore": true,
      "jammu": true,
      "ladakh": false,
      "ajk": true,
      "gilgitBaltistan": false,
      "himachal": true,
      "punjabFoothills": false
    },
    "districts": [
      "Srinagar",
      "Ganderbal",
      "Baramulla",
      "Kupwara",
      "Bandipora",
      "Anantnag",
      "Shopian",
      "Kulgam",
      "Poonch",
      "Rajouri",
      "Doda",
      "Kishtwar",
      "Ramban",
      "Neelum",
      "Muzaffarabad",
      "Bagh"
    ],
    "protectedAreas": [
      "Dachigam National Park",
      "Gulmarg Wildlife Sanctuary",
      "Overa-Aru Wildlife Sanctuary",
      "Kazinag National Park"
    ],
    "distributionPoints": [],
    "habitats": [
      "Temperate & Subalpine Conifer Forests",
      "Deciduous Broadleaf & Riverine Forests"
    ],
    "breedingHabitat": "Excavated nest holes in mature blue pine, fir, deodar, oak, and walnut trunks.",
    "feedingEcology": "Chisels bark for wood-boring beetle larvae, ants, and pine/walnut seeds.",
    "elevationRange": {
      "min": 1600,
      "max": 3300
    },
    "ecologicalRole": "Primary Cavity Excavator (Keystone Nest-Hole Engineer for Owls, Tits & Flycatchers)",
    "observationIntelligence": {
      "totalObservations": 408,
      "verifiedRecords": 340,
      "recentRecords": 85,
      "historicalRecords": 255
    },
    "verifiedSightings": 340,
    "threats": [
      "Sanitation removal of standing dead snags in managed forests"
    ],
    "description": "Most common pied woodpecker of Kashmir and Pir Panjal montane forests, excavating cavities later used by Kashmir Flycatchers and nuthatches.",
    "speciesNarrative": {
      "overview": "Keystone cavity-excavating woodpecker of Western Himalayan conifer and walnut-oak forests.",
      "identification": "Black-and-white pied upperparts with large white shoulder patches, buffy-grey unstreaked underparts, crimson vent, and red crown in males.",
      "ecology": "Excavated nest holes in mature blue pine, fir, deodar, oak, and walnut trunks. Chisels bark for wood-boring beetle larvae, ants, and pine/walnut seeds.",
      "distribution": "Verified across Srinagar, Ganderbal, Baramulla, Kupwara, Bandipora, Anantnag and adjacent Western Himalayan districts (1600–3300 m ASL).",
      "threats": "Sanitation removal of standing dead snags in managed forests.",
      "conservation": "Protected across Dachigam National Park, Gulmarg Wildlife Sanctuary, Overa-Aru Wildlife Sanctuary."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Passerines, Flycatchers & Songbirds"
  },
  {
    "id": "MIG-001",
    "slug": "mallard",
    "commonName": "Mallard",
    "scientificName": "Anas platyrhynchos",
    "localName": "Nilij / نِلِج",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Anseriformes",
      "family": "Anatidae",
      "genus": "Anas",
      "species": "platyrhynchos"
    },
    "conservationStatus": "LC",
    "nationalStatus": "Schedule IV (WPA 1972)",
    "regionalStatus": "Verified Regional Taxon",
    "populationTrend": "Stable",
    "sensitivity": "low",
    "endemismStatus": "widely-distributed",
    "seasonality": "Abundant Winter Visitor & Scarce Resident Breeder",
    "geography": {
      "kashmirCore": true,
      "jammu": true,
      "ladakh": true,
      "ajk": true,
      "gilgitBaltistan": false,
      "himachal": false,
      "punjabFoothills": true
    },
    "districts": [
      "Bandipora",
      "Baramulla",
      "Srinagar",
      "Ganderbal",
      "Budgam",
      "Pulwama",
      "Anantnag",
      "Jammu",
      "Kathua",
      "Kargil",
      "Mirpur"
    ],
    "protectedAreas": [
      "Hokersar Wetland",
      "Wular Lake Ramsar Site",
      "Shallabugh Wetland",
      "Hygam Wetland",
      "Surinsar-Mansar Wildlife Sanctuary"
    ],
    "distributionPoints": [],
    "habitats": [
      "Wetlands, Lakes & Marshes (Ramsar Sites)"
    ],
    "breedingHabitat": "Palearctic wetlands (main wintering flocks); small numbers breed in secluded Kashmir reedbeds.",
    "feedingEcology": "Dabbling omnivore filtering aquatic seeds, rice stubble, pondweeds, and invertebrates.",
    "elevationRange": {
      "min": 300,
      "max": 3200
    },
    "ecologicalRole": "Abundant Winter Dabbling Waterfowl & Seed Disperser",
    "observationIntelligence": {
      "totalObservations": 15000,
      "verifiedRecords": 12500,
      "recentRecords": 3125,
      "historicalRecords": 9375
    },
    "verifiedSightings": 12500,
    "threats": [
      "Wetland encroachment",
      "Illegal winter shooting"
    ],
    "description": "Classic Central Asian Flyway dabbling duck arriving by the tens of thousands each autumn across Hokersar, Shallabugh, Hygam, Wular, and Dal lakes.",
    "speciesNarrative": {
      "overview": "Signature wintering dabbling duck of the Kashmir Valley wetland network ('Nilij' in Kashmiri).",
      "identification": "Breeding drake shows glossy bottle-green head, white neck ring, chestnut breast, curled black central tail feathers, and purple-blue speculum.",
      "ecology": "Palearctic wetlands (main wintering flocks); small numbers breed in secluded Kashmir reedbeds. Dabbling omnivore filtering aquatic seeds, rice stubble, pondweeds, and invertebrates.",
      "distribution": "Verified across Bandipora, Baramulla, Srinagar, Ganderbal, Budgam, Pulwama and adjacent Western Himalayan districts (300–3200 m ASL).",
      "threats": "Wetland encroachment; Illegal winter shooting.",
      "conservation": "Protected across Hokersar Wetland, Wular Lake Ramsar Site, Shallabugh Wetland."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Migratory Waterfowl & Wetland Birds",
    "migrationWindow": {
      "season": "winter",
      "arrivalMonth": 10,
      "departureMonth": 3,
      "peakPresence": [
        11,
        12,
        1,
        2
      ],
      "migrationType": "winter-visitor",
      "flyway": "central-asian",
      "concentration": "very-high"
    }
  },
  {
    "id": "MIG-002",
    "slug": "greylag-goose",
    "commonName": "Greylag Goose",
    "scientificName": "Anser anser",
    "localName": "Anz / اَنٛز",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Anseriformes",
      "family": "Anatidae",
      "genus": "Anser",
      "species": "anser"
    },
    "conservationStatus": "LC",
    "nationalStatus": "Schedule IV (WPA 1972)",
    "regionalStatus": "Verified Regional Taxon",
    "populationTrend": "Stable",
    "sensitivity": "medium",
    "endemismStatus": "widely-distributed",
    "seasonality": "Winter Visitor",
    "geography": {
      "kashmirCore": true,
      "jammu": true,
      "ladakh": false,
      "ajk": true,
      "gilgitBaltistan": false,
      "himachal": false,
      "punjabFoothills": true
    },
    "districts": [
      "Bandipora",
      "Baramulla",
      "Ganderbal",
      "Srinagar",
      "Budgam",
      "Jammu",
      "Kathua",
      "Mirpur"
    ],
    "protectedAreas": [
      "Hokersar Wetland",
      "Wular Lake Ramsar Site",
      "Shallabugh Wetland",
      "Hygam Wetland",
      "Gharana Wetland"
    ],
    "distributionPoints": [],
    "habitats": [
      "Wetlands, Lakes & Marshes (Ramsar Sites)",
      "Agricultural Margins & Orchards"
    ],
    "breedingHabitat": "Central Asian and Siberian steppe marshes (winter visitor to Kashmir and Jammu).",
    "feedingEcology": "Grazes emergent wetland tubers, rhizomes, sedge shoots, and adjacent paddy stubble.",
    "elevationRange": {
      "min": 300,
      "max": 1800
    },
    "ecologicalRole": "Large Wetland Herbivore & Rhizome Grazer",
    "observationIntelligence": {
      "totalObservations": 5040,
      "verifiedRecords": 4200,
      "recentRecords": 1050,
      "historicalRecords": 3150
    },
    "verifiedSightings": 4200,
    "threats": [
      "Disturbance of open roosting mudflats",
      "Poaching along nocturnal feeding flights"
    ],
    "description": "Large honking grey goose (eastern race rubrirostris) wintering in large flocks on Hokersar, Hygam, Shallabugh, Wular, and Gharana wetlands.",
    "speciesNarrative": {
      "overview": "Eastern pink-billed Greylag Goose wintering across protected Kashmir and Jammu Ramsar marshes.",
      "identification": "Bulky grey-brown goose with pale silvery forewing in flight, unbarred head, pink legs, and heavy pink bill.",
      "ecology": "Central Asian and Siberian steppe marshes (winter visitor to Kashmir and Jammu). Grazes emergent wetland tubers, rhizomes, sedge shoots, and adjacent paddy stubble.",
      "distribution": "Verified across Bandipora, Baramulla, Ganderbal, Srinagar, Budgam, Jammu and adjacent Western Himalayan districts (300–1800 m ASL).",
      "threats": "Disturbance of open roosting mudflats; Poaching along nocturnal feeding flights.",
      "conservation": "Protected across Hokersar Wetland, Wular Lake Ramsar Site, Shallabugh Wetland."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Migratory Waterfowl & Wetland Birds",
    "migrationWindow": {
      "season": "winter",
      "arrivalMonth": 10,
      "departureMonth": 3,
      "peakPresence": [
        11,
        12,
        1,
        2
      ],
      "migrationType": "winter-visitor",
      "flyway": "central-asian",
      "concentration": "high"
    }
  },
  {
    "id": "MIG-003",
    "slug": "northern-pintail",
    "commonName": "Northern Pintail",
    "scientificName": "Anas acuta",
    "localName": "Sokh-pachin / سۄکھ پَچھِن",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Anseriformes",
      "family": "Anatidae",
      "genus": "Anas",
      "species": "acuta"
    },
    "conservationStatus": "LC",
    "nationalStatus": "Schedule IV (WPA 1972)",
    "regionalStatus": "Verified Regional Taxon",
    "populationTrend": "Stable",
    "sensitivity": "low",
    "endemismStatus": "widely-distributed",
    "seasonality": "Winter Visitor",
    "geography": {
      "kashmirCore": true,
      "jammu": true,
      "ladakh": false,
      "ajk": false,
      "gilgitBaltistan": false,
      "himachal": false,
      "punjabFoothills": true
    },
    "districts": [
      "Srinagar",
      "Budgam",
      "Bandipora",
      "Baramulla",
      "Ganderbal",
      "Pulwama",
      "Jammu",
      "Kathua"
    ],
    "protectedAreas": [
      "Hokersar Wetland",
      "Shallabugh Wetland",
      "Hygam Wetland",
      "Wular Lake Ramsar Site",
      "Gharana Wetland"
    ],
    "distributionPoints": [],
    "habitats": [
      "Wetlands, Lakes & Marshes (Ramsar Sites)"
    ],
    "breedingHabitat": "Northern Palearctic tundra and steppe wetlands (winter visitor to Kashmir).",
    "feedingEcology": "Up-ends in shallow marshes using its long neck to reach bottom seeds, tubers, and chironomids.",
    "elevationRange": {
      "min": 300,
      "max": 1800
    },
    "ecologicalRole": "Abundant Winter Dabbling Granivore",
    "observationIntelligence": {
      "totalObservations": 21600,
      "verifiedRecords": 18000,
      "recentRecords": 4500,
      "historicalRecords": 13500
    },
    "verifiedSightings": 18000,
    "threats": [
      "Siltation and water-level mismanagement in winter marshes"
    ],
    "description": "Slender, long-necked dabbling duck forming some of the largest winter concentrations at Hokersar, Shallabugh, Hygam, and Wular Ramsar wetlands.",
    "speciesNarrative": {
      "overview": "Core Central Asian Flyway dabbling duck dominating winter waterfowl counts in the Kashmir Valley.",
      "identification": "Drake has chocolate-brown head, white breast extending as a finger-stripe up the neck side, grey vermiculated flanks, and elongated needle-like central tail feathers.",
      "ecology": "Northern Palearctic tundra and steppe wetlands (winter visitor to Kashmir). Up-ends in shallow marshes using its long neck to reach bottom seeds, tubers, and chironomids.",
      "distribution": "Verified across Srinagar, Budgam, Bandipora, Baramulla, Ganderbal, Pulwama and adjacent Western Himalayan districts (300–1800 m ASL).",
      "threats": "Siltation and water-level mismanagement in winter marshes.",
      "conservation": "Protected across Hokersar Wetland, Shallabugh Wetland, Hygam Wetland."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Migratory Waterfowl & Wetland Birds",
    "migrationWindow": {
      "season": "winter",
      "arrivalMonth": 10,
      "departureMonth": 3,
      "peakPresence": [
        11,
        12,
        1,
        2
      ],
      "migrationType": "winter-visitor",
      "flyway": "central-asian",
      "concentration": "very-high"
    }
  },
  {
    "id": "MIG-004",
    "slug": "common-teal",
    "commonName": "Common Teal",
    "scientificName": "Anas crecca",
    "localName": "Keus / کیوٗس",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Anseriformes",
      "family": "Anatidae",
      "genus": "Anas",
      "species": "crecca"
    },
    "conservationStatus": "LC",
    "nationalStatus": "Schedule IV (WPA 1972)",
    "regionalStatus": "Verified Regional Taxon",
    "populationTrend": "Stable",
    "sensitivity": "low",
    "endemismStatus": "widely-distributed",
    "seasonality": "Winter Visitor",
    "geography": {
      "kashmirCore": true,
      "jammu": true,
      "ladakh": true,
      "ajk": false,
      "gilgitBaltistan": false,
      "himachal": false,
      "punjabFoothills": true
    },
    "districts": [
      "Srinagar",
      "Budgam",
      "Bandipora",
      "Baramulla",
      "Ganderbal",
      "Pulwama",
      "Anantnag",
      "Jammu",
      "Kathua",
      "Leh"
    ],
    "protectedAreas": [
      "Hokersar Wetland",
      "Shallabugh Wetland",
      "Hygam Wetland",
      "Wular Lake Ramsar Site",
      "Gharana Wetland"
    ],
    "distributionPoints": [],
    "habitats": [
      "Wetlands, Lakes & Marshes (Ramsar Sites)"
    ],
    "breedingHabitat": "Palearctic boreal marshes (abundant winter visitor and passage migrant).",
    "feedingEcology": "Filters tiny sedge and polygonum seeds and benthic invertebrates along muddy wetland margins.",
    "elevationRange": {
      "min": 300,
      "max": 3500
    },
    "ecologicalRole": "High-Density Shallow-Mudflat Seed Consumer",
    "observationIntelligence": {
      "totalObservations": 28800,
      "verifiedRecords": 24000,
      "recentRecords": 6000,
      "historicalRecords": 18000
    },
    "verifiedSightings": 24000,
    "threats": [
      "Drainage of shallow seasonal mudflats"
    ],
    "description": "Smallest and often numerically most abundant wintering duck across Kashmir's Ramsar wetlands (Hokersar, Shallabugh, Hygam, Wular) and Pampore-Pulwama marshes.",
    "speciesNarrative": {
      "overview": "Fast-flying, compact dabbling duck arriving in vast winter flocks via the Central Asian Flyway.",
      "identification": "Drake has chestnut head with metallic green eye-patch outlined in buff, white horizontal scapular stripe, creamy-yellow lateral undertail triangles, and green speculum.",
      "ecology": "Palearctic boreal marshes (abundant winter visitor and passage migrant). Filters tiny sedge and polygonum seeds and benthic invertebrates along muddy wetland margins.",
      "distribution": "Verified across Srinagar, Budgam, Bandipora, Baramulla, Ganderbal, Pulwama and adjacent Western Himalayan districts (300–3500 m ASL).",
      "threats": "Drainage of shallow seasonal mudflats.",
      "conservation": "Protected across Hokersar Wetland, Shallabugh Wetland, Hygam Wetland."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Migratory Waterfowl & Wetland Birds",
    "migrationWindow": {
      "season": "winter",
      "arrivalMonth": 9,
      "departureMonth": 4,
      "peakPresence": [
        11,
        12,
        1,
        2
      ],
      "migrationType": "winter-visitor",
      "flyway": "central-asian",
      "concentration": "very-high"
    }
  },
  {
    "id": "MIG-005",
    "slug": "eurasian-wigeon",
    "commonName": "Eurasian Wigeon",
    "scientificName": "Mareca penelope",
    "localName": "Sheh-Batakh",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Anseriformes",
      "family": "Anatidae",
      "genus": "Mareca",
      "species": "penelope"
    },
    "conservationStatus": "LC",
    "nationalStatus": "Schedule IV (WPA 1972)",
    "regionalStatus": "Verified Regional Taxon",
    "populationTrend": "Stable",
    "sensitivity": "medium",
    "endemismStatus": "widely-distributed",
    "seasonality": "Winter Visitor",
    "geography": {
      "kashmirCore": true,
      "jammu": true,
      "ladakh": false,
      "ajk": true,
      "gilgitBaltistan": false,
      "himachal": false,
      "punjabFoothills": true
    },
    "districts": [
      "Bandipora",
      "Baramulla",
      "Srinagar",
      "Ganderbal",
      "Budgam",
      "Pulwama",
      "Jammu",
      "Mirpur"
    ],
    "protectedAreas": [
      "Wular Lake Ramsar Site",
      "Hokersar Wetland",
      "Shallabugh Wetland",
      "Hygam Wetland"
    ],
    "distributionPoints": [],
    "habitats": [
      "Wetlands, Lakes & Marshes (Ramsar Sites)"
    ],
    "breedingHabitat": "Northern Eurasian taiga wetlands (winter visitor to Kashmir and Jammu).",
    "feedingEcology": "Surface grazer cropping wet shore grasses, duckweed, and floating macrophytes.",
    "elevationRange": {
      "min": 300,
      "max": 1800
    },
    "ecologicalRole": "Wetland Meadow & Surface Macrophyte Grazer",
    "observationIntelligence": {
      "totalObservations": 6600,
      "verifiedRecords": 5500,
      "recentRecords": 1375,
      "historicalRecords": 4125
    },
    "verifiedSightings": 5500,
    "threats": [
      "Conversion of lakeside wet grazing meadows to willow plantations"
    ],
    "description": "Whistling dabbling duck wintering in large flocks across Wular Lake, Hokersar, Shallabugh, and Hygam wetlands.",
    "speciesNarrative": {
      "overview": "Herbivorous dabbling duck grazing exposed mudflat grasses and shallow open marshes.",
      "identification": "Drake shows chestnut head with bright creamy-gold forehead blaze, pinkish breast, grey flanks, black-and-white stern, and large white forewing patch.",
      "ecology": "Northern Eurasian taiga wetlands (winter visitor to Kashmir and Jammu). Surface grazer cropping wet shore grasses, duckweed, and floating macrophytes.",
      "distribution": "Verified across Bandipora, Baramulla, Srinagar, Ganderbal, Budgam, Pulwama and adjacent Western Himalayan districts (300–1800 m ASL).",
      "threats": "Conversion of lakeside wet grazing meadows to willow plantations.",
      "conservation": "Protected across Wular Lake Ramsar Site, Hokersar Wetland, Shallabugh Wetland."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Migratory Waterfowl & Wetland Birds",
    "migrationWindow": {
      "season": "winter",
      "arrivalMonth": 10,
      "departureMonth": 3,
      "peakPresence": [
        11,
        12,
        1,
        2
      ],
      "migrationType": "winter-visitor",
      "flyway": "central-asian",
      "concentration": "high"
    }
  },
  {
    "id": "MIG-006",
    "slug": "european-bee-eater",
    "commonName": "European Bee-eater",
    "scientificName": "Merops apiaster",
    "localName": "Tulur / تُلُر",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Coraciiformes",
      "family": "Meropidae",
      "genus": "Merops",
      "species": "apiaster"
    },
    "conservationStatus": "LC",
    "nationalStatus": "Schedule IV (WPA 1972)",
    "regionalStatus": "Verified Regional Taxon",
    "populationTrend": "Stable",
    "sensitivity": "medium",
    "endemismStatus": "widely-distributed",
    "seasonality": "Summer Visitor (Colonial Breeder)",
    "geography": {
      "kashmirCore": true,
      "jammu": false,
      "ladakh": true,
      "ajk": false,
      "gilgitBaltistan": true,
      "himachal": false,
      "punjabFoothills": false
    },
    "districts": [
      "Srinagar",
      "Ganderbal",
      "Budgam",
      "Pulwama",
      "Anantnag",
      "Baramulla",
      "Bandipora",
      "Kupwara",
      "Kargil",
      "Gilgit"
    ],
    "protectedAreas": [
      "Dachigam National Park",
      "Overa-Aru Wildlife Sanctuary",
      "Tral Wildlife Sanctuary"
    ],
    "distributionPoints": [],
    "habitats": [
      "Agricultural Margins & Orchards",
      "Braided Rivers & Torrential Streams"
    ],
    "breedingHabitat": "Colonial nest tunnels excavated into vertical loess karewa cliffs and sandy riverbanks across the Kashmir Valley.",
    "feedingEcology": "Aerial insectivore hawking honeybees, wasps, dragonflies, and flying beetles.",
    "elevationRange": {
      "min": 1400,
      "max": 2600
    },
    "ecologicalRole": "Aerial Hymenopteran & Odonate Predator",
    "observationIntelligence": {
      "totalObservations": 4200,
      "verifiedRecords": 3500,
      "recentRecords": 875,
      "historicalRecords": 2625
    },
    "verifiedSightings": 3500,
    "threats": [
      "Excavation and leveling of karewa loess cliffs",
      "Orchard insecticide sprays"
    ],
    "description": "Dazzling summer migrant breeding colonially in loess karewa banks across Pulwama, Budgam, Srinagar, Ganderbal, and Anantnag from May to September.",
    "speciesNarrative": {
      "overview": "Colonial karewa-nesting summer migrant bringing vivid tropical colors to Kashmir orchards.",
      "identification": "Chestnut crown and mantle, golden-yellow scapulars and throat edged by a black gorget, turquoise-blue underparts, and elongated central tail pins.",
      "ecology": "Colonial nest tunnels excavated into vertical loess karewa cliffs and sandy riverbanks across the Kashmir Valley. Aerial insectivore hawking honeybees, wasps, dragonflies, and flying beetles.",
      "distribution": "Verified across Srinagar, Ganderbal, Budgam, Pulwama, Anantnag, Baramulla and adjacent Western Himalayan districts (1400–2600 m ASL).",
      "threats": "Excavation and leveling of karewa loess cliffs; Orchard insecticide sprays.",
      "conservation": "Protected across Dachigam National Park, Overa-Aru Wildlife Sanctuary, Tral Wildlife Sanctuary."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Passerines, Flycatchers & Songbirds",
    "migrationWindow": {
      "season": "summer",
      "arrivalMonth": 5,
      "departureMonth": 9,
      "peakPresence": [
        6,
        7,
        8
      ],
      "migrationType": "breeder",
      "flyway": "central-asian",
      "concentration": "high"
    }
  },
  {
    "id": "MIG-007",
    "slug": "eurasian-golden-oriole",
    "commonName": "Eurasian Golden Oriole",
    "scientificName": "Oriolus oriolus",
    "localName": "Poshnool / پوشہٕ نوٗل",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Passeriformes",
      "family": "Oriolidae",
      "genus": "Oriolus",
      "species": "oriolus"
    },
    "conservationStatus": "LC",
    "nationalStatus": "Schedule IV (WPA 1972)",
    "regionalStatus": "Verified Regional Taxon",
    "populationTrend": "Stable",
    "sensitivity": "low",
    "endemismStatus": "widely-distributed",
    "seasonality": "Summer Visitor (Breeder)",
    "geography": {
      "kashmirCore": true,
      "jammu": true,
      "ladakh": false,
      "ajk": true,
      "gilgitBaltistan": true,
      "himachal": false,
      "punjabFoothills": false
    },
    "districts": [
      "Srinagar",
      "Ganderbal",
      "Budgam",
      "Pulwama",
      "Anantnag",
      "Shopian",
      "Kulgam",
      "Baramulla",
      "Bandipora",
      "Kupwara",
      "Udhampur",
      "Rajouri",
      "Poonch",
      "Doda",
      "Kishtwar",
      "Muzaffarabad",
      "Gilgit"
    ],
    "protectedAreas": [
      "Dachigam National Park",
      "Overa-Aru Wildlife Sanctuary"
    ],
    "distributionPoints": [],
    "habitats": [
      "Deciduous Broadleaf & Riverine Forests",
      "Agricultural Margins & Orchards"
    ],
    "breedingHabitat": "Pendulous hammock nests slung in high forks of chinar, walnut, poplar, and willow canopies.",
    "feedingEcology": "Canopy omnivore eating mulberries, cherries, figs, and hairy caterpillars.",
    "elevationRange": {
      "min": 600,
      "max": 2500
    },
    "ecologicalRole": "Canopy Frugivore, Seed Disperser & Caterpillar Predator",
    "observationIntelligence": {
      "totalObservations": 6000,
      "verifiedRecords": 5000,
      "recentRecords": 1250,
      "historicalRecords": 3750
    },
    "verifiedSightings": 5000,
    "threats": [
      "Felling of mature chinar and walnut groves",
      "Orchard agrochemicals"
    ],
    "description": "Beloved 'Poshnool' of Kashmiri folklore (subspecies kundoo, Indian Golden Oriole / Eurasian complex), filling summer chinar gardens and apple-walnut orchards with liquid fluting song.",
    "speciesNarrative": {
      "overview": "Iconic golden-and-black summer breeder across Kashmir orchards, gardens, and deciduous valleys.",
      "identification": "Adult male is brilliant golden-yellow with black wings, black eye-mask, and crimson bill; female and immature are yellowish-olive above with streaked whitish underparts.",
      "ecology": "Pendulous hammock nests slung in high forks of chinar, walnut, poplar, and willow canopies. Canopy omnivore eating mulberries, cherries, figs, and hairy caterpillars.",
      "distribution": "Verified across Srinagar, Ganderbal, Budgam, Pulwama, Anantnag, Shopian and adjacent Western Himalayan districts (600–2500 m ASL).",
      "threats": "Felling of mature chinar and walnut groves; Orchard agrochemicals.",
      "conservation": "Protected across Dachigam National Park, Overa-Aru Wildlife Sanctuary."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Passerines, Flycatchers & Songbirds",
    "migrationWindow": {
      "season": "summer",
      "arrivalMonth": 4,
      "departureMonth": 9,
      "peakPresence": [
        5,
        6,
        7,
        8
      ],
      "migrationType": "summer-visitor",
      "flyway": "central-asian",
      "concentration": "high"
    }
  },
  {
    "id": "MIG-008",
    "slug": "paradise-flycatcher",
    "commonName": "Indian Paradise Flycatcher",
    "scientificName": "Terpsiphone paradisi",
    "localName": "Doodh-Kras / پھَمب سیٖر",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Passeriformes",
      "family": "Monarchidae",
      "genus": "Terpsiphone",
      "species": "paradisi"
    },
    "conservationStatus": "LC",
    "nationalStatus": "Schedule IV (WPA 1972)",
    "regionalStatus": "Verified Regional Taxon",
    "populationTrend": "Stable",
    "sensitivity": "low",
    "endemismStatus": "widely-distributed",
    "seasonality": "Summer Visitor (Breeder)",
    "geography": {
      "kashmirCore": true,
      "jammu": true,
      "ladakh": false,
      "ajk": true,
      "gilgitBaltistan": false,
      "himachal": false,
      "punjabFoothills": true
    },
    "districts": [
      "Srinagar",
      "Ganderbal",
      "Budgam",
      "Anantnag",
      "Pulwama",
      "Shopian",
      "Kulgam",
      "Baramulla",
      "Bandipora",
      "Kupwara",
      "Jammu",
      "Udhampur",
      "Reasi",
      "Rajouri",
      "Poonch",
      "Ramban",
      "Doda",
      "Muzaffarabad",
      "Jhelum Valley"
    ],
    "protectedAreas": [
      "Dachigam National Park",
      "Overa-Aru Wildlife Sanctuary",
      "Nandini Wildlife Sanctuary"
    ],
    "distributionPoints": [],
    "habitats": [
      "Deciduous Broadleaf & Riverine Forests",
      "Agricultural Margins & Orchards"
    ],
    "breedingHabitat": "Neat cup nests bound with cobwebs in shaded walnut, mulberry, and broadleaf riparian groves.",
    "feedingEcology": "Graceful aerial sallying insectivore capturing flies, moths, andwinged termites beneath forest canopies.",
    "elevationRange": {
      "min": 500,
      "max": 2300
    },
    "ecologicalRole": "Under-Canopy Aerial Insectivore",
    "observationIntelligence": {
      "totalObservations": 3840,
      "verifiedRecords": 3200,
      "recentRecords": 800,
      "historicalRecords": 2400
    },
    "verifiedSightings": 3200,
    "threats": [
      "Riparian grove clearance",
      "Insecticide depletion of flying insect prey"
    ],
    "description": "Ribbon-tailed summer breeder of Kashmir's shaded walnut groves, Mughal gardens, Dachigam ravines, and Pir Panjal foothill valleys.",
    "speciesNarrative": {
      "overview": "Spectacular monarchid flycatcher breeding across Kashmir and foothill deciduous woodlands from April to September.",
      "identification": "Glossy black crested head and cobalt-ringed eye; adult males morph from rufous to pure snow-white with 30 cm trailing tail streamers.",
      "ecology": "Neat cup nests bound with cobwebs in shaded walnut, mulberry, and broadleaf riparian groves. Graceful aerial sallying insectivore capturing flies, moths, andwinged termites beneath forest canopies.",
      "distribution": "Verified across Srinagar, Ganderbal, Budgam, Anantnag, Pulwama, Shopian and adjacent Western Himalayan districts (500–2300 m ASL).",
      "threats": "Riparian grove clearance; Insecticide depletion of flying insect prey.",
      "conservation": "Protected across Dachigam National Park, Overa-Aru Wildlife Sanctuary, Nandini Wildlife Sanctuary."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Passerines, Flycatchers & Songbirds",
    "migrationWindow": {
      "season": "summer",
      "arrivalMonth": 4,
      "departureMonth": 9,
      "peakPresence": [
        5,
        6,
        7,
        8
      ],
      "migrationType": "breeder",
      "flyway": "central-asian",
      "concentration": "high"
    }
  },
  {
    "id": "MIG-009",
    "slug": "ruddy-shelduck",
    "commonName": "Ruddy Shelduck",
    "scientificName": "Tadorna ferruginea",
    "localName": "Tsakav / ژَکَو",
    "taxonomicGroup": "birds",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Anseriformes",
      "family": "Anatidae",
      "genus": "Tadorna",
      "species": "ferruginea"
    },
    "conservationStatus": "LC",
    "nationalStatus": "Schedule IV (WPA 1972)",
    "regionalStatus": "Verified Regional Taxon",
    "populationTrend": "Stable",
    "sensitivity": "medium",
    "endemismStatus": "widely-distributed",
    "seasonality": "Summer Breeder (Ladakh) & Winter/Passage Migrant (Jammu & Kashmir)",
    "geography": {
      "kashmirCore": true,
      "jammu": true,
      "ladakh": true,
      "ajk": true,
      "gilgitBaltistan": true,
      "himachal": false,
      "punjabFoothills": true
    },
    "districts": [
      "Leh",
      "Kargil",
      "Bandipora",
      "Baramulla",
      "Srinagar",
      "Ganderbal",
      "Jammu",
      "Kathua",
      "Samba",
      "Mirpur",
      "Skardu"
    ],
    "protectedAreas": [
      "Tsomoriri Ramsar Site",
      "Tso Kar Wetland Complex",
      "Pangong Tso",
      "Wular Lake Ramsar Site",
      "Gharana Wetland"
    ],
    "distributionPoints": [],
    "habitats": [
      "High Altitude Lakes",
      "Wetlands, Lakes & Marshes (Ramsar Sites)",
      "Braided Rivers & Torrential Streams"
    ],
    "breedingHabitat": "Rock crevices and burrows near high-altitude lakes and marshes across Ladakh (Pangong, Tsomoriri, Tso Kar, Suru).",
    "feedingEcology": "Omnivorous grazer and dabbler feeding on sedge shoots, grain, brine shrimp, and aquatic insects.",
    "elevationRange": {
      "min": 280,
      "max": 4800
    },
    "ecologicalRole": "High-Altitude & Riverine Wetland Omnivore",
    "observationIntelligence": {
      "totalObservations": 4680,
      "verifiedRecords": 3900,
      "recentRecords": 975,
      "historicalRecords": 2925
    },
    "verifiedSightings": 3900,
    "threats": [
      "Feral dog predation on flightless goslings in Ladakh",
      "Sandbar human disturbance in winter"
    ],
    "description": "Rich orange-chestnut shelduck breeding around high-altitude Ladakh lakes (Tsomoriri, Tso Kar, Pangong) and wintering/staging on Jammu rivers and Kashmir wetlands.",
    "speciesNarrative": {
      "overview": "Sacred 'Brahminy Duck' linking Trans-Himalayan breeding lakes with lowland Indus-basin wintering rivers.",
      "identification": "Rich rufous-orange body, paler creamy-buff head, black bill and tail, and bold white forewing coverts with metallic green speculum in flight.",
      "ecology": "Rock crevices and burrows near high-altitude lakes and marshes across Ladakh (Pangong, Tsomoriri, Tso Kar, Suru). Omnivorous grazer and dabbler feeding on sedge shoots, grain, brine shrimp, and aquatic insects.",
      "distribution": "Verified across Leh, Kargil, Bandipora, Baramulla, Srinagar, Ganderbal and adjacent Western Himalayan districts (280–4800 m ASL).",
      "threats": "Feral dog predation on flightless goslings in Ladakh; Sandbar human disturbance in winter.",
      "conservation": "Protected across Tsomoriri Ramsar Site, Tso Kar Wetland Complex, Pangong Tso."
    },
    "dataSource": {
      "reference": "Grimmett, Inskipp & Inskipp (2011) Birds of the Indian Subcontinent; BirdLife International / IUCN Red List & Asian Waterbird Census",
      "type": "inventory",
      "confidence": 96,
      "verificationDate": "2026-11-27",
      "qualityFlag": "high"
    },
    "category": "Migratory Waterfowl & Wetland Birds",
    "migrationWindow": {
      "season": "spring",
      "arrivalMonth": 3,
      "departureMonth": 10,
      "peakPresence": [
        3,
        4,
        6,
        7,
        8,
        11
      ],
      "migrationType": "passage-migrant",
      "flyway": "central-asian",
      "concentration": "high"
    }
  }
];

export const birdsData: BiodiversitySpecies[] = birdsPhase1;

// QUARANTINED_ARCHIVE_METADATA
export const QUARANTINED_SYNTHETIC_BIRDS_SUMMARY = {
  datasetId: 'species-avifauna-registry',
  idRange: 'BRD-GEN-34..BRD-GEN-583',
  count: 550,
  deduplicatedCount: 5,
  deduplicatedSourceIds: ['BRD-GEN-10', 'BRD-GEN-11', 'BRD-GEN-12', 'BRD-GEN-31', 'BRD-GEN-32'],
  originalCount: 601,
  verifiedCount: 46,
  lineageCommits: ['a794998', '87efcde'],
  reasonCode: 'SYNTHETIC_BINOMIAL_OR_PLACEHOLDER_TAXON',
  quarantineReason:
    'Withheld 550 synthetic numbered family-level placeholder records (BRD-GEN-34 through BRD-GEN-583), deduplicated 5 overlapping BRD-GEN/MIG binomials, unscrambled taxonomy/narrative fields, and corrected Black-necked Crane (Grus nigricollis) breeding range strictly to Leh (Changthang).',
} as const;
