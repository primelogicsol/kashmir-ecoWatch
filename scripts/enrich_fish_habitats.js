const fs = require('fs');

const filePath = 'src/data/species/fish.ts';
const content = fs.readFileSync(filePath, 'utf8');

const eqIdx = content.indexOf('= [');
const start = content.indexOf('[', eqIdx);
const end = content.lastIndexOf(']');
const fish = JSON.parse(content.substring(start, end + 1));

console.log('Original fish count:', fish.length);

fish.forEach(f => {
  const habs = new Set(f.habitats || []);
  const name = (f.commonName || '').toLowerCase();
  const desc = (f.description || '').toLowerCase();

  if (
    name.includes('brown trout') || name.includes('rainbow trout') ||
    name.includes('brook trout') || name.includes('false osman') ||
    name.includes('tibetan snow trout') || name.includes('ladakh lake') ||
    desc.includes('alpine lake') || desc.includes('gangabal') ||
    desc.includes('high-altitude lake') || (f.elevationRange?.max >= 3500 && f.elevationRange?.min <= 2500)
  ) {
    habs.add('Alpine Lakes & High Tarns');
  }

  f.habitats = Array.from(habs);
});

const macroHabs = [
  'Cold Mountain Rivers & Streams',
  'Glacial Torrents & High-Altitude Streams',
  'Valley Lakes (Dal, Wular, Manasbal)',
  'Wetlands, Marshes & Floodplains',
  'Karst Springs & Headwaters',
  'Lowland Rivers & Canals',
  'Alpine Lakes & High Tarns'
];

macroHabs.forEach(h => {
  const match = fish.filter(f => f.habitats.includes(h)).length;
  console.log(`${h}: ${match} species`);
});

const newContent = `${content.substring(0, start)}${JSON.stringify(fish, null, 2)};\n`;
fs.writeFileSync(filePath, newContent);
console.log('Successfully updated fish habitats in src/data/species/fish.ts!');
