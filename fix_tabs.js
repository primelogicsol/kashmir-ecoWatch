
const fs = require('fs');

// Fix ProtectedCategoryPage.tsx
let pcpFile = 'src/components/common/ProtectedCategoryPage.tsx';
let pcpContent = fs.readFileSync(pcpFile, 'utf8');
pcpContent = pcpContent.replace(/selectedScope/g, 'selectedEcologicalScope');
pcpContent = pcpContent.replace(/setSelectedScope/g, 'setSelectedEcologicalScope');
fs.writeFileSync(pcpFile, pcpContent);

// Fix the 5 consumer pages
const files = [
  'src/app/protected-network/bird-and-habitat-areas/page.tsx',
  'src/app/protected-network/conservation-reserves/page.tsx',
  'src/app/protected-network/national-parks/page.tsx',
  'src/app/protected-network/wetland-reserves/page.tsx',
  'src/app/protected-network/wildlife-sanctuaries/page.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Strip out tabs props explicitly
  content = content.replace(/tabs=\{.*?\}\n?/g, '');
  content = content.replace(/activeTab=\{.*?\}\n?/g, '');
  content = content.replace(/onTabChange=\{.*?\}\n?/g, '');
  
  fs.writeFileSync(file, content);
  console.log('Fixed', file);
}
