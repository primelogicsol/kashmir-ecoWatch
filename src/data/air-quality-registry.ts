// ─── Air Quality Registry — 44-Unit Greater Kashmir Ecology ──────────────────
// Coordinates sourced from district headquarters / representative centroids.
// Verification status follows the tiered logic:
//   Official Station Verified  → CPCB/JKPCC stations (Srinagar, Jammu)
//   Public Sensor Verified     → OpenAQ/IQAir public sensors exist
//   Satellite-Modelled         → Open-Meteo coordinate-only data

export type VerificationStatus =
  | 'Official Station Verified'
  | 'Public Sensor Verified'
  | 'Satellite-Modelled'
  | 'API Live'
  | 'Data Deficient';

export interface AirQualityStation {
  id: string;
  name: string;
  scope: string;
  country_or_region: string;
  district: string;
  lat: number;
  lng: number;
  verification_status: VerificationStatus;
  data_source: string;
}

export const airQualityRegistry: AirQualityStation[] = [
  // ─── Kashmir Core (10) ──────────────────────────────────────────────────────
  { id: 'KC-SGR', name: 'Srinagar', scope: 'Kashmir Core', country_or_region: 'India — J&K', district: 'Srinagar', lat: 34.0837, lng: 74.7973, verification_status: 'Official Station Verified', data_source: 'CPCB / JKPCC + Open-Meteo' },
  { id: 'KC-BDG', name: 'Budgam', scope: 'Kashmir Core', country_or_region: 'India — J&K', district: 'Budgam', lat: 33.9349, lng: 74.6400, verification_status: 'Satellite-Modelled', data_source: 'Open-Meteo' },
  { id: 'KC-GDB', name: 'Ganderbal', scope: 'Kashmir Core', country_or_region: 'India — J&K', district: 'Ganderbal', lat: 34.2262, lng: 74.7748, verification_status: 'Satellite-Modelled', data_source: 'Open-Meteo' },
  { id: 'KC-BRM', name: 'Baramulla', scope: 'Kashmir Core', country_or_region: 'India — J&K', district: 'Baramulla', lat: 34.1990, lng: 74.3636, verification_status: 'Satellite-Modelled', data_source: 'Open-Meteo' },
  { id: 'KC-BDP', name: 'Bandipora', scope: 'Kashmir Core', country_or_region: 'India — J&K', district: 'Bandipora', lat: 34.4173, lng: 74.6431, verification_status: 'Satellite-Modelled', data_source: 'Open-Meteo' },
  { id: 'KC-KPW', name: 'Kupwara', scope: 'Kashmir Core', country_or_region: 'India — J&K', district: 'Kupwara', lat: 34.5262, lng: 74.2546, verification_status: 'Satellite-Modelled', data_source: 'Open-Meteo' },
  { id: 'KC-ANG', name: 'Anantnag', scope: 'Kashmir Core', country_or_region: 'India — J&K', district: 'Anantnag', lat: 33.7311, lng: 75.1487, verification_status: 'Satellite-Modelled', data_source: 'Open-Meteo' },
  { id: 'KC-KLG', name: 'Kulgam', scope: 'Kashmir Core', country_or_region: 'India — J&K', district: 'Kulgam', lat: 33.6446, lng: 75.0197, verification_status: 'Satellite-Modelled', data_source: 'Open-Meteo' },
  { id: 'KC-PLW', name: 'Pulwama', scope: 'Kashmir Core', country_or_region: 'India — J&K', district: 'Pulwama', lat: 33.8716, lng: 74.8946, verification_status: 'Satellite-Modelled', data_source: 'Open-Meteo' },
  { id: 'KC-SHP', name: 'Shopian', scope: 'Kashmir Core', country_or_region: 'India — J&K', district: 'Shopian', lat: 33.7172, lng: 74.8343, verification_status: 'Satellite-Modelled', data_source: 'Open-Meteo' },

  // ─── Trans-Divisional (12) ──────────────────────────────────────────────────
  { id: 'TD-JMU', name: 'Jammu', scope: 'Trans-Divisional', country_or_region: 'India — Jammu', district: 'Jammu', lat: 32.7266, lng: 74.8570, verification_status: 'Official Station Verified', data_source: 'CPCB / JKPCC + Open-Meteo' },
  { id: 'TD-SMB', name: 'Samba', scope: 'Trans-Divisional', country_or_region: 'India — Jammu', district: 'Samba', lat: 32.5624, lng: 75.1199, verification_status: 'Satellite-Modelled', data_source: 'Open-Meteo' },
  { id: 'TD-KTH', name: 'Kathua', scope: 'Trans-Divisional', country_or_region: 'India — Jammu', district: 'Kathua', lat: 32.3866, lng: 75.5173, verification_status: 'Satellite-Modelled', data_source: 'Open-Meteo' },
  { id: 'TD-UDH', name: 'Udhampur', scope: 'Trans-Divisional', country_or_region: 'India — Jammu', district: 'Udhampur', lat: 32.9150, lng: 75.1416, verification_status: 'Satellite-Modelled', data_source: 'Open-Meteo' },
  { id: 'TD-RSI', name: 'Reasi', scope: 'Trans-Divisional', country_or_region: 'India — Jammu', district: 'Reasi', lat: 33.0804, lng: 74.8361, verification_status: 'Satellite-Modelled', data_source: 'Open-Meteo' },
  { id: 'TD-RJR', name: 'Rajouri', scope: 'Trans-Divisional', country_or_region: 'India — Jammu', district: 'Rajouri', lat: 33.3773, lng: 74.3152, verification_status: 'Satellite-Modelled', data_source: 'Open-Meteo' },
  { id: 'TD-PNC', name: 'Poonch', scope: 'Trans-Divisional', country_or_region: 'India — Jammu', district: 'Poonch', lat: 33.7670, lng: 74.0921, verification_status: 'Satellite-Modelled', data_source: 'Open-Meteo' },
  { id: 'TD-DOD', name: 'Doda', scope: 'Trans-Divisional', country_or_region: 'India — Jammu', district: 'Doda', lat: 33.1457, lng: 75.5480, verification_status: 'Satellite-Modelled', data_source: 'Open-Meteo' },
  { id: 'TD-KSH', name: 'Kishtwar', scope: 'Trans-Divisional', country_or_region: 'India — Jammu', district: 'Kishtwar', lat: 33.3136, lng: 75.7673, verification_status: 'Satellite-Modelled', data_source: 'Open-Meteo' },
  { id: 'TD-RMB', name: 'Ramban', scope: 'Trans-Divisional', country_or_region: 'India — Jammu', district: 'Ramban', lat: 33.2428, lng: 75.2357, verification_status: 'Satellite-Modelled', data_source: 'Open-Meteo' },
  { id: 'TD-LEH', name: 'Leh', scope: 'Trans-Divisional', country_or_region: 'India — Ladakh', district: 'Leh', lat: 34.1526, lng: 77.5771, verification_status: 'Satellite-Modelled', data_source: 'Open-Meteo' },
  { id: 'TD-KRG', name: 'Kargil', scope: 'Trans-Divisional', country_or_region: 'India — Ladakh', district: 'Kargil', lat: 34.5539, lng: 76.1349, verification_status: 'Satellite-Modelled', data_source: 'Open-Meteo' },

  // ─── Transboundary / Extended (22) ──────────────────────────────────────────
  { id: 'TB-MZF', name: 'Muzaffarabad', scope: 'Transboundary / Extended', country_or_region: 'AJK', district: 'Muzaffarabad', lat: 34.3700, lng: 73.4711, verification_status: 'Public Sensor Verified', data_source: 'OpenAQ + Open-Meteo' },
  { id: 'TB-NLM', name: 'Neelum', scope: 'Transboundary / Extended', country_or_region: 'AJK', district: 'Neelum', lat: 34.5880, lng: 73.9070, verification_status: 'Satellite-Modelled', data_source: 'Open-Meteo' },
  { id: 'TB-JHV', name: 'Jhelum Valley', scope: 'Transboundary / Extended', country_or_region: 'AJK', district: 'Jhelum Valley', lat: 34.1830, lng: 73.7500, verification_status: 'Satellite-Modelled', data_source: 'Open-Meteo' },
  { id: 'TB-BGH', name: 'Bagh', scope: 'Transboundary / Extended', country_or_region: 'AJK', district: 'Bagh', lat: 33.9811, lng: 73.7761, verification_status: 'Satellite-Modelled', data_source: 'Open-Meteo' },
  { id: 'TB-HVL', name: 'Haveli', scope: 'Transboundary / Extended', country_or_region: 'AJK', district: 'Haveli', lat: 33.9500, lng: 73.9000, verification_status: 'Satellite-Modelled', data_source: 'Open-Meteo' },
  { id: 'TB-PNA', name: 'Poonch AJK', scope: 'Transboundary / Extended', country_or_region: 'AJK', district: 'Poonch AJK', lat: 33.8578, lng: 73.7604, verification_status: 'Satellite-Modelled', data_source: 'Open-Meteo' },
  { id: 'TB-SDN', name: 'Sudhnoti', scope: 'Transboundary / Extended', country_or_region: 'AJK', district: 'Sudhnoti', lat: 33.7200, lng: 73.6500, verification_status: 'Satellite-Modelled', data_source: 'Open-Meteo' },
  { id: 'TB-KTL', name: 'Kotli', scope: 'Transboundary / Extended', country_or_region: 'AJK', district: 'Kotli', lat: 33.5156, lng: 73.9019, verification_status: 'Satellite-Modelled', data_source: 'Open-Meteo' },
  { id: 'TB-MRP', name: 'Mirpur', scope: 'Transboundary / Extended', country_or_region: 'AJK', district: 'Mirpur', lat: 33.1482, lng: 73.7519, verification_status: 'Public Sensor Verified', data_source: 'OpenAQ + Open-Meteo' },
  { id: 'TB-BHM', name: 'Bhimber', scope: 'Transboundary / Extended', country_or_region: 'AJK', district: 'Bhimber', lat: 32.9747, lng: 74.0789, verification_status: 'Satellite-Modelled', data_source: 'Open-Meteo' },
  { id: 'TB-GLT', name: 'Gilgit', scope: 'Transboundary / Extended', country_or_region: 'Gilgit-Baltistan', district: 'Gilgit', lat: 35.9208, lng: 74.3144, verification_status: 'Public Sensor Verified', data_source: 'OpenAQ + Open-Meteo' },
  { id: 'TB-SKD', name: 'Skardu', scope: 'Transboundary / Extended', country_or_region: 'Gilgit-Baltistan', district: 'Skardu', lat: 35.2971, lng: 75.6333, verification_status: 'Public Sensor Verified', data_source: 'OpenAQ + Open-Meteo' },
  { id: 'TB-HNZ', name: 'Hunza', scope: 'Transboundary / Extended', country_or_region: 'Gilgit-Baltistan', district: 'Hunza', lat: 36.3167, lng: 74.6500, verification_status: 'Public Sensor Verified', data_source: 'OpenAQ + Open-Meteo' },
  { id: 'TB-NGR', name: 'Nagar', scope: 'Transboundary / Extended', country_or_region: 'Gilgit-Baltistan', district: 'Nagar', lat: 36.2667, lng: 74.7333, verification_status: 'Satellite-Modelled', data_source: 'Open-Meteo' },
  { id: 'TB-GHZ', name: 'Ghizer', scope: 'Transboundary / Extended', country_or_region: 'Gilgit-Baltistan', district: 'Ghizer', lat: 36.1736, lng: 73.7636, verification_status: 'Public Sensor Verified', data_source: 'OpenAQ + Open-Meteo' },
  { id: 'TB-GPY', name: 'Gupis-Yasin', scope: 'Transboundary / Extended', country_or_region: 'Gilgit-Baltistan', district: 'Gupis-Yasin', lat: 36.2000, lng: 73.4000, verification_status: 'Satellite-Modelled', data_source: 'Open-Meteo' },
  { id: 'TB-DMR', name: 'Diamer', scope: 'Transboundary / Extended', country_or_region: 'Gilgit-Baltistan', district: 'Diamer', lat: 35.4206, lng: 74.0969, verification_status: 'Public Sensor Verified', data_source: 'OpenAQ + Open-Meteo' },
  { id: 'TB-AST', name: 'Astore', scope: 'Transboundary / Extended', country_or_region: 'Gilgit-Baltistan', district: 'Astore', lat: 35.3575, lng: 74.8563, verification_status: 'Public Sensor Verified', data_source: 'OpenAQ + Open-Meteo' },
  { id: 'TB-SHG', name: 'Shigar', scope: 'Transboundary / Extended', country_or_region: 'Gilgit-Baltistan', district: 'Shigar', lat: 35.4306, lng: 75.7364, verification_status: 'Satellite-Modelled', data_source: 'Open-Meteo' },
  { id: 'TB-KHR', name: 'Kharmang', scope: 'Transboundary / Extended', country_or_region: 'Gilgit-Baltistan', district: 'Kharmang', lat: 34.9400, lng: 76.2167, verification_status: 'Satellite-Modelled', data_source: 'Open-Meteo' },
  { id: 'TB-RND', name: 'Roundu', scope: 'Transboundary / Extended', country_or_region: 'Gilgit-Baltistan', district: 'Roundu', lat: 35.5400, lng: 75.4500, verification_status: 'Satellite-Modelled', data_source: 'Open-Meteo' },
  { id: 'TB-GHN', name: 'Ghanche', scope: 'Transboundary / Extended', country_or_region: 'Gilgit-Baltistan', district: 'Ghanche', lat: 35.1667, lng: 76.3333, verification_status: 'Satellite-Modelled', data_source: 'Open-Meteo' },
];

// ─── AQI Category helpers ──────────────────────────────────────────────────────

export type AqiCategory = 'Good' | 'Moderate' | 'Unhealthy for Sensitive Groups' | 'Unhealthy' | 'Very Unhealthy' | 'Hazardous';

export function getAqiCategory(aqi: number): AqiCategory {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  return 'Hazardous';
}

export function getAqiVariant(aqi: number): 'success' | 'warning' | 'danger' | 'critical' {
  if (aqi <= 50) return 'success';
  if (aqi <= 100) return 'warning';
  if (aqi <= 200) return 'danger';
  return 'critical';
}

export function getVerificationBadgeVariant(status: VerificationStatus): 'success' | 'info' | 'warning' | 'default' {
  switch (status) {
    case 'Official Station Verified': return 'success';
    case 'Public Sensor Verified': return 'info';
    case 'API Live': return 'success';
    case 'Satellite-Modelled': return 'warning';
    case 'Data Deficient': return 'default';
    default: return 'default';
  }
}

// ─── Live data record (after API enrichment) ────────────────────────────────

export interface AirQualityLiveRecord extends AirQualityStation {
  pm25: number;
  pm10: number;
  no2: number;
  so2: number;
  co: number;
  o3: number;
  aqi_us: number;
  aqi_eu: number;
  aqi: number;          // display AQI (US AQI primary)
  aqiCategory: AqiCategory;
  aqiVariant: 'success' | 'warning' | 'danger' | 'critical';
  dominantPollutant: string;
  trend: 'Stable' | 'Rising' | 'Falling';
  lastUpdated: string;
  apiTimestamp: string;
  isStale: boolean;
}
