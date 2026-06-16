const fs = require('fs');
const glob = require('fast-glob');

async function run() {
  const files = [
    'src/app/water-systems/page.tsx',
    'src/app/water-systems/dashboards/page.tsx',
    'src/app/water-systems/lakes/page.tsx',
    'src/app/water-systems/wetlands/page.tsx',
    'src/app/water-systems/rivers/page.tsx',
    'src/app/water-systems/springs/page.tsx',
    'src/app/water-systems/watersheds/page.tsx',
    'src/app/water-systems/glaciers/page.tsx',
    'src/app/water-systems/drinking-water-sources/page.tsx',
    'src/app/water-systems/water-quality/page.tsx',
    'src/app/water-systems/algal-bloom-intelligence/page.tsx',
    'src/app/water-systems/fisheries/page.tsx',
    'src/app/water-systems/restoration/page.tsx',
    'src/app/water-systems/flood-risk/page.tsx'
  ];

  for (const file of files) {
    if (!fs.existsSync(file)) {
      console.log('Not found:', file);
      continue;
    }

    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    // 1. If it has the old custom hero: <div className="relative pt-20...
    if (content.includes('<div className="relative pt-20')) {
      // Extract title and subtitle
      let titleMatch = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
      let pMatch = content.match(/<p[^>]*text-slate-400[^>]*>([\s\S]*?)<\/p>/);
      
      let title = titleMatch ? titleMatch[1].trim().replace(/\n\s+/g, ' ') : 'Water Systems Overview';
      let subtitle = pMatch ? pMatch[1].trim().replace(/\n\s+/g, ' ') : 'Detailed intelligence and monitoring for water systems.';
      
      // Remove HTML tags from title/subtitle
      title = title.replace(/<[^>]*>?/gm, '');
      subtitle = subtitle.replace(/<[^>]*>?/gm, '');

      // Build the new Heading + LiveMetricsBar
      const newHero = `<Heading
        title="${title}"
        subtitle="${subtitle}"
        icon={<Droplet className="w-6 h-6 text-emerald-400" />}
        label="Water Systems"
        gridOverlay
        images={['/images/water.png', '/images/lake.png', '/images/river.png']}
      />

      {/* Metrics */}
      <div className="container mx-auto px-6 -mt-8 relative z-20">
        <LiveMetricsBar metrics={[
          { label: 'Entities', value: 'Live', icon: Activity },
          { label: 'Quality', value: 'Monitoring', icon: Droplet },
          { label: 'Status', value: 'Active', icon: Shield },
          { label: 'Alerts', value: '0', icon: AlertTriangle }
        ]} />
      </div>`;

      // Find the start and end of the old hero
      const heroStartIndex = content.indexOf('<div className="relative pt-20');
      // The old hero usually ends right before {/* Filters */} or some container
      let heroEndIndex = content.indexOf('{/* Filters */}');
      if (heroEndIndex === -1) heroEndIndex = content.indexOf('<div className="container', heroStartIndex + 100);
      
      if (heroStartIndex !== -1 && heroEndIndex !== -1 && heroEndIndex > heroStartIndex) {
        content = content.substring(0, heroStartIndex) + newHero + '\n\n      ' + content.substring(heroEndIndex);
        modified = true;
      }
    } else if (content.includes('<Heading')) {
      // It already has Heading, let's just make sure it has gridOverlay and images
      if (!content.includes('gridOverlay')) {
        content = content.replace(
          /<Heading([\s\S]*?)\/>/,
          `<Heading$1 gridOverlay images={['/images/water.png', '/images/lake.png', '/images/river.png']} />`
        );
        modified = true;
      }
    }

    // Ensure imports exist
    if (modified) {
      if (!content.includes('import { Heading }')) {
        content = content.replace("import React", "import React from 'react';\nimport { Heading } from '@/components/common/Heading';");
      }
      if (!content.includes('import { LiveMetricsBar }')) {
        content = content.replace("import React", "import React from 'react';\nimport { LiveMetricsBar } from '@/components/common/LiveMetricsBar';");
      }
      // Clean up duplicate imports if any
      content = content.replace(/import React from 'react';[\s\n]*import React/g, "import React");
      
      fs.writeFileSync(file, content, 'utf8');
      console.log('Upgraded Water System Page:', file);
    }
  }
}

run();
