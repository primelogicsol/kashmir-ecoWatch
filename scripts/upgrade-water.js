const fs = require('fs');

const pages = [
  { path: 'src/app/water-systems/page.tsx', title: 'Comprehensive Hydrological Intelligence', subtitle: 'Water Systems is a complete hydrological, ecological, aquatic, water-quality, watershed, cryosphere, flood-risk, and restoration intelligence system for all mapped water-related landscapes and processes across Kashmir.' },
  { path: 'src/app/water-systems/dashboards/page.tsx', title: 'Hydrological Data Dashboards', subtitle: 'Analytics, spatial monitoring, and metrics for water systems and aquatic ecology across Kashmir.' },
  { path: 'src/app/water-systems/lakes/page.tsx', title: 'Lake Monitoring Intelligence', subtitle: 'Comprehensive inventory and real-time monitoring of major, minor, urban, rural, and high-altitude lakes.' },
  { path: 'src/app/water-systems/wetlands/page.tsx', title: 'Wetland Ecology Monitoring', subtitle: 'Tracking health, water quality, and biodiversity indicators across all major floodplain and Ramsar wetlands.' },
  { path: 'src/app/water-systems/rivers/page.tsx', title: 'River & Stream Networks', subtitle: 'Flow dynamics, contamination alerts, and ecological mapping for all major rivers and tributaries.' },
  { path: 'src/app/water-systems/springs/page.tsx', title: 'Spring Vulnerability Monitoring', subtitle: 'Tracking perennial, seasonal, and community springs for vulnerability, discharge, and water quality.' },
  { path: 'src/app/water-systems/watersheds/page.tsx', title: 'Watershed & Catchment Intelligence', subtitle: 'Ecological monitoring and risk assessment for major river basins and hydrological units.' },
  { path: 'src/app/water-systems/glaciers/page.tsx', title: 'Cryosphere & Glacier Monitoring', subtitle: 'Tracking retreat, snow-fed hydrological systems, and glacial lake outburst flood risks.' },
  { path: 'src/app/water-systems/drinking-water-sources/page.tsx', title: 'Drinking Water Intelligence', subtitle: 'Monitoring spring and surface supply vulnerability, infrastructure, and contamination risks.' },
  { path: 'src/app/water-systems/water-quality/page.tsx', title: 'Water Quality Analytics', subtitle: 'Real-time parameter tracking, trend analysis, and biological indicator monitoring.' },
  { path: 'src/app/water-systems/algal-bloom-intelligence/page.tsx', title: 'Algal Bloom Intelligence', subtitle: 'Early warning systems for eutrophication, weed density, and aquatic ecosystem bloom risk.' },
  { path: 'src/app/water-systems/fisheries/page.tsx', title: 'Aquatic Life & Fisheries', subtitle: 'Monitoring fish species, breeding habitats, and fishery management across water bodies.' },
  { path: 'src/app/water-systems/restoration/page.tsx', title: 'Restoration & Rejuvenation', subtitle: 'Tracking the progress of conservation interventions and active ecological restoration projects.' },
  { path: 'src/app/water-systems/flood-risk/page.tsx', title: 'Hydrological Risk Intelligence', subtitle: 'Real-time hazard assessment, flood zoning, and water-level monitoring for critical areas.' }
];

function extractNextSectionMarker(c, searchStart) {
  const markers = [
    '<section className="',
    '<div className="grid ',
    '<div className="container',
    '<div className="flex',
    '{/* Content',
    '{/* Filters',
    '{/* Main Content',
    '{/* Submodules'
  ];

  let minIdx = -1;
  for (const m of markers) {
    let i = c.indexOf(m, searchStart);
    if (i !== -1 && (minIdx === -1 || i < minIdx) && i < searchStart + 2000) {
      minIdx = i;
    }
  }
  return minIdx;
}

for (const p of pages) {
  if (!fs.existsSync(p.path)) continue;
  let c = fs.readFileSync(p.path, 'utf8');

  // Fix imports
  if (!c.includes('import { Heading }')) {
    c = c.replace("import React from 'react';", "import React, { useState } from 'react';\nimport { Heading } from '@/components/common/Heading';\nimport { LiveMetricsBar } from '@/components/common/LiveMetricsBar';\nimport { Button } from '@/components/ui/Button';");
  } else {
    if (!c.includes('import { LiveMetricsBar }')) {
      c = c.replace("import { Heading }", "import { Heading } from '@/components/common/Heading';\nimport { LiveMetricsBar } from '@/components/common/LiveMetricsBar';");
    }
    if (!c.includes('import { Button }')) {
      c = c.replace("import { Heading }", "import { Heading } from '@/components/common/Heading';\nimport { Button } from '@/components/ui/Button';");
    }
  }

  // Find start
  let heroStartIndex = c.indexOf('<Heading');
  if (heroStartIndex === -1) {
    heroStartIndex = c.indexOf('<div className="relative pt-20');
  }

  if (heroStartIndex !== -1) {
    let searchStartForNext = c.indexOf('/>', heroStartIndex) + 2;
    
    // Look for LiveMetricsBar
    let metricsStart = c.indexOf('<LiveMetricsBar', searchStartForNext);
    if (metricsStart !== -1 && metricsStart < searchStartForNext + 1000) {
      searchStartForNext = c.indexOf('/>', metricsStart) + 2;
    }

    let nextSectionIdx = extractNextSectionMarker(c, searchStartForNext);
    
    if (nextSectionIdx !== -1) {
      const titleWords = p.title.split(' ');
      const firstHalf = titleWords.slice(0, Math.ceil(titleWords.length/2)).join(' ');
      const secondHalf = titleWords.slice(Math.ceil(titleWords.length/2)).join(' ');

      const titleHTML = `<><span className="block whitespace-nowrap">${firstHalf}</span><span className="block whitespace-nowrap bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">${secondHalf}</span></>`;

      const newHero = `<Heading
        title={${titleHTML}}
        subtitle="${p.subtitle}"
        icon={<Droplet className="w-6 h-6 text-blue-400" />}
        label="Water Systems"
        gridOverlay
        images={['/images/protected-network.png', '/images/biodiversity.png', '/images/plant.png']}
        actions={
          <>
            <a href="/water-systems">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-500" icon={<Search className="w-5 h-5" />}>
                Search
              </Button>
            </a>
            <a href="/water-systems/dashboards">
              <Button size="lg" variant="outline" className="border-white/20 text-white" icon={<Map className="w-5 h-5" />}>
                Data Dashboards
              </Button>
            </a>
          </>
        }
      />

      {/* Live Metrics Bar */}
      <LiveMetricsBar metrics={[
        { label: 'Total Lakes', value: '142', icon: Activity },
        { label: 'Wetland Area', value: '85k', icon: Shield },
        { label: 'River Basins', value: '4', icon: Eye },
        { label: 'Glaciers Tracked', value: '12', icon: Activity },
        { label: 'Springs Mapped', value: '850', icon: Shield },
        { label: 'Monitoring Sites', value: '64', icon: Eye },
        { label: 'Active Alerts', value: '3', icon: Activity },
        { label: 'Districts', value: '16', icon: MapPin }
      ]} />\n\n      `;

      c = c.substring(0, heroStartIndex) + newHero + c.substring(nextSectionIdx);
    }
  }

  // Add Lucide icons to import
  let lucideMatch = c.match(/import \{([^}]+)\} from 'lucide-react';/);
  if (lucideMatch) {
     let existing = lucideMatch[1].split(',').map(s => s.trim());
     let required = ['Droplet', 'Map', 'Search', 'Activity', 'Shield', 'Eye', 'MapPin'];
     let final = [...new Set([...existing, ...required])].filter(Boolean);
     c = c.replace(lucideMatch[0], `import { ${final.join(', ')} } from 'lucide-react';`);
  }

  fs.writeFileSync(p.path, c, 'utf8');
  console.log('Upgraded', p.path);
}
