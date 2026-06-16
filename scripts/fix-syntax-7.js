const fs = require('fs');

const subPages = [
  'src/app/field-reports/monthly-bulletins/page.tsx',
  'src/app/field-reports/risk-assessments/page.tsx',
  'src/app/field-reports/species-surveys/page.tsx',
  'src/app/field-reports/technical-reports/page.tsx',
  'src/app/field-reports/wetland-assessments/page.tsx'
];

// Fix the "from 'react';" bug
for (const p of subPages) {
  if (!fs.existsSync(p)) continue;
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace(/import \{ LiveMetricsBar \} from '@\/components\/common\/LiveMetricsBar'; from 'react';/g, "import { LiveMetricsBar } from '@/components/common/LiveMetricsBar';\nimport React, { useState } from 'react';");
  fs.writeFileSync(p, c, 'utf8');
}

// Fix the malformed JSX in library/page.tsx
let libraryPath = 'src/app/library/page.tsx';
if (fs.existsSync(libraryPath)) {
  let c = fs.readFileSync(libraryPath, 'utf8');
  
  // Find the closing tag of the NEW LiveMetricsBar I injected
  let metricsIndex = c.indexOf('<LiveMetricsBar');
  let metricsEndIndex = c.indexOf('/>', metricsIndex) + 2;
  
  // Look at what follows. The OLD <Heading> attributes were left behind.
  let remainderStart = metricsEndIndex;
  
  // The old heading ended with:
  // />
  // 
  //       <section className="relative bg-[#160C27]">
  
  let oldHeadingEnd = c.indexOf('/>', remainderStart);
  if (oldHeadingEnd !== -1) {
     let nextSection = c.indexOf('<section className="relative bg-[#160C27]">', oldHeadingEnd);
     if (nextSection !== -1) {
         // I'll strip out everything from metricsEndIndex to just before nextSection
         c = c.substring(0, metricsEndIndex) + "\n\n" + c.substring(nextSection);
     }
  }
  
  // Check if I still have random `]} />}` around
  c = c.replace(/\]\} \/\>\}[\s\S]*?\/\>/g, "]} />");
  
  // Remove duplicate heading in case
  
  fs.writeFileSync(libraryPath, c, 'utf8');
}

// Fix field-reports/page.tsx
let fieldReportsPath = 'src/app/field-reports/page.tsx';
if (fs.existsSync(fieldReportsPath)) {
  let c = fs.readFileSync(fieldReportsPath, 'utf8');
  
  // Find the closing tag of the NEW LiveMetricsBar I injected
  let metricsIndex = c.indexOf('<LiveMetricsBar');
  let metricsEndIndex = c.indexOf('/>', metricsIndex) + 2;
  
  let remainderStart = metricsEndIndex;
  
  let oldHeadingEnd = c.indexOf('/>', remainderStart);
  if (oldHeadingEnd !== -1) {
     let nextSection = c.indexOf('{/* Summary Strip */}', oldHeadingEnd);
     if (nextSection !== -1) {
         // strip out the orphaned properties
         c = c.substring(0, metricsEndIndex) + "\n\n" + c.substring(nextSection);
     }
  }
  
  c = c.replace(/\]\} \/\>\}[\s\S]*?\/\>/g, "]} />");
  
  fs.writeFileSync(fieldReportsPath, c, 'utf8');
}

console.log('Fixed syntax issues part 2');
