/**
 * Kashmir EcoWatch: Unified Participation & Operations Management System
 * Core Data Contract, Types, and Operations Registry
 */

export type ManagementCenter = 
  | 'EVENTS'            // Events & Conferences (Webinars, 104-event program)
  | 'PARTNERSHIPS'      // Support, Sponsorship, CSR & Grants
  | 'COMMUNICATIONS'    // Communications & Contact Ticket Queue (<24h SLA)
  | 'SCIENTIFIC_INTAKE' // Scientific Evidence & Environmental Incidents
  | 'COMMUNITY_NETWORK';// Member, Volunteer & Research Network

export type PublicSourcePage =
  | '/webinars'
  | '/about/support-sponsorship'
  | '/about/csr-collaborations'
  | '/about/contact'
  | '/submit-observation'
  | '/report-issue'
  | '/share-data'
  | '/join-citizen-science'
  | '/become-data-contributor'
  | '/become-research-partner'
  | '/get-involved/volunteer';

export type SubmissionPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export type OperationStatus = 
  | 'PENDING'
  | 'IN_REVIEW'
  | 'INFO_REQUESTED'
  | 'APPROVED'
  | 'REFERRED'
  | 'REJECTED'
  | 'RESOLVED';

export interface TimelineEvent {
  timestamp: string;
  actor: string;
  action: string;
  note?: string;
}

export interface OperationRecord {
  id: string;
  trackingId: string;
  sourcePage: PublicSourcePage;
  sourcePageLabel: string;
  managementCenter: ManagementCenter;
  managementCenterLabel: string;
  userDashboardSection: string;
  title: string;
  category: string;
  priority: SubmissionPriority;
  status: OperationStatus;
  ownerName: string;
  ownerEmail: string;
  organization?: string;
  district?: string;
  details: string;
  assignedTo?: string;
  slaDeadline?: string;
  isEscalated?: boolean;
  timeline: TimelineEvent[];
  createdAt: string;
  updatedAt: string;
}

export const SOURCE_PAGE_MAP: Record<PublicSourcePage, {
  prefix: string;
  managementCenter: ManagementCenter;
  managementCenterLabel: string;
  label: string;
  userDashboardSection: string;
}> = {
  '/webinars': {
    prefix: 'KEW-EVT',
    managementCenter: 'EVENTS',
    managementCenterLabel: 'Events & Conferences',
    label: 'Webinars & Conferences',
    userDashboardSection: 'My Events',
  },
  '/about/support-sponsorship': {
    prefix: 'KEW-SUP',
    managementCenter: 'PARTNERSHIPS',
    managementCenterLabel: 'Support & Sponsorship',
    label: 'Support KEW',
    userDashboardSection: 'My Support Inquiries',
  },
  '/about/csr-collaborations': {
    prefix: 'KEW-CSR',
    managementCenter: 'PARTNERSHIPS',
    managementCenterLabel: 'Funding & Partnerships',
    label: 'CSR & Grants',
    userDashboardSection: 'My Grant/CSR Proposals',
  },
  '/about/contact': {
    prefix: 'KEW-CON',
    managementCenter: 'COMMUNICATIONS',
    managementCenterLabel: 'Communications Center',
    label: 'Contact & Inquiries',
    userDashboardSection: 'My Correspondence',
  },
  '/submit-observation': {
    prefix: 'KEW-OBS',
    managementCenter: 'SCIENTIFIC_INTAKE',
    managementCenterLabel: 'Scientific Evidence Review',
    label: 'Submit Observation',
    userDashboardSection: 'My Observations',
  },
  '/report-issue': {
    prefix: 'KEW-INC',
    managementCenter: 'SCIENTIFIC_INTAKE',
    managementCenterLabel: 'Environmental Incident Center',
    label: 'Report Environmental Issue',
    userDashboardSection: 'My Issue Reports',
  },
  '/share-data': {
    prefix: 'KEW-DAT',
    managementCenter: 'SCIENTIFIC_INTAKE',
    managementCenterLabel: 'Data Intake & Validation',
    label: 'Share Environmental Data',
    userDashboardSection: 'My Datasets',
  },
  '/join-citizen-science': {
    prefix: 'KEW-PRG',
    managementCenter: 'COMMUNITY_NETWORK',
    managementCenterLabel: 'Citizen Science Programs',
    label: 'Join Citizen Science',
    userDashboardSection: 'My Programs',
  },
  '/become-data-contributor': {
    prefix: 'KEW-ACR',
    managementCenter: 'COMMUNITY_NETWORK',
    managementCenterLabel: 'Contributor Accreditation',
    label: 'Become a Data Contributor',
    userDashboardSection: 'My Data Partnership',
  },
  '/become-research-partner': {
    prefix: 'KEW-PAR',
    managementCenter: 'COMMUNITY_NETWORK',
    managementCenterLabel: 'Institutional Partnerships',
    label: 'Become a Research Partner',
    userDashboardSection: 'My Research Partnerships',
  },
  '/get-involved/volunteer': {
    prefix: 'KEW-VOL',
    managementCenter: 'COMMUNITY_NETWORK',
    managementCenterLabel: 'Volunteer Coordination',
    label: 'Volunteer & Contribute',
    userDashboardSection: 'My Assignments',
  },
};

export function generateTrackingId(sourcePage: PublicSourcePage): string {
  const meta = SOURCE_PAGE_MAP[sourcePage] || { prefix: 'KEW-GEN' };
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const year = new Date().getFullYear();
  return `${meta.prefix}-${year}-${randomNum}`;
}

export const INITIAL_OPERATIONS_RECORDS: OperationRecord[] = [
  {
    id: 'op-001',
    trackingId: 'KEW-OBS-2026-1041',
    sourcePage: '/submit-observation',
    sourcePageLabel: 'Submit Observation',
    managementCenter: 'SCIENTIFIC_INTAKE',
    managementCenterLabel: 'Scientific Evidence Review',
    userDashboardSection: 'My Observations',
    title: 'Hangul Winter Stags Census Observation (Upper Dachigam)',
    category: 'Wildlife Census',
    priority: 'HIGH',
    status: 'IN_REVIEW',
    ownerName: 'Dr. Bilal Lone',
    ownerEmail: 'bilal.wildlife@skuast.edu.in',
    organization: 'SKUAST-K Wildlife Sciences',
    district: 'Srinagar',
    details: 'Photographed herd of 9 Cervus hanglu hanglu at 2,450m elevation. Includes raw GPS EXIF telemetry.',
    assignedTo: 'Scientific Review Board (Dr. Khursheed)',
    slaDeadline: '48 Hours',
    timeline: [
      { timestamp: '2026-11-10 09:14 UTC', actor: 'Dr. Bilal Lone', action: 'Submission Logged via Web Intake' },
      { timestamp: '2026-11-10 11:30 UTC', actor: 'Automated Ingest Engine', action: 'Spatial Coordinate & EXIF Bounding Verified' },
      { timestamp: '2026-11-11 08:00 UTC', actor: 'Triage Lead', action: 'Assigned to Dr. Khursheed (SKUAST-K Reviewer)' },
    ],
    createdAt: '2026-11-10T09:14:00Z',
    updatedAt: '2026-11-11T08:00:00Z',
  },
  {
    id: 'op-002',
    trackingId: 'KEW-INC-2026-9022',
    sourcePage: '/report-issue',
    sourcePageLabel: 'Report Environmental Issue',
    managementCenter: 'SCIENTIFIC_INTAKE',
    managementCenterLabel: 'Environmental Incident Center',
    userDashboardSection: 'My Issue Reports',
    title: 'Untreated Industrial Chemical Effluent in Doodh Ganga (Chattergam)',
    category: 'Hazard Incident',
    priority: 'CRITICAL',
    status: 'REFERRED',
    ownerName: 'Tariq H. Bhat',
    ownerEmail: 'tariq.chattergam@gmail.com',
    district: 'Budgam',
    details: 'Sudden dark foamy discharge with severe odor killing benthic invertebrates. Coordinates: 34.0041, 74.8122.',
    assignedTo: 'Environmental Incident Coordinator (Ranger Mir)',
    isEscalated: true,
    slaDeadline: 'IMMEDIATE (4 Hours)',
    timeline: [
      { timestamp: '2026-11-11 04:30 UTC', actor: 'Tariq H. Bhat', action: 'Incident Lodged via Community Alert' },
      { timestamp: '2026-11-11 04:35 UTC', actor: 'Automated Sentinel', action: 'CRITICAL Tag Applied. Notification Pushed to JKPCC Liaison.' },
      { timestamp: '2026-11-11 06:15 UTC', actor: 'Incident Coordinator', action: 'Field Inspection Dispatched & Formal Referral Issued to JKPCC' },
    ],
    createdAt: '2026-11-11T04:30:00Z',
    updatedAt: '2026-11-11T06:15:00Z',
  },
  {
    id: 'op-003',
    trackingId: 'KEW-DAT-2026-3318',
    sourcePage: '/share-data',
    sourcePageLabel: 'Share Environmental Data',
    managementCenter: 'SCIENTIFIC_INTAKE',
    managementCenterLabel: 'Data Intake & Validation',
    userDashboardSection: 'My Datasets',
    title: 'Kolahoi Glacier Velocity & Ice Thickness Dataset (2020-2025)',
    category: 'Cryosphere Dataset',
    priority: 'HIGH',
    status: 'IN_REVIEW',
    ownerName: 'Prof. Reyaz Dar',
    ownerEmail: 'reyaz.dar@kashmiruniversity.ac.in',
    organization: 'Department of Earth Sciences, KU',
    district: 'Anantnag',
    details: 'NetCDF and GeoTIFF format datasets with DInSAR deformation interferograms and in-situ GPR surveys.',
    assignedTo: 'GIS & Spatial Administrator (Er. Raina)',
    slaDeadline: '5 Business Days',
    timeline: [
      { timestamp: '2026-11-09 14:00 UTC', actor: 'Prof. Reyaz Dar', action: 'Dataset Upload Completed (1.4 GB GeoTIFF/NetCDF)' },
      { timestamp: '2026-11-10 10:20 UTC', actor: 'Automated PostGIS Ingestion', action: 'Spatial Extent & CRS EPSG:4326 Conformance Passed' },
    ],
    createdAt: '2026-11-09T14:00:00Z',
    updatedAt: '2026-11-10T10:20:00Z',
  },
  {
    id: 'op-004',
    trackingId: 'KEW-PAR-2026-4402',
    sourcePage: '/become-research-partner',
    sourcePageLabel: 'Become a Research Partner',
    managementCenter: 'COMMUNITY_NETWORK',
    managementCenterLabel: 'Institutional Partnerships',
    userDashboardSection: 'My Research Partnerships',
    title: 'Joint Hydrological Basin Sensor Network MoU (WISA & KU)',
    category: 'University MoU',
    priority: 'MEDIUM',
    status: 'IN_REVIEW',
    ownerName: 'Dr. Shabnum Parveen',
    ownerEmail: 'sparveen@wisa-research.org',
    organization: 'Wetlands International South Asia',
    district: 'Srinagar',
    details: 'Formal research collaboration proposal to co-fund 12 real-time dissolved oxygen and nitrate IoT telemetry nodes.',
    assignedTo: 'Scientific Director (Dr. F. Wani)',
    slaDeadline: '7 Business Days',
    timeline: [
      { timestamp: '2026-11-08 16:45 UTC', actor: 'Dr. Shabnum Parveen', action: 'Institutional Application & Draft MoU Submitted' },
      { timestamp: '2026-11-09 11:00 UTC', actor: 'Partnership Liaison', action: 'Initial Compliance & Non-Profit Credential Check Verified' },
    ],
    createdAt: '2026-11-08T16:45:00Z',
    updatedAt: '2026-11-09T11:00:00Z',
  },
  {
    id: 'op-005',
    trackingId: 'KEW-EVT-2026-5519',
    sourcePage: '/webinars',
    sourcePageLabel: 'Webinars & Conferences',
    managementCenter: 'EVENTS',
    managementCenterLabel: 'Events & Conferences',
    userDashboardSection: 'My Events',
    title: 'Keynote Speaker Proposal: Cryosphere Dynamics & GLOF Prevention',
    category: 'Conference Track Keynote',
    priority: 'MEDIUM',
    status: 'APPROVED',
    ownerName: 'Dr. Andrea Fischer',
    ownerEmail: 'andrea.fischer@uibk.ac.at',
    organization: 'Austrian Academy of Sciences (ÖAW)',
    district: 'International',
    details: 'Accepted keynote presentation for Day 1 Plenary of Himalayan Cryosphere Conference 2027.',
    assignedTo: 'Event Secretariat',
    slaDeadline: 'Completed',
    timeline: [
      { timestamp: '2026-11-05 10:00 UTC', actor: 'Dr. Andrea Fischer', action: 'Keynote Proposal & Extended Abstract Lodged' },
      { timestamp: '2026-11-07 14:30 UTC', actor: 'Scientific Secretariat', action: 'Peer Review Passed. Speaker Slot Assigned to Session CRYO-D1.' },
    ],
    createdAt: '2026-11-05T10:00:00Z',
    updatedAt: '2026-11-07T14:30:00Z',
  },
  {
    id: 'op-006',
    trackingId: 'KEW-CON-2026-6621',
    sourcePage: '/about/contact',
    sourcePageLabel: 'Contact & Inquiries',
    managementCenter: 'COMMUNICATIONS',
    managementCenterLabel: 'Communications Center',
    userDashboardSection: 'My Correspondence',
    title: 'Technical Inquiry: API Access for High School Weather Station Network',
    category: 'Technical / API',
    priority: 'LOW',
    status: 'RESOLVED',
    ownerName: 'Sameer Qazi',
    ownerEmail: 'sqazi@burnhall.edu.in',
    organization: 'Burn Hall Higher Secondary School',
    district: 'Srinagar',
    details: 'Requesting OpenAPI specification and token for students participating in temperature and rainfall telemetry.',
    assignedTo: 'Technical Liaison',
    slaDeadline: '< 24 Hours SLA (Met in 6h)',
    timeline: [
      { timestamp: '2026-11-10 13:20 UTC', actor: 'Sameer Qazi', action: 'Ticket Generated via Contact Form' },
      { timestamp: '2026-11-10 19:40 UTC', actor: 'Technical Support', action: 'API Credentials and Sandbox Token Dispatched via Email' },
    ],
    createdAt: '2026-11-10T13:20:00Z',
    updatedAt: '2026-11-10T19:40:00Z',
  },
  {
    id: 'op-006b',
    trackingId: 'KEW-CON-2026-8910',
    sourcePage: '/about/contact',
    sourcePageLabel: 'Contact & Inquiries',
    managementCenter: 'COMMUNICATIONS',
    managementCenterLabel: 'Communications Center',
    userDashboardSection: 'My Correspondence',
    title: 'Press Inquiry: High-Altitude Cryosphere Recession Data Verification',
    category: 'Media / Press',
    priority: 'MEDIUM',
    status: 'OPEN',
    ownerName: 'Zehra Latif',
    ownerEmail: 'zehra.latif@kashmirfront.org',
    organization: 'Himalayan Environmental Journalism Fellowship',
    district: 'Srinagar',
    details: 'Requesting official quotation and high-resolution InSAR basin loss maps for an upcoming investigative feature on Kolahoi glacial recession rates.',
    assignedTo: 'Media Secretariat',
    slaDeadline: '< 24 Hours SLA (14h Remaining)',
    timeline: [
      { timestamp: '2026-11-11 08:30 UTC', actor: 'Zehra Latif', action: 'Inquiry Submitted via Public Contact Desk' },
      { timestamp: '2026-11-11 08:31 UTC', actor: 'System Gate', action: 'Assigned Tracking ID KEW-CON-2026-8910; 24h SLA Countdown Started' }
    ],
    createdAt: '2026-11-11T08:30:00Z',
    updatedAt: '2026-11-11T08:31:00Z',
  },
  {
    id: 'op-006c',
    trackingId: 'KEW-CON-2026-4412',
    sourcePage: '/about/contact',
    sourcePageLabel: 'Contact & Inquiries',
    managementCenter: 'COMMUNICATIONS',
    managementCenterLabel: 'Communications Center',
    userDashboardSection: 'My Correspondence',
    title: 'Institutional Consultation: Wular Lake Siltation Assessment Methodology',
    category: 'Institutional Inquiry',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    ownerName: 'Dr. Mushtaq Dar',
    ownerEmail: 'mushtaq.dar@iust.ac.in',
    organization: 'Islamic University of Science & Technology (IUST)',
    district: 'Pulwama',
    details: 'Seeking collaborative validation of sonar depth readings along Wular wetland perimeter against Kashmir EcoWatch Sentinel-2 turbidity indexing.',
    assignedTo: 'Hydrology Liaison',
    slaDeadline: '< 24 Hours SLA (6h Remaining)',
    timeline: [
      { timestamp: '2026-11-11 02:15 UTC', actor: 'Dr. Mushtaq Dar', action: 'Consultation Request Lodged via Official Channel' },
      { timestamp: '2026-11-11 05:40 UTC', actor: 'Secretariat Admin', action: 'Assigned to Hydrology Liaison; Preliminary Data Package Assembled' }
    ],
    createdAt: '2026-11-11T02:15:00Z',
    updatedAt: '2026-11-11T05:40:00Z',
  },
  {
    id: 'op-007',
    trackingId: 'KEW-CSR-2026-7734',
    sourcePage: '/about/csr-collaborations',
    sourcePageLabel: 'CSR & Grants',
    managementCenter: 'PARTNERSHIPS',
    managementCenterLabel: 'Funding & Partnerships',
    userDashboardSection: 'My Grant/CSR Proposals',
    title: 'Himalayan Springhead Restoration CSR Grant ($45,000)',
    category: 'CSR Environmental Grant',
    priority: 'HIGH',
    status: 'IN_REVIEW',
    ownerName: 'Priya Sundaram',
    ownerEmail: 'priya.s@greenhimalaya-foundation.org',
    organization: 'Green Himalaya Trust',
    district: 'Baramulla',
    details: 'Multi-year proposal for bio-engineering rejuvenation of 14 degraded freshwater springs in Tangmarg and Gulmarg.',
    assignedTo: 'Grants & CSR Officer',
    slaDeadline: '10 Business Days',
    timeline: [
      { timestamp: '2026-11-06 11:15 UTC', actor: 'Priya Sundaram', action: 'CSR Proposal Dossier Lodged' },
      { timestamp: '2026-11-08 09:30 UTC', actor: 'Compliance Officer', action: 'Section 135 Legal Recipient Verification Completed' },
    ],
    createdAt: '2026-11-06T11:15:00Z',
    updatedAt: '2026-11-08T09:30:00Z',
  },
  {
    id: 'op-008',
    trackingId: 'KEW-VOL-2026-8845',
    sourcePage: '/get-involved/volunteer',
    sourcePageLabel: 'Volunteer & Contribute',
    managementCenter: 'COMMUNITY_NETWORK',
    managementCenterLabel: 'Volunteer Coordination',
    userDashboardSection: 'My Assignments',
    title: 'Wetland Field Ranger & Kashmiri Language Translation Volunteer',
    category: 'Field & Outreach Volunteer',
    priority: 'MEDIUM',
    status: 'APPROVED',
    ownerName: 'Muntaha Jan',
    ownerEmail: 'muntaha.jan@gmail.com',
    district: 'Bandipora',
    details: 'Wullar Lake riparian community organizer and native Kashmiri translator. Available weekends for water sampling.',
    assignedTo: 'Volunteer Coordinator',
    slaDeadline: 'Completed',
    timeline: [
      { timestamp: '2026-11-07 15:10 UTC', actor: 'Muntaha Jan', action: 'Volunteer Registration Form Completed' },
      { timestamp: '2026-11-09 12:00 UTC', actor: 'Volunteer Lead', action: 'Onboarding Pack Sent. Assigned to Wullar North Sector.' },
    ],
    createdAt: '2026-11-07T15:10:00Z',
    updatedAt: '2026-11-09T12:00:00Z',
  },
];
