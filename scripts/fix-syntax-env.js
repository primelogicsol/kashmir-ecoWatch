const fs = require('fs');

const pages = [
  'src/app/environmental-monitoring/page.tsx',
  'src/app/environmental-monitoring/dashboards/page.tsx',
  'src/app/environmental-monitoring/solid-waste/page.tsx',
  'src/app/environmental-monitoring/bio-waste/page.tsx',
  'src/app/environmental-monitoring/sewage-wastewater/page.tsx',
  'src/app/environmental-monitoring/drinking-water/page.tsx',
  'src/app/environmental-monitoring/critical-infrastructure/page.tsx',
  'src/app/environmental-monitoring/air-pollution/page.tsx',
  'src/app/environmental-monitoring/environmental-health/page.tsx',
  'src/app/environmental-monitoring/utility-incidents/page.tsx'
];

for (const p of pages) {
  if (!fs.existsSync(p)) continue;
  let c = fs.readFileSync(p, 'utf8');

  // Fix the orphaned <Heading> attributes
  let metricsIndex = c.indexOf('</Heading>');
  if (metricsIndex === -1) {
     metricsIndex = c.indexOf(']} />');
     if (metricsIndex !== -1) {
        let afterMetrics = c.indexOf('<section className="py-16">', metricsIndex);
        if (afterMetrics === -1) afterMetrics = c.indexOf('<div className="py-', metricsIndex);
        if (afterMetrics === -1) afterMetrics = c.indexOf('{/* Submodules Grid */}', metricsIndex);
        if (afterMetrics === -1) afterMetrics = c.indexOf('<div className="container', metricsIndex);
        if (afterMetrics === -1) afterMetrics = c.indexOf('<section className="container', metricsIndex);
        
        if (afterMetrics !== -1 && afterMetrics < metricsIndex + 800) {
           c = c.substring(0, metricsIndex + 5) + "\n\n" + c.substring(afterMetrics);
        }
     }
  }

  // Ensure imports are clean
  // Remove my bad import injection
  c = c.replace(/import \{\n  Leaf,\n  Map,\n  Search,\n  Activity,\n  Bird,\n  Mountain,\n  Fish,\n  Sprout,\n  Flower2,\n  Shield,\n  Eye,\n  BookOpen,\n  FileText,\n  MapPin, /g, "import { ");
  
  c = c.replace(/import \{\n  Leaf,\n  Map,\n  Search,\n  Activity,\n  Bird,\n  Mountain,\n  Fish,\n  Sprout,\n  Flower2,\n  Shield,\n  Eye,\n  BookOpen,\n  FileText,\n  MapPin\n\} from 'lucide-react';\n/g, "");

  // Now properly add them all to the EXISTING lucide-react import without duplicates
  let lucideMatch = c.match(/import \{([^}]+)\} from 'lucide-react';/);
  if (lucideMatch) {
     let existing = lucideMatch[1].split(',').map(s => s.trim());
     let required = ['Leaf', 'Map', 'Search', 'Activity', 'Bird', 'Mountain', 'Fish', 'Sprout', 'Flower2', 'Shield', 'Eye', 'BookOpen', 'FileText', 'MapPin'];
     let final = [...new Set([...existing, ...required])].filter(Boolean);
     c = c.replace(lucideMatch[0], `import { ${final.join(', ')} } from 'lucide-react';`);
  } else {
     c = c.replace("import { Heading }", "import { Heading }\nimport { Leaf, Map, Search, Activity, Bird, Mountain, Fish, Sprout, Flower2, Shield, Eye, BookOpen, FileText, MapPin } from 'lucide-react';");
  }

  fs.writeFileSync(p, c, 'utf8');
}

console.log('Cleaned env monitoring pages');
