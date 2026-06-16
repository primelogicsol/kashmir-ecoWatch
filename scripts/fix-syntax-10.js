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

  let metricsIndex = c.indexOf(']} />');
  if (metricsIndex !== -1) {
     let afterMetrics = -1;
     
     // Find where the real page content starts after the orphaned tags
     const markers = [
       '{/* Metrics */}',
       '{/* Submodules Grid */}',
       '{/* Main Content */}',
       '{/* Quick Stats */}',
       '{/* Dashboard Navigation */}',
       '{/* Search & Filter */}',
       '{/* Heatmap / Main Visual */}',
       '<section className="py-',
       '<div className="py-',
       '<div className="container',
       '<section className="container',
       '<div className="grid grid-cols-1'
     ];

     for (const marker of markers) {
        let idx = c.indexOf(marker, metricsIndex);
        if (idx !== -1 && idx < metricsIndex + 1000) {
           if (afterMetrics === -1 || idx < afterMetrics) {
              afterMetrics = idx;
           }
        }
     }
     
     // Special fallback: if there is a duplicate LiveMetricsBar, just jump past it
     if (afterMetrics !== -1) {
        let oldLiveMetrics = c.indexOf('<LiveMetricsBar', afterMetrics);
        if (oldLiveMetrics !== -1 && oldLiveMetrics < afterMetrics + 100) {
           // Skip past this second old LiveMetricsBar
           let endOfOld = c.indexOf('/>', oldLiveMetrics);
           if (endOfOld !== -1) {
              afterMetrics = endOfOld + 2;
           }
        }
        c = c.substring(0, metricsIndex + 5) + "\n\n" + c.substring(afterMetrics);
     }
  }

  fs.writeFileSync(p, c, 'utf8');
}

console.log('Fixed orphaned tags part 2');
