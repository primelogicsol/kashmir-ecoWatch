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
  { path: 'src/app/environmental-monitoring/page.tsx', title: 'Environmental Intelligence Command Center', subtitle: 'Monitoring waste systems, sewage, drinking water, air pollution, environmental stress, and public ecological service risks across Kashmir.' },
  { path: 'src/app/environmental-monitoring/dashboards/page.tsx', title: 'Environmental Monitoring Data Dashboards', subtitle: 'Comprehensive data analytics, spatial monitoring, and metrics for environmental intelligence across Kashmir.' },
  { path: 'src/app/environmental-monitoring/solid-waste/page.tsx', title: 'Solid Waste Environmental Intelligence', subtitle: 'Tracking municipal solid waste hotspots, illegal dumping, landfill stress, and open burning sites.' },
  { path: 'src/app/environmental-monitoring/bio-waste/page.tsx', title: 'Bio-Waste Monitoring Intelligence', subtitle: 'Tracking organic waste accumulation, hospital waste risks, and decomposition zones in sensitive ecosystems.' },
  { path: 'src/app/environmental-monitoring/sewage-wastewater/page.tsx', title: 'Sewage & Wastewater Intelligence', subtitle: 'Monitoring untreated sewage outfalls, wastewater overflow, and contamination of primary water bodies.' },
  { path: 'src/app/environmental-monitoring/drinking-water/page.tsx', title: 'Drinking Water Quality Intelligence', subtitle: 'Tracking contamination alerts, supply disruptions, and quality parameters of drinking water sources.' },
  { path: 'src/app/environmental-monitoring/critical-infrastructure/page.tsx', title: 'Critical Water Infrastructure Monitoring', subtitle: 'Status tracking of water treatment plants, intake stations, reservoirs, and public water utilities.' },
  { path: 'src/app/environmental-monitoring/air-pollution/page.tsx', title: 'Air Quality & Pollution Intelligence', subtitle: 'Real-time monitoring of AQI, particulate matter, smoke stress, and open burning incidents.' },
  { path: 'src/app/environmental-monitoring/environmental-health/page.tsx', title: 'Environmental Health Stress Signals', subtitle: 'Identifying physical indicators of ecosystem stress, including stagnant water vectors and persistent odors.' },
  { path: 'src/app/environmental-monitoring/utility-incidents/page.tsx', title: 'Public Utility Environmental Incidents', subtitle: 'Reporting and tracking service failures, infrastructure damage, and public environmental advisories.' }
];

for (const p of pages) {
  if (!fs.existsSync(p.path)) continue;
  
  let content = fs.readFileSync(p.path, 'utf8');

  // Insert imports if missing
  if (!content.includes('import { Heading }')) {
    content = content.replace("import React from 'react';", "import React, { useState } from 'react';\nimport { Heading } from '@/components/common/Heading';\nimport { LiveMetricsBar } from '@/components/common/LiveMetricsBar';\nimport { Button } from '@/components/ui/Button';");
  } else {
    if (!content.includes('import { LiveMetricsBar }')) {
      content = content.replace("import { Heading }", "import { Heading } from '@/components/common/Heading';\nimport { LiveMetricsBar } from '@/components/common/LiveMetricsBar';");
    }
    if (!content.includes('import { Button }')) {
      content = content.replace("import { Heading }", "import { Heading } from '@/components/common/Heading';\nimport { Button } from '@/components/ui/Button';");
    }
  }

  // Ensure useState is available
  if (content.includes('useState') && !content.includes('{ useState }') && !content.includes('{useState}')) {
     content = content.replace(/import React from 'react';/, "import React, { useState } from 'react';");
  }

  // Find start
  let heroStartIndex = -1;
  let heroEndIndex = -1;
  let metricsEndIndex = -1;

  heroStartIndex = content.indexOf('<Heading');
  if (heroStartIndex !== -1) {
      heroEndIndex = content.indexOf('/>', heroStartIndex) + 2;
  } else {
      heroStartIndex = content.indexOf('<div className="relative pt-20');
      if (heroStartIndex === -1) {
          heroStartIndex = content.indexOf('<section className="relative pt-20');
      }
      if (heroStartIndex !== -1) {
          heroEndIndex = getClosingTag(content, heroStartIndex, content.substring(heroStartIndex, heroStartIndex+10).includes('<section') ? 'section' : 'div');
      }
  }

  if (heroStartIndex === -1 || heroEndIndex === -1) continue;

  metricsEndIndex = heroEndIndex;
  
  // Find where LiveMetricsBar ends (if present)
  let metricsStart = content.indexOf('<LiveMetricsBar', heroEndIndex);
  if (metricsStart !== -1 && metricsStart < heroEndIndex + 500) {
      metricsEndIndex = content.indexOf('/>', metricsStart) + 2;
  }

  // Find 8-item array title structure
  const titleWords = p.title.split(' ');
  const firstHalf = titleWords.slice(0, Math.ceil(titleWords.length/2)).join(' ');
  const secondHalf = titleWords.slice(Math.ceil(titleWords.length/2)).join(' ');

  const titleHTML = `<><span className="block whitespace-nowrap">${firstHalf}</span><span className="block whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">${secondHalf}</span></>`;

  const newHero = `<Heading
        title={${titleHTML}}
        subtitle="${p.subtitle}"
        icon={<Activity className="w-6 h-6 text-emerald-400" />}
        label="Environmental Intelligence"
        gridOverlay
        images={['/images/protected-network.png', '/images/biodiversity.png', '/images/plant.png']}
        actions={
          <>
            <a href="/environmental-monitoring">
              <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-emerald-500" icon={<Search className="w-5 h-5" />}>
                Search
              </Button>
            </a>
            <a href="/environmental-monitoring/dashboards">
              <Button size="lg" variant="outline" className="border-white/20 text-white" icon={<Map className="w-5 h-5" />}>
                Data Dashboards
              </Button>
            </a>
          </>
        }
      />

      {/* Live Metrics Bar */}
      <LiveMetricsBar metrics={[
        { label: 'Active Alerts', value: '38', icon: Activity },
        { label: 'Sewage Outfalls', value: '5', icon: Shield },
        { label: 'Waste Hotspots', value: '8', icon: Eye },
        { label: 'AQI Status', value: 'Mod', icon: Activity },
        { label: 'Water Advisories', value: '2', icon: Shield },
        { label: 'Utility Incidents', value: '14', icon: Eye },
        { label: 'Stations Online', value: '42', icon: Activity },
        { label: 'Districts Monitored', value: '16', icon: MapPin }
      ]} />`;

  content = content.substring(0, heroStartIndex) + newHero + content.substring(metricsEndIndex);
  
  // Fix imports for icons
  if (!content.includes('import { Leaf')) {
     content = content.replace("import {", "import {\n  Leaf,\n  Map,\n  Search,\n  Activity,\n  Bird,\n  Mountain,\n  Fish,\n  Sprout,\n  Flower2,\n  Shield,\n  Eye,\n  BookOpen,\n  FileText,\n  MapPin,");
  } else {
     content = content.replace(/import \{([^}]+)\} from 'lucide-react';/g, (match, group) => {
         let imports = group.split(',').map(s => s.trim());
         let added = ['Leaf', 'Map', 'Search', 'Activity', 'Bird', 'Mountain', 'Fish', 'Sprout', 'Flower2', 'Shield', 'Eye', 'BookOpen', 'FileText', 'MapPin'].filter(i => !imports.includes(i));
         return `import { ${[...imports, ...added].join(', ')} } from 'lucide-react';`;
     });
  }

  // Remove duplicate heading in case of orphans
  content = content.replace(/\]\} \/\>\}[\s\S]*?\/\>/g, "]} />");

  fs.writeFileSync(p.path, content, 'utf8');
  console.log('Upgraded', p.path);
}
