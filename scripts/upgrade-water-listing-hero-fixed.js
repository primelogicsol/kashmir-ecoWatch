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

const file = 'src/components/common/WaterEntityListingPage.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('import { Heading }')) {
  content = content.replace(
    "import React, { useState } from 'react';",
    "import React, { useState } from 'react';\nimport { Heading } from '@/components/common/Heading';\nimport { LiveMetricsBar } from '@/components/common/LiveMetricsBar';"
  );
}

const heroStartIndex = content.indexOf('<div className="relative pt-20');
if (heroStartIndex !== -1) {
  const heroEndIndex = getClosingTag(content, heroStartIndex, 'div');
  
  const newHero = `<Heading
        title={title}
        subtitle={description}
        icon={<Icon className={\`w-6 h-6 \${color.includes('emerald') ? 'text-emerald-400' : 'text-slate-400'}\`} />}
        label={entityType}
        gridOverlay
        images={['/images/water.png', '/images/lake.png', '/images/river.png', '/images/wetland.png']}
      />

      {/* Metrics */}
      <div className="container mx-auto px-6 -mt-8 relative z-20">
        <LiveMetricsBar metrics={[
          { label: \`Total \${entityType}\`, value: entities.length, icon: Icon },
          { label: 'Districts', value: new Set(entities.map(e => e.district)).size, icon: MapPin },
          { label: 'Excellent Quality', value: entities.filter(e => e.waterQuality?.status === 'excellent').length, icon: Activity },
          { label: 'Critical Alert', value: entities.filter(e => e.waterQuality?.status === 'critical').length, icon: AlertTriangle },
          { label: 'Monitored Sites', value: entities.filter(e => e.monitoringStations && e.monitoringStations.length > 0).length, icon: Eye },
          { label: 'Threats', value: entities.filter(e => e.threats && e.threats.length > 0).length, icon: Thermometer },
        ]} />
      </div>`;

  content = content.substring(0, heroStartIndex) + newHero + content.substring(heroEndIndex);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Upgraded WaterEntityListingPage.tsx correctly');
}
