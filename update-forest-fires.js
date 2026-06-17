const fs = require('fs');
const coords = { 'Budgam': [33.95, 74.65], 'Shopian': [33.72, 74.83], 'Srinagar': [34.08, 74.80], 'Baramulla': [34.20, 74.34], 'Bandipora': [34.42, 74.65], 'Kupwara': [34.52, 74.25], 'Ganderbal': [34.23, 74.78], 'Pulwama': [33.88, 74.89], 'Kulgam': [33.63, 75.01], 'Anantnag': [33.73, 75.14], 'Kishtwar': [33.31, 75.76], 'Doda': [33.14, 75.54], 'Rajouri': [33.38, 74.30], 'Poonch': [33.77, 74.10], 'Udhampur': [32.92, 75.14], 'Kathua': [32.37, 75.51], 'Ramban': [33.24, 75.24], 'Leh': [34.15, 77.57], 'Reasi': [33.08, 74.83], 'Samba': [32.55, 75.11], 'Muzaffarabad': [34.37, 73.47], 'Neelum': [34.58, 73.90], 'Bagh': [33.98, 73.78], 'Haveli': [33.88, 74.10], 'Gilgit': [35.92, 74.30], 'Skardu': [35.29, 75.63], 'Hunza': [36.31, 74.65], 'Ghizer': [36.17, 73.80], 'Diamer': [35.42, 74.09], 'Astore': [35.36, 74.85] };
let content = fs.readFileSync('src/data/hazard-forest-fires.ts', 'utf8');
content = content.replace('  current_status: FireCurrentStatus;\n}', '  current_status: FireCurrentStatus;\n  latitude: number;\n  longitude: number;\n  live_temperature?: number;\n  live_humidity?: number;\n  live_wind_speed?: number;\n  live_soil_moisture?: number;\n  live_risk_level?: string;\n  dominant_trigger?: string;\n  last_updated?: string;\n}');
content = content.replace(/district:\s*'([^']+)',/g, (match, district) => {
  const coord = coords[district] || [34.0, 74.0];
  return `${match}\n    latitude: ${coord[0]},\n    longitude: ${coord[1]},`;
});
fs.writeFileSync('src/data/hazard-forest-fires.ts', content, 'utf8');
console.log('Done!');
