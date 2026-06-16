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

const file = 'src/app/water-systems/dashboards/page.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('import { Heading }')) {
  content = content.replace("import React", "import React from 'react';\nimport { Heading } from '@/components/common/Heading';\nimport { LiveMetricsBar } from '@/components/common/LiveMetricsBar';");
}

const heroStartIndex = content.indexOf('<div className="relative pt-20');
if (heroStartIndex !== -1) {
  const heroEndIndex = getClosingTag(content, heroStartIndex, 'div');
  
  const newHero = `<Heading
        title="Water Dashboards"
        subtitle="Real-time analytics, trends, and heatmaps for hydrological monitoring, water quality tracking, and aquatic ecosystem health across Kashmir"
        icon={<BarChart3 className="w-6 h-6 text-emerald-400" />}
        label="Water Systems Analytics"
        gridOverlay
        images={['/images/water.png', '/images/lake.png', '/images/river.png', '/images/wetland.png']}
      />

      {/* Metrics */}
      <div className="container mx-auto px-6 -mt-8 relative z-20">
        <LiveMetricsBar metrics={[
          { label: 'Dashboards', value: dashboardModules.length, icon: Activity },
          { label: 'Live Data', value: 'Monitoring', icon: Droplet },
          { label: 'Status', value: 'Active', icon: Shield },
          { label: 'Alerts', value: '0', icon: AlertTriangle }
        ]} />
      </div>`;

  content = content.substring(0, heroStartIndex) + newHero + content.substring(heroEndIndex);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Upgraded dashboards page correctly');
}
