export type ActivityType = 
  | 'flagship_conference' 
  | 'specialist_webinar' 
  | 'applied_workshop' 
  | 'environmental_observance';

export type ActivityStatus = 
  | 'proposed' 
  | 'under_review' 
  | 'confirmed' 
  | 'registration_open' 
  | 'live' 
  | 'completed' 
  | 'archived' 
  | 'cancelled';

export interface ScientificProgramActivity {
  id: string;
  title: string;
  theme: string;
  year: 2027 | 2028;
  month: number; // 1 - 12
  monthName: string;
  dateDisplay: string;
  exactDate?: string; // YYYY-MM-DD
  daysCount?: number;
  type: ActivityType;
  typeLabel: string;
  primaryModule: string;
  primaryModuleSlug: string;
  relatedSubmodules: string[];
  geographicCoverage: string;
  discipline: string;
  targetParticipants: string[];
  intendedOutput: string;
  timeIST: string;
  status: ActivityStatus;
  hostType: 'kew-organized' | 'joint' | 'institution-hosted';
  virtualHallCode?: string;
  linkedObservance?: string;
  conferenceId?: string;
}

export const SCIENTIFIC_PROGRAM_TARGETS = {
  flagshipConferences: 8,
  specialistWebinars: 48,
  appliedWorkshops: 24,
  environmentalObservances: 24,
  totalActivities: 104,
  years: '2027–2028',
  strategicPhases: {
    2027: 'Establish Scientific Dialogue & Evidence Baselines',
    2028: 'Advance Applied Science, Restoration & Environmental Intervention'
  }
};

export const SCIENTIFIC_PROGRAM_ACTIVITIES: ScientificProgramActivity[] = [
  // ==========================================
  // 8 FLAGSHIP CONFERENCES (4 in 2027, 4 in 2028)
  // ==========================================
  {
    id: 'kew-conf-2027-cryo',
    conferenceId: 'kew-conf-2027-cryo',
    title: 'Western Himalayan Cryosphere & Water Security Summit',
    theme: 'Glaciers, snowpack, GLOFs, remote sensing, hydrology and downstream water security',
    year: 2027,
    month: 5,
    monthName: 'May',
    dateDisplay: 'May 27–29, 2027',
    exactDate: '2027-05-27',
    daysCount: 3,
    type: 'flagship_conference',
    typeLabel: 'Flagship Summit',
    primaryModule: 'Cryosphere',
    primaryModuleSlug: 'cryosphere',
    relatedSubmodules: ['Water Systems', 'Hazard Intelligence', 'Satellite Change Detection'],
    geographicCoverage: 'Kolahoi, Thajiwas, Machoi & Western Himalayan Glaciers',
    discipline: 'Glaciology & Hydroclimatology',
    targetParticipants: ['Remote Sensing Geophysicists', 'Glaciologists', 'Water Engineers', 'Disaster Planners'],
    intendedOutput: 'Cryospheric Mass Balance Baseline & InSAR Terminus Kinematics Synthesis',
    timeIST: '09:30 - 17:30 IST',
    status: 'proposed',
    hostType: 'joint',
    virtualHallCode: 'CRYO-ROOM-A'
  },
  {
    id: 'conf-2027-wetlands',
    conferenceId: 'conf-2027-wetlands',
    title: 'Kashmir Wetlands, Lakes & Ramsar Conservation Symposium',
    theme: 'Wetland degradation, lake water quality, migratory birds, eutrophication, springs and restoration',
    year: 2027,
    month: 7,
    monthName: 'July',
    dateDisplay: 'July 15–16, 2027',
    exactDate: '2027-07-15',
    daysCount: 2,
    type: 'flagship_conference',
    typeLabel: 'Flagship Symposium',
    primaryModule: 'Water Systems',
    primaryModuleSlug: 'water-systems',
    relatedSubmodules: ['Aquatic Ecology', 'Biodiversity', 'Satellite Change Detection'],
    geographicCoverage: 'Wular Lake, Dal Lake, Hokersar & Shallabugh Ramsar Sites',
    discipline: 'Limnology & Wetland Ecology',
    targetParticipants: ['Limnologists', 'Ornithologists', 'Wetland Authorities', 'Restoration Ecologists'],
    intendedOutput: 'Ramsar Basin Limnological Water Quality & Trophic State Index (TSI) Protocol',
    timeIST: '09:30 - 17:00 IST',
    status: 'proposed',
    hostType: 'joint',
    virtualHallCode: 'WETLAND-PLENARY'
  },
  {
    id: 'conf-2027-biodiversity',
    conferenceId: 'conf-2027-biodiversity',
    title: 'Western Himalayan Biodiversity & Protected Landscapes Congress',
    theme: 'Wildlife, forests, pollinators, species protection, ecological corridors and nature-based conservation',
    year: 2027,
    month: 9,
    monthName: 'September',
    dateDisplay: 'September 23–24, 2027',
    exactDate: '2027-09-23',
    daysCount: 2,
    type: 'flagship_conference',
    typeLabel: 'Flagship Congress',
    primaryModule: 'Biodiversity',
    primaryModuleSlug: 'biodiversity',
    relatedSubmodules: ['Protected Areas', 'Forest & Landscape', 'Trails & Sightings'],
    geographicCoverage: 'Dachigam, Overa-Aru, Kishtwar, Gulmarg Corridors',
    discipline: 'Conservation Biology & Wildlife Ecology',
    targetParticipants: ['Wildlife Biologists', 'Botanists', 'Corridor Ecologists', 'Park Wardens'],
    intendedOutput: 'Western Himalayan Red List Threatened Species & Habitat Corridors Inventory',
    timeIST: '09:30 - 17:00 IST',
    status: 'proposed',
    hostType: 'kew-organized',
    virtualHallCode: 'BIODIV-HALL-1'
  },
  {
    id: 'conf-2027-rivers',
    conferenceId: 'conf-2027-rivers',
    title: 'Himalayan Rivers, Land Use & Environmental Impact Conference',
    theme: 'Riverbed mining, urban expansion, infrastructure, environmental change and sectoral EIA',
    year: 2027,
    month: 11,
    monthName: 'November',
    dateDisplay: 'November 18–19, 2027',
    exactDate: '2027-11-18',
    daysCount: 2,
    type: 'flagship_conference',
    typeLabel: 'Flagship Conference',
    primaryModule: 'Earth & Human Impact',
    primaryModuleSlug: 'earth-human-impact',
    relatedSubmodules: ['Mining & Extraction', 'Sectoral EIA', 'Water Systems'],
    geographicCoverage: 'Jhelum River Basin, Rambiara, Doodh Ganga Reach',
    discipline: 'Fluvial Geomorphology & Sectoral EIA',
    targetParticipants: ['Fluvial Geomorphologists', 'Hydrologists', 'EIA Practitioners', 'Statutory Regulators'],
    intendedOutput: 'Mechanized Riverbed Mining Sediment Transport & Riparian Impact Dossier',
    timeIST: '09:30 - 17:00 IST',
    status: 'proposed',
    hostType: 'institution-hosted',
    virtualHallCode: 'RIVER-STAGE-A'
  },
  {
    id: 'conf-2028-climate',
    conferenceId: 'conf-2028-climate',
    title: 'Western Himalayan Climate, Disaster & Resilience Summit',
    theme: 'Atmospheric change, floods, landslides, avalanches, earthquakes, wildfire and regional preparedness',
    year: 2028,
    month: 3,
    monthName: 'March',
    dateDisplay: 'March 16–18, 2028',
    exactDate: '2028-03-16',
    daysCount: 3,
    type: 'flagship_conference',
    typeLabel: 'Flagship Summit',
    primaryModule: 'Hazard Intelligence',
    primaryModuleSlug: 'hazard-intelligence',
    relatedSubmodules: ['Climate & Atmosphere', 'Earth & Human Impact', 'District Intelligence'],
    geographicCoverage: 'Jhelum Floodplains, NH44 Landslide Corridors, Pir Panjal Slopes',
    discipline: 'Mountain Hazard Science & Climate Geophysics',
    targetParticipants: ['Disaster Risk Specialists', 'Seismologists', 'Structural Engineers', 'Meteorologists'],
    intendedOutput: 'Multi-Hazard Risk Atlas & Early Warning Integration Protocol',
    timeIST: '09:30 - 17:30 IST',
    status: 'proposed',
    hostType: 'joint',
    virtualHallCode: 'HAZARD-HALL-A'
  },
  {
    id: 'conf-2028-eia',
    conferenceId: 'conf-2028-eia',
    title: 'Sustainable Himalayan Economies & Sectoral EIA Congress',
    theme: 'Environmental impacts of tourism, horticulture, handicrafts, agriculture and infrastructure',
    year: 2028,
    month: 6,
    monthName: 'June',
    dateDisplay: 'June 15–16, 2028',
    exactDate: '2028-06-15',
    daysCount: 2,
    type: 'flagship_conference',
    typeLabel: 'Flagship Congress',
    primaryModule: 'Sectoral EIA',
    primaryModuleSlug: 'sectoral-eia',
    relatedSubmodules: ['Tourism EIA', 'Horticulture EIA', 'Handicrafts EIA', 'Agriculture EIA'],
    geographicCoverage: 'Gulmarg, Pahalgam, Sonamarg, Sopore Apple Belt, Artisan Clusters',
    discipline: 'Ecological Economics & Sectoral EIA',
    targetParticipants: ['EIA Assessors', 'Tourism Authorities', 'Agronomists', 'Artisan Guilds'],
    intendedOutput: 'Cumulative Sectoral Environmental Impact Assessment Framework',
    timeIST: '09:30 - 17:00 IST',
    status: 'proposed',
    hostType: 'kew-organized',
    virtualHallCode: 'EIA-CONGRESS-A'
  },
  {
    id: 'conf-2028-education',
    conferenceId: 'conf-2028-education',
    title: 'Western Himalayan Environmental Education & Civil Society Congress',
    theme: 'Outdoor Classroom, youth research, NGOs, environmental communication, scientific inclusion and restoration',
    year: 2028,
    month: 9,
    monthName: 'September',
    dateDisplay: 'September 21–22, 2028',
    exactDate: '2028-09-21',
    daysCount: 2,
    type: 'flagship_conference',
    typeLabel: 'Flagship Congress',
    primaryModule: 'Outdoor Classroom',
    primaryModuleSlug: 'outdoor-classroom',
    relatedSubmodules: ['NGO Impact', 'EcoVoices', 'Citizen Science', 'CSR & Grants'],
    geographicCoverage: 'Valley High Schools, Colleges, Community Watersheds, Youth Eco-Clubs',
    discipline: 'Environmental Pedagogy & Civil Society Science',
    targetParticipants: ['Science Educators', 'NGO Directors', 'Youth Researchers', 'CSR Stewardship Leads'],
    intendedOutput: 'Himalayan Youth Environmental Field Research Curriculum & NGO Verification Registry',
    timeIST: '09:30 - 17:00 IST',
    status: 'proposed',
    hostType: 'joint',
    virtualHallCode: 'EDU-HALL-1'
  },
  {
    id: 'conf-2028-synthesis',
    conferenceId: 'conf-2028-synthesis',
    title: 'Western Himalayan Earth Systems, Conservation & Restoration Congress',
    theme: 'Satellite change detection, ecological recovery, spatial intelligence, conservation policy and the two-year scientific synthesis',
    year: 2028,
    month: 11,
    monthName: 'November',
    dateDisplay: 'November 16–18, 2028',
    exactDate: '2028-11-16',
    daysCount: 3,
    type: 'flagship_conference',
    typeLabel: 'Flagship Congress',
    primaryModule: 'Ecological Atlas',
    primaryModuleSlug: 'gis-atlas',
    relatedSubmodules: ['Satellite Change Detection', 'Forest & Landscape', 'Research Library & Open Data'],
    geographicCoverage: 'Pan-Western Himalayan Ecoregion',
    discipline: 'Earth System Science & Restoration Ecology',
    targetParticipants: ['Remote Sensing Scientists', 'Ecology Chairs', 'Policymakers', 'Scientific Directors'],
    intendedOutput: 'Two-Year Western Himalayan State of the Environment Synthesis & 2029–2030 Research Priorities',
    timeIST: '09:30 - 17:30 IST',
    status: 'proposed',
    hostType: 'kew-organized',
    virtualHallCode: 'SYNTHESIS-HALL-A'
  },

  // ==========================================
  // 2027 MONTHLY WEBINARS & WORKSHOPS (36 total)
  // ==========================================
  // January 2027
  {
    id: 'web-2027-01-14',
    title: 'Western Himalayan Environmental Baselines & Open Scientific Data',
    theme: 'Establishing observational baselines, data provenance, and spatial infrastructure across regional catchments',
    year: 2027, month: 1, monthName: 'January', dateDisplay: 'Jan 14, 2027', exactDate: '2027-01-14',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Research Library & Open Data', primaryModuleSlug: 'evidence-library',
    relatedSubmodules: ['Environmental Monitoring', 'Ecological Atlas'],
    geographicCoverage: 'Kashmir Valley & Western Himalaya', discipline: 'Data Science & Baseline Ecology',
    targetParticipants: ['Environmental Data Scientists', 'Academic Librarians', 'GIS Specialists'],
    intendedOutput: 'Open Environmental Data Protocol & Spatial Schema Guide',
    timeIST: '10:30 - 12:00 IST', status: 'proposed', hostType: 'kew-organized'
  },
  {
    id: 'web-2027-01-28',
    title: 'Winter Air Pollution, Temperature Inversions & Snowpack Monitoring',
    theme: 'Atmospheric boundary layer dynamics, PM2.5 winter stagnation, and snow-water equivalent tracking',
    year: 2027, month: 1, monthName: 'January', dateDisplay: 'Jan 28, 2027', exactDate: '2027-01-28',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Climate & Atmosphere', primaryModuleSlug: 'environmental-monitoring',
    relatedSubmodules: ['Environmental Monitoring', 'Cryosphere'],
    geographicCoverage: 'Srinagar Urban Basin & Pir Panjal Slopes', discipline: 'Atmospheric Physics & Air Quality',
    targetParticipants: ['Air Quality Analysts', 'Meteorologists', 'Public Health Researchers'],
    intendedOutput: 'Winter Stagnation Air Quality & Temperature Inversion Technical Brief',
    timeIST: '14:30 - 16:00 IST', status: 'proposed', hostType: 'joint'
  },
  {
    id: 'ws-2027-01-30',
    title: 'GIS Atlas Orientation and Environmental Dataset Validation',
    theme: 'Practical hands-on training on KEW interactive GIS layers, raster overlays, and polygon validation',
    year: 2027, month: 1, monthName: 'January', dateDisplay: 'Jan 30, 2027', exactDate: '2027-01-30',
    type: 'applied_workshop', typeLabel: 'Applied Workshop',
    primaryModule: 'Ecological Atlas', primaryModuleSlug: 'gis-atlas',
    relatedSubmodules: ['Environmental Monitoring', 'Satellite Change Detection'],
    geographicCoverage: 'Valley-wide GIS Layers', discipline: 'Geoinformatics & Spatial Modeling',
    targetParticipants: ['Graduate GIS Students', 'Field Researchers', 'NGO Technical Staff'],
    intendedOutput: 'Certified Dataset Validation Checklist & Spatial Workflow Template',
    timeIST: '11:00 - 13:30 IST', status: 'proposed', hostType: 'kew-organized'
  },

  // February 2027
  {
    id: 'web-2027-02-11',
    title: 'Ramsar Wetlands & Migratory Waterbird Census',
    theme: 'Asian waterfowl census methodologies, Central Asian Flyway stopovers, and habitat degradation',
    year: 2027, month: 2, monthName: 'February', dateDisplay: 'Feb 11, 2027', exactDate: '2027-02-11',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Water Systems', primaryModuleSlug: 'water-systems',
    relatedSubmodules: ['Biodiversity', 'Aquatic Ecology'],
    geographicCoverage: 'Wular, Hokersar, Hygam, Shallabugh', discipline: 'Avian Ecology & Limnology',
    targetParticipants: ['Ornithologists', 'Wetland Wardens', 'Citizen Birders'],
    intendedOutput: 'Migratory Waterbird Census Protocol & Density Registry',
    timeIST: '10:30 - 12:00 IST', status: 'proposed', hostType: 'joint'
  },
  {
    id: 'web-2027-02-25',
    title: 'Lakes, Algal Blooms, Nutrient Pollution & Water Quality',
    theme: 'Point and non-point phosphorus loading, cyanobacterial bloom dynamics, and trophic state index modeling',
    year: 2027, month: 2, monthName: 'February', dateDisplay: 'Feb 25, 2027', exactDate: '2027-02-25',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Aquatic Ecology', primaryModuleSlug: 'water-systems',
    relatedSubmodules: ['Water Systems', 'Environmental Monitoring'],
    geographicCoverage: 'Dal Lake, Anchar, Manasbal', discipline: 'Limnology & Aquatic Biochemistry',
    targetParticipants: ['Water Quality Technicians', 'Limnologists', 'Environmental Engineers'],
    intendedOutput: 'Nutrient Ingress Model & Lake Trophic Index Guidelines',
    timeIST: '14:30 - 16:00 IST', status: 'proposed', hostType: 'joint'
  },
  {
    id: 'ws-2027-02-27',
    title: 'Wetland Delineation Using Sentinel-2 and MNDWI',
    theme: 'Modified Normalized Difference Water Index (MNDWI) spectral calculation and seasonal inundation mapping',
    year: 2027, month: 2, monthName: 'February', dateDisplay: 'Feb 27, 2027', exactDate: '2027-02-27',
    type: 'applied_workshop', typeLabel: 'Applied Workshop',
    primaryModule: 'Satellite Change Detection', primaryModuleSlug: 'earth-human-impact',
    relatedSubmodules: ['Water Systems', 'Ecological Atlas'],
    geographicCoverage: 'Hokersar & Shallabugh Wetlands', discipline: 'Optical Remote Sensing',
    targetParticipants: ['Remote Sensing Analysts', 'Wetland Managers', 'Cartographers'],
    intendedOutput: 'MNDWI Water Inundation Mapping Script & Spatial Raster',
    timeIST: '11:00 - 13:30 IST', status: 'proposed', hostType: 'kew-organized'
  },

  // March 2027
  {
    id: 'web-2027-03-11',
    title: 'Springs, Aquifers & Groundwater Security',
    theme: 'Hydrogeological mapping of karst springs, aquifer vulnerability, and rural drinking-water reliance',
    year: 2027, month: 3, monthName: 'March', dateDisplay: 'Mar 11, 2027', exactDate: '2027-03-11',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Water Systems', primaryModuleSlug: 'water-systems',
    relatedSubmodules: ['Agriculture EIA', 'Environmental Monitoring'],
    geographicCoverage: 'Anantnag Karst Springs & Verinag Catchment', discipline: 'Hydrogeology & Groundwater Science',
    targetParticipants: ['Hydrogeologists', 'Rural Water Engineers', 'Public Works Planners'],
    intendedOutput: 'Karst Springshed Vulnerability Matrix & Recharge Map',
    timeIST: '10:30 - 12:00 IST', status: 'proposed', hostType: 'joint'
  },
  {
    id: 'web-2027-03-25',
    title: 'Jhelum River Basin Hydrology and Catchment Stress',
    theme: 'Peak discharge modeling, embankments, flood spill channel dynamics, and sub-basin tributaries',
    year: 2027, month: 3, monthName: 'March', dateDisplay: 'Mar 25, 2027', exactDate: '2027-03-25',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Water Systems', primaryModuleSlug: 'water-systems',
    relatedSubmodules: ['Hazard Intelligence', 'Earth & Human Impact'],
    geographicCoverage: 'Jhelum Main Stem: Sangam to Baramulla', discipline: 'Fluvial Hydrology & River Engineering',
    targetParticipants: ['Irrigation & Flood Control Engineers', 'Hydrologists', 'Disaster Planners'],
    intendedOutput: 'Jhelum Hydrological Discharge & Capacity Model Brief',
    timeIST: '14:30 - 16:00 IST', status: 'proposed', hostType: 'kew-organized'
  },
  {
    id: 'ws-2027-03-27',
    title: 'Springshed Mapping and Water Sampling Protocols',
    theme: 'Field chemical parameter logging (pH, EC, DO, Turbidity, Coliforms) and GPS springshed boundary surveying',
    year: 2027, month: 3, monthName: 'March', dateDisplay: 'Mar 27, 2027', exactDate: '2027-03-27',
    type: 'applied_workshop', typeLabel: 'Applied Workshop',
    primaryModule: 'Field Intelligence', primaryModuleSlug: 'environmental-monitoring',
    relatedSubmodules: ['Water Systems', 'Environmental Monitoring'],
    geographicCoverage: 'South Kashmir Spring Belts', discipline: 'Field Limnology & Water Quality',
    targetParticipants: ['Field Technicians', 'Citizen Water Monitors', 'Student Chemists'],
    intendedOutput: 'Standardized Karst Spring Sampling Protocol & Chain-of-Custody Sheet',
    timeIST: '11:00 - 13:30 IST', status: 'proposed', hostType: 'kew-organized'
  },

  // April 2027
  {
    id: 'web-2027-04-08',
    title: 'Forest Ecology, Habitat Fragmentation & Ecological Corridors',
    theme: 'Subalpine fir and birch dynamics, road infrastructure fragmentation, and treeline shifts',
    year: 2027, month: 4, monthName: 'April', dateDisplay: 'Apr 8, 2027', exactDate: '2027-04-08',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Forest & Landscape', primaryModuleSlug: 'protected-areas',
    relatedSubmodules: ['Protected Areas', 'Biodiversity'],
    geographicCoverage: 'Pir Panjal & Great Himalayan Ranges', discipline: 'Silviculture & Landscape Ecology',
    targetParticipants: ['Forest Officers', 'Landscape Ecologists', 'Conservationists'],
    intendedOutput: 'Forest Canopy Fragmentation Metrics & Corridor Map',
    timeIST: '10:30 - 12:00 IST', status: 'proposed', hostType: 'joint'
  },
  {
    id: 'web-2027-04-22',
    title: 'Solid Waste, Wastewater and Urban Environmental Health',
    theme: 'Municipal solid waste landfills, leachate migration, sewage treatment gaps, and urban water health',
    year: 2027, month: 4, monthName: 'April', dateDisplay: 'Apr 22, 2027', exactDate: '2027-04-22',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Urban Ecology', primaryModuleSlug: 'environmental-monitoring',
    relatedSubmodules: ['Environmental Monitoring', 'Water Systems'],
    geographicCoverage: 'Achan Landfill & Greater Srinagar Catchment', discipline: 'Environmental Engineering & Urban Health',
    targetParticipants: ['Municipal Sanitation Engineers', 'Waste Auditors', 'Urban Planners'],
    intendedOutput: 'Urban Waste Stream Audit & Leachate Risk Matrix',
    timeIST: '14:30 - 16:00 IST', status: 'proposed', hostType: 'joint'
  },
  {
    id: 'ws-2027-04-24',
    title: 'Forest Change Detection and Waste Audit Methods',
    theme: 'NDVI differential loss calculation with Sentinel-2 and school/institutional waste characterization audits',
    year: 2027, month: 4, monthName: 'April', dateDisplay: 'Apr 24, 2027', exactDate: '2027-04-24',
    type: 'applied_workshop', typeLabel: 'Applied Workshop',
    primaryModule: 'Satellite Change Detection', primaryModuleSlug: 'earth-human-impact',
    relatedSubmodules: ['Forest & Landscape', 'Urban Ecology'],
    geographicCoverage: 'Central & North Kashmir Forest Divs', discipline: 'Remote Sensing & Solid Waste Auditing',
    targetParticipants: ['Forest Surveyors', 'School Eco-Club Coordinators', 'Field Researchers'],
    intendedOutput: 'Canopy Loss Detection Workflow & Institutional Waste Characterization Guide',
    timeIST: '11:00 - 13:30 IST', status: 'proposed', hostType: 'kew-organized'
  },

  // May 2027
  {
    id: 'web-2027-05-13',
    title: 'Glacier Recession, Geodetic Mass Balance & Remote Sensing',
    theme: 'Digital Elevation Model differencing, satellite altimetry, and glacier tongue retreat in Kolahoi',
    year: 2027, month: 5, monthName: 'May', dateDisplay: 'May 13, 2027', exactDate: '2027-05-13',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Cryosphere', primaryModuleSlug: 'cryosphere',
    relatedSubmodules: ['Satellite Change Detection', 'Water Systems'],
    geographicCoverage: 'Kolahoi Glacier Basin', discipline: 'Geodetic Glaciology',
    targetParticipants: ['Glaciologists', 'Geophysicists', 'Hydrologists'],
    intendedOutput: 'Kolahoi Mass Balance Differencing Baseline Report',
    timeIST: '10:30 - 12:00 IST', status: 'proposed', hostType: 'kew-organized'
  },
  {
    id: 'web-2027-05-20',
    title: 'GLOF Susceptibility and High-Altitude Lake Monitoring',
    theme: 'Moraine dam stability, expansion rates of proglacial lakes, and outburst flood simulation',
    year: 2027, month: 5, monthName: 'May', dateDisplay: 'May 20, 2027', exactDate: '2027-05-20',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Hazard Intelligence', primaryModuleSlug: 'hazard-intelligence',
    relatedSubmodules: ['Cryosphere', 'Satellite Change Detection'],
    geographicCoverage: 'High-Altitude Lakes of Pir Panjal & Great Himalaya', discipline: 'Mountain Hazard Science',
    targetParticipants: ['Disaster Mitigation Authorities', 'Civil Engineers', 'Geologists'],
    intendedOutput: 'GLOF Hazard Susceptibility Index & Inventory',
    timeIST: '14:30 - 16:00 IST', status: 'proposed', hostType: 'joint'
  },
  {
    id: 'ws-2027-05-22',
    title: 'Glacier and Glacial Lake Satellite Mapping',
    theme: 'Delineating debris-covered ice using thermal infrared band ratios and automated glacial lake boundary vectors',
    year: 2027, month: 5, monthName: 'May', dateDisplay: 'May 22, 2027', exactDate: '2027-05-22',
    type: 'applied_workshop', typeLabel: 'Applied Workshop',
    primaryModule: 'Satellite Change Detection', primaryModuleSlug: 'cryosphere',
    relatedSubmodules: ['Cryosphere', 'Ecological Atlas'],
    geographicCoverage: 'Lidder & Sindh Glacier Basins', discipline: 'Cryospheric Remote Sensing',
    targetParticipants: ['GIS Researchers', 'Glaciology Postgrads', 'Remote Sensing Analysts'],
    intendedOutput: 'Glacial Lake Delineation GIS Tutorial & Vector Dataset',
    timeIST: '11:00 - 13:30 IST', status: 'proposed', hostType: 'kew-organized'
  },

  // June 2027
  {
    id: 'web-2027-06-10',
    title: 'Alpine Plants, Wildflowers & Seasonal Phenology',
    theme: 'High-altitude floral phenology, endemic alpine meadows, grazing pressure, and climate-induced flowering shifts',
    year: 2027, month: 6, monthName: 'June', dateDisplay: 'Jun 10, 2027', exactDate: '2027-06-10',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Seasonal Phenology', primaryModuleSlug: 'biodiversity',
    relatedSubmodules: ['Biodiversity', 'Protected Areas'],
    geographicCoverage: 'Apharwat, Toshamaidan, Sonamarg Meadows', discipline: 'Alpine Botany & Phenology',
    targetParticipants: ['Botanists', 'Alpine Guides', 'Plant Taxonomists'],
    intendedOutput: 'Alpine Phenological Calendar & Species Rarity Index',
    timeIST: '10:30 - 12:00 IST', status: 'proposed', hostType: 'joint'
  },
  {
    id: 'web-2027-06-24',
    title: 'Environmental Monitoring Networks, Sensors & Data Quality',
    theme: 'Calibrating low-cost PM sensors, multi-parameter water sondes, and telemetry transmission protocols',
    year: 2027, month: 6, monthName: 'June', dateDisplay: 'Jun 24, 2027', exactDate: '2027-06-24',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Environmental Monitoring', primaryModuleSlug: 'environmental-monitoring',
    relatedSubmodules: ['Field Intelligence', 'Research Library & Open Data'],
    geographicCoverage: 'Regional Sensor Network Nodes', discipline: 'Environmental Instrumentation & IoT',
    targetParticipants: ['Sensor Hardware Technicians', 'Data Engineers', 'Pollution Control Scientists'],
    intendedOutput: 'Sensor Calibration Standard Operating Procedure & QA/QC Matrix',
    timeIST: '14:30 - 16:00 IST', status: 'proposed', hostType: 'kew-organized'
  },
  {
    id: 'ws-2027-06-26',
    title: 'Phenological Field Protocols and Sensor Calibration',
    theme: 'Standardizing plant phenophase observations (BBCH scale) and in-situ multi-sensor drift recalibration',
    year: 2027, month: 6, monthName: 'June', dateDisplay: 'Jun 26, 2027', exactDate: '2027-06-26',
    type: 'applied_workshop', typeLabel: 'Applied Workshop',
    primaryModule: 'Field Intelligence', primaryModuleSlug: 'environmental-monitoring',
    relatedSubmodules: ['Seasonal Phenology', 'Environmental Monitoring'],
    geographicCoverage: 'Dachigam Botanical Arboretum', discipline: 'Field Phenology & Instrumentation',
    targetParticipants: ['Citizen Science Observers', 'Botanists', 'Field Biologists'],
    intendedOutput: 'Kashmir Montane Phenology Field Recording Sheet',
    timeIST: '11:00 - 13:30 IST', status: 'proposed', hostType: 'kew-organized'
  },

  // July 2027
  {
    id: 'web-2027-07-08',
    title: 'Wetland Restoration, Environmental Flows & Hydrological Connectivity',
    theme: 'Restoring historic silt-clogged wetland channels, hydraulic gate management, and hydrological rejuvenation',
    year: 2027, month: 7, monthName: 'July', dateDisplay: 'Jul 8, 2027', exactDate: '2027-07-08',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Water Systems', primaryModuleSlug: 'water-systems',
    relatedSubmodules: ['Aquatic Ecology', 'Earth & Human Impact'],
    geographicCoverage: 'Hokersar - Doodh Ganga Flood Basin', discipline: 'Eco-Hydrology & Wetland Restoration',
    targetParticipants: ['Wetland Hydrologists', 'Restoration Ecologists', 'Water Engineers'],
    intendedOutput: 'Wetland Environmental Flow Requirement Assessment Guide',
    timeIST: '10:30 - 12:00 IST', status: 'proposed', hostType: 'joint'
  },
  {
    id: 'web-2027-07-22',
    title: 'Aquatic Biodiversity, Fisheries & Pollinator Ecology',
    theme: 'Indigenous snow trout (Schizothorax) declines, exotic carp pressures, and riparian insect pollinator health',
    year: 2027, month: 7, monthName: 'July', dateDisplay: 'Jul 22, 2027', exactDate: '2027-07-22',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Biodiversity', primaryModuleSlug: 'biodiversity',
    relatedSubmodules: ['Aquatic Ecology', 'Water Systems'],
    geographicCoverage: 'Sindh, Lidder, and Wular Aquatic Habitats', discipline: 'Ichthyology & Pollinator Biology',
    targetParticipants: ['Fisheries Scientists', 'Entomologists', 'Aquatic Biologists'],
    intendedOutput: 'Endemic Coldwater Fish Status & Habitat Conservation Dossier',
    timeIST: '14:30 - 16:00 IST', status: 'proposed', hostType: 'joint'
  },
  {
    id: 'ws-2027-07-24',
    title: 'Limnological Water Sampling and Field Reporting',
    theme: 'Secchi disc transparency, vertical temperature profiling, dissolved oxygen titration, and benthic sampling',
    year: 2027, month: 7, monthName: 'July', dateDisplay: 'Jul 24, 2027', exactDate: '2027-07-24',
    type: 'applied_workshop', typeLabel: 'Applied Workshop',
    primaryModule: 'Aquatic Ecology', primaryModuleSlug: 'water-systems',
    relatedSubmodules: ['Water Systems', 'Field Intelligence'],
    geographicCoverage: 'Dal Lake & Nigeen Lake Field Stations', discipline: 'Practical Limnology',
    targetParticipants: ['University Limnology Scholars', 'NGO Monitoring Teams'],
    intendedOutput: 'Certified Limnological Field Sampling Protocol & Quality Report',
    timeIST: '11:00 - 13:30 IST', status: 'proposed', hostType: 'kew-organized'
  },

  // August 2027
  {
    id: 'web-2027-08-12',
    title: 'Protected Areas and Wildlife Corridor Connectivity',
    theme: 'Evaluating buffer zone encroachments, human-wildlife interfaces, and protected area boundary integrity',
    year: 2027, month: 8, monthName: 'August', dateDisplay: 'Aug 12, 2027', exactDate: '2027-08-12',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Protected Areas', primaryModuleSlug: 'protected-areas',
    relatedSubmodules: ['Biodiversity', 'Forest & Landscape'],
    geographicCoverage: 'Kazinag, Dachigam, Overa, Jasrota', discipline: 'Protected Area Governance',
    targetParticipants: ['Protected Area Wardens', 'Wildlife Sociologists', 'GIS Specialists'],
    intendedOutput: 'Protected Area Integrity & Boundary Threat Audit',
    timeIST: '10:30 - 12:00 IST', status: 'proposed', hostType: 'joint'
  },
  {
    id: 'web-2027-08-26',
    title: 'Hangul, Markhor, Snow Leopard and Threatened Species Monitoring',
    theme: 'Telemetry collars, population census statistics, genetic isolation, and high-altitude predator prey dynamics',
    year: 2027, month: 8, monthName: 'August', dateDisplay: 'Aug 26, 2027', exactDate: '2027-08-26',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Biodiversity', primaryModuleSlug: 'biodiversity',
    relatedSubmodules: ['Protected Areas', 'Trails & Sightings'],
    geographicCoverage: 'Upper Dachigam, Kazinag & Zanskar Corridors', discipline: 'Mammalogy & Population Biology',
    targetParticipants: ['Wildlife Researchers', 'Endangered Species Biologists', 'Veterinarians'],
    intendedOutput: 'Flagship Himalayan Mammal Population Trajectory Dossier',
    timeIST: '14:30 - 16:00 IST', status: 'proposed', hostType: 'kew-organized'
  },
  {
    id: 'ws-2027-08-28',
    title: 'Camera-Trap, Acoustic Detection and Responsible Species Mapping',
    theme: 'Passive acoustic monitoring for forest birds, camera-trap grid deployment, and anti-poaching coordinate masking',
    year: 2027, month: 8, monthName: 'August', dateDisplay: 'Aug 28, 2027', exactDate: '2027-08-28',
    type: 'applied_workshop', typeLabel: 'Applied Workshop',
    primaryModule: 'Field Intelligence', primaryModuleSlug: 'biodiversity',
    relatedSubmodules: ['Biodiversity', 'Protected Areas'],
    geographicCoverage: 'Dachigam National Park Buffer', discipline: 'Wildlife Bioacoustics & Remote Camera Trapping',
    targetParticipants: ['Wildlife Field Assistants', 'Postgraduate Ecologists', 'Forest Guards'],
    intendedOutput: 'Camera-Trap Grid Blueprint & Sensitive Species Privacy Protocol',
    timeIST: '11:00 - 13:30 IST', status: 'proposed', hostType: 'kew-organized'
  },

  // September 2027
  {
    id: 'web-2027-09-09',
    title: 'Threatened Himalayan Flora, Medicinal Plants and Ethnobotany',
    theme: 'Over-exploitation of Saussurea costus, Arnebia benthamii, Trillium govanianum, and community cultivation models',
    year: 2027, month: 9, monthName: 'September', dateDisplay: 'Sep 9, 2027', exactDate: '2027-09-09',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Biodiversity', primaryModuleSlug: 'biodiversity',
    relatedSubmodules: ['Forest & Landscape', 'Agriculture EIA'],
    geographicCoverage: 'Pir Panjal & Gurez Alpine Belts', discipline: 'Ethnobotany & Conservation Genetics',
    targetParticipants: ['Medicinal Botanists', 'Pharmacologists', 'Traditional Knowledge Keepers'],
    intendedOutput: 'Red-Listed Montane Medicinal Plant Cultivation & Conservation Guide',
    timeIST: '10:30 - 12:00 IST', status: 'proposed', hostType: 'joint'
  },
  {
    id: 'web-2027-09-16',
    title: 'Landscape Connectivity, Habitat Modeling and Invasive Species',
    theme: 'Alien invasive flora (Anthemis cotula, Alternanthera), MaxEnt habitat suitability, and connectivity corridors',
    year: 2027, month: 9, monthName: 'September', dateDisplay: 'Sep 16, 2027', exactDate: '2027-09-16',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Protected Areas', primaryModuleSlug: 'protected-areas',
    relatedSubmodules: ['Biodiversity', 'Forest & Landscape'],
    geographicCoverage: 'Valley Wetlands & Forest Fringes', discipline: 'Landscape Ecology & Invasive Biology',
    targetParticipants: ['Ecological Modelers', 'Weed Scientists', 'Land Managers'],
    intendedOutput: 'Invasive Plant Threat Matrix & Ecological Corridor MaxEnt Model',
    timeIST: '14:30 - 16:00 IST', status: 'proposed', hostType: 'kew-organized'
  },
  {
    id: 'ws-2027-09-18',
    title: 'Biodiversity Evidence Registry and Species Data Validation',
    theme: 'GBIF and Darwin Core data formatting, photographic taxonomic validation, and KEW Biodiversity Registry publishing',
    year: 2027, month: 9, monthName: 'September', dateDisplay: 'Sep 18, 2027', exactDate: '2027-09-18',
    type: 'applied_workshop', typeLabel: 'Applied Workshop',
    primaryModule: 'Research Library & Open Data', primaryModuleSlug: 'biodiversity',
    relatedSubmodules: ['Biodiversity', 'Citizen Science'],
    geographicCoverage: 'Regional Herbarium & Digital Registries', discipline: 'Biodiversity Informatics',
    targetParticipants: ['Citizen Science Curators', 'University Curators', 'Data Stewards'],
    intendedOutput: 'Darwin Core Compliant Species Observation Dataset & Validation Workflow',
    timeIST: '11:00 - 13:30 IST', status: 'proposed', hostType: 'kew-organized'
  },

  // October 2027
  {
    id: 'web-2027-10-14',
    title: 'Karewa Plateau Degradation and Soil Erosion',
    theme: 'Excavation of Pleistocene lacustrine deposits (Karewas) for railway and highway earthworks, saffron land losses',
    year: 2027, month: 10, monthName: 'October', dateDisplay: 'Oct 14, 2027', exactDate: '2027-10-14',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Earth & Human Impact', primaryModuleSlug: 'earth-human-impact',
    relatedSubmodules: ['Mining & Extraction', 'Agriculture EIA'],
    geographicCoverage: 'Budgam, Pulwama & Pattan Karewa Tablelands', discipline: 'Geomorphology & Quaternary Geology',
    targetParticipants: ['Quaternary Geologists', 'Agricultural Scientists', 'Environmental Jurists'],
    intendedOutput: 'Karewa Destruction Rate & Land Degradation Assessment',
    timeIST: '10:30 - 12:00 IST', status: 'proposed', hostType: 'kew-organized'
  },
  {
    id: 'web-2027-10-28',
    title: 'Riverbed Mining, Sediment Transport and Riparian Damage',
    theme: 'Heavy mechanization impacts in stream orders, hydraulic bed degradation, and embankment collapse risks',
    year: 2027, month: 10, monthName: 'October', dateDisplay: 'Oct 28, 2027', exactDate: '2027-10-28',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Mining & Extraction', primaryModuleSlug: 'earth-human-impact',
    relatedSubmodules: ['Water Systems', 'Earth & Human Impact'],
    geographicCoverage: 'Rambiara, Doodh Ganga, Vaishaw Catchments', discipline: 'Sediment Transport & Fluvial Mining EIA',
    targetParticipants: ['Mining Geologists', 'River Engineers', 'Regulators'],
    intendedOutput: 'Mechanized Mining River Cross-Section Infiltration & Depth Profile',
    timeIST: '14:30 - 16:00 IST', status: 'proposed', hostType: 'joint'
  },
  {
    id: 'ws-2027-10-30',
    title: 'GIS-Based Land-Use and River Corridor Change Detection',
    theme: 'Calculating alluvial sand bar retreat and shoreline erosion using multi-temporal PlanetScope and Sentinel-2 imagery',
    year: 2027, month: 10, monthName: 'October', dateDisplay: 'Oct 30, 2027', exactDate: '2027-10-30',
    type: 'applied_workshop', typeLabel: 'Applied Workshop',
    primaryModule: 'Satellite Change Detection', primaryModuleSlug: 'earth-human-impact',
    relatedSubmodules: ['Mining & Extraction', 'Ecological Atlas'],
    geographicCoverage: 'Rambiara River Mining Corridor', discipline: 'Satellite Change Detection & Remote Sensing',
    targetParticipants: ['GIS Cartographers', 'EIA Analysts', 'Enforcement Staff'],
    intendedOutput: 'Riverbed Sand Mining Remote Sensing Change Extraction Script',
    timeIST: '11:00 - 13:30 IST', status: 'proposed', hostType: 'kew-organized'
  },

  // November 2027
  {
    id: 'web-2027-11-11',
    title: 'Environmental Impact Assessment and Sectoral Cumulative Effects',
    theme: 'Why isolated project-level EIAs fail in mountain systems, scoping cumulative river-basin impacts',
    year: 2027, month: 11, monthName: 'November', dateDisplay: 'Nov 11, 2027', exactDate: '2027-11-11',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Sectoral EIA', primaryModuleSlug: 'sectoral-eia',
    relatedSubmodules: ['Earth & Human Impact', 'Governance & Participation'],
    geographicCoverage: 'Western Himalayan Infrastructure Projects', discipline: 'Environmental Impact Assessment',
    targetParticipants: ['EIA Practitioners', 'Legal Advocates', 'Academic Reviewers'],
    intendedOutput: 'Himalayan Cumulative Impact Assessment Principles Brief',
    timeIST: '10:30 - 12:00 IST', status: 'proposed', hostType: 'kew-organized'
  },
  {
    id: 'web-2027-11-25',
    title: 'Sustainable Mountain Infrastructure, Mining and Urban Expansion',
    theme: 'Tunnels, slope cutting, debris disposal along riverbanks, and eco-sensitive highway corridor engineering',
    year: 2027, month: 11, monthName: 'November', dateDisplay: 'Nov 25, 2027', exactDate: '2027-11-25',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Energy & Infrastructure', primaryModuleSlug: 'earth-human-impact',
    relatedSubmodules: ['Mining & Extraction', 'Hazard Intelligence'],
    geographicCoverage: 'NH44 & Regional Rail Corridor Alignment', discipline: 'Civil Geotechnical & Environmental Engineering',
    targetParticipants: ['Highway Engineers', 'Slope Geologists', 'Environmental Auditors'],
    intendedOutput: 'Muck Disposal Best Practices & Slope Stabilization Dossier',
    timeIST: '14:30 - 16:00 IST', status: 'proposed', hostType: 'joint'
  },
  {
    id: 'ws-2027-11-27',
    title: 'EIA Evidence Dossiers and Impact Attribution',
    theme: 'Constructing statutory evidentiary dossiers for public environmental hearings and NGT tribunal proceedings',
    year: 2027, month: 11, monthName: 'November', dateDisplay: 'Nov 27, 2027', exactDate: '2027-11-27',
    type: 'applied_workshop', typeLabel: 'Applied Workshop',
    primaryModule: 'Governance & Participation', primaryModuleSlug: 'sectoral-eia',
    relatedSubmodules: ['Sectoral EIA', 'Research Library & Open Data'],
    geographicCoverage: 'All District Jurisdictions', discipline: 'Environmental Law & Evidence Documentation',
    targetParticipants: ['Law Students', 'Community Litigants', 'EIA Consultants'],
    intendedOutput: 'Evidentiary Chain-of-Custody & Statutory Filing Template',
    timeIST: '11:00 - 13:30 IST', status: 'proposed', hostType: 'kew-organized'
  },

  // December 2027
  {
    id: 'web-2027-12-09',
    title: 'Scientific Data Governance, Uncertainty and Open Methodology',
    theme: 'Quantifying uncertainty intervals in spatial layers, open licensing standards, and reproducible research',
    year: 2027, month: 12, monthName: 'December', dateDisplay: 'Dec 9, 2027', exactDate: '2027-12-09',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Research Library & Open Data', primaryModuleSlug: 'evidence-library',
    relatedSubmodules: ['Ecological Atlas', 'Governance & Participation'],
    geographicCoverage: 'Platform-wide Scientific Architecture', discipline: 'Metrology & Scientific Reproducibility',
    targetParticipants: ['Scientific Editors', 'Database Administrators', 'Principal Investigators'],
    intendedOutput: 'Scientific Uncertainty Attribution Standard Guide',
    timeIST: '10:30 - 12:00 IST', status: 'proposed', hostType: 'kew-organized'
  },
  {
    id: 'web-2027-12-16',
    title: 'Western Himalayan Environmental Intelligence: First-Year Review',
    theme: 'Evaluating 2027 baseline observations, cross-module telemetry progress, and the 2028 applied science agenda',
    year: 2027, month: 12, monthName: 'December', dateDisplay: 'Dec 16, 2027', exactDate: '2027-12-16',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'District Intelligence', primaryModuleSlug: 'district-profiles',
    relatedSubmodules: ['All Scientific Modules'],
    geographicCoverage: 'All 10 Kashmir Districts', discipline: 'Integrated Environmental Policy',
    targetParticipants: ['Steering Committee Members', 'NGO Leaders', 'Academic Deans'],
    intendedOutput: 'Year 1 Environmental Telemetry & Baseline Summary Paper',
    timeIST: '14:30 - 16:30 IST', status: 'proposed', hostType: 'kew-organized'
  },
  {
    id: 'ws-2027-12-18',
    title: 'Research Reporting, Metadata and Reproducible Scientific Workflows',
    theme: 'Writing Zenodo-compliant metadata, depositing code repositories on GitHub, and drafting technical monographs',
    year: 2027, month: 12, monthName: 'December', dateDisplay: 'Dec 18, 2027', exactDate: '2027-12-18',
    type: 'applied_workshop', typeLabel: 'Applied Workshop',
    primaryModule: 'Research Library & Open Data', primaryModuleSlug: 'evidence-library',
    relatedSubmodules: ['Research Library & Open Data'],
    geographicCoverage: 'Scientific Repository Framework', discipline: 'Research Data Management',
    targetParticipants: ['Young Scholars', 'Research Fellows', 'Data Scientists'],
    intendedOutput: 'FAIR Data Compliance Checklist & Monograph Format Guide',
    timeIST: '11:00 - 13:30 IST', status: 'proposed', hostType: 'kew-organized'
  },

  // ==========================================
  // 2028 MONTHLY WEBINARS & WORKSHOPS (36 total)
  // ==========================================
  // January 2028
  {
    id: 'web-2028-01-13',
    title: 'Snowfall Variability, Winter Climate Extremes & Cryosphere Change',
    theme: 'Chilai Kalan precipitation trends, western disturbance track alterations, and low-altitude snow deficit modeling',
    year: 2028, month: 1, monthName: 'January', dateDisplay: 'Jan 13, 2028', exactDate: '2028-01-13',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Cryosphere', primaryModuleSlug: 'cryosphere',
    relatedSubmodules: ['Climate & Atmosphere', 'Water Systems'],
    geographicCoverage: 'Gulmarg, Sinthan, Zojila Cryospheric Belts', discipline: 'Hydroclimatology & Snow Physics',
    targetParticipants: ['Climatologists', 'Snow Hydrologists', 'Winter Tourism Planners'],
    intendedOutput: 'Western Disturbance Decadal Precipitation Anomaly Report',
    timeIST: '10:30 - 12:00 IST', status: 'proposed', hostType: 'joint'
  },
  {
    id: 'web-2028-01-27',
    title: 'Himalayan Air Quality Forecasting and Exposure Analysis',
    theme: 'WRF-Chem coupled dispersion modeling, biomass burning plumes, and school zone particulate exposure risk',
    year: 2028, month: 1, monthName: 'January', dateDisplay: 'Jan 27, 2028', exactDate: '2028-01-27',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Climate & Atmosphere', primaryModuleSlug: 'environmental-monitoring',
    relatedSubmodules: ['Environmental Monitoring', 'Urban Ecology'],
    geographicCoverage: 'Srinagar, Anantnag, Baramulla Urban Nodes', discipline: 'Atmospheric Modeling & Epidemiology',
    targetParticipants: ['Atmospheric Modelers', 'Pulmonologists', 'Urban Health Authorities'],
    intendedOutput: 'Valley Air Pollution Stagnation Forecasting Protocol',
    timeIST: '14:30 - 16:00 IST', status: 'proposed', hostType: 'joint'
  },
  {
    id: 'ws-2028-01-29',
    title: 'Climate Time-Series Analysis and Environmental Forecast Validation',
    theme: 'Python/R tools for Mann-Kendall trend tests, Sen slope calculation on 40-year ERA5 and IMD meteorological grids',
    year: 2028, month: 1, monthName: 'January', dateDisplay: 'Jan 29, 2028', exactDate: '2028-01-29',
    type: 'applied_workshop', typeLabel: 'Applied Workshop',
    primaryModule: 'Climate & Atmosphere', primaryModuleSlug: 'environmental-monitoring',
    relatedSubmodules: ['Research Library & Open Data', 'Ecological Atlas'],
    geographicCoverage: 'Regional Meteorological Grids', discipline: 'Statistical Climatology',
    targetParticipants: ['Postgraduate Researchers', 'Climate Analysts', 'Data Scientists'],
    intendedOutput: 'Climate Trend Analysis Code Repository & Validation Manual',
    timeIST: '11:00 - 13:30 IST', status: 'proposed', hostType: 'kew-organized'
  },

  // February 2028
  {
    id: 'web-2028-02-10',
    title: 'Wetlands for Sustainable Mountain Cities',
    theme: 'Integrating urban wetlands into city master plans, stormwater buffering, and urban sponge infrastructure',
    year: 2028, month: 2, monthName: 'February', dateDisplay: 'Feb 10, 2028', exactDate: '2028-02-10',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Water Systems', primaryModuleSlug: 'water-systems',
    relatedSubmodules: ['Urban Ecology', 'Hazard Intelligence'],
    geographicCoverage: 'Srinagar Master Plan Area & Wetlands', discipline: 'Urban Limnology & Landscape Urbanism',
    targetParticipants: ['Urban Planners', 'Landscape Architects', 'Wetland Authorities'],
    intendedOutput: 'Urban Wetland Sponge Infrastructure Design Whitepaper',
    timeIST: '10:30 - 12:00 IST', status: 'proposed', hostType: 'joint'
  },
  {
    id: 'web-2028-02-24',
    title: 'Urban Lake Encroachment, Sewage and Nutrient Loading',
    theme: 'Perimeter houseboats, unauthorized littoral land filling, dissolved oxygen sags, and wastewater interception',
    year: 2028, month: 2, monthName: 'February', dateDisplay: 'Feb 24, 2028', exactDate: '2028-02-24',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Aquatic Ecology', primaryModuleSlug: 'water-systems',
    relatedSubmodules: ['Urban Ecology', 'Environmental Monitoring'],
    geographicCoverage: 'Dal, Nigeen, and Khushal Sar Basins', discipline: 'Aquatic Biogeochemistry & Wastewater Engineering',
    targetParticipants: ['Lake Conservation Authorities', 'Sanitary Engineers', 'Environmental NGO Staff'],
    intendedOutput: 'Urban Lake Nutrient Loading Source Apportionment Brief',
    timeIST: '14:30 - 16:00 IST', status: 'proposed', hostType: 'joint'
  },
  {
    id: 'ws-2028-02-26',
    title: 'Urban Wetland Change Mapping and Monitoring Indicators',
    theme: 'High-resolution PlanetScope differencing of encroached marsh margins and multi-year shoreline migration',
    year: 2028, month: 2, monthName: 'February', dateDisplay: 'Feb 26, 2028', exactDate: '2028-02-26',
    type: 'applied_workshop', typeLabel: 'Applied Workshop',
    primaryModule: 'Satellite Change Detection', primaryModuleSlug: 'earth-human-impact',
    relatedSubmodules: ['Water Systems', 'Urban Ecology'],
    geographicCoverage: 'Anchar & Gilsar Littoral Boundaries', discipline: 'Urban Remote Sensing & Cadastral Mapping',
    targetParticipants: ['Cadastral Surveyors', 'GIS Technicians', 'Wetland Enforcement Officers'],
    intendedOutput: 'Littoral Encroachment Detection Script & Boundary Overlay',
    timeIST: '11:00 - 13:30 IST', status: 'proposed', hostType: 'kew-organized'
  },

  // March 2028
  {
    id: 'web-2028-03-09',
    title: 'Earthquake Exposure, Seismic Risk and Infrastructure Resilience',
    theme: 'Main Boundary Thrust (MBT) and Kashmir seismic gap, vernacular Taq and Dhajji Dewari architecture vs RCC',
    year: 2028, month: 3, monthName: 'March', dateDisplay: 'Mar 9, 2028', exactDate: '2028-03-09',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Hazard Intelligence', primaryModuleSlug: 'hazard-intelligence',
    relatedSubmodules: ['Energy & Infrastructure', 'District Intelligence'],
    geographicCoverage: 'Kashmir Seismic Fault Systems', discipline: 'Seismology & Earthquake Engineering',
    targetParticipants: ['Structural Engineers', 'Disaster Management Officials', 'Architects'],
    intendedOutput: 'Regional Seismic Vulnerability Assessment & Heritage Resilience Dossier',
    timeIST: '10:30 - 12:00 IST', status: 'proposed', hostType: 'joint'
  },
  {
    id: 'web-2028-03-23',
    title: 'Floods, Landslides, Avalanches and Compound Hazards',
    theme: 'Cascading hazards: cloudburst-triggered debris flows, river damming, and downstream bridge scouring',
    year: 2028, month: 3, monthName: 'March', dateDisplay: 'Mar 23, 2028', exactDate: '2028-03-23',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Hazard Intelligence', primaryModuleSlug: 'hazard-intelligence',
    relatedSubmodules: ['Water Systems', 'Energy & Infrastructure'],
    geographicCoverage: 'Pahalgam, Sonamarg, and Uri Tributary Gorges', discipline: 'Compound Hazard Geomorphology',
    targetParticipants: ['Geomorphologists', 'Emergency Responders', 'Civil Protection Engineers'],
    intendedOutput: 'Compound Mountain Hazard Risk Cascade Protocol',
    timeIST: '14:30 - 16:00 IST', status: 'proposed', hostType: 'kew-organized'
  },
  {
    id: 'ws-2028-03-25',
    title: 'Multi-Hazard GIS Modeling and Alert Validation',
    theme: 'Integrating slope steepness, geology, hydrology, and building footprints into automated multi-hazard susceptibility models',
    year: 2028, month: 3, monthName: 'March', dateDisplay: 'Mar 25, 2028', exactDate: '2028-03-25',
    type: 'applied_workshop', typeLabel: 'Applied Workshop',
    primaryModule: 'Hazard Intelligence', primaryModuleSlug: 'hazard-intelligence',
    relatedSubmodules: ['Ecological Atlas', 'Satellite Change Detection'],
    geographicCoverage: 'High-Risk Tehsils across Kashmir', discipline: 'Spatial Hazard Modeling & Alert Validation',
    targetParticipants: ['Disaster Cell Analysts', 'GIS Programmers', 'Risk Underwriters'],
    intendedOutput: 'Automated Multi-Hazard Susceptibility Model Code & Layer Pack',
    timeIST: '11:00 - 13:30 IST', status: 'proposed', hostType: 'kew-organized'
  },

  // April 2028
  {
    id: 'web-2028-04-13',
    title: 'Forest Carbon, Treeline Dynamics and Landscape Restoration',
    theme: 'Biomass allometric equations, alpine treeline ecotone upward migration, and assisted natural regeneration',
    year: 2028, month: 4, monthName: 'April', dateDisplay: 'Apr 13, 2028', exactDate: '2028-04-13',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Forest & Landscape', primaryModuleSlug: 'protected-areas',
    relatedSubmodules: ['Biodiversity', 'Earth & Human Impact'],
    geographicCoverage: 'North & South Kashmir Forest Circles', discipline: 'Forest Carbon Accounting & Dendrochronology',
    targetParticipants: ['Carbon Accountants', 'Forest Officers', 'Restoration Botanists'],
    intendedOutput: 'Montane Forest Carbon Inventory Methodology Guide',
    timeIST: '10:30 - 12:00 IST', status: 'proposed', hostType: 'joint'
  },
  {
    id: 'web-2028-04-27',
    title: 'Chinar Heritage, Urban Heat Islands and Green Infrastructure',
    theme: 'Centuries-old Oriental Plane (Platanus orientalis) microclimate cooling, concrete encroachment around roots, urban canopy mapping',
    year: 2028, month: 4, monthName: 'April', dateDisplay: 'Apr 27, 2028', exactDate: '2028-04-27',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Urban Ecology', primaryModuleSlug: 'environmental-monitoring',
    relatedSubmodules: ['Forest & Landscape', 'Environmental Monitoring'],
    geographicCoverage: 'Srinagar, Budgam, Ganderbal Heritage Chinar Stands', discipline: 'Urban Forestry & Bioclimatic Architecture',
    targetParticipants: ['Urban Foresters', 'Heritage Conservators', 'Landscape Designers'],
    intendedOutput: 'Living Heritage Chinar Tree Protection & Root Zone Buffer Policy',
    timeIST: '14:30 - 16:00 IST', status: 'proposed', hostType: 'kew-organized'
  },
  {
    id: 'ws-2028-04-29',
    title: 'Urban Tree Inventories, Thermal Remote Sensing and Restoration Planning',
    theme: 'Landsat-9 / ECOSTRESS land surface temperature calculation and smartphone GPS urban tree canopy registration',
    year: 2028, month: 4, monthName: 'April', dateDisplay: 'Apr 29, 2028', exactDate: '2028-04-29',
    type: 'applied_workshop', typeLabel: 'Applied Workshop',
    primaryModule: 'Urban Ecology', primaryModuleSlug: 'environmental-monitoring',
    relatedSubmodules: ['Satellite Change Detection', 'Forest & Landscape'],
    geographicCoverage: 'Greater Srinagar Metropolitan Area', discipline: 'Thermal Remote Sensing & Urban Tree Census',
    targetParticipants: ['School Science Teachers', 'Urban Planners', 'Student Volunteers'],
    intendedOutput: 'Urban Tree Census Field Protocol & Heat Island Mitigation Map',
    timeIST: '11:00 - 13:30 IST', status: 'proposed', hostType: 'kew-organized'
  },

  // May 2028
  {
    id: 'web-2028-05-11',
    title: 'Pollinators, Agro-Biodiversity and Ecosystem Services',
    theme: 'Native bumblebee and solitary bee populations, apple pollination deficits, pesticide impacts, and wildflower hedgerows',
    year: 2028, month: 5, monthName: 'May', dateDisplay: 'May 11, 2028', exactDate: '2028-05-11',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Biodiversity', primaryModuleSlug: 'biodiversity',
    relatedSubmodules: ['Horticulture EIA', 'Seasonal Phenology'],
    geographicCoverage: 'Shopian, Baramulla & Pulwama Apple Orchards', discipline: 'Pollinator Ecology & Agro-Ecosystems',
    targetParticipants: ['Entomologists', 'Horticulturists', 'Apple Growers Associations'],
    intendedOutput: 'Wild Pollinator Conservation & Orchard Hedgerow Protocol',
    timeIST: '10:30 - 12:00 IST', status: 'proposed', hostType: 'joint'
  },
  {
    id: 'web-2028-05-25',
    title: 'Wildlife Conflict, Conservation Priorities and Biodiversity Recovery',
    theme: 'Black bear and leopard intrusions into orchard belts, fencing strategies, compensation frameworks, and coexistence',
    year: 2028, month: 5, monthName: 'May', dateDisplay: 'May 25, 2028', exactDate: '2028-05-25',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Protected Areas', primaryModuleSlug: 'protected-areas',
    relatedSubmodules: ['Biodiversity', 'Horticulture EIA'],
    geographicCoverage: 'Orchard-Forest Interface across Valley', discipline: 'Human-Wildlife Coexistence Science',
    targetParticipants: ['Wildlife Conflict Teams', 'Orchardists', 'Veterinary Officers'],
    intendedOutput: 'Human-Carnivore Conflict Mitigation Standard Operating Procedure',
    timeIST: '14:30 - 16:00 IST', status: 'proposed', hostType: 'joint'
  },
  {
    id: 'ws-2028-05-27',
    title: 'Habitat Suitability and Biodiversity Monitoring Design',
    theme: 'Designing stratified random field sampling grids and running species distribution models in R / biomod2',
    year: 2028, month: 5, monthName: 'May', dateDisplay: 'May 27, 2028', exactDate: '2028-05-27',
    type: 'applied_workshop', typeLabel: 'Applied Workshop',
    primaryModule: 'Biodiversity', primaryModuleSlug: 'biodiversity',
    relatedSubmodules: ['Protected Areas', 'Ecological Atlas'],
    geographicCoverage: 'Pir Panjal Wildlife Sanctuaries', discipline: 'Ecological Modeling & Sampling Design',
    targetParticipants: ['Biodiversity Scholars', 'Ecological Modelers', 'Field Biologists'],
    intendedOutput: 'Species Distribution Modeling Script & Grid Generator',
    timeIST: '11:00 - 13:30 IST', status: 'proposed', hostType: 'kew-organized'
  },

  // June 2028
  {
    id: 'web-2028-06-08',
    title: 'Tourism Carrying Capacity and Mountain Waste Footprints',
    theme: 'Visitor density in Gulmarg, Sonamarg, and Pahalgam, trail degradation, alpine sewage, and single-use plastic loads',
    year: 2028, month: 6, monthName: 'June', dateDisplay: 'Jun 8, 2028', exactDate: '2028-06-08',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Tourism EIA', primaryModuleSlug: 'sectoral-eia',
    relatedSubmodules: ['Sectoral EIA', 'Waste & Sanitation'],
    geographicCoverage: 'Gulmarg, Pahalgam, Sonamarg, Doodhpathri', discipline: 'Sustainable Tourism & Carrying Capacity',
    targetParticipants: ['Tourism Development Authorities', 'Hoteliers', 'Eco-Tourism Consultants'],
    intendedOutput: 'High-Altitude Meadow Tourism Carrying Capacity Assessment Tool',
    timeIST: '10:30 - 12:00 IST', status: 'proposed', hostType: 'kew-organized'
  },
  {
    id: 'web-2028-06-22',
    title: 'Horticulture, Agriculture and Handicraft Environmental Lifecycles',
    theme: 'Agrochemical pesticide residues in orchard soils, high-density apple water footprints, shawl dyeing effluents',
    year: 2028, month: 6, monthName: 'June', dateDisplay: 'Jun 22, 2028', exactDate: '2028-06-22',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Sectoral EIA', primaryModuleSlug: 'sectoral-eia',
    relatedSubmodules: ['Horticulture EIA', 'Handicrafts EIA', 'Agriculture EIA'],
    geographicCoverage: 'Orchard Belts & Artisan Craft Centers', discipline: 'Life Cycle Assessment (LCA)',
    targetParticipants: ['LCA Specialists', 'Agronomists', 'Craft Council Leaders'],
    intendedOutput: 'Kashmir Sectoral Environmental Lifecycle Assessment Matrix',
    timeIST: '14:30 - 16:00 IST', status: 'proposed', hostType: 'joint'
  },
  {
    id: 'ws-2028-06-24',
    title: 'Sectoral EIA Scoping, GIS Overlays and Cumulative Impact Models',
    theme: 'Overlaying tourism resorts, orchard conversions, and mining leases onto ecological sensitivity maps to compute cumulative threat scores',
    year: 2028, month: 6, monthName: 'June', dateDisplay: 'Jun 24, 2028', exactDate: '2028-06-24',
    type: 'applied_workshop', typeLabel: 'Applied Workshop',
    primaryModule: 'Sectoral EIA', primaryModuleSlug: 'sectoral-eia',
    relatedSubmodules: ['Ecological Atlas', 'Earth & Human Impact'],
    geographicCoverage: 'Lidder Valley Tourism Corridor', discipline: 'Cumulative Spatial Impact Assessment',
    targetParticipants: ['EIA Consultants', 'GIS Technicians', 'Planning Officers'],
    intendedOutput: 'Cumulative Impact Overlay Workflow & Threat Score Calculator',
    timeIST: '11:00 - 13:30 IST', status: 'proposed', hostType: 'kew-organized'
  },

  // July 2028
  {
    id: 'web-2028-07-13',
    title: 'Hydropower, River Regulation and Aquatic Connectivity',
    theme: 'Run-of-the-river hydropower cascades, environmental flow deficits in Jhelum and Chenab, fish ladder effectiveness',
    year: 2028, month: 7, monthName: 'July', dateDisplay: 'Jul 13, 2028', exactDate: '2028-07-13',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Energy & Infrastructure', primaryModuleSlug: 'sectoral-eia',
    relatedSubmodules: ['Water Systems', 'Aquatic Ecology'],
    geographicCoverage: 'Jhelum & Chenab Hydropower Reaches', discipline: 'Hydro-Engineering & Eco-Hydraulics',
    targetParticipants: ['Hydropower Engineers', 'Aquatic Biologists', 'River Restorers'],
    intendedOutput: 'Hydropower Environmental Flow Compliance & Passage Evaluation',
    timeIST: '10:30 - 12:00 IST', status: 'proposed', hostType: 'joint'
  },
  {
    id: 'web-2028-07-27',
    title: 'Groundwater Recharge, Irrigation and Agricultural Water Security',
    theme: 'Tube-well expansions in Karewa uplands, traditional Kuhl irrigation maintenance, and agricultural drought risk',
    year: 2028, month: 7, monthName: 'July', dateDisplay: 'Jul 27, 2028', exactDate: '2028-07-27',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Agriculture EIA', primaryModuleSlug: 'sectoral-eia',
    relatedSubmodules: ['Water Systems', 'Agriculture EIA'],
    geographicCoverage: 'South Kashmir Agricultural Watersheds', discipline: 'Agricultural Hydrology & Water Management',
    targetParticipants: ['Irrigation Officers', 'Agronomists', 'Groundwater Hydrologists'],
    intendedOutput: 'Traditional Kuhl System Hydrological Efficiency & Recharge Assessment',
    timeIST: '14:30 - 16:00 IST', status: 'proposed', hostType: 'kew-organized'
  },
  {
    id: 'ws-2028-07-29',
    title: 'Watershed Modeling and Environmental Flow Assessment',
    theme: 'HEC-RAS and SWAT hydrological modeling of catchment runoff, sediment yield, and minimum downstream e-flows',
    year: 2028, month: 7, monthName: 'July', dateDisplay: 'Jul 29, 2028', exactDate: '2028-07-29',
    type: 'applied_workshop', typeLabel: 'Applied Workshop',
    primaryModule: 'Water Systems', primaryModuleSlug: 'water-systems',
    relatedSubmodules: ['Energy & Infrastructure', 'Ecological Atlas'],
    geographicCoverage: 'Sindh River Basin Catchment', discipline: 'Hydrological Modeling (HEC-RAS / SWAT)',
    targetParticipants: ['Hydrology Modelers', 'Civil Engineers', 'Water Resources Scholars'],
    intendedOutput: 'Catchment Runoff & Environmental Flow Model Project File',
    timeIST: '11:00 - 13:30 IST', status: 'proposed', hostType: 'kew-organized'
  },

  // August 2028
  {
    id: 'web-2028-08-10',
    title: 'Satellite-Based Forest Degradation and Landscape Fragmentation',
    theme: 'Continuous Change Detection and Classification (CCDC) algorithms, sub-canopy logging, and grazing trail fragmentation',
    year: 2028, month: 8, monthName: 'August', dateDisplay: 'Aug 10, 2028', exactDate: '2028-08-10',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Satellite Change Detection', primaryModuleSlug: 'earth-human-impact',
    relatedSubmodules: ['Forest & Landscape', 'Earth & Human Impact'],
    geographicCoverage: 'Gulmarg & Pir Panjal Forest Ranges', discipline: 'Radar & Optical Remote Sensing',
    targetParticipants: ['Forest Surveyors', 'Remote Sensing Researchers', 'Ecology Chairs'],
    intendedOutput: 'Canopy Degradation Index & Remote Sensing Calibration Paper',
    timeIST: '10:30 - 12:00 IST', status: 'proposed', hostType: 'joint'
  },
  {
    id: 'web-2028-08-24',
    title: 'Mining, Quarrying, Infrastructure and Land Transformation',
    theme: 'Limestone quarrying in Khrew-Pampore cement belt, dust deposition on saffron soils, and hillside slope scarping',
    year: 2028, month: 8, monthName: 'August', dateDisplay: 'Aug 24, 2028', exactDate: '2028-08-24',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Mining & Extraction', primaryModuleSlug: 'earth-human-impact',
    relatedSubmodules: ['Earth & Human Impact', 'Agriculture EIA'],
    geographicCoverage: 'Khrew, Wuyan, Pampore Karst Escarpments', discipline: 'Industrial Ecology & Mining Geology',
    targetParticipants: ['Mining Engineers', 'Soil Scientists', 'Pollution Control Officers'],
    intendedOutput: 'Limestone Extraction Footprint & Saffron Soil Deposition Study',
    timeIST: '14:30 - 16:00 IST', status: 'proposed', hostType: 'joint'
  },
  {
    id: 'ws-2028-08-26',
    title: 'Environmental Change Attribution and Evidence Confidence',
    theme: 'Distinguishing climatic signals from direct anthropogenic land interventions using multi-sensor statistical controls',
    year: 2028, month: 8, monthName: 'August', dateDisplay: 'Aug 26, 2028', exactDate: '2028-08-26',
    type: 'applied_workshop', typeLabel: 'Applied Workshop',
    primaryModule: 'Earth & Human Impact', primaryModuleSlug: 'earth-human-impact',
    relatedSubmodules: ['Satellite Change Detection', 'Research Library & Open Data'],
    geographicCoverage: 'Valley-Wide Land Change Sites', discipline: 'Environmental Change Attribution Science',
    targetParticipants: ['Research Fellows', 'Data Scientists', 'Statisticians'],
    intendedOutput: 'Impact Attribution Confidence Scoring Framework',
    timeIST: '11:00 - 13:30 IST', status: 'proposed', hostType: 'kew-organized'
  },

  // September 2028
  {
    id: 'web-2028-09-14',
    title: 'Outdoor Classroom, Environmental Curriculum and School Eco-Clubs',
    theme: 'Integrating Western Himalayan ecosystem science into school textbooks, experiential fieldwork, and eco-club audits',
    year: 2028, month: 9, monthName: 'September', dateDisplay: 'Sep 14, 2028', exactDate: '2028-09-14',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Outdoor Classroom', primaryModuleSlug: 'outdoor-classroom',
    relatedSubmodules: ['Citizen Science', 'Education & Society'],
    geographicCoverage: 'School Networks across 10 Districts', discipline: 'Environmental Education & Curriculum Design',
    targetParticipants: ['School Principals', 'Science Teachers', 'Education Officers'],
    intendedOutput: 'Himalayan School Eco-Club Action Framework & Lesson Plans',
    timeIST: '10:30 - 12:00 IST', status: 'proposed', hostType: 'kew-organized'
  },
  {
    id: 'web-2028-09-28',
    title: 'Citizen Science, NGO Verification and Community Conservation',
    theme: 'Community biodiversity observations, validating participatory water monitoring data, and authenticating NGO impacts',
    year: 2028, month: 9, monthName: 'September', dateDisplay: 'Sep 28, 2028', exactDate: '2028-09-28',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'NGO Impact', primaryModuleSlug: 'ngo-impact',
    relatedSubmodules: ['Citizen Science', 'Outdoor Classroom'],
    geographicCoverage: 'Community Watersheds & Grassroots NGO Hubs', discipline: 'Participatory Science & NGO Evaluation',
    targetParticipants: ['NGO Coordinators', 'Citizen Science Leaders', 'Community Organizers'],
    intendedOutput: 'NGO Verification Standards & Citizen Science QA Protocol',
    timeIST: '14:30 - 16:00 IST', status: 'proposed', hostType: 'joint'
  },
  {
    id: 'ws-2028-09-30',
    title: 'School Field Data Collection and Community Research Validation',
    theme: 'Training high-school teachers on student safety protocols, mobile telemetry logging, and bird survey methodologies',
    year: 2028, month: 9, monthName: 'September', dateDisplay: 'Sep 30, 2028', exactDate: '2028-09-30',
    type: 'applied_workshop', typeLabel: 'Applied Workshop',
    primaryModule: 'Outdoor Classroom', primaryModuleSlug: 'outdoor-classroom',
    relatedSubmodules: ['Citizen Science', 'Field Intelligence'],
    geographicCoverage: 'District Educational Training Centers', discipline: 'Field Pedagogy & Student Data Validation',
    targetParticipants: ['Eco-Club Master Trainers', 'High School Educators'],
    intendedOutput: 'Student Fieldwork Safeguarding & Observation Guide',
    timeIST: '11:00 - 13:30 IST', status: 'proposed', hostType: 'kew-organized'
  },

  // October 2028
  {
    id: 'web-2028-10-12',
    title: 'EcoVoices, Environmental Communication and Scientific Storytelling',
    theme: 'Translating complex ecological telemetry into Kashmiri poetry, music, visual documentaries, and public awareness',
    year: 2028, month: 10, monthName: 'October', dateDisplay: 'Oct 12, 2028', exactDate: '2028-10-12',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'EcoVoices', primaryModuleSlug: 'ecovoices',
    relatedSubmodules: ['Outdoor Classroom', 'Governance & Participation'],
    geographicCoverage: 'Valley Cultural Circles & Creative Collectives', discipline: 'Science Communication & Environmental Humanities',
    targetParticipants: ['Writers', 'Journalists', 'Folk Artists', 'Science Communicators'],
    intendedOutput: 'Himalayan Science-to-Culture Communication Toolkit',
    timeIST: '10:30 - 12:00 IST', status: 'proposed', hostType: 'joint'
  },
  {
    id: 'web-2028-10-26',
    title: 'Environmental Law, Public Consultation and Ecological Accountability',
    theme: 'Forest Conservation Act provisions, public hearing mandates in EIA, and legal precedents from the National Green Tribunal',
    year: 2028, month: 10, monthName: 'October', dateDisplay: 'Oct 26, 2028', exactDate: '2028-10-26',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Governance & Participation', primaryModuleSlug: 'sectoral-eia',
    relatedSubmodules: ['Sectoral EIA', 'Earth & Human Impact'],
    geographicCoverage: 'J&K High Court & NGT Jurisdiction', discipline: 'Environmental Jurisprudence & Public Law',
    targetParticipants: ['Environmental Lawyers', 'Judicial Clerks', 'Citizen Advocates'],
    intendedOutput: 'Himalayan Environmental Law Precedents Compendium',
    timeIST: '14:30 - 16:00 IST', status: 'proposed', hostType: 'kew-organized'
  },
  {
    id: 'ws-2028-10-28',
    title: 'Environmental Evidence Communication and Consultation Design',
    theme: 'Designing transparent public consultation proceedings, visual impact maps, and accessible vernacular environmental briefs',
    year: 2028, month: 10, monthName: 'October', dateDisplay: 'Oct 28, 2028', exactDate: '2028-10-28',
    type: 'applied_workshop', typeLabel: 'Applied Workshop',
    primaryModule: 'Governance & Participation', primaryModuleSlug: 'sectoral-eia',
    relatedSubmodules: ['EcoVoices', 'Sectoral EIA'],
    geographicCoverage: 'Community Consultation Venues', discipline: 'Deliberative Democracy & Science Communication',
    targetParticipants: ['Public Hearing Facilitators', 'Community Liaisons', 'EIA Practitioners'],
    intendedOutput: 'Public Environmental Consultation Design Handbook',
    timeIST: '11:00 - 13:30 IST', status: 'proposed', hostType: 'kew-organized'
  },

  // November 2028
  {
    id: 'web-2028-11-09',
    title: 'Restoration Effectiveness, Ecosystem Recovery and Conservation Outcomes',
    theme: 'Evaluating survival rates of afforestation saplings, wetland sediment trap efficiencies, and bio-engineering success',
    year: 2028, month: 11, monthName: 'November', dateDisplay: 'Nov 9, 2028', exactDate: '2028-11-09',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Forest & Landscape', primaryModuleSlug: 'protected-areas',
    relatedSubmodules: ['Water Systems', 'Earth & Human Impact'],
    geographicCoverage: 'Catchment Restoration Plots across Kashmir', discipline: 'Restoration Ecology & Outcome Assessment',
    targetParticipants: ['Restoration Ecologists', 'Watershed Managers', 'CSR Donors'],
    intendedOutput: 'Restoration Effectiveness Monitoring & Survival Audit Protocol',
    timeIST: '10:30 - 12:00 IST', status: 'proposed', hostType: 'joint'
  },
  {
    id: 'web-2028-11-23',
    title: 'District Environmental Scorecards and Regional Policy Assessment',
    theme: 'Comparing 10 district ecological scorecards: forest cover, water health, waste treatment, and disaster readiness',
    year: 2028, month: 11, monthName: 'November', dateDisplay: 'Nov 23, 2028', exactDate: '2028-11-23',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'District Intelligence', primaryModuleSlug: 'district-profiles',
    relatedSubmodules: ['All Scientific Modules', 'Ecological Atlas'],
    geographicCoverage: 'All 10 Kashmir Valley Districts', discipline: 'District Environmental Policy & Benchmarking',
    targetParticipants: ['District Collectors', 'Planning Directors', 'Civil Society Leads'],
    intendedOutput: 'District Environmental Scorecard Comparative Analysis Report',
    timeIST: '14:30 - 16:30 IST', status: 'proposed', hostType: 'kew-organized'
  },
  {
    id: 'ws-2028-11-25',
    title: 'Environmental Indicator Audit and Two-Year Comparative Analysis',
    theme: 'Statistical synthesis of 2027 vs 2028 water quality metrics, air pollution exceedance days, and forest cover changes',
    year: 2028, month: 11, monthName: 'November', dateDisplay: 'Nov 25, 2028', exactDate: '2028-11-25',
    type: 'applied_workshop', typeLabel: 'Applied Workshop',
    primaryModule: 'Environmental Monitoring', primaryModuleSlug: 'environmental-monitoring',
    relatedSubmodules: ['District Intelligence', 'Research Library & Open Data'],
    geographicCoverage: 'Regional Telemetry Database', discipline: 'Environmental Indicator Auditing',
    targetParticipants: ['Data Analysts', 'Environmental Statisticians', 'State Planners'],
    intendedOutput: 'Two-Year Environmental Indicator Comparative Audit Template',
    timeIST: '11:00 - 13:30 IST', status: 'proposed', hostType: 'kew-organized'
  },

  // December 2028
  {
    id: 'web-2028-12-07',
    title: 'Open Environmental Data, Digital Research Infrastructure and Scientific Reproducibility',
    theme: 'API architectures for environmental telemetry, Creative Commons licensing, and open-access publishing models',
    year: 2028, month: 12, monthName: 'December', dateDisplay: 'Dec 7, 2028', exactDate: '2028-12-07',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Research Library & Open Data', primaryModuleSlug: 'evidence-library',
    relatedSubmodules: ['Research Library & Open Data', 'Ecological Atlas'],
    geographicCoverage: 'Global & Regional Open Science Repositories', discipline: 'Research Data Infrastructure',
    targetParticipants: ['Open Science Advocates', 'Research Deans', 'Data Engineers'],
    intendedOutput: 'Himalayan Open Environmental Data Charter & API Specification',
    timeIST: '10:30 - 12:00 IST', status: 'proposed', hostType: 'kew-organized'
  },
  {
    id: 'web-2028-12-14',
    title: 'Western Himalayan Environmental Research Priorities 2029–2030',
    theme: 'Setting the strategic five-year research agenda: cryosphere thresholds, microplastic ingress, and policy goals',
    year: 2028, month: 12, monthName: 'December', dateDisplay: 'Dec 14, 2028', exactDate: '2028-12-14',
    type: 'specialist_webinar', typeLabel: 'Specialist Webinar',
    primaryModule: 'Research Library & Open Data', primaryModuleSlug: 'evidence-library',
    relatedSubmodules: ['All Scientific Modules'],
    geographicCoverage: 'Western Himalayan Ecoregion', discipline: 'Strategic Environmental Research Policy',
    targetParticipants: ['University Vice Chancellors', 'Scientific Secretariat', 'Partner NGOs'],
    intendedOutput: '2029–2030 Western Himalayan Research Priorities Whitepaper',
    timeIST: '14:30 - 16:30 IST', status: 'proposed', hostType: 'joint'
  },
  {
    id: 'ws-2028-12-16',
    title: 'Two-Year Synthesis, Proceedings and Institutional Program Review',
    theme: 'Compiling the 104-activity monograph collection, archiving video masters, and indexing DOIs into Zenodo/DataCite',
    year: 2028, month: 12, monthName: 'December', dateDisplay: 'Dec 16, 2028', exactDate: '2028-12-16',
    type: 'applied_workshop', typeLabel: 'Applied Workshop',
    primaryModule: 'Research Library & Open Data', primaryModuleSlug: 'evidence-library',
    relatedSubmodules: ['Research Library & Open Data', 'Ecological Atlas'],
    geographicCoverage: 'Zenodo / DataCite Open Repository', discipline: 'Archival Science & Scientific Publishing',
    targetParticipants: ['Editorial Board Members', 'Archivists', 'Program Administrators'],
    intendedOutput: 'Inaugural Two-Year Complete Proceedings & Monograph Index',
    timeIST: '11:00 - 14:00 IST', status: 'proposed', hostType: 'kew-organized'
  },

  // ==========================================
  // 24 ENVIRONMENTAL OBSERVANCE & OUTDOOR CLASSROOM PROGRAMS
  // ==========================================
  // 2027 Observances
  {
    id: 'obs-2027-01',
    title: 'Winter Wildlife, Animal Welfare & Ecological Adaptation Field School',
    theme: 'Observing wildlife survival strategies in sub-zero snow conditions, winter feeding ethics, and animal protection',
    year: 2027, month: 1, monthName: 'January', dateDisplay: 'January 2027',
    type: 'environmental_observance', typeLabel: 'Environmental Observance',
    primaryModule: 'Outdoor Classroom', primaryModuleSlug: 'outdoor-classroom',
    relatedSubmodules: ['Biodiversity', 'Protected Areas'],
    geographicCoverage: 'Dachigam Buffer & Foothill Schools', discipline: 'Wildlife Ethology & Winter Ecology',
    targetParticipants: ['High School Students', 'Animal Welfare Groups', 'Eco-Clubs'],
    intendedOutput: 'Winter Wildlife Observation Field Journal & Welfare Protocol',
    timeIST: '10:00 - 14:00 IST', status: 'proposed', hostType: 'kew-organized',
    linkedObservance: 'Winter Wildlife Awareness'
  },
  {
    id: 'obs-2027-02',
    title: 'World Wetlands Day: Waterbird Monitoring & Wetland Field Education',
    theme: 'Convention on Wetlands 2027 Theme: Innovation in action for wetlands. Live waterbird counts and student water testing',
    year: 2027, month: 2, monthName: 'February', dateDisplay: 'Feb 2, 2027', exactDate: '2027-02-02',
    type: 'environmental_observance', typeLabel: 'Environmental Observance',
    primaryModule: 'Water Systems', primaryModuleSlug: 'water-systems',
    relatedSubmodules: ['Outdoor Classroom', 'Aquatic Ecology'],
    geographicCoverage: 'Hokersar & Wular Ramsar Sites', discipline: 'Wetland Conservation & Field Ornithology',
    targetParticipants: ['School Eco-Clubs', 'Wetland Rangers', 'Birders'],
    intendedOutput: 'World Wetlands Day 2027 Waterbird Count Card & School Report',
    timeIST: '09:00 - 13:00 IST', status: 'proposed', hostType: 'joint',
    linkedObservance: 'World Wetlands Day'
  },
  {
    id: 'obs-2027-03',
    title: 'World Water Day: Springs & Drinking-Water Audit',
    theme: 'Student-led testing of local village springheads, coliform strip assays, and drinking-water sanitation mapping',
    year: 2027, month: 3, monthName: 'March', dateDisplay: 'Mar 22, 2027', exactDate: '2027-03-22',
    type: 'environmental_observance', typeLabel: 'Environmental Observance',
    primaryModule: 'Water Systems', primaryModuleSlug: 'water-systems',
    relatedSubmodules: ['Outdoor Classroom', 'Environmental Monitoring'],
    geographicCoverage: 'Community Springs across Valley', discipline: 'Drinking Water Quality & Community Hydrology',
    targetParticipants: ['Middle & High School Students', 'Village Water Committees'],
    intendedOutput: 'Community Springhead Drinking Water Safety Scorecard',
    timeIST: '10:00 - 13:00 IST', status: 'proposed', hostType: 'kew-organized',
    linkedObservance: 'World Water Day'
  },
  {
    id: 'obs-2027-04',
    title: 'Earth Day: School Waste Audits & Environmental Reporting',
    theme: 'Single-use plastic weigh-ins, school compost bin installations, and youth investigative environmental reporting',
    year: 2027, month: 4, monthName: 'April', dateDisplay: 'Apr 22, 2027', exactDate: '2027-04-22',
    type: 'environmental_observance', typeLabel: 'Environmental Observance',
    primaryModule: 'Outdoor Classroom', primaryModuleSlug: 'outdoor-classroom',
    relatedSubmodules: ['Urban Ecology', 'Environmental Monitoring'],
    geographicCoverage: 'Participating Schools in Srinagar & Anantnag', discipline: 'Waste Minimization & Environmental Pedagogy',
    targetParticipants: ['School Students', 'Eco-Club Leaders', 'Civic Educators'],
    intendedOutput: 'School Waste Footprint Audit & Zero-Plastic Pledge',
    timeIST: '09:30 - 13:30 IST', status: 'proposed', hostType: 'kew-organized',
    linkedObservance: 'Earth Day'
  },
  {
    id: 'obs-2027-05',
    title: 'International Day for Biological Diversity: Native Flora & Wildlife Surveys',
    theme: 'Commemorating the Convention on Biological Diversity (May 22). Native wildflower tagging and avian bio-blitz',
    year: 2027, month: 5, monthName: 'May', dateDisplay: 'May 22, 2027', exactDate: '2027-05-22',
    type: 'environmental_observance', typeLabel: 'Environmental Observance',
    primaryModule: 'Biodiversity', primaryModuleSlug: 'biodiversity',
    relatedSubmodules: ['Outdoor Classroom', 'Protected Areas'],
    geographicCoverage: 'Dachigam National Park & Shankracharya Hill', discipline: 'Taxonomy & Biodiversity Bio-Blitz',
    targetParticipants: ['Youth Naturalists', 'Botany Students', 'Citizen Scientists'],
    intendedOutput: 'Biodiversity Day 2027 Bio-Blitz Species Catalogue',
    timeIST: '08:30 - 14:00 IST', status: 'proposed', hostType: 'joint',
    linkedObservance: 'International Day for Biological Diversity'
  },
  {
    id: 'obs-2027-06',
    title: 'World Environment Day: Student Environmental Science Exhibition',
    theme: 'UNEP World Environment Day (June 5). Student science poster presentations, GIS model displays, and eco-innovations',
    year: 2027, month: 6, monthName: 'June', dateDisplay: 'Jun 5, 2027', exactDate: '2027-06-05',
    type: 'environmental_observance', typeLabel: 'Environmental Observance',
    primaryModule: 'Outdoor Classroom', primaryModuleSlug: 'outdoor-classroom',
    relatedSubmodules: ['EcoVoices', 'Research Library & Open Data'],
    geographicCoverage: 'Srinagar Central Exhibition Hall & Virtual Stream', discipline: 'Environmental Science Exhibition',
    targetParticipants: ['K-12 Students', 'Science Teachers', 'Public Visitors'],
    intendedOutput: 'Student Environmental Innovation Showcase Compendium',
    timeIST: '10:00 - 16:00 IST', status: 'proposed', hostType: 'kew-organized',
    linkedObservance: 'World Environment Day'
  },
  {
    id: 'obs-2027-07',
    title: 'Van Mahotsav: Native Sapling Survival & Forest Health Program',
    theme: 'Planting and geotagging native birch, pine, and deodar saplings, tracking survival rates with smartphone telemetry',
    year: 2027, month: 7, monthName: 'July', dateDisplay: 'July 2027',
    type: 'environmental_observance', typeLabel: 'Environmental Observance',
    primaryModule: 'Forest & Landscape', primaryModuleSlug: 'protected-areas',
    relatedSubmodules: ['Outdoor Classroom', 'NGO Impact'],
    geographicCoverage: 'Degraded Forest Slopes of Budgam & Baramulla', discipline: 'Silviculture & Community Afforestation',
    targetParticipants: ['Eco-Clubs', 'Forest Protection Committees', 'NGO Volunteers'],
    intendedOutput: 'Van Mahotsav Geotagged Sapling Survival Register',
    timeIST: '09:00 - 13:00 IST', status: 'proposed', hostType: 'joint',
    linkedObservance: 'Van Mahotsav Forest Festival'
  },
  {
    id: 'obs-2027-08',
    title: 'Alpine Ecology, Mountain Trails & Citizen Science Month',
    theme: 'Responsible high-altitude trekking, pack-it-out waste ethics, alpine plant mapping, and citizen trail observations',
    year: 2027, month: 8, monthName: 'August', dateDisplay: 'August 2027',
    type: 'environmental_observance', typeLabel: 'Environmental Observance',
    primaryModule: 'Trails & Sightings', primaryModuleSlug: 'trails-sightings',
    relatedSubmodules: ['Outdoor Classroom', 'Tourism EIA'],
    geographicCoverage: 'Kashmir Great Lakes Trail & Tarsar Marsar Route', discipline: 'Mountain Stewardship & Trail Ecology',
    targetParticipants: ['Trekkers', 'Mountain Guides', 'Citizen Observers'],
    intendedOutput: 'Alpine Trail Environmental Health & Waste Audit Dossier',
    timeIST: 'Full Month Field Tracking', status: 'proposed', hostType: 'kew-organized',
    linkedObservance: 'Alpine Trail Month'
  },
  {
    id: 'obs-2027-09',
    title: 'World Ozone Day: Atmospheric Science Outreach',
    theme: 'Commemorating the Montreal Protocol (Sep 16). Atmospheric science demos, stratospheric ozone, and UV-B monitoring',
    year: 2027, month: 9, monthName: 'September', dateDisplay: 'Sep 16, 2027', exactDate: '2027-09-16',
    type: 'environmental_observance', typeLabel: 'Environmental Observance',
    primaryModule: 'Climate & Atmosphere', primaryModuleSlug: 'environmental-monitoring',
    relatedSubmodules: ['Outdoor Classroom', 'Environmental Monitoring'],
    geographicCoverage: 'High School & College Physics Laboratories', discipline: 'Atmospheric Chemistry & Physics',
    targetParticipants: ['Science Students', 'Physics Teachers', 'Climate Educators'],
    intendedOutput: 'World Ozone Day Atmospheric Education Module',
    timeIST: '11:00 - 13:30 IST', status: 'proposed', hostType: 'joint',
    linkedObservance: 'World Ozone Day'
  },
  {
    id: 'obs-2027-10',
    title: 'Wildlife Week: Protected-Area Ecology & Conservation Outreach',
    theme: 'National Wildlife Week (Oct 1–7). Dachigam field tours, wildlife documentary screenings, and anti-poaching dialogues',
    year: 2027, month: 10, monthName: 'October', dateDisplay: 'Oct 1–7, 2027', exactDate: '2027-10-01',
    daysCount: 7,
    type: 'environmental_observance', typeLabel: 'Environmental Observance',
    primaryModule: 'Protected Areas', primaryModuleSlug: 'protected-areas',
    relatedSubmodules: ['Biodiversity', 'Outdoor Classroom'],
    geographicCoverage: 'Protected Area Visitor Centers across J&K', discipline: 'Conservation Outreach & Wildlife Law',
    targetParticipants: ['Students', 'Families', 'Wildlife Enthusiasts'],
    intendedOutput: 'Wildlife Week Conservation Pledge & Species Guide',
    timeIST: '09:00 - 17:00 IST (Daily Sessions)', status: 'proposed', hostType: 'joint',
    linkedObservance: 'Wildlife Week'
  },
  {
    id: 'obs-2027-11',
    title: 'District Environmental Research & Student GIS Exhibition',
    theme: 'Students present local watershed GIS maps, neighborhood waste surveys, and district environmental scorecards',
    year: 2027, month: 11, monthName: 'November', dateDisplay: 'November 2027',
    type: 'environmental_observance', typeLabel: 'Environmental Observance',
    primaryModule: 'Outdoor Classroom', primaryModuleSlug: 'outdoor-classroom',
    relatedSubmodules: ['District Intelligence', 'Ecological Atlas'],
    geographicCoverage: 'District Science Centers', discipline: 'Spatial Education & Youth Research',
    targetParticipants: ['High School Geographers', 'District Officials', 'Teachers'],
    intendedOutput: 'Student District GIS Map Atlas Volume 1',
    timeIST: '10:00 - 15:00 IST', status: 'proposed', hostType: 'kew-organized',
    linkedObservance: 'GIS & Environment Month'
  },
  {
    id: 'obs-2027-12',
    title: 'International Mountain Day: Himalayan Conservation Dialogue',
    theme: 'UN International Mountain Day (Dec 11). Highlighting sustainable mountain development, glaciology, and youth voices',
    year: 2027, month: 12, monthName: 'December', dateDisplay: 'Dec 11, 2027', exactDate: '2027-12-11',
    type: 'environmental_observance', typeLabel: 'Environmental Observance',
    primaryModule: 'Cryosphere', primaryModuleSlug: 'cryosphere',
    relatedSubmodules: ['Outdoor Classroom', 'EcoVoices'],
    geographicCoverage: 'University of Kashmir Auditorium & Hybrid Hall', discipline: 'Mountain Studies & Sustainable Development',
    targetParticipants: ['Mountain Communities', 'Mountaineers', 'Researchers', 'Students'],
    intendedOutput: 'Himalayan Mountain Stewardship Declaration 2027',
    timeIST: '10:30 - 15:30 IST', status: 'proposed', hostType: 'joint',
    linkedObservance: 'International Mountain Day'
  },

  // 2028 Observances
  {
    id: 'obs-2028-01',
    title: 'Winter Air Quality, Snow Science & Community Observation Program',
    theme: 'Community particulate sensors, snow crystal morphology micro-photography, and winter temperature tracking',
    year: 2028, month: 1, monthName: 'January', dateDisplay: 'January 2028',
    type: 'environmental_observance', typeLabel: 'Environmental Observance',
    primaryModule: 'Climate & Atmosphere', primaryModuleSlug: 'environmental-monitoring',
    relatedSubmodules: ['Outdoor Classroom', 'Environmental Monitoring'],
    geographicCoverage: 'Srinagar Urban & Ski Slopes of Gulmarg', discipline: 'Snow Crystallography & Community Air Science',
    targetParticipants: ['School Science Clubs', 'Skiers', 'Community Observers'],
    intendedOutput: 'Community Winter Air & Snow Science Logbook',
    timeIST: '10:00 - 13:00 IST', status: 'proposed', hostType: 'kew-organized',
    linkedObservance: 'Winter Air Quality Month'
  },
  {
    id: 'obs-2028-02',
    title: 'World Wetlands Day: Urban Wetland Conservation & School Stewardship',
    theme: 'Convention on Wetlands 2028 Theme: Wetlands for sustainable cities. Highlighting urban wetland restoration',
    year: 2028, month: 2, monthName: 'February', dateDisplay: 'Feb 2, 2028', exactDate: '2028-02-02',
    type: 'environmental_observance', typeLabel: 'Environmental Observance',
    primaryModule: 'Water Systems', primaryModuleSlug: 'water-systems',
    relatedSubmodules: ['Outdoor Classroom', 'Urban Ecology'],
    geographicCoverage: 'Khushal Sar, Gilsar, and Dal Lake Littoral Zones', discipline: 'Urban Wetland Stewardship',
    targetParticipants: ['Urban High Schools', 'Citizen Volunteers', 'Municipal Staff'],
    intendedOutput: 'Urban Wetland Adoption & Stewardship Plan',
    timeIST: '09:30 - 13:30 IST', status: 'proposed', hostType: 'joint',
    linkedObservance: 'World Wetlands Day'
  },
  {
    id: 'obs-2028-03',
    title: 'World Water Day: Watershed & River Monitoring',
    theme: 'Student riverbank sampling, macro-invertebrate biotic index calculation, and Jhelum tributary health audits',
    year: 2028, month: 3, monthName: 'March', dateDisplay: 'Mar 22, 2028', exactDate: '2028-03-22',
    type: 'environmental_observance', typeLabel: 'Environmental Observance',
    primaryModule: 'Water Systems', primaryModuleSlug: 'water-systems',
    relatedSubmodules: ['Outdoor Classroom', 'Field Intelligence'],
    geographicCoverage: 'Jhelum River & Tributaries (Sindh, Rambiara, Doodh Ganga)', discipline: 'Bio-Monitoring & River Health',
    targetParticipants: ['College Biology Students', 'NGO Stream Keepers'],
    intendedOutput: 'Jhelum Tributary Macro-Invertebrate Biotic Index Report',
    timeIST: '10:00 - 14:00 IST', status: 'proposed', hostType: 'kew-organized',
    linkedObservance: 'World Water Day'
  },
  {
    id: 'obs-2028-04',
    title: 'Heritage Ecology, Chinar Conservation & Earth Week',
    theme: 'Apr 18 (International Day for Monuments and Sites) to Apr 22 (Earth Day). Chinar health surveys and cultural ecology',
    year: 2028, month: 4, monthName: 'April', dateDisplay: 'Apr 18–22, 2028', exactDate: '2028-04-18',
    daysCount: 5,
    type: 'environmental_observance', typeLabel: 'Environmental Observance',
    primaryModule: 'Forest & Landscape', primaryModuleSlug: 'protected-areas',
    relatedSubmodules: ['Outdoor Classroom', 'Urban Ecology'],
    geographicCoverage: 'Naseem Bagh, Shalimar, Bijbehara Chinar Groves', discipline: 'Arboriculture & Cultural Heritage Ecology',
    targetParticipants: ['Heritage Enthusiasts', 'Students', 'Urban Foresters'],
    intendedOutput: 'Historic Chinar Root Protection & Geo-Tagging Register',
    timeIST: '10:00 - 15:00 IST', status: 'proposed', hostType: 'joint',
    linkedObservance: 'Monuments and Sites (World Heritage Day) & Earth Week'
  },
  {
    id: 'obs-2028-05',
    title: 'Biodiversity Recovery, Pollinators & Species Monitoring',
    theme: 'International Day for Biological Diversity (May 22). Orchard pollinator counts, hedgerow restoration, and seed libraries',
    year: 2028, month: 5, monthName: 'May', dateDisplay: 'May 22, 2028', exactDate: '2028-05-22',
    type: 'environmental_observance', typeLabel: 'Environmental Observance',
    primaryModule: 'Biodiversity', primaryModuleSlug: 'biodiversity',
    relatedSubmodules: ['Outdoor Classroom', 'Horticulture EIA'],
    geographicCoverage: 'Model Agro-Ecology Farms in Pulwama & Baramulla', discipline: 'Pollinator Conservation & Agro-Ecology',
    targetParticipants: ['Orchardists', 'Youth Farmers', 'Students'],
    intendedOutput: 'Himalayan Orchard Pollinator Field Identification Card',
    timeIST: '09:00 - 14:00 IST', status: 'proposed', hostType: 'joint',
    linkedObservance: 'International Day for Biological Diversity'
  },
  {
    id: 'obs-2028-06',
    title: 'World Environment Day: Environmental Impact & Restoration Showcase',
    theme: 'World Environment Day (Jun 5). Showcasing community-led riverbank restoration, urban wetlands, and student scientific briefs',
    year: 2028, month: 6, monthName: 'June', dateDisplay: 'Jun 5, 2028', exactDate: '2028-06-05',
    type: 'environmental_observance', typeLabel: 'Environmental Observance',
    primaryModule: 'Outdoor Classroom', primaryModuleSlug: 'outdoor-classroom',
    relatedSubmodules: ['Sectoral EIA', 'EcoVoices'],
    geographicCoverage: 'Valley-wide Community Venues & Hybrid Platform', discipline: 'Restoration Science & Public Exhibition',
    targetParticipants: ['General Public', 'Policy Makers', 'Students', 'NGOs'],
    intendedOutput: 'Valley Ecological Restoration Showcase Monograph',
    timeIST: '10:00 - 16:30 IST', status: 'proposed', hostType: 'kew-organized',
    linkedObservance: 'World Environment Day'
  },
  {
    id: 'obs-2028-07',
    title: 'Forest Ecosystem Recovery & Community Stewardship Program',
    theme: 'Van Mahotsav month: Monitoring 2027 plantation plots, weeding, soil moisture conservation, and biodiversity recovery',
    year: 2028, month: 7, monthName: 'July', dateDisplay: 'July 2028',
    type: 'environmental_observance', typeLabel: 'Environmental Observance',
    primaryModule: 'Forest & Landscape', primaryModuleSlug: 'protected-areas',
    relatedSubmodules: ['Outdoor Classroom', 'NGO Impact'],
    geographicCoverage: 'Community Forest Management Plots', discipline: 'Restoration Silviculture',
    targetParticipants: ['Forest Stewards', 'Eco-Club Students', 'Local Communities'],
    intendedOutput: 'Two-Year Forest Recovery Survival Audit',
    timeIST: '09:00 - 13:00 IST', status: 'proposed', hostType: 'joint',
    linkedObservance: 'Van Mahotsav Forest Festival'
  },
  {
    id: 'obs-2028-08',
    title: 'High-Altitude Field Science, Glacier Observation & Responsible Tourism',
    theme: 'Alpine field science expedition: measuring seasonal snow line retreat, alpine lake water clarity, and waste cleanups',
    year: 2028, month: 8, monthName: 'August', dateDisplay: 'August 2028',
    type: 'environmental_observance', typeLabel: 'Environmental Observance',
    primaryModule: 'Cryosphere', primaryModuleSlug: 'cryosphere',
    relatedSubmodules: ['Trails & Sightings', 'Tourism EIA'],
    geographicCoverage: 'Thajiwas Glacier & Kolahoi Base Trail', discipline: 'High-Altitude Field Science',
    targetParticipants: ['Young Researchers', 'Mountaineering Students', 'Environmental Guides'],
    intendedOutput: 'High-Altitude Field Observation & Waste Baseline Record',
    timeIST: 'Full Expedition Logs', status: 'proposed', hostType: 'kew-organized',
    linkedObservance: 'Mountain Field Science Month'
  },
  {
    id: 'obs-2028-09',
    title: 'World Ozone Day: Climate & Air-Quality Science Education',
    theme: 'World Ozone Day (Sep 16). Air quality sensors hands-on calibration, climate change indicators, and clean air pledges',
    year: 2028, month: 9, monthName: 'September', dateDisplay: 'Sep 16, 2028', exactDate: '2028-09-16',
    type: 'environmental_observance', typeLabel: 'Environmental Observance',
    primaryModule: 'Climate & Atmosphere', primaryModuleSlug: 'environmental-monitoring',
    relatedSubmodules: ['Outdoor Classroom', 'Environmental Monitoring'],
    geographicCoverage: 'Secondary Schools Across 10 Districts', discipline: 'Atmospheric Education & Air Quality Monitoring',
    targetParticipants: ['Students', 'Teachers', 'Citizen Monitors'],
    intendedOutput: 'Youth Clean Air Action Guide & School Protocol',
    timeIST: '11:00 - 13:30 IST', status: 'proposed', hostType: 'joint',
    linkedObservance: 'World Ozone Day'
  },
  {
    id: 'obs-2028-10',
    title: 'Wildlife Week: Biodiversity Monitoring & Human-Wildlife Coexistence',
    theme: 'Wildlife Week (Oct 1–7). Community coexistence clinics in orchard belts, camera trap demonstrations, and bird walks',
    year: 2028, month: 10, monthName: 'October', dateDisplay: 'Oct 1–7, 2028', exactDate: '2028-10-01',
    daysCount: 7,
    type: 'environmental_observance', typeLabel: 'Environmental Observance',
    primaryModule: 'Protected Areas', primaryModuleSlug: 'protected-areas',
    relatedSubmodules: ['Biodiversity', 'Outdoor Classroom'],
    geographicCoverage: 'Wildlife Sanctuaries & Orchard Interfaces', discipline: 'Wildlife Coexistence & Community Outreach',
    targetParticipants: ['Farmers', 'School Children', 'Wildlife Volunteers'],
    intendedOutput: 'Community Wildlife Coexistence Handbook',
    timeIST: 'Daily Morning & Evening Field Sessions', status: 'proposed', hostType: 'joint',
    linkedObservance: 'Wildlife Week'
  },
  {
    id: 'obs-2028-11',
    title: 'Environmental Data, GIS & School Research Exhibition',
    theme: 'Culminating student GIS symposium: interactive digital maps of all 10 districts, biodiversity registers, and telemetry',
    year: 2028, month: 11, monthName: 'November', dateDisplay: 'November 2028',
    type: 'environmental_observance', typeLabel: 'Environmental Observance',
    primaryModule: 'Outdoor Classroom', primaryModuleSlug: 'outdoor-classroom',
    relatedSubmodules: ['District Intelligence', 'Ecological Atlas'],
    geographicCoverage: 'Kashmir EcoWatch Virtual Platform & Srinagar Venue', discipline: 'Youth Spatial Analytics & Cartography',
    targetParticipants: ['Student GIS Teams', 'Educators', 'Cartography Enthusiasts'],
    intendedOutput: 'Two-Year Student Environmental GIS Exhibition Catalog',
    timeIST: '10:00 - 16:00 IST', status: 'proposed', hostType: 'kew-organized',
    linkedObservance: 'GIS & Environment Month'
  },
  {
    id: 'obs-2028-12',
    title: 'International Mountain Day: 2028 Environmental Stewardship Review',
    theme: 'UN International Mountain Day (Dec 11). Celebrating two years of proposed scientific exchange, youth research, and conservation',
    year: 2028, month: 12, monthName: 'December', dateDisplay: 'Dec 11, 2028', exactDate: '2028-12-11',
    type: 'environmental_observance', typeLabel: 'Environmental Observance',
    primaryModule: 'Cryosphere', primaryModuleSlug: 'cryosphere',
    relatedSubmodules: ['Outdoor Classroom', 'EcoVoices', 'Research Library & Open Data'],
    geographicCoverage: 'Hybrid Pan-Himalayan Broadcast', discipline: 'Mountain Stewardship & Environmental Humanities',
    targetParticipants: ['Scientific Community', 'Youth Delegates', 'NGO Partners', 'International Observers'],
    intendedOutput: 'Two-Year Western Himalayan Environmental Stewardship Declaration',
    timeIST: '10:30 - 16:00 IST', status: 'proposed', hostType: 'joint',
    linkedObservance: 'International Mountain Day'
  }
];

// Helper functions for filtering and querying
export function getActivitiesByYear(year: 2027 | 2028) {
  return SCIENTIFIC_PROGRAM_ACTIVITIES.filter(a => a.year === year);
}

export function getActivitiesByType(type: ActivityType) {
  return SCIENTIFIC_PROGRAM_ACTIVITIES.filter(a => a.type === type);
}

export function getActivitiesByModule(moduleSlug: string) {
  return SCIENTIFIC_PROGRAM_ACTIVITIES.filter(
    a => a.primaryModuleSlug === moduleSlug || a.relatedSubmodules.some(s => s.toLowerCase().includes(moduleSlug.toLowerCase()))
  );
}

export function getFlagshipConferences() {
  return SCIENTIFIC_PROGRAM_ACTIVITIES.filter(a => a.type === 'flagship_conference');
}

export const MODULE_COVERAGE_MATRIX = [
  { domain: 'Protected Areas', coveredSubjects: 'National parks, sanctuaries, reserves, ecological corridors, management', period: '2027 Apr, Aug, Sep; 2028 May' },
  { domain: 'Biodiversity', coveredSubjects: 'Mammals, birds, fish, flora, threatened species, invasive species', period: '2027 Jul–Sep; 2028 May' },
  { domain: 'Seasonal Phenology', coveredSubjects: 'Spring blooms, alpine vegetation, autumn change, pollinators', period: '2027 Jun; 2028 May' },
  { domain: 'Water Systems', coveredSubjects: 'Lakes, wetlands, rivers, springs, groundwater, watersheds', period: '2027 Feb, Mar, Jul; 2028 Feb, Jul' },
  { domain: 'Aquatic Ecology', coveredSubjects: 'Eutrophication, algal blooms, water quality, aquatic habitats', period: '2027 Feb, Jul; 2028 Feb' },
  { domain: 'Environmental Monitoring', coveredSubjects: 'Air, noise, water quality, waste, wastewater, telemetry', period: '2027 Jan, Apr, Jun; 2028 Jan, Feb' },
  { domain: 'Hazard Intelligence', coveredSubjects: 'Flood, landslide, avalanche, seismic, wildfire, GLOF', period: '2027 May; 2028 Mar' },
  { domain: 'Climate & Atmosphere', coveredSubjects: 'Snow, climate variability, ozone, atmospheric pollution', period: '2027 Jan; 2028 Jan, Mar' },
  { domain: 'Earth & Human Impact', coveredSubjects: 'Land-use change, human impacts and cumulative pressures', period: '2027 Oct, Nov; 2028 Aug' },
  { domain: 'Satellite Change Detection', coveredSubjects: 'NDWI/MNDWI, vegetation indices, radar, time series, change attribution', period: '2027 Feb, May, Oct; 2028 Apr, Aug' },
  { domain: 'Forest & Landscape', coveredSubjects: 'Cover change, habitat fragmentation, treeline, restoration', period: '2027 Apr, Sep; 2028 Apr, Aug' },
  { domain: 'Cryosphere', coveredSubjects: 'Glaciers, snowpack, moraines, glacial lakes, runoff', period: '2027 May; 2028 Jan, Mar' },
  { domain: 'Urban Ecology', coveredSubjects: 'Urban expansion, heat islands, sewage, wetland encroachment', period: '2027 Apr, Nov; 2028 Feb, Apr' },
  { domain: 'Energy & Infrastructure', coveredSubjects: 'Hydropower, roads, infrastructure exposure, environmental impacts', period: '2027 Nov; 2028 Mar, Jul' },
  { domain: 'Mining & Extraction', coveredSubjects: 'Riverbed mining, quarrying, sediment, land degradation', period: '2027 Oct, Nov; 2028 Aug' },
  { domain: 'Tourism EIA', coveredSubjects: 'Tourist carrying capacity, accommodation footprints, waste, trails', period: '2028 Jun, Aug' },
  { domain: 'Horticulture EIA', coveredSubjects: 'Orchards, agrochemicals, water use, carbon and land-use change', period: '2028 May, Jun' },
  { domain: 'Handicrafts EIA', coveredSubjects: 'Materials, production processes, dyes, water, energy and lifecycle impacts', period: '2028 Jun' },
  { domain: 'Agriculture EIA', coveredSubjects: 'Irrigation, soil health, crop change, agricultural runoff', period: '2027 Mar; 2028 Jun, Jul' },
  { domain: 'Ecological Atlas', coveredSubjects: 'GIS tools, spatial layers, district maps, environmental change', period: '2027 Jan, Oct; 2028 Mar, Aug' },
  { domain: 'District Intelligence', coveredSubjects: 'Ecological scorecards, regional environmental comparisons', period: '2027 Dec; 2028 Nov' },
  { domain: 'Field Intelligence', coveredSubjects: 'Sampling, field reports, telemetry validation, evidence assessment', period: 'Throughout both years' },
  { domain: 'Trails & Sightings', coveredSubjects: 'Hiking ecology, wildlife observation, citizen science', period: '2027 Aug; 2028 Aug' },
  { domain: 'NGO Impact', coveredSubjects: 'NGO verification, restoration programs, volunteer contributions', period: '2028 Sep, Nov' },
  { domain: 'Outdoor Classroom', coveredSubjects: 'School fieldwork, eco-clubs, environmental education', period: 'Monthly observance program; 2028 Sep' },
  { domain: 'Environmental Calendar', coveredSubjects: 'Ecological observances, public science activities', period: 'Every month' },
  { domain: 'EcoVoices', coveredSubjects: 'Environmental music, poetry, communication and culture', period: '2028 Oct' },
  { domain: 'CSR & Grants', coveredSubjects: 'Institutional partnerships, restoration financing, measurable outcomes', period: '2027 Nov; 2028 Jun, Sep, Nov' },
  { domain: 'Research Library & Open Data', coveredSubjects: 'Evidence registry, provenance, reproducibility, proceedings', period: '2027 Jan, Dec; 2028 Dec' },
  { domain: 'Governance & Participation', coveredSubjects: 'Scientific ethics, public consultation, legal accountability', period: '2027 Nov; 2028 Oct, Dec' }
];
