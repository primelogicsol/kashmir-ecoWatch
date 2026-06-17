const fs = require('fs');
const file = 'C:/Users/Fayaz/Sufipulseupdate2026/KEW 2026/kashmir-ecoWatch/src/data/hazard-earthquakes.ts';
let content = fs.readFileSync(file, 'utf8');

const latLons = {
  'eq-015': [33.7666, 74.1000],
  'eq-016': [33.3166, 75.7666], 'eq-017': [33.1500, 75.5500], 'eq-018': [33.2500, 75.2500],
  'eq-019': [34.1666, 77.5833], 'eq-020': [34.5500, 76.1333], 'eq-021': [32.5500, 75.1166],
  'eq-022': [32.3666, 75.5166], 'eq-023': [34.3666, 73.4666], 'eq-024': [33.9833, 73.7833],
  'eq-025': [34.5833, 73.9000], 'eq-026': [33.8833, 74.0166], 'eq-027': [35.9166, 74.3000],
  'eq-028': [35.3000, 75.6166], 'eq-029': [36.3166, 74.6500], 'eq-030': [36.3166, 74.8166],
  'eq-031': [35.8500, 73.1000], 'eq-032': [33.8500, 73.7500]
};

for (const [id, [lat, lon]] of Object.entries(latLons)) {
  const regex = new RegExp(`(id:\\s*'${id}'[\\s\\S]*?seismic_gap_status:\\s*'.*?',)(\\r?\\n)`, 'g');
  content = content.replace(regex, `$1$2    latitude: ${lat},$2    longitude: ${lon},$2`);
}

fs.writeFileSync(file, content);
