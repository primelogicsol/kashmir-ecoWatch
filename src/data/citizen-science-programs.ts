/**
 * Authoritative Single Source of Truth for Kashmir EcoWatch Citizen Science Programs
 * Reconciles the participation statistics and program curriculum across the platform.
 */

export interface CitizenScienceProgram {
  id: string;
  title: string;
  icon: string;
  color: string;
  border: string;
  bg: string;
  accent: string;
  description: string;
  activities: string[];
  volunteers: number;
  route: string;
}

export const CITIZEN_SCIENCE_PROGRAMS: CitizenScienceProgram[] = [
  {
    id: 'wildlife-monitoring',
    title: 'Wildlife Monitoring',
    icon: '🦌',
    color: 'from-emerald-500 to-teal-600',
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/10',
    accent: 'text-emerald-400',
    description: "Track and document wildlife populations, distributions, and behavioural patterns across Kashmir's ecosystems.",
    activities: [
      'Species sighting documentation',
      'Population trend tracking',
      'Habitat condition assessment',
      'Migration pattern recording',
    ],
    volunteers: 234,
    route: '/citizen-science/wildlife-monitoring',
  },
  {
    id: 'photo-documentation',
    title: 'Photo Documentation',
    icon: '📷',
    color: 'from-blue-500 to-indigo-600',
    border: 'border-blue-500/30',
    bg: 'bg-blue-500/10',
    accent: 'text-blue-400',
    description: 'Capture seasonal changes, species records, habitat conditions, and environmental change through geotagged photography.',
    activities: [
      'Seasonal landscape photography',
      'Species photo records',
      'Habitat change documentation',
      'Wetland condition photos',
    ],
    volunteers: 189,
    route: '/citizen-science/photo-documentation',
  },
  {
    id: 'data-verification',
    title: 'Data Verification',
    icon: '✅',
    color: 'from-violet-500 to-purple-600',
    border: 'border-violet-500/30',
    bg: 'bg-violet-500/10',
    accent: 'text-violet-400',
    description: 'Review and validate community-submitted observations, species records, and environmental data for accuracy.',
    activities: [
      'Species identification review',
      'Location accuracy verification',
      'Evidence quality assessment',
      'Duplicate flagging',
    ],
    volunteers: 67,
    route: '/citizen-science/data-verification',
  },
  {
    id: 'community-outreach',
    title: 'Community Outreach',
    icon: '🤝',
    color: 'from-amber-500 to-orange-600',
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/10',
    accent: 'text-amber-400',
    description: 'Engage local communities in conservation awareness, environmental monitoring training, and citizen science programs.',
    activities: [
      'Community workshops',
      'School programs',
      'Field training sessions',
      'District participation drives',
    ],
    volunteers: 145,
    route: '/citizen-science/community-outreach',
  },
  {
    id: 'water-monitoring',
    title: 'Water Body Monitoring',
    icon: '💧',
    color: 'from-cyan-500 to-blue-600',
    border: 'border-cyan-500/30',
    bg: 'bg-cyan-500/10',
    accent: 'text-cyan-400',
    description: 'Monitor lakes, rivers, springs, and wetlands for changes in water quality, levels, and ecological health.',
    activities: [
      'Lake level observation',
      'Stream health recording',
      'Water colour & turbidity',
      'Aquatic species sighting',
    ],
    volunteers: 98,
    route: '/water-systems',
  },
  {
    id: 'hazard-reporting',
    title: 'Hazard & Incident Reporting',
    icon: '🔥',
    color: 'from-orange-500 to-red-600',
    border: 'border-orange-500/30',
    bg: 'bg-orange-500/10',
    accent: 'text-orange-400',
    description: 'Report forest fires, floods, landslides, and pollution events in real time to support rapid environmental response.',
    activities: [
      'Forest fire alerts',
      'Flood boundary observation',
      'Landslide early reporting',
      'Pollution event documentation',
    ],
    volunteers: 112,
    route: '/report-issue',
  },
];

export const CITIZEN_SCIENCE_METRICS = {
  totalPrograms: 6,
  activeCitizenScientists: 845,
  districtsCovered: 22,
  observationsSubmitted: 1420,
  verifiedObservations: 1180,
  lastReconciliationDate: 'November 2026',
};
