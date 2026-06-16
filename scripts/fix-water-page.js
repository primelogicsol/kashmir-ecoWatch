const fs = require('fs');
let content = fs.readFileSync('src/app/water-systems/page.tsx', 'utf8');
content = content.replace(/<Heading/, "<Heading gridOverlay images={['/images/water.png', '/images/lake.png', '/images/river.png', '/images/wetland.png']}");
fs.writeFileSync('src/app/water-systems/page.tsx', content, 'utf8');
