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

  // We are going to find the OLD <div className="container ... -mt-8 relative z-20">
  // and remove it entirely.
  let oldContainerIndex = c.indexOf('<div className="container mx-auto px-6 -mt-8 relative z-20">');
  if (oldContainerIndex === -1) {
      oldContainerIndex = c.indexOf('<div className="container mx-auto px-6 -mt-10 relative z-20">');
  }

  if (oldContainerIndex !== -1) {
     let afterMetrics = -1;
     
     // Find where the real page content starts after the old container
     const markers = [
       '{/* Submodules Grid */}',
       '{/* Main Content */}',
       '{/* Dashboard Content */}',
       '{/* Submodules */}',
       '{/* Overview Stats */}',
       '{/* Quality Overview */}',
       '{/* Summary Strip */}',
       '{/* NWIA Summary Strip */}',
       '<NwiaClassificationPanel',
       '{/* Quick Stats */}',
       '{/* Filters */}'
     ];

     for (const marker of markers) {
        let idx = c.indexOf(marker, oldContainerIndex);
        if (idx !== -1 && idx < oldContainerIndex + 1500) {
           if (afterMetrics === -1 || idx < afterMetrics) {
              afterMetrics = idx;
           }
        }
     }
     
     // What if we didn't match a marker?
     if (afterMetrics === -1) {
         let oldCardEnd = c.indexOf('</Card>', oldContainerIndex);
         if (oldCardEnd !== -1) {
             let oldMotionEnd = c.indexOf('</motion.div>', oldCardEnd);
             if (oldMotionEnd !== -1) {
                 let oldDivEnd = c.indexOf('</div>', oldMotionEnd);
                 if (oldDivEnd !== -1) {
                     afterMetrics = oldDivEnd + 6;
                 }
             }
         }
     }

     if (afterMetrics !== -1) {
        c = c.substring(0, oldContainerIndex) + c.substring(afterMetrics);
     }
  }

  fs.writeFileSync(p, c, 'utf8');
}

console.log('Removed old container in water systems');
