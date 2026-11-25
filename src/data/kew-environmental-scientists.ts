// ─────────────────────────────────────────────────────────────────────────────
// KASHMIR ECOWATCH (KEW) — ENVIRONMENTAL SCIENTISTS & CONSERVATIONISTS REGISTRY
// Five-Region Scientific Research, Glaciology, Biodiversity & Field Ecology
// Coverage: Kashmir Valley, Jammu, Ladakh, AJ&K, Gilgit-Baltistan
// 75 Candidate Dossiers (50 Field Practitioners · 25 University Faculty)
// ─────────────────────────────────────────────────────────────────────────────

import type { KEWRegion } from './kew-green-heroes';

export type ScientificField =
  | 'Glaciology & Cryosphere'
  | 'Wetland & Limnology'
  | 'Wildlife Ecology & Carnivores'
  | 'Forest & Terrestrial Ecology'
  | 'Environmental Chemistry & Pollution'
  | 'Geospatial & Remote Sensing'
  | 'Botany & Mycology'
  | 'Conservation Education & Livelihoods'
  | 'Ethnobotany & Traditional Ecology'
  | 'Wildlife Rescue & Anti-Poaching';

export type CandidateTrack = 'FIELD_PRACTITIONER' | 'ACADEMIC_FACULTY' | 'GOVERNMENT_SCIENTIST';

export interface ScientistContribution {
  year: number | string;
  title: string;
  evidenceTier: string;
  description: string;
  documentedOutcome: string;
}

export interface ScientistSource {
  title: string;
  url: string;
  publicationType: string;
}

export interface EnvironmentalScientistDossier {
  id: string;
  name: string;
  honorific?: string;
  sortName?: string;
  sort_name?: string;
  designation: string;
  institution: string;
  region: KEWRegion;
  researchCoverage: string;
  activeWindow: string;
  trackType: CandidateTrack;
  fields: ScientificField[];
  fieldsSummary: string;
  editorialTribute: string;
  biography: string;
  keyImpact: string;
  documentedContributions: ScientistContribution[];
  sourceProvenance: ScientistSource[];
  researchStatus: string;
  evidenceAuditNotes: string;
  crossClassification?: string;
  linkedKewModules: Array<{ label: string; url: string }>;
}

export interface ScientistsRegistryTelemetry {
  candidateDossiers: number;
  regionsCovered: string;
  fieldPractitionersCount: number;
  academicFacultyCount: number;
  governmentScientistsCount: number;
  kewApproved: number;
  underScientificAudit: number;
  reviewDate: string;
}

export const SCIENTISTS_REGISTRY_TELEMETRY: ScientistsRegistryTelemetry = {
  candidateDossiers: 95,
  regionsCovered: '5/5',
  fieldPractitionersCount: 51,
  academicFacultyCount: 26,
  governmentScientistsCount: 18,
  kewApproved: 0,
  underScientificAudit: 95,
  reviewDate: 'November 22, 2026'
};

export interface UniversityFacultyRosterItem {
  id: string;
  scientistName: string;
  sortName?: string;
  sort_name?: string;
  designation: string;
  institution: string;
  department: string;
  region: KEWRegion;
  status: 'CURRENT_FACULTY' | 'FORMER_HEAD' | 'EMERITUS' | 'CONTRACTUAL' | 'SCIENTIFIC_OFFICER';
  scientificSpecialization: string;
  officialSourceUrl: string;
  kewResearchRelevance: string;
}

export const UNIVERSITY_FACULTY_REGISTRY: UniversityFacultyRosterItem[] = [
  // ─── University of Kashmir: CORD ──────────────────────────────────────────
  {
    id: 'uok-cord-01',
    scientistName: 'Prof. Bashir Ahmad Ganai',
    designation: 'Professor',
    institution: 'University of Kashmir',
    department: 'Centre of Research for Development (CORD)',
    region: 'Kashmir Valley',
    status: 'CURRENT_FACULTY',
    scientificSpecialization: 'Environmental biochemistry, toxicology, medicinal plants, biotechnology',
    officialSourceUrl: 'https://cord.uok.edu.in/Main/PeopleList.aspx',
    kewResearchRelevance: 'Biochemical indicators of water pollution and pharmacological plant evaluation'
  },
  {
    id: 'uok-cord-02',
    scientistName: 'Prof. Mohammad Niamat Ali',
    designation: 'Professor',
    institution: 'University of Kashmir',
    department: 'Centre of Research for Development (CORD)',
    region: 'Kashmir Valley',
    status: 'CURRENT_FACULTY',
    scientificSpecialization: 'Microbiology, genotoxicity, freshwater pollution bioassays',
    officialSourceUrl: 'https://cord.uok.edu.in/Main/PeopleList.aspx',
    kewResearchRelevance: 'Aquatic genotoxicity monitoring in Jhelum basin'
  },
  {
    id: 'uok-cord-03',
    scientistName: 'Dr. Ruqeya Nazir',
    designation: 'Associate Professor & Director',
    institution: 'University of Kashmir',
    department: 'Centre of Research for Development (CORD)',
    region: 'Kashmir Valley',
    status: 'CURRENT_FACULTY',
    scientificSpecialization: 'Environmental microbiology, microbial biotechnology, psychrophilic bacteria',
    officialSourceUrl: 'https://cord.uok.edu.in/Main/PeopleList.aspx',
    kewResearchRelevance: 'Cold-adapted microbial enzymes for high-altitude waste degradation'
  },
  {
    id: 'uok-cord-04',
    scientistName: 'Prof. A. R. Yousuf',
    designation: 'Former Director, CORD & Former Head, EVS (2000–2009)',
    institution: 'University of Kashmir / Former NGT Expert Member',
    department: 'CORD & Environmental Science',
    region: 'Kashmir Valley',
    status: 'FORMER_HEAD',
    scientificSpecialization: 'Limnology, fisheries, environmental impact assessments, wetland conservation',
    officialSourceUrl: 'https://envirsc.uok.edu.in/Files/ab1ac1f1-07e3-42a2-85bc-83717ef39155/Menu/PROFILE_EVS_2025_compressed_14f5bbfe-db8d-4cfa-a1b0-98c5015ede2c.pdf',
    kewResearchRelevance: 'Establishment of university EIA capability; NGT judicial expert rulings'
  },
  {
    id: 'uok-cord-05',
    scientistName: 'Prof. Azra Nahaid Kamili',
    designation: 'Former CORD Director, EVS Head & Dean',
    institution: 'University of Kashmir',
    department: 'CORD / Environmental Science',
    region: 'Kashmir Valley',
    status: 'FORMER_HEAD',
    scientificSpecialization: 'Plant tissue culture, conservation biology, endangered medicinal plants',
    officialSourceUrl: 'https://cord.uok.edu.in',
    kewResearchRelevance: 'Micropropagation of critically endangered Himalayan herbs'
  },

  // ─── University of Kashmir: Department of Environmental Science ───────────
  {
    id: 'uok-evs-01',
    scientistName: 'Dr. Sami Ullah Bhat',
    designation: 'Associate Professor & Head',
    institution: 'University of Kashmir',
    department: 'Department of Environmental Science',
    region: 'Kashmir Valley',
    status: 'CURRENT_FACULTY',
    scientificSpecialization: 'Freshwater springs, limnology, stream ecology, wetland conservation',
    officialSourceUrl: 'https://envirsc.uok.edu.in/Main/PeopleList.aspx',
    kewResearchRelevance: 'Spring hydrology and bioindicators of alpine water bodies'
  },
  {
    id: 'uok-evs-02',
    scientistName: 'Dr. Arshid Jehangir Bhat',
    designation: 'Associate Professor',
    institution: 'University of Kashmir',
    department: 'Department of Environmental Science',
    region: 'Kashmir Valley',
    status: 'CURRENT_FACULTY',
    scientificSpecialization: 'Air pollution, winter particulate dynamics, EIA methodology',
    officialSourceUrl: 'https://envirsc.uok.edu.in/Main/PeopleList.aspx',
    kewResearchRelevance: 'Srinagar bowl particulate telemetry and industrial compliance audits'
  },
  {
    id: 'uok-evs-03',
    scientistName: 'Dr. Mohammad Muslim',
    designation: 'Assistant Professor',
    institution: 'University of Kashmir',
    department: 'Department of Environmental Science',
    region: 'Kashmir Valley',
    status: 'CURRENT_FACULTY',
    scientificSpecialization: 'GIS, remote sensing, wetland spatial mapping, Jhelum hydrology',
    officialSourceUrl: 'https://envirsc.uok.edu.in/Main/PeopleList.aspx',
    kewResearchRelevance: 'Satellite land-use change mapping and flood retention area modeling'
  },

  // ─── University of Jammu: Department of Environmental Sciences ────────────
  {
    id: 'ju-evs-00',
    scientistName: 'Prof. S. P. S. Dutta',
    designation: 'Former Head, Department of Environmental Sciences | UGC Emeritus Professor',
    institution: 'University of Jammu',
    department: 'Department of Environmental Sciences',
    region: 'Jammu',
    status: 'EMERITUS',
    scientificSpecialization: 'Freshwater fish biodiversity, limnology, river ecology of Tawi, Chenab, Ravi and Basantar',
    officialSourceUrl: 'https://jammuuniversity.ac.in',
    kewResearchRelevance: 'Foundational freshwater fish taxonomy & water-quality baseline for Jammu division (1982–2025); Teacher of the KEW Founder'
  },
  {
    id: 'gdc-baramulla-evs-01',
    scientistName: 'Dr. Humaira Qadri',
    designation: 'Associate Professor & Head, Department of Environmental Science | Dean for Research',
    institution: 'Government Degree College Baramulla (Autonomous)',
    department: 'Department of Environmental Science / Former Head Environment & Water Management, SP College',
    region: 'Kashmir Valley',
    status: 'CURRENT_FACULTY',
    scientificSpecialization: 'Limnology, nutrient dynamics, aquatic macrophyte ecology, phytoremediation, Dal & Nigeen Lake conservation',
    officialSourceUrl: 'https://baramullacollege.net',
    kewResearchRelevance: 'Dal Lake & Rambiara stream limnochemistry, Hirpora vehicular emissions audit, aquatic weed biofertiliser invention'
  },
  {
    id: 'ju-evs-01',
    scientistName: 'Prof. Deepika Slathia',
    designation: 'Professor & Head',
    institution: 'University of Jammu',
    department: 'Department of Environmental Sciences',
    region: 'Jammu',
    status: 'CURRENT_FACULTY',
    scientificSpecialization: 'Aquatic ecosystem monitoring, phytoplankton, Mansar Lake biomonitoring',
    officialSourceUrl: 'https://jammuuniversity.ac.in/index.php/environmental-science/department-faculty',
    kewResearchRelevance: 'Mansar-Surinsar Ramsar site ecological scorecard'
  },
  {
    id: 'ju-evs-02',
    scientistName: 'Prof. Piyush Malaviya',
    designation: 'Professor',
    institution: 'University of Jammu',
    department: 'Department of Environmental Sciences',
    region: 'Jammu',
    status: 'CURRENT_FACULTY',
    scientificSpecialization: 'Phytoremediation, bioremediation, industrial ecotoxicology',
    officialSourceUrl: 'https://jammuuniversity.ac.in/index.php/environmental-science/department-faculty',
    kewResearchRelevance: 'Heavy metal bio-accumulation and wastewater mitigation'
  },
  {
    id: 'ju-evs-03',
    scientistName: 'Dr. Neeraj Sharma',
    designation: 'Associate Professor',
    institution: 'University of Jammu (Bhaderwah Campus)',
    department: 'Institute of Mountain Environment',
    region: 'Jammu',
    status: 'CURRENT_FACULTY',
    scientificSpecialization: 'Biodiversity, wildlife ecology, Kishtwar National Park fauna',
    officialSourceUrl: 'https://jammuuniversity.ac.in/index.php/environmental-science/department-faculty',
    kewResearchRelevance: 'Chenab Valley high-altitude biodiversity mapping'
  },
  {
    id: 'ju-evs-04',
    scientistName: 'Dr. Rakesh Kumar',
    designation: 'Associate Professor',
    institution: 'University of Jammu',
    department: 'Department of Environmental Sciences',
    region: 'Jammu',
    status: 'CURRENT_FACULTY',
    scientificSpecialization: 'Environmental geochemistry, groundwater chemistry, soil contamination',
    officialSourceUrl: 'https://jammuuniversity.ac.in/index.php/environmental-science/department-faculty',
    kewResearchRelevance: 'Subsurface aquifer contamination audits in Jammu Kandi belt'
  },

  // ─── Central University of Jammu: Environmental Sciences ──────────────────
  {
    id: 'cuj-evs-01',
    scientistName: 'Prof. Sunil Dhar',
    designation: 'Professor & Dean, School of Life Sciences',
    institution: 'Central University of Jammu',
    department: 'Department of Environmental Sciences',
    region: 'Jammu',
    status: 'CURRENT_FACULTY',
    scientificSpecialization: 'Glaciology, Himalayan geology, remote sensing',
    officialSourceUrl: 'https://cujammu.ac.in/employee/employee/SLFS/EVS/1/',
    kewResearchRelevance: 'Pir Panjal and Trans-Himalayan glacier hazard assessments'
  },
  {
    id: 'cuj-evs-02',
    scientistName: 'Prof. Richa Kothari',
    designation: 'Professor & Head',
    institution: 'Central University of Jammu',
    department: 'Department of Environmental Sciences',
    region: 'Jammu',
    status: 'CURRENT_FACULTY',
    scientificSpecialization: 'Wastewater treatment, algal biofuels, bioenergy',
    officialSourceUrl: 'https://cujammu.ac.in/employee/employee/SLFS/EVS/1/',
    kewResearchRelevance: 'Microalgae bioremediation of municipal effluents'
  },
  {
    id: 'cuj-evs-03',
    scientistName: 'Dr. Shweta Yadav',
    designation: 'Associate Professor',
    institution: 'Central University of Jammu',
    department: 'Department of Environmental Sciences',
    region: 'Jammu',
    status: 'CURRENT_FACULTY',
    scientificSpecialization: 'Air quality, atmospheric aerosols, climate and public health',
    officialSourceUrl: 'https://cujammu.ac.in/employee/employee/SLFS/EVS/1/',
    kewResearchRelevance: 'Transboundary aerosol transport and particulate health hazards'
  },

  // ─── Karakoram International University (KIU): Gilgit-Baltistan ────────────
  {
    id: 'kiu-evs-01',
    scientistName: 'Dr. Haibat Ali',
    designation: 'Associate Professor',
    institution: 'Karakoram International University',
    department: 'Department of Environmental Sciences',
    region: 'Gilgit-Baltistan',
    status: 'CURRENT_FACULTY',
    scientificSpecialization: 'Glacier hydrology, climate change impacts on Karakoram mountain systems',
    officialSourceUrl: 'https://www.kiu.edu.pk/departments/department-of-environmental-sciences',
    kewResearchRelevance: 'Cryospheric telemetry and stream runoff in the Gilgit river basin'
  },
  {
    id: 'kiu-evs-02',
    scientistName: 'Dr. Shaukat Ali',
    designation: 'Associate Professor',
    institution: 'Karakoram International University',
    department: 'Department of Environmental Sciences',
    region: 'Gilgit-Baltistan',
    status: 'CURRENT_FACULTY',
    scientificSpecialization: 'Environmental risk assessment, high-altitude hazard monitoring',
    officialSourceUrl: 'https://www.kiu.edu.pk/departments/department-of-environmental-sciences',
    kewResearchRelevance: 'GLOF early warning protocols and community risk assessments'
  },

  // ─── University of Baltistan, Skardu (UOBS) ───────────────────────────────
  {
    id: 'uobs-ees-01',
    scientistName: 'Syed Razi ul Hassan',
    designation: 'Lecturer & Head',
    institution: 'University of Baltistan',
    department: 'Earth & Environmental Sciences',
    region: 'Gilgit-Baltistan',
    status: 'CURRENT_FACULTY',
    scientificSpecialization: 'Mountain geosciences, glacial geomorphology, environmental mineralogy',
    officialSourceUrl: 'https://uobs.edu.pk/academics/departments/detail.php?slug=earth-and-environmental-sciences',
    kewResearchRelevance: 'Deosai plateau and Baltoro basin sediment load and slope hazards'
  },
  {
    id: 'uobs-ees-02',
    scientistName: 'Dr. Salar Ali',
    designation: 'Assistant Professor',
    institution: 'University of Baltistan',
    department: 'Earth & Environmental Sciences',
    region: 'Gilgit-Baltistan',
    status: 'CURRENT_FACULTY',
    scientificSpecialization: 'Geospatial modeling of cold-arid mountain ecosystems',
    officialSourceUrl: 'https://uobs.edu.pk/academics/departments/detail.php?slug=earth-and-environmental-sciences',
    kewResearchRelevance: 'Vegetation cover shifts and climate change in Baltistan'
  },

  // ─── University of Ladakh (UOL) ───────────────────────────────────────────
  {
    id: 'uol-01',
    scientistName: 'Dr. Muneer Ul Islam Najar',
    designation: 'Assistant Professor, Environmental Science',
    institution: 'University of Ladakh (GDC Drass)',
    department: 'Environmental Science',
    region: 'Ladakh',
    status: 'CURRENT_FACULTY',
    scientificSpecialization: 'Invasive alien species, cold-desert plant invasion ecology',
    officialSourceUrl: 'https://uol.ac.in',
    kewResearchRelevance: 'Monitoring alien invasive flora along the Zojila transport corridor'
  },
  {
    id: 'uol-02',
    scientistName: 'Dr. Hilal Ahmad Sheikh',
    designation: 'Assistant Professor, Geography',
    institution: 'University of Ladakh (Kargil Campus)',
    department: 'Department of Geography',
    region: 'Ladakh',
    status: 'CURRENT_FACULTY',
    scientificSpecialization: 'Himalayan hydrology, mountain springs, climate modeling in Suru Valley',
    officialSourceUrl: 'https://uol.ac.in',
    kewResearchRelevance: 'Water table fluctuations and seasonal meltwater timing in Kargil'
  },
  {
    id: 'uol-03',
    scientistName: 'Prof. Deldan Namgial',
    designation: 'Professor, Soil & Water Conservation',
    institution: 'University of Ladakh (Leh Campus)',
    department: 'Soil and Water Conservation Engineering',
    region: 'Ladakh',
    status: 'CURRENT_FACULTY',
    scientificSpecialization: 'Cold-arid micro-irrigation, artificial glacier harvesting, soil moisture',
    officialSourceUrl: 'https://uol.ac.in/departments/soil-water-conservation-engineering',
    kewResearchRelevance: 'High-altitude agricultural water conservation techniques'
  },

  // ─── University of Azad Jammu & Kashmir (UAJK) ────────────────────────────
  {
    id: 'uajk-01',
    scientistName: 'Prof. Dr. Nuzhat Shafi',
    designation: 'Professor & Chairperson, Department of Zoology',
    institution: 'University of Azad Jammu & Kashmir',
    department: 'Department of Zoology',
    region: 'Azad Jammu & Kashmir',
    status: 'CURRENT_FACULTY',
    scientificSpecialization: 'Fisheries biology, freshwater ecology, Mahseer conservation, water quality',
    officialSourceUrl: 'https://uajk.edu.pk/faculty-members/zoonuzhatshafi/',
    kewResearchRelevance: 'Poonch and Jhelum riverine fisheries and endangered Mahseer habitat'
  },
  {
    id: 'uajk-02',
    scientistName: 'Prof. Hamayun Shaheen',
    designation: 'Professor of Botany',
    institution: 'University of Azad Jammu & Kashmir',
    department: 'Department of Botany',
    region: 'Azad Jammu & Kashmir',
    status: 'CURRENT_FACULTY',
    scientificSpecialization: 'Forest vegetation ecology, carbon stocks, alpine plant community dynamics',
    officialSourceUrl: 'https://uajk.edu.pk',
    kewResearchRelevance: 'Neelum and Jhelum valley forest biomass and climate mitigation'
  },

  // ─── University of Poonch Rawalakot (UPR): AJ&K ───────────────────────────
  {
    id: 'upr-01',
    scientistName: 'Prof. Dr. Nasir Rahim',
    designation: 'Professor, Soil & Environmental Sciences',
    institution: 'University of Poonch Rawalakot',
    department: 'Soil & Environmental Sciences',
    region: 'Azad Jammu & Kashmir',
    status: 'CURRENT_FACULTY',
    scientificSpecialization: 'Soil health, conservation tillage, soil carbon retention',
    officialSourceUrl: 'https://upr.edu.pk/departments/soil-environmental-sciences',
    kewResearchRelevance: 'Terrace agriculture erosion control in steep Himalayan slopes'
  },
  {
    id: 'upr-02',
    scientistName: 'Dr. Shafique Ahmad',
    designation: 'Associate Professor, Botany',
    institution: 'University of Poonch Rawalakot',
    department: 'Department of Botany',
    region: 'Azad Jammu & Kashmir',
    status: 'CURRENT_FACULTY',
    scientificSpecialization: 'Plant physiological stress, climate impacts on mountain medicinal plants',
    officialSourceUrl: 'https://upr.edu.pk/faculty-members',
    kewResearchRelevance: 'Endangered medicinal flora conservation in Pir Panjal AJ&K'
  }
];

export const LINKED_SCIENTIFIC_MODULES_MAP = [
  { field: 'Glaciology & Cryosphere', kewModule: 'Cryosphere, Water Systems, Climate Intelligence', link: '/water-systems/glaciers' },
  { field: 'Wetland & Limnology', kewModule: 'Ramsar Wetlands, Lakes, Rivers and Springs', link: '/water-systems/lakes' },
  { field: 'Wildlife Ecology & Carnivores', kewModule: 'Protected Areas, Biodiversity, Species Directory', link: '/biodiversity/mammals' },
  { field: 'Forest & Terrestrial Ecology', kewModule: 'Forest Systems, Land Degradation', link: '/biodiversity/forest-ecosystems' },
  { field: 'Environmental Chemistry & Pollution', kewModule: 'Air Quality, Water Quality, SEIAE Scientific Reports', link: '/environmental-monitoring/air-pollution' },
  { field: 'Geospatial & Remote Sensing', kewModule: 'Open Data Portal, GIS Atlas, Hazard Dashboards', link: '/open-data' },
  { field: 'Botany & Mycology', kewModule: 'Flora Intelligence, Medicinal Plants Atlas', link: '/biodiversity/plants' },
  { field: 'Conservation Education & Livelihoods', kewModule: 'Outdoor Classroom, Green Heroes Directory', link: '/environmental-calendar/outdoor-classroom/field-learning-programs' },
  { field: 'Wildlife Rescue & Anti-Poaching', kewModule: 'Human-Wildlife Conflict, Environmental Crime Registry', link: '/protected-network/human-wildlife-conflict' }
];

export const ENVIRONMENTAL_SCIENTISTS_DOSSIERS: EnvironmentalScientistDossier[] = [
  // ───────────────────────────────────────────────────────────────────────────
  // PART 1: CORE SCIENTIFIC HEROES (Original 25 + Historical Yousuf)
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'sci-001',
    name: 'Shakil Ahmad Romshoo',
    honorific: 'Prof.',
    designation: 'Glaciologist, Hydrologist and Geospatial Scientist',
    institution: 'University of Kashmir / IUST Awantipora',
    region: 'Kashmir Valley',
    researchCoverage: 'Kashmir Valley · Srinagar / Awantipora · Upper Indus Basin',
    activeWindow: 'Research: 1995–2026',
    trackType: 'ACADEMIC_FACULTY',
    fields: ['Glaciology & Cryosphere', 'Geospatial & Remote Sensing'],
    fieldsSummary: 'Glaciology, cryosphere, hydrology, GIS and climate-driven water resource modeling',
    editorialTribute: '“Scientific understanding of Himalayan glaciers is essential to protecting the region\'s water future.”',
    biography:
      'Prof. Romshoo has spent decades researching Western Himalayan glaciers, climate change, hydrology, and geospatial environmental monitoring. His work includes glacier inventories, climate-driven water-resource assessments, and applications of satellite imagery to environmental hazards across the Indus Basin.',
    keyImpact: 'Research informing glacier monitoring and water-security planning in the Western Himalaya',
    documentedContributions: [
      {
        year: 2025,
        title: 'Northwestern Himalayan Glacier Inventory Assessment',
        evidenceTier: 'PEER-REVIEWED SCIENTIFIC PUBLICATION',
        description: 'Coauthored research comparing satellite glacier inventories and area changes between 2000 and 2020 across Kashmir.',
        documentedOutcome: 'Published scientific evidence on multi-decadal glacier area and volume shrinkage.'
      },
      {
        year: 2025,
        title: 'Upper Indus & Jhelum Hydrological Modeling',
        evidenceTier: 'PEER-REVIEWED SCIENTIFIC PUBLICATION',
        description: 'Contributed to climate-scenario research examining future glacier melt runoff and streamflow volatility.',
        documentedOutcome: 'Model-based projections relevant to regional agricultural water planning.'
      }
    ],
    sourceProvenance: [
      { title: 'University of Kashmir Cryospheric Research Laboratory', url: 'https://hcrl.uok.edu.in', publicationType: 'University Lab Repository' },
      { title: 'PubMed: Northwestern Himalayan Glacier Inventory Study', url: 'https://pubmed.ncbi.nlm.nih.gov/39920390/', publicationType: 'Peer-Reviewed Journal' }
    ],
    researchStatus: 'SCIENTIFIC RECORD · Institutional and peer-reviewed publications verified',
    evidenceAuditNotes: 'Peer-reviewed publications independently confirmed via OpenAlex (A5026098954) and ORCID (0000-0003-0070-5564); h-index 46.',
    linkedKewModules: [
      { label: 'Cryosphere & Glaciers', url: '/water-systems/glaciers' },
      { label: 'Water Systems', url: '/water-systems' }
    ]
  },
  {
    id: 'sci-002',
    name: 'A. K. Pandit',
    honorific: 'Prof.',
    designation: 'Ecologist, Limnologist & Former Professor',
    institution: 'Department of Environmental Science, University of Kashmir',
    region: 'Kashmir Valley',
    researchCoverage: 'Kashmir Valley · Dal Lake, Nilnag, Wular & Hokersar',
    activeWindow: 'Historical research portfolio (1978–2018)',
    trackType: 'ACADEMIC_FACULTY',
    fields: ['Wetland & Limnology', 'Forest & Terrestrial Ecology'],
    fieldsSummary: 'Limnology, freshwater ecosystems, wetland ecology and macro-invertebrate biomonitoring',
    editorialTribute: '“Decades of ecological scholarship documenting the freshwater systems of Kashmir.”',
    biography:
      'Prof. A. K. Pandit has an extensive research record in wetland ecology, freshwater ecosystems, fish ecology, ecosystem analysis and conservation ecology. The University of Kashmir departmental history records more than 200 research articles, several monographs, and seminal conservation baseline studies of Dal Lake, Nilnag Lake and Hokersar.',
    keyImpact: 'Long-term scientific documentation of Kashmir\'s lakes and wetlands',
    documentedContributions: [
      {
        year: 2004,
        title: 'Dal and Nilnag Lakes Ecological Limnology',
        evidenceTier: 'UNIVERSITY RESEARCH RECORD',
        description: 'Participated in conservation-oriented scientific research on Kashmir\'s freshwater lakes and trophic statuses.',
        documentedOutcome: 'Foundational baseline records preserved in departmental archives.'
      }
    ],
    sourceProvenance: [
      { title: 'University of Kashmir Departmental Profile (Page 16)', url: 'https://envirsc.uok.edu.in', publicationType: 'Institutional Monograph' }
    ],
    researchStatus: 'HISTORICAL SCIENTIFIC RECORD · Institutional historical record verified',
    evidenceAuditNotes: 'Historical institutional record; individual publications indexed in academic bibliographies.',
    linkedKewModules: [{ label: 'Ramsar Wetlands', url: '/water-systems/wetlands' }]
  },
  {
    id: 'sci-003',
    name: 'Sami Ullah Bhat',
    honorific: 'Dr.',
    designation: 'Associate Professor & Head, Environmental Science',
    institution: 'University of Kashmir',
    region: 'Kashmir Valley',
    researchCoverage: 'Kashmir Valley · Srinagar / Kulgam / Pir Panjal Springs',
    activeWindow: 'Research: 2008–2026',
    trackType: 'ACADEMIC_FACULTY',
    fields: ['Wetland & Limnology', 'Environmental Chemistry & Pollution'],
    fieldsSummary: 'Limnology, stream ecology, wetland ecology and freshwater spring ecology',
    editorialTribute: '“Understanding springs and wetlands is foundational to conserving mountain freshwater ecosystems.”',
    biography:
      'Dr. Sami Ullah Bhat specializes in limnology, stream ecology, wetland ecology and spring ecology. His doctoral and faculty research examined the physical, chemical, and biological dynamics of freshwater springs across Kashmir, providing a scientific basis for preserving these vital mountain freshwater sources.',
    keyImpact: 'Scientific research on Kashmir\'s springs, streams and wetland ecosystems',
    documentedContributions: [
      {
        year: 2014,
        title: 'Freshwater Springs of Kashmir: Limnological & Bacteriological Characterization',
        evidenceTier: 'ACADEMIC RESEARCH',
        description: 'Investigated water chemistry, macroinvertebrate communities, and coliform contamination in rural springs.',
        documentedOutcome: 'University-recorded research establishing baseline vulnerability of Kashmir mountain springs.'
      }
    ],
    sourceProvenance: [
      { title: 'University of Kashmir Faculty Profile: Dr. Sami Ullah Bhat', url: 'https://envirsc.uok.edu.in', publicationType: 'Faculty Directory' }
    ],
    researchStatus: 'UNIVERSITY DOCUMENTED · Academic credentials and specialization confirmed',
    evidenceAuditNotes: 'Verified faculty member; doctoral dissertation on spring limnology preserved in university archives.',
    linkedKewModules: [{ label: 'Water Systems: Springs', url: '/water-systems/springs' }]
  },
  {
    id: 'sci-004',
    name: 'Arshid Jehangir',
    honorific: 'Dr.',
    designation: 'Associate Professor, Department of Environmental Science',
    institution: 'University of Kashmir',
    region: 'Kashmir Valley',
    researchCoverage: 'Kashmir Valley · Srinagar · Air Basins & EIA Zones',
    activeWindow: 'Research: 2009–2026',
    trackType: 'ACADEMIC_FACULTY',
    fields: ['Environmental Chemistry & Pollution', 'Forest & Terrestrial Ecology'],
    fieldsSummary: 'Terrestrial ecology, air pollution, air quality, particulate matter, and environmental impact assessment',
    editorialTribute: '“Scientific assessment of air, climate and land systems supports informed environmental decisions.”',
    biography:
      'Dr. Jehangir\'s documented research specializations include terrestrial ecology, air pollution monitoring, winter particulate matter (PM2.5) dynamics in the Srinagar bowl, and environmental impact assessment (EIA). His work informs regulatory air quality and industrial planning.',
    keyImpact: 'Academic expertise in air quality, terrestrial ecology and environmental impact assessment',
    documentedContributions: [
      {
        year: 2020,
        title: 'Winter Inversion & Particulate Matter Dynamics in Srinagar Bowl',
        evidenceTier: 'UNIVERSITY FACULTY RECORD',
        description: 'Monitored wood and biomass combustion emissions trapped by thermal inversions in the Kashmir valley.',
        documentedOutcome: 'Academic specialization independently confirmed; data relevant to seasonal air quality mitigation.'
      }
    ],
    sourceProvenance: [
      { title: 'University of Kashmir Faculty Record: Dr. Arshid Jehangir', url: 'https://envirsc.uok.edu.in', publicationType: 'Faculty Directory' }
    ],
    researchStatus: 'SCIENTIFIC RECORD · Institutional credentials confirmed',
    evidenceAuditNotes: 'Active university researcher in air quality telemetry and industrial EIA review.',
    linkedKewModules: [{ label: 'Air Quality Monitoring', url: '/environmental-monitoring/air-pollution' }]
  },
  {
    id: 'sci-005',
    name: 'Mohammad Muslim',
    honorific: 'Dr.',
    designation: 'Environmental Scientist | Remote Sensing & GIS',
    institution: 'Department of Environmental Science, University of Kashmir',
    region: 'Kashmir Valley',
    researchCoverage: 'Kashmir Valley · Jhelum Basin',
    activeWindow: 'Research: 2011–2026',
    trackType: 'ACADEMIC_FACULTY',
    fields: ['Geospatial & Remote Sensing', 'Wetland & Limnology'],
    fieldsSummary: 'Remote sensing, GIS, wetland inventory, biodiversity mapping, land-use change and Jhelum Basin hydrology',
    editorialTribute: '“Mapping environmental change makes ecological pressures visible and measurable.”',
    biography:
      'Dr. Mohammad Muslim specializes in satellite remote sensing and GIS applications at the University of Kashmir. His research documents wetland shrinkages, forest canopy loss, land-use conversions, and Jhelum Basin hydrological modelling using multi-spectral satellite imagery.',
    keyImpact: 'Geospatial characterization of environmental resources and ecological change',
    documentedContributions: [
      {
        year: 2018,
        title: 'Satellite Wetland Inventory & Biodiversity Mapping in Kashmir Himalaya',
        evidenceTier: 'INSTITUTIONAL RESEARCH RECORD',
        description: 'Utilized Landsat and Sentinel imagery to map changes in surface water spread across Ramsar sites.',
        documentedOutcome: 'Research contributions recorded in departmental profile; spatial datasets compiled.'
      }
    ],
    sourceProvenance: [
      { title: 'Faculty Profile: Dr. Mohammad Muslim', url: 'https://envirsc.uok.edu.in', publicationType: 'Faculty Directory' }
    ],
    researchStatus: 'SCIENTIFIC RECORD · University research documentation confirmed',
    evidenceAuditNotes: 'Geospatial research outputs integrated with departmental environmental databases.',
    linkedKewModules: [{ label: 'Open Data Portal', url: '/open-data' }]
  },
  {
    id: 'sci-006',
    name: 'Sajjad Ul Akbar Wani',
    honorific: 'Dr.',
    designation: 'Ornithologist & Wildlife Ecologist',
    institution: 'Independent Wetland Bird Research / Conservation Ecology',
    region: 'Kashmir Valley',
    researchCoverage: 'Kashmir Valley · Chandhara, Kranchu, Hokersar & Haigam Wetlands',
    activeWindow: 'Research: 2017–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Wildlife Ecology & Carnivores', 'Wetland & Limnology'],
    fieldsSummary: 'Avian biodiversity, migratory waterfowl, wetland ornithology and Central Asian Flyway monitoring',
    editorialTribute: '“Reliable bird records are essential to understanding changes in wetland habitats.”',
    biography:
      'Dr. Wani has researched bird ecology and migratory dynamics across Kashmir\'s wetland landscapes. In 2019, he brought scientific rigor to regional bird records by challenging an uncorroborated official claim of a first-time sighting of bar-headed geese in Kashmir, citing his earlier published field records in the Chandhara–Kranchu wetlands.',
    keyImpact: 'Scientific scrutiny of wetland bird occurrence and migratory flyway records',
    documentedContributions: [
      {
        year: 2019,
        title: 'Wetland Ornithological Documentation & Occurrence Verification',
        evidenceTier: 'SCIENTIFIC RESEARCH REPORTED BY INDEPENDENT MEDIA',
        description: 'Provided documented field records of bar-headed geese in Chandhara wetlands, establishing accurate migratory presence.',
        documentedOutcome: 'Published scientific correction to official wildlife agency claim; strengthened regional ornithological record.'
      }
    ],
    sourceProvenance: [
      { title: 'Kashmir Reader: Researcher Rebuts Wildlife Dept Claim', url: 'https://kashmirreader.com', publicationType: 'News Investigation' }
    ],
    researchStatus: 'DOCUMENTED RESEARCHER · Field research activity verified in public scientific record',
    evidenceAuditNotes: 'Ornithological field studies documented; original research papers undergoing integration into bird registry.',
    linkedKewModules: [{ label: 'Avian Biodiversity', url: '/biodiversity/birds' }]
  },

  // ─── Jammu Core (4) ────────────────────────────────────────────────────────
  {
    id: 'sci-007',
    name: 'Deepika Slathia',
    honorific: 'Prof.',
    designation: 'Professor & Head, Department of Environmental Sciences',
    institution: 'University of Jammu',
    region: 'Jammu',
    researchCoverage: 'Jammu · Jammu City / Mansar–Surinsar Lake Complex',
    activeWindow: 'Research: 2012–2026',
    trackType: 'ACADEMIC_FACULTY',
    fields: ['Wetland & Limnology', 'Environmental Chemistry & Pollution'],
    fieldsSummary: 'Aquatic ecosystem monitoring, limnology, phytoplankton biomonitoring, macrophyte diversity and water microbiology',
    editorialTribute: '“Aquatic ecosystem monitoring provides evidence for wetland conservation.”',
    biography:
      'Prof. Slathia specializes in aquatic ecosystem monitoring, limnology and environmental microbiology. Her research investigates the Ramsar-designated Mansar–Surinsar lake complex, Jammu\'s subtropical wetlands, and water-quality assessment of major rivers and rural drinking-water sources.',
    keyImpact: 'Scientific monitoring and documentation of Jammu\'s wetlands and water quality',
    documentedContributions: [
      {
        year: 2021,
        title: 'Aquatic Plant Diversity in Jammu Subtropical Wetlands',
        evidenceTier: 'PEER-REVIEWED RESEARCH',
        description: 'Coauthored an extensive empirical assessment of macrophyte composition and invasive weed spread across Jammu wetlands.',
        documentedOutcome: 'Published biological baseline for wetland conservation assessment.'
      }
    ],
    sourceProvenance: [
      { title: 'University of Jammu Publication Catalogue', url: 'https://jammuuniversity.ac.in', publicationType: 'Institutional Bibliography' }
    ],
    researchStatus: 'PEER-REVIEWED RESEARCH · Published research documented',
    evidenceAuditNotes: 'Documented publications on Mansar and Surinsar Ramsar sites confirmed via University of Jammu research portal.',
    linkedKewModules: [{ label: 'Lakes Scorecard: Mansar', url: '/water-systems/lakes' }]
  },
  {
    id: 'sci-008',
    name: 'Piyush Malaviya',
    honorific: 'Prof.',
    designation: 'Professor of Environmental Sciences',
    institution: 'University of Jammu',
    region: 'Jammu',
    researchCoverage: 'Jammu · Industrial corridors and riverine basins',
    activeWindow: 'Research: 2005–2026',
    trackType: 'ACADEMIC_FACULTY',
    fields: ['Environmental Chemistry & Pollution', 'Forest & Terrestrial Ecology'],
    fieldsSummary: 'Plant ecotoxicology, phytoremediation, bioremediation of industrial effluents, nature-based solutions, and green infrastructure',
    editorialTribute: '“Bioremediation research investigates how natural systems can help address pollution.”',
    biography:
      'Prof. Malaviya\'s research examines biological pollution treatment, using native plant and bacterial species to remediate industrial heavy metals, pesticides, and municipal effluents. His work connects environmental chemistry with practical ecological restoration.',
    keyImpact: 'Academic research on ecological methods of pollution treatment',
    documentedContributions: [
      {
        year: 2019,
        title: 'Phytoremediation of Heavy Metals Using Indigenous Macrophytes',
        evidenceTier: 'INSTITUTIONAL RESEARCH PROFILE',
        description: 'Evaluated bio-accumulation capacities of native aquatic plants in treating municipal and industrial runoff.',
        documentedOutcome: 'Scientific specialization established; experimental bioremediation protocols documented.'
      }
    ],
    sourceProvenance: [
      { title: 'University of Jammu Faculty Listing', url: 'https://jammuuniversity.ac.in', publicationType: 'Faculty Directory' }
    ],
    researchStatus: 'UNIVERSITY DOCUMENTED · Institutional record confirmed',
    evidenceAuditNotes: 'Active faculty researcher; published studies on bioremediation and industrial effluent mitigation.',
    linkedKewModules: [{ label: 'Water Restoration', url: '/water-systems/restoration' }]
  },
  {
    id: 'sci-009',
    name: 'Anil K. Raina',
    honorific: 'Prof.',
    designation: 'Environmental Scientist & Forest Ecologist',
    institution: 'University of Jammu',
    region: 'Jammu',
    researchCoverage: 'Jammu · Bhaderwah / Surinsar / Dudu Forest Range',
    activeWindow: 'Research: 2002–2025',
    trackType: 'ACADEMIC_FACULTY',
    fields: ['Forest & Terrestrial Ecology', 'Wetland & Limnology'],
    fieldsSummary: 'Forest ecology, tree diversity along elevation gradients, soil biogeochemistry, and mountain stream water quality',
    editorialTribute: '“Mountain forest and freshwater studies build the evidence needed for conservation planning.”',
    biography:
      'Prof. Raina\'s scholarly work includes forest community dynamics, tree species richness across the altitudinal gradients of the Pir Panjal and Chenab valleys, and baseline water-quality datasets for mountain streams in Bhaderwah.',
    keyImpact: 'Published ecological evidence on Jammu\'s forests and freshwater systems',
    documentedContributions: [
      {
        year: 2018,
        title: 'Dudu Forest Range Tree Diversity & Elevation Gradients',
        evidenceTier: 'PEER-REVIEWED RESEARCH',
        description: 'Coauthored research analyzing tree composition, canopy density and altitudinal distribution in Jammu mountain forests.',
        documentedOutcome: 'Published forest-ecology baseline for regional forestry management.'
      }
    ],
    sourceProvenance: [
      { title: 'University of Jammu Research Publications Catalogue', url: 'https://jammuuniversity.ac.in', publicationType: 'Research Catalogue' }
    ],
    researchStatus: 'ACADEMIC PUBLICATIONS · Coauthored publications documented',
    evidenceAuditNotes: 'Verified peer-reviewed publications on Chenab Basin forest diversity and stream hydrology.',
    linkedKewModules: [{ label: 'Forest Ecosystems', url: '/biodiversity/forest-ecosystems' }]
  },
  {
    id: 'sci-010',
    name: 'Neeraj Sharma',
    honorific: 'Dr.',
    designation: 'Associate Professor, Biodiversity & Wildlife Ecology',
    institution: 'Institute of Mountain Environment / University of Jammu (Bhaderwah Campus)',
    region: 'Jammu',
    researchCoverage: 'Jammu · Chenab Valley, Kishtwar, Bhaderwah',
    activeWindow: 'Research: 2010–2026',
    trackType: 'ACADEMIC_FACULTY',
    fields: ['Wildlife Ecology & Carnivores', 'Forest & Terrestrial Ecology'],
    fieldsSummary: 'Biodiversity, wildlife ecology, high-altitude fauna, human-wildlife conflict and alpine meadow ecology',
    editorialTribute: '“Understanding species and ecosystems is the foundation of effective biodiversity conservation.”',
    biography:
      'Dr. Neeraj Sharma is an ecologist at the University of Jammu specializing in biodiversity surveys, wildlife monitoring in Kishtwar High Altitude National Park, alpine flora, and conservation biology in the rugged mountains of the Chenab region.',
    keyImpact: 'Academic expertise in biodiversity and wildlife ecology across the Chenab Valley',
    documentedContributions: [
      {
        year: 2020,
        title: 'Biodiversity & Mammalian Inventories of Kishtwar High Altitude National Park',
        evidenceTier: 'INSTITUTIONAL FACULTY RECORD',
        description: 'Conducted field surveys documenting snow leopard prey species, musk deer, and Himalayan brown bear habitats.',
        documentedOutcome: 'Credentials and field surveys established; publication-level audit ongoing.'
      }
    ],
    sourceProvenance: [
      { title: 'University of Jammu Faculty Directory', url: 'https://jammuuniversity.ac.in', publicationType: 'Faculty Directory' }
    ],
    researchStatus: 'UNIVERSITY DOCUMENTED · Academic credentials confirmed',
    evidenceAuditNotes: 'Specialized focus on mountain biodiversity in the Chenab Basin.',
    linkedKewModules: [{ label: 'Protected Areas: Kishtwar', url: '/protected-network/atlas' }]
  },

  // ─── Ladakh Core (6) ───────────────────────────────────────────────────────
  {
    id: 'sci-011',
    name: 'Tsewang Namgail',
    honorific: 'Dr.',
    designation: 'Director and Wildlife Ecologist',
    institution: 'Snow Leopard Conservancy India Trust (SLC-IT)',
    region: 'Ladakh',
    researchCoverage: 'Ladakh · Trans-Himalayan landscapes, Hemis, Changthang',
    activeWindow: 'Leadership: 2013–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Wildlife Ecology & Carnivores', 'Conservation Education & Livelihoods'],
    fieldsSummary: 'Snow leopard ecology, mountain birds, human-wildlife coexistence and community-based wildlife protection',
    editorialTribute: '“Conservation succeeds when wildlife protection and community livelihoods reinforce each other.”',
    biography:
      'Dr. Tsewang Namgail is an internationally recognized wildlife ecologist who has directed the Snow Leopard Conservancy India Trust since 2013. His work combines predator-proof livestock corrals, community homestays, and empirical field monitoring of snow leopards and high-altitude avifauna.',
    keyImpact: 'Science-based snow leopard conservation integrated with local pastoral livelihoods',
    documentedContributions: [
      {
        year: 2013,
        title: 'Community-Based Snow Leopard Conservation Program Direction',
        evidenceTier: 'CONSERVATION PROGRAM RECORD',
        description: 'Expanded predator-proof corral construction and community livestock insurance across over 40 Ladakhi villages.',
        documentedOutcome: 'Established enduring institutional conservation models reducing retaliatory killing of snow leopards.'
      }
    ],
    sourceProvenance: [
      { title: 'Snow Leopard Conservancy Official Biography', url: 'https://snowleopardindia.org', publicationType: 'Institutional Biography' }
    ],
    researchStatus: 'CONSERVATION LEADERSHIP · Independently verified',
    evidenceAuditNotes: 'Direct field leadership and research bibliographies verified in international wildlife databases.',
    linkedKewModules: [{ label: 'Protected Areas: Hemis', url: '/protected-network/atlas' }]
  },
  {
    id: 'sci-012',
    name: 'Rinchen Wangchuk',
    honorific: 'Late',
    designation: 'Co-founder & Founder-Director',
    institution: 'Snow Leopard Conservancy India Trust',
    region: 'Ladakh',
    researchCoverage: 'Ladakh · Leh, Rumbak Valley, Hemis National Park',
    activeWindow: 'Conservation Legacy: 2003–2011',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Wildlife Ecology & Carnivores', 'Conservation Education & Livelihoods'],
    fieldsSummary: 'Pioneering community-based snow leopard conservation, Himalayan homestays and livestock protection',
    editorialTribute: '“His work helped make communities partners in protecting the snow leopard.”',
    biography:
      'Rinchen Wangchuk (also known as Ashok) was a visionary Ladakhi mountaineer and conservationist who co-founded the Snow Leopard Conservancy India Trust with Rodney Jackson. He developed the world-renowned Himalayan Homestays program in Rumbak Valley.',
    keyImpact: 'Foundational community-led snow leopard conservation and ecotourism in Ladakh',
    documentedContributions: [
      {
        year: 2003,
        title: 'Establishment of Snow Leopard Conservancy India Trust & Himalayan Homestays',
        evidenceTier: 'INSTITUTIONAL HISTORY',
        description: 'Co-founded SLC-IT and established community-run homestays to replace lost livestock income with eco-tourism revenue.',
        documentedOutcome: 'Pioneered a globally replicated model for community-based carnivore coexistence.'
      }
    ],
    sourceProvenance: [
      { title: 'Official Institutional History: Snow Leopard Conservancy India', url: 'https://snowleopardindia.org', publicationType: 'Institutional History' }
    ],
    researchStatus: 'HISTORICAL CONSERVATION HERO · Documented conservation legacy',
    evidenceAuditNotes: 'Died from illness in March 2011; recognized as a foundational historical conservation leader.',
    linkedKewModules: [{ label: 'Green Heroes Legacy Hall', url: '/resources/kew-green-heroes?tab=recognition-archives' }]
  },
  {
    id: 'sci-013',
    name: 'Jigmet Takpa',
    honorific: 'IFS',
    designation: 'Former Principal Chief Conservator of Forests, Ladakh',
    institution: 'Department of Forest, Ecology & Environment, UT Ladakh',
    region: 'Ladakh',
    researchCoverage: 'Ladakh · Trans-Himalayan protected area network, Hemis',
    activeWindow: 'Service: 1990–2025',
    trackType: 'ACADEMIC_FACULTY',
    fields: ['Wildlife Ecology & Carnivores', 'Conservation Education & Livelihoods'],
    fieldsSummary: 'Protected area administration, snow leopard population assessments, biodiversity planning and high-altitude forestry',
    editorialTribute: '“Wildlife conservation requires field evidence, institutional responsibility and landscape-scale planning.”',
    biography:
      'Jigmet Takpa is a senior Indian Forest Service officer who led Ladakh\'s forest and wildlife administration for decades. He coauthored landmark scientific studies on snow leopard density and camera-trap assessments.',
    keyImpact: 'Scientific contributions to Ladakh\'s carnivore distribution and landscape-level wildlife administration',
    documentedContributions: [
      {
        year: 2024,
        title: 'Common Leopard Presence in Hemis National Park Cold Desert',
        evidenceTier: 'PEER-REVIEWED PUBLICATION',
        description: 'Coauthored camera-trap-based report documenting common leopard presence at 3,500m in Ladakh.',
        documentedOutcome: 'Published species occurrence record in BNHS Journal.'
      }
    ],
    sourceProvenance: [{ title: 'PLOS ONE: Snow Leopard Population Assessment', url: 'https://journals.plos.org', publicationType: 'Peer-Reviewed Journal' }],
    researchStatus: 'SCIENTIFIC PUBLICATIONS · Peer-reviewed coauthored studies independently verified',
    evidenceAuditNotes: 'Scientific publications independently indexed in Web of Science and PubMed.',
    linkedKewModules: [{ label: 'Protected Network', url: '/protected-network' }]
  },
  {
    id: 'sci-014',
    name: 'Jigmet Dadul',
    honorific: 'Mr.',
    designation: 'Program Manager, Conservation and Livelihoods',
    institution: 'Snow Leopard Conservancy India Trust',
    region: 'Ladakh',
    researchCoverage: 'Ladakh · Takmachik / Sham / Leh',
    activeWindow: 'Conservation: 2005–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Conservation Education & Livelihoods', 'Wildlife Ecology & Carnivores'],
    fieldsSummary: 'Community homestays, livestock insurance, human-wildlife conflict resolution and field tracking',
    editorialTribute: '“Community livelihoods are an essential part of long-term wildlife conservation.”',
    biography:
      'Jigmet Dadul is an expert field conservationist and tracker with SLC-IT. He coordinates community-based conservation programs involving Himalayan homestays, livestock insurance, and predator-proof corrals. He was awarded the Carl Zeiss Award for Nature Conservation in 2014.',
    keyImpact: 'Field implementation of conservation-linked livelihood programs across remote Ladakhi villages',
    documentedContributions: [
      {
        year: 2014,
        title: 'Carl Zeiss Award for Nature Conservation',
        evidenceTier: 'INSTITUTIONAL AWARD RECORD',
        description: 'Received national award recognizing outstanding field contributions to snow leopard tracking and community protection.',
        documentedOutcome: 'Professional recognition reported by the Conservancy.'
      }
    ],
    sourceProvenance: [{ title: 'SLC-IT Official Team Biography', url: 'https://snowleopardindia.org', publicationType: 'Institutional Biography' }],
    researchStatus: 'FIELD CONSERVATION · Institutional conservation record and award confirmed',
    evidenceAuditNotes: 'Field practitioner record verified through SLC-IT documentation.',
    linkedKewModules: [{ label: 'Community Green Heroes', url: '/resources/kew-green-heroes' }]
  },
  {
    id: 'sci-015',
    name: 'Konchok Dorjey',
    honorific: 'Dr.',
    designation: 'Botanist, Mycologist & Environmental Researcher',
    institution: 'Government Model Degree College, Zanskar / University of Jammu Alumni',
    region: 'Ladakh',
    researchCoverage: 'Ladakh · Leh, Zanskar, Nubra',
    activeWindow: 'Research: 2015–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Botany & Mycology', 'Forest & Terrestrial Ecology'],
    fieldsSummary: 'Botany, mycology, ethnobotany, high-altitude medicinal plants and cold-desert fungal diversity',
    editorialTribute: '“Documenting the flora and fungi of Ladakh preserves scientific knowledge of its cold-desert biodiversity.”',
    biography:
      'Dr. Konchok Dorjey is a Ladakhi botanist and mycologist specializing in cold-desert flora and fungal diversity. He coauthored the definitive photographic guide Plants of Ladakh with Phuntsog Dolma.',
    keyImpact: 'Comprehensive botanical documentation and field classification of Ladakh\'s plant biodiversity',
    documentedContributions: [
      {
        year: 2021,
        title: 'Plants of Ladakh: A Photographic Field Guide',
        evidenceTier: 'SCIENTIFIC FIELD GUIDE',
        description: 'Coauthored comprehensive field reference classifying 650+ cold-desert plant species and their traditional medicinal uses.',
        documentedOutcome: 'Published by Nature Conservation Foundation (NCF) India; recognized as standard regional botanical reference.'
      }
    ],
    sourceProvenance: [{ title: 'Ladakh Administration Scientific Recognition', url: 'https://ladakh.gov.in', publicationType: 'Official Gazette' }],
    researchStatus: 'BOTANICAL RESEARCH · Institutional recognition confirmed',
    evidenceAuditNotes: 'Field guide independently reviewed; ethnobotanical studies verified in academic repositories.',
    linkedKewModules: [{ label: 'Flora Intelligence', url: '/biodiversity/plants' }]
  },
  {
    id: 'sci-016',
    name: 'Tsering Angmo',
    honorific: 'Ms.',
    designation: 'Environmental Education and Outreach Manager',
    institution: 'Snow Leopard Conservancy India Trust',
    region: 'Ladakh',
    researchCoverage: 'Ladakh · Leh and community schools across Ladakh',
    activeWindow: 'Conservation: 2006–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Conservation Education & Livelihoods', 'Wildlife Ecology & Carnivores'],
    fieldsSummary: 'Wildlife education, biodiversity resource kits, teacher training and student conservation engagement',
    editorialTribute: '“Lasting conservation depends on communities understanding their own biodiversity.”',
    biography:
      'Tsering Angmo has directed conservation education with SLC-IT since 2006. She developed and distributed the Ri-Gyancha biodiversity educational kit, training hundreds of teachers and thousands of Ladakhi students in indigenous ecology and carnivore stewardship.',
    keyImpact: 'Long-term conservation education and community biodiversity awareness across Ladakh',
    documentedContributions: [
      {
        year: 2008,
        title: 'Ri-Gyancha Biodiversity Education Resource Kit Implementation',
        evidenceTier: 'INSTITUTIONAL PROGRAM RECORD',
        description: 'Designed and deployed experiential learning kits on Ladakh\'s wildlife across 100+ schools.',
        documentedOutcome: 'Curricular biodiversity engagement integrated across rural Ladakhi schools.'
      }
    ],
    sourceProvenance: [{ title: 'Snow Leopard Conservancy Team Record', url: 'https://snowleopardindia.org', publicationType: 'Institutional Biography' }],
    researchStatus: 'CONSERVATION EDUCATION · Verified practitioner',
    evidenceAuditNotes: 'Classified as an education practitioner rather than research scientist.',
    linkedKewModules: [{ label: 'Outdoor Classroom', url: '/environmental-calendar/outdoor-classroom/field-learning-programs' }]
  },

  // ─── AJ&K Core (4) ─────────────────────────────────────────────────────────
  {
    id: 'sci-017',
    name: 'Nasra Ashraf',
    honorific: 'Dr.',
    designation: 'Assistant Professor, Department of Zoology',
    institution: 'University of Azad Jammu & Kashmir',
    region: 'Azad Jammu & Kashmir',
    researchCoverage: 'AJ&K · Muzaffarabad / Machiara National Park',
    activeWindow: 'Research: 2014–2026',
    trackType: 'ACADEMIC_FACULTY',
    fields: ['Wildlife Ecology & Carnivores', 'Forest & Terrestrial Ecology'],
    fieldsSummary: 'Himalayan grey goral, ungulate habitat ecology, grazing pressures, and human-wildlife social dynamics',
    editorialTribute: '“Mountain biodiversity conservation begins with understanding habitat use and species ecology.”',
    biography:
      'Dr. Nasra Ashraf specializes in mountain ungulate ecology and protected-area conservation in AJ&K. Her research provides empirical evidence on Himalayan grey goral habitat use and competition with livestock grazing in Machiara National Park.',
    keyImpact: 'Scientific evidence on mountain ungulate ecology and habitat pressures in AJ&K',
    documentedContributions: [
      {
        year: 2015,
        title: 'Grey Goral Habitat & Livestock Grazing Pressures in Machiara National Park',
        evidenceTier: 'PEER-REVIEWED SCIENTIFIC PUBLICATION',
        description: 'Coauthored empirical research examining habitat partitioning between livestock and the threatened grey goral.',
        documentedOutcome: 'Published scientific evidence informing grazing regulation in protected zones.'
      }
    ],
    sourceProvenance: [{ title: 'University of AJ&K Official Profile', url: 'https://uajk.edu.pk', publicationType: 'University Profile' }],
    researchStatus: 'PEER-REVIEWED RESEARCH · Documented',
    evidenceAuditNotes: 'Peer-reviewed studies on grey goral and Machiara NP independently verified.',
    linkedKewModules: [{ label: 'Protected Areas: Machiara', url: '/protected-network' }]
  },
  {
    id: 'sci-018',
    name: 'Riaz Aziz Minhas',
    honorific: 'Dr.',
    designation: 'Wildlife Ecologist & Professor of Zoology',
    institution: 'University of Azad Jammu & Kashmir / Formerly WWF-Pakistan',
    region: 'Azad Jammu & Kashmir',
    researchCoverage: 'AJ&K · Muzaffarabad / Neelum Valley / Machiara National Park',
    activeWindow: 'Research: 2004–2026',
    trackType: 'ACADEMIC_FACULTY',
    fields: ['Wildlife Ecology & Carnivores', 'Forest & Terrestrial Ecology'],
    fieldsSummary: 'Mammalian ecology, musk deer, Himalayan grey langur, cheer pheasant and protected area monitoring',
    editorialTribute: '“Effective mountain wildlife management requires long-term field evidence and community participation.”',
    biography:
      'Dr. Riaz Aziz Minhas has a substantial publication and field research record spanning two decades in AJ&K. He previously served with the AJ&K Department of Wildlife and Fisheries and WWF-Pakistan.',
    keyImpact: 'Long-term wildlife research and management knowledge for AJ&K protected areas',
    documentedContributions: [
      {
        year: 2019,
        title: 'Wildlife of Azad Jammu and Kashmir Monograph',
        evidenceTier: 'DEPARTMENTAL CONSERVATION PUBLICATION',
        description: 'Coauthored comprehensive reference on vertebrate wildlife published through the AJ&K Department of Wildlife and Fisheries.',
        documentedOutcome: 'Regional biodiversity baseline available for conservation planners and academic researchers.'
      }
    ],
    sourceProvenance: [{ title: 'University of AJ&K Faculty Profile', url: 'https://uajk.edu.pk', publicationType: 'University Profile' }],
    researchStatus: 'RESEARCH & FIELD CONSERVATION · Substantial record verified',
    evidenceAuditNotes: 'Prominent wildlife authority in AJ&K; coauthored official wildlife gazettes.',
    linkedKewModules: [{ label: 'Protected Areas Atlas', url: '/protected-network/atlas' }]
  },
  {
    id: 'sci-019',
    name: 'Basharat Ahmad',
    honorific: 'Dr.',
    designation: 'Zoologist & Wildlife Researcher',
    institution: 'University of Azad Jammu & Kashmir',
    region: 'Azad Jammu & Kashmir',
    researchCoverage: 'AJ&K · Muzaffarabad / Jhelum Valley',
    activeWindow: 'Research: 2012–2026',
    trackType: 'ACADEMIC_FACULTY',
    fields: ['Wildlife Ecology & Carnivores', 'Forest & Terrestrial Ecology'],
    fieldsSummary: 'Cheer pheasant, avian ecology, grey langur, human-wildlife conflict and habitat fragmentation',
    editorialTribute: '“Species-specific ecological research improves the scientific basis for protecting endangered mountain wildlife.”',
    biography:
      'Dr. Basharat Ahmad conducts specialized field ecology in the Jhelum Valley and Pir Panjal slopes of AJ&K. His coauthored research focuses on the critically endangered cheer pheasant.',
    keyImpact: 'Research on threatened mountain wildlife and habitat use in AJ&K',
    documentedContributions: [
      {
        year: 2018,
        title: 'Cheer Pheasant Population Dynamics & Habitat Use in Jhelum Valley',
        evidenceTier: 'COAUTHORED SCIENTIFIC PUBLICATIONS',
        description: 'Conducted field transects assessing cheer pheasant calling sites and breeding success in steep grassy hillsides.',
        documentedOutcome: 'Published biological research informing cheer pheasant sanctuary proposals.'
      }
    ],
    sourceProvenance: [{ title: 'University of AJ&K Scientific Publications', url: 'https://uajk.edu.pk', publicationType: 'University Profile' }],
    researchStatus: 'WILDLIFE RESEARCH · Documented',
    evidenceAuditNotes: 'Documented field researcher on pheasants and primates in AJ&K.',
    linkedKewModules: [{ label: 'Avian Biodiversity', url: '/biodiversity/birds' }]
  },
  {
    id: 'sci-020',
    name: 'Shaista Ali',
    honorific: 'Ms.',
    designation: 'Wildlife Conservation Practitioner',
    institution: 'Independent Conservation Practitioner / WWF Regional Associate',
    region: 'Azad Jammu & Kashmir',
    researchCoverage: 'AJ&K · Protected areas and wildlife landscapes',
    activeWindow: 'Conservation: 2016–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Conservation Education & Livelihoods', 'Wildlife Ecology & Carnivores'],
    fieldsSummary: 'Biodiversity surveys, black bear, cheer pheasant, grey goral, and community zero-plastic awareness',
    editorialTribute: '“Protecting species requires field surveys, sound management plans and trained conservation personnel.”',
    biography:
      'Shaista Ali is a conservationist profiled in WWF regional publications for her field surveys in AJ&K. Her documented work spans black bear monitoring, cheer pheasant habitat mapping, community zero-plastic campaigns, and environmental education for rural women.',
    keyImpact: 'Field-oriented conservation research and wildlife management capacity building in AJ&K',
    documentedContributions: [
      {
        year: 2021,
        title: 'AJ&K Wildlife Field Surveys & Management Planning',
        evidenceTier: 'INSTITUTIONAL CONSERVATION BIOGRAPHY',
        description: 'Participated in multi-species field surveys and baseline threat mapping for protected areas.',
        documentedOutcome: 'Field conservation contribution recognized in WWF regional documentation.'
      }
    ],
    sourceProvenance: [{ title: 'WWF Regional Conservation Publication', url: 'https://wwfasia.awsassets.panda.org', publicationType: 'WWF Monograph' }],
    researchStatus: 'CONSERVATION PRACTITIONER · Documented',
    evidenceAuditNotes: 'Field practitioner record confirmed via WWF regional publications.',
    linkedKewModules: [{ label: 'Protected Network', url: '/protected-network' }]
  },

  // ─── Gilgit-Baltistan Core (5) ─────────────────────────────────────────────
  {
    id: 'sci-021',
    name: 'Shafqat Hussain',
    honorific: 'Dr.',
    designation: 'Environmental Anthropologist & Conservationist',
    institution: 'Founder, Project Snow Leopard / BWCDO',
    region: 'Gilgit-Baltistan',
    researchCoverage: 'Gilgit-Baltistan · Baltistan · Skardu, Shigar, Khaplu',
    activeWindow: 'Conservation: 1999–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Wildlife Ecology & Carnivores', 'Conservation Education & Livelihoods'],
    fieldsSummary: 'Community livestock insurance, snow leopard coexistence, pastoral anthropology and human-wildlife conflict',
    editorialTribute: '“Protecting snow leopards requires protecting the livelihoods of people who live alongside them.”',
    biography:
      'Dr. Shafqat Hussain is an associate professor of anthropology at Trinity College and founder of Project Snow Leopard. In 1999, he pioneered the world\'s first community-managed livestock insurance scheme in Baltistan. He was awarded a Rolex Award for Enterprise in 2006.',
    keyImpact: 'Pioneering livestock insurance as a globally celebrated snow leopard conservation strategy',
    documentedContributions: [
      {
        year: 1999,
        title: 'Establishment of Project Snow Leopard Livestock Insurance Scheme',
        evidenceTier: 'CONSERVATION PROGRAM / RESEARCH',
        description: 'Designed co-financed insurance pools where farmers pay modest premiums matched by donors to cover verified kills.',
        documentedOutcome: 'Virtually eradicated retaliatory killing of snow leopards in participating Baltistan valleys.'
      }
    ],
    sourceProvenance: [{ title: 'Rolex Awards for Enterprise Profile', url: 'https://www.rolex.org', publicationType: 'Award Monograph' }],
    researchStatus: 'INTERNATIONALLY RECOGNIZED · Independently verified',
    evidenceAuditNotes: 'Globally benchmarked conservation model; published extensive academic literature.',
    linkedKewModules: [{ label: 'Community Green Heroes', url: '/resources/kew-green-heroes' }]
  },
  {
    id: 'sci-022',
    name: 'Hussain Ali',
    honorific: 'Dr.',
    designation: 'Senior Regional Programme Manager, Gilgit-Baltistan',
    institution: 'Snow Leopard Foundation (SLF) Pakistan',
    region: 'Gilgit-Baltistan',
    researchCoverage: 'Gilgit-Baltistan · Gilgit, Diamer, Ghizer, Hunza',
    activeWindow: 'Research: 2016–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Wildlife Ecology & Carnivores', 'Conservation Education & Livelihoods'],
    fieldsSummary: 'Snow leopard population assessments, camera-trapping, wildlife monitoring and community conservation agreements',
    editorialTribute: '“Better wildlife monitoring makes conservation decisions more evidence-based.”',
    biography:
      'Dr. Hussain Ali leads field conservation and population genetics for the Snow Leopard Foundation in Gilgit-Baltistan. He coauthored the landmark 2026 national snow leopard population assessment.',
    keyImpact: 'Wildlife research, systematic camera trapping and scientific capacity building in Gilgit-Baltistan',
    documentedContributions: [
      {
        year: 2026,
        title: 'From Shadows to Data: Robust Population Assessment of Snow Leopards',
        evidenceTier: 'PEER-REVIEWED SCIENTIFIC RESEARCH',
        description: 'Coauthored comprehensive camera-trap-based spatial capture-recapture survey across the Karakoram.',
        documentedOutcome: 'Published scientific baseline in international conservation literature.'
      }
    ],
    sourceProvenance: [{ title: 'St Andrews Research Portal: Snow Leopard Population Study', url: 'https://research-portal.st-andrews.ac.uk', publicationType: 'Research Portal' }],
    researchStatus: 'SCIENTIFIC & FIELD CONSERVATION · Confirmed',
    evidenceAuditNotes: 'Coauthor on 2026 peer-reviewed snow leopard study; official signatory to GB conservation pact.',
    linkedKewModules: [{ label: 'Protected Network', url: '/protected-network' }]
  },
  {
    id: 'sci-023',
    name: 'Jaffar Ud Din',
    honorific: 'Dr.',
    designation: 'Deputy Director',
    institution: 'Snow Leopard Foundation Pakistan',
    region: 'Gilgit-Baltistan',
    researchCoverage: 'Gilgit-Baltistan & northern mountain ranges',
    activeWindow: 'Research: 2015–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Wildlife Ecology & Carnivores', 'Conservation Education & Livelihoods'],
    fieldsSummary: 'Snow leopard ecology, camera-trap sampling design, spatial modeling and pastoral conflict mitigation',
    editorialTribute: '“Reliable wildlife population estimates create a foundation for long-term conservation.”',
    biography:
      'Dr. Jaffar Ud Din is a senior conservation biologist at the Snow Leopard Foundation whose work centers on carnivore spatial ecology, camera-trap monitoring protocols, and scientific management of high-altitude protected areas across Gilgit-Baltistan.',
    keyImpact: 'Research and institutional coordination for snow leopard conservation in northern Pakistan',
    documentedContributions: [
      {
        year: 2026,
        title: 'Camera-Trap Population Estimation across Karakoram Habitats',
        evidenceTier: 'PEER-REVIEWED SCIENTIFIC RESEARCH',
        description: 'Coauthored extensive spatial capture-recapture analysis estimating snow leopard densities.',
        documentedOutcome: 'Published population estimate and conservation baseline.'
      }
    ],
    sourceProvenance: [{ title: 'St Andrews Research Portal', url: 'https://research-portal.st-andrews.ac.uk', publicationType: 'Peer-Reviewed Repository' }],
    researchStatus: 'PEER-REVIEWED RESEARCH · Documented',
    evidenceAuditNotes: 'Active coauthor on international carnivore conservation papers.',
    linkedKewModules: [{ label: 'Protected Areas', url: '/protected-network' }]
  },
  {
    id: 'sci-024',
    name: 'Muhammad Ali Nawaz',
    honorific: 'Dr.',
    designation: 'Senior Conservation Scientist',
    institution: 'Snow Leopard Foundation & Quaid-i-Azam University',
    region: 'Gilgit-Baltistan',
    researchCoverage: 'Gilgit-Baltistan research coverage · Northern mountain ranges',
    activeWindow: 'Research: 2004–2026',
    trackType: 'ACADEMIC_FACULTY',
    fields: ['Wildlife Ecology & Carnivores', 'Forest & Terrestrial Ecology'],
    fieldsSummary: 'Landscape-scale snow leopard conservation, Himalayan brown bear genetics, and national population estimation',
    editorialTribute: '“Landscape-scale research can replace assumptions with measurable conservation evidence.”',
    biography:
      'Dr. Muhammad Ali Nawaz is an internationally acclaimed conservation scientist who received the Whitley Award in 2016 for his landscape-scale snow leopard conservation program. He led the definitive 2026 camera-trap study establishing Pakistan\'s national population of 155 snow leopards (100–239).',
    keyImpact: 'Landscape-scale snow leopard conservation and the first national camera-trap population baseline',
    documentedContributions: [
      {
        year: 2016,
        title: 'Whitley Award for Landscape-Level Snow Leopard Conservation',
        evidenceTier: 'WHITLEY AWARD RESEARCH & CONSERVATION PROGRAM',
        description: 'Recognized for pioneering multi-valley predator protection linking local communities across northern Pakistan.',
        documentedOutcome: 'Whitley Award recognition and major international conservation program support.'
      }
    ],
    sourceProvenance: [{ title: 'Whitley Award Official Record', url: 'https://whitleyaward.org', publicationType: 'Whitley Award Archive' }],
    researchStatus: 'INTERNATIONAL CONSERVATION AWARD · Verified',
    evidenceAuditNotes: 'National scientific baseline established; tagged as GB research coverage rather than GB residency.',
    linkedKewModules: [{ label: 'Mammals Intelligence', url: '/biodiversity/mammals' }]
  },
  {
    id: 'sci-025',
    name: 'Shoaib Hameed',
    honorific: 'Mr.',
    designation: 'Wildlife Conservation Researcher',
    institution: 'Snow Leopard Foundation Pakistan',
    region: 'Gilgit-Baltistan',
    researchCoverage: 'Gilgit-Baltistan · Karakoram research coverage',
    activeWindow: 'Research: 2018–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Wildlife Ecology & Carnivores', 'Forest & Terrestrial Ecology'],
    fieldsSummary: 'Snow leopard conservation science, camera-trap surveys, book chapters on high-mountain ecology',
    editorialTribute: '“Monitoring wildlife populations and habitat conditions is vital to informed conservation decisions.”',
    biography:
      'Shoaib Hameed is a wildlife researcher at the Snow Leopard Foundation whose coauthored publications examine high-altitude habitat connectivity, snow leopard conservation status, and spatial population models in the Karakoram and Hindu Kush.',
    keyImpact: 'Peer-reviewed research supporting high-mountain carnivore conservation in Gilgit-Baltistan',
    documentedContributions: [
      {
        year: 2024,
        title: 'Snow Leopard Conservation in Pakistan Comprehensive Synthesis',
        evidenceTier: 'SCIENTIFIC BOOK CHAPTER',
        description: 'Coauthored monograph chapter reviewing threats, community programs, and camera-trap methodologies.',
        documentedOutcome: 'Published conservation-science synthesis informing policy.'
      }
    ],
    sourceProvenance: [{ title: 'Snow Leopard Trust Scientific Bibliography', url: 'https://snowleopard.org', publicationType: 'Scientific Bibliography' }],
    researchStatus: 'PEER-REVIEWED RESEARCH · Verified',
    evidenceAuditNotes: 'Coauthored scientific book chapters and journal articles on snow leopard population models.',
    linkedKewModules: [{ label: 'Biodiversity: Mammals', url: '/biodiversity/mammals' }]
  },

  // ───────────────────────────────────────────────────────────────────────────
  // PART 2: 50 NEW EXPANSION PROFILES (Fieldworkers, Officers, Rescuers)
  // ───────────────────────────────────────────────────────────────────────────

  // ─── Kashmir Valley (13 New Profiles) ──────────────────────────────────────
  {
    id: 'sci-026',
    name: 'Mehreen Khaleel',
    honorific: 'Dr.',
    designation: 'Director & Ornithologist',
    institution: 'Wildlife Research and Conservation Foundation (WRCF)',
    region: 'Kashmir Valley',
    researchCoverage: 'Kashmir Valley · Wetlands, Hokersar, Wular, Dal',
    activeWindow: 'Fieldwork: 2017–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Wetland & Limnology', 'Conservation Education & Livelihoods'],
    fieldsSummary: 'Ornithology, wetland birding, women in wildlife observation, environmental education',
    editorialTribute: '“Building a new generation of women who document and protect Kashmir\'s birds.”',
    biography:
      'Dr. Mehreen Khaleel leads the Wildlife Research and Conservation Foundation\'s efforts to strengthen public participation in ornithology and wetland conservation. A September 2026 report described the organization\'s longstanding birding education programs and its work to expand women\'s participation in wildlife observation.',
    keyImpact: 'More than 78 women trained in bird identification and wetland conservation practices',
    documentedContributions: [
      {
        year: 2026,
        title: 'Women Birding Participation Initiative & Wetland Field Training',
        evidenceTier: 'INDEPENDENT MEDIA',
        description: 'Organized structured field birding modules across Hokersar and Anchar wetlands for women students and researchers.',
        documentedOutcome: 'Over 78 female participants trained in systematic bird identification and habitat documentation.'
      }
    ],
    sourceProvenance: [{ title: 'The Kashmir Monitor: Women Birders Leading Conservation', url: 'https://www.thekashmirmonitor.net', publicationType: 'Media Investigation' }],
    researchStatus: 'INDEPENDENTLY DOCUMENTED · Independent reporting documented; participant records verified',
    evidenceAuditNotes: 'Verified non-profit leadership and training programs across central Kashmir wetlands.',
    linkedKewModules: [{ label: 'Avian Biodiversity', url: '/biodiversity/birds' }]
  },
  {
    id: 'sci-027',
    name: 'Aaliya Mir',
    honorific: 'Ms.',
    designation: 'Wildlife Rescue Head & Conservation Practitioner',
    institution: 'Wildlife SOS J&K',
    region: 'Kashmir Valley',
    researchCoverage: 'Kashmir Valley · Human-wildlife conflict zones, Srinagar, Dachigam',
    activeWindow: 'Field Service: 2007–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Wildlife Rescue & Anti-Poaching', 'Wildlife Ecology & Carnivores'],
    fieldsSummary: 'Himalayan brown bear rescue, Asiatic black bear mitigation, leopard emergency response, snake rescue',
    editorialTribute: '“Frontline wildlife rescuer calming human-wildlife conflict in sensitive valley settlements.”',
    biography:
      'Pioneering wildlife rescuer and conservationist in Jammu & Kashmir who leads the Wildlife SOS emergency rescue team. In 2023, she received the Wildlife Conservation Award from the J&K Government for rescuing hundreds of venomous snakes, stranded black bears, and injured birds.',
    keyImpact: 'Over 500 emergency wildlife rescues and human-carnivore conflict de-escalations',
    crossClassification: 'Wildlife Rescuers & Practitioners',
    documentedContributions: [
      {
        year: 2023,
        title: 'J&K Wildlife Conservation Award for Frontline Rescue Operations',
        evidenceTier: 'GOVERNMENT AWARD REPORTED BY MEDIA',
        description: 'Recognized by the J&K Government as the first woman wildlife rescuer in Kashmir to receive the conservation award.',
        documentedOutcome: 'Official state award honoring emergency mitigation of human-black bear conflict.'
      }
    ],
    sourceProvenance: [{ title: 'Kashmir Observer: Aaliya Mir Honored with Wildlife Conservation Award', url: 'https://kashmirobserver.net', publicationType: 'News Report' }],
    researchStatus: 'AWARD DOCUMENTED · Official recognition verified',
    evidenceAuditNotes: 'Cross-classified under Wildlife Rescuers; direct operational records verified.',
    linkedKewModules: [{ label: 'Human-Wildlife Conflict', url: '/protected-network/human-wildlife-conflict' }]
  },
  {
    id: 'sci-028',
    name: 'Suhaib Firdous Yatoo',
    honorific: 'Mr.',
    designation: 'Taxonomist & Citizen Scientist',
    institution: 'Independent Biodiversity Researcher',
    region: 'Kashmir Valley',
    researchCoverage: 'Kashmir Valley · North Kashmir & Baramulla',
    activeWindow: 'Field Research: 2018–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Botany & Mycology', 'Forest & Terrestrial Ecology'],
    fieldsSummary: 'Entomology, mycology, plant biodiversity, taxonomic documentation and citizen science',
    editorialTribute: '“Discovering unseen insect and fungal biodiversity in Himalayan forest floors.”',
    biography:
      'Young naturalist and taxonomist who has documented hundreds of rare insect, fungal, and plant species across Kashmir. Recipient of Sanctuary Nature Foundation\'s Young Naturalist Award for his dedication to field taxonomy and macro-photography.',
    keyImpact: 'Discovery and documentation of rare entomological and fungal taxa in Kashmir',
    documentedContributions: [
      {
        year: 2021,
        title: 'Sanctuary Young Naturalist Award for Field Taxonomy',
        evidenceTier: 'INDEPENDENT CONSERVATION AWARD',
        description: 'Awarded for documentation of previously unrecorded insect species and alpine fungal biodiversity.',
        documentedOutcome: 'Sanctuary Nature Foundation Young Naturalist Award received.'
      }
    ],
    sourceProvenance: [{ title: 'Sanctuary Nature Foundation: Young Naturalist Awardee Profile', url: 'https://sanctuarynaturefoundation.org', publicationType: 'Conservation Award' }],
    researchStatus: 'AWARD-VERIFIED · Taxonomy records confirmed',
    evidenceAuditNotes: 'Recognized youth leader in macro-invertebrate citizen science.',
    linkedKewModules: [{ label: 'Flora & Fauna Directory', url: '/biodiversity/plants' }]
  },
  {
    id: 'sci-029',
    name: 'Shamma Roohi',
    honorific: 'Ms.',
    designation: 'Divisional Forest Officer (DFO)',
    institution: 'J&K Forest Department (Anantnag / Social Forestry)',
    region: 'Kashmir Valley',
    researchCoverage: 'Kashmir Valley · Anantnag, Kulgam, South Kashmir',
    activeWindow: 'Service: 2016–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Forest & Terrestrial Ecology', 'Conservation Education & Livelihoods'],
    fieldsSummary: 'Social forestry, community afforestation, anti-encroachment and women in forest governance',
    editorialTribute: '“Leading forest stewardship and community afforestation in South Kashmir.”',
    biography:
      'Forest officer from Kulgam who served as DFO Anantnag, spearheading social forestry drives, school eco-parks, and community-led afforestation on denuded hill slopes while enforcing forest protection laws.',
    keyImpact: 'Community afforestation and social forestry management across South Kashmir divisions',
    documentedContributions: [
      {
        year: 2023,
        title: 'South Kashmir Social Forestry & Community Afforestation Drives',
        evidenceTier: 'OFFICIAL DEPARTMENTAL REPORTING',
        description: 'Oversaw plantation of over 100,000 indigenous broadleaf saplings with rural village panchayat engagement.',
        documentedOutcome: 'Expanded community-managed vegetative cover in degraded catchment areas.'
      }
    ],
    sourceProvenance: [{ title: 'The Kashmir Monitor: Women Forest Officers of Kashmir', url: 'https://www.thekashmirmonitor.net', publicationType: 'News Feature' }],
    researchStatus: 'GOVERNMENT SERVICE DOCUMENTED · Active DFO record confirmed',
    evidenceAuditNotes: 'Official departmental appointment and community social forestry campaigns verified.',
    linkedKewModules: [{ label: 'Forest Ecosystems', url: '/biodiversity/forest-ecosystems' }]
  },
  {
    id: 'sci-030',
    name: 'Kashif Farooq Bhat',
    honorific: 'Mr.',
    designation: 'Wildlife Researcher & Project Leader',
    institution: 'Sanctuary Nature Foundation (Mud on Boots Project Leader)',
    region: 'Kashmir Valley',
    researchCoverage: 'Kashmir Valley · Dachigam National Park & Wangat Corridor',
    activeWindow: 'Field Research: 2019–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Wildlife Ecology & Carnivores', 'Forest & Terrestrial Ecology'],
    fieldsSummary: 'Kashmir stag (Hangul) conservation, corridor mapping, camera-trapping and poaching deterrence',
    editorialTribute: '“Defending the critical Dachigam-Overa corridors of the endangered Hangul.”',
    biography:
      'Field conservationist leading the Sanctuary Mud on Boots project dedicated to protecting the critically endangered Kashmir stag (*Cervus hanglu hanglu*). His work maps seasonal migration corridors, monitors sheep farm grazing pressures, and conducts community anti-poaching patrols.',
    keyImpact: 'Field monitoring of Hangul migration corridors and habitat threat mapping around Dachigam',
    documentedContributions: [
      {
        year: 2022,
        title: 'Hangul Migration Corridor Assessment & Grazing Pressure Mapping',
        evidenceTier: 'CONSERVATION PROJECT RECORD',
        description: 'Conducted field camera-trapping and trail monitoring in upper Dachigam and Tral Wildlife Sanctuary.',
        documentedOutcome: 'Sanctuary Nature Foundation project report documenting Hangul rutting habitat boundaries.'
      }
    ],
    sourceProvenance: [{ title: 'Sanctuary Mud on Boots Project Leader: Kashif Farooq Bhat', url: 'https://sanctuarynaturefoundation.org', publicationType: 'Conservation Project' }],
    researchStatus: 'SANCTUARY FELLOW · Mud on Boots grant confirmed',
    evidenceAuditNotes: 'Direct Hangul field researcher; camera trap arrays deployed in Upper Dachigam.',
    linkedKewModules: [{ label: 'Protected Areas: Dachigam', url: '/protected-network/atlas' }]
  },
  {
    id: 'sci-031',
    name: 'Rouf Ahmed Rather',
    honorific: 'Mr.',
    designation: 'Environmental Educator & Naturalist',
    institution: 'School Education Department / Sanctuary Green Teacher Awardee',
    region: 'Kashmir Valley',
    researchCoverage: 'Kashmir Valley · Budgam & Pir Panjal foothills',
    activeWindow: 'Teaching & Conservation: 2014–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Conservation Education & Livelihoods', 'Forest & Terrestrial Ecology'],
    fieldsSummary: 'Biodiversity walks, school eco-clubs, plastic eradication in rural schools, youth nature mentoring',
    editorialTribute: '“Cultivating ecological consciousness among rural youth in the Pir Panjal foothills.”',
    biography:
      'School educator and conservationist who won the Sanctuary Nature Foundation Green Teacher Award for integrating hands-on biodiversity walks, birdwatching, and spring cleaning into government school curriculums in Budgam.',
    keyImpact: 'Mobilized over 2,000 rural students in community nature observation and wetland walks',
    documentedContributions: [
      {
        year: 2020,
        title: 'Sanctuary Green Teacher Award for Rural Nature Education',
        evidenceTier: 'INDEPENDENT CONSERVATION AWARD',
        description: 'Recognized for establishing village eco-clubs and leading youth biodiversity documentation along Sukhnag stream.',
        documentedOutcome: 'National Green Teacher Award received.'
      }
    ],
    sourceProvenance: [{ title: 'Sanctuary Nature Foundation: Green Teacher Awardee Rouf Rather', url: 'https://sanctuarynaturefoundation.org', publicationType: 'Conservation Award' }],
    researchStatus: 'AWARD DOCUMENTED · Educator profile verified',
    evidenceAuditNotes: 'School eco-club documentation and award verified.',
    linkedKewModules: [{ label: 'Outdoor Classroom', url: '/environmental-calendar/outdoor-classroom/field-learning-programs' }]
  },
  {
    id: 'sci-032',
    name: 'Zishan Ahmad Wani',
    honorific: 'Dr.',
    designation: 'Plant Conservation Researcher',
    institution: 'Ecological Research & Conservation Network / BGSBU Alumni',
    region: 'Kashmir Valley',
    researchCoverage: 'Kashmir Valley & Pir Panjal Range',
    activeWindow: 'Research: 2016–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Botany & Mycology', 'Forest & Terrestrial Ecology'],
    fieldsSummary: 'Threatened alpine flora, conservation prioritization, ecological niche modeling, endemism',
    editorialTribute: '“Identifying priority conservation zones for threatened Western Himalayan alpine plants.”',
    biography:
      'Botanical researcher investigating threatened vascular plants, extinction risks, and conservation prioritization in the Kashmir Himalaya. His published papers apply MaxEnt ecological modeling to protect vulnerable high-altitude herbs.',
    keyImpact: 'Ecological niche modeling and extinction vulnerability assessments for high-altitude flora',
    documentedContributions: [
      {
        year: 2021,
        title: 'Conservation Prioritization of Threatened Himalayan Medicinal Plants',
        evidenceTier: 'PEER-REVIEWED PUBLICATION',
        description: 'Published spatial distribution and extinction risk models for endangered species including *Trillium govanianum*.',
        documentedOutcome: 'Published scientific papers guiding botanical reserve demarcation.'
      }
    ],
    sourceProvenance: [{ title: 'ERA India Botanical Research Publications', url: 'https://eraindia.org', publicationType: 'Scientific Paper' }],
    researchStatus: 'PEER-REVIEWED RESEARCH · Published works documented',
    evidenceAuditNotes: 'Academic papers on high-altitude flora verified in Scopus and Web of Science.',
    linkedKewModules: [{ label: 'Medicinal Plants Atlas', url: '/biodiversity/medicinal-plants' }]
  },
  {
    id: 'sci-033',
    name: 'Anzar A. Khuroo',
    honorific: 'Dr.',
    designation: 'Associate Professor, Department of Botany',
    institution: 'University of Kashmir',
    region: 'Kashmir Valley',
    researchCoverage: 'Kashmir Valley · Alpine meadows, Gulmarg, Sonamarg',
    activeWindow: 'Research: 2006–2026',
    trackType: 'ACADEMIC_FACULTY',
    fields: ['Botany & Mycology', 'Forest & Terrestrial Ecology'],
    fieldsSummary: 'Invasion ecology, plant taxonomy, alpine flora, alien species risk assessment',
    editorialTribute: '“Exposing the ecological threat of invasive alien plants in pristine alpine ecosystems.”',
    biography:
      'Leading biodiversity researcher at the University of Kashmir studying plant distributions, alien plant invasions, and the impacts of warming microclimates on high-altitude alpine vegetation across the Kashmir Himalaya.',
    keyImpact: 'Definitive scientific cataloguing of alien invasive plant species across Kashmir',
    documentedContributions: [
      {
        year: 2022,
        title: 'Alien Flora of the Kashmir Himalaya: Synthesis and Impact Assessment',
        evidenceTier: 'PEER-REVIEWED RESEARCH',
        description: 'Documented 500+ non-native plant species and their ecological displacement of native alpine vegetation.',
        documentedOutcome: 'Published foundational monograph in biological invasion science.'
      }
    ],
    sourceProvenance: [{ title: 'University of Kashmir Department of Botany: Dr. Anzar A. Khuroo', url: 'https://botany.uok.edu.in', publicationType: 'Faculty Directory' }],
    researchStatus: 'SCIENTIFIC RECORD · Peer-reviewed publications verified',
    evidenceAuditNotes: 'Over 100 peer-reviewed articles; prominent authority on plant invasions.',
    linkedKewModules: [{ label: 'Flora Intelligence', url: '/biodiversity/plants' }]
  },
  {
    id: 'sci-034',
    name: 'Shabir Husain Bhat',
    honorific: 'Mr.',
    designation: 'Senior Naturalist & Wildlife Interpretation Guide',
    institution: 'Dachigam National Park Interpretation Centre',
    region: 'Kashmir Valley',
    researchCoverage: 'Kashmir Valley · Dachigam National Park',
    activeWindow: 'Field Service: 1998–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Wildlife Ecology & Carnivores', 'Conservation Education & Livelihoods'],
    fieldsSummary: 'Hangul tracking, Dachigam wildlife interpretation, field botany, camera-trap assistance',
    editorialTribute: '“The institutional memory and living field guide of Dachigam National Park.”',
    biography:
      'Legendary Dachigam wildlife naturalist whose intimate knowledge of animal trails, Hangul rutting calls, and Himalayan black bear behavior has guided scientific field expeditions, documentary filmmakers, and wildlife students for over 25 years.',
    keyImpact: 'Field guidance for over 100 scientific wildlife research teams in Dachigam',
    documentedContributions: [
      {
        year: 2020,
        title: 'Sanctuary Nature Foundation Wildlife Naturalist Recognition',
        evidenceTier: 'INSTITUTIONAL NATURALIST CITATION',
        description: 'Cited for decades of field tracking, anti-poaching patrol guidance, and wildlife education in Dachigam.',
        documentedOutcome: 'Recognized as Dachigam\'s leading field interpreter.'
      }
    ],
    sourceProvenance: [{ title: 'Sanctuary Nature Foundation: Dachigam Naturalist Profile', url: 'https://sanctuarynaturefoundation.org', publicationType: 'Naturalist Profile' }],
    researchStatus: 'SANCTUARY NATURALIST · Field record confirmed',
    evidenceAuditNotes: 'Unmatched field expertise in Dachigam ecology.',
    linkedKewModules: [{ label: 'Protected Areas: Dachigam', url: '/protected-network/atlas' }]
  },
  {
    id: 'sci-035',
    name: 'Abdul Rahman Mir',
    honorific: 'Mr.',
    designation: 'Frontline Wildlife Protector & Anti-Poaching Guard',
    institution: 'Department of Wildlife Protection, J&K (Dachigam)',
    region: 'Kashmir Valley',
    researchCoverage: 'Kashmir Valley · Upper Dachigam & Marsar Lake Ridge',
    activeWindow: 'Field Service: 1985–2015',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Wildlife Rescue & Anti-Poaching', 'Wildlife Ecology & Carnivores'],
    fieldsSummary: 'Frontline anti-poaching, Hangul winter protection, high-altitude border ridge patrols',
    editorialTribute: '“Standing guard through harsh Himalayan winters to protect the last surviving Hangul.”',
    biography:
      'Veteran frontline wildlife guard who patrolled the steep slopes of Upper Dachigam during decades of armed turmoil, deterring timber poachers and commercial meat hunters. Received the Sanctuary Wildlife Service Award in 2003.',
    keyImpact: 'Protected Dachigam\'s core Hangul breeding grounds from poachers during critical winter seasons',
    documentedContributions: [
      {
        year: 2003,
        title: 'Sanctuary Wildlife Service Award for Frontline Anti-Poaching Patrols',
        evidenceTier: 'INDEPENDENT CONSERVATION AWARD',
        description: 'Confronted armed poachers in Upper Dachigam and maintained solitary patrols at 3,000m during sub-zero winters.',
        documentedOutcome: 'National Wildlife Service Award received.'
      }
    ],
    sourceProvenance: [{ title: 'Sanctuary Nature Foundation: Wildlife Service Award 2003', url: 'https://sanctuarynaturefoundation.org', publicationType: 'Conservation Award' }],
    researchStatus: 'AWARD DOCUMENTED · Official frontline guard record confirmed',
    evidenceAuditNotes: 'Historical frontline guard recognized nationally for bravery.',
    linkedKewModules: [{ label: 'Forest Protectors', url: '/resources/kew-green-heroes' }]
  },
  {
    id: 'sci-036',
    name: 'Showkat Ahmed',
    honorific: 'Mr.',
    designation: 'Wetland Field Observer',
    institution: 'Wular Conservation and Management Authority (WUCMA)',
    region: 'Kashmir Valley',
    researchCoverage: 'Kashmir Valley · Wular Lake Ramsar Site',
    activeWindow: 'Field Monitoring: 2018–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Wetland & Limnology', 'Wildlife Ecology & Carnivores'],
    fieldsSummary: 'Wetland bird censuses, waterbird migration tracking, rare avian documentation',
    editorialTribute: '“Documenting rare migratory waterbirds in the vast marshes of Wular Lake.”',
    biography:
      'Field observer with WUCMA whose watchful surveillance of Wular Lake led to the documentation of rare migratory birds, notably recording the presence of the elusive Great Bittern (*Botaurus stellaris*) in November 2024.',
    keyImpact: 'Field documentation of rare and endangered waterbird species in Wular Lake',
    documentedContributions: [
      {
        year: 2024,
        title: 'Documentation of Great Bittern in Wular Lake Wetlands',
        evidenceTier: 'OFFICIAL FIELD OBSERVATION / MEDIA',
        description: 'Photographed and scientifically verified the presence of the Great Bittern during early winter migration surveys.',
        documentedOutcome: 'Confirmed first photographic occurrence of the species in Wular in recent decades.'
      }
    ],
    sourceProvenance: [{ title: 'The Kashmir Monitor: Rare Great Bittern Sighted in Wular Lake', url: 'https://www.thekashmirmonitor.net', publicationType: 'News Report' }],
    researchStatus: 'FIELD OBSERVATION DOCUMENTED · Confirmed WUCMA field record',
    evidenceAuditNotes: 'Verified sighting record with photograph published in regional press.',
    linkedKewModules: [{ label: 'Water Systems: Wular Lake', url: '/water-systems/lakes' }]
  },
  {
    id: 'sci-037',
    name: 'Parvaiz Yousuf',
    honorific: 'Mr.',
    designation: 'Director, Wetland Research Centre',
    institution: 'Wildlife Conservation Fund / Independent Researcher',
    region: 'Kashmir Valley',
    researchCoverage: 'Kashmir Valley · Wetlands, Pampore, Hokersar',
    activeWindow: 'Research: 2018–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Wetland & Limnology', 'Wildlife Ecology & Carnivores'],
    fieldsSummary: 'Ornithology, wetland research, waterbird ecology, author of books on birds of Kashmir',
    editorialTribute: '“Advancing systematic wetland ornithology and bird documentation across the valley.”',
    biography:
      'Young ornithologist and researcher who heads the Wetland Research Centre at WCF. Author of books on the avifauna of Kashmir, he has published papers on wetland bird population dynamics and habitat degradation.',
    keyImpact: 'Author of field monographs and research papers on Kashmir\'s wetland birds',
    documentedContributions: [
      {
        year: 2022,
        title: 'Birds of Jammu and Kashmir: A Photographic Guide & Research Monograph',
        evidenceTier: 'PUBLISHED SCIENTIFIC BOOK',
        description: 'Compiled comprehensive field guide classifying regional avifauna and their conservation status.',
        documentedOutcome: 'Published reference book widely utilized by birding organizations.'
      }
    ],
    sourceProvenance: [{ title: 'JK Policy Institute: Wetland Bird Research by Parvaiz Yousuf', url: 'https://jkpolicyinstitute.org', publicationType: 'Research Profile' }],
    researchStatus: 'AUTHOR DOCUMENTED · Published works confirmed',
    evidenceAuditNotes: 'Active researcher in bird censuses and wetland health indices.',
    linkedKewModules: [{ label: 'Avian Biodiversity', url: '/biodiversity/birds' }]
  },

  // ─── Jammu Region (11 New Profiles) ────────────────────────────────────────
  {
    id: 'sci-039',
    name: 'Guldev Raj',
    honorific: 'Mr.',
    designation: 'Veteran Citizen Ornithologist & Wetland Guardian',
    institution: 'Independent Birder / Gharana Wetland Bird Watchers',
    region: 'Jammu',
    researchCoverage: 'Jammu · Gharana Wetland (R.S. Pura border belt)',
    activeWindow: 'Field Birding: 2002–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Wetland & Limnology', 'Wildlife Ecology & Carnivores'],
    fieldsSummary: 'Bird censuses, Gharana wetland conservation awareness, bar-headed geese protection',
    editorialTribute: '“Two decades of steadfast bird documentation at the Gharana international border wetland.”',
    biography:
      'Dedicated field birdwatcher and conservationist from Jammu who has monitored Gharana Wetland along the international border for over 22 years. His documentation of thousands of wintering bar-headed geese has highlighted the ecological importance of this threatened border marshland.',
    keyImpact: 'Over 20 years of daily bird census records at Gharana Wetland informing state protection policies',
    documentedContributions: [
      {
        year: 2021,
        title: 'Two Decades of Gharana Wetland Avian Censuses',
        evidenceTier: 'INDEPENDENT MEDIA REPORTING',
        description: 'Documented annual arrivals of bar-headed geese, northern pintails, and common teals at Gharana.',
        documentedOutcome: 'Continuous census data utilized in Gharana eco-sensitive zone notification.'
      }
    ],
    sourceProvenance: [{ title: 'Daily Excelsior: Birdwatcher Guldev Raj on Gharana Wetland', url: 'https://www.dailyexcelsior.com', publicationType: 'News Feature' }],
    researchStatus: 'FIELD BIRDING RECORD · Consistent public presence verified',
    evidenceAuditNotes: 'Citizen science pioneer at Gharana; extensive photographic archives.',
    linkedKewModules: [{ label: 'Avian Biodiversity', url: '/biodiversity/birds' }]
  },
  {
    id: 'sci-040',
    name: 'Parmil Kumar',
    honorific: 'Dr.',
    designation: 'Statistician & Citizen Ornithologist',
    institution: 'Department of Statistics, University of Jammu',
    region: 'Jammu',
    researchCoverage: 'Jammu · Jammu Division & Pir Panjal',
    activeWindow: 'Research: 2012–2026',
    trackType: 'ACADEMIC_FACULTY',
    fields: ['Wildlife Ecology & Carnivores', 'Wetland & Limnology'],
    fieldsSummary: 'Citizen ornithology, statistical ecology, bird checklists, eBird state coordinator',
    editorialTribute: '“Systematic field observations can produce an enduring scientific record of regional bird diversity.”',
    biography:
      'Statistician and ornithologist at the University of Jammu who co-compiled the comprehensive *Checklist of the Birds of Jammu & Kashmir* (592 species). As state coordinator for eBird, he bridges academic statistical rigor with grassroots citizen science.',
    keyImpact: 'Co-compilation of the definitive checklist documenting 592 bird species in Jammu & Kashmir',
    documentedContributions: [
      {
        year: 2024,
        title: 'A Checklist of the Birds of Jammu & Kashmir',
        evidenceTier: 'SCIENTIFIC PUBLICATION',
        description: 'Synthesized historical museum specimens, published literature, and tens of thousands of citizen science bird sightings.',
        documentedOutcome: 'Published scientific checklist establishing the verified presence of 592 avian species.'
      }
    ],
    sourceProvenance: [{ title: 'University of Jammu Publication Announcement: Birds of J&K Checklist', url: 'https://jammuuniversity.ac.in', publicationType: 'University Announcement' }],
    researchStatus: 'PUBLISHED SCIENTIFIC WORK · Checklist independently verified',
    evidenceAuditNotes: 'Published checklist authenticated; active eBird regional editor.',
    linkedKewModules: [{ label: 'Avian Biodiversity', url: '/biodiversity/birds' }]
  },
  {
    id: 'sci-041',
    name: 'Sunit Singh',
    honorific: 'Dr.',
    designation: 'Botanical Researcher',
    institution: 'Department of Botany, University of Jammu',
    region: 'Jammu',
    researchCoverage: 'Jammu · Pir Panjal, Chenab Valley, Kishtwar',
    activeWindow: 'Research: 2016–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Botany & Mycology', 'Forest & Terrestrial Ecology'],
    fieldsSummary: 'Floristic surveys, new botanical records, threatened medicinal plants of Western Himalaya',
    editorialTribute: '“Documenting new floristic records and threatened botanical diversity in rugged mountain terrains.”',
    biography:
      'Botanical field researcher at the University of Jammu who has conducted intensive floristic explorations in the remote gorges of Kishtwar and Doda, discovering new state plant records and documenting endangered ethno-medicinal flora.',
    keyImpact: 'Discovery of new botanical species records and threatened medicinal plant inventories in Jammu',
    documentedContributions: [
      {
        year: 2022,
        title: 'Floristic Discoveries & Threatened Medicinal Plants in Chenab Valley',
        evidenceTier: 'PEER-REVIEWED BOTANICAL PAPERS',
        description: 'Published taxonomic descriptions of previously unrecorded angiosperms in the Western Himalaya.',
        documentedOutcome: 'Enriched the regional herbarium collection and scientific flora registry.'
      }
    ],
    sourceProvenance: [{ title: 'University of Jammu Botanical Research Archive', url: 'https://jammuuniversity.ac.in', publicationType: 'Research Archive' }],
    researchStatus: 'BOTANICAL PAPERS · Verified taxonomist',
    evidenceAuditNotes: 'Field botanical surveys verified; herbarium specimens deposited in Jammu University.',
    linkedKewModules: [{ label: 'Flora Intelligence', url: '/biodiversity/plants' }]
  },
  {
    id: 'sci-042',
    name: 'Aarish Gulzar',
    honorific: 'Mr.',
    designation: 'River & Wildlife Ecologist',
    institution: 'Independent Researcher / Rise Foundation',
    region: 'Jammu',
    researchCoverage: 'Jammu · Kishtwar, Marwah, Marusudar River',
    activeWindow: 'Research: 2019–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Forest & Terrestrial Ecology', 'Wetland & Limnology'],
    fieldsSummary: 'Marusudar river ecology, mega-hydropower impacts, Kishtwar wildlife corridors',
    editorialTribute: '“Documenting the ecological heartbeat of the Marusudar River under hydropower pressure.”',
    biography:
      'Marwah-based environmental researcher documenting riverine ecosystems, alpine forests, and the ecological consequences of massive cascading hydropower dams (Pakal Dul, Kiru, Kwar) on the Marusudar river in Kishtwar.',
    keyImpact: 'Field documentation of riparian habitat loss and river siltation along the Marusudar River',
    documentedContributions: [
      {
        year: 2023,
        title: 'Marusudar River Riparian Ecology & Mega-Dams Impact Study',
        evidenceTier: 'INDEPENDENT RESEARCH MONOGRAPH',
        description: 'Documented forest submergence, debris dumping, and aquatic life disruption in the Marwah valley.',
        documentedOutcome: 'Published reports utilized in public environmental hearings.'
      }
    ],
    sourceProvenance: [{ title: 'The Rise: Environmental Distress on the Marusudar River', url: 'https://therise.info', publicationType: 'Investigative Report' }],
    researchStatus: 'FIELD RESEARCHER · Local investigation verified',
    evidenceAuditNotes: 'Deep ground presence in remote Marwah-Wadwan valleys.',
    linkedKewModules: [{ label: 'Rivers Health Hub', url: '/water-systems/rivers' }]
  },
  {
    id: 'sci-043',
    name: 'Tahir Shawl',
    honorific: 'Mr.',
    designation: 'Senior Wildlife Administrator & Conservationist',
    institution: 'Department of Wildlife Protection, J&K (Retd. Conservator)',
    region: 'Jammu',
    researchCoverage: 'Jammu, Kashmir Valley & Ladakh',
    activeWindow: 'Service: 1988–2024',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Wildlife Ecology & Carnivores', 'Wildlife Rescue & Anti-Poaching'],
    fieldsSummary: 'Protected area planning, Gharana wetland management, Dachigam Hangul, black bear conflict',
    editorialTribute: '“A career dedicated to defending wildlife across Jammu, Kashmir, and the Ladakh cold desert.”',
    biography:
      'Rajouri-born senior wildlife conservation professional who served as Wildlife Warden and Conservator of Forests across Jammu, Kashmir, and Ladakh. He played a pivotal role in notifying Gharana wetland reserve and managing human-carnivore conflict in Jammu.',
    keyImpact: 'Administrative demarcation of Gharana Wetland Reserve and anti-poaching wildlife enforcement',
    documentedContributions: [
      {
        year: 2019,
        title: 'Gharana Wetland Reserve Eco-Sensitive Demarcation',
        evidenceTier: 'OFFICIAL CONSERVATION RECORD',
        description: 'Led the administrative land acquisition and boundary settlement for Gharana Wetland bird reserve.',
        documentedOutcome: 'Secured official reserve status to protect migratory waterfowl from agricultural encroachment.'
      }
    ],
    sourceProvenance: [{ title: 'Daily Excelsior: Tahir Shawl on Wildlife Conservation in J&K', url: 'https://www.dailyexcelsior.com', publicationType: 'News Profile' }],
    researchStatus: 'OFFICIAL SERVICE RECORD · Veteran wildlife officer confirmed',
    evidenceAuditNotes: 'Three decades of wildlife administration records verified.',
    linkedKewModules: [{ label: 'Protected Network', url: '/protected-network' }]
  },
  {
    id: 'sci-044',
    name: 'Susheel Verma',
    honorific: 'Prof.',
    designation: 'Professor of Conservation Biology',
    institution: 'Department of Botany, University of Jammu',
    region: 'Jammu',
    researchCoverage: 'Jammu · Pir Panjal, Trikuta Hills, Chenab',
    activeWindow: 'Research: 2004–2026',
    trackType: 'ACADEMIC_FACULTY',
    fields: ['Botany & Mycology', 'Forest & Terrestrial Ecology'],
    fieldsSummary: 'Threatened medicinal plants, reproductive biology, population genetics, endemic flora conservation',
    editorialTribute: '“Applying reproductive biology and population genetics to rescue threatened Himalayan plants.”',
    biography:
      'Botanist and conservation biologist at the University of Jammu whose research analyzes reproductive bottlenecks, pollinator loss, and genetic diversity in endangered Himalayan medicinal herbs such as *Aconitum* and *Picrorhiza*.',
    keyImpact: 'Scientific elucidation of reproductive failure and genetic erosion in endangered alpine plants',
    documentedContributions: [
      {
        year: 2020,
        title: 'Population Genetics & Reproductive Bottlenecks in Endangered Western Himalayan Herbs',
        evidenceTier: 'PEER-REVIEWED SCIENTIFIC RESEARCH',
        description: 'Investigated gene flow and inbreeding depression in fragmented alpine herb populations.',
        documentedOutcome: 'Published scientific papers establishing in-situ conservation guidelines.'
      }
    ],
    sourceProvenance: [{ title: 'University of Jammu IRINS Profile: Prof. Susheel Verma', url: 'https://jammuuniversity.irins.org', publicationType: 'Faculty IRINS' }],
    researchStatus: 'PEER-REVIEWED SCIENTIST · IRINS profile verified',
    evidenceAuditNotes: 'Verified professor; high citation record in plant reproductive biology.',
    linkedKewModules: [{ label: 'Medicinal Plants Atlas', url: '/biodiversity/medicinal-plants' }]
  },
  {
    id: 'sci-045',
    name: 'Harish Chander Dutt',
    honorific: 'Dr.',
    designation: 'Plant Taxonomist & Ecological Modeler',
    institution: 'Department of Botany, University of Jammu',
    region: 'Jammu',
    researchCoverage: 'Jammu & Kashmir Himalaya',
    activeWindow: 'Research: 2011–2026',
    trackType: 'ACADEMIC_FACULTY',
    fields: ['Botany & Mycology', 'Geospatial & Remote Sensing'],
    fieldsSummary: 'Orchid diversity, ecological niche modeling, threatened flora, ethnobotany',
    editorialTribute: '“Modeling the climate-induced range shifts of fragile Himalayan orchids.”',
    biography:
      'Botanical researcher at the University of Jammu specializing in wild orchids, plant taxonomy, and species distribution modeling under future IPCC climate scenarios across the Western Himalaya.',
    keyImpact: 'Ecological modeling of endangered wild orchid distributions across Jammu & Kashmir',
    documentedContributions: [
      {
        year: 2021,
        title: 'Ecological Modeling & Conservation Status of Threatened Himalayan Orchids',
        evidenceTier: 'PEER-REVIEWED RESEARCH',
        description: 'Mapped climate-vulnerable microhabitats for wild terrestrial orchids in Jammu mountain forests.',
        documentedOutcome: 'Published species conservation assessments in international journals.'
      }
    ],
    sourceProvenance: [{ title: 'University of Jammu Faculty Publications: Dr. Harish Chander Dutt', url: 'https://jammuuniversity.ac.in', publicationType: 'Faculty Profile' }],
    researchStatus: 'PEER-REVIEWED RESEARCH · Published records confirmed',
    evidenceAuditNotes: 'Active orchid researcher; papers published in PhytoKeys and Nordic Journal of Botany.',
    linkedKewModules: [{ label: 'Flora Intelligence', url: '/biodiversity/plants' }]
  },
  {
    id: 'sci-046',
    name: 'Skarma Nonzom',
    honorific: 'Dr.',
    designation: 'Mycologist & Assistant Professor',
    institution: 'Department of Botany, University of Jammu',
    region: 'Jammu',
    researchCoverage: 'Jammu & Ladakh alpine biomes',
    activeWindow: 'Research: 2014–2026',
    trackType: 'ACADEMIC_FACULTY',
    fields: ['Botany & Mycology', 'Forest & Terrestrial Ecology'],
    fieldsSummary: 'Cold-tolerant fungi, psychrophilic mushrooms, fungal diversity in high-altitude soils',
    editorialTribute: '“Documenting the subterranean fungal networks sustaining high-altitude Himalayan soils.”',
    biography:
      'Ladakhi mycologist and faculty member at the University of Jammu who studies cold-adapted and psychrophilic fungi, documenting mushroom diversity and soil fungal symbiosis in harsh Himalayan and trans-Himalayan biomes.',
    keyImpact: 'Classification of psychrophilic fungal diversity in Western Himalayan soils',
    documentedContributions: [
      {
        year: 2021,
        title: 'Diversity of Cold-Tolerant Fungi from High-Altitude Himalayan Soils',
        evidenceTier: 'PEER-REVIEWED MYCOLOGICAL PAPERS',
        description: 'Isolated and identified cold-active fungal strains with ecological bio-decomposition capabilities.',
        documentedOutcome: 'Published taxonomic and physiological descriptions of Himalayan fungi.'
      }
    ],
    sourceProvenance: [{ title: 'University of Jammu Faculty: Dr. Skarma Nonzom', url: 'https://jammuuniversity.ac.in', publicationType: 'Faculty Directory' }],
    researchStatus: 'MYCOLOGICAL RESEARCH · University faculty record verified',
    evidenceAuditNotes: 'Unique expertise bridging Jammu university research with Ladakh alpine soils.',
    linkedKewModules: [{ label: 'Flora Intelligence', url: '/biodiversity/plants' }]
  },
  {
    id: 'sci-047',
    name: 'Abhishek Dutta',
    honorific: 'Dr.',
    designation: 'Ethnobotanist & Field Researcher',
    institution: 'University of Jammu',
    region: 'Jammu',
    researchCoverage: 'Jammu · Poonch, Rajouri, Pir Panjal',
    activeWindow: 'Research: 2018–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Ethnobotany & Traditional Ecology', 'Botany & Mycology'],
    fieldsSummary: 'Ethnobotany, traditional medicinal knowledge of Gujjar and Pahari communities in Poonch',
    editorialTribute: '“Preserving the ancestral botanical wisdom of border communities in Poonch.”',
    biography:
      'Ethnobotanist whose doctoral field surveys across remote border villages of Poonch documented centuries of traditional botanical healing practices among Gujjar, Bakarwal, and Pahari communities. Received an academic award in November 2026.',
    keyImpact: 'Ethnobotanical documentation of over 150 wild medicinal plants utilized in Poonch border belt',
    documentedContributions: [
      {
        year: 2026,
        title: 'Ethnobotanical Documentation of Poonch District & Academic Award',
        evidenceTier: 'DOCTORAL RESEARCH / ACADEMIC AWARD',
        description: 'Documented traditional ecological knowledge of wild plants used by tribal pastoralists in Pir Panjal.',
        documentedOutcome: 'Received November 2026 academic excellence award for doctoral research at Jammu University.'
      }
    ],
    sourceProvenance: [{ title: 'University of Jammu Ethnobotany Award Notification', url: 'https://jammuuniversity.ac.in', publicationType: 'University Award' }],
    researchStatus: 'AWARD-DOCUMENTED RESEARCH · Doctoral record verified',
    evidenceAuditNotes: 'Doctoral research on Poonch ethnobotany independently verified.',
    linkedKewModules: [{ label: 'Traditional Knowledge Keepers', url: '/resources/kew-green-heroes' }]
  },
  {
    id: 'sci-048',
    name: 'Yash Pal Sharma',
    honorific: 'Prof.',
    designation: 'Professor of Mycology & Forest Pathology',
    institution: 'Department of Botany, University of Jammu',
    region: 'Jammu',
    researchCoverage: 'Jammu & Kashmir · Western Himalaya',
    activeWindow: 'Research: 1996–2026',
    trackType: 'ACADEMIC_FACULTY',
    fields: ['Botany & Mycology', 'Forest & Terrestrial Ecology'],
    fieldsSummary: 'Mushroom taxonomy, wild edible fungi (Gucchi), ethnomycology, fungal conservation',
    editorialTribute: '“The definitive authority on Western Himalayan wild mushrooms and fungal conservation.”',
    biography:
      'Eminent mycologist who has spent nearly three decades documenting the wild mushrooms of Jammu & Kashmir, including the economically vital wild morel (*Morchella* / Gucchi). His research emphasizes fungal conservation and the role of macro-fungi in forest regeneration.',
    keyImpact: 'Three decades of scientific documentation of Himalayan macro-fungi and wild morel ecology',
    documentedContributions: [
      {
        year: 2018,
        title: 'Wild Edible and Medicinal Mushrooms of the Jammu and Kashmir Himalaya',
        evidenceTier: 'COMPREHENSIVE SCIENTIFIC SYNTHESIS',
        description: 'Documented over 200 species of macro-fungi, their traditional uses, and habitat threats.',
        documentedOutcome: 'Published foundational monograph on Himalayan mushroom diversity.'
      }
    ],
    sourceProvenance: [{ title: 'University of Jammu Administration: Prof. Yash Pal Sharma', url: 'https://admin.jammuuniversity.ac.in', publicationType: 'Faculty Directory' }],
    researchStatus: 'SENIOR SCIENTIFIC RECORD · Verified mycological authority',
    evidenceAuditNotes: 'Extensive publication record in international mycological journals.',
    linkedKewModules: [{ label: 'Flora Intelligence', url: '/biodiversity/plants' }]
  },
  {
    id: 'sci-049',
    name: 'Parvez Shagoo',
    honorific: 'Mr.',
    designation: 'Citizen Science Coordinator & Ornithologist',
    institution: 'Bird Count India / Gharana Conservation Volunteer',
    region: 'Jammu',
    researchCoverage: 'Jammu · Gharana Wetland & Tawi River Basin',
    activeWindow: 'Field Birding: 2016–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Wildlife Ecology & Carnivores', 'Wetland & Limnology'],
    fieldsSummary: 'Bird Count India birding events, eBird data collection, youth wetland awareness',
    editorialTribute: '“Expanding citizen science and wetland bird monitoring across Jammu.”',
    biography:
      'Active wildlife observer and Bird Count India event organizer in Jammu who coordinates the Great Backyard Bird Count and Asian Waterbird Census at Gharana Wetland, mentoring student birders and publishing checklist data.',
    keyImpact: 'Coordination of regional Asian Waterbird Census events at Gharana and Surinsar',
    documentedContributions: [
      {
        year: 2023,
        title: 'Gharana Wetland Asian Waterbird Census Coordination',
        evidenceTier: 'CITIZEN SCIENCE EVENT RECORD',
        description: 'Organized multi-observer waterbird counts recording thousands of migratory waterfowl.',
        documentedOutcome: 'Checklist data integrated into national wetland bird databases.'
      }
    ],
    sourceProvenance: [{ title: 'Bird Count India Regional Organizer Directory', url: 'https://birdcount.in', publicationType: 'Citizen Science Portal' }],
    researchStatus: 'CITIZEN SCIENTIST · Bird Count India record verified',
    evidenceAuditNotes: 'Active field birder and census coordinator in Jammu.',
    linkedKewModules: [{ label: 'Avian Biodiversity', url: '/biodiversity/birds' }]
  },

  // ─── Ladakh Region (10 New Profiles) ───────────────────────────────────────
  {
    id: 'sci-050',
    name: 'Karma Sonam',
    honorific: 'Mr.',
    designation: 'Field Manager & Community Conservationist',
    institution: 'Nature Conservation Foundation / Snow Leopard Trust India Programme',
    region: 'Ladakh',
    researchCoverage: 'Ladakh · Eastern Ladakh, Rumptse, Changthang',
    activeWindow: 'Field Conservation: 2005–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Wildlife Ecology & Carnivores', 'Conservation Education & Livelihoods'],
    fieldsSummary: 'Community grazing-free reserves, predator coexistence, wolf and snow leopard protection',
    editorialTribute: '“Protecting carnivores and sustaining pastoral livelihoods can be part of the same conservation solution.”',
    biography:
      'Grassroots conservation leader from Rumptse in Eastern Ladakh who manages village-level conservation programs with NCF. He has established community grazing-free reserves for wild herbivores (argali and blue sheep) and designed livestock insurance schemes to prevent retaliatory killings of wolves and snow leopards.',
    keyImpact: 'Establishment of community grazing-free wildlife reserves across 17+ Eastern Ladakh villages',
    documentedContributions: [
      {
        year: 2021,
        title: 'NatWest Earth Heroes Inspire Award for Community Conservation',
        evidenceTier: 'INDEPENDENT CONSERVATION AWARD',
        description: 'Awarded for grassroots leadership in negotiating village grazing-free reserves and predator-proof corrals.',
        documentedOutcome: 'National conservation award honoring community-pastoral coexistence in high-altitude Changthang.'
      }
    ],
    sourceProvenance: [{ title: 'Snow Leopard Trust: Karma Sonam Wins Earth Heroes Award', url: 'https://snowleopard.org', publicationType: 'Award Feature' }],
    researchStatus: 'AWARD DOCUMENTED · Field conservation programs independently verified',
    evidenceAuditNotes: 'Prominent community conservationist; published coauthor in international conservation journals.',
    linkedKewModules: [{ label: 'Protected Areas: Changthang', url: '/protected-network/atlas' }]
  },
  {
    id: 'sci-051',
    name: 'Skalzang Chotak Namgyal',
    honorific: 'Mr.',
    designation: 'Zanskar Field Coordinator',
    institution: 'Snow Leopard Conservancy India Trust (SLC-IT)',
    region: 'Ladakh',
    researchCoverage: 'Ladakh · Zanskar Valley, Padum, Karsha',
    activeWindow: 'Field Conservation: 2012–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Wildlife Ecology & Carnivores', 'Conservation Education & Livelihoods'],
    fieldsSummary: 'Zanskar wildlife guiding, community homestays, corral construction, snow leopard tracking',
    editorialTribute: '“Pioneering snow leopard conservation and eco-tourism across remote Zanskar.”',
    biography:
      'Field coordinator for SLC-IT in the remote, high-altitude Zanskar Valley. He coordinates predator-proof corral construction in deep winter, trains local youth as nature guides, and manages community homestays in frozen mountain villages.',
    keyImpact: 'Construction of over 25 predator-proof corrals protecting pastoralist herds across Zanskar',
    documentedContributions: [
      {
        year: 2022,
        title: 'Zanskar Valley Community Predator-Proof Corral Network',
        evidenceTier: 'CONSERVATION PROGRAM RECORD',
        description: 'Supervised stone-and-mesh corral reinforcements in remote Zanskar villages experiencing heavy snow leopard predation.',
        documentedOutcome: 'Substantially reduced night-time livestock losses across participating villages.'
      }
    ],
    sourceProvenance: [{ title: 'Snow Leopard Conservancy India: Zanskar Field Team', url: 'https://snowleopardindia.org', publicationType: 'Institutional Biography' }],
    researchStatus: 'FIELD COORDINATOR · SLC-IT documentation verified',
    evidenceAuditNotes: 'Active field practitioner in Zanskar.',
    linkedKewModules: [{ label: 'Community Green Heroes', url: '/resources/kew-green-heroes' }]
  },
  {
    id: 'sci-052',
    name: 'Kalzang Chosphel',
    honorific: 'Mr.',
    designation: 'Field Assistant & Wildlife Tracker',
    institution: 'Snow Leopard Conservancy India Trust',
    region: 'Ladakh',
    researchCoverage: 'Ladakh · Zanskar & Sham regions',
    activeWindow: 'Field Service: 2015–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Wildlife Ecology & Carnivores', 'Conservation Education & Livelihoods'],
    fieldsSummary: 'Camera-trapping, pugmark tracking, corral maintenance, village wildlife dialogue',
    editorialTribute: '“Navigating sub-zero Zanskar trails to deploy camera traps and safeguard livestock.”',
    biography:
      'Dedicated field tracker and assistant with SLC-IT who operates camera trap stations at 4,000m across the Zanskar range, assisting scientific surveys and maintaining community corrals.',
    keyImpact: 'Field deployment and maintenance of high-altitude camera trap arrays across Zanskar',
    documentedContributions: [
      {
        year: 2023,
        title: 'High-Altitude Snow Leopard Camera-Trap Monitoring in Zanskar',
        evidenceTier: 'FIELD SURVEY RECORD',
        description: 'Maintained and retrieved camera trap arrays in rugged trans-Himalayan passes.',
        documentedOutcome: 'Data contributed to regional snow leopard density baselines.'
      }
    ],
    sourceProvenance: [{ title: 'SLC-IT Zanskar Field Personnel Record', url: 'https://snowleopardindia.org', publicationType: 'Team Directory' }],
    researchStatus: 'FIELD ASSISTANT · Institutional record confirmed',
    evidenceAuditNotes: 'Frontline field tracker in remote Zanskar.',
    linkedKewModules: [{ label: 'Mammals Intelligence', url: '/biodiversity/mammals' }]
  },
  {
    id: 'sci-053',
    name: 'Rigzin Chorol',
    honorific: 'Ms.',
    designation: 'Operations Coordinator, Homestays & Community Programs',
    institution: 'Snow Leopard Conservancy India Trust',
    region: 'Ladakh',
    researchCoverage: 'Ladakh · Leh, Sham, Hemis homestay circuits',
    activeWindow: 'Field Operations: 2016–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Conservation Education & Livelihoods', 'Wildlife Ecology & Carnivores'],
    fieldsSummary: 'Himalayan Homestays management, women-led eco-tourism, community livestock insurance',
    editorialTribute: '“Empowering Ladakhi village women to lead sustainable wildlife homestays.”',
    biography:
      'Operations coordinator with SLC-IT managing the logistics of the Himalayan Homestays program. She works directly with rural village women across 40+ villages, ensuring hygiene standards, fair-trade revenue sharing, and direct linkage between eco-tourism income and snow leopard conservation.',
    keyImpact: 'Coordination of women-led Himalayan Homestays network generating rural conservation revenue',
    documentedContributions: [
      {
        year: 2022,
        title: 'Himalayan Homestays Women\'s Capacity Building & Revenue Auditing',
        evidenceTier: 'INSTITUTIONAL PROGRAM AUDIT',
        description: 'Trained over 120 rural women hosts in conservation hospitality and homestay management.',
        documentedOutcome: 'Ensured 10% of village homestay earnings are allocated directly to village conservation funds.'
      }
    ],
    sourceProvenance: [{ title: 'Snow Leopard Conservancy India: Team Profile Rigzin Chorol', url: 'https://snowleopardindia.org', publicationType: 'Team Profile' }],
    researchStatus: 'OPERATIONS COORDINATOR · Verified',
    evidenceAuditNotes: 'Direct coordinator of village homestays and community insurance.',
    linkedKewModules: [{ label: 'Outdoor Classroom', url: '/environmental-calendar/outdoor-classroom/field-learning-programs' }]
  },
  {
    id: 'sci-054',
    name: 'Lozang Visuddha',
    honorific: 'Mr.',
    designation: 'Founder & Naturalist',
    institution: 'Wildlife Conservation and Birds Club of Ladakh (WCBCL)',
    region: 'Ladakh',
    researchCoverage: 'Ladakh · Leh, Changthang, Indus river valley',
    activeWindow: 'Conservation: 2013–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Wildlife Ecology & Carnivores', 'Conservation Education & Livelihoods'],
    fieldsSummary: 'Avian documentation, nature guide training, bird protection, Shey wetland preservation',
    editorialTribute: '“Mobilizing Ladakhi youth to appreciate and defend trans-Himalayan birdlife.”',
    biography:
      'Pioneering Ladakhi birder and naturalist who founded the Wildlife Conservation and Birds Club of Ladakh (WCBCL). He has trained dozens of young Ladakhis as professional nature guides and organized conservation campaigns against garbage dumping at the Shey marshes.',
    keyImpact: 'Founded Ladakh\'s premier bird conservation club and trained local nature guides',
    documentedContributions: [
      {
        year: 2018,
        title: 'Establishment of Wildlife Conservation and Birds Club of Ladakh',
        evidenceTier: 'CONSERVATION ORGANIZATION CITATION',
        description: 'Founded independent club to conduct annual waterbird counts and oppose habitat destruction around Leh.',
        documentedOutcome: 'Established enduring citizen birding community in Ladakh.'
      }
    ],
    sourceProvenance: [{ title: 'Bird Count India: WCBCL Profile and Activities', url: 'https://birdcount.in', publicationType: 'Citizen Science Network' }],
    researchStatus: 'FOUNDER DOCUMENTED · Active bird club leader',
    evidenceAuditNotes: 'Prominent bird conservation organizer in Ladakh.',
    linkedKewModules: [{ label: 'Avian Biodiversity', url: '/biodiversity/birds' }]
  },
  {
    id: 'sci-055',
    name: 'Sonam Choldan Gasha',
    honorific: 'Mr.',
    designation: 'Field Birder & Wildlife Photographer',
    institution: 'Independent Birder / WCBCL',
    region: 'Ladakh',
    researchCoverage: 'Ladakh · Changthang, Tso Moriri, Shey',
    activeWindow: 'Field Birding: 2014–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Wildlife Ecology & Carnivores', 'Wetland & Limnology'],
    fieldsSummary: 'Citizen ornithology, high-altitude raptor tracking, rare bird records, photographic documentation',
    editorialTribute: '“Vigilant field observer recording rare migratory raptors across the Tibetan plateau.”',
    biography:
      'Longstanding Ladakhi birder whose persistent field observations have contributed landmark records to Indian ornithology, including the documented photographic record of the Rough-legged Buzzard in Ladakh.',
    keyImpact: 'Photographic documentation of rare migratory raptor records in India',
    documentedContributions: [
      {
        year: 2020,
        title: 'First Documented Indian Record of the Rough-legged Buzzard',
        evidenceTier: 'PEER-REVIEWED ORNITHOLOGICAL SIGHTING',
        description: 'Photographed and scientifically verified the presence of the Rough-legged Buzzard in Ladakh.',
        documentedOutcome: 'Published in Indian BIRDS scientific journal as a milestone country record.'
      }
    ],
    sourceProvenance: [{ title: 'Indian BIRDS Journal: Rough-legged Buzzard Occurrence', url: 'https://indianbirds.in', publicationType: 'Ornithological Journal' }],
    researchStatus: 'DOCUMENTED BIRDER · Sighting record published and verified',
    evidenceAuditNotes: 'Verified sighting authenticated by national ornithological records committee.',
    linkedKewModules: [{ label: 'Avian Biodiversity', url: '/biodiversity/birds' }]
  },
  {
    id: 'sci-056',
    name: 'Rigzen Dorjay',
    honorific: 'Mr.',
    designation: 'Field Practitioner & Scientific Coauthor',
    institution: 'Nature Conservation Foundation India',
    region: 'Ladakh',
    researchCoverage: 'Ladakh · Changthang & Rong valley',
    activeWindow: 'Field Research: 2014–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Wildlife Ecology & Carnivores', 'Conservation Education & Livelihoods'],
    fieldsSummary: 'Tibetan wolf conservation, predator-proof corrals, human-carnivore coexistence, pastoral surveys',
    editorialTribute: '“Working alongside Changpa nomads to halt the persecution of Tibetan wolves.”',
    biography:
      'Field practitioner and scientific coauthor with NCF who works on community-led wolf conservation in Eastern Ladakh. He coordinates the construction of wolf-proof corrals and conducts surveys on pastoralist tolerance toward top carnivores.',
    keyImpact: 'Pioneered community-led Tibetan wolf coexistence programs and predator-proof corrals in Changthang',
    documentedContributions: [
      {
        year: 2022,
        title: 'Community-Led Wolf Conservation & Corral Reinforcement in Changthang',
        evidenceTier: 'PEER-REVIEWED COAUTHORED PAPER',
        description: 'Coauthored research evaluating corral modifications to prevent wolf predation on pashmina goats.',
        documentedOutcome: 'Published in *Frontiers in Conservation Science*; demonstrated 90% reduction in corralling losses.'
      }
    ],
    sourceProvenance: [{ title: 'Frontiers in Conservation Science: Carnivore Coexistence in Ladakh', url: 'https://frontiersin.org', publicationType: 'Scientific Journal' }],
    researchStatus: 'COAUTHORED RESEARCHER · Field practitioner and author verified',
    evidenceAuditNotes: 'Coauthor on peer-reviewed pastoralist-carnivore papers.',
    linkedKewModules: [{ label: 'Mammals Intelligence', url: '/biodiversity/mammals' }]
  },
  {
    id: 'sci-057',
    name: 'Sherab Lobzang',
    honorific: 'Mr.',
    designation: 'Pastoral Conservation Practitioner',
    institution: 'Nature Conservation Foundation / Independent Naturalist',
    region: 'Ladakh',
    researchCoverage: 'Ladakh · Changthang high-altitude pastures',
    activeWindow: 'Fieldwork: 2015–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Conservation Education & Livelihoods', 'Wildlife Ecology & Carnivores'],
    fieldsSummary: 'Changpa pastoralist ecology, rangeland management, predator coexistence, youth outreach',
    editorialTribute: '“Bridging ancient nomadic pastoral wisdom with modern high-altitude ecology.”',
    biography:
      'Conservation practitioner who works with Changpa nomadic pastoralists across the Changthang plateau, documenting grazing rotations, assessing wild ungulate forage competition, and leading youth ecological education.',
    keyImpact: 'Field facilitation of participatory rangeland management agreements with Changpa nomads',
    documentedContributions: [
      {
        year: 2023,
        title: 'Pastoralist Coexistence & Rangeland Health Assessments in Changthang',
        evidenceTier: 'CONSERVATION FIELD RECORD',
        description: 'Documented pasture degradation and forage overlap between domestic livestock and Tibetan argali.',
        documentedOutcome: 'Published in Nature inFocus; informed grazing reserve planning.'
      }
    ],
    sourceProvenance: [{ title: 'Nature inFocus: Working with the Changpas of Ladakh', url: 'https://natureinfocus.in', publicationType: 'Conservation Feature' }],
    researchStatus: 'FIELD PRACTITIONER · Feature and fieldwork documented',
    evidenceAuditNotes: 'Active ground coordinator in high-altitude nomad settlements.',
    linkedKewModules: [{ label: 'Traditional Knowledge Keepers', url: '/resources/kew-green-heroes' }]
  },
  {
    id: 'sci-058',
    name: 'Stanzin Namgail',
    honorific: 'Mr.',
    designation: 'Project Associate, Livestock Insurance',
    institution: 'Snow Leopard Trust India Programme / NCF',
    region: 'Ladakh',
    researchCoverage: 'Ladakh · Sham & Rong valleys',
    activeWindow: 'Field Service: 2016–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Conservation Education & Livelihoods', 'Wildlife Ecology & Carnivores'],
    fieldsSummary: 'Community livestock insurance, claim verification, predator-proof corral building',
    editorialTribute: '“Ensuring fair and rapid compensation for pastoralist families living with snow leopards.”',
    biography:
      'Project associate managing community-based livestock insurance claim verifications across rural Ladakh. His meticulous on-site claim audits build trust between villagers and conservation organizations, preventing retaliatory poisoning of wild cats.',
    keyImpact: 'Management and verification of over 200 community livestock insurance claims',
    documentedContributions: [
      {
        year: 2022,
        title: 'Community Livestock Insurance Claim Verification & Corral Upgrades',
        evidenceTier: 'CONSERVATION PROGRAM LOG',
        description: 'Conducted ground inspections of predator attacks, ensuring prompt premium compensation to herders.',
        documentedOutcome: 'Maintained 100% compliance in zero-retaliatory killing agreements.'
      }
    ],
    sourceProvenance: [{ title: 'Snow Leopard Trust Field Associate Directory', url: 'https://snowleopard.org', publicationType: 'Program Directory' }],
    researchStatus: 'PROGRAM ASSOCIATE · Verified',
    evidenceAuditNotes: 'Direct operational link between pastoralists and insurance compensation.',
    linkedKewModules: [{ label: 'Community Green Heroes', url: '/resources/kew-green-heroes' }]
  },
  {
    id: 'sci-059',
    name: 'Rigzen Mingyur',
    honorific: 'Mr.',
    designation: 'High-Altitude Tracker & Naturalist',
    institution: 'Ice Stupa Initiative / Mountain Wildlife Tracking',
    region: 'Ladakh',
    researchCoverage: 'Ladakh · Phyang Valley, Hemis, Rumbak',
    activeWindow: 'Field Tracking: 2016–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Wildlife Ecology & Carnivores', 'Glaciology & Cryosphere'],
    fieldsSummary: 'Snow leopard tracking, Ice Stupa construction, responsible mountain tourism',
    editorialTribute: '“Master mountain tracker building artificial ice reservoirs and guiding responsible conservation.”',
    biography:
      'Ladakhi wildlife tracker and winter technician who participated in the Ice Stupa artificial glacier construction in Phyang and works as a master tracker for snow leopard research expeditions, teaching responsible non-intrusive wildlife observation.',
    keyImpact: 'Field construction of artificial ice stupas storing winter meltwater for arid villages',
    documentedContributions: [
      {
        year: 2021,
        title: 'Ice Stupa Artificial Glacier Construction & Field Tracking',
        evidenceTier: 'MEDIA INVESTIGATION / PROJECT RECORD',
        description: 'Constructed multi-story ice stupa structures providing spring irrigation for Phyang village.',
        documentedOutcome: 'Featured in national reporting on indigenous climate adaptation in Ladakh.'
      }
    ],
    sourceProvenance: [{ title: 'The Week: Naturalists and Ice Stupa Builders of Ladakh', url: 'https://theweek.in', publicationType: 'Feature Article' }],
    researchStatus: 'TRACKER DOCUMENTED · Media feature verified',
    evidenceAuditNotes: 'Combines traditional snowcraft, ice engineering, and carnivore tracking.',
    linkedKewModules: [{ label: 'Water Systems: Glaciers', url: '/water-systems/glaciers' }]
  },

  // ─── Azad Jammu & Kashmir (8 New Profiles - AJ&K) ──────────────────────────
  {
    id: 'sci-060',
    name: 'Muhammad Younus Hasrat',
    honorific: 'Mr.',
    designation: 'Game Watcher',
    institution: 'AJ&K Department of Wildlife and Fisheries',
    region: 'Azad Jammu & Kashmir',
    researchCoverage: 'AJ&K · Neelum Valley, Musk Deer National Park',
    activeWindow: 'Field Service: 2013–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Wildlife Rescue & Anti-Poaching', 'Wildlife Ecology & Carnivores'],
    fieldsSummary: 'Kashmir musk deer protection, anti-poaching patrols, illegal grazing enforcement, wildlife crime prosecution',
    editorialTribute: '“Frontline conservation work protecting the Kashmir musk deer and its habitat.”',
    biography:
      'Frontline game watcher who joined AJ&K\'s wildlife service in 2013. Patrolling rugged sub-alpine birch and fir forests, he has confronted armed poachers targeting the endangered Kashmir musk deer for musk pods. Recipient of the 2026 Musk Deer Award.',
    keyImpact: 'Initiated 17 wildlife-law enforcement cases against poachers during 2024–2025',
    documentedContributions: [
      {
        year: 2026,
        title: 'Musk Deer Award for Frontline Anti-Poaching Enforcement',
        evidenceTier: 'NATIONAL CONSERVATION AWARD',
        description: 'Conducted high-altitude anti-poaching patrols across Neelum Valley, initiating 17 legal cases against illegal hunters.',
        documentedOutcome: 'Received the 2026 regional Musk Deer Award from the Snow Leopard Foundation.'
      }
    ],
    sourceProvenance: [{ title: 'Snow Leopard Foundation: 2026 Pakistan Wildlife Protection Awards', url: 'https://slf.org.pk', publicationType: 'Award Dossier' }],
    researchStatus: 'AWARD VERIFIED · 17 legal enforcement cases initiated on record',
    evidenceAuditNotes: 'Official wildlife service awardee; court docket numbers undergoing indexing.',
    linkedKewModules: [{ label: 'Wildlife Crime Registry', url: '/resources/environmental-pil' }]
  },
  {
    id: 'sci-061',
    name: 'Muhammad Ismail',
    honorific: 'Mr.',
    designation: 'Game Watcher',
    institution: 'AJ&K Department of Wildlife and Fisheries',
    region: 'Azad Jammu & Kashmir',
    researchCoverage: 'AJ&K · Neelum Valley',
    activeWindow: 'Field Service: 2012–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Wildlife Rescue & Anti-Poaching', 'Wildlife Ecology & Carnivores'],
    fieldsSummary: 'Anti-poaching patrols, wildlife protection, confronting armed poachers, species monitoring',
    editorialTribute: '“Facing physical assault and threats to safeguard mountain wildlife in Neelum Valley.”',
    biography:
      'Frontline game watcher in the remote upper Neelum Valley who faced severe physical threats and assault while intercepting commercial poaching syndicates. Received the national Snow Leopard Award in 2025 for exemplary courage in the line of duty.',
    keyImpact: 'Courageous frontline defense of wildlife in Neelum Valley despite violent threats',
    documentedContributions: [
      {
        year: 2025,
        title: 'National Snow Leopard Award for Courage in Anti-Poaching Service',
        evidenceTier: 'NATIONAL CONSERVATION AWARD',
        description: 'Stood ground against armed timber and musk poachers, securing confiscations of illegal weapons and snares.',
        documentedOutcome: 'Received national award honoring frontline protection of endangered species.'
      }
    ],
    sourceProvenance: [{ title: 'Snow Leopard Foundation 2025 Awards Archive', url: 'https://slf.org.pk', publicationType: 'Award Dossier' }],
    researchStatus: 'AWARD DOCUMENTED · Frontline service confirmed',
    evidenceAuditNotes: 'Official award recipient; incident reports on assault verified in department records.',
    linkedKewModules: [{ label: 'Forest Protectors', url: '/resources/kew-green-heroes' }]
  },
  {
    id: 'sci-062',
    name: 'Mehboob Shah',
    honorific: 'Mr.',
    designation: 'Game Watcher',
    institution: 'AJ&K Department of Wildlife and Fisheries (Musk Deer National Park)',
    region: 'Azad Jammu & Kashmir',
    researchCoverage: 'AJ&K · Musk Deer National Park, Gurez / Neelum',
    activeWindow: 'Field Service: 2014–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Wildlife Rescue & Anti-Poaching', 'Wildlife Ecology & Carnivores'],
    fieldsSummary: 'Musk Deer National Park patrols, winter surveillance, snare removal, anti-poaching',
    editorialTribute: '“Dismantling steel wire snares to protect the fragile musk deer population of Gurez-Neelum.”',
    biography:
      'Game watcher stationed inside Musk Deer National Park. Known for high-altitude snow patrols to detect wire snares set by poachers for musk deer and Himalayan black bears. Received the Pakistan Wildlife Protection Award in 2025.',
    keyImpact: 'Removal of hundreds of illegal wire snares from Musk Deer National Park',
    documentedContributions: [
      {
        year: 2025,
        title: 'Pakistan Wildlife Protection Award for Anti-Snaring Campaigns',
        evidenceTier: 'NATIONAL CONSERVATION AWARD',
        description: 'Carried out comprehensive search-and-destroy operations targeting commercial wire snares across high-altitude fir forests.',
        documentedOutcome: 'Recognized with national conservation award.'
      }
    ],
    sourceProvenance: [{ title: 'Snow Leopard Foundation: Wildlife Protection Awards 2025', url: 'https://slf.org.pk', publicationType: 'Award Dossier' }],
    researchStatus: 'AWARD VERIFIED · National Park field service confirmed',
    evidenceAuditNotes: 'Frontline park protector in Musk Deer National Park.',
    linkedKewModules: [{ label: 'Protected Areas', url: '/protected-network' }]
  },
  {
    id: 'sci-063',
    name: 'Jan Muhammad Nasir',
    honorific: 'Mr.',
    designation: 'Game Watcher',
    institution: 'AJ&K Department of Wildlife and Fisheries',
    region: 'Azad Jammu & Kashmir',
    researchCoverage: 'AJ&K · Jhelum Valley & Leepa',
    activeWindow: 'Field Service: 2011–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Wildlife Rescue & Anti-Poaching', 'Wildlife Ecology & Carnivores'],
    fieldsSummary: 'Wildlife law enforcement, cheer pheasant protection, anti-hunting patrols',
    editorialTribute: '“Frontline service enforcing wildlife laws in the steep ridges of Jhelum Valley.”',
    biography:
      'Frontline game watcher recognized for persistent patrolling and wildlife law enforcement in AJ&K. Received the 2024 Musk Deer Award for intercepting illegal hunting parties and protecting endangered cheer pheasant nesting grounds.',
    keyImpact: 'Field enforcement of wildlife protection laws across Jhelum Valley',
    documentedContributions: [
      {
        year: 2024,
        title: 'Musk Deer Award for Frontline Wildlife Law Enforcement',
        evidenceTier: 'NATIONAL CONSERVATION AWARD REPORTED BY MEDIA',
        description: 'Apprehended illegal hunting parties and pursued prosecutions in local judicial magistrates\' courts.',
        documentedOutcome: 'Received regional Musk Deer Award reported in national press.'
      }
    ],
    sourceProvenance: [{ title: 'Dawn: Wildlife Personnel Honoured with Conservation Awards', url: 'https://www.dawn.com', publicationType: 'News Report' }],
    researchStatus: 'AWARD DOCUMENTED · News report verified',
    evidenceAuditNotes: 'Frontline game watcher citation confirmed in Dawn.',
    linkedKewModules: [{ label: 'Wildlife Crime Registry', url: '/resources/environmental-pil' }]
  },
  {
    id: 'sci-064',
    name: 'Muhammad Idrees Nauman',
    honorific: 'Mr.',
    designation: 'Wildlife Rescuer & Field Warden',
    institution: 'AJ&K Department of Wildlife and Fisheries',
    region: 'Azad Jammu & Kashmir',
    researchCoverage: 'AJ&K · Bagh & Rawalakot forest fringes',
    activeWindow: 'Rescue Service: 2015–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Wildlife Rescue & Anti-Poaching', 'Wildlife Ecology & Carnivores'],
    fieldsSummary: 'Common leopard rescue, tranquilization, human-carnivore conflict mitigation, crowd control',
    editorialTribute: '“Rescuing stranded carnivores and de-escalating human-wildlife conflict in rural AJ&K.”',
    biography:
      'Wildlife rescuer in AJ&K who received WWF-Pakistan\'s prestigious Syed Asad Ali Conservation Award in 2024 for a daring rescue of a female common leopard stranded high in a tree in a residential village, tranquilizing and safely relocating the animal without harm.',
    keyImpact: 'Daring rescue and safe rehabilitation of common leopards stranded in residential areas',
    documentedContributions: [
      {
        year: 2024,
        title: 'WWF-Pakistan Syed Asad Ali Conservation Award for Leopard Rescue',
        evidenceTier: 'INDEPENDENT NATIONAL CONSERVATION AWARD',
        description: 'Led technical rescue operation tranquilizing a female leopard trapped near human habitations, releasing it safely into protected wilderness.',
        documentedOutcome: 'Awarded Syed Asad Ali Conservation Award reported by Associated Press of Pakistan.'
      }
    ],
    sourceProvenance: [{ title: 'Associated Press of Pakistan: WWF Honors Muhammad Idrees Nauman', url: 'https://www.app.com.pk', publicationType: 'Official News Wire' }],
    researchStatus: 'AWARD VERIFIED · Official WWF award citation confirmed',
    evidenceAuditNotes: 'Verified wildlife rescue operation reported nationally.',
    linkedKewModules: [{ label: 'Human-Wildlife Conflict', url: '/protected-network/human-wildlife-conflict' }]
  },
  {
    id: 'sci-065',
    name: 'Hamayun Shaheen',
    honorific: 'Prof.',
    designation: 'Professor of Botany & Forest Ecologist',
    institution: 'University of Azad Jammu & Kashmir',
    region: 'Azad Jammu & Kashmir',
    researchCoverage: 'AJ&K · Neelum, Jhelum & Poonch basins',
    activeWindow: 'Research: 2005–2026',
    trackType: 'ACADEMIC_FACULTY',
    fields: ['Forest & Terrestrial Ecology', 'Botany & Mycology'],
    fieldsSummary: 'Forest vegetation ecology, carbon stocks, alpine plant community dynamics, phytosociology',
    editorialTribute: '“Quantifying the carbon storage and ecological fragility of AJ&K\'s mountain forests.”',
    biography:
      'Senior plant ecologist and professor at the University of Azad Jammu & Kashmir. His research examines forest biomass, carbon sequestration in temperate coniferous forests, and phytosociological classifications of threatened Himalayan vegetation.',
    keyImpact: 'Empirical assessment of forest carbon stocks and vegetation dynamics across AJ&K',
    documentedContributions: [
      {
        year: 2020,
        title: 'Carbon Stock Assessment in Moist Temperate Himalayan Forests of AJ&K',
        evidenceTier: 'PEER-REVIEWED PUBLICATION',
        description: 'Quantified above-ground and below-ground biomass across Neelum valley forest reserves.',
        documentedOutcome: 'Published scientific papers establishing carbon baseline for REDD+ initiatives.'
      }
    ],
    sourceProvenance: [{ title: 'University of AJ&K Faculty Profile: Prof. Hamayun Shaheen', url: 'https://uajk.edu.pk', publicationType: 'University Profile' }],
    researchStatus: 'PEER-REVIEWED SCIENTIST · Active faculty record verified',
    evidenceAuditNotes: 'Extensive publication record in forest ecology and climate mitigation.',
    linkedKewModules: [{ label: 'Forest Ecosystems', url: '/biodiversity/forest-ecosystems' }]
  },
  {
    id: 'sci-066',
    name: 'Muhammad Ejaz Ul Islam Dar',
    honorific: 'Dr.',
    designation: 'Associate Professor of Botany',
    institution: 'University of Azad Jammu & Kashmir',
    region: 'Azad Jammu & Kashmir',
    researchCoverage: 'AJ&K · Machiara & Pir Panjal ranges',
    activeWindow: 'Research: 2008–2026',
    trackType: 'ACADEMIC_FACULTY',
    fields: ['Botany & Mycology', 'Forest & Terrestrial Ecology'],
    fieldsSummary: 'Himalayan plant ecology, medicinal flora, conservation prioritization, floristics',
    editorialTribute: '“Documenting medicinal plant communities and floristic richness in AJ&K.”',
    biography:
      'Botanist at the University of AJ&K specializing in mountain flora, medicinal plant inventories, and the impact of climate variability on alpine pastures across Machiara National Park and surrounding ranges.',
    keyImpact: 'Floristic and medicinal plant inventories across protected ecosystems of AJ&K',
    documentedContributions: [
      {
        year: 2018,
        title: 'Floristic Diversity & Ethnomedicinal Inventory of Machiara National Park',
        evidenceTier: 'PEER-REVIEWED RESEARCH',
        description: 'Documented 300+ vascular plant species and their traditional medicinal uses by forest-dwelling communities.',
        documentedOutcome: 'Published taxonomic and ethnobotanical reference papers.'
      }
    ],
    sourceProvenance: [{ title: 'University of AJ&K Faculty Directory: Dr. Muhammad Ejaz Ul Islam Dar', url: 'https://uajk.edu.pk', publicationType: 'University Profile' }],
    researchStatus: 'PEER-REVIEWED RESEARCH · Verified faculty member',
    evidenceAuditNotes: 'Active publisher in plant ecology and conservation.',
    linkedKewModules: [{ label: 'Flora Intelligence', url: '/biodiversity/plants' }]
  },
  {
    id: 'sci-067',
    name: 'Tariq Habib',
    honorific: 'Dr.',
    designation: 'Assistant Professor of Botany',
    institution: 'University of Azad Jammu & Kashmir',
    region: 'Azad Jammu & Kashmir',
    researchCoverage: 'AJ&K · Kotli & Mirpur foothills',
    activeWindow: 'Research: 2012–2026',
    trackType: 'ACADEMIC_FACULTY',
    fields: ['Ethnobotany & Traditional Ecology', 'Botany & Mycology'],
    fieldsSummary: 'Ethnobotany, wild medicinal plants, orchid diversity, forest health',
    editorialTribute: '“Recording the ethno-medicinal heritage of subtropical scrub forests in AJ&K.”',
    biography:
      'Botanical researcher at the University of AJ&K investigating wild medicinal flora, orchid occurrences, and traditional botanical healing practices in the subtropical scrub and pine forests of southern AJ&K.',
    keyImpact: 'Ethnobotanical documentation of medicinal plants in southern AJ&K districts',
    documentedContributions: [
      {
        year: 2019,
        title: 'Medicinal Flora & Ethnobotanical Practices in Southern AJ&K',
        evidenceTier: 'PEER-REVIEWED BOTANICAL PAPERS',
        description: 'Surveyed rural herbalists, documenting threatened plant species facing unsustainable extraction.',
        documentedOutcome: 'Published ethnobotanical papers informing local conservation guidelines.'
      }
    ],
    sourceProvenance: [{ title: 'University of AJ&K Faculty Profile: Dr. Tariq Habib', url: 'https://uajk.edu.pk', publicationType: 'University Profile' }],
    researchStatus: 'PEER-REVIEWED RESEARCH · Verified',
    evidenceAuditNotes: 'Published studies on Western Himalayan ethnobotany.',
    linkedKewModules: [{ label: 'Medicinal Plants Atlas', url: '/biodiversity/medicinal-plants' }]
  },

  // ─── Gilgit-Baltistan (8 New Profiles) ─────────────────────────────────────
  {
    id: 'sci-068',
    name: 'Pervaiz Iqbal',
    honorific: 'Mr.',
    designation: 'Wildlife Protector & Rescuer',
    institution: 'Gilgit-Baltistan Parks & Wildlife Department (Hunza)',
    region: 'Gilgit-Baltistan',
    researchCoverage: 'Gilgit-Baltistan · Hunza & Khunjerab',
    activeWindow: 'Field Service: 2015–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Wildlife Rescue & Anti-Poaching', 'Wildlife Ecology & Carnivores'],
    fieldsSummary: 'Snow leopard rescue, anti-poaching enforcement, community wildlife defense, ibex monitoring',
    editorialTribute: '“Rescuing trapped snow leopards and defending wildlife in the high Karakoram.”',
    biography:
      'Frontline wildlife protector in Hunza who received the 2026 Ibex Award at the Pakistan Wildlife Protection Awards. He has led high-altitude rescues of snow leopards trapped in village corrals and enforced anti-poaching measures across Khunjerab corridors.',
    keyImpact: 'Successful rescue and wild release of snow leopards trapped in village corrals',
    documentedContributions: [
      {
        year: 2026,
        title: 'Ibex Award for Frontline Wildlife Rescue & Anti-Poaching',
        evidenceTier: 'NATIONAL CONSERVATION AWARD',
        description: 'Successfully rescued trapped snow leopards and intercepted illegal ibex hunting parties in Hunza.',
        documentedOutcome: 'Received regional Ibex Award from the Snow Leopard Foundation.'
      }
    ],
    sourceProvenance: [{ title: 'Snow Leopard Foundation 2026 Awards: Pervaiz Iqbal', url: 'https://slf.org.pk', publicationType: 'Award Dossier' }],
    researchStatus: 'AWARD VERIFIED · Rescue operations confirmed',
    evidenceAuditNotes: 'Frontline protector recognized nationally for carnivore rescues.',
    linkedKewModules: [{ label: 'Protected Areas: Khunjerab', url: '/protected-network/atlas' }]
  },
  {
    id: 'sci-069',
    name: 'Fida Hussain',
    honorific: 'Mr.',
    designation: 'Game Inspector',
    institution: 'Gilgit-Baltistan Parks & Wildlife Department',
    region: 'Gilgit-Baltistan',
    researchCoverage: 'Gilgit-Baltistan · Shigar, Baltoro, Central Karakoram National Park',
    activeWindow: 'Field Service: 2012–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Wildlife Rescue & Anti-Poaching', 'Conservation Education & Livelihoods'],
    fieldsSummary: 'Anti-poaching, high-altitude waste removal, K2-Baltoro cleanup, lynx and brown bear protection',
    editorialTribute: '“Defending mountain wildlife while confronting the waste threatening fragile high-altitude ecosystems.”',
    biography:
      'Game Inspector who joined the department in 2012. He oversees anti-poaching patrols in Shigar and has spearheaded massive waste-removal operations along the K2–Baltoro glacier trekking route. Recipient of the 2026 Himalayan Lynx Award.',
    keyImpact: 'Removal of more than 26,000 kg of high-altitude waste along the K2-Baltoro route',
    documentedContributions: [
      {
        year: 2026,
        title: 'Himalayan Lynx Award for Anti-Poaching & K2-Baltoro Glacier Waste Removal',
        evidenceTier: 'NATIONAL CONSERVATION AWARD DOCUMENTATION',
        description: 'Helped lead clean-up operations removing over 26 metric tonnes of trekking waste while intercepting illegal wildlife poaching.',
        documentedOutcome: 'Received regional Himalayan Lynx Award.'
      }
    ],
    sourceProvenance: [{ title: 'Pakistan Wildlife Protection Awards 2026 Recipient Profile: Fida Hussain', url: 'https://slf.org.pk', publicationType: 'Award Dossier' }],
    researchStatus: 'AWARD DOCUMENTED · Operational waste-removal and enforcement confirmed',
    evidenceAuditNotes: 'Award verified; operational waste weight records audited.',
    linkedKewModules: [{ label: 'Waste & Plastic Surveillance', url: '/environmental-monitoring/plastic-pollution' }]
  },
  {
    id: 'sci-070',
    name: 'Sajjad Hussain',
    honorific: 'Mr.',
    designation: 'Wildlife Watcher',
    institution: 'Gilgit-Baltistan Parks & Wildlife Department (Haramosh)',
    region: 'Gilgit-Baltistan',
    researchCoverage: 'Gilgit-Baltistan · Haramosh Valley & Indus gorge',
    activeWindow: 'Field Service: 2014–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Wildlife Rescue & Anti-Poaching', 'Wildlife Ecology & Carnivores'],
    fieldsSummary: 'Astore markhor protection, poacher apprehensions, community conservancy patrols',
    editorialTribute: '“Guarding the precipitous cliff habitats of the endangered Astore markhor.”',
    biography:
      'Wildlife watcher in the steep Haramosh Valley who received the 2026 Urial Award. His vigilance along treacherous cliff faces has prevented commercial poaching of the flare-horned markhor and mobilized village conservancies.',
    keyImpact: 'Interception and apprehension of armed markhor poachers in Haramosh',
    documentedContributions: [
      {
        year: 2026,
        title: 'Urial Award for Astore Markhor Protection & Poacher Apprehensions',
        evidenceTier: 'NATIONAL CONSERVATION AWARD',
        description: 'Confronted illegal hunting parties in Haramosh and secured confiscated rifles and trophies.',
        documentedOutcome: 'Received national Urial Award from the Snow Leopard Foundation.'
      }
    ],
    sourceProvenance: [{ title: 'Snow Leopard Foundation: 2026 Conservation Awards', url: 'https://slf.org.pk', publicationType: 'Award Dossier' }],
    researchStatus: 'AWARD VERIFIED · Markhor protection confirmed',
    evidenceAuditNotes: 'Frontline watcher in high-risk cliff habitats.',
    linkedKewModules: [{ label: 'Wildlife Crime Registry', url: '/resources/environmental-pil' }]
  },
  {
    id: 'sci-071',
    name: 'Sher Afghan Ali',
    honorific: 'Mr.',
    designation: 'Game Inspector',
    institution: 'Gilgit-Baltistan Parks & Wildlife Department',
    region: 'Gilgit-Baltistan',
    researchCoverage: 'Gilgit-Baltistan · Astore & Deosai fringes',
    activeWindow: 'Field Service: 2013–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Wildlife Rescue & Anti-Poaching', 'Wildlife Ecology & Carnivores'],
    fieldsSummary: 'Anti-poaching, snow leopard rescue, falcon recovery, illegal timber seizures',
    editorialTribute: '“Intercepting illegal falcon trapping syndicates and timber smuggling in GB.”',
    biography:
      'Game Inspector who received the 2025 Pakistan Wildlife Protection Award. He has led successful raids recovering trapped Saker falcons, rescuing injured snow leopards, and intercepting illicit deodar timber shipments.',
    keyImpact: 'Interception of illegal falcon trapping networks and snow leopard rescues',
    documentedContributions: [
      {
        year: 2025,
        title: 'National Wildlife Protection Award for Anti-Poaching & Timber Seizures',
        evidenceTier: 'NATIONAL CONSERVATION AWARD',
        description: 'Led operations seizing illegal falcon trapping nets and confiscating illegally felled deodar logs.',
        documentedOutcome: 'Recognized with national conservation award.'
      }
    ],
    sourceProvenance: [{ title: 'Snow Leopard Foundation: 2025 Awards Profile', url: 'https://slf.org.pk', publicationType: 'Award Dossier' }],
    researchStatus: 'AWARD DOCUMENTED · Raids and seizures confirmed',
    evidenceAuditNotes: 'Verified enforcement officer in anti-wildlife crime raids.',
    linkedKewModules: [{ label: 'Wildlife Crime Registry', url: '/resources/environmental-pil' }]
  },
  {
    id: 'sci-072',
    name: 'Sakhawat Ali',
    honorific: 'Mr.',
    designation: 'Wildlife Watcher',
    institution: 'Central Karakoram National Park (CKNP) / Hushe Conservancy',
    region: 'Gilgit-Baltistan',
    researchCoverage: 'Gilgit-Baltistan · Hushe Valley & CKNP',
    activeWindow: 'Field Service: 2015–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Wildlife Ecology & Carnivores', 'Conservation Education & Livelihoods'],
    fieldsSummary: 'Snow leopard monitoring, camera-trap maintenance, ibex counts, community conservancy',
    editorialTribute: '“Patrolling the gateway to the Central Karakoram to protect snow leopards and ibex.”',
    biography:
      'Hushe-based wildlife watcher associated with Central Karakoram National Park. Recognized in 2025 for monitoring snow leopard populations, maintaining camera trap grids at 4,200m, and coordinating community ibex counts with village elders.',
    keyImpact: 'Continuous snow leopard monitoring and camera-trap data collection in CKNP',
    documentedContributions: [
      {
        year: 2025,
        title: 'Central Karakoram National Park Wildlife Monitoring Recognition',
        evidenceTier: 'NATIONAL CONSERVATION RECOGNITION',
        description: 'Conducted high-altitude snow leopard and ibex surveys in Hushe Valley.',
        documentedOutcome: 'Received regional wildlife monitoring award.'
      }
    ],
    sourceProvenance: [{ title: 'CKNP & Snow Leopard Foundation 2025 Award Log', url: 'https://slf.org.pk', publicationType: 'Award Dossier' }],
    researchStatus: 'FIELD WATCHER · Verified CKNP record',
    evidenceAuditNotes: 'Field watcher stationed in Hushe village.',
    linkedKewModules: [{ label: 'Protected Areas', url: '/protected-network' }]
  },
  {
    id: 'sci-073',
    name: 'Muhammad Raza',
    honorific: 'Mr.',
    designation: 'Wildlife Watcher',
    institution: 'Gilgit-Baltistan Parks & Wildlife Department (Skardu)',
    region: 'Gilgit-Baltistan',
    researchCoverage: 'Gilgit-Baltistan · Skardu & Deosai National Park fringes',
    activeWindow: 'Field Service: 2011–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Wildlife Ecology & Carnivores', 'Wildlife Rescue & Anti-Poaching'],
    fieldsSummary: 'Himalayan brown bear protection, Deosai patrols, ibex conservation, anti-poaching',
    editorialTribute: '“Guardian of the endangered Himalayan brown bears on the windswept Deosai plains.”',
    biography:
      'Veteran Skardu-based wildlife watcher who received the Brown Bear Award in 2025. He conducts arduous field patrols on the Deosai plateau to protect the endangered Himalayan brown bear from trophy poachers and tourist harassment.',
    keyImpact: 'Field protection of the critically endangered Himalayan brown bear population in Deosai',
    documentedContributions: [
      {
        year: 2025,
        title: 'Brown Bear Award for Frontline Deosai National Park Protection',
        evidenceTier: 'NATIONAL CONSERVATION AWARD',
        description: 'Maintained seasonal anti-poaching camps on the Deosai plateau to safeguard brown bear dens.',
        documentedOutcome: 'Received national Brown Bear Award.'
      }
    ],
    sourceProvenance: [{ title: 'Snow Leopard Foundation: 2025 Brown Bear Award Profile', url: 'https://slf.org.pk', publicationType: 'Award Dossier' }],
    researchStatus: 'AWARD VERIFIED · Deosai patrols confirmed',
    evidenceAuditNotes: 'Frontline brown bear protector in Deosai.',
    linkedKewModules: [{ label: 'Protected Areas: Deosai', url: '/protected-network/atlas' }]
  },
  {
    id: 'sci-074',
    name: 'Sarmad Shafa',
    honorific: 'Mr.',
    designation: 'Range Forest Officer (RFO)',
    institution: 'GB Forest, Wildlife and Environment Department',
    region: 'Gilgit-Baltistan',
    researchCoverage: 'Gilgit-Baltistan · Forest divisions',
    activeWindow: 'Service: 2016–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Forest & Terrestrial Ecology', 'Wildlife Rescue & Anti-Poaching'],
    fieldsSummary: 'Anti-timber smuggling, forest fire suppression, high-altitude juniper and deodar defense',
    editorialTribute: '“Enforcing forest protection laws to preserve ancient Karakoram juniper stands.”',
    biography:
      'Range Forest Officer who received the national Snow Leopard Award in 2024. He has led decisive operations intercepting illegal commercial timber transport, suppressing mountain forest fires, and enforcing forest boundaries in vulnerable valleys.',
    keyImpact: 'Enforcement operations against illegal commercial timber syndicates in Gilgit-Baltistan',
    documentedContributions: [
      {
        year: 2024,
        title: 'National Snow Leopard Award for Forest & Wildlife Defense',
        evidenceTier: 'NATIONAL CONSERVATION AWARD REPORTED IN PRESS',
        description: 'Led checkpoints and seizure of illicit timber trucks attempting to exit high valleys.',
        documentedOutcome: 'Awarded national conservation award reported in Dawn.'
      }
    ],
    sourceProvenance: [{ title: 'Dawn: Forest and Wildlife Officers Honoured in Islamabad', url: 'https://www.dawn.com', publicationType: 'News Report' }],
    researchStatus: 'AWARD DOCUMENTED · Press report confirmed',
    evidenceAuditNotes: 'Verified Range Forest Officer citation.',
    linkedKewModules: [{ label: 'Forest Protectors', url: '/resources/kew-green-heroes' }]
  },
  {
    id: 'sci-075',
    name: 'Nazakat Din',
    honorific: 'Mr.',
    designation: 'Social Organizer & Wildlife Observer',
    institution: 'Snow Leopard Foundation Pakistan',
    region: 'Gilgit-Baltistan',
    researchCoverage: 'Gilgit-Baltistan · Mountain communities',
    activeWindow: 'Field Service: 2017–2026',
    trackType: 'FIELD_PRACTITIONER',
    fields: ['Conservation Education & Livelihoods', 'Wildlife Ecology & Carnivores'],
    fieldsSummary: 'Community mobilization, livestock insurance auditing, youth wildlife monitoring',
    editorialTribute: '“Organizing mountain communities to become co-owners of wildlife conservation.”',
    biography:
      'Social organizer with the Snow Leopard Foundation who works across remote mountain valleys in Gilgit-Baltistan, establishing village conservation committees, auditing livestock insurance schemes, and conducting wildlife-monitoring workshops.',
    keyImpact: 'Facilitated village conservation agreements and community wildlife committees in GB',
    documentedContributions: [
      {
        year: 2023,
        title: 'Community Wildlife Committee Organization & Monitoring Protocols',
        evidenceTier: 'CONSERVATION PROGRAM LOG',
        description: 'Trained local village scouts in GPS data recording and predator-sighting logs.',
        documentedOutcome: 'Established functioning community conservation committees in participating valleys.'
      }
    ],
    sourceProvenance: [{ title: 'Snow Leopard Foundation Field Personnel Directory', url: 'https://slf.org.pk', publicationType: 'Program Directory' }],
    researchStatus: 'ORGANIZER DOCUMENTED · Fieldwork confirmed',
    evidenceAuditNotes: 'Active community social organizer in GB.',
    linkedKewModules: [{ label: 'Community Green Heroes', url: '/resources/kew-green-heroes' }]
  },

  // ─── Historical Academic Hero (Prof. A. R. Yousuf) ─────────────────────────
  {
    id: 'sci-076',
    name: 'A. R. Yousuf',
    honorific: 'Prof.',
    designation: 'Former Director CORD | Former Head EVS | Former NGT Expert Member',
    institution: 'University of Kashmir / National Green Tribunal (NGT)',
    region: 'Kashmir Valley',
    researchCoverage: 'Kashmir Valley · CORD, Dal Lake, Jhelum & NGT Judicial Benches',
    activeWindow: 'Historical Academic Service: 2000–2016',
    trackType: 'ACADEMIC_FACULTY',
    fields: ['Wetland & Limnology', 'Environmental Chemistry & Pollution'],
    fieldsSummary: 'Limnology, fisheries, university EIA development, NGT environmental jurisprudence',
    editorialTribute: '“A scientific career linking freshwater ecology, environmental impact assessment and environmental governance.”',
    biography:
      'Prof. A. R. Yousuf is an eminent limnologist and fisheries scientist whose leadership contributed to environmental research and university-led EIA development in Kashmir. He served as Director of CORD and Head of Environmental Science between 2000 and 2009 and later as Expert Member of the National Green Tribunal until 2016.',
    keyImpact: 'Establishment and development of university environmental research, accredited EIA capacity, and NGT judicial expert rulings',
    documentedContributions: [
      {
        year: 2000,
        title: 'Environmental Science and CORD Postgraduate Program Leadership',
        evidenceTier: 'OFFICIAL UNIVERSITY HISTORICAL RECORD',
        description: 'Directed CORD and helped establish Environmental Science as a full postgraduate academic department.',
        documentedOutcome: 'University records attribute the establishment and development of the postgraduate program to his leadership.'
      },
      {
        year: 2006,
        title: 'University Environmental Impact Assessment Capability Development',
        evidenceTier: 'INSTITUTIONAL RESEARCH RECORD',
        description: 'Coordinated environmental impact assessment projects and contributed to CORD\'s consultant accreditation under quality frameworks.',
        documentedOutcome: 'University-reported development of recognized EIA institutional consultancy capacity.'
      },
      {
        year: 2016,
        title: 'National Green Tribunal Expert Member Service',
        evidenceTier: 'INSTITUTIONAL BIOGRAPHY',
        description: 'Served as an Expert Member of the National Green Tribunal, drawing on ecological and environmental scientific expertise for binding judicial orders.',
        documentedOutcome: 'Former NGT Expert Member status recorded in the university\'s historical profile.'
      }
    ],
    sourceProvenance: [
      { title: 'University of Kashmir Departmental Profile 2000–2025 (Pages 19–20)', url: 'https://envirsc.uok.edu.in', publicationType: 'University Historical Profile' }
    ],
    researchStatus: 'UNIVERSITY HISTORICAL RECORD · KEW editorial approval pending',
    evidenceAuditNotes: 'Direct historical institutional record; established EIA capability at University of Kashmir and adjudicated as NGT Expert Member.',
    linkedKewModules: [
      { label: 'EIA Reports Inventory', url: '/research-library/environmental-impact-assessment' },
      { label: 'Environmental PIL Portal', url: '/resources/environmental-pil' }
    ]
  },

  // ─── Historical Academic Hero: Prof. S. P. S. Dutta (Teacher of KEW Founder) ──
  {
    id: 'sci-077',
    name: 'S. P. S. Dutta',
    honorific: 'Prof.',
    designation: 'Former Head, Department of Environmental Sciences | UGC Emeritus Professor',
    institution: 'University of Jammu',
    region: 'Jammu',
    researchCoverage: 'Jammu · Tawi, Chenab, Ravi, Basantar, Surinsar Lake, Akhnoor',
    activeWindow: 'Research documented: 1982–2025',
    trackType: 'ACADEMIC_FACULTY',
    fields: ['Wetland & Limnology', 'Wildlife Ecology & Carnivores', 'Environmental Chemistry & Pollution'],
    fieldsSummary: 'Freshwater fish biodiversity, river limnology, aquatic toxicology, groundwater chemistry, Chenab rock pool microhabitats',
    editorialTribute: '“Documenting the freshwater biodiversity of Jammu\'s rivers, streams and wetlands for future generations.”',
    biography:
      'Prof. S. P. S. Dutta (spelled Dutta in university and scholarly records) is an environmental scientist and freshwater ecologist associated with the University of Jammu. His research spans fish biodiversity, aquatic ecology, limnology, freshwater pollution, and the ecological condition of the Tawi, Chenab, Ravi, Basantar, and Ujh rivers. He previously headed the university\'s Department of Environmental Sciences and continued active scholarly output as UGC Emeritus Professor through 2025. He is also the esteemed former teacher of the Kashmir EcoWatch (KEW) Founder.',
    keyImpact: 'Long-term scientific documentation of Jammu\'s freshwater fish biodiversity, river ecology and water quality; foundational mentor of regional environmental researchers',
    documentedContributions: [
      {
        year: 1984,
        title: 'Fish Biodiversity of Jammu',
        evidenceTier: 'SCIENTIFIC PUBLICATION',
        description: 'Coauthored a checklist and identification key for the fishes of Jammu with Y. R. Malhotra, published in Jammu University Review (Science).',
        documentedOutcome: 'An early taxonomic reference supporting later fish-diversity surveys across the Jammu region.'
      },
      {
        year: '2005–2009',
        title: 'Freshwater Research and Doctoral Supervision',
        evidenceTier: 'OFFICIAL UNIVERSITY RESEARCH RECORD',
        description: 'Supervised doctoral research on drinking-water quality in Jammu, microbial and zooplankton communities in Surinsar Lake, hydrobiology of Basantar River, and the Ujh River in Kathua.',
        documentedOutcome: 'Multiple doctoral theses recorded in the University of Jammu\'s official research bibliography.'
      },
      {
        year: 2011,
        title: 'Groundwater Quality of Jammu City',
        evidenceTier: 'PEER-REVIEWED SCIENTIFIC PUBLICATION',
        description: 'Coauthored study with Meenakshi Khajuria examining physical and chemical characteristics of groundwater supplied through Company Bagh pumping station and six distribution points in old Jammu.',
        documentedOutcome: 'Published water-quality research measuring parameters including dissolved oxygen, nutrients, hardness, and heavy metals (PubMed PMID 23505827).'
      },
      {
        year: 2016,
        title: 'Fish Diversity of Wajoo Nullah, Kathua',
        evidenceTier: 'PEER-REVIEWED SCIENTIFIC PUBLICATION',
        description: 'Published an ichthyofaunal survey of Wajoo Nullah, a tributary of the Ravi River, reporting 64 fish species and highlighting breeding-season exploitation.',
        documentedOutcome: 'Published aquatic biodiversity inventory and identification of conservation threats (DOI 10.31018/jans.v8i2.925).'
      },
      {
        year: 2020,
        title: 'Limnology of Chenab River Rock Pools',
        evidenceTier: 'PEER-REVIEWED SCIENTIFIC PUBLICATION',
        description: 'Published research examining six temporary freshwater rock pools at Dhoomi, Akhnoor, in the Chenab River, characterizing water chemistry and microscopic aquatic fauna.',
        documentedOutcome: 'Scientific baseline covering water quality and aquatic biodiversity in an under-researched freshwater habitat (DOI 10.31018/jans.v12i4.2334).'
      }
    ],
    sourceProvenance: [
      { title: 'Journal of Applied and Natural Science: Fish Diversity of Wajoo Nullah (DOI 10.31018/jans.v8i2.925)', url: 'https://doi.org/10.31018/jans.v8i2.925', publicationType: 'Peer-Reviewed Journal' },
      { title: 'PubMed PMID 23505827: Groundwater Quality of Jammu City', url: 'https://pubmed.ncbi.nlm.nih.gov/23505827/', publicationType: 'Indexed Scientific Record' },
      { title: 'Journal of Applied and Natural Science: Limnology of Chenab Rock Pools (DOI 10.31018/jans.v12i4.2334)', url: 'https://doi.org/10.31018/jans.v12i4.2334', publicationType: 'Peer-Reviewed Journal' },
      { title: 'University of Jammu Department of Environmental Sciences Official Record', url: 'https://jammuuniversity.ac.in', publicationType: 'University Official Record' },
      { title: 'Daily Excelsior: Environmental Science Scholarly Record', url: 'https://www.dailyexcelsior.com', publicationType: 'Independent Regional Media' }
    ],
    researchStatus: 'EMERITUS RECORD · Teacher of KEW Founder · Verified 40-year baseline',
    evidenceAuditNotes: 'Corrected from previous omission. Emeritus listing verified under University of Jammu. Teacher of KEW Founder.',
    linkedKewModules: [
      { label: 'Water Systems', url: '/water-systems' },
      { label: 'Fisheries & Aquatic Life', url: '/water-systems/fisheries' },
      { label: 'Rivers & Watersheds', url: '/water-systems/rivers' },
      { label: 'Environmental Scientists', url: '/resources/kew-green-heroes?tab=scientists-conservationists' }
    ]
  },

  // ─── Kashmir Valley: Dr. Humaira Qadri ──────────────────────────────────────
  {
    id: 'sci-078',
    name: 'Humaira Qadri',
    honorific: 'Dr.',
    designation: 'Associate Professor & Head, Department of Environmental Science | Dean for Research',
    institution: 'Government Degree College Baramulla (Autonomous) / Former Head SP College',
    region: 'Kashmir Valley',
    researchCoverage: 'Kashmir Valley · Dal Lake, Nigeen Lake, Baramulla, Hirpora Wildlife Sanctuary, Rambiara Stream',
    activeWindow: 'Research career: 2001–2026',
    trackType: 'ACADEMIC_FACULTY',
    fields: ['Wetland & Limnology', 'Environmental Chemistry & Pollution', 'Conservation Education & Livelihoods'],
    fieldsSummary: 'Limnology, nutrient dynamics, aquatic macrophyte ecology, phytoremediation, vehicular emissions in sanctuaries, biofertiliser patents',
    editorialTribute: '“Scientific research into Kashmir\'s freshwater ecosystems, their pollution, ecological restoration and sustainable management.”',
    biography:
      'Dr. Humaira Qadri is a Kashmiri environmental scientist, academic and researcher specializing in limnology, nutrient dynamics, aquatic ecology and phytoremediation. Her scholarly work investigates pollution in freshwater ecosystems, aquatic vegetation, biological remediation and environmental management. She previously headed the Department of Environment and Water Management at Sri Pratap College, Srinagar, and currently serves as Associate Professor, Head of Environmental Science, and Dean for Research at Government Degree College Baramulla.',
    keyImpact: 'Scientific contributions to Dal and Nigeen Lake ecology, aquatic pollution research, phytoremediation and environmental education',
    documentedContributions: [
      {
        year: 2013,
        title: 'Nutrient Dynamics and Macrophytic Production in Dal Lake',
        evidenceTier: 'OFFICIAL UNIVERSITY DOCTORAL RECORD',
        description: 'Completed doctoral research at the University of Kashmir on nutrient dynamics and aquatic plant production in Dal Lake, under Prof. A. R. Yousuf.',
        documentedOutcome: 'Doctoral research dated March 1, 2013, recorded in the university\'s departmental research register.'
      },
      {
        year: 2017,
        title: 'Traffic-Generated Pollution in Hirpora Wildlife Sanctuary',
        evidenceTier: 'PUBLISHED SCIENTIFIC STUDY',
        description: 'Coauthored study with Saliqa Rasool and Fayaz Ahmad Bhat estimating gaseous emissions and particulate matter from vehicular traffic through Hirpora Wildlife Sanctuary in Shopian.',
        documentedOutcome: 'Identified seasonal variations in vehicle emissions and recommended traffic limits to protect sensitive sanctuary wildlife (DOI 10.4172/2157-7617.1000421).'
      },
      {
        year: 2018,
        title: 'Comparative Assessment of Dal Lake Water Chemistry',
        evidenceTier: 'PUBLISHED SCIENTIFIC STUDY',
        description: 'Coauthored research with Basharat Mushtaq and A. R. Yousuf comparing Dal Lake water-quality measurements between 2005 and 2015, assessing nutrient enrichment and deterioration.',
        documentedOutcome: 'Reported significant deterioration across decade with water-quality index values of 25–50 indicating poor water quality.'
      },
      {
        year: 2019,
        title: 'Rambiara Stream Water Quality Assessment',
        evidenceTier: 'PUBLISHED SCIENTIFIC STUDY',
        description: 'Coauthored study of nutrient status and water-quality index of Rambiara Stream, a tributary of the Jhelum River.',
        documentedOutcome: 'Documented WQI values from 43.47 to 48.74 and recommended controlling human activities along riparian corridor.'
      },
      {
        year: 2021,
        title: 'Freshwater Pollution and Aquatic Ecosystem Management',
        evidenceTier: 'INTERNATIONAL ACADEMIC BOOK',
        description: 'Coedited Freshwater Pollution and Aquatic Ecosystems: Environmental Impact and Sustainable Management (Apple Academic Press).',
        documentedOutcome: 'Scholarly reference volume documenting freshwater pollution, biomonitoring, and management approaches.'
      },
      {
        year: 2024,
        title: 'Biofertiliser Composition from Aquatic Weeds',
        evidenceTier: 'PUBLISHED PATENT APPLICATION',
        description: 'Named as applicant and inventor in Indian patent application 202311024479 A, converting harvested aquatic weeds into organic biofertiliser. (Note: Establishes invention filing/publication, not granted patent or commercial deployment).',
        documentedOutcome: 'Application filed March 31, 2023, and published February 16, 2024, in The Patent Office Journal No. 07/2024.'
      },
      {
        year: 2026,
        title: 'Environmental Awareness and Climate Education',
        evidenceTier: 'INSTITUTIONAL EVENT REPORT',
        description: 'As Head of Environmental Sciences at GDC Baramulla, led World Environment Day activities emphasizing collective action against climate change.',
        documentedOutcome: 'Publicly reported environmental education and institutional student outreach.'
      }
    ],
    sourceProvenance: [
      { title: 'Government Degree College Baramulla Official Faculty Record', url: 'https://baramullacollege.net/coordinators.php', publicationType: 'Institutional Record' },
      { title: 'University of Kashmir Department of Environmental Science Profile & Doctoral Register', url: 'https://envirsc.uok.edu.in', publicationType: 'University Repository' },
      { title: 'OpenAlex Research Publications Profile: Dr. Humaira Qadri', url: 'https://openalex.org/authors/A5008316752', publicationType: 'Open Scholarly Database' },
      { title: 'Routledge Academic Book Record: Plant Proteomics in Heavy Metal Remediation', url: 'https://www.routledge.com', publicationType: 'Academic Publisher' },
      { title: 'The Patent Office Journal No. 07/2024: Biofertiliser Application (202311024479 A)', url: 'https://client2021.nsllegal.com', publicationType: 'Official Patent Gazette' }
    ],
    researchStatus: 'ACADEMIC RECORD · Published limnological research & patent applicant',
    evidenceAuditNotes: 'Linked to University of Kashmir as doctoral alumna, SP College as former HoD, and GDC Baramulla as current HoD/Assoc Prof. Patent application verified as filed/published, not granted.',
    linkedKewModules: [
      { label: 'Dal Lake Health Scorecard', url: '/water-systems/lakes' },
      { label: 'Wetlands Portal', url: '/water-systems/wetlands' },
      { label: 'Hirpora Sanctuary Corridor', url: '/protected-network/corridors-and-connectivity' },
      { label: 'Environmental Scientists', url: '/resources/kew-green-heroes?tab=scientists-conservationists' }
    ]
    },
  {
    id: 'sci-079',
    name: 'Majid Farooq',
    honorific: 'Dr.',
    designation: 'Geospatial and Climate Scientist | Department of Ecology, Environment & Remote Sensing, Government of J&K',
    institution: 'Directorate of Ecology, Environment & Remote Sensing (DEERS), J&K',
    region: 'Kashmir Valley',
    researchCoverage: 'Kashmir Valley · Geospatial, 2014 Floods, Carbon Emissions, Wetlands, Climate Vulnerability',
    activeWindow: 'Research career: 2014–2026',
    trackType: 'GOVERNMENT_SCIENTIST',
    fields: ['Geospatial & Remote Sensing', 'Environmental Chemistry & Pollution', 'Wetland & Limnology'],
    fieldsSummary: 'Satellite remote sensing, GIS, flood inundation modeling, GHG emission inventories, climate risk & vulnerability assessment',
    editorialTribute: '“Translating satellite observations and climate science into evidence for environmental planning.”',
    biography: 'Dr. Majid Farooq specializes in remote sensing, GIS, climate vulnerability, environmental modelling and science-based decision support. His scientific contributions include satellite-based assessment of Kashmir\'s 2014 floods, coordination of the 2016 sectoral carbon-emissions inventory, and research relating to wetlands, land-use change, water resources and environmental governance. His professional portfolio continues to identify him as an active DEERS scientist in 2026.',
    keyImpact: 'Scientific contributions to flood mapping, greenhouse-gas inventories and climate-risk assessment.',
    documentedContributions: [
      {
        year: 2014,
        title: 'Satellite-Based Rapid Assessment of Jammu & Kashmir Floods',
        evidenceTier: 'DEPARTMENTAL SCIENTIFIC REPORT',
        description: 'Participated in a rapid satellite assessment in collaboration with scientists at the National Remote Sensing Centre (NRSC), ISRO.',
        documentedOutcome: 'A comprehensive report mapping flood inundation, land-use impacts and affected settlements across the Jhelum basin.'
      },
      {
        year: 2016,
        title: 'Emission Inventory of CO₂ in Jammu and Kashmir',
        evidenceTier: 'OFFICIAL SCIENTIFIC PUBLICATION',
        description: 'Served as Coordinator and Principal Investigator for the departmental carbon emissions inventory for Jammu and Kashmir.',
        documentedOutcome: 'Published baseline sectoral emissions assessment for the 2013–14 reference year covering energy, industry, agriculture, and waste.'
      },
      {
        year: '2024–2026',
        title: 'Geospatial Climate and Environmental Research',
        evidenceTier: 'SCIENTIFIC PUBLICATIONS / PEER-REVIEWED',
        description: 'Research covering climate vulnerability, hydrological hazards, lake monitoring and Earth observation published in international journals and academic volumes.',
        documentedOutcome: 'Research publications and geospatial project leadership listed in his professional record, including Wiley-VCH volume contributions.'
      }
    ],
    sourceProvenance: [
      { title: 'Dr. Majid Farooq Professional Scientific Portfolio', url: 'https://majidfarooq.info', publicationType: 'Scientific Portfolio' },
      { title: 'DEERS 2016 Emission Inventory of CO₂ in J&K (NMSHE)', url: 'https://devalt.in/media/com_dalibrary/dalibrary/pdf/nmshe17.pdf', publicationType: 'Departmental Scientific Report' },
      { title: 'Wiley-VCH: Geospatial Technology for Natural Resource Management', url: 'https://www.wiley-vch.de', publicationType: 'Academic Publisher' }
    ],
    researchStatus: 'ACTIVE DEERS SCIENTIST · Geospatial & climate research 2014–2026',
    evidenceAuditNotes: 'Active DEERS affiliation publicly stated in 2026. Coordinator of state greenhouse gas inventory and ISRO flood mapping collaboration.',
    linkedKewModules: [
      { label: 'Cryosphere & Glaciers', url: '/water-systems/glaciers' },
      { label: 'Extreme Weather & Floods', url: '/hazard-intelligence' },
      { label: 'SEIAE Reports', url: '/earth-human-impact/scientific-reports' },
      { label: 'Water Systems', url: '/water-systems/rivers' }
    ]
  },
  {
    id: 'sci-080',
    name: 'Humayun Rashid',
    honorific: 'Dr.',
    designation: 'Former Scientist-F, DEERS | Former Principal Investigator, J&K State Spatial Data Infrastructure | Professor of Practice, IUST',
    institution: 'Directorate of Ecology, Environment & Remote Sensing (DEERS) / Islamic University of Science & Technology (IUST)',
    region: 'Kashmir Valley',
    researchCoverage: 'Kashmir Valley · State Spatial Data Infrastructure, Geoportal, GIS Planning, Disaster Management',
    activeWindow: 'Historical to 2024',
    trackType: 'GOVERNMENT_SCIENTIST',
    fields: ['Geospatial & Remote Sensing', 'Conservation Education & Livelihoods'],
    fieldsSummary: 'State Spatial Data Infrastructure (SSDI), Geoportal architecture, geospatial standardization, disaster management systems',
    editorialTribute: '“Developing geospatial systems to support environmental conservation, disaster management and public planning.”',
    biography: 'Dr. Humayun Rashid is a senior geospatial scientist associated with the development of the Jammu and Kashmir State Spatial Data Infrastructure and its proposed state Geoportal. He authored the department\'s 2019 vision document, emphasizing environmental monitoring, data sharing, natural-resource planning and spatial decision-support systems. By August 2024, university reporting described him as a former DEERS Scientist-F, subsequently appointed as Professor of Practice at IUST.',
    keyImpact: 'Development of the scientific and technical foundation for J&K\'s spatial data infrastructure.',
    documentedContributions: [
      {
        year: 2019,
        title: 'State Spatial Data Infrastructure Vision Document',
        evidenceTier: 'OFFICIAL DEPARTMENTAL SCIENTIFIC DOCUMENT',
        description: 'Authored the vision document establishing technical requirements for geospatial data management, spatial layers, and decision-support systems.',
        documentedOutcome: 'Departmental framework establishing data infrastructure, standardization guidelines, and government GIS applications for environmental governance.'
      },
      {
        year: '2022–2025',
        title: 'Geospatial Science and Public Capacity Building',
        evidenceTier: 'UNIVERSITY SCIENTIFIC EVENTS',
        description: 'Delivered lectures and training programs concerning GIS applications in public service and space technology in sustainable development.',
        documentedOutcome: 'Institutional capacity building programs at IUST and regional colleges publicly recorded.'
      }
    ],
    sourceProvenance: [
      { title: 'J&K State Spatial Data Infrastructure Vision Document', url: 'https://jkdeers.jk.gov.in/eersnew/eersnew/orders/The%20Final%20Vision%20Document.pdf', publicationType: 'Official Government Document' },
      { title: 'IUST 2024 Official Announcement: Professor of Practice', url: 'https://www.iust.ac.in/Notifications/PressRelease/240823213717.pdf', publicationType: 'University Repository' },
      { title: 'The Kashmir Monitor: Space Technology for Sustainable Development', url: 'https://www.thekashmirmonitor.net', publicationType: 'News Media Archive' }
    ],
    researchStatus: 'FORMER SCIENTIST-F · Led J&K State Spatial Data Infrastructure',
    evidenceAuditNotes: 'Confirmed former DEERS Scientist-F by 2024. Authored foundational 2019 SSDI framework before transitioning to academic practice at IUST.',
    linkedKewModules: [
      { label: 'GIS Infrastructure', url: '/about/methodology' },
      { label: 'Environmental Decision Support', url: '/earth-human-impact/scientific-reports' },
      { label: 'SEIAE Scientific Data', url: '/sectoral-eia' }
    ]
  },
  {
    id: 'sci-081',
    name: 'Gowhar Meraj',
    honorific: 'Dr.',
    designation: 'Former Young Scientist Fellow, DEERS | Geospatial, Hydrological and Climate Researcher',
    institution: 'Directorate of Ecology, Environment & Remote Sensing (DEERS)',
    region: 'Kashmir Valley',
    researchCoverage: 'Kashmir Valley · Geospatial Hydrology, Ecosystem Services, Climate Risk, Land-Use Dynamics',
    activeWindow: 'DEERS fellowship: 2020–2023',
    trackType: 'GOVERNMENT_SCIENTIST',
    fields: ['Geospatial & Remote Sensing', 'Wetland & Limnology'],
    fieldsSummary: 'Ecosystem services modeling, satellite hydrology, climate risk, land-use change, geospatial water resources',
    editorialTribute: '“Using satellite science to understand environmental change, water resources and ecosystem services.”',
    biography: 'Dr. Gowhar Meraj held a young-scientist research fellowship associated with DEERS between approximately 2020 and 2023. His scientific publications address ecosystem services, geospatial analysis, hydrology, climate risk and land-use change. His research collaborations include Dr. Majid Farooq, and he subsequently pursued international scholarly research in geospatial water resources.',
    keyImpact: 'Published geospatial research concerning Himalayan ecosystems and water-resource management.',
    documentedContributions: [
      {
        year: '2020–2023',
        title: 'Young Scientist Research Fellowship',
        evidenceTier: 'RESEARCHER RECORD / ACADEMIC FELLOWSHIP',
        description: 'Conducted environmental and geospatial research under a government young-scientist fellowship associated with DEERS.',
        documentedOutcome: 'Historical research appointment and high-impact scholarly output analyzing Himalayan water systems and land-use dynamics.'
      },
      {
        year: 2022,
        title: 'GIScience for the Sustainable Management of Water Resources',
        evidenceTier: 'ACADEMIC BOOK / ROUTLEDGE',
        description: 'Co-edited a reference work exploring geospatial technologies and spatial decision support for water management.',
        documentedOutcome: 'Reference volume published by Routledge (Taylor & Francis Group).'
      }
    ],
    sourceProvenance: [
      { title: 'ORCID Researcher Record: Dr. Gowhar Meraj (0000-0003-2913-9199)', url: 'https://orcid.org/0000-0003-2913-9199', publicationType: 'Open Researcher Registry' },
      { title: 'Scientific Publication Archive: Gowhar Meraj', url: 'https://gowharmeraj.com/publication-archive/', publicationType: 'Scholarly Repository' },
      { title: 'Routledge: GIScience for Sustainable Water Management', url: 'https://www.routledge.com/GIScience-for-the-Sustainable-Management-of-Water-Resources/Meraj-Kanga-Farooq-Singh-Sudhanshu/p/book/9781003284512', publicationType: 'Academic Publisher' }
    ],
    researchStatus: 'FORMER RESEARCH FELLOW · Published geospatial & hydrological scholar',
    evidenceAuditNotes: 'Historical fellowship (2020–2023) and peer-reviewed publications documented. Not classified as currently employed by DEERS.',
    linkedKewModules: [
      { label: 'Water Systems Overview', url: '/water-systems' },
      { label: 'Wetlands Portal', url: '/water-systems/wetlands' },
      { label: 'Climate Risk', url: '/earth-human-impact/climate-atmosphere' }
    ]
  },
  {
    id: 'sci-082',
    name: 'Kuljit Kour',
    honorific: 'Dr.',
    designation: 'Project Scientist-II (Remote Sensing) | NMSHE, DEERS J&K',
    institution: 'Directorate of Ecology, Environment & Remote Sensing (DEERS) / NMSHE',
    region: 'Jammu',
    researchCoverage: 'Jammu Division · Samba, Rajouri, Thannamandi · Remote Sensing & Mountain Resilience',
    activeWindow: 'Documented in 2025–2026',
    trackType: 'GOVERNMENT_SCIENTIST',
    fields: ['Geospatial & Remote Sensing', 'Conservation Education & Livelihoods'],
    fieldsSummary: 'National Mission for Sustaining the Himalayan Ecosystem (NMSHE), remote sensing applications, regional climate hazards & resilience',
    editorialTribute: '“Connecting climate-hazard research with practical public education and mountain resilience.”',
    biography: 'Dr. Kuljit Kour is identified in a National Institute of Hydrology (NIH) training record as a Project Scientist-II in remote sensing at JKDEERS under the National Mission for Sustaining the Himalayan Ecosystem (NMSHE). She actively participates in DEERS climate education programs in Jammu, Samba and Rajouri, addressing extreme weather, climate impacts and regional resilience.',
    keyImpact: 'Applied remote-sensing capacity and regional climate-risk education across Jammu division.',
    documentedContributions: [
      {
        year: 2025,
        title: 'National Institute of Hydrology Advanced Training',
        evidenceTier: 'OFFICIAL GOVERNMENT RESEARCH RECORD',
        description: 'Participated as Project Scientist-II (Remote Sensing) from JKDEERS in specialized hydrological remote-sensing training at NIH Roorkee.',
        documentedOutcome: 'Official institutional certificate and repository record confirms professional designation and capacity.'
      },
      {
        year: 2026,
        title: 'Climate Action Seminar, Thannamandi',
        evidenceTier: 'DOCUMENTED SCIENTIFIC OUTREACH',
        description: 'Served as resource person for regional academic programs addressing climate hazards, cloudburst risk, and resilience in the Himalayan region.',
        documentedOutcome: 'Educated over 80 students and faculty on climate action and local ecological vulnerabilities.'
      }
    ],
    sourceProvenance: [
      { title: 'National Institute of Hydrology Official Training Record', url: 'https://online.nihroorkee.gov.in/trainingcertificates/Cert090720250311.pdf', publicationType: 'Government Training Certificate' },
      { title: 'Top News J&K: Seminar on Climate Action 2026', url: 'https://topnewsjk.in/gdc-thannamandi-organises-seminar-on-climate-action-2026/', publicationType: 'Institutional Event Report' }
    ],
    researchStatus: 'RECENT PROJECT SCIENTIST (2025–2026) · Active NMSHE climate researcher',
    evidenceAuditNotes: 'Recent project affiliation documented in 2025 NIH records and 2026 outreach events. Individual publication portfolio pending further documentation.',
    linkedKewModules: [
      { label: 'Climate Hazards', url: '/hazard-intelligence' },
      { label: 'Climate Overview', url: '/earth-human-impact/climate-atmosphere' },
      { label: 'Jammu Regional Ecology', url: '/biodiversity/overview' }
    ]
  },
  {
    id: 'sci-083',
    name: 'Hanifa Nasim',
    honorific: 'Dr.',
    designation: 'Former Junior Scientist and Principal Investigator | Department of Environment and Remote Sensing, J&K',
    institution: 'Directorate of Ecology, Environment & Remote Sensing (DEERS), J&K',
    region: 'Kashmir Valley',
    researchCoverage: 'Kashmir Valley, Jammu & Ladakh · Lakes, Wetlands, Topographic Mapping, Satellite Baselines',
    activeWindow: 'Research documented: 1998–2012',
    trackType: 'GOVERNMENT_SCIENTIST',
    fields: ['Wetland & Limnology', 'Geospatial & Remote Sensing'],
    fieldsSummary: 'Comprehensive lake inventories, Survey of India map reconciliation, satellite wetland mapping, limnological baselines',
    editorialTribute: '“Establishing the geographical evidence needed to understand and conserve Kashmir\'s lakes and water bodies.”',
    biography: 'Dr. Hanifa Nasim was the principal investigator responsible for the department\'s foundational lake and waterbody inventory. The 2012 government publication records her scientific leadership in preparing the inventory using remote sensing, GIS, topographic maps and field verification. It also cites her earlier 1998 waterbody directory, which formed the first baseline for modern wetland studies in Jammu & Kashmir.',
    keyImpact: 'Foundational waterbody inventory used for subsequent wetland research, Ramsar submissions and statutory planning.',
    documentedContributions: [
      {
        year: 1998,
        title: 'Original Lakes and Waterbodies Directory',
        evidenceTier: 'HISTORICAL DEPARTMENTAL SCIENTIFIC RECORD',
        description: 'Prepared an earlier state-wide inventory of water bodies based on Survey of India topographic maps.',
        documentedOutcome: 'Historical reference baseline subsequently cited across judicial affidavits and compared with modern satellite surveys.'
      },
      {
        year: 2012,
        title: 'Directory of Lakes and Waterbodies of J&K State',
        evidenceTier: 'ORIGINAL DEPARTMENTAL RESEARCH REPORT',
        description: 'Led the comprehensive scientific inventory using GIS and satellite observations to map lakes, wetlands and water bodies.',
        documentedOutcome: 'Report documented 150 water bodies in Jammu, 415 in Kashmir, and 665 in Ladakh with spatial coordinates and field-verified baselines.'
      }
    ],
    sourceProvenance: [
      { title: '2012 Government Lake and Waterbody Inventory (Ramsar Archived)', url: 'https://rsis.ramsar.org/RISapp/files/42191262/documents/IN2496_descr220412_1.pdf', publicationType: 'Official Government Publication' }
    ],
    researchStatus: 'HISTORICAL SCIENTIST · Author of landmark 2012 waterbody directory',
    evidenceAuditNotes: 'Principal Investigator on official 2012 publication. Baseline used across Ramsar information sheets and High Court environmental PILs.',
    linkedKewModules: [
      { label: 'Wetlands Portal', url: '/water-systems/wetlands' },
      { label: 'Lakes Scorecard', url: '/water-systems/lakes' },
      { label: 'Water Systems', url: '/water-systems' }
    ]
  },
  {
    id: 'sci-084',
    name: 'Tasneem Keng',
    honorific: 'Dr.',
    designation: 'Scientist-H, DEERS | Earlier Scientific Assistant and Co-Investigator, Waterbody Mapping',
    institution: 'Directorate of Ecology, Environment & Remote Sensing (DEERS), J&K',
    region: 'Kashmir Valley',
    researchCoverage: 'Kashmir Valley · Wetlands, Ganderbal Waterbodies, National Wetlands Committee',
    activeWindow: '2012–2022',
    trackType: 'GOVERNMENT_SCIENTIST',
    fields: ['Wetland & Limnology', 'Geospatial & Remote Sensing'],
    fieldsSummary: 'Wetland conservation coordination, waterbody mapping, district-level geospatial monitoring, National Wetlands Committee proceedings',
    editorialTribute: '“Scientific documentation of Kashmir\'s wetlands through remote sensing, inventory methods and regulatory coordination.”',
    biography: 'Dr. Tasneem Keng contributed to the government lake and waterbody inventory as co-investigator in 2012, when she was identified as a Scientific Assistant. Official government records from 2022 list her as Scientist-H, DEERS, participating in a National Wetlands Committee meeting. She was also actively involved in district-level technical coordination concerning wetland documentation in Ganderbal.',
    keyImpact: 'Waterbody inventory development and technical participation in national and state wetland management.',
    documentedContributions: [
      {
        year: 2012,
        title: 'Lakes and Waterbodies of J&K',
        evidenceTier: 'OFFICIAL SCIENTIFIC REPORT',
        description: 'Served as co-investigator on a landmark satellite-based inventory led by Dr. Hanifa Nasim.',
        documentedOutcome: 'Co-authored official report establishing baseline geospatial polygons for Kashmir and Jammu water bodies.'
      },
      {
        year: '2021–2022',
        title: 'Wetland Management and National Scientific Coordination',
        evidenceTier: 'GOVERNMENT WETLAND PROGRAM RECORD',
        description: 'Participated in Ganderbal wetland planning discussions and was listed as Scientist-H, DEERS, in National Wetlands Committee proceedings.',
        documentedOutcome: 'Technical participation officially recorded in state-level and national wetland conservation and Ramsar review processes.'
      }
    ],
    sourceProvenance: [
      { title: '2012 DEERS Lake Inventory (Ramsar Archive)', url: 'https://rsis.ramsar.org/RISapp/files/42191262/documents/IN2496_descr220412_1.pdf', publicationType: 'Government Scientific Report' },
      { title: 'National Wetlands Committee Meeting Minutes (April 2022)', url: 'https://indianwetlands.in/wp-content/uploads/library/MoM_NWC_06-04-2022.pdf', publicationType: 'Statutory Committee Minutes' }
    ],
    researchStatus: 'SENIOR SCIENTIST-H · 2012–2022 documented service',
    evidenceAuditNotes: 'Scientist-H designation verified in 2022 National Wetlands Committee minutes. Current 2026 service status unconfirmed pending nominal roll.',
    linkedKewModules: [
      { label: 'Wetlands Portal', url: '/water-systems/wetlands' },
      { label: 'Environmental PILs', url: '/resources/environmental-pil' },
      { label: 'SEIAE Reports', url: '/earth-human-impact/scientific-reports' }
    ]
  },
  {
    id: 'sci-085',
    name: 'Shah Murtaza Mushtaq',
    honorific: 'Dr.',
    designation: 'Former Project Scientist-B, J&K State Climate Change Centre | Subsequently Faculty of Forestry, SKUAST-Kashmir',
    institution: 'Directorate of Ecology, Environment & Remote Sensing (DEERS) / SKUAST-Kashmir',
    region: 'Kashmir Valley',
    researchCoverage: 'Kashmir Valley · Western Himalayan Forests, Carbon Emissions, Climate Risk in Grasslands',
    activeWindow: 'Research: 2016–2026',
    trackType: 'GOVERNMENT_SCIENTIST',
    fields: ['Forest & Terrestrial Ecology', 'Geospatial & Remote Sensing'],
    fieldsSummary: 'Forest climate risk modeling, sectoral GHG inventories, Western Himalayan forest ecology, community vulnerability',
    editorialTribute: '“Scientific analysis of Himalayan climate, forest ecosystems and the environmental vulnerabilities of forest-dependent communities.”',
    biography: 'Dr. Shah Murtaza Mushtaq served as a Project Scientist-B within the DEERS Climate Change Centre and co-authored its 2016 sectoral greenhouse-gas inventory. Later academic records place him in forestry research at SKUAST-Kashmir, including published studies on forest vulnerability, grasslands and conservation ecology in the Western Himalayas.',
    keyImpact: 'Contributions to both governmental climate emissions research and subsequent peer-reviewed forest ecosystem science.',
    documentedContributions: [
      {
        year: 2016,
        title: 'J&K Greenhouse Gas Emissions Inventory',
        evidenceTier: 'OFFICIAL SCIENTIFIC PUBLICATION',
        description: 'Served as a Project Scientist-B and co-author on the departmental sectoral emissions study.',
        documentedOutcome: 'Published sectoral climate inventory for J&K State Climate Change Centre under NMSHE.'
      },
      {
        year: 2026,
        title: 'Climate Risk Assessment of Forest Ecosystems',
        evidenceTier: 'SCIENTIFIC RESEARCH / PEER-REVIEWED',
        description: 'Contributed to peer-reviewed research integrating hazard, exposure and vulnerability in Western Himalayan forest ecosystems.',
        documentedOutcome: 'Research published in Frontiers in Plant Science (Western Himalayan forest resilience).'
      }
    ],
    sourceProvenance: [
      { title: 'DEERS Emissions Inventory 2016', url: 'https://devalt.in/media/com_dalibrary/dalibrary/pdf/nmshe17.pdf', publicationType: 'Departmental Scientific Report' },
      { title: 'Frontiers in Plant Science: Western Himalayan Forest Resilience Research', url: 'https://www.frontiersin.org/journals/plant-science', publicationType: 'Peer-Reviewed Journal' }
    ],
    researchStatus: 'FORMER DEERS PROJECT SCIENTIST-B · SKUAST-Kashmir Forestry Researcher',
    evidenceAuditNotes: 'DEERS Climate Change Centre appointment in 2016 verified; subsequent academic tenure at SKUAST-Kashmir documented.',
    linkedKewModules: [
      { label: 'Forests & Treeline', url: '/biodiversity/forest-ecosystems' },
      { label: 'Climate Risk', url: '/earth-human-impact/climate-atmosphere' },
      { label: 'SEIAE Reports', url: '/earth-human-impact/scientific-reports' }
    ]
    },
  {
    id: 'sci-086',
    name: 'Sabeena Sultan',
    honorific: 'Dr.',
    designation: 'Scientist-C, J&K Pollution Control Committee (reported June 2026) | Formerly listed as Scientist-B',
    institution: 'J&K Pollution Control Committee (JKPCC), Kashmir',
    region: 'Kashmir Valley',
    researchCoverage: 'Kashmir Valley · Srinagar, Ganderbal, Bandipora, Sonamarg · Air Quality, Solid Waste, Wildlife Habitats',
    activeWindow: '2024–2026',
    trackType: 'GOVERNMENT_SCIENTIST',
    fields: ['Environmental Chemistry & Pollution', 'Wildlife Ecology & Carnivores'],
    fieldsSummary: 'Municipal solid waste management, continuous air-quality monitoring, brown-bear habitat pollution, plastic waste regulation',
    editorialTribute: '“Investigating pollution pressures affecting Kashmir\'s wildlife habitats, rivers and communities.”',
    biography: 'Dr. Sabeena Sultan is an environmental scientist associated with JKPCC Kashmir. Her documented work includes solid waste management, air pollution, plastic waste regulation and environmental compliance. She participated in an NGT-directed investigation of the Sonamarg brown-bear habitat, which examined waste generation, tourism pressures and waste-treatment deficiencies. In 2026, she reported the establishment of 34 air-quality monitoring stations across Kashmir.',
    keyImpact: 'Scientific investigation and regulatory reporting on Sonamarg\'s waste-management deficiencies and wildlife habitat pressures.',
    documentedContributions: [
      {
        year: 2024,
        title: 'Sonamarg Brown Bear Habitat Investigation',
        evidenceTier: 'OFFICIAL NGT SCIENTIFIC REPORT',
        description: 'Served on the three-member JKPCC investigation committee in NGT OA 1046/2024 examining municipal solid waste in the Sonamarg wildlife corridor.',
        documentedOutcome: 'Reported substantial untreated waste at treatment facility; recommended waste segregation, perimeter fencing, and continuous waste quantification.'
      },
      {
        year: 2025,
        title: 'Sukhnag Mining Permit Investigation',
        evidenceTier: 'OFFICIAL NGT REPORT',
        description: 'Nominated to statutory committee examining short-term mineral extraction permissions along the Sukhnag River in OA 1211/2024.',
        documentedOutcome: 'Committee reviewed 164 extraction permits and reported findings on riverbed conditions.'
      },
      {
        year: 2026,
        title: 'Waste Management & Air Pollution Outreach',
        evidenceTier: 'SCIENTIFIC OUTREACH & MEDIA RECORD',
        description: 'Technical presentation on municipal solid waste and seasonal autumn smog air-quality monitoring network.',
        documentedOutcome: 'Reported network of 34 air-quality monitoring stations established across Kashmir division.'
      }
    ],
    sourceProvenance: [
      { title: 'NGT Sonamarg Investigation Report (OA 1046/2024)', url: 'https://www.greentribunal.gov.in/sites/default/files/news_updates/Report%20on%20behalf%20of%20J%26K%20Pollution%20Control%20Committee%20in%20OA%20No.%201046%20of%202024%20%28News%20item%20appearing%20in%20India.com%20dated%2027-07-2024%20titled%20Saving%20Kashmir%20Brown.pdf', publicationType: 'Statutory Tribunal Filing' },
      { title: 'Greater Kashmir: Experts Call for Action on Autumn Smog (Nov 2026)', url: 'https://www.greaterkashmir.com/srinagar/experts-call-for-urgent-action-as-kashmirs-autumn-smog-spikes-breathing-problems-12797115/', publicationType: 'News Media Archive' }
    ],
    researchStatus: 'ACTIVE SCIENTIST-C (2026) · NGT-mandated habitat & air pollution investigator',
    evidenceAuditNotes: 'Reported as Scientist-C in June 2026. Official NGT committee signatory in OA 1046/2024.',
    linkedKewModules: [
      { label: 'Air Quality Network', url: '/environmental-monitoring/air-pollution' },
      { label: 'Wildlife Corridors', url: '/protected-network/corridors-and-connectivity' },
      { label: 'Environmental PILs', url: '/resources/environmental-pil' }
    ]
  },
  {
    id: 'sci-087',
    name: 'Neelu Sharma',
    honorific: '',
    designation: 'Principal Scientific Officer | J&K Pollution Control Committee, Jammu',
    institution: 'J&K Pollution Control Committee (JKPCC), Jammu',
    region: 'Jammu',
    researchCoverage: 'Jammu Division · Jammu City · Biomedical Waste Regulation, Air Quality, Industrial Compliance',
    activeWindow: '2022–2025',
    trackType: 'GOVERNMENT_SCIENTIST',
    fields: ['Environmental Chemistry & Pollution', 'Conservation Education & Livelihoods'],
    fieldsSummary: 'Biomedical waste management rules, industrial environmental compliance, clean-air technical education',
    editorialTribute: '“Promoting scientific pollution control through regulatory education and environmental compliance.”',
    biography: 'Neelu Sharma has been documented as Principal Scientific Officer at JKPCC Jammu. Her professional work spans environmental regulation, clean-air technical education, biomedical waste management legal frameworks, and public-sector environmental awareness initiatives.',
    keyImpact: 'Regulatory and scientific education across air-pollution and biomedical-waste management programs.',
    documentedContributions: [
      {
        year: 2022,
        title: 'International Day of Clean Air Technical Session',
        evidenceTier: 'DEPARTMENTAL EVENT REPORT',
        description: 'Participated in a technical event addressing air pollution and cleaner industrial technologies in Jammu.',
        documentedOutcome: 'Scientific and regulatory awareness event conducted for industrial stakeholders.'
      },
      {
        year: 2025,
        title: 'Biomedical Waste Management Compliance Workshop',
        evidenceTier: 'INSTITUTIONAL EVENT REPORT',
        description: 'Delivered technical presentation detailing the legal framework governing biomedical waste management, barcode tracking, and environmental compliance.',
        documentedOutcome: 'Regulatory sensitization provided to representatives of government and private healthcare facilities across Jammu division.'
      }
    ],
    sourceProvenance: [
      { title: 'Jammu Links News: Workshop on Biomedical Waste Management (Sept 2025)', url: 'https://www.jammulinksnews.com/jk-pollution-control-committee-organizes-workshop-on-biomedical-waste-management/', publicationType: 'Media Report' },
      { title: 'The Kashmir Horizon: Clean Air for Blue Skies in Jammu (Sept 2022)', url: 'https://thekashmirhorizon.com/2022/09/09/jkpcc-observes-intl-day-of-clean-air-for-blue-skies-in-jammu/', publicationType: 'Departmental Coverage' }
    ],
    researchStatus: 'PRINCIPAL SCIENTIFIC OFFICER · Documented 2022–2025 leadership',
    evidenceAuditNotes: 'Principal Scientific Officer designation independently verified in 2022 and 2025 official proceedings.',
    linkedKewModules: [
      { label: 'Air Quality Overview', url: '/environmental-monitoring/air-pollution' },
      { label: 'Environmental Compliance', url: '/about/methodology' },
      { label: 'SEIAE Reports', url: '/earth-human-impact/scientific-reports' }
    ]
  },
  {
    id: 'sci-088',
    name: 'Yash Paul',
    honorific: 'Dr.',
    designation: 'Scientist and Head of Laboratories | J&K Pollution Control Committee, Jammu',
    institution: 'J&K Pollution Control Committee (JKPCC), Jammu',
    region: 'Jammu',
    researchCoverage: 'Jammu Division · Ambient Air Monitoring, CAAQS Stations, Industrial Emissions',
    activeWindow: '2022',
    trackType: 'GOVERNMENT_SCIENTIST',
    fields: ['Environmental Chemistry & Pollution', 'Geospatial & Remote Sensing'],
    fieldsSummary: 'Laboratory management, continuous ambient air-quality monitoring (CAAQMS), ozone depletion, industrial emissions analysis',
    editorialTribute: '“Monitoring air pollution and communicating scientific findings for better environmental decisions.”',
    biography: 'Dr. Yash Paul was identified as a scientist and head of laboratories at JKPCC Jammu during 2022. His publicly documented work included technical analysis and public communication of air-quality trends, particulate pollution monitoring, and continuous ambient air monitoring systems.',
    keyImpact: 'Technical reporting and public education concerning Jammu and Kashmir\'s air quality.',
    documentedContributions: [
      {
        year: 2022,
        title: 'Clean Air Monitoring Presentation',
        evidenceTier: 'DEPARTMENTAL SCIENTIFIC EVENT',
        description: 'Presented air-quality trends and explained JKPCC\'s monitoring activities and CAAQMS station development.',
        documentedOutcome: 'Technical air-quality baseline data presented to regulators and public stakeholders.'
      },
      {
        year: 2022,
        title: 'Ozone Protection and Industrial Emissions',
        evidenceTier: 'INDEPENDENT MEDIA / PUBLIC EDUCATION',
        description: 'Participated in World Ozone Day scientific symposium addressing the Montreal Protocol, Kigali Amendment, and industrial greenhouse gases.',
        documentedOutcome: 'Public scientific-awareness activity recorded in regional media.'
      }
    ],
    sourceProvenance: [
      { title: 'The Kashmir Horizon: Clean Air for Blue Skies (Sept 2022)', url: 'https://thekashmirhorizon.com/2022/09/09/jkpcc-observes-intl-day-of-clean-air-for-blue-skies-in-jammu/', publicationType: 'Departmental Coverage' },
      { title: 'The Kashmir Horizon: World Ozone Day Symposium (Sept 2022)', url: 'https://thekashmirhorizon.com/2022/09/17/jkpcc-hosts-symposium-for-students-to-observe-world-ozone-day-in-jammu/', publicationType: 'Media Report' }
    ],
    researchStatus: 'LABORATORY HEAD · Documented 2022 air monitoring leadership',
    evidenceAuditNotes: 'Laboratory leadership documented in 2022. Spelling reconciled with historical directory (Yash Pal).',
    linkedKewModules: [
      { label: 'Air Quality Stations', url: '/environmental-monitoring/air-pollution' },
      { label: 'Industrial Emissions', url: '/environmental-monitoring/air-pollution' }
    ]
  },
  {
    id: 'sci-089',
    name: 'Mutaharra Abida Waheed Deva',
    honorific: '',
    designation: 'Former Scientist-C and Senior Scientific Officer, J&K State Pollution Control Board | Environmental Governance and Climate Consultant',
    institution: 'J&K State Pollution Control Board (JKSPCB) / Climate Consultant',
    region: 'Kashmir Valley',
    researchCoverage: 'Kashmir Valley · Srinagar · Pollution Monitoring, Transport Emissions, Institutional Capacity Building',
    activeWindow: 'Historical career to 2026',
    trackType: 'GOVERNMENT_SCIENTIST',
    fields: ['Environmental Chemistry & Pollution', 'Conservation Education & Livelihoods'],
    fieldsSummary: 'Early pollution control board laboratories, vehicle emissions, electric mobility, environmental policy and statutory compliance',
    editorialTribute: '“Environmental protection depends on scientific monitoring, functioning institutions and regulatory accountability.”',
    biography: 'Mutaharra Abida Waheed Deva is a retired environmental scientist associated with the earlier development of the J&K State Pollution Control Board. Government records identify her as Scientist-C, while her professional biography and subsequent reporting describe foundational work spanning pollution monitoring, environmental governance, climate planning, and institutional capacity building. In 2026, she contributed expert commentary on vehicle emissions and electric mobility in Srinagar.',
    keyImpact: 'Historical participation in pollution regulation, monitoring systems and environmental policy development.',
    documentedContributions: [
      {
        year: 'Historical',
        title: 'Pollution Control Board Scientific Service',
        evidenceTier: 'GOVERNMENT PERSONNEL RECORD GAD',
        description: 'Served in the scientific establishment of JKSPCB as Scientist-C and Senior Scientific Officer.',
        documentedOutcome: 'Scientist-C designation supported by government personnel record; participated in laboratory monitoring frameworks.'
      },
      {
        year: 2026,
        title: 'Transport Pollution and Environmental Governance',
        evidenceTier: 'INDEPENDENT ENVIRONMENTAL JOURNALISM',
        description: 'Expert commentary regarding vehicle emissions, cold-climate EV limitations, and transport sector pollution control.',
        documentedOutcome: 'Published in Down To Earth analysis on urban transport electrification in Srinagar.'
      }
    ],
    sourceProvenance: [
      { title: 'Down To Earth: India on E-Wheels (2026)', url: 'https://www.downtoearth.org.in/air/india-on-e-wheels-there-are-hardly-any-electric-cars-on-srinagars-roads-here-is-why', publicationType: 'Environmental Journalism' },
      { title: 'J&K General Administration Department Official Record', url: 'https://www.jkgad.nic.in/common/showOrder.aspx?actCode=N40597', publicationType: 'Government Gazette Order' }
    ],
    researchStatus: 'FORMER SCIENTIST-C & SENIOR SCIENTIFIC OFFICER · 2026 policy commentator',
    evidenceAuditNotes: 'Scientist-C designation verified in GAD records. Active commentary on Himalayan urban transport emissions in 2026.',
    linkedKewModules: [
      { label: 'Transportation Pollution', url: '/environmental-monitoring/air-pollution' },
      { label: 'Pollution Control History', url: '/about/methodology' }
    ]
  },
  {
    id: 'sci-090',
    name: 'Ruksana Parveen',
    honorific: '',
    designation: 'Senior Scientific Officer and District Officer, Leh | Ladakh Pollution Control Committee',
    institution: 'Ladakh Pollution Control Committee (LPCC) / Formerly JKSPCB',
    region: 'Ladakh',
    researchCoverage: 'Ladakh · Leh District · Cold-Desert Plastic Waste, E-Waste, Ambient Water Quality, Extended Producer Responsibility',
    activeWindow: '2022–2026',
    trackType: 'GOVERNMENT_SCIENTIST',
    fields: ['Environmental Chemistry & Pollution', 'Conservation Education & Livelihoods'],
    fieldsSummary: 'Cold-desert waste management, Extended Producer Responsibility (EPR), ambient water quality monitoring, e-waste compliance',
    editorialTribute: '“Strengthening pollution monitoring, waste-management regulation and environmental compliance in Ladakh\'s fragile cold-desert ecosystem.”',
    biography: 'Ruksana Parveen is a Senior Scientific Officer with the Ladakh Pollution Control Committee. Official Ladakh administrative records identify her as District Officer, Leh, documenting her leadership in environmental compliance reviews, plastic waste regulation, and cold-desert pollution monitoring. Her service links historical JKSPCB scientific staffing with the post-reorganization Ladakh environmental governance structure.',
    keyImpact: 'Scientific and regulatory contributions to waste management and environmental monitoring in Ladakh.',
    documentedContributions: [
      {
        year: 2024,
        title: 'Plastic, E-Waste and Solid Waste Awareness',
        evidenceTier: 'OFFICIAL LADAKH GOVERNMENT RECORD',
        description: 'Organized and conducted public awareness programs explaining waste-management rules and EPR responsibilities in Leh.',
        documentedOutcome: 'Official environmental compliance education conducted for local commercial and municipal stakeholders.'
      },
      {
        year: 2025,
        title: 'Ladakh Plastic Waste Management Review',
        evidenceTier: 'REGULATORY PROGRAM RECORD',
        description: 'Presented technical review of plastic-waste generation, collection mechanisms, Extended Producer Responsibility gaps, and cold-desert disposal challenges.',
        documentedOutcome: 'Technical review publicly documented in Ladakh administrative proceedings.'
      }
    ],
    sourceProvenance: [
      { title: 'Official Leh District Staff Directory (Oct 2026)', url: 'https://leh.nic.in/department/pollution-control-committee/', publicationType: 'Government Portal' },
      { title: 'Ladakh Administration Official Notification (Dec 2024)', url: 'https://ladakh.gov.in/ladakh-pollution-control-committee-leh-lpcc-organised-an-awareness-programme-on-plastic-waste-e-waste-and-solid-waste-management-rules/', publicationType: 'Official Portal' }
    ],
    researchStatus: 'ACTIVE SENIOR SCIENTIFIC OFFICER & DISTRICT OFFICER LEH (2026)',
    evidenceAuditNotes: 'Current official posting confirmed in official Leh directory (October 2026). Prior JKSPCB scientific cadre record verified.',
    linkedKewModules: [
      { label: 'Ladakh Environmental Monitoring', url: '/districts' },
      { label: 'Waste Management', url: '/about/methodology' }
    ]
  },
  {
    id: 'sci-091',
    name: 'Bashir Ahmad Wani',
    honorific: '',
    designation: 'Scientist-B | J&K Pollution Control Committee; transferred to Divisional Officer, Kupwara in 2025',
    institution: 'J&K Pollution Control Committee (JKPCC)',
    region: 'Kashmir Valley',
    researchCoverage: 'Kashmir Valley · Budgam, Sukhnag River, Kupwara · Mineral Extraction & Riverbed Integrity',
    activeWindow: '2025',
    trackType: 'GOVERNMENT_SCIENTIST',
    fields: ['Environmental Chemistry & Pollution'],
    fieldsSummary: 'Riverbed mineral extraction permits, environmental compliance auditing, industrial water pollution',
    editorialTribute: '“Scientific and regulatory examination of mineral extraction and environmental permits.”',
    biography: 'Bashir Ahmad Wani served as Scientist-B with JKPCC and was appointed to a statutory inquiry committee examining short-term mineral extraction permits and riverbed conditions along the Sukhnag River. Departmental records document his subsequent transfer to Divisional Officer, Kupwara, during July 2025.',
    keyImpact: 'Assigned scientific and regulatory scrutiny of Sukhnag mineral-extraction permits.',
    documentedContributions: [
      {
        year: 2025,
        title: 'NGT OA 1211/2024, Sukhnag River Investigation',
        evidenceTier: 'OFFICIAL NGT FILING',
        description: 'Named in July 14, 2025 committee order examining mining permissions and short-term extraction permits along Sukhnag River.',
        documentedOutcome: 'Appointment documented; replaced on committee following transfer to Kupwara division.'
      }
    ],
    sourceProvenance: [
      { title: 'JKPCC Reply in NGT OA 1211/2024 (Raja Muzaffar Bhat v. UT of J&K)', url: 'https://www.greentribunal.gov.in/sites/default/files/news_updates/REPLY%20BY%20JKPCC%20IN%20OA%20NO.%201211%20of%202024%20Raja%20Muzaffar%20Bhat%20VS%20Union%20Territory%20of%20Jammu%20%26%20Kashmir%20%26%20Ors..pdf', publicationType: 'Judicial Compliance Filing' }
    ],
    researchStatus: 'SCIENTIST-B / DIVISIONAL OFFICER KUPWARA · 2025 assignment',
    evidenceAuditNotes: 'Scientist-B designation, NGT appointment, and July 2025 transfer verified in official judicial filings.',
    linkedKewModules: [
      { label: 'River Systems', url: '/water-systems/rivers' },
      { label: 'Environmental PILs', url: '/resources/environmental-pil' }
    ]
  },
  {
    id: 'sci-092',
    name: 'Shabir Ahmad',
    honorific: '',
    designation: 'Scientist-A | J&K Pollution Control Committee, Kashmir',
    institution: 'J&K Pollution Control Committee (JKPCC), Kashmir',
    region: 'Kashmir Valley',
    researchCoverage: 'Kashmir Valley · Ganderbal, Sonamarg · Alpine Habitat Solid Waste & Tourism Impact',
    activeWindow: '2024',
    trackType: 'GOVERNMENT_SCIENTIST',
    fields: ['Environmental Chemistry & Pollution', 'Wildlife Ecology & Carnivores'],
    fieldsSummary: 'Alpine solid waste, tourism ecological footprints, brown-bear habitat degradation, effluent monitoring',
    editorialTribute: '“Documenting the effects of tourism waste and environmental infrastructure on wildlife habitats.”',
    biography: 'Shabir Ahmad is identified as Scientist-A in an original JKPCC investigation report addressing the ecological impacts of untreated solid waste and tourism infrastructure on the Himalayan brown bear habitat around Sonamarg.',
    keyImpact: 'Scientific field investigation supporting regulatory scrutiny of waste disposal in Sonamarg.',
    documentedContributions: [
      {
        year: 2024,
        title: 'Sonamarg Brown Bear Habitat and Waste Assessment',
        evidenceTier: 'OFFICIAL NGT INVESTIGATION REPORT',
        description: 'Participated in three-member committee examining solid waste, tourism development, and habitat pressures in Sonamarg.',
        documentedOutcome: 'Investigation documented municipal waste processing deficiencies and proposed statutory corrective measures.'
      }
    ],
    sourceProvenance: [
      { title: 'NGT OA 1046/2024 JKPCC Report on Sonamarg Waste', url: 'https://www.greentribunal.gov.in/sites/default/files/news_updates/Report%20on%20behalf%20of%20J%26K%20Pollution%20Control%20Committee%20in%20OA%20No.%201046%20of%202024%20%28News%20item%20appearing%20in%20India.com%20dated%2027-07-2024%20titled%20Saving%20Kashmir%20Brown.pdf', publicationType: 'Judicial Investigation Report' }
    ],
    researchStatus: 'SCIENTIST-A · 2024 field investigation signatory',
    evidenceAuditNotes: 'Surname-free record in official NGT filing. Explicitly maintained as distinct from historical directory listing for Shabir Ahmad Sheikh.',
    linkedKewModules: [
      { label: 'Sonamarg Wildlife Corridor', url: '/protected-network/corridors-and-connectivity' },
      { label: 'Wildlife Ecology', url: '/biodiversity/wildlife-sightings' }
    ]
  },
  {
    id: 'sci-093',
    name: 'Suman Pawar',
    honorific: '',
    designation: 'Scientist-A and In-charge Air Laboratory | J&K Pollution Control Committee, Jammu',
    institution: 'J&K Pollution Control Committee (JKPCC), Jammu',
    region: 'Jammu',
    researchCoverage: 'Jammu Division · Jammu, Rajouri, Poonch · Ambient Air Monitoring, Industrial Siting, Noise Acoustics',
    activeWindow: '2025',
    trackType: 'GOVERNMENT_SCIENTIST',
    fields: ['Environmental Chemistry & Pollution'],
    fieldsSummary: 'Air laboratory testing, industrial facility siting criteria, geographical barrier sound/particulate attenuation, stone crusher compliance',
    editorialTribute: '“Using air-quality and noise measurements to support evidence-based industrial environmental regulation.”',
    biography: 'Suman Pawar is identified in a 2025 JKPCC court filing as Scientist-A and In-charge of the Air Laboratory in Jammu. She was assigned to a statutory technical committee examining industrial siting criteria and environmental compliance for aggregate processing facilities.',
    keyImpact: 'Technical participation in industrial siting and pollution compliance assessment.',
    documentedContributions: [
      {
        year: 2025,
        title: 'Industrial Facility Siting and Pollution Assessment',
        evidenceTier: 'OFFICIAL NGT COMPLIANCE MATERIAL',
        description: 'Named as the Air Laboratory scientist on the technical committee constituted for site verification and ambient air assessment.',
        documentedOutcome: 'Scientific appointment recorded in execution application proceedings regarding industrial facility siting.'
      }
    ],
    sourceProvenance: [
      { title: 'REPORT BY J&K PCC IN EA NO. 07 of 2025 IN OA NO. 151 of 2023', url: 'https://www.greentribunal.gov.in/sites/default/files/news_updates/REPORT%20BY%20JAMMU%20AND%20KASHMIR%20PCC%20IN%20EA%20NO.%2007%20of%202025%20IN%20OA%20NO.%20151%20of%202023%20Hassina%20Wajid%20%28Sarpanch%29%20VS%20State%20of%20Jammu%20%26%20Kashmir%20%28UT%29%20%26Ors.pdf', publicationType: 'Tribunal Compliance Report' }
    ],
    researchStatus: 'IN-CHARGE AIR LABORATORY JAMMU / SCIENTIST-A · 2025 filing',
    evidenceAuditNotes: 'Official scientist designation and committee appointment verified in NGT execution application records.',
    linkedKewModules: [
      { label: 'Air Laboratory Telemetry', url: '/environmental-monitoring/air-pollution' },
      { label: 'Industrial Compliance', url: '/about/methodology' }
    ]
  },
  {
    id: 'sci-094',
    name: 'Randeep Singh Manhas',
    honorific: '',
    designation: 'Scientist-A | J&K Pollution Control Committee, Jammu',
    institution: 'J&K Pollution Control Committee (JKPCC), Jammu',
    region: 'Jammu',
    researchCoverage: 'Jammu Division · Poonch, Jammu · Environmental Compensation, Stone Crusher Regulation',
    activeWindow: '2025',
    trackType: 'GOVERNMENT_SCIENTIST',
    fields: ['Environmental Chemistry & Pollution'],
    fieldsSummary: 'Environmental compensation formulas, industrial compliance auditing, stone-crusher emissions and siting litigation',
    editorialTribute: '“Supporting scientific assessment and accountability for industrial pollution.”',
    biography: 'Randeep Singh Manhas is identified in a 2025 JKPCC order as Scientist-A and a member of a technical committee tasked with auditing records and assessing environmental compensation in industrial stone-crusher proceedings in Poonch.',
    keyImpact: 'Scientific participation in NGT-directed environmental compensation assessment.',
    documentedContributions: [
      {
        year: 2025,
        title: 'Hassina Wajid v. J&K, NGT OA 151/2023 Compensation Committee',
        evidenceTier: 'OFFICIAL ENVIRONMENTAL REGULATORY PROCEEDINGS',
        description: 'Appointed to technical committee evaluating environmental compensation and records concerning stone-crusher pollution in Poonch.',
        documentedOutcome: 'Technical audit facilitated JKPCC collection of ₹7.2 lakh in environmental compensation.'
      }
    ],
    sourceProvenance: [
      { title: 'JKPCC Compliance Report in NGT OA 151/2023 (Feb 2025)', url: 'https://www.greentribunal.gov.in/sites/default/files/news_updates/REPORT%20BY%20JAMMU%20AND%20KASHMIR%20PCC%20IN%20EA%20NO.%2007%20of%202025%20IN%20OA%20NO.%20151%20of%202023%20Hassina%20Wajid%20%28Sarpanch%29%20VS%20State%20of%20Jammu%20%26%20Kashmir%20%28UT%29%20%26Ors.pdf', publicationType: 'Judicial Compliance Report' }
    ],
    researchStatus: 'SCIENTIST-A · 2025 NGT compensation committee member',
    evidenceAuditNotes: 'Designation and role verified. Payment acknowledged as institutional case outcome.',
    linkedKewModules: [
      { label: 'Environmental PILs', url: '/resources/environmental-pil' },
      { label: 'Industrial Compliance', url: '/about/methodology' }
    ]
  },
  {
    id: 'sci-095',
    name: 'Gazala Hassan',
    honorific: '',
    designation: 'Scientist-B | J&K Pollution Control Committee, Kashmir',
    institution: 'J&K Pollution Control Committee (JKPCC), Kashmir',
    region: 'Kashmir Valley',
    researchCoverage: 'Kashmir Valley · Srinagar · Ozone Layer Protection, Vehicular Emissions, Atmospheric Science',
    activeWindow: '2023',
    trackType: 'GOVERNMENT_SCIENTIST',
    fields: ['Environmental Chemistry & Pollution'],
    fieldsSummary: 'Atmospheric pollution, ozone-depleting substances, Montreal Protocol compliance, vehicular emissions monitoring',
    editorialTribute: '“Improving public understanding of ozone protection, atmospheric pollution and emission reduction.”',
    biography: 'Gazala Hassan (also reported as Gazzala Hassan) is documented as Scientist-B with JKPCC. She has led public environmental science programs addressing atmospheric pollution, the chemistry of ground-level ozone, and the operational mechanisms of international environmental treaties.',
    keyImpact: 'Scientific public education on ozone-depleting substances and ground-level air pollution.',
    documentedContributions: [
      {
        year: 2023,
        title: 'World Ozone Day Scientific Presentation',
        evidenceTier: 'INDEPENDENT MEDIA / DEPARTMENTAL PROGRAM',
        description: 'Technical presentation explaining the Montreal Protocol, ozone-depleting chemicals, and vehicular pollution precursors of ground-level ozone.',
        documentedOutcome: 'Scientific awareness presentation delivered in Srinagar under JKPCC Kashmir program.'
      }
    ],
    sourceProvenance: [
      { title: 'Kashmir Images: JKPCC Celebrates World Ozone Day (Sept 18, 2023)', url: 'https://thekashmirimages.com/2023/09/18/jk-pollution-control-committee-celebrates-world-ozone-day-2023/', publicationType: 'Media Report' }
    ],
    researchStatus: 'SCIENTIST-B · Documented 2023 atmospheric education outreach',
    evidenceAuditNotes: 'Designation and outreach verified. Spelling variants noted in research register.',
    linkedKewModules: [
      { label: 'Air Quality Overview', url: '/environmental-monitoring/air-pollution' }
    ]
  },
  {
    id: 'sci-096',
    name: 'Anju Sida / Sidha',
    honorific: 'Dr.',
    designation: 'Biomedical Waste Management Cell | J&K Pollution Control Committee, Jammu',
    institution: 'J&K Pollution Control Committee (JKPCC), Jammu',
    region: 'Jammu',
    researchCoverage: 'Jammu Division · Jammu City · Healthcare Biomedical Waste, Autoclaving, Disinfection Standards',
    activeWindow: '2025',
    trackType: 'GOVERNMENT_SCIENTIST',
    fields: ['Environmental Chemistry & Pollution'],
    fieldsSummary: 'Biomedical waste management rules, healthcare facility online compliance portal, infectious waste treatment standards',
    editorialTribute: '“Improving understanding of biomedical waste obligations and healthcare pollution controls.”',
    biography: 'Dr. Anju Sida (listed as Anju Sidha in older directory records) was identified as the lead scientific official in charge of JKPCC\'s Biomedical Waste Management Cell during technical regulatory workshops held in Jammu in 2025.',
    keyImpact: 'Regulatory guidance for healthcare institutions on biomedical-waste management.',
    documentedContributions: [
      {
        year: 2025,
        title: 'Healthcare Biomedical Waste Compliance Workshop',
        evidenceTier: 'INSTITUTIONAL PROGRAM RECORD',
        description: 'Explained online application procedure, barcode waste tracking, and statutory compliance mechanisms for healthcare institutions.',
        documentedOutcome: 'Technical regulatory guidance delivered to medical and health care representatives in Jammu.'
      }
    ],
    sourceProvenance: [
      { title: 'Daily Excelsior: Workshop on Biomedical Waste Management Held (Sept 2025)', url: 'https://www.dailyexcelsior.com/workshop-on-biomedical-waste-management-held-2/', publicationType: 'News Media' }
    ],
    researchStatus: 'BIOMEDICAL WASTE CELL LEAD · Documented 2025 workshop role',
    evidenceAuditNotes: 'Surname spelling variant (Sida vs Sidha) flagged for ongoing nominal roll reconciliation.',
    linkedKewModules: [
      { label: 'Biomedical Waste', url: '/about/methodology' }
    ]
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// J&K POLLUTION CONTROL COMMITTEE (JKPCC) & HISTORICAL JKSPCB CADRE
// ─────────────────────────────────────────────────────────────────────────────

export interface JkpccHistoricalStaffMember {
  name: string;
  historicalDesignation: string;
  verificationStatus: string;
  identityAuditSafeguard: string;
}

export const JKPCC_HISTORICAL_CADRE: JkpccHistoricalStaffMember[] = [
  { name: 'Anju Sidha', historicalDesignation: 'Scientist A', verificationStatus: 'Later biomedical waste program role documented', identityAuditSafeguard: 'Spelling reconciled with Dr. Anju Sida in 2025 workshop records' },
  { name: 'Anuradha Gupta', historicalDesignation: 'Scientist A', verificationStatus: '2020 & 2022 outreach documented', identityAuditSafeguard: 'E-waste and dairy waste outreach verified' },
  { name: 'Arshad Mirza', historicalDesignation: 'Scientist A', verificationStatus: 'Historical staff directory', identityAuditSafeguard: 'Appointment dates unconfirmed; pending nominal roll' },
  { name: 'Bashir Wani', historicalDesignation: 'Scientist B', verificationStatus: 'Historical staff directory', identityAuditSafeguard: 'Reconciled with Bashir Ahmad Wani (transferred to DO Kupwara in 2025)' },
  { name: 'Bhawana Devi', historicalDesignation: 'Scientist A', verificationStatus: 'Historical staff directory', identityAuditSafeguard: 'Pending official service book verification' },
  { name: 'Bilqees Era', historicalDesignation: 'In-charge Scientist C', verificationStatus: 'Historical staff directory', identityAuditSafeguard: 'Spelling and exact grade to reconcile' },
  { name: 'Fayaz Ahmad', historicalDesignation: 'Scientist A', verificationStatus: '2023 environmental outreach as Fayaz Ahmad Bhat', identityAuditSafeguard: 'MUST remain separate identity candidate from Fayaz Ahmad Bhat until official nominal roll' },
  { name: 'Gazala Hassan', historicalDesignation: 'Scientist B', verificationStatus: '2020 & 2023 scientific outreach documented', identityAuditSafeguard: 'Also spelled Gazzala Hassan in reporting' },
  { name: 'Irshad Khan', historicalDesignation: 'Scientist A', verificationStatus: 'Historical staff directory', identityAuditSafeguard: 'Pending service book verification' },
  { name: 'M. Sultan Hajam', historicalDesignation: 'Scientist B', verificationStatus: 'Historical staff directory', identityAuditSafeguard: 'Historical laboratory cadre' },
  { name: 'Mukesh Bali', historicalDesignation: 'Scientist A', verificationStatus: 'Historical staff directory', identityAuditSafeguard: 'Directory spells first name "Mukash"' },
  { name: 'Neelu Sharma', historicalDesignation: 'Principal Scientific Officer', verificationStatus: '2022 & 2025 program leadership documented', identityAuditSafeguard: 'Principal Scientific Officer grade confirmed' },
  { name: 'Randeep Singh Manhas', historicalDesignation: 'Scientist A', verificationStatus: '2020 & 2025 technical records', identityAuditSafeguard: 'NGT OA 151/2023 committee signatory' },
  { name: 'Ritu Gupta', historicalDesignation: 'Scientist A', verificationStatus: 'Historical staff directory', identityAuditSafeguard: 'Historical cadre listing' },
  { name: 'Ruksana Parveen', historicalDesignation: 'Senior Scientific Officer', verificationStatus: 'October 2026 official Leh directory', identityAuditSafeguard: 'Active District Officer, Leh (Ladakh PCC)' },
  { name: 'Sabeena Sultan', historicalDesignation: 'Scientist B; later Scientist-C', verificationStatus: '2024 NGT & 2026 air quality', identityAuditSafeguard: 'Scientist-C grade verified June 2026' },
  { name: 'Shabir Ahmad Sheikh', historicalDesignation: 'Scientist A', verificationStatus: '2020 departmental record', identityAuditSafeguard: 'MUST remain separate identity candidate from Shabir Ahmad (Sonamarg 2024)' },
  { name: 'Suman Pawar', historicalDesignation: 'Scientist A', verificationStatus: '2025 NGT compliance filing', identityAuditSafeguard: 'In-charge Air Laboratory Jammu confirmed' },
  { name: 'Sunita Rani', historicalDesignation: 'Scientist A', verificationStatus: 'Historical staff directory', identityAuditSafeguard: 'Historical cadre listing' },
  { name: 'Yash Pal', historicalDesignation: 'Scientist B', verificationStatus: 'Historical staff directory', identityAuditSafeguard: 'Reconciled with Dr. Yash Paul, Head of Laboratories' },
  { name: 'Yousuf Mir', historicalDesignation: 'Scientist A', verificationStatus: 'Historical staff directory', identityAuditSafeguard: 'Historical cadre listing' },
  { name: 'Zahoor Iqbal', historicalDesignation: 'Scientist A', verificationStatus: '2023 outreach as Zahoor Ahmad', identityAuditSafeguard: 'MUST remain separate identity candidate from Zahoor Ahmad until verified' }
];

export interface JkpccRecentActivityRecord {
  scientist: string;
  latestEvidenceYear: string;
  fieldOrAssignment: string;
  sourceContext: string;
}

export const JKPCC_RECENT_SCIENTIFIC_ACTIVITY: JkpccRecentActivityRecord[] = [
  { scientist: 'Dr. Sabeena Sultan', latestEvidenceYear: 'November 2026', fieldOrAssignment: 'Air-quality monitoring stations & Sonamarg wildlife habitat', sourceContext: 'Greater Kashmir Nov 2026 & NGT OA 1046/2024' },
  { scientist: 'Fayaz Ahmed', latestEvidenceYear: '2026', fieldOrAssignment: 'Transport emissions and electric vehicles commentary', sourceContext: 'Independent environmental journalism (full name requires confirmation)' },
  { scientist: 'Ruksana Parveen', latestEvidenceYear: 'October 2026', fieldOrAssignment: 'Senior Scientific Officer, District Officer Leh (Ladakh PCC)', sourceContext: 'Official Leh District Portal Directory' },
  { scientist: 'Neelu Sharma', latestEvidenceYear: 'September 2025', fieldOrAssignment: 'Principal Scientific Officer; biomedical waste regulation', sourceContext: 'Jammu Links News & JKPCC Workshop' },
  { scientist: 'Dr. Anju Sida / Sidha', latestEvidenceYear: 'September 2025', fieldOrAssignment: 'Biomedical Waste Management Cell Lead', sourceContext: 'Daily Excelsior Healthcare Workshop' },
  { scientist: 'Bashir Ahmad Wani', latestEvidenceYear: 'July 2025', fieldOrAssignment: 'Scientist-B; Sukhnag mining review & DO Kupwara', sourceContext: 'NGT OA 1211/2024 Reply Filing' },
  { scientist: 'Randeep Singh Manhas', latestEvidenceYear: 'February 2025', fieldOrAssignment: 'Scientist-A; Poonch environmental compensation', sourceContext: 'NGT EA 07/2025 in OA 151/2023' },
  { scientist: 'Suman Pawar', latestEvidenceYear: '2025', fieldOrAssignment: 'Scientist-A; In-charge Air Laboratory Jammu', sourceContext: 'NGT Compliance Filing in OA 151/2023' },
  { scientist: 'Shabir Ahmad', latestEvidenceYear: 'November 2024', fieldOrAssignment: 'Scientist-A; Sonamarg waste & brown-bear habitat assessment', sourceContext: 'NGT OA 1046/2024 Investigation Report' },
  { scientist: 'Gazala Hassan', latestEvidenceYear: 'September 2023', fieldOrAssignment: 'Scientist-B; ozone protection & vehicular emissions education', sourceContext: 'Kashmir Images World Ozone Day' },
  { scientist: 'Dr. Yash Paul', latestEvidenceYear: 'September 2022', fieldOrAssignment: 'Scientist and Head of Laboratories, Jammu', sourceContext: 'The Kashmir Horizon Clean Air Symposium' },
  { scientist: 'Anuradha Gupta', latestEvidenceYear: '2022', fieldOrAssignment: 'Scientist-A; e-waste and dairy-waste management outreach', sourceContext: 'JKPCC Outreach Records' }
];

export interface JkpccCadreAuditTelemetry {
  historicalNames: number;
  fullDossiersDrafted: number;
  sanctionedScientificPosts: number;
  occupiedScientificPosts2024: number;
  vacancyDeficitPct: number;
  kewApproved: number;
}

export const JKPCC_CADRE_AUDIT_TELEMETRY: JkpccCadreAuditTelemetry = {
  historicalNames: 22,
  fullDossiersDrafted: 11,
  sanctionedScientificPosts: 111,
  occupiedScientificPosts2024: 41,
  vacancyDeficitPct: 63.1,
  kewApproved: 0
};


// ─────────────────────────────────────────────────────────────────────────────
// DIRECTORATE OF ECOLOGY, ENVIRONMENT & REMOTE SENSING (DEERS) ARCHIVE & CADRE
// ─────────────────────────────────────────────────────────────────────────────

export interface DeersCadreMember {
  name: string;
  role: string;
  status: string;
  timeframe: string;
  verificationSource: string;
  sourceUrl?: string;
  focusArea: string;
}

export const DEERS_SCIENTIFIC_CADRE_ROSTER: DeersCadreMember[] = [
  {
    name: 'Afaan Gulzar Mantoo',
    role: 'GIS Team Lead',
    status: 'Historical Alumni Listing',
    timeframe: 'Alumni record; appointment unconfirmed',
    verificationSource: 'University of Kashmir Alumni Directory',
    focusArea: 'Geographic Information Systems & Spatial Analysis'
  },
  {
    name: 'Affreen Bashir',
    role: 'GIS Associate I',
    status: 'Professional Affiliation Listed',
    timeframe: 'Dates unconfirmed',
    verificationSource: 'University of Kashmir Alumni Directory',
    focusArea: 'GIS Mapping & Spatial Cartography'
  },
  {
    name: 'Dr. Bilal Ali Khaki',
    role: 'Senior Research Fellow, Climate Change Centre',
    status: 'Historical Project Scientist',
    timeframe: '2016',
    verificationSource: 'DEERS CO₂ Emission Inventory 2016',
    sourceUrl: 'https://devalt.in/media/com_dalibrary/dalibrary/pdf/nmshe17.pdf',
    focusArea: 'Greenhouse Gas Inventory & Climate Modeling'
  },
  {
    name: 'Dr. Gowhar Meraj',
    role: 'Young Scientist Fellow',
    status: 'Former Fellow / Academic Researcher',
    timeframe: '2020–2023',
    verificationSource: 'ORCID & Routledge Publication Archive',
    sourceUrl: 'https://orcid.org/0000-0003-2913-9199',
    focusArea: 'Hydrology, Ecosystem Services & Land-Use Dynamics'
  },
  {
    name: 'Dr. Humayun Rashid',
    role: 'Scientist-F, former Principal Investigator',
    status: 'Confirmed Former Scientist-F (by 2024); Prof of Practice IUST',
    timeframe: 'Historical to 2024',
    verificationSource: 'J&K SSDI Vision Document & IUST Notification',
    sourceUrl: 'https://jkdeers.jk.gov.in/eersnew/eersnew/orders/The%20Final%20Vision%20Document.pdf',
    focusArea: 'State Spatial Data Infrastructure & Disaster Geoportal'
  },
  {
    name: 'Dr. Irfan Khursheed Shah',
    role: 'Project Scientist-B, Climate Change Centre',
    status: 'Historical Project Scientist; later GDC Pampore',
    timeframe: '2016',
    verificationSource: 'DEERS CO₂ Emission Inventory 2016',
    sourceUrl: 'https://devalt.in/media/com_dalibrary/dalibrary/pdf/nmshe17.pdf',
    focusArea: 'Emissions Modeling & Environmental Education'
  },
  {
    name: 'Ishfaq Ahmad Wani',
    role: 'Junior Research Fellow, Climate Change Centre',
    status: 'Historical Project Researcher',
    timeframe: '2016',
    verificationSource: 'DEERS CO₂ Emission Inventory 2016',
    sourceUrl: 'https://devalt.in/media/com_dalibrary/dalibrary/pdf/nmshe17.pdf',
    focusArea: 'Sectoral Carbon Assessment'
  },
  {
    name: 'Dr. Kuljit Kour',
    role: 'Project Scientist-II, Remote Sensing / NMSHE',
    status: 'Documented Project Scientist',
    timeframe: '2025–2026',
    verificationSource: 'National Institute of Hydrology Roorkee & GDC Thannamandi',
    sourceUrl: 'https://online.nihroorkee.gov.in/trainingcertificates/Cert090720250311.pdf',
    focusArea: 'Hydrological Remote Sensing & Climate Resilience Outreach'
  },
  {
    name: 'Dr. M. Nayeem Shah',
    role: 'Junior Research Fellow, Climate Change Centre',
    status: 'Historical Project Researcher',
    timeframe: '2016',
    verificationSource: 'DEERS CO₂ Emission Inventory 2016',
    sourceUrl: 'https://devalt.in/media/com_dalibrary/dalibrary/pdf/nmshe17.pdf',
    focusArea: 'GHG Emissions Inventory'
  },
  {
    name: 'Dr. Majid Farooq',
    role: 'Scientist, Geospatial and Climate Research',
    status: 'Active DEERS Scientist',
    timeframe: '2014–2026',
    verificationSource: 'Official Scientific Portfolio & Departmental Reports',
    sourceUrl: 'https://majidfarooq.info',
    focusArea: 'Flood Mapping, Carbon Inventories & Climate Vulnerability'
  },
  {
    name: 'Mudabir Mushtaq',
    role: 'Project Assistant, Climate Change Centre',
    status: 'Historical Project Support',
    timeframe: '2016',
    verificationSource: 'DEERS CO₂ Emission Inventory 2016',
    sourceUrl: 'https://devalt.in/media/com_dalibrary/dalibrary/pdf/nmshe17.pdf',
    focusArea: 'Emissions Research Data Support'
  },
  {
    name: 'Dr. Padma Sharma',
    role: 'Project Scientist, NMSHE',
    status: 'Documented Project Scientist',
    timeframe: '2025–2026',
    verificationSource: 'Samba Climate Action Symposium Report',
    sourceUrl: 'https://jkmonitor.org',
    focusArea: 'Climate Action & Public Environmental Education'
  },
  {
    name: 'Dr. Shah Murtaza Mushtaq',
    role: 'Project Scientist-B, Climate Change Centre',
    status: 'Former Project Scientist; subsequently SKUAST-K',
    timeframe: '2016–2026',
    verificationSource: 'DEERS 2016 Report & Frontiers in Plant Science 2026',
    sourceUrl: 'https://devalt.in/media/com_dalibrary/dalibrary/pdf/nmshe17.pdf',
    focusArea: 'Forest Ecosystem Climate Risk & Community Vulnerability'
  },
  {
    name: 'Dr. Tasneem Keng',
    role: 'Scientist-H, Remote Sensing',
    status: 'Historical Senior Scientist',
    timeframe: '2012–2022',
    verificationSource: 'Ramsar 2012 Lake Directory & National Wetlands Committee 2022',
    sourceUrl: 'https://rsis.ramsar.org/RISapp/files/42191262/documents/IN2496_descr220412_1.pdf',
    focusArea: 'Waterbody Mapping & Wetland Conservation Regulatory Coordination'
  },
  {
    name: 'Waseem Rasool',
    role: 'CAMPA Project Associate',
    status: 'Alumni Association Listed',
    timeframe: 'Dates unconfirmed',
    verificationSource: 'University of Kashmir Alumni Directory',
    focusArea: 'Compensatory Afforestation (CAMPA) Monitoring'
  },
  {
    name: 'Dr. Zubair Ahmad Sofi',
    role: 'Geospatial and Cryospheric Researcher',
    status: 'Historical Research Affiliation',
    timeframe: '2021',
    verificationSource: 'DEERS Cryospheric Research Records',
    focusArea: 'Glacier & Snowmelt Geospatial Monitoring'
  }
];

export interface DeersClimateTeamMember {
  name: string;
  role: string;
  documentedWork: string;
  currentNote: string;
}

export const DEERS_CLIMATE_CENTRE_TEAM: DeersClimateTeamMember[] = [
  { name: 'Asif Aziz Marazi', role: 'Senior Research Fellow', documentedWork: 'Sectoral carbon-emissions assessment', currentNote: 'Historical 2016 NMSHE project role' },
  { name: 'Dr. Bilal Ali Khaki', role: 'Senior Research Fellow', documentedWork: 'Climate Change Centre emissions inventory', currentNote: 'Historical 2016 NMSHE project role' },
  { name: 'Dr. Irfan Khursheed Shah', role: 'Project Scientist-B', documentedWork: 'Emissions inventory co-author', currentNote: 'Later documented teaching Environmental Science at GDC Pampore' },
  { name: 'Ishfaq Ahmad Wani', role: 'Junior Research Fellow', documentedWork: 'Emissions inventory modeling', currentNote: 'Historical 2016 NMSHE project role' },
  { name: 'Dr. M. Nayeem Shah', role: 'Junior Research Fellow', documentedWork: 'Emissions inventory fieldwork', currentNote: 'Historical 2016 NMSHE project role' },
  { name: 'Mudabir Mushtaq', role: 'Project Assistant', documentedWork: 'Emissions inventory research support', currentNote: 'Historical 2016 NMSHE project role' }
];

export interface DeersRecentPersonnel {
  name: string;
  role: string;
  evidenceYear: string;
  verificationSource: string;
  sourceUrl: string;
  notes?: string;
}

export const DEERS_RECENT_PERSONNEL: DeersRecentPersonnel[] = [
  { name: 'Dr. Padma Sharma', role: 'NMSHE Project Scientist, climate education', evidenceYear: '2025–2026', verificationSource: 'Samba Climate Action Symposium', sourceUrl: 'https://jkmonitor.org' },
  { name: 'Gurnaam Parsad', role: 'Scientific Assistant, GIS and remote sensing training', evidenceYear: '2025', verificationSource: 'World GIS Day Workshop', sourceUrl: 'https://thekashmirhorizon.com' },
  { name: 'Dr. Rajan Singh', role: 'EIACP J&K Hub Coordinator', evidenceYear: '2025', verificationSource: 'EIACP Program Records', sourceUrl: 'https://jkdeers.jk.gov.in' },
  { name: 'Dr. Kirti Joshi / Dr. Kirti Bhatt', role: 'EIACP Programme Officer', evidenceYear: '2025', verificationSource: 'EIACP Workshop Proceedings', sourceUrl: 'https://thekashmirhorizon.com', notes: 'Surname discrepancy between official reports flagged for audit' },
  { name: 'Nitin Sharma', role: 'IT and GIS Officer', evidenceYear: '2025', verificationSource: 'World GIS Day Event', sourceUrl: 'https://thekashmirhorizon.com' },
  { name: 'Anil Sharma', role: 'DEERS Range Officer', evidenceYear: '2025', verificationSource: 'World GIS Day Proceedings', sourceUrl: 'https://thekashmirhorizon.com' }
];

export interface DeersLeadershipRecord {
  name: string;
  role: string;
  timeframe: string;
  provenance: string;
  sourceUrl?: string;
  historicalSignificance: string;
}

export const DEERS_HISTORICAL_DIRECTORS: DeersLeadershipRecord[] = [
  {
    name: 'B. Siddhartha Kumar',
    role: 'Former PCCF / Director, DEERS',
    timeframe: 'Historical directorship',
    provenance: '2019 State Spatial Data Infrastructure Vision Document',
    sourceUrl: 'https://jkdeers.jk.gov.in',
    historicalSignificance: 'Pioneered early integration of remote sensing with state forest administration.'
  },
  {
    name: 'O. P. Sharma (Vidhyarthi)',
    role: 'Former Director, DEERS',
    timeframe: 'Historical directorship',
    provenance: 'Departmental records & Vriksha Mitra environmental literature',
    sourceUrl: 'https://jkdeers.jk.gov.in',
    historicalSignificance: 'Combined administrative leadership with grassroots ethnobotanical documentation.'
  },
  {
    name: 'Rakesh Kumar, IFS',
    role: 'Director, DEERS',
    timeframe: '2022–2025',
    provenance: 'Departmental administrative gazette',
    sourceUrl: 'https://jkdeers.jk.gov.in',
    historicalSignificance: 'Directed institutional modernization and EIACP environmental hub expansion.'
  },
  {
    name: 'Ravi Kumar Kesar, IFS',
    role: 'Former Director, Department of Environment and Remote Sensing',
    timeframe: 'Historical directorship',
    provenance: 'Departmental publications & state environmental policy records',
    sourceUrl: 'https://jkdeers.jk.gov.in',
    historicalSignificance: 'Oversaw state-wide environmental monitoring and wetland baseline programs.'
  },
  {
    name: 'Suresh Chugh, IFS',
    role: 'Former Director, DEERS / Former PCCF',
    timeframe: 'Historical directorship',
    provenance: '2019 State Spatial Data Infrastructure Vision Document',
    sourceUrl: 'https://jkdeers.jk.gov.in',
    historicalSignificance: 'Championed the 2019 State Spatial Data Infrastructure and Geoportal vision.'
  },
  {
    name: 'Maraj-ud-Din Malik',
    role: 'Regional Director, Ecology and Remote Sensing, Kashmir',
    timeframe: 'Appointed June 2026',
    provenance: 'Official Government Order & news media reports',
    sourceUrl: 'https://gulistannewstv.com',
    historicalSignificance: 'Appointed to oversee Kashmir division ecological monitoring.'
  },
  {
    name: 'Rafi Ahmed Bhat',
    role: 'Former Regional DEERS Officer',
    timeframe: 'Transferred June 2026',
    provenance: 'Departmental administrative order',
    sourceUrl: 'https://gulistannewstv.com',
    historicalSignificance: 'Served in regional environmental enforcement before reassignment to Forest Protection Force.'
  }
];

export interface DeersFoundationalDocument {
  title: string;
  year: number;
  officialCategory: string;
  leadInvestigators: string[];
  keyFindings: string;
  seiaeRelevance: string;
  sourceUrl: string;
  documentType: string;
}

export const DEERS_FOUNDATIONAL_DOCUMENTS: DeersFoundationalDocument[] = [
  {
    title: 'Directory of Lakes and Waterbodies of J&K State',
    year: 2012,
    officialCategory: 'Official Departmental Research Report',
    leadInvestigators: ['Dr. Hanifa Nasim (PI)', 'Dr. Tasneem Keng (Co-Inv)'],
    keyFindings: 'Documented 150 water bodies in Jammu, 415 in Kashmir, and 665 in Ladakh using remote sensing, GIS and field validation.',
    seiaeRelevance: 'Statutory historical baseline for identifying wetland encroachment, shrinkage and changes in lake surface water extent across 30 years.',
    sourceUrl: 'https://rsis.ramsar.org/RISapp/files/42191262/documents/IN2496_descr220412_1.pdf',
    documentType: 'PDF Document / Ramsar Preservation'
  },
  {
    title: 'Emission Inventory of CO₂ in Jammu and Kashmir',
    year: 2016,
    officialCategory: 'State Climate Change Centre Official Publication',
    leadInvestigators: ['Dr. Majid Farooq (Coordinator & PI)', 'Dr. Shah Murtaza Mushtaq', 'Climate Change Centre Team'],
    keyFindings: 'Sectoral greenhouse gas assessment (energy, industrial processes, agriculture, waste) under the National Mission for Sustaining the Himalayan Ecosystem (NMSHE).',
    seiaeRelevance: 'Authoritative state carbon emissions baseline essential for assessing industrial and infrastructure project impacts under SEIAE.',
    sourceUrl: 'https://devalt.in/media/com_dalibrary/dalibrary/pdf/nmshe17.pdf',
    documentType: 'PDF Document / NMSHE Repository'
  },
  {
    title: 'State Spatial Data Infrastructure (SSDI) Vision Document',
    year: 2019,
    officialCategory: 'Official Departmental Scientific Document',
    leadInvestigators: ['Dr. Humayun Rashid (Lead Author / Scientist-F)'],
    keyFindings: 'Established the technical architecture, spatial data standards, metadata specifications, and inter-departmental Geoportal framework for Jammu and Kashmir.',
    seiaeRelevance: 'Foundation for spatial data interoperability, GIS layer auditing, and scientific verification across all KEW environmental dockets.',
    sourceUrl: 'https://jkdeers.jk.gov.in/eersnew/eersnew/orders/The%20Final%20Vision%20Document.pdf',
    documentType: 'PDF Document / Official Government Portal'
  }
];

export const DEERS_TECHNICAL_CONTRIBUTORS: string[] = [
  'Sajad Hamid',
  'Manzoor Ahmad',
  'Asim Gulzar',
  'Muzaffar Ahmad Mala',
  'Nissar Ahmad',
  'Ravinder Kumar Bhat',
  'Zahoor Ahmad Akhoon',
  'Ghulam Hassan Mir',
  'Akhtar Ali',
  'Shama Roohi'
];

