const fs = require('fs');
let content = fs.readFileSync('./src/components/common/ProtectedCategoryPage.tsx', 'utf8');

const oldPreset = `  national_park: [
    { id: '1', title: 'Dachigam National Park', subtitle: 'Prime Hangul Sanctuary & Upper Forest', location: 'Srinagar · 141 km²', tag: 'National Park', src: '/images/protected-network.png' },
    { id: '2', title: 'Kazinag National Park', subtitle: 'Markhor & Musk Deer Range', location: 'Baramulla · 160 km²', tag: 'Western Caprinae', src: '/images/markhor.png' },
    { id: '3', title: 'Kishtwar High Altitude NP', subtitle: 'Himalayan Glacial & Alpine Matrix', location: 'Kishtwar · 425 km²', tag: 'Glacial PA', src: '/images/bear.png' },
    { id: '4', title: 'Salim Ali (City Forest) NP', subtitle: 'Urban Marsh & Forest Oasis', location: 'Srinagar · 9.07 km²', tag: 'City Sentinel', src: '/images/tiger.png' },
  ],`;

const newPreset = `  national_park: [
    { id: '1', title: 'Dachigam National Park', subtitle: 'Prime Hangul Sanctuary & Upper Forest', location: 'Srinagar · 141 km²', tag: 'National Park', src: '/images/protected-network.png' },
    { id: '2', title: 'Kazinag National Park', subtitle: 'Markhor & Musk Deer Range', location: 'Baramulla · 160 km²', tag: 'Western Caprinae', src: '/images/markhor.png' },
    { id: '3', title: 'Hemis High Altitude NP', subtitle: 'Global Snow Leopard Density Capital', location: 'Leh, Ladakh · 4,400 km²', tag: 'Trans-Himalayan', src: '/images/protected-network.png' },
    { id: '4', title: 'Deosai National Park', subtitle: 'Himalayan Brown Bear Sanctuary', location: 'Skardu / Astore · 3,584 km²', tag: 'Alpine Tundra', src: '/images/bear.png' },
  ],`;

content = content.replace(/national_park:\s*\[[\s\S]*?\],/, newPreset);
fs.writeFileSync('./src/components/common/ProtectedCategoryPage.tsx', content, 'utf8');
console.log('Updated national_park showcase preset!');
