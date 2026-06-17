const fs = require('fs');
const file = 'C:/Users/Fayaz/Sufipulseupdate2026/KEW 2026/kashmir-ecoWatch/src/data/hazard-earthquakes.ts';
let content = fs.readFileSync(file, 'utf8');

const latLons = {
  'eq-001': [34.0837, 74.7973],
  'eq-002': [34.0150, 74.7100],
  'eq-003': [34.2166, 74.7833],
  'eq-004': [34.2000, 74.3333],
  'eq-005': [34.4166, 74.6500],
  'eq-006': [34.5333, 74.2666],
  'eq-007': [33.7333, 75.1500],
  'eq-008': [33.6500, 75.0166],
  'eq-009': [33.8833, 74.9000],
  'eq-010': [33.7166, 74.8333],
  'eq-011': [32.7333, 74.8666],
  'eq-012': [32.9166, 75.1333],
  'eq-013': [33.0833, 74.8333],
  'eq-014': [33.3833, 74.3000],
  'eq-015': [33.7666, 74.1000],
  'eq-016': [33.3166, 75.7666],
  'eq-017': [33.1500, 75.5500],
  'eq-018': [33.2500, 75.2500],
  'eq-019': [34.1666, 77.5833],
  'eq-020': [34.5500, 76.1333],
  'eq-021': [32.5500, 75.1166],
  'eq-022': [32.3666, 75.5166],
  'eq-023': [34.3666, 73.4666],
  'eq-024': [33.9833, 73.7833],
  'eq-025': [34.5833, 73.9000],
  'eq-026': [33.8833, 74.0166],
  'eq-027': [35.9166, 74.3000],
  'eq-028': [35.3000, 75.6166],
  'eq-029': [36.3166, 74.6500],
  'eq-030': [36.3166, 74.8166],
  'eq-031': [35.8500, 73.1000],
  'eq-032': [33.8500, 73.7500]
};

content = content.replace(/seismic_gap_status: 'Active Gap' \| 'Monitored' \| 'Low Activity';/,
  `seismic_gap_status: 'Active Gap' | 'Monitored' | 'Low Activity';
  latitude: number;
  longitude: number;
  live_recent_quakes_30d?: number;
  live_latest_magnitude?: number;
  live_latest_date?: string;
  live_risk_level?: 'Critical' | 'High' | 'Moderate' | 'Low';
  last_updated?: string;`);

for (const [id, [lat, lon]] of Object.entries(latLons)) {
  const regex = new RegExp(`(id:\\s*'${id}'[\\s\\S]*?seismic_gap_status:\\s*'.*?',)\\n`, 'g');
  content = content.replace(regex, `$1\n    latitude: ${lat},\n    longitude: ${lon},\n`);
}

fs.writeFileSync(file, content);
console.log('Updated file!');
