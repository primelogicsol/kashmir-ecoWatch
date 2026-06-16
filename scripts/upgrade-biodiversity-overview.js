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

const file = 'src/app/biodiversity/overview/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Ensure Heading and LiveMetricsBar are imported
if (!content.includes('import { Heading }')) {
  content = content.replace("import React from 'react';", "import React from 'react';\nimport { Heading } from '@/components/common/Heading';\nimport { LiveMetricsBar } from '@/components/common/LiveMetricsBar';");
}

const heroStartIndex = content.indexOf('<div className="relative pt-20');
// The old hero has the <div className="relative pt-20...">...</div> and then a {/* Live Metrics Bar */} section.
// We should replace both!
const metricsStartIndex = content.indexOf('{/* Live Metrics Bar */}');
const metricsEndIndex = getClosingTag(content, content.indexOf('<div className="container', metricsStartIndex), 'div');

if (heroStartIndex !== -1 && metricsStartIndex !== -1) {
  const newHero = `<Heading
        title={<><span className="block whitespace-nowrap">Biodiversity</span><span className="block whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Intelligence</span></>}
        subtitle="Kashmir's comprehensive biodiversity database — species records, habitat intelligence, wildlife sightings, migration timing, phenology, and conservation priority tracking."
        icon={<Leaf className="w-6 h-6 text-emerald-400" />}
        label="Biodiversity Intelligence"
        gridOverlay
        images={['/images/biodiversity.png', '/images/bird.png', '/images/plant.png']}
        actions={
          <>
            <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-emerald-500" icon={<Search className="w-5 h-5" />} onClick={() => router.push('/biodiversity')}>
              Search Species
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white" icon={<Map className="w-5 h-5" />} onClick={() => router.push('/biodiversity/dashboards')}>
              Dashboards
            </Button>
          </>
        }
      />

      {/* Live Metrics Bar */}
      <LiveMetricsBar metrics={[
        { label: 'Species Indexed', value: biodiversityMetrics.totalSpecies, icon: Activity },
        { label: 'Birds', value: biodiversityMetrics.birds, icon: Bird },
        { label: 'Mammals', value: biodiversityMetrics.mammals, icon: Mountain },
        { label: 'Fish & Aquatic', value: biodiversityMetrics.fish, icon: Fish },
        { label: 'Plants & Flora', value: biodiversityMetrics.plants, icon: Sprout },
        { label: 'Medicinal Flora', value: biodiversityMetrics.medicinalPlants, icon: Flower2 },
        { label: 'Threatened', value: biodiversityMetrics.threatened, icon: Shield },
        { label: 'Sightings', value: '10K+', icon: Eye }
      ]} />`;

  content = content.substring(0, heroStartIndex) + newHero + content.substring(metricsEndIndex);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Upgraded biodiversity/overview/page.tsx');
}
