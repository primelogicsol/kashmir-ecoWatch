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

const file = 'src/components/common/BiodiversityCategoryPage.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('import { Heading }')) {
  content = content.replace("import React, { useState } from 'react';", "import React, { useState } from 'react';\nimport { Heading } from '@/components/common/Heading';\nimport { LiveMetricsBar } from '@/components/common/LiveMetricsBar';");
}

const heroStartIndex = content.indexOf('<div className="relative pt-20');
if (heroStartIndex !== -1) {
  // Find the end of the KPI strip
  const metricsStartIndex = content.indexOf('{/* Metrics */}');
  let metricsEndIndex = -1;
  if (metricsStartIndex !== -1) {
    metricsEndIndex = getClosingTag(content, content.indexOf('<div', metricsStartIndex), 'div');
  }

  const newHero = `<Heading
        title={<><span className="block whitespace-nowrap">{title}</span><span className="block whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Intelligence</span></>}
        subtitle={subtitle}
        icon={<Icon className={\`w-6 h-6 \${color.includes('emerald') ? 'text-emerald-400' : 'text-slate-400'}\`} />}
        label="Biodiversity Intelligence"
        gridOverlay
        images={['/images/biodiversity.png', '/images/bird.png', '/images/plant.png']}
        actions={
          <>
            <a href="/biodiversity">
              <Button size="lg" className={\`bg-gradient-to-r \${color}\`} icon={<Search className="w-5 h-5" />}>
                Search
              </Button>
            </a>
            <a href="/biodiversity/dashboards">
              <Button size="lg" variant="outline" className="border-white/20 text-white" icon={<Map className="w-5 h-5" />}>
                Distribution Map
              </Button>
            </a>
          </>
        }
      />

      {/* Metrics */}
      <LiveMetricsBar metrics={metrics} />`;

  content = content.substring(0, heroStartIndex) + newHero + content.substring(metricsEndIndex);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Upgraded BiodiversityCategoryPage.tsx correctly');
}
