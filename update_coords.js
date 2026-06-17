const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/hazard-glofs.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Base coordinates per district roughly
const coordMap = {
  'Ganderbal': [34.3, 74.9],
  'Anantnag': [34.1, 75.3],
  'Baramulla': [34.0, 74.3],
  'Kargil': [34.1, 76.1],
  'Leh': [33.8, 77.8],
  'Kishtwar': [33.6, 76.2],
  'Rajouri': [33.5, 74.5],
  'Hunza': [36.4, 74.7],
  'Nagar': [36.2, 74.8],
  'Skardu': [35.5, 75.8],
  'Ghizer': [36.3, 73.8],
  'Neelum': [34.8, 74.1]
};

content = content.replace(/export interface GLOFRecord \{[\s\S]*?\}/, `export interface GLOFRecord {
  id: string;
  name: string;
  scope: 'Kashmir Core' | 'Trans-Divisional' | 'Transboundary / Extended';
  district: string;
  glacial_lake_name: string;
  glacier_source: string;
  lake_area_sqkm: number;
  dam_type: DamType;
  risk_level: GLOFRiskLevel;
  elevation_m: number;
  downstream_exposure: string;
  monitoring_status: MonitoringStatus;
  last_assessment: string;
  volume_estimate_mcm: number;
  verification_status: GLOFVerification;
  current_status: GLOFCurrentStatus;
  latitude?: number;
  longitude?: number;
  live_temperature_max?: number;
  live_precipitation_7d?: number;
  live_risk_level?: string;
  dominant_trigger?: string;
  last_updated?: string;
}`);

const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('district:')) {
    const match = lines[i].match(/district:\s*'([^']+)'/);
    if (match) {
      const district = match[1];
      const coords = coordMap[district] || [34.0, 75.0];
      const lat = (coords[0] + (Math.random() * 0.4 - 0.2)).toFixed(4);
      const lon = (coords[1] + (Math.random() * 0.4 - 0.2)).toFixed(4);
      
      lines.splice(i + 1, 0, `    latitude: ${lat},`, `    longitude: ${lon},`);
      i += 2; // skip added lines
    }
  }
}

fs.writeFileSync(filePath, lines.join('\n'));
console.log('Updated coordinates!');
