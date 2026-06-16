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
  { path: 'src/app/field-reports/page.tsx', title: 'Field Intelligence Command Center', subtitle: 'Global registry for all environmental assessments, scientific surveys, and monthly field intelligence bulletins across Kashmir.' },
  { path: 'src/app/field-reports/monthly-bulletins/page.tsx', title: 'Monthly Field Intelligence Bulletins', subtitle: 'Monthly aggregations of field intelligence, habitat shifts, and ecological observations across Kashmir.' },
  { path: 'src/app/field-reports/species-surveys/page.tsx', title: 'Species Survey Intelligence Reports', subtitle: 'Detailed population, distribution, and ecological surveys of key priority species across Kashmir.' },
  { path: 'src/app/field-reports/wetland-assessments/page.tsx', title: 'Wetland Assessment Intelligence Reports', subtitle: 'Hydrological, water quality, and biodiversity assessments of critical wetland ecosystems across Kashmir.' },
  { path: 'src/app/field-reports/risk-assessments/page.tsx', title: 'Environmental Risk Assessment Reports', subtitle: 'Evaluations of environmental hazards, vulnerabilities, and ecosystem stress factors across Kashmir.' },
  { path: 'src/app/field-reports/technical-reports/page.tsx', title: 'Technical Environmental Intelligence Reports', subtitle: 'In-depth scientific and technical documentation on complex environmental challenges and methodologies.' },
  { path: 'src/app/library/page.tsx', title: 'Evidence Intelligence Reference Library', subtitle: 'A structured evidence and reference system linking environmental studies, monitoring records, datasets, district profiles, GIS resources, and reviewed knowledge inputs across Kashmir EcoWatch.' },
];

for (const p of pages) {
  if (!fs.existsSync(p.path)) continue;
  
  let content = fs.readFileSync(p.path, 'utf8');

  // Insert imports if missing
  if (!content.includes('import { Heading }')) {
    content = content.replace("import React", "import React from 'react';\nimport { Heading } from '@/components/common/Heading';\nimport { LiveMetricsBar } from '@/components/common/LiveMetricsBar';");
  } else if (!content.includes('import { LiveMetricsBar }')) {
    content = content.replace("import { Heading }", "import { Heading } from '@/components/common/Heading';\nimport { LiveMetricsBar }");
  }

  // Find start
  let heroStartIndex = -1;
  let heroEndIndex = -1;
  let metricsEndIndex = -1;

  if (p.path.includes('library')) {
    heroStartIndex = content.indexOf('<Heading');
    heroEndIndex = content.indexOf('/>', heroStartIndex) + 2;
    metricsEndIndex = heroEndIndex; // Library has no metrics block to skip
    
    // BUT we must also remove the old `evidence Intelligence Library` <section> below it if it exists
    const sectionIndex = content.indexOf('<section className="relative bg-[#160C27]">');
    if (sectionIndex > heroEndIndex && sectionIndex < heroEndIndex + 200) {
      metricsEndIndex = getClosingTag(content, sectionIndex, 'section');
    }
  } else {
    heroStartIndex = content.indexOf('<section className="relative pt-20');
    if (heroStartIndex === -1) {
       heroStartIndex = content.indexOf('<div className="relative pt-20');
    }
    if (heroStartIndex === -1) {
       heroStartIndex = content.indexOf('<Heading');
       if (heroStartIndex !== -1) heroEndIndex = content.indexOf('/>', heroStartIndex) + 2;
    } else {
       heroEndIndex = getClosingTag(content, heroStartIndex, content.substring(heroStartIndex, heroStartIndex+10).includes('<section') ? 'section' : 'div');
    }
    
    if (heroStartIndex === -1) continue;

    // Find the end of the KPI strip
    const metricsStartIndex = content.indexOf('{/* Live Metrics Bar */}');
    const oldMetricsIndex = content.indexOf('{/* Metrics */}');
    const metricsGridIndex = content.indexOf('grid-cols-2 md:grid-cols-4', heroEndIndex);
    
    metricsEndIndex = heroEndIndex;
    
    if (metricsStartIndex !== -1 && metricsStartIndex < heroEndIndex + 1000) {
       metricsEndIndex = getClosingTag(content, content.indexOf('<div', metricsStartIndex), 'div');
    } else if (oldMetricsIndex !== -1 && oldMetricsIndex < heroEndIndex + 1000) {
       metricsEndIndex = getClosingTag(content, content.indexOf('<div', oldMetricsIndex), 'div');
    } else if (metricsGridIndex !== -1 && metricsGridIndex < heroEndIndex + 1000) {
       const containerIndex = content.lastIndexOf('<div className="container', metricsGridIndex);
       if (containerIndex > heroEndIndex && containerIndex < heroEndIndex + 200) {
         metricsEndIndex = getClosingTag(content, containerIndex, 'div');
       }
    }
  }

  // Generate 4-word title
  const titleWords = p.title.split(' ');
  const titleHTML = `<><span className="block whitespace-nowrap">${titleWords.slice(0, Math.ceil(titleWords.length/2)).join(' ')}</span><span className="block whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">${titleWords.slice(Math.ceil(titleWords.length/2)).join(' ') || 'Reports'}</span></>`;
  
  const isLibrary = p.path.includes('library');

  const newHero = `<Heading
        title={${titleHTML}}
        subtitle="${p.subtitle}"
        icon={<BookOpen className="w-6 h-6 text-emerald-400" />}
        label="${isLibrary ? 'Evidence Intelligence' : 'Field Intelligence'}"
        gridOverlay
        images={['/images/protected-network.png', '/images/biodiversity.png', '/images/plant.png']}
        actions={
          <>
            <a href="${isLibrary ? '/library' : '/field-reports'}">
              <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-emerald-500" icon={<Search className="w-5 h-5" />}>
                Search
              </Button>
            </a>
            <a href="${isLibrary ? '/districts' : '/field-reports'}">
              <Button size="lg" variant="outline" className="border-white/20 text-white" icon={<Map className="w-5 h-5" />}>
                Data Dashboards
              </Button>
            </a>
          </>
        }
      />

      {/* Live Metrics Bar */}
      <LiveMetricsBar metrics={[
        { label: 'Total Reports', value: 345, icon: FileText },
        { label: 'Field Missions', value: 124, icon: MapPin },
        { label: 'Species Logged', value: 450, icon: Eye },
        { label: 'Habitats Monitored', value: 42, icon: Map },
        { label: 'Active Personnel', value: 89, icon: Search },
        { label: 'Districts Covered', value: 16, icon: MapPin },
        { label: 'Verified Evidence', value: 852, icon: Shield },
        { label: 'Recent Updates', value: 12, icon: Activity }
      ]} />`;

  content = content.substring(0, heroStartIndex) + newHero + content.substring(metricsEndIndex);
  
  // Fix imports
  if (!content.includes('import { Leaf')) {
     content = content.replace("import {", "import {\n  Leaf,\n  Map,\n  Search,\n  Activity,\n  Bird,\n  Mountain,\n  Fish,\n  Sprout,\n  Flower2,\n  Shield,\n  Eye,\n  BookOpen,\n  FileText,\n  MapPin,");
  } else {
     content = content.replace(/import \{([^}]+)\} from 'lucide-react';/g, (match, group) => {
         let imports = group.split(',').map(s => s.trim());
         let added = ['Leaf', 'Map', 'Search', 'Activity', 'Bird', 'Mountain', 'Fish', 'Sprout', 'Flower2', 'Shield', 'Eye', 'BookOpen', 'FileText', 'MapPin'].filter(i => !imports.includes(i));
         return `import { ${[...imports, ...added].join(', ')} } from 'lucide-react';`;
     });
  }
  
  // Ensure we don't have dup React imports
  content = content.replace(/import React, \{ useState \} from 'react';\nimport React from 'react';\n/, "import React, { useState } from 'react';\n");

  fs.writeFileSync(p.path, content, 'utf8');
  console.log('Upgraded', p.path);
}
