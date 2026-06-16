const fs = require('fs');

const pages = [
  'src/app/field-reports/page.tsx',
  'src/app/field-reports/monthly-bulletins/page.tsx',
  'src/app/field-reports/species-surveys/page.tsx',
  'src/app/field-reports/wetland-assessments/page.tsx',
  'src/app/field-reports/risk-assessments/page.tsx',
  'src/app/field-reports/technical-reports/page.tsx',
  'src/app/library/page.tsx'
];

for (const p of pages) {
  if (!fs.existsSync(p)) continue;
  
  let c = fs.readFileSync(p, 'utf8');
  
  // Fix bad import
  c = c.replace(/import \{\n  Leaf,\n  Map,\n  Search,\n  Activity,\n  Bird,\n  Mountain,\n  Fish,\n  Sprout,\n  Flower2,\n  Shield,\n  Eye,\n  BookOpen,\n  FileText,\n  MapPin, /g, "import { ");
  
  if (!c.includes("from 'lucide-react'")) {
     c = c.replace("import { Heading } from '@/components/common/Heading';", "import { Heading } from '@/components/common/Heading';\nimport { Leaf, Map, Search, Activity, Bird, Mountain, Fish, Sprout, Flower2, Shield, Eye, BookOpen, FileText, MapPin } from 'lucide-react';");
  } else {
     c = c.replace(/import \{([^}]+)\} from 'lucide-react';/g, (match, group) => {
         let imports = group.split(',').map(s => s.trim());
         let added = ['Leaf', 'Map', 'Search', 'Activity', 'Bird', 'Mountain', 'Fish', 'Sprout', 'Flower2', 'Shield', 'Eye', 'BookOpen', 'FileText', 'MapPin'].filter(i => !imports.includes(i));
         return `import { ${[...imports, ...added].join(', ')} } from 'lucide-react';`;
     });
  }

  // Remove duplicate React imports
  c = c.replace(/import React, \{ useState \} from 'react';\n/g, "");
  
  // Clean up any remaining bad replacements
  c = c.replace(/import \{\n  Leaf,\n  Map,\n  Search,\n  Activity,\n  Bird,\n  Mountain,\n  Fish,\n  Sprout,\n  Flower2,\n  Shield,\n  Eye,\n  BookOpen,\n  FileText,\n  MapPin/g, "import {");

  fs.writeFileSync(p, c, 'utf8');
}
console.log('Fixed imports in field-reports');
