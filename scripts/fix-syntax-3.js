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
  
  // If uses useState but doesn't import it from 'react'
  if (c.includes('useState(') && !c.includes('{ useState }') && !c.includes('{useState}')) {
     c = c.replace("import React from 'react';", "import React, { useState } from 'react';");
     fs.writeFileSync(p, c, 'utf8');
     console.log('Added useState to', p);
  }
}
