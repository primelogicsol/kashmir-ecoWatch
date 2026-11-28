import { Metric, IntelligenceCard, InsightPanel, FeaturedEntity, Alert, ChartData } from '@/types';
import { PLATFORM_METRICS } from '@/data/platform-metrics';

// Headline metrics and static reference benchmarks aligned with PLATFORM_METRICS

export const liveMetrics: Metric[] = [
  { label: 'Operational Districts', value: PLATFORM_METRICS.operationalDistrictsCount.value, trend: 'stable', trendValue: 0 },
  { label: 'Verified Species', value: PLATFORM_METRICS.verifiedSpeciesProfilesCount.value, trend: 'stable', trendValue: 0 },
  { label: 'Cataloged Waterbodies', value: PLATFORM_METRICS.mappedWaterbodiesCount.value, trend: 'stable', trendValue: 0 },
  { label: 'Ramsar Wetlands', value: PLATFORM_METRICS.ramsarWetlandsCount.value, trend: 'stable', trendValue: 0 },
  { label: 'Protected Areas', value: PLATFORM_METRICS.protectedAreasVerifiedCount.value, trend: 'stable', trendValue: 0 },
  { label: 'KEW Physical Sensors', value: PLATFORM_METRICS.kewOwnedPhysicalSensorsCount.value, trend: 'stable', trendValue: 0 },
];

export const intelligenceCards: IntelligenceCard[] = [
  {
    id: 'atlas',
    title: 'Ecological Atlas',
    description: 'Interactive GIS mapping of subregions, river basins, and protected habitats',
    icon: 'map',
    metrics: [
      { label: 'Districts', value: PLATFORM_METRICS.operationalDistrictsCount.value },
      { label: 'Subregions', value: PLATFORM_METRICS.subregionsCount.value },
    ],
    link: '/protected-network/atlas',
    color: 'forest',
  },
  {
    id: 'biodiversity',
    title: 'Biodiversity Intelligence',
    description: 'Verified taxonomic species profiles with elevation-checked bioclimatic distributions',
    icon: 'leaf',
    metrics: [
      { label: 'Verified Species', value: PLATFORM_METRICS.verifiedSpeciesProfilesCount.value },
      { label: 'Subregions', value: PLATFORM_METRICS.subregionsCount.value },
    ],
    link: '/biodiversity',
    color: 'glacier',
  },
  {
    id: 'protected-areas',
    title: 'Protected Areas',
    description: 'Statutory National Parks, Wildlife Sanctuaries, and notified Conservation/Wetland Reserves',
    icon: 'shield',
    metrics: [
      { label: 'Protected Areas', value: PLATFORM_METRICS.protectedAreasVerifiedCount.value },
      { label: 'Ramsar Sites', value: PLATFORM_METRICS.ramsarWetlandsCount.value },
    ],
    link: '/protected-network',
    color: 'earth',
  },
  {
    id: 'water',
    title: 'Water Systems',
    description: 'Cataloged lakes, Ramsar wetlands, river sub-basins, and published limnological baselines',
    icon: 'droplet',
    metrics: [
      { label: 'Waterbodies', value: PLATFORM_METRICS.mappedWaterbodiesCount.value },
      { label: 'Ramsar Sites', value: PLATFORM_METRICS.ramsarWetlandsCount.value },
    ],
    link: '/water-systems',
    color: 'glacier',
  },
  {
    id: 'pollution',
    title: 'Hazard Intelligence',
    description: 'Multi-hazard screening synthesizing USGS/EMSC seismic catalogs, GloFAS v4, and Open-Meteo NWP',
    icon: 'cloud',
    metrics: [
      { label: 'River Sub-Basins', value: PLATFORM_METRICS.verifiedRiverBasinsCount.value },
      { label: 'KEW Sensors', value: PLATFORM_METRICS.kewOwnedPhysicalSensorsCount.value },
    ],
    link: '/hazard-intelligence',
    color: 'slate',
  },
  {
    id: 'seasonal',
    title: 'Environmental Monitoring',
    description: 'External CAMS atmospheric grids, community optical PM2.5 feeds, and statutory audit baselines',
    icon: 'sun',
    metrics: [
      { label: 'Districts', value: PLATFORM_METRICS.operationalDistrictsCount.value },
      { label: 'KEW Sensors', value: PLATFORM_METRICS.kewOwnedPhysicalSensorsCount.value },
    ],
    link: '/environmental-monitoring',
    color: 'alert',
  },
  {
    id: 'trails',
    title: 'Environmental Investigations',
    description: 'Multidisciplinary desk-verified synthesis records and scoping charters across J&K and Ladakh',
    icon: 'footprints',
    metrics: [
      { label: 'Charters & Records', value: PLATFORM_METRICS.canonicalInvestigationsCount.value },
      { label: 'Desk-Verified', value: 2 },
    ],
    link: '/environmental-investigations',
    color: 'forest',
  },
  {
    id: 'research',
    title: 'Sectoral EIA & Dossiers',
    description: 'Internal environmental synthesis dossiers across Western Himalayan development sectors',
    icon: 'book',
    metrics: [
      { label: 'Research Dossiers', value: PLATFORM_METRICS.sectoralDossiersCount.value },
      { label: 'Subregions', value: PLATFORM_METRICS.subregionsCount.value },
    ],
    link: '/sectoral-eia',
    color: 'glacier',
  },
];

export const insightPanels: InsightPanel[] = [
  {
    id: 'wetland-stress',
    title: 'Wetland Stress Watch',
    status: 'warning',
    description: 'Critical wetland ecosystems showing environmental pressure indicators',
    items: [
      {
        id: '1',
        title: 'Hokersar Wetland - Eutrophication Risk',
        location: 'Srinagar District',
        timestamp: new Date('2026-03-28'),
        severity: 'high',
      },
      {
        id: '2',
        title: 'Shallabugh Wetland - Encroachment Detected',
        location: 'Ganderbal District',
        timestamp: new Date('2026-03-27'),
        severity: 'medium',
      },
      {
        id: '3',
        title: 'Mirgund Wetland Conservation Reserve — ISRO NWIA Statutory Baseline (2011)',
        location: 'Baramulla / Budgam District',
        timestamp: new Date('2011-05-01'),
        severity: 'medium',
      },
    ],
  },
  {
    id: 'bloom-activity',
    title: 'Algal Bloom Activity',
    status: 'warning',
    description: 'Archived Sentinel-2 MSI NDCI retrievals and published limnological baselines',
    items: [
      {
        id: '1',
        title: 'Dal Lake — Eutrophic Nutrient Enrichment Audit Baseline (2025)',
        location: 'Srinagar',
        timestamp: new Date('2025-03-15'),
      },
      {
        id: '2',
        title: 'Anchar Lake — Hypereutrophic Urban Inflow Literature Baseline (2024)',
        location: 'Srinagar',
        timestamp: new Date('2024-09-01'),
      },
      {
        id: '3',
        title: 'Manasbal Lake — Monomictic Deep-Basin Limnological Baseline (2024)',
        location: 'Ganderbal',
        timestamp: new Date('2024-08-15'),
      },
    ],
  },
  {
    id: 'wildlife-sightings',
    title: 'Recent Wildlife Sightings',
    status: 'normal',
    description: 'Verified wildlife observations from protected areas and trails',
    items: [
      {
        id: '1',
        title: 'Hangul Deer Sighting - Group of 5',
        location: 'Dachigam National Park',
        timestamp: new Date('2026-03-29'),
        severity: 'low',
      },
      {
        id: '2',
        title: 'Snow Leopard Camera Trap',
        location: 'Hemis-Kishtwar Corridor',
        timestamp: new Date('2026-03-28'),
        severity: 'low',
      },
      {
        id: '3',
        title: 'Himalayan Brown Bear',
        location: 'Overa-Aru Wildlife Sanctuary',
        timestamp: new Date('2026-03-27'),
        severity: 'low',
      },
    ],
  },
  {
    id: 'air-quality',
    title: 'Air Quality Signals',
    status: 'warning',
    description: 'Real-time air quality monitoring across urban and industrial zones',
    items: [
      {
        id: '1',
        title: 'Srinagar - Moderate AQI (156)',
        location: 'Srinagar Urban',
        timestamp: new Date('2026-03-29'),
        severity: 'medium',
      },
      {
        id: '2',
        title: 'Anantnag - Good AQI (78)',
        location: 'Anantnag',
        timestamp: new Date('2026-03-29'),
        severity: 'low',
      },
      {
        id: '3',
        title: 'Baramulla - Moderate AQI (134)',
        location: 'Baramulla',
        timestamp: new Date('2026-03-29'),
        severity: 'medium',
      },
    ],
  },
  {
    id: 'spring-vulnerability',
    title: 'Spring Vulnerability',
    status: 'critical',
    description: 'Springs showing seasonal stress or discharge decline',
    items: [
      {
        id: '1',
        title: 'Kokernag Spring - Discharge Down 18%',
        location: 'Anantnag District',
        timestamp: new Date('2026-03-28'),
        severity: 'high',
      },
      {
        id: '2',
        title: 'Verinag Spring - Flow Reduction',
        location: 'Anantnag District',
        timestamp: new Date('2026-03-27'),
        severity: 'high',
      },
      {
        id: '3',
        title: 'Achabal Spring - Seasonal Low',
        location: 'Anantnag District',
        timestamp: new Date('2026-03-26'),
        severity: 'medium',
      },
    ],
  },
  {
    id: 'cryosphere-watch',
    title: 'Glacial Lake & Cryosphere Watch',
    status: 'critical',
    description: 'High-altitude moraine dam stability, glacier snout retreat, and hazard signals',
    items: [
      {
        id: '1',
        title: 'Kolhai Glacier Snout - Accelerated Melt Rate',
        location: 'Lidder Basin, Anantnag',
        timestamp: new Date('2026-03-29'),
        severity: 'high',
      },
      {
        id: '2',
        title: 'Thajiwas Moraine Dam - Proglacial Pond Expansion',
        location: 'Sonamarg, Ganderbal',
        timestamp: new Date('2026-03-28'),
        severity: 'high',
      },
      {
        id: '3',
        title: 'Machoi Glacier - Permafrost Slump Creep Signal',
        location: 'Zojila Pass Zone, Ganderbal',
        timestamp: new Date('2026-03-27'),
        severity: 'medium',
      },
    ],
  },
];

export const featuredEntities: FeaturedEntity[] = [
  // ── Protected Areas ──
  {
    id: 'dachigam',
    type: 'protected_area',
    name: 'Dachigam National Park',
    description: 'Premier temperate montane conservation landscape and last global stronghold of the critically endangered Hangul deer.',
    image: '/images/dachigam.jpg',
    metrics: [
      { label: 'Area', value: 141, unit: 'km²' },
      { label: 'Species', value: 267 },
      { label: 'Elevation', value: 3350, unit: 'm' },
    ],
    link: '/protected-areas/dachigam-national-park',
  },
  {
    id: 'kazinag',
    type: 'protected_area',
    name: 'Kazinag National Park',
    description: 'Rugged Pir Panjal and transboundary corridor protecting the endangered Flare-horned Markhor and subalpine biodiversity.',
    image: '/images/kazinag.jpg',
    metrics: [
      { label: 'Area', value: 160, unit: 'km²' },
      { label: 'Species', value: 198 },
      { label: 'Elevation', value: 4100, unit: 'm' },
    ],
    link: '/protected-areas/kazinag-national-park',
  },
  {
    id: 'overa-aru',
    type: 'protected_area',
    name: 'Overa-Aru Wildlife Sanctuary',
    description: 'High-altitude subalpine conifer sanctuary in the Lidder Valley, home to musk deer, brown bears, and Himalayan monals.',
    image: '/images/overa-aru.jpg',
    metrics: [
      { label: 'Area', value: 425, unit: 'km²' },
      { label: 'Species', value: 215 },
      { label: 'Elevation', value: 3850, unit: 'm' },
    ],
    link: '/protected-areas/overa-aru-wildlife-sanctuary',
  },
  {
    id: 'gulmarg-ws',
    type: 'protected_area',
    name: 'Gulmarg Wildlife Sanctuary',
    description: 'Pir Panjal montane biome with alpine birch forest ecotones, snow leopard migration corridors, and high-altitude avifauna.',
    image: '/images/gulmarg.jpg',
    metrics: [
      { label: 'Area', value: 180, unit: 'km²' },
      { label: 'Species', value: 172 },
      { label: 'Elevation', value: 3600, unit: 'm' },
    ],
    link: '/protected-areas/gulmarg-wildlife-sanctuary',
  },

  // ── Water Bodies ──
  {
    id: 'dal-lake',
    type: 'lake',
    name: 'Dal Lake',
    description: 'World-renowned urban lake and Ramsar-candidate wetland with unique floating gardens, spring basins, and endemic fish.',
    image: '/images/dal-lake.jpg',
    metrics: [
      { label: 'Area', value: 18, unit: 'km²' },
      { label: 'Depth (max)', value: 6, unit: 'm' },
      { label: 'Fish Species', value: 12 },
    ],
    link: '/water-systems/lakes/dal-lake',
  },
  {
    id: 'wular-lake',
    type: 'lake',
    name: 'Wular Lake & Wetland',
    description: 'One of the largest freshwater lakes in Asia and Ramsar wetland serving as the master flood absorption reservoir of Kashmir Valley.',
    image: '/images/wular-lake.jpg',
    metrics: [
      { label: 'Area', value: 130, unit: 'km²' },
      { label: 'Depth (max)', value: 5.8, unit: 'm' },
      { label: 'Bird Species', value: 120 },
    ],
    link: '/water-systems/lakes/wular-lake',
  },
  {
    id: 'hokersar-wetland',
    type: 'lake',
    name: 'Hokersar Wetland Reserve',
    description: 'Designated Ramsar Wetland of International Importance hosting over 500,000 migratory waterfowl across the Central Asian Flyway.',
    image: '/images/hokersar.jpg',
    metrics: [
      { label: 'Area', value: 13.75, unit: 'km²' },
      { label: 'Waterfowl', value: 500000 },
      { label: 'Status', value: 'Ramsar', unit: 'Protected' },
    ],
    link: '/water-systems/wetlands/hokersar-wetland',
  },
  {
    id: 'manasbal-lake',
    type: 'lake',
    name: 'Manasbal Lake',
    description: 'Deepest freshwater lake in the Kashmir Valley renowned for its subterranean spring feeds and extensive Nelumbo lotus beds.',
    image: '/images/manasbal.jpg',
    metrics: [
      { label: 'Area', value: 2.8, unit: 'km²' },
      { label: 'Depth (max)', value: 13, unit: 'm' },
      { label: 'Transparency', value: 4.5, unit: 'm' },
    ],
    link: '/water-systems/lakes/manasbal-lake',
  },

  // ── Species ──
  {
    id: 'hangul',
    type: 'species',
    name: 'Hangul (Kashmir Stag)',
    description: 'Critically Endangered royal red deer subspecies endemic to Kashmir; official state animal of Jammu and Kashmir.',
    image: '/images/hangul.jpg',
    metrics: [
      { label: 'Census 2023', value: 289, unit: 'Indiv.' },
      { label: 'IUCN Status', value: 'CR', unit: 'Critical' },
      { label: 'Range', value: 141, unit: 'km²' },
    ],
    link: '/biodiversity/mammals',
  },
  {
    id: 'snow-leopard',
    type: 'species',
    name: 'Snow Leopard (Shen Suh)',
    description: 'Elusive apex predator of high Himalayan and Zanskar scree crags; umbrella species for cryosphere alpine ecology.',
    image: '/images/snow-leopard.jpg',
    metrics: [
      { label: 'Est. Pop.', value: 450, unit: 'Ladakh/JK' },
      { label: 'IUCN Status', value: 'VU', unit: 'Vulnerable' },
      { label: 'Altitude', value: 5200, unit: 'm' },
    ],
    link: '/biodiversity/mammals',
  },
  {
    id: 'western-tragopan',
    type: 'species',
    name: 'Western Tragopan (Daangeer)',
    description: 'Rare and secretive horned pheasant of subalpine conifer forests in Kazinag and Pir Panjal; flagship avian indicator.',
    image: '/images/tragopan.jpg',
    metrics: [
      { label: 'IUCN Status', value: 'VU', unit: 'Vulnerable' },
      { label: 'Protection', value: 'Sch-I', unit: 'WPA 1972' },
      { label: 'Elevation', value: 3600, unit: 'm' },
    ],
    link: '/biodiversity/birds',
  },
  {
    id: 'kashmir-musk-deer',
    type: 'species',
    name: 'Kashmir Musk Deer (Kashur Rous)',
    description: 'Primitive solitary ungulate possessing elongated canine tusks; strictly conserved within subalpine rhododendron birch krummholz.',
    image: '/images/musk-deer.jpg',
    metrics: [
      { label: 'IUCN Status', value: 'EN', unit: 'Endangered' },
      { label: 'Protection', value: 'Sch-I', unit: 'CITES I' },
      { label: 'Range Band', value: 4100, unit: 'm' },
    ],
    link: '/biodiversity/mammals',
  },

  // ── Districts ──
  {
    id: 'srinagar',
    type: 'district',
    name: 'Srinagar District',
    description: 'Heart of the Kashmir Basin featuring premier urban lakes, Dachigam National Park, and Ramsar wetland ecosystems.',
    image: '/images/srinagar.jpg',
    metrics: [
      { label: 'Area', value: 2228, unit: 'km²' },
      { label: 'Wetlands', value: 47 },
      { label: 'Green Cover', value: 23, unit: '%' },
    ],
    link: '/biodiversity/district-profiles',
  },
  {
    id: 'anantnag',
    type: 'district',
    name: 'Anantnag District',
    description: 'Southern riverine biodiversity hub, headwaters of the Jhelum River, Kokernag botanical springs, and Overa-Aru sanctuary.',
    image: '/images/anantnag.jpg',
    metrics: [
      { label: 'Area', value: 3574, unit: 'km²' },
      { label: 'Forest Cover', value: 62, unit: '%' },
      { label: 'Species', value: 312 },
    ],
    link: '/biodiversity/district-profiles',
  },
  {
    id: 'baramulla',
    type: 'district',
    name: 'Baramulla District',
    description: 'Western gateway encompassing Wular Lake, Kazinag National Park, and critical Markhor transboundary corridors.',
    image: '/images/baramulla.jpg',
    metrics: [
      { label: 'Area', value: 4190, unit: 'km²' },
      { label: 'Protected Area', value: 340, unit: 'km²' },
      { label: 'Forest Cover', value: 55, unit: '%' },
    ],
    link: '/biodiversity/district-profiles',
  },
  {
    id: 'ganderbal',
    type: 'district',
    name: 'Ganderbal District',
    description: 'Sindh River catchment connecting Dal Lake headwaters to pristine high-altitude Great Lakes and Gangabal glaciers.',
    image: '/images/ganderbal.jpg',
    metrics: [
      { label: 'Area', value: 1045, unit: 'km²' },
      { label: 'Alpine Lakes', value: 24 },
      { label: 'Protected Area', value: 298, unit: 'km²' },
    ],
    link: '/biodiversity/district-profiles',
  },

  // ── Trails & Corridors ──
  {
    id: 'dachigam-hangul-trail',
    type: 'trail',
    name: 'Dachigam Hangul Trail',
    description: 'Premier eco-monitoring trail through Lower Dachigam riverine galleries offering guided Hangul and Himalayan black bear sightings.',
    image: '/images/dachigam-trail.jpg',
    metrics: [
      { label: 'Distance', value: 8.5, unit: 'km' },
      { label: 'Duration', value: '4-6', unit: 'hours' },
      { label: 'Difficulty', value: 'Moderate', unit: 'Permit' },
    ],
    link: '/trails-sightings/hiking-trails',
  },
  {
    id: 'tarsar-marsar',
    type: 'trail',
    name: 'Tarsar Marsar Trek',
    description: 'Iconic high-altitude alpine lake circuit connecting the Lidder Valley to pristine oligotrophic glacial tarns at 4,000m.',
    image: '/images/tarsar-marsar.jpg',
    metrics: [
      { label: 'Distance', value: 32, unit: 'km' },
      { label: 'Duration', value: 5, unit: 'days' },
      { label: 'Difficulty', value: 'Moderate', unit: 'Alpine' },
    ],
    link: '/trails-sightings/hiking-trails',
  },
  {
    id: 'great-lakes-circuit',
    type: 'trail',
    name: 'Kashmir Great Lakes Circuit',
    description: 'World-renowned wilderness trek traversing 7 alpine tarns from Sonamarg across Nichnai and Gadsar passes to Naranag.',
    image: '/images/great-lakes.jpg',
    metrics: [
      { label: 'Distance', value: 72, unit: 'km' },
      { label: 'Duration', value: 7, unit: 'days' },
      { label: 'Max Altitude', value: 4200, unit: 'm' },
    ],
    link: '/trails-sightings/hiking-trails',
  },
  {
    id: 'hokersar-boardwalk',
    type: 'trail',
    name: 'Hokersar Wetland Boardwalk',
    description: 'Accessible birding eco-trail with observation watchtowers providing uninterrupted views of winter migratory waterfowl flocks.',
    image: '/images/hokersar-trail.jpg',
    metrics: [
      { label: 'Distance', value: 3.2, unit: 'km' },
      { label: 'Duration', value: '1-2', unit: 'hours' },
      { label: 'Difficulty', value: 'Easy', unit: 'All-Ages' },
    ],
    link: '/trails-sightings/wetland-trails',
  },

  // ── Bloom Zones ──
  {
    id: 'tulip-bloom',
    type: 'bloom',
    name: 'Wild Tulip & Alpine Geophytes',
    description: 'Phenological spring flush in Srinagar and lower Zabarwan terraces featuring endemic Tulipa clusiana and Fritillaria.',
    image: '/images/tulip-bloom.jpg',
    metrics: [
      { label: 'Peak Window', value: 'Apr-May', unit: 'Spring' },
      { label: 'Species', value: 28, unit: 'Taxa' },
      { label: 'Density', value: 'High', unit: 'Zones' },
    ],
    link: '/seasonal-ecology/bloom-mapping',
  },
  {
    id: 'tosamaidan-alpine-bloom',
    type: 'bloom',
    name: 'Tosamaidan Alpine Wildflower Meadows',
    description: 'High-altitude subalpine expanse blooming profusely with Primula, Iris, and Aconitum following snowmelt in Budgam.',
    image: '/images/tosamaidan.jpg',
    metrics: [
      { label: 'Altitude', value: 3100, unit: 'm' },
      { label: 'Endemics', value: 42, unit: 'Flora' },
      { label: 'Peak Window', value: 'Jun-Jul', unit: 'Summer' },
    ],
    link: '/seasonal-ecology/bloom-mapping',
  },

    {
    id: 'pampore-saffron-bloom',
    type: 'bloom',
    name: 'Pampore Saffron Karewa Bloom',
    description: 'Iconic autumn purple carpet of Crocus sativus across elevated lacustrine Karewa plateaus in Pulwama.',
    image: '/images/pampore-saffron.jpg',
    metrics: [
      { label: 'Bloom Window', value: 'Oct-Nov', unit: 'Autumn' },
      { label: 'Crocus Area', value: 210, unit: 'km²' },
      { label: 'Pollinators', value: 'Apis', unit: 'Honeybee' },
    ],
    link: '/seasonal-ecology/bloom-mapping',
  },
  {
    id: 'badamwari-almond-bloom',
    type: 'bloom',
    name: 'Badamwari Historic Almond Bloom',
    description: 'Historic Mughal-era almond orchard at the foot of Koh-i-Maran marking the traditional herald of spring in Srinagar.',
    image: '/images/badamwari.jpg',
    metrics: [
      { label: 'Herald Window', value: 'Mid-Mar', unit: 'Spring' },
      { label: 'Elevation', value: 1590, unit: 'm' },
      { label: 'Heritage', value: 'Mughal', unit: 'Historical' },
    ],
    link: '/seasonal-ecology/bloom-mapping',
  },

  // ── Wetlands & Ramsar Sites ──
  {
    id: 'shallabugh-wetland',
    type: 'wetland',
    name: 'Shallabugh Wetland Wildlife Sanctuary',
    description: 'Extensive floodplain reedbed ecosystem in Ganderbal supporting vast congregations of wintering Anatidae waterfowl.',
    image: '/images/shallabugh.jpg',
    metrics: [
      { label: 'Area', value: 16.75, unit: 'km²' },
      { label: 'Status', value: 'Ramsar', unit: 'Designated' },
      { label: 'Waterfowl', value: 180000, unit: 'Peak' },
    ],
    link: '/water-systems/wetlands',
  },
  {
    id: 'hygam-wetland',
    type: 'wetland',
    name: 'Hygam Wetland Reserve',
    description: 'Baramulla floodplain sanctuary vital for breeding resident moorhens, bitterns, and Central Asian migratory pintails.',
    image: '/images/hygam.jpg',
    metrics: [
      { label: 'Area', value: 7.25, unit: 'km²' },
      { label: 'Status', value: 'Ramsar', unit: 'Designated' },
      { label: 'Avifauna', value: 92, unit: 'Species' },
    ],
    link: '/water-systems/wetlands',
  },

    {
    id: 'mirgund-wetland',
    type: 'wetland',
    name: 'Mirgund Wetland Reserve',
    description: 'Vital marshland habitat along the Baramulla-Budgam border providing breeding sanctuary for water rail and garganey.',
    image: '/images/mirgund.jpg',
    metrics: [
      { label: 'Area', value: 4.0, unit: 'km²' },
      { label: 'Migrants', value: 45000, unit: 'Seasonal' },
      { label: 'Status', value: 'State', unit: 'Protected' },
    ],
    link: '/water-systems/wetlands',
  },
  {
    id: 'chatlam-wetland',
    type: 'wetland',
    name: 'Chatlam Wetland Reserve',
    description: 'Spring-fed Pampore wetland complex supporting rare wintering ferruginous ducks and resident grebes.',
    image: '/images/chatlam.jpg',
    metrics: [
      { label: 'Area', value: 0.25, unit: 'km²' },
      { label: 'Spring Fed', value: 'Perennial', unit: 'Hydrology' },
      { label: 'Avifauna', value: 68, unit: 'Species' },
    ],
    link: '/water-systems/wetlands',
  },

  // ── Hazard & Flood Zones ──
  {
    id: 'jhelum-flood-plain',
    type: 'hazard',
    name: 'Jhelum Basin High-Exposure Flood Zone',
    description: 'Riverine floodplain corridor spanning Sangam to Srinagar tracked via statutory flood benchmarks and Copernicus GloFAS v4 modeled discharge.',
    image: '/images/jhelum-flood.jpg',
    metrics: [
      { label: 'Risk Level', value: 'Critical', unit: 'Zone 5' },
      { label: 'Population', value: 185000, unit: 'Exposed' },
      { label: 'Cycle', value: '25-50y', unit: 'Return' },
    ],
    link: '/hazard-intelligence/floods',
  },
  {
    id: 'panzath-karst-springs',
    type: 'hazard',
    name: 'Panzath Karst Springs & Aquifer',
    description: 'Perennial karst hydrological spring shed in Qazigund feeding trout hatcheries, documented in regional hydrogeological baselines.',
    image: '/images/panzath.jpg',
    metrics: [
      { label: 'Discharge', value: 450, unit: 'L/sec' },
      { label: 'Health', value: 'Good', unit: 'Potable' },
      { label: 'Vulnerability', value: 'Moderate', unit: 'Recharge' },
    ],
    link: '/water-systems/springs',
  },
  {
    id: 'apharwat-avalanche-chute',
    type: 'hazard',
    name: 'Gulmarg Apharwat Avalanche Chute',
    description: 'High-altitude snowpack fracture zone along Apharwat Peak screened via Gulmarg Avalanche Center bulletins and alpine NWP snowfall models.',
    image: '/images/apharwat-avalanche.jpg',
    metrics: [
      { label: 'Altitude', value: 4390, unit: 'm' },
      { label: 'Risk Tier', value: 'High', unit: 'Zone 4' },
      { label: 'Slope Incline', value: 38, unit: 'deg' },
    ],
    link: '/hazard-intelligence/avalanches',
  },
  {
    id: 'pir-panjal-fire-corridor',
    type: 'hazard',
    name: 'Pir Panjal Conifer Wildfire Corridor',
    description: 'Dry-season Pinus wallichiana canopy belts screened via NDMA SACHET CAP bulletins and Open-Meteo NWP fire-weather heuristics.',
    image: '/images/forest-fire.jpg',
    metrics: [
      { label: 'Fuel Load', value: 'High', unit: 'Chir/Kail' },
      { label: 'Screening', value: 'NWP+CAP', unit: 'Model' },
      { label: 'Response', value: 'Rapid', unit: 'Forest Dept' },
    ],
    link: '/hazard-intelligence/forest-fires',
  },
];

export const alerts: Alert[] = [
  {
    id: '1',
    type: 'wetland_alert',
    title: 'Wetland Encroachment Audit Baseline',
    description: 'Historical perimeter encroachment documented in statutory wetland conservation audits',
    severity: 'high',
    location: 'Hokersar Wetland, Srinagar',
    timestamp: new Date('2025-03-01'),
  },
  {
    id: '2',
    type: 'air_quality',
    title: 'Winter Valley Inversion Advisory Baseline',
    description: 'Seasonal particulate trapping during winter shallow boundary-layer inversions',
    severity: 'medium',
    location: 'Srinagar Basin',
    timestamp: new Date('2025-11-15'),
  },
  {
    id: '3',
    type: 'trail_closure',
    title: 'Seasonal High-Altitude Route Closure',
    description: 'Autumn-winter snow accumulation restricts access across upper alpine glacial trails',
    severity: 'high',
    location: 'Kolahoi & Great Lakes Alpine Routes',
    timestamp: new Date('2025-11-10'),
  },
];

export const airQualityData: ChartData[] = [
  { label: 'Jan', value: 142 },
  { label: 'Feb', value: 128 },
  { label: 'Mar', value: 156 },
  { label: 'Apr', value: 98 },
  { label: 'May', value: 76 },
  { label: 'Jun', value: 68 },
];

export const waterQualityData: ChartData[] = [
  { label: 'Jan', value: 7.2 },
  { label: 'Feb', value: 7.4 },
  { label: 'Mar', value: 6.8 },
  { label: 'Apr', value: 7.1 },
  { label: 'May', value: 7.3 },
  { label: 'Jun', value: 7.0 },
];

export const bloomActivityData: ChartData[] = [
  { label: 'Jan', value: 12 },
  { label: 'Feb', value: 28 },
  { label: 'Mar', value: 67 },
  { label: 'Apr', value: 89 },
  { label: 'May', value: 54 },
  { label: 'Jun', value: 32 },
];

export const sightingActivityData: ChartData[] = [
  { label: 'Jan', value: 234 },
  { label: 'Feb', value: 312 },
  { label: 'Mar', value: 487 },
  { label: 'Apr', value: 623 },
  { label: 'May', value: 712 },
  { label: 'Jun', value: 589 },
];

export const districtComparisonData: ChartData[] = [
  { label: 'Srinagar', value: 72 },
  { label: 'Anantnag', value: 84 },
  { label: 'Baramulla', value: 68 },
  { label: 'Kulgam', value: 79 },
  { label: 'Pulwama', value: 75 },
  { label: 'Ganderbal', value: 88 },
];
