const fs = require('fs');

const pages = [
  'src/app/biodiversity/dashboards/page.tsx',
  'src/app/biodiversity/page.tsx',
  'src/app/biodiversity/threatened-species/page.tsx',
  'src/app/biodiversity/wildlife-sightings/page.tsx',
  'src/app/biodiversity/birding-hotspots/page.tsx',
  'src/app/biodiversity/migration-windows/page.tsx',
  'src/app/biodiversity/pollinator-activity/page.tsx',
  'src/app/biodiversity/phenology-flowering/page.tsx',
  'src/app/biodiversity/habitat-signals/page.tsx',
  'src/app/biodiversity/seasonal-activity/page.tsx',
];

for (const p of pages) {
  if (!fs.existsSync(p)) continue;
  
  let c = fs.readFileSync(p, 'utf8');
  
  c = c.replace(/import \{ LiveMetricsBar \} from '@\/components\/common\/LiveMetricsBar'; from 'react';/g, "import { LiveMetricsBar } from '@/components/common/LiveMetricsBar';");
  c = c.replace(/import \{ LiveMetricsBar \} from '@\/components\/common\/LiveMetricsBar';, \{ useState \} from 'react';/g, "import React, { useState } from 'react';\nimport { LiveMetricsBar } from '@/components/common/LiveMetricsBar';");

  if (p.includes('page.tsx')) {
     c = c.replace("Search, Filter,", "Filter,");
     c = c.replace("Leaf, Map, Activity, Eye, TrendingUp, ArrowRight, Search,\n  Shield, Droplet, Mountain, Flower2, Search", "Leaf, Map, Activity, Eye, TrendingUp, ArrowRight, Search,\n  Shield, Droplet, Mountain, Flower2");
  }

  fs.writeFileSync(p, c, 'utf8');
}
console.log('Fixed syntax errors');
