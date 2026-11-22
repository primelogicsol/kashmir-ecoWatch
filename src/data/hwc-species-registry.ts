/**
 * Kashmir EcoWatch - Priority & Secondary Species Conflict Registry (KEW-HWC)
 * Two-tier scientific species classification:
 * 1. Ten Priority Species (6 Flagship Species + 4 Common Agricultural / Predation Conflict Species)
 * 2. Secondary Species Registry (10 Localized / Coexistence Species)
 *
 * Aligned with:
 * - IUCN SSC Guidelines on Human-Wildlife Conflict and Coexistence
 * - Wildlife Protection Act schedules & CITES Appendices
 */

import { KewRegion, ConflictCategory } from './human-wildlife-conflict';

export type SpeciesTier = 'Conservation Flagship' | 'Common Conflict Species' | 'Secondary / Localized Coexistence';

export type RegionalConflictIntensity = 'High' | 'Localized' | 'Limited*';

export interface PrioritySpeciesProfile {
  id: string;
  commonName: string;
  scientificName: string;
  localNames: string[];
  tier: SpeciesTier;
  isFlagship: boolean;
  regionalPriorities: Record<KewRegion, RegionalConflictIntensity>;
  iucnStatus: 'Critically Endangered' | 'Endangered' | 'Vulnerable' | 'Near Threatened' | 'Least Concern';
  scheduleWpa: string;
  ecologicalRole: string;
  primaryConflictTypes: ConflictCategory[];
  peakConflictSeason: string;
  proximateDrivers: string[];
  keyVulnerabilityFactors: string[];
  evidenceBasedMitigation: string[];
  iucnGuidelineAlignment: string;
  photoAttribution?: string;
}

export interface SecondarySpeciesEntry {
  id: string;
  commonName: string;
  scientificName: string;
  category: 'Coexistence & Human Impact' | 'Localized Poultry / Small-Livestock' | 'Agricultural / Land-Use Overlap' | 'Scavenger / Secondary Mortality';
  iucnStatus: string;
  conflictRelevance: string;
  keyRegions: KewRegion[];
  managementRecommendation: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// TEN PRIORITY CONFLICT SPECIES (6 FLAGSHIPS + 4 COMMON CONFLICT SPECIES)
// ─────────────────────────────────────────────────────────────────────────────

export const PRIORITY_SPECIES: PrioritySpeciesProfile[] = [
  // 1. Asiatic Black Bear (FLAGSHIP)
  {
    id: 'sp-black-bear',
    commonName: 'Asiatic Black Bear',
    scientificName: 'Ursus thibetanus',
    localNames: ['Himalayan Black Bear', 'Kapekh', 'Haaputh (Kashmiri)'],
    tier: 'Conservation Flagship',
    isFlagship: true,
    regionalPriorities: {
      'Kashmir Valley': 'High',
      'Jammu': 'High',
      'Ladakh': 'Limited*',
      'Azad Jammu and Kashmir': 'High',
      'Gilgit-Baltistan': 'Localized'
    },
    iucnStatus: 'Vulnerable',
    scheduleWpa: 'Schedule I (Highest Protection)',
    ecologicalRole: 'Apex omnivore, primary Himalayan forest seed disperser, and regulator of mountain canopy regeneration.',
    primaryConflictTypes: [
      'Crop & Orchard Damage',
      'Human Injury (Non-fatal)',
      'Human Fatality',
      'Property & Apiary Damage'
    ],
    peakConflictSeason: 'Late Summer to Autumn (August - November: hyperphagia pre-denning surge)',
    proximateDrivers: [
      'Rapid conversion of agricultural wetlands to commercial high-density sweet apple (Malus domestica) orchards abutting forest edges',
      'Unsecured municipal and village organic waste dumps on forest margins providing calorie-dense food subsidies',
      'Degradation of wild acorn (Quercus spp.) and wild berry yields due to drought and canopy thinning',
      'Fragmented forest corridors forcing bears to transverse human settlements between isolated forest patches'
    ],
    keyVulnerabilityFactors: [
      'Early morning and late evening solitary movement of farmers in orchards without auditory deterrents',
      'High-canopy maize crops planted adjacent to dense forest canopies providing concealed day-bedding',
      'Open cattle sheds and unfortified apiary boxes'
    ],
    evidenceBasedMitigation: [
      'Installation of solar-powered perimeter electric fencing around village orchard clusters',
      'Community bear-proof organic waste containment and swift removal of fallen wind-drop apples near dwellings',
      'Pre-harvest night patrols using sound deterrents (whistles, loud drums, Foxlights)',
      'Establishing 20-meter brush-cleared visibility buffers between forest boundaries and first orchard rows'
    ],
    iucnGuidelineAlignment: 'IUCN SSC Guidelines §3.2 (Understanding Drivers) & §4.4 (Non-lethal Deterrents)'
  },

  // 2. Common Leopard (FLAGSHIP)
  {
    id: 'sp-common-leopard',
    commonName: 'Common Leopard',
    scientificName: 'Panthera pardus fusca',
    localNames: ['Indian Leopard', 'Suh (Kashmiri)', 'Chita (Urdu)'],
    tier: 'Conservation Flagship',
    isFlagship: true,
    regionalPriorities: {
      'Kashmir Valley': 'High',
      'Jammu': 'High',
      'Ladakh': 'Limited*',
      'Azad Jammu and Kashmir': 'High',
      'Gilgit-Baltistan': 'Localized'
    },
    iucnStatus: 'Vulnerable',
    scheduleWpa: 'Schedule I (Highest Protection)',
    ecologicalRole: 'Top terrestrial carnivore maintaining herbivore population equilibrium across mid-altitude ecosystems.',
    primaryConflictTypes: [
      'Livestock Depredation',
      'Human Injury (Non-fatal)',
      'Human Fatality'
    ],
    peakConflictSeason: 'Winter to Early Spring (December - March: deep snow forcing wild ungulates and leopards downhill)',
    proximateDrivers: [
      'Depletion of wild prey base (barking deer, musk deer, wild boar) in disturbed foothills',
      'Dense thorny scrub (Rosa spp., Rubus) encroachment in abandoned village terraces offering day cover near houses',
      'Abundance of free-ranging domestic dogs feeding on village garbage dumps',
      'Frail, unroofed cattle sheds and mud-plastered goat pens in pastoral fringes'
    ],
    keyVulnerabilityFactors: [
      'Children and lone individuals walking unilluminated village alleys between dusk and dawn',
      'Free-grazing sheep and goats unattended in scrub forests without guard dogs',
      'Cattle sheds with bamboo or open wooden slat doors that leopards can pry open'
    ],
    evidenceBasedMitigation: [
      'Distribution of chain-link wire mesh to reinforce livestock sheds (predator-proof corrals)',
      'Solar-powered LED streetlights along forest-settlement alleys',
      'Rapid sterilization and management of feral dog populations around municipal waste sites',
      'Trained village quick-response volunteer teams equipped with searchlights and emergency distress sirens'
    ],
    iucnGuidelineAlignment: 'IUCN SSC Guidelines §4.1 (Community Engagement) & §4.3 (Livestock Husbandry Upgrades)'
  },

  // 3. Snow Leopard (FLAGSHIP)
  {
    id: 'sp-snow-leopard',
    commonName: 'Snow Leopard',
    scientificName: 'Panthera uncia',
    localNames: ['Ounce', 'Shan (Ladakhi)', 'Shen (Balti)', 'Chitral Leopard'],
    tier: 'Conservation Flagship',
    isFlagship: true,
    regionalPriorities: {
      'Kashmir Valley': 'Localized',
      'Jammu': 'Limited*',
      'Ladakh': 'High',
      'Azad Jammu and Kashmir': 'Localized',
      'Gilgit-Baltistan': 'High'
    },
    iucnStatus: 'Vulnerable',
    scheduleWpa: 'Schedule I (Highest Protection)',
    ecologicalRole: 'Apex predator and umbrella species for high-altitude cryosphere ecosystems across Central & South Asia.',
    primaryConflictTypes: [
      'Livestock Depredation'
    ],
    peakConflictSeason: 'Winter to Early Spring (November - March: harsh freezing storms pushing ibex and predators into valleys)',
    proximateDrivers: [
      'Inadequate wild prey density (Himalayan ibex, blue sheep) due to competition with domestic livestock herds',
      'Nomadic pastoral livestock herds (pashmina goats, sheep, yaks) occupying alpine meadow summer grazing lands',
      'Pen-break incidents where a snow leopard enters a traditional open stone corral and triggers multiple panicked surplus kills'
    ],
    keyVulnerabilityFactors: [
      'Unroofed dry-stone livestock pens easily scaled by agile mountain felines',
      'Absence of herders during sudden blizzards when livestock disperse across alpine gullies'
    ],
    evidenceBasedMitigation: [
      'Construction of predator-proof corrals featuring wire mesh roofs and reinforced steel-frame doors (co-funded with communities)',
      'Community-managed livestock insurance schemes providing rapid compensation upon independent verification',
      'Eco-tourism and homestay revenue sharing tied directly to snow leopard tolerance and anti-poaching vigilance',
      'Deployment of Tibetan mastiff guardian dogs with protective spiked collars'
    ],
    iucnGuidelineAlignment: 'IUCN SSC Guidelines §5.2 (Economic Instruments) & §6.1 (Community Conservation Models)'
  },

  // 4. Himalayan Brown Bear (FLAGSHIP)
  {
    id: 'sp-brown-bear',
    commonName: 'Himalayan Brown Bear',
    scientificName: 'Ursus arctos isabellinus',
    localNames: ['Isabelline Bear', 'Lal Bhalu', 'Denmo (Ladakhi/Balti)'],
    tier: 'Conservation Flagship',
    isFlagship: true,
    regionalPriorities: {
      'Kashmir Valley': 'High',
      'Jammu': 'Localized',
      'Ladakh': 'High',
      'Azad Jammu and Kashmir': 'Localized',
      'Gilgit-Baltistan': 'High'
    },
    iucnStatus: 'Critically Endangered',
    scheduleWpa: 'Schedule I (Highest Protection)',
    ecologicalRole: 'Sub-alpine and alpine keystone forager, soil aerator through marmot excavation, and nutrient cycler.',
    primaryConflictTypes: [
      'Livestock Depredation',
      'Property & Apiary Damage',
      'Non-conflict Encounter / Pre-emptive Alert'
    ],
    peakConflictSeason: 'Spring (May - June: post-den emergence) and Autumn (September - October: hyperphagia)',
    proximateDrivers: [
      'Massive accumulation of unsegregated food waste at high-altitude tourism hubs, pilgrimage campsites (Amarnath route), and hotels',
      'Habituation to military and tourist refuse dumps altering natural foraging behaviors',
      'Encroachment of seasonal road infrastructure across high mountain passes dividing sub-populations'
    ],
    keyVulnerabilityFactors: [
      'Tent encampments and tourist kitchens storing foodstuffs in unsecured canvas enclosures',
      'Grazing sheep flocks left unattended on alpine ridges above 3,500m'
    ],
    evidenceBasedMitigation: [
      'Mandatory installation of heavy-gauge bear-proof steel dumpsters at high-altitude hotels and campsites',
      'Strict ban on open burning or pit disposal of food wastes in alpine tourist corridors',
      'Deep-pit biological composting away from subalpine forest edges',
      'Electric wire fences installed around seasonal shepherd encampments (dhoks)'
    ],
    iucnGuidelineAlignment: 'IUCN SSC Guidelines §3.4 (Anthropogenic Attractants) & §4.5 (Waste Stream Securitization)'
  },

  // 5. Himalayan Wolf (FLAGSHIP)
  {
    id: 'sp-himalayan-wolf',
    commonName: 'Himalayan Wolf',
    scientificName: 'Canis lupus chanco',
    localNames: ['Tibetan Wolf', 'Shanku (Ladakhi/Balti)', 'Chanko'],
    tier: 'Conservation Flagship',
    isFlagship: true,
    regionalPriorities: {
      'Kashmir Valley': 'Localized',
      'Jammu': 'Localized',
      'Ladakh': 'High',
      'Azad Jammu and Kashmir': 'Localized',
      'Gilgit-Baltistan': 'High'
    },
    iucnStatus: 'Vulnerable',
    scheduleWpa: 'Schedule I (Highest Protection)',
    ecologicalRole: 'High-altitude pack hunter controlling feral ungulates and maintaining pasture vegetation health.',
    primaryConflictTypes: [
      'Livestock Depredation'
    ],
    peakConflictSeason: 'Winter and Denning Period (December - May: pup rearing in barren mountain plateaus)',
    proximateDrivers: [
      'Severe winter snow cover concealing marmots and rodents, forcing pack hunting near winter pasture settlements',
      'Pastoralists retaliating with smoke/fire den destruction following corral attacks',
      'Aggressive feral dog packs competing for prey and hybridizing with wild wolf populations'
    ],
    keyVulnerabilityFactors: [
      'Remote winter corrals in Changthang, Zanskar, and Deosai plains with minimal human presence',
      'Juvenile livestock grazing far from base camps'
    ],
    evidenceBasedMitigation: [
      'Pastoralist predator-proof corral reinforcement',
      'Foxlight flashing deterrent installation at corral perimeters',
      'Community anti-retaliation agreements tied to swift livestock loss compensation',
      'Feral dog population management across high-altitude defense and civilian camps'
    ],
    iucnGuidelineAlignment: 'IUCN SSC Guidelines §2.3 (Preventing Retaliation) & §5.1 (Equitable Compensation)'
  },

  // 6. Rhesus Macaque (FLAGSHIP)
  {
    id: 'sp-rhesus-macaque',
    commonName: 'Rhesus Macaque',
    scientificName: 'Macaca mulatta',
    localNames: ['Poonz (Kashmiri)', 'Bandar (Urdu/Hindi)', 'Macaque'],
    tier: 'Conservation Flagship',
    isFlagship: true,
    regionalPriorities: {
      'Kashmir Valley': 'High',
      'Jammu': 'High',
      'Ladakh': 'Limited*',
      'Azad Jammu and Kashmir': 'High',
      'Gilgit-Baltistan': 'Limited*'
    },
    iucnStatus: 'Least Concern',
    scheduleWpa: 'Schedule II (Wildlife Protection Act)',
    ecologicalRole: 'Seed disperser, omnivorous canopy forager, and ecological sentinel in subtropical and moist temperate forest belts.',
    primaryConflictTypes: [
      'Crop & Orchard Damage',
      'Property & Apiary Damage',
      'Human Injury (Non-fatal)'
    ],
    peakConflictSeason: 'Spring through Autumn (April - October: fruit budding, ripening, and peak pilgrimage/tourist provisioning)',
    proximateDrivers: [
      'Aggressive provisioning and unmanaged food distribution by tourists and pilgrims at shrines and highway transit points',
      'Loss of natural wild fruiting trees (Ficus, Morus, Ziziphus) in degraded subtropical scrub zones',
      'Expansion of commercial horticulture and vegetable fields directly abutting degraded scrub forests',
      'Habituation to anthropogenic food waste leading to troop territorial shifts into village centers and agricultural plots'
    ],
    keyVulnerabilityFactors: [
      'Open kitchen waste, unsecured household storage, and rooftop drying of crops in rural settlements',
      'Direct hand-feeding by visitors along transport corridors breaking natural fear of humans',
      'Lack of non-lethal deterrent infrastructure around kitchen gardens and fruit orchards'
    ],
    evidenceBasedMitigation: [
      'Strict enforcement of anti-provisioning and no-feeding regulations at temple complexes, shrines, and highway viewpoints',
      'Deployment of non-lethal acoustic deterrents, sound cannons, and motion-activated sprinkler systems',
      'Planting of native wild fruit-bearing buffer belts within reserve forest boundaries to retain troops in natural habitat',
      'Encouraging cultivation of unpalatable alternative cash crops (ginger, turmeric, lemongrass, lavender) in high-conflict fringe tracts'
    ],
    iucnGuidelineAlignment: 'IUCN SSC Guidelines §3.4 (Anthropogenic Attractants) & §4.4 (Agricultural Deterrence Protocols)'
  },

  // 7. Wild Boar (COMMON CONFLICT SPECIES)
  {
    id: 'sp-wild-boar',
    commonName: 'Wild Boar',
    scientificName: 'Sus scrofa',
    localNames: ['Soor', 'Jungle Pig', 'Kala Janwar'],
    tier: 'Common Conflict Species',
    isFlagship: false,
    regionalPriorities: {
      'Kashmir Valley': 'Localized',
      'Jammu': 'High',
      'Ladakh': 'Limited*',
      'Azad Jammu and Kashmir': 'High',
      'Gilgit-Baltistan': 'Limited*'
    },
    iucnStatus: 'Least Concern',
    scheduleWpa: 'Schedule III / Schedule I depending on state amendment',
    ecologicalRole: 'Rooting soil disturber, seed disperser, and prey base for common leopards and large carnivores.',
    primaryConflictTypes: [
      'Crop & Orchard Damage',
      'Property & Apiary Damage',
      'Human Injury (Non-fatal)'
    ],
    peakConflictSeason: 'Monsoon through Winter (July - February: maize harvest and subterranean root foraging)',
    proximateDrivers: [
      'Expansion of cash crops and tuber farming into alluvial floodplains and low-elevation forest buffers',
      'Prolific reproduction in regenerating scrub forests with depleted top predator densities',
      'Nighttime nocturnal foraging in unguarded agricultural plots'
    ],
    keyVulnerabilityFactors: [
      'Unfenced tuber and root crop plots (potatoes, carrots, turnips) bordering canal banks',
      'Dense lantana and weed thickets providing daytime resting areas adjacent to farm fields'
    ],
    evidenceBasedMitigation: [
      'Erection of bio-acoustic tripwire deterrents and solar-powered electric fencing',
      'Community brush clearance along field margins to eliminate ambush cover',
      'Support for collective night watch groups in farming cooperatives'
    ],
    iucnGuidelineAlignment: 'IUCN SSC Guidelines §4.4 (Agricultural Barrier & Deterrent Infrastructure)'
  },

  // 8. Indian Crested Porcupine (COMMON CONFLICT SPECIES)
  {
    id: 'sp-crested-porcupine',
    commonName: 'Indian Crested Porcupine',
    scientificName: 'Hystrix indica',
    localNames: ['Sahe', 'Syal', 'Porcupine'],
    tier: 'Common Conflict Species',
    isFlagship: false,
    regionalPriorities: {
      'Kashmir Valley': 'Localized',
      'Jammu': 'High',
      'Ladakh': 'Limited*',
      'Azad Jammu and Kashmir': 'High',
      'Gilgit-Baltistan': 'Limited*'
    },
    iucnStatus: 'Least Concern',
    scheduleWpa: 'Schedule IV (Wildlife Protection Act)',
    ecologicalRole: 'Burrow excavator, geophyte feeder, and creator of subterranean micro-refugia for other wildlife.',
    primaryConflictTypes: [
      'Crop & Orchard Damage'
    ],
    peakConflictSeason: 'Autumn and Winter (September - February: debarking of young fruit saplings and root consumption)',
    proximateDrivers: [
      'Extensive planting of high-value dwarf apple saplings and rootstocks without protective tree-collars',
      'Sandy and loamy slopes offering ideal soil for deep burrow systems beneath agricultural terraces'
    ],
    keyVulnerabilityFactors: [
      'Unprotected young orchard sapling bark vulnerable to nocturnal ring-barking girdling',
      'Underground irrigation pipelines and canal embankments damaged by burrowing networks'
    ],
    evidenceBasedMitigation: [
      'Application of metal wire mesh guards or plastic tree-collars around sapling bases up to 60cm height',
      'Placement of non-toxic taste and olfactory repellents (chili-capsaicin or sulfur emulsions) around orchard borders',
      'Burrow smoke deterrents using chili powder smoke to encourage relocation away from farmland'
    ],
    iucnGuidelineAlignment: 'IUCN SSC Guidelines §4.4 (Mechanical Protection for Horticulture)'
  },

  // 9. Golden Jackal (COMMON CONFLICT SPECIES)
  {
    id: 'sp-golden-jackal',
    commonName: 'Golden Jackal',
    scientificName: 'Canis aureus',
    localNames: ['Shal', 'Gidar', 'Jackal'],
    tier: 'Common Conflict Species',
    isFlagship: false,
    regionalPriorities: {
      'Kashmir Valley': 'Localized',
      'Jammu': 'High',
      'Ladakh': 'Limited*',
      'Azad Jammu and Kashmir': 'High',
      'Gilgit-Baltistan': 'Localized'
    },
    iucnStatus: 'Least Concern',
    scheduleWpa: 'Schedule III (Wildlife Protection Act)',
    ecologicalRole: 'Versatile scavenger and rodent controller cleaning carrion and regulating small mammal populations.',
    primaryConflictTypes: [
      'Livestock Depredation',
      'Crop & Orchard Damage',
      'Non-conflict Encounter / Pre-emptive Alert'
    ],
    peakConflictSeason: 'Autumn and Winter (October - March: fruit gleaning and small poultry/lamb opportunistic predation)',
    proximateDrivers: [
      'Unfenced poultry coops and discarded slaughterhouse offal near village outskirts',
      'Scavenging on windfall grapes, melon fields, and vegetable plots'
    ],
    keyVulnerabilityFactors: [
      'Flimsy chicken coops with simple latching mechanisms easily forced by jackals',
      'Lambs and kids left unattended in open paddocks during twilight hours'
    ],
    evidenceBasedMitigation: [
      'Reinforced welded wire mesh for poultry sheds with underground anti-burrow aprons',
      'Safe disposal and composting of animal offal to prevent habituation around human habitation',
      'Acoustic and motion-triggered night lights'
    ],
    iucnGuidelineAlignment: 'IUCN SSC Guidelines §4.3 (Securing Small Domestic Stock)'
  },

  // 10. Red Fox (COMMON CONFLICT SPECIES)
  {
    id: 'sp-red-fox',
    commonName: 'Red Fox',
    scientificName: 'Vulpes vulpes montana',
    localNames: ['Loh', 'Loomri', 'Watse (Ladakhi)', 'Himalayan Red Fox'],
    tier: 'Common Conflict Species',
    isFlagship: false,
    regionalPriorities: {
      'Kashmir Valley': 'Localized',
      'Jammu': 'Localized',
      'Ladakh': 'High',
      'Azad Jammu and Kashmir': 'Localized',
      'Gilgit-Baltistan': 'High'
    },
    iucnStatus: 'Least Concern',
    scheduleWpa: 'Schedule II (Wildlife Protection Act)',
    ecologicalRole: 'Crucial small mammal, marmot, and pika population regulator across temperate and alpine steppes.',
    primaryConflictTypes: [
      'Livestock Depredation',
      'Non-conflict Encounter / Pre-emptive Alert'
    ],
    peakConflictSeason: 'Year-round, with peak poultry predation during kit-rearing period (April - July)',
    proximateDrivers: [
      'Accessible domestic poultry in rural villages adjacent to mountain meadows',
      'Scavenging on refuse and food scraps around mountain tourism tents and military messes'
    ],
    keyVulnerabilityFactors: [
      'Free-roaming chickens and ducks near forest borders and stream banks',
      'Open refuse pits attracting habituated individual foxes'
    ],
    evidenceBasedMitigation: [
      'Predator-proof secure overnight coop enclosures',
      'Sanitary landfill management and enclosed food waste bins in high-altitude settlements',
      'Community education discouraging deliberate feeding and tourist hand-outs'
    ],
    iucnGuidelineAlignment: 'IUCN SSC Guidelines §3.4 (Attractant Management) & §4.3 (Husbandry)'
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// SECONDARY / LOCALLY DOCUMENTED CONFLICT & COEXISTENCE SPECIES (10 SPECIES)
// ─────────────────────────────────────────────────────────────────────────────

export const SECONDARY_SPECIES: SecondarySpeciesEntry[] = [
  {
    id: 'sp-eurasian-lynx',
    commonName: 'Eurasian Lynx',
    scientificName: 'Lynx lynx isabellinus',
    category: 'Localized Poultry / Small-Livestock',
    iucnStatus: 'Least Concern (Global) / Endangered (Himalayan Range)',
    conflictRelevance: 'Occasional predation on sheep, goats, and poultry in high-altitude rocky valleys of Ladakh and Gilgit-Baltistan.',
    keyRegions: ['Ladakh', 'Gilgit-Baltistan'],
    managementRecommendation: 'Wire-mesh reinforcement of pastoral winter pens; compensate losses without lethal persecution.'
  },
  {
    id: 'sp-leopard-cat',
    commonName: 'Leopard Cat',
    scientificName: 'Prionailurus bengalensis',
    category: 'Localized Poultry / Small-Livestock',
    iucnStatus: 'Least Concern',
    conflictRelevance: 'Localized predation on free-range poultry near temperate mixed forest margins in Kashmir and AJK.',
    keyRegions: ['Kashmir Valley', 'Azad Jammu and Kashmir', 'Jammu'],
    managementRecommendation: 'Coop night-latching and elevated perches; essential rodent controller whose ecological value far outweighs minor losses.'
  },
  {
    id: 'sp-yellow-throated-marten',
    commonName: 'Yellow-throated Marten',
    scientificName: 'Martes flavigula',
    category: 'Localized Poultry / Small-Livestock',
    iucnStatus: 'Least Concern',
    conflictRelevance: 'Agile arboreal predator occasionally raiding domestic poultry sheds and bee apiaries in forested hills.',
    keyRegions: ['Kashmir Valley', 'Jammu', 'Azad Jammu and Kashmir'],
    managementRecommendation: 'Smooth sheet metal wrapping around tree trunks and apiary stands to prevent climbing.'
  },
  {
    id: 'sp-stone-marten',
    commonName: 'Stone Marten',
    scientificName: 'Martes foina',
    category: 'Agricultural / Land-Use Overlap',
    iucnStatus: 'Least Concern',
    conflictRelevance: 'Attracted to fruit orchards, roof attics, and poultry coops in high mountain villages.',
    keyRegions: ['Ladakh', 'Kashmir Valley', 'Gilgit-Baltistan'],
    managementRecommendation: 'Sealing attic crawlspaces with wire mesh; non-lethal ultrasonic deterrents.'
  },
  {
    id: 'sp-himalayan-goral',
    commonName: 'Himalayan Goral',
    scientificName: 'Naemorhedus goral',
    category: 'Agricultural / Land-Use Overlap',
    iucnStatus: 'Near Threatened',
    conflictRelevance: 'Occasional terrace crop and forage grazing in steep Shivalik and Pir Panjal foothill fields.',
    keyRegions: ['Jammu', 'Azad Jammu and Kashmir'],
    managementRecommendation: 'Living vegetative fences and border deterrent strips; monitor hunting pressure.'
  },
  {
    id: 'sp-himalayan-serow',
    commonName: 'Himalayan Serow',
    scientificName: 'Capricornis sumatraensis thar',
    category: 'Coexistence & Human Impact',
    iucnStatus: 'Vulnerable',
    conflictRelevance: 'Rarely causes direct crop damage; vulnerable to snare poaching and habitat fragmentation along ravine corridors.',
    keyRegions: ['Kashmir Valley', 'Jammu', 'Azad Jammu and Kashmir'],
    managementRecommendation: 'Corridor preservation; anti-snare community patrols along stream gullies.'
  },
  {
    id: 'sp-himalayan-langur',
    commonName: 'Himalayan Grey Langur',
    scientificName: 'Semnopithecus ajax',
    category: 'Agricultural / Land-Use Overlap',
    iucnStatus: 'Endangered',
    conflictRelevance: 'Orchard leaf and budding apple browsing; vulnerable to retaliatory stone-throwing and dog attacks.',
    keyRegions: ['Kashmir Valley', 'Jammu'],
    managementRecommendation: 'Non-lethal bioacoustics and crop-guarding; preserve broadleaved forest canopy corridors.'
  },
  {
    id: 'sp-himalayan-ibex',
    commonName: 'Himalayan Ibex',
    scientificName: 'Capra sibirica hemalayanus',
    category: 'Coexistence & Human Impact',
    iucnStatus: 'Least Concern',
    conflictRelevance: 'Pasture resource overlap with domestic livestock herds; key wild prey base supporting snow leopards and wolves.',
    keyRegions: ['Ladakh', 'Gilgit-Baltistan'],
    managementRecommendation: 'Rotational alpine grazing reserves; maintaining wild ungulate biomass to prevent predator attacks on livestock.'
  },
  {
    id: 'sp-blue-sheep',
    commonName: 'Blue Sheep (Bharal)',
    scientificName: 'Pseudois nayaur',
    category: 'Coexistence & Human Impact',
    iucnStatus: 'Least Concern',
    conflictRelevance: 'High-altitude rangeland forage overlap with pashmina goats; principal prey keeping snow leopards in wilderness areas.',
    keyRegions: ['Ladakh', 'Gilgit-Baltistan'],
    managementRecommendation: 'Collaborative rangeland zoning agreements with nomadic Changpa and Balti pastoralists.'
  },
  {
    id: 'sp-himalayan-griffon',
    commonName: 'Himalayan Griffon Vulture',
    scientificName: 'Gyps himalayensis',
    category: 'Scavenger / Secondary Mortality',
    iucnStatus: 'Near Threatened',
    conflictRelevance: 'Secondary mortality from feeding on retaliatory poisoned livestock carcasses set out for wolves or snow leopards.',
    keyRegions: ['Kashmir Valley', 'Jammu', 'Ladakh', 'Azad Jammu and Kashmir', 'Gilgit-Baltistan'],
    managementRecommendation: 'Zero-tolerance enforcement against carcass poisoning; rapid toxicological testing and livestock insurance compensation.'
  }
];
