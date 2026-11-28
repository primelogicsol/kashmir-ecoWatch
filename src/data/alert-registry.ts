// Live Alerts & Advisories Baseline Registry
// Seasonal reference advisories used ONLY when external public APIs (/api/alerts/live) are unreachable.
// Expired and out-of-season static heatwave alerts have been purged.

export type AlertSeverity = 'low' | 'moderate' | 'high' | 'critical';
export type AlertStatus = 'active' | 'monitoring' | 'expired' | 'resolved';
export type AlertCategory = 'flood' | 'landslide' | 'avalanche' | 'fire' | 'air-quality' | 'heatwave' | 'earthquake' | 'storm';
export type AlertSource = 'institutional' | 'platform-reviewed' | 'under-monitoring' | 'expert-verified';

export interface AlertUpdate {
  timestamp: string;
  action: string;
  note: string;
}

export interface PublicGuidance {
  summary: string;
  actions: string[];
  travelImpact: string;
  urgency: 'precautionary' | 'urgent' | 'advisory';
}

export interface AlertItem {
  id: string;
  title: string;
  category: AlertCategory;
  severity: AlertSeverity;
  status: AlertStatus;

  // Location & Scope
  district: string;
  affectedArea: string;
  corridor?: string;

  // Timing
  issued: string;
  updated: string;
  expires: string;

  // Source & Verification
  source: AlertSource;
  issuedBy: string;

  // Content
  summary: string;
  cause: string;

  // Public Guidance
  guidance: PublicGuidance;

  // Module & Map Links
  relatedModule: string;
  relatedModulePath: string;
  mapLink?: string;

  // Update History
  updates: AlertUpdate[];

  // Metadata
  tags: string[];
}

const BASELINE_ANCHOR_MS = Date.UTC(2026, 10, 22, 12, 0, 0);
const daysAgo = (days: number) => new Date(BASELINE_ANCHOR_MS - days * 86_400_000).toISOString();
const daysFromNow = (days: number) => new Date(BASELINE_ANCHOR_MS + days * 86_400_000).toISOString();

export const alertRegistry: AlertItem[] = [
  {
    id: 'baseline-air-srinagar',
    title: 'Seasonal Inversion Watch — Srinagar Basin (Offline Reference)',
    category: 'air-quality',
    severity: 'moderate',
    status: 'active',
    district: 'Srinagar',
    affectedArea: 'Srinagar Basin & Peri-Urban Valley Floor',
    issued: daysAgo(1),
    updated: daysAgo(0),
    expires: daysFromNow(30),
    source: 'platform-reviewed',
    issuedBy: 'KEW Seasonal Climatology Reference (External Feed Fallback)',
    summary: 'Autumn–winter radiative cooling frequently forms shallow boundary-layer temperature inversions across the Srinagar basin, elevating morning and evening particulate matter concentrations.',
    cause: 'Climatological valley cold-pool stagnation combined with biomass and vehicular emissions.',
    guidance: {
      summary: 'Sensitive groups should minimize strenuous outdoor exertion during early morning inversion hours.',
      actions: [
        'Avoid open burning of fallen Chinar/orchard leaves and biomass',
        'Ventilate indoor spaces during afternoon mixing hours',
        'Check /environmental-monitoring/air-pollution when external CAMS feed reconnects',
      ],
      travelImpact: 'Morning mist/haze may reduce visibility along floodplain corridors.',
      urgency: 'precautionary',
    },
    relatedModule: 'environmental-monitoring',
    relatedModulePath: '/environmental-monitoring/air-pollution',
    updates: [
      { timestamp: daysAgo(1), action: 'Seasonal Reference Loaded', note: 'Displayed only when live external Open-Meteo CAMS feed is offline.' },
    ],
    tags: ['air-quality', 'srinagar', 'seasonal-baseline', 'inversion'],
  },
  {
    id: 'baseline-landslide-nh44',
    title: 'Slope Susceptibility Reference — Ramban–Banihal NH-44 Corridor',
    category: 'landslide',
    severity: 'moderate',
    status: 'active',
    district: 'Ramban',
    affectedArea: 'NH-44 Nashri–Ramban–Banihal Structural Slope Belt',
    corridor: 'NH-44 Jammu-Srinagar Corridor',
    issued: daysAgo(2),
    updated: daysAgo(0),
    expires: daysFromNow(30),
    source: 'platform-reviewed',
    issuedBy: 'KEW Geotechnical Susceptibility Baseline (Non-Live Fallback)',
    summary: 'Fractured Murree and Subathu formations between Nashri and Banihal remain susceptible to localized rockfall and shooting stones following Western Disturbance precipitation.',
    cause: 'High-relief structural geology and freeze-thaw / rainfall pore-pressure sensitivity.',
    guidance: {
      summary: 'Always verify live NH-44 transit advisories directly with J&K Traffic Police prior to departure.',
      actions: [
        'Check official J&K Traffic Police highway bulletins before travel',
        'Do not halt vehicles beneath active rockfall chutes (Panthyal, Mehar, Cafeteria Morh)',
      ],
      travelImpact: 'Refer to official J&K Traffic Police control room for current road status.',
      urgency: 'advisory',
    },
    relatedModule: 'hazard-intelligence',
    relatedModulePath: '/hazard-intelligence/landslides',
    mapLink: '/atlas?layer=landslide-risk&corridor=nh44',
    updates: [
      { timestamp: daysAgo(2), action: 'Baseline Corridor Profile', note: 'Static susceptibility reference displayed during external NWP feed fallback.' },
    ],
    tags: ['landslide', 'nh44', 'ramban', 'susceptibility-baseline'],
  },
  {
    id: 'baseline-cryosphere-zojila',
    title: 'High-Altitude Winter Pass Reference — Zoji La & Drass Sector',
    category: 'avalanche',
    severity: 'moderate',
    status: 'active',
    district: 'Kargil',
    affectedArea: 'Zoji La Pass (3,528 m), Gumri & Minamarg Sector',
    corridor: 'Srinagar-Kargil-Leh NH-1 Corridor',
    issued: daysAgo(2),
    updated: daysAgo(0),
    expires: daysFromNow(30),
    source: 'platform-reviewed',
    issuedBy: 'KEW High-Altitude Cryosphere Reference (Non-Live Fallback)',
    summary: 'Sub-zero temperatures and early-winter Western Disturbance snow accumulation create road icing and seasonal pass restrictions above 3,200 m ASL.',
    cause: 'Seasonal high-altitude freeze-thaw cycles and orographic snowfall.',
    guidance: {
      summary: 'Verify official BRO (Project Beacon / Vijayak) and DGRE bulletins before high-pass travel.',
      actions: [
        'Confirm official pass open/closure status with BRO and Traffic Police',
        'Carry winter emergency supplies and anti-skid chains when transit is permitted',
      ],
      travelImpact: 'Subject to seasonal BRO and Traffic Police winter operating schedules.',
      urgency: 'advisory',
    },
    relatedModule: 'hazard-intelligence',
    relatedModulePath: '/hazard-intelligence/avalanches',
    mapLink: '/atlas?layer=avalanche-risk&pass=zoji-la',
    updates: [
      { timestamp: daysAgo(2), action: 'Seasonal Pass Reference', note: 'Displayed only when external NWP pass screening feed is unreachable.' },
    ],
    tags: ['avalanche', 'zoji-la', 'kargil', 'seasonal-baseline'],
  },
];

// Computed properties
export const getActiveAlerts = () => alertRegistry.filter(a => a.status === 'active');
export const getMonitoringAlerts = () => alertRegistry.filter(a => a.status === 'monitoring');
export const getExpiredAlerts = () => alertRegistry.filter(a => a.status === 'expired');
export const getResolvedAlerts = () => alertRegistry.filter(a => a.status === 'resolved');

export const getAlertsByCategory = (category: AlertCategory) => alertRegistry.filter(a => a.category === category);
export const getAlertsBySeverity = (severity: AlertSeverity) => alertRegistry.filter(a => a.severity === severity);
export const getAlertsByDistrict = (district: string) => alertRegistry.filter(a => a.district === district);
export const getAlertsBySource = (source: AlertSource) => alertRegistry.filter(a => a.source === source);

export const getAlertById = (id: string) => alertRegistry.find(a => a.id === id);

export const getAlertStats = () => ({
  total: alertRegistry.length,
  active: getActiveAlerts().length,
  monitoring: getMonitoringAlerts().length,
  expired: getExpiredAlerts().length,
  highSeverity: alertRegistry.filter(a => a.severity === 'high' || a.severity === 'critical').length,
  districtsAffected: new Set(alertRegistry.filter(a => a.status === 'active' || a.status === 'monitoring').map(a => a.district)).size,
});

export const categoryLabels: Record<AlertCategory, string> = {
  flood: 'Flood',
  landslide: 'Landslide',
  avalanche: 'Avalanche',
  fire: 'Forest Fire',
  'air-quality': 'Air Quality',
  heatwave: 'Heatwave',
  earthquake: 'Earthquake',
  storm: 'Storm',
};

export const categoryColors: Record<AlertCategory, string> = {
  flood: 'from-blue-500 to-cyan-500',
  landslide: 'from-amber-500 to-orange-500',
  avalanche: 'from-slate-400 to-blue-400',
  fire: 'from-red-500 to-orange-500',
  'air-quality': 'from-purple-500 to-pink-500',
  heatwave: 'from-yellow-500 to-amber-500',
  earthquake: 'from-stone-500 to-stone-600',
  storm: 'from-indigo-500 to-purple-500',
};

export const severityDisplayLabels: Record<AlertSeverity, string> = {
  low: 'Low',
  moderate: 'Moderate',
  high: 'High',
  critical: 'Critical',
};

export const severityColors: Record<AlertSeverity, string> = {
  low: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  moderate: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  critical: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export const statusDisplayLabels: Record<AlertStatus, string> = {
  active: 'Active',
  monitoring: 'Under Monitoring',
  expired: 'Expired',
  resolved: 'Resolved',
};

export const statusColors: Record<AlertStatus, string> = {
  active: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  monitoring: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  expired: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  resolved: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
};

export const sourceDisplayLabels: Record<AlertSource, string> = {
  institutional: 'Official Agency Catalog',
  'platform-reviewed': 'Model / Baseline Screening',
  'under-monitoring': 'Under Monitoring',
  'expert-verified': 'Expert Verified',
};

export const urgencyLabels: Record<PublicGuidance['urgency'], string> = {
  precautionary: 'Precautionary',
  urgent: 'Urgent Action Required',
  advisory: 'Advisory',
};
