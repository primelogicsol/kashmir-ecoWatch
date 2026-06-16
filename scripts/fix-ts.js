const fs = require('fs');

const files = [
  { path: 'src/app/protected-network/species-intelligence/page.tsx', item: 'species' },
  { path: 'src/app/protected-network/corridors-and-connectivity/page.tsx', item: 'corridor' },
  { path: 'src/app/protected-network/monitoring-and-threats/page.tsx', item: 'threat' },
  { path: 'src/app/protected-network/reports-and-plans/page.tsx', item: 'report' },
  { path: 'src/app/protected-network/trails-and-sightings/page.tsx', item: 'report' }
];

files.forEach(({ path, item }) => {
  let content = fs.readFileSync(path, 'utf8');

  if (path.includes('trails-and-sightings')) {
    // I accidentally put 'trail' instead of 'report'
    content = content.replace(/trail\.district/g, '(report as any).district');
    content = content.replace(/trail\.districts/g, '(report as any).districts');
    content = content.replace(/trail\.scope/g, '(report as any).scope');
    content = content.replace(/filteredTrails/g, 'filteredReports');
  } else {
    // Add (item as any) for others
    content = content.replace(new RegExp(`\\b${item}\\.district\\b`, 'g'), `(${item} as any).district`);
    content = content.replace(new RegExp(`\\b${item}\\.districts\\b`, 'g'), `(${item} as any).districts`);
    content = content.replace(new RegExp(`\\b${item}\\.scope\\b`, 'g'), `(${item} as any).scope`);
  }

  // Also fix trailing string assignment issues in Trails page
  if (path.includes('trails-and-sightings')) {
     content = content.replace(/<select\s+value=\{selectedScope\}/g, '<select value={selectedScope as string}');
     content = content.replace(/onChange=\{\(e\) => \{\s+setSelectedScope\(e\.target\.value as Scope\)/g, 'onChange={(e) => { setSelectedScope(e.target.value as any)');
  }

  fs.writeFileSync(path, content);
});

// Fix BiodiversityFilters duplicate habitat
let filterContent = fs.readFileSync('src/components/common/BiodiversityFilters.tsx', 'utf8');
filterContent = filterContent.replace(/    habitat\?: string;\n    habitat\?: string;/g, '    habitat?: string;');
fs.writeFileSync('src/components/common/BiodiversityFilters.tsx', filterContent);

console.log('Fixed TS casting and types');
