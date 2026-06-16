const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else if (filePath.endsWith('page.tsx')) {
      results.push(filePath);
    }
  });
  return results;
}

const allPages = [
  ...walk('src/app/biodiversity'),
  ...walk('src/app/environmental-monitoring'),
  ...walk('src/app/field-reports'),
  ...walk('src/app/library'),
  ...walk('src/app/water-systems')
];

for (const p of allPages) {
  let c = fs.readFileSync(p, 'utf8');

  let modified = false;

  // 1. Remove mb-12 from LiveMetricsBar.tsx directly (I will do this in another step)

  // 2. Enforce Emerald gradient on title
  c = c.replace(/from-[a-z]+-\d+ to-[a-z]+-\d+ bg-clip-text/g, "from-emerald-400 to-emerald-300 bg-clip-text");
  
  // 3. Enforce Emerald color on icon
  c = c.replace(/icon=\{<([A-Za-z0-9]+) className="w-6 h-6 text-[a-z]+-\d+"/g, "icon={<$1 className=\"w-6 h-6 text-emerald-400\"");
  
  // 4. Remove badge property from Heading
  c = c.replace(/(\s+)badge=\{<Badge[^>]*>.*?<\/Badge>\}/g, "");
  
  // 5. Enforce Emerald on CTA 1
  c = c.replace(/className="bg-gradient-to-r from-[a-z]+-\d+ to-[a-z]+-\d+"/g, "className=\"bg-gradient-to-r from-emerald-600 to-emerald-500\"");
  
  // 6. Enforce word count limit on subtitle? 
  // User said "content word count" ... they might mean I need to literally truncate the subtitle to exactly 27 words?
  // Let's first apply colors.

  if (c !== fs.readFileSync(p, 'utf8')) {
     fs.writeFileSync(p, c, 'utf8');
     console.log('Strict emerald applied to', p);
  }
}

// Fix LiveMetricsBar.tsx
let lm = fs.readFileSync('src/components/common/LiveMetricsBar.tsx', 'utf8');
lm = lm.replace('className="container mx-auto px-6 -mt-8 relative z-20 mb-12"', 'className="container mx-auto px-6 -mt-8 relative z-20"');
fs.writeFileSync('src/components/common/LiveMetricsBar.tsx', lm, 'utf8');
console.log('Fixed LiveMetricsBar margin');

