const fs = require('fs');

const pages = [
  'src/app/biodiversity/dashboards/page.tsx',
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
  
  c = c.replace(/import \{\n  Leaf,\n  Map,\n  Search,\n  Activity,\n  Bird,\n  Mountain,\n  Fish,\n  Sprout,\n  Flower2,\n  Shield,\n  Eye, /g, "import { ");
  
  if (!c.includes("from 'lucide-react'")) {
     c = c.replace("import { Heading } from '@/components/common/Heading';", "import { Heading } from '@/components/common/Heading';\nimport { Leaf, Map, Search, Activity, Bird, Mountain, Fish, Sprout, Flower2, Shield, Eye } from 'lucide-react';");
  } else {
     c = c.replace(/import \{([^}]+)\} from 'lucide-react';/g, (match, group) => {
         let imports = group.split(',').map(s => s.trim());
         let added = ['Leaf', 'Map', 'Search', 'Activity', 'Bird', 'Mountain', 'Fish', 'Sprout', 'Flower2', 'Shield', 'Eye'].filter(i => !imports.includes(i));
         return `import { ${[...imports, ...added].join(', ')} } from 'lucide-react';`;
     });
  }

  // Remove duplicate React imports
  c = c.replace(/import React, \{ useState \} from 'react';\n/g, "");

  fs.writeFileSync(p, c, 'utf8');
}
console.log('Fixed imports in subpages');
