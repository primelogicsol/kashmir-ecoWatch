const fs = require('fs');

function getClosingTag(str, startIndex, tagName) {
  let depth = 0;
  const tagRegex = new RegExp(`<\/?${tagName}[^>]*>`, 'g');
  tagRegex.lastIndex = startIndex;
  
  let match;
  while ((match = tagRegex.exec(str)) !== null) {
    if (match[0].startsWith(`</${tagName}`)) {
      depth--;
      if (depth === 0) return match.index + match[0].length;
    } else if (!match[0].endsWith('/>')) {
      depth++;
    }
  }
  return -1;
}

const pages = [
  { path: 'src/app/biodiversity/dashboards/page.tsx', title: 'Dashboards', subtitle: 'Analytics & trends' },
  { path: 'src/app/biodiversity/page.tsx', title: 'Species Directory', subtitle: 'Browse complete database' },
  { path: 'src/app/biodiversity/mammals/page.tsx', title: 'Mammals', subtitle: 'Ungulates, carnivores & more' },
  { path: 'src/app/biodiversity/birds/page.tsx', title: 'Birds', subtitle: 'Resident & migratory species' },
  { path: 'src/app/biodiversity/fish/page.tsx', title: 'Fish & Aquatic Life', subtitle: 'Freshwater & aquatic biodiversity' },
  { path: 'src/app/biodiversity/plants/page.tsx', title: 'Plants & Flora', subtitle: 'Vascular plants & vegetation' },
  { path: 'src/app/biodiversity/medicinal-plants/page.tsx', title: 'Medicinal Flora', subtitle: 'Traditional medicinal plants' },
  { path: 'src/app/biodiversity/threatened-species/page.tsx', title: 'Threatened Species', subtitle: 'CR, EN, VU conservation taxa' },
  { path: 'src/app/biodiversity/wildlife-sightings/page.tsx', title: 'Wildlife Sightings', subtitle: 'Verified & community observations' },
  { path: 'src/app/biodiversity/birding-hotspots/page.tsx', title: 'Observation Hotspots', subtitle: 'Prime observation areas' },
  { path: 'src/app/biodiversity/migration-windows/page.tsx', title: 'Migration Windows', subtitle: 'Migratory bird timing' },
  { path: 'src/app/biodiversity/pollinator-activity/page.tsx', title: 'Pollinator Activity', subtitle: 'Pollinator watch periods' },
  { path: 'src/app/biodiversity/phenology-flowering/page.tsx', title: 'Phenology Records', subtitle: 'Flowering & seasonal records' },
  { path: 'src/app/biodiversity/habitat-signals/page.tsx', title: 'Habitat Signals', subtitle: 'Habitat stress & transitions' },
  { path: 'src/app/biodiversity/seasonal-activity/page.tsx', title: 'Seasonal Activity', subtitle: 'Breeding & activity windows' },
];

for (const p of pages) {
  if (!fs.existsSync(p.path)) continue;
  
  let content = fs.readFileSync(p.path, 'utf8');

  // Insert imports if missing
  if (!content.includes('import { Heading }')) {
    content = content.replace("import React", "import React from 'react';\nimport { Heading } from '@/components/common/Heading';\nimport { LiveMetricsBar } from '@/components/common/LiveMetricsBar';");
  }

  const heroStartIndex = content.indexOf('<div className="relative pt-20');
  if (heroStartIndex === -1) continue;

  const heroEndIndex = getClosingTag(content, heroStartIndex, 'div');
  if (heroEndIndex === -1) continue;

  // Generate 4-word title if possible
  const titleWords = p.title.split(' ');
  const titleHTML = `<><span className="block whitespace-nowrap">${titleWords.slice(0, Math.ceil(titleWords.length/2)).join(' ')}</span><span className="block whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">${titleWords.slice(Math.ceil(titleWords.length/2)).join(' ') || 'Intelligence'}</span></>`;
  
  // Try to find the old KPI strip to replace it too
  let metricsEndIndex = heroEndIndex;
  const oldMetricsIndex = content.indexOf('{/* Live Metrics Bar */}');
  const metricsGridIndex = content.indexOf('grid-cols-2 md:grid-cols-4', heroEndIndex);
  
  if (oldMetricsIndex !== -1 && oldMetricsIndex < heroEndIndex + 1000) {
     metricsEndIndex = getClosingTag(content, content.indexOf('<div', oldMetricsIndex), 'div');
  } else if (metricsGridIndex !== -1 && metricsGridIndex < heroEndIndex + 1000) {
     // If there's a manual grid card right after
     const containerIndex = content.lastIndexOf('<div className="container', metricsGridIndex);
     if (containerIndex > heroEndIndex && containerIndex < heroEndIndex + 100) {
       metricsEndIndex = getClosingTag(content, containerIndex, 'div');
     }
  }
  
  const newHero = `<Heading
        title={${titleHTML}}
        subtitle="${p.subtitle} — Advanced monitoring landscapes spanning Kashmir's conservation zones. Integrates species profiles, habitat data, and ecological intelligence."
        icon={<Leaf className="w-6 h-6 text-emerald-400" />}
        label="Biodiversity Intelligence"
        gridOverlay
        images={['/images/biodiversity.png', '/images/bird.png', '/images/plant.png']}
        actions={
          <>
            <a href="/biodiversity">
              <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-emerald-500" icon={<Search className="w-5 h-5" />}>
                Search
              </Button>
            </a>
            <a href="/biodiversity/dashboards">
              <Button size="lg" variant="outline" className="border-white/20 text-white" icon={<Map className="w-5 h-5" />}>
                Data Dashboards
              </Button>
            </a>
          </>
        }
      />

      {/* Live Metrics Bar */}
      <LiveMetricsBar metrics={[
        { label: 'Species Indexed', value: 1250, icon: Activity },
        { label: 'Birds', value: 550, icon: Bird },
        { label: 'Mammals', value: 75, icon: Mountain },
        { label: 'Fish & Aquatic', value: 120, icon: Fish },
        { label: 'Plants & Flora', value: 4500, icon: Sprout },
        { label: 'Medicinal Flora', value: 350, icon: Flower2 },
        { label: 'Threatened', value: 45, icon: Shield },
        { label: 'Sightings', value: '10K+', icon: Eye }
      ]} />`;

  content = content.substring(0, heroStartIndex) + newHero + content.substring(metricsEndIndex);
  
  // Fix imports
  if (!content.includes('import { Leaf')) {
     content = content.replace("import {", "import {\n  Leaf,\n  Map,\n  Search,\n  Activity,\n  Bird,\n  Mountain,\n  Fish,\n  Sprout,\n  Flower2,\n  Shield,\n  Eye,");
  }

  fs.writeFileSync(p.path, content, 'utf8');
  console.log('Upgraded', p.path);
}
