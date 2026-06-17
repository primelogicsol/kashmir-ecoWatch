const fs = require('fs');
let fileContent = fs.readFileSync('src/data/hazard-landslides.ts', 'utf8');

const coords = {
  'ls-kc-001': [33.65, 75.14],
  'ls-kc-002': [33.56, 75.48],
  'ls-kc-003': [33.71, 74.82],
  'ls-kc-004': [33.63, 74.52],
  'ls-kc-005': [34.27, 75.46],
  'ls-kc-006': [34.28, 74.83],
  'ls-kc-007': [34.05, 74.38],
  'ls-kc-008': [34.09, 74.03],
  'ls-kc-009': [34.39, 73.86],
  'ls-kc-010': [34.40, 74.28],
  'ls-kc-011': [34.63, 74.83],
  'ls-kc-012': [34.58, 74.80],
  'ls-kc-013': [33.58, 75.31],
  'ls-kc-014': [33.64, 74.78],
  'ls-kc-015': [33.95, 74.63],
  'ls-kc-016': [34.01, 74.93],
  'ls-kc-017': [34.16, 74.89],
  'ls-td-001': [33.24, 75.24],
  'ls-td-002': [33.31, 75.76],
  'ls-td-003': [33.14, 75.54],
  'ls-td-004': [33.38, 74.30],
  'ls-td-005': [33.76, 74.09],
  'ls-td-006': [32.92, 75.13],
  'ls-td-007': [33.08, 74.83],
  'ls-td-008': [34.27, 77.60],
  'ls-td-009': [34.55, 76.13],
  'ls-td-010': [32.37, 75.51],
  'ls-tb-001': [34.36, 73.47],
  'ls-tb-002': [34.58, 73.89],
  'ls-tb-003': [33.97, 73.78],
  'ls-tb-004': [36.31, 74.64],
  'ls-tb-005': [35.92, 74.30],
  'ls-tb-006': [35.29, 75.63],
  'ls-tb-007': [33.88, 74.01],
  'ls-tb-008': [35.41, 74.09]
};

for (const [id, [lat, lon]] of Object.entries(coords)) {
  const regex = new RegExp(`id: '${id}',\\s+name:`);
  fileContent = fileContent.replace(regex, `id: '${id}',\n    latitude: ${lat},\n    longitude: ${lon},\n    name:`);
}

// Add types to interface
fileContent = fileContent.replace(
  '  current_status: LandslideStatus;\n}',
  `  current_status: LandslideStatus;\n  latitude: number;\n  longitude: number;\n  live_soil_moisture?: number;\n  live_precipitation_24h?: number;\n  live_precipitation_72h?: number;\n  live_risk_level?: LandslideRiskLevel;\n  dominant_trigger?: string;\n  last_updated?: string;\n}`
);

fs.writeFileSync('src/data/hazard-landslides.ts', fileContent);
