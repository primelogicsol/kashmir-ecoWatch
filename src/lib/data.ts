import { Metric, IntelligenceCard, InsightPanel, FeaturedEntity, Alert, ChartData } from '@/types';

export const liveMetrics: Metric[] = [
  { label: 'Protected Areas', value: 39, trend: 'stable', trendValue: 0 },
  { label: 'Species Indexed', value: 73, trend: 'up', trendValue: 0 },
  { label: 'Lakes & Wetlands', value: 82, trend: 'stable', trendValue: 0 },
  { label: 'Active Alerts', value: 0, trend: 'stable', trendValue: 0 },
  { label: 'Field Reports', value: 45, trend: 'up', trendValue: 8 },
  { label: 'Hazard Zones', value: 224, trend: 'stable', trendValue: 0 },
];

export const intelligenceCards: IntelligenceCard[] = [
  {
    id: 'atlas',
    title: 'Ecological Atlas',
    description: 'Interactive GIS mapping of ecosystems, watersheds, and biodiversity hotspots',
    icon: 'map',
    metrics: [
      { label: 'Layers', value: 42 },
      { label: 'Coverage', value: 100, unit: '%' },
    ],
    link: '/protected-network/atlas',
    color: 'forest',
  },
  {
    id: 'biodiversity',
    title: 'Biodiversity Intelligence',
    description: 'Comprehensive species database with distribution, habitat, and conservation status',
    icon: 'leaf',
    metrics: [
      { label: 'Species', value: 2847 },
      { label: 'Threatened', value: 312 },
    ],
    link: '/biodiversity',
    color: 'glacier',
  },
  {
    id: 'protected-areas',
    title: 'Protected Areas',
    description: 'National parks, sanctuaries, reserves with ecological monitoring',
    icon: 'shield',
    metrics: [
      { label: 'Areas', value: 47 },
      { label: 'Coverage', value: 4380, unit: 'km²' },
    ],
    link: '/protected-network',
    color: 'earth',
  },
  {
    id: 'water',
    title: 'Water Systems',
    description: 'Lakes, wetlands, rivers, springs with hydrological intelligence',
    icon: 'droplet',
    metrics: [
      { label: 'Water Bodies', value: 1435 },
      { label: 'Ramsar Basins', value: 5 },
    ],
    link: '/water-systems',
    color: 'glacier',
  },
  {
    id: 'pollution',
    title: 'Hazard Intelligence',
    description: 'Real-time hazard intelligence across floods, fires, landslides, and quakes',
    icon: 'cloud',
    metrics: [
      { label: 'Hazard Zones', value: 224 },
      { label: 'Live APIs', value: 7 },
    ],
    link: '/hazard-intelligence',
    color: 'slate',
  },
  {
    id: 'seasonal',
    title: 'Environmental Monitoring',
    description: 'Pollution, water quality, and environmental stress signals',
    icon: 'sun',
    metrics: [
      { label: 'Monitored Assets', value: 48 },
      { label: 'Domains', value: 11 },
    ],
    link: '/environmental-monitoring',
    color: 'alert',
  },
  {
    id: 'trails',
    title: 'Trails & Sightings',
    description: 'Hiking trails, birding routes, wildlife observation hotspots',
    icon: 'footprints',
    metrics: [
      { label: 'Trails', value: 156 },
      { label: 'Sightings', value: 4521 },
    ],
    link: '/trails-sightings',
    color: 'forest',
  },
  {
    id: 'research',
    title: 'Field Intelligence',
    description: 'Scientific field reports, surveys, and technical assessments',
    icon: 'book',
    metrics: [
      { label: 'Field Reports', value: 45 },
      { label: 'Datasets', value: 89 },
    ],
    link: '/field-reports',
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
        title: 'Mirgund Wetland - Water Quality Decline',
        location: 'Kulgam District',
        timestamp: new Date('2026-03-26'),
        severity: 'medium',
      },
    ],
  },
  {
    id: 'bloom-activity',
    title: 'Algal Bloom Activity',
    status: 'warning',
    description: 'Seasonal algal bloom patterns across Kashmir\'s five major lakes',
    items: [
      {
        id: '1',
        title: 'Dal Lake - Moderate Bloom',
        location: 'Srinagar',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      },
      {
        id: '2',
        title: 'Anchar Lake - High Bloom Activity',
        location: 'Srinagar',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      },
      {
        id: '3',
        title: 'Manasbal Lake - Developing Bloom',
        location: 'Ganderbal',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
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
];

export const alerts: Alert[] = [
  {
    id: '1',
    type: 'wetland_alert',
    title: 'Wetland Encroachment Alert',
    description: 'Illegal construction detected near protected wetland boundary',
    severity: 'high',
    location: 'Hokersar Wetland, Srinagar',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: '2',
    type: 'air_quality',
    title: 'Air Quality Advisory',
    description: 'Moderate AQI levels expected due to temperature inversion',
    severity: 'medium',
    location: 'Srinagar Urban Area',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
  },
  {
    id: '3',
    type: 'trail_closure',
    title: 'Trail Closure - Landslide Risk',
    description: 'Temporary closure due to unstable terrain after rainfall',
    severity: 'high',
    location: 'Kolahoi Base Camp Trail',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: '4',
    type: 'monitoring',
    title: 'Water Quality Anomaly',
    description: 'Elevated turbidity levels detected at monitoring station',
    severity: 'medium',
    location: 'Jhelum River, Sangam',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    id: '5',
    type: 'hazard',
    title: 'Avalanche Risk Warning',
    description: 'High avalanche risk in higher altitude zones',
    severity: 'high',
    location: 'Gulmarg High Range',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
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
