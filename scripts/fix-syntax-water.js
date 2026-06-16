const fs = require('fs');

const pages = [
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

for (const p of pages) {
  if (!fs.existsSync(p)) continue;
  let c = fs.readFileSync(p, 'utf8');

  let metricsIndex = c.indexOf(']} />\n\n      ');
  if (metricsIndex !== -1) {
     let afterMetrics = -1;
     
     // Find where the real page content starts after the orphaned tags
     const markers = [
       '{/* Submodules Grid */}',
       '{/* Main Content */}',
       '{/* Dashboard Content */}',
       '{/* Submodules */}',
       '{/* Overview Stats */}',
       '<section className="py-',
       '<div className="py-',
       '<div className="container',
       '<section className="container',
       '<div className="grid grid-cols-1',
       '{/* NWIA Summary Strip */}',
       '<NwiaClassificationPanel',
       '{/* Quick Stats */}',
       '{/* Filters */}'
     ];

     for (const marker of markers) {
        let idx = c.indexOf(marker, metricsIndex + 14); // 14 is length of "]} />\n\n      "
        if (idx !== -1 && idx < metricsIndex + 1500) {
           if (afterMetrics === -1 || idx < afterMetrics) {
              afterMetrics = idx;
           }
        }
     }
     
     if (afterMetrics !== -1) {
        c = c.substring(0, metricsIndex + 5) + "\n\n" + c.substring(afterMetrics);
     }
  }
  
  // also verify "import React from 'react';"
  // Since we replaced it globally we might have lost 'useState' inside some components, let's just make sure "import React, { useState } from 'react';" is there.
  c = c.replace(/import React from 'react';\n/g, "");
  if (!c.includes('import React, { useState } from \'react\';')) {
     if (c.includes('useState')) {
        c = c.replace(/import \{/g, "import React, { useState } from 'react';\nimport {");
     } else {
        c = c.replace(/import \{/g, "import React from 'react';\nimport {");
     }
  }

  // Deduplicate React imports
  const reactMatches = c.match(/import React.*?from 'react';/g);
  if (reactMatches && reactMatches.length > 1) {
     let first = true;
     c = c.replace(/import React.*?from 'react';\n?/g, (match) => {
        if (first) {
           first = false;
           return match;
        }
        return '';
     });
  }

  fs.writeFileSync(p, c, 'utf8');
}

console.log('Fixed orphaned tags in water systems');
