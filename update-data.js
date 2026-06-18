const fs = require('fs');
const path = require('path');

// 1. Read actual data lengths
const fieldReportsPath = path.join(__dirname, 'src/data/field-reports-registry.ts');
const fieldReportsContent = fs.readFileSync(fieldReportsPath, 'utf8');
const reportsCount = (fieldReportsContent.match(/id: 'fr-/g) || []).length;

const lakesPath = path.join(__dirname, 'src/data/algal-bloom-lakes.ts');
let lakesCount = 83; // fallback
if (fs.existsSync(lakesPath)) {
  const lakesContent = fs.readFileSync(lakesPath, 'utf8');
  // Match ids in algal-bloom-lakes
  lakesCount = (lakesContent.match(/id: '/g) || []).length;
}

const hazardFiles = [
  'hazard-floods.ts', 'hazard-flash-floods.ts', 'hazard-landslides.ts',
  'hazard-avalanches.ts', 'hazard-earthquakes.ts', 'hazard-glofs.ts', 'hazard-forest-fires.ts'
];
let hazardsCount = 0;
for (const file of hazardFiles) {
  const filePath = path.join(__dirname, 'src/data', file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    hazardsCount += (content.match(/id: '/g) || []).length;
  }
}

// 2. Update src/lib/data.ts
const dataPath = path.join(__dirname, 'src/lib/data.ts');
let dataContent = fs.readFileSync(dataPath, 'utf8');

// Replace liveMetrics
const newLiveMetrics = `export const liveMetrics: Metric[] = [
  { label: 'Protected Areas', value: 39, trend: 'stable', trendValue: 0 },
  { label: 'Species Indexed', value: 73, trend: 'up', trendValue: 0 },
  { label: 'Lakes & Wetlands', value: ${lakesCount}, trend: 'stable', trendValue: 0 },
  { label: 'Active Alerts', value: 0, trend: 'stable', trendValue: 0 },
  { label: 'Field Reports', value: ${reportsCount}, trend: 'up', trendValue: 8 },
  { label: 'Hazard Zones', value: ${hazardsCount}, trend: 'stable', trendValue: 0 },
];`;

dataContent = dataContent.replace(/export const liveMetrics: Metric\[\] = \[[\s\S]*?\];/, newLiveMetrics);

// Replace intelligenceCards
const newCards = `export const intelligenceCards: IntelligenceCard[] = [
  {
    id: 'atlas',
    title: 'Ecological Atlas',
    description: 'Interactive GIS mapping of ecosystems, watersheds, and biodiversity hotspots',
    icon: 'map',
    metrics: [
      { label: 'Layers', value: 42 },
      { label: 'Coverage', value: 100, unit: '%' },
    ],
    link: '/atlas',
    color: 'forest',
  },
  {
    id: 'biodiversity',
    title: 'Biodiversity Intelligence',
    description: 'Comprehensive species database with distribution, habitat, and conservation status',
    icon: 'leaf',
    metrics: [
      { label: 'Species', value: 73 },
      { label: 'Threatened', value: 14 },
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
      { label: 'Areas', value: 39 },
      { label: 'Coverage', value: 12.8, unit: '%' },
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
      { label: 'Lakes Monitored', value: ${lakesCount} },
      { label: 'Rivers & Basins', value: 15 },
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
      { label: 'Hazard Zones', value: ${hazardsCount} },
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
      { label: 'Monitored Assets', value: 45 },
      { label: 'Active Alerts', value: 0 },
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
      { label: 'Field Reports', value: ${reportsCount} },
      { label: 'Datasets', value: 12 },
    ],
    link: '/field-reports',
    color: 'glacier',
  },
];`;

dataContent = dataContent.replace(/export const intelligenceCards: IntelligenceCard\[\] = \[[\s\S]*?\];/, newCards);

fs.writeFileSync(dataPath, dataContent, 'utf8');
console.log('Successfully updated data.ts');
