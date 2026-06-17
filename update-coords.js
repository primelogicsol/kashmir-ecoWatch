const fs = require('fs');

const path = './src/data/hazard-floods.ts';
let content = fs.readFileSync(path, 'utf8');

const coords = {
  Srinagar: { lat: 34.0837, lon: 74.7973 },
  Budgam: { lat: 34.015, lon: 74.717 },
  Ganderbal: { lat: 34.215, lon: 74.783 },
  Baramulla: { lat: 34.205, lon: 74.341 },
  Bandipora: { lat: 34.422, lon: 74.653 },
  Kupwara: { lat: 34.526, lon: 74.254 },
  Anantnag: { lat: 33.731, lon: 75.148 },
  Kulgam: { lat: 33.640, lon: 75.016 },
  Pulwama: { lat: 33.871, lon: 74.894 },
  Shopian: { lat: 33.717, lon: 74.833 },
  Jammu: { lat: 32.726, lon: 74.857 },
  Ramban: { lat: 33.242, lon: 75.193 },
  Doda: { lat: 33.146, lon: 75.547 },
  Kishtwar: { lat: 33.310, lon: 75.765 },
  Kathua: { lat: 32.367, lon: 75.516 },
  Samba: { lat: 32.554, lon: 75.111 },
  Udhampur: { lat: 32.926, lon: 75.138 },
  Reasi: { lat: 33.080, lon: 74.832 },
  Rajouri: { lat: 33.376, lon: 74.306 },
  Poonch: { lat: 33.766, lon: 74.095 },
  Leh: { lat: 34.152, lon: 77.577 },
  Kargil: { lat: 34.553, lon: 76.133 },
  Muzaffarabad: { lat: 34.370, lon: 73.471 },
  Neelum: { lat: 34.582, lon: 73.898 },
  Bagh: { lat: 33.980, lon: 73.775 },
  Haveli: { lat: 33.882, lon: 74.103 },
  Gilgit: { lat: 35.918, lon: 74.314 },
  Hunza: { lat: 36.316, lon: 74.650 },
  Skardu: { lat: 35.297, lon: 75.633 }
};

// add latitude and longitude to FloodZoneRecord interface
content = content.replace(
  '  river_system: string;',
  '  river_system: string;\n  latitude: number;\n  longitude: number;'
);

// update each record with coordinates based on district
content = content.replace(/district:\s*'([^']+)',/g, (match, district) => {
  const coord = coords[district];
  if (coord) {
    // We add some random offset to make them slightly different for each zone in the same district
    const latOffset = (Math.random() - 0.5) * 0.1;
    const lonOffset = (Math.random() - 0.5) * 0.1;
    return `${match}\n    latitude: ${(coord.lat + latOffset).toFixed(4)},\n    longitude: ${(coord.lon + lonOffset).toFixed(4)},`;
  }
  return match;
});

fs.writeFileSync(path, content, 'utf8');
console.log('Done!');
