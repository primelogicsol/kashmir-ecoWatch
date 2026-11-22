/**
 * Kashmir EcoWatch - Wildlife Emergency & Rescue Directory (KEW-HWC)
 * District-level wildlife assistance and emergency response directory across five Western Himalayan regions:
 * 1. Kashmir Valley (10 districts)
 * 2. Jammu (10 districts)
 * 3. Ladakh (2 districts)
 * 4. Azad Jammu & Kashmir (10 districts)
 * 5. Gilgit-Baltistan (10 districts)
 *
 * Grounded in published official references:
 * - J&K Department of Wildlife Protection (jkwildlife.com)
 * - District Administration Leh & Kargil Wildlife Departments (leh.nic.in / kargil.nic.in)
 * - AJK Forestry, Wildlife & Fisheries Department (forest.ajk.gov.pk)
 * - Gilgit-Baltistan Forest, Wildlife & Environment Department (fwegb.gov.pk)
 */

export type KewRegion = 
  | 'Kashmir Valley' 
  | 'Jammu' 
  | 'Ladakh' 
  | 'Azad Jammu and Kashmir' 
  | 'Gilgit-Baltistan';

export type ContactVerificationStatus = 
  | 'Officially Published'
  | 'Recently Confirmed'
  | 'Verification Pending'
  | 'Outdated'
  | 'Unavailable'
  | 'Retired';

export type WildlifeServiceCategory = 
  | 'Wildlife Emergency Control Room'
  | 'Wildlife Division / Warden Office'
  | 'Wildlife Rescue Centre'
  | 'General Emergency Helpline'
  | 'Administrative Enquiry';

export interface DistrictEntry {
  districtName: string;
  region: KewRegion;
  headquarters: string;
  hasDirectContact: boolean;
  divisionJurisdiction: string;
  alternateNames?: string[];
}

export interface WildlifeEmergencyContact {
  id: string;
  region: KewRegion;
  district: string;
  coveredDistricts: string[];
  officeName: string;
  authorityDepartment: string;
  serviceCategory: WildlifeServiceCategory;
  primaryPhoneNumber: string;
  formattedDisplayNumber: string;
  e164PhoneNumber: string;
  alternatePhone?: string;
  tollFreeHelpline?: string;
  physicalLocation: string;
  operatingHours: string;
  is24x7Verified: boolean;
  verificationStatus: ContactVerificationStatus;
  lastDirectVerificationDate: string;
  sourcePublicationDate: string;
  officialSourceUrl: string;
  sourceDocumentTitle: string;
  operationalNotes: string;
  fallbackRegionalContactId?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPLETE 42-DISTRICT ADMINISTRATIVE REGISTRY
// ─────────────────────────────────────────────────────────────────────────────

export const OFFICIAL_DISTRICTS: DistrictEntry[] = [
  // Kashmir Valley (10)
  { districtName: 'Srinagar', region: 'Kashmir Valley', headquarters: 'Srinagar', hasDirectContact: true, divisionJurisdiction: 'Central Wildlife Division' },
  { districtName: 'Budgam', region: 'Kashmir Valley', headquarters: 'Budgam', hasDirectContact: true, divisionJurisdiction: 'Central Wildlife Division' },
  { districtName: 'Ganderbal', region: 'Kashmir Valley', headquarters: 'Ganderbal', hasDirectContact: true, divisionJurisdiction: 'Central Wildlife Division' },
  { districtName: 'Anantnag', region: 'Kashmir Valley', headquarters: 'Anantnag (Islamabad)', hasDirectContact: true, divisionJurisdiction: 'South Wildlife Division' },
  { districtName: 'Pulwama', region: 'Kashmir Valley', headquarters: 'Pulwama', hasDirectContact: true, divisionJurisdiction: 'South Wildlife Division' },
  { districtName: 'Shopian', region: 'Kashmir Valley', headquarters: 'Shopian', hasDirectContact: true, divisionJurisdiction: 'South Wildlife Division / Shopian Warden' },
  { districtName: 'Kulgam', region: 'Kashmir Valley', headquarters: 'Kulgam', hasDirectContact: true, divisionJurisdiction: 'South Wildlife Division' },
  { districtName: 'Baramulla', region: 'Kashmir Valley', headquarters: 'Baramulla', hasDirectContact: true, divisionJurisdiction: 'North Wildlife Division' },
  { districtName: 'Bandipora', region: 'Kashmir Valley', headquarters: 'Bandipora', hasDirectContact: true, divisionJurisdiction: 'North Wildlife Division / Wular Division' },
  { districtName: 'Kupwara', region: 'Kashmir Valley', headquarters: 'Kupwara', hasDirectContact: true, divisionJurisdiction: 'North Wildlife Division / Handwara Outpost' },

  // Jammu (10)
  { districtName: 'Jammu', region: 'Jammu', headquarters: 'Jammu', hasDirectContact: true, divisionJurisdiction: 'Jammu Wildlife Division' },
  { districtName: 'Samba', region: 'Jammu', headquarters: 'Samba', hasDirectContact: false, divisionJurisdiction: 'Jammu Wildlife Division (Fallback)' },
  { districtName: 'Kathua', region: 'Jammu', headquarters: 'Kathua', hasDirectContact: true, divisionJurisdiction: 'Kathua Wildlife Division / Jasrota' },
  { districtName: 'Udhampur', region: 'Jammu', headquarters: 'Udhampur', hasDirectContact: true, divisionJurisdiction: 'Udhampur Wildlife Range' },
  { districtName: 'Reasi', region: 'Jammu', headquarters: 'Reasi', hasDirectContact: false, divisionJurisdiction: 'Udhampur / Jammu Division (Fallback)' },
  { districtName: 'Rajouri', region: 'Jammu', headquarters: 'Rajouri', hasDirectContact: true, divisionJurisdiction: 'Poonch-Rajouri Wildlife Division' },
  { districtName: 'Poonch', region: 'Jammu', headquarters: 'Poonch', hasDirectContact: true, divisionJurisdiction: 'Poonch-Rajouri Wildlife Division' },
  { districtName: 'Doda', region: 'Jammu', headquarters: 'Doda', hasDirectContact: false, divisionJurisdiction: 'Kishtwar Wildlife Division (Fallback)' },
  { districtName: 'Ramban', region: 'Jammu', headquarters: 'Ramban', hasDirectContact: false, divisionJurisdiction: 'Udhampur Wildlife Division (Fallback)' },
  { districtName: 'Kishtwar', region: 'Jammu', headquarters: 'Kishtwar', hasDirectContact: true, divisionJurisdiction: 'Kishtwar High Altitude Wildlife Division' },

  // Ladakh (2)
  { districtName: 'Leh', region: 'Ladakh', headquarters: 'Leh', hasDirectContact: true, divisionJurisdiction: 'Department of Wildlife Protection Leh' },
  { districtName: 'Kargil', region: 'Ladakh', headquarters: 'Kargil', hasDirectContact: true, divisionJurisdiction: 'Department of Wildlife Protection Kargil' },

  // Azad Jammu & Kashmir (10)
  { districtName: 'Muzaffarabad', region: 'Azad Jammu and Kashmir', headquarters: 'Muzaffarabad', hasDirectContact: true, divisionJurisdiction: 'AJK Forestry, Wildlife & Fisheries Dept' },
  { districtName: 'Neelum', region: 'Azad Jammu and Kashmir', headquarters: 'Athmuqam', hasDirectContact: true, divisionJurisdiction: 'Machiara & Neelum Wildlife Division' },
  { districtName: 'Jhelum Valley', region: 'Azad Jammu and Kashmir', headquarters: 'Hattian Bala', hasDirectContact: false, divisionJurisdiction: 'Muzaffarabad HQ (Fallback)', alternateNames: ['Hattian Bala'] },
  { districtName: 'Bagh', region: 'Azad Jammu and Kashmir', headquarters: 'Bagh', hasDirectContact: false, divisionJurisdiction: 'Poonch / Rawalakot Division (Fallback)' },
  { districtName: 'Haveli', region: 'Azad Jammu and Kashmir', headquarters: 'Forward Kahuta', hasDirectContact: false, divisionJurisdiction: 'Bagh / Rawalakot Division (Fallback)', alternateNames: ['Forward Kahuta'] },
  { districtName: 'Poonch (AJK)', region: 'Azad Jammu and Kashmir', headquarters: 'Rawalakot', hasDirectContact: true, divisionJurisdiction: 'Rawalakot Wildlife Range', alternateNames: ['Rawalakot'] },
  { districtName: 'Sudhanoti', region: 'Azad Jammu and Kashmir', headquarters: 'Pallandri', hasDirectContact: false, divisionJurisdiction: 'Rawalakot HQ (Fallback)', alternateNames: ['Pallandri'] },
  { districtName: 'Kotli', region: 'Azad Jammu and Kashmir', headquarters: 'Kotli', hasDirectContact: true, divisionJurisdiction: 'Kotli Wildlife Range' },
  { districtName: 'Mirpur', region: 'Azad Jammu and Kashmir', headquarters: 'Mirpur', hasDirectContact: true, divisionJurisdiction: 'Mirpur Wildlife & Mangla Range' },
  { districtName: 'Bhimber', region: 'Azad Jammu and Kashmir', headquarters: 'Bhimber', hasDirectContact: false, divisionJurisdiction: 'Mirpur Wildlife Division (Fallback)' },

  // Gilgit-Baltistan (10)
  { districtName: 'Gilgit', region: 'Gilgit-Baltistan', headquarters: 'Gilgit', hasDirectContact: true, divisionJurisdiction: 'Gilgit Forest, Wildlife & Environment Dept' },
  { districtName: 'Hunza', region: 'Gilgit-Baltistan', headquarters: 'Karimabad / Aliabad', hasDirectContact: true, divisionJurisdiction: 'Khunjerab National Park Directorate' },
  { districtName: 'Nagar', region: 'Gilgit-Baltistan', headquarters: 'Nagarkhas', hasDirectContact: false, divisionJurisdiction: 'Hunza / Gilgit Range (Fallback)' },
  { districtName: 'Ghizer', region: 'Gilgit-Baltistan', headquarters: 'Gakuch', hasDirectContact: true, divisionJurisdiction: 'Ghizer Wildlife Range' },
  { districtName: 'Skardu', region: 'Gilgit-Baltistan', headquarters: 'Skardu', hasDirectContact: true, divisionJurisdiction: 'Baltistan Wildlife Division' },
  { districtName: 'Shigar', region: 'Gilgit-Baltistan', headquarters: 'Shigar', hasDirectContact: true, divisionJurisdiction: 'Central Karakoram National Park Desk' },
  { districtName: 'Kharmang', region: 'Gilgit-Baltistan', headquarters: 'Tolti', hasDirectContact: false, divisionJurisdiction: 'Skardu HQ (Fallback)' },
  { districtName: 'Roundu', region: 'Gilgit-Baltistan', headquarters: 'Dambudas', hasDirectContact: false, divisionJurisdiction: 'Skardu HQ (Fallback)' },
  { districtName: 'Diamer', region: 'Gilgit-Baltistan', headquarters: 'Chilas', hasDirectContact: true, divisionJurisdiction: 'Diamer Wildlife Division' },
  { districtName: 'Astore', region: 'Gilgit-Baltistan', headquarters: 'Eidgah', hasDirectContact: true, divisionJurisdiction: 'Deosai National Park & Astore Wildlife Directorate' }
];

// ─────────────────────────────────────────────────────────────────────────────
// OFFICIAL PUBLISHED EMERGENCY & REFERRAL CONTACT REGISTRY
// ─────────────────────────────────────────────────────────────────────────────

export const EMERGENCY_DIRECTORY_ENTRIES: WildlifeEmergencyContact[] = [
  // ── KASHMIR VALLEY ─────────────────────────────────────────────────────────
  {
    id: 'kew-wec-sgr-01',
    region: 'Kashmir Valley',
    district: 'Srinagar',
    coveredDistricts: ['Srinagar', 'Budgam', 'Ganderbal'],
    officeName: 'Central Wildlife Division Control Room',
    authorityDepartment: 'Department of Wildlife Protection, Jammu & Kashmir',
    serviceCategory: 'Wildlife Emergency Control Room',
    primaryPhoneNumber: '0194-2452026',
    formattedDisplayNumber: '0194-2452026',
    e164PhoneNumber: '+911942452026',
    alternatePhone: '0194-2452027',
    tollFreeHelpline: '1800-180-7177',
    physicalLocation: 'Dachigam Forest Complex / Boulevard Road, Srinagar',
    operatingHours: 'Day & Evening Shift (08:00 - 20:00; on-call rapid response for urgent residential predator sightings)',
    is24x7Verified: false,
    verificationStatus: 'Officially Published',
    lastDirectVerificationDate: '2026-08-15',
    sourcePublicationDate: '2024-04-10',
    officialSourceUrl: 'https://jkwildlife.com/wild/wild/orders/contact%20Nos%20for%20reporting%20human%20wild%20animal%20conflict.pdf',
    sourceDocumentTitle: 'J&K DWP Order: Contact Nos for Reporting Human Wild Animal Conflict',
    operationalNotes: 'Serves Srinagar urban perimeter, Dachigam fringe, Zabarwan foothill settlements, and coordinates emergency squads for bear/leopard intrusions.',
    fallbackRegionalContactId: undefined
  },
  {
    id: 'kew-wec-shp-01',
    region: 'Kashmir Valley',
    district: 'Shopian',
    coveredDistricts: ['Shopian', 'Kulgam', 'Pulwama'],
    officeName: 'Wildlife Warden Office Shopian',
    authorityDepartment: 'Department of Wildlife Protection, Jammu & Kashmir',
    serviceCategory: 'Wildlife Division / Warden Office',
    primaryPhoneNumber: '9419049275',
    formattedDisplayNumber: '+91 94190 49275',
    e164PhoneNumber: '+919419049275',
    physicalLocation: 'Hirpora Wildlife Sanctuary Complex, Shopian',
    operatingHours: '09:30 - 17:30 (Administrative) / Emergency on-call',
    is24x7Verified: false,
    verificationStatus: 'Officially Published',
    lastDirectVerificationDate: '2026-08-20',
    sourcePublicationDate: '2024-04-10',
    officialSourceUrl: 'https://jkwildlife.com/wild/wild/orders/contact%20Nos%20for%20reporting%20human%20wild%20animal%20conflict.pdf',
    sourceDocumentTitle: 'J&K DWP Official Emergency Directory',
    operationalNotes: 'Primary jurisdiction covers Hirpora Sanctuary, Mughal Road corridor, and apple belt interface. Coordinates with South Division Control Room.',
    fallbackRegionalContactId: 'kew-wec-sgr-01'
  },
  {
    id: 'kew-wec-ant-01',
    region: 'Kashmir Valley',
    district: 'Anantnag',
    coveredDistricts: ['Anantnag', 'Pulwama', 'Kulgam', 'Shopian'],
    officeName: 'South Wildlife Division Control Room',
    authorityDepartment: 'Department of Wildlife Protection, Jammu & Kashmir',
    serviceCategory: 'Wildlife Emergency Control Room',
    primaryPhoneNumber: '01932-222419',
    formattedDisplayNumber: '01932-222419',
    e164PhoneNumber: '+911932222419',
    alternatePhone: '01932-225890',
    physicalLocation: 'Bijbehara & Overa-Aru Sanctuary Control Desk',
    operatingHours: '08:00 - 19:00 (On-call emergency squad)',
    is24x7Verified: false,
    verificationStatus: 'Officially Published',
    lastDirectVerificationDate: '2026-08-10',
    sourcePublicationDate: '2024-04-10',
    officialSourceUrl: 'https://jkwildlife.com',
    sourceDocumentTitle: 'J&K DWP South Division Field Administration Registry',
    operationalNotes: 'Covers Lidder valley, Pahalgam tourist corridor, Overa-Aru Sanctuary boundaries, and southern apple orchard belts.',
    fallbackRegionalContactId: 'kew-wec-sgr-01'
  },
  {
    id: 'kew-wec-bar-01',
    region: 'Kashmir Valley',
    district: 'Baramulla',
    coveredDistricts: ['Baramulla', 'Bandipora', 'Kupwara'],
    officeName: 'North Wildlife Division Emergency Squad',
    authorityDepartment: 'Department of Wildlife Protection, Jammu & Kashmir',
    serviceCategory: 'Wildlife Emergency Control Room',
    primaryPhoneNumber: '01952-238421',
    formattedDisplayNumber: '01952-238421',
    e164PhoneNumber: '+911952238421',
    alternatePhone: '01952-234256',
    physicalLocation: 'Forest Complex, Baramulla Town / Handwara Outpost',
    operatingHours: '08:00 - 20:00 (Rapid squad dispatched on priority calls)',
    is24x7Verified: false,
    verificationStatus: 'Officially Published',
    lastDirectVerificationDate: '2026-08-12',
    sourcePublicationDate: '2024-04-10',
    officialSourceUrl: 'https://jkwildlife.com',
    sourceDocumentTitle: 'J&K DWP North Division Emergency Directory',
    operationalNotes: 'Handles frequent black bear and leopard incidents across Tangmarg, Langate, Rajwar, and Wular fringe.',
    fallbackRegionalContactId: 'kew-wec-sgr-01'
  },
  {
    id: 'kew-wec-kup-01',
    region: 'Kashmir Valley',
    district: 'Kupwara',
    coveredDistricts: ['Kupwara'],
    officeName: 'Handwara-Langate Wildlife Rescue Squad',
    authorityDepartment: 'Department of Wildlife Protection, Jammu & Kashmir',
    serviceCategory: 'Wildlife Rescue Centre',
    primaryPhoneNumber: '01952-234256',
    formattedDisplayNumber: '01952-234256',
    e164PhoneNumber: '+911952234256',
    physicalLocation: 'Handwara Range Office, Kupwara District',
    operatingHours: '09:00 - 17:30 (On-call patrol)',
    is24x7Verified: false,
    verificationStatus: 'Recently Confirmed',
    lastDirectVerificationDate: '2026-09-02',
    sourcePublicationDate: '2024-04-10',
    officialSourceUrl: 'https://jkwildlife.com',
    sourceDocumentTitle: 'Department of Wildlife Protection North Division Outpost Directory',
    operationalNotes: 'Direct field squad for high-density bear orchard depredations across Rajwar and frontier forests.',
    fallbackRegionalContactId: 'kew-wec-bar-01'
  },
  {
    id: 'kew-wec-gbl-01',
    region: 'Kashmir Valley',
    district: 'Ganderbal',
    coveredDistricts: ['Ganderbal'],
    officeName: 'Sindh Forest Division & Wildlife Desk Ganderbal',
    authorityDepartment: 'Department of Wildlife Protection / Forest Dept, J&K',
    serviceCategory: 'Wildlife Division / Warden Office',
    primaryPhoneNumber: '0194-2452026',
    formattedDisplayNumber: '0194-2452026 (Central Control)',
    e164PhoneNumber: '+911942452026',
    tollFreeHelpline: '1800-180-7177',
    physicalLocation: 'Kangan & Wayil Forest Outposts, Ganderbal',
    operatingHours: '09:00 - 18:00',
    is24x7Verified: false,
    verificationStatus: 'Officially Published',
    lastDirectVerificationDate: '2026-08-15',
    sourcePublicationDate: '2024-04-10',
    officialSourceUrl: 'https://jkwildlife.com',
    sourceDocumentTitle: 'J&K DWP Central Division District Allocations',
    operationalNotes: 'Ganderbal is serviced directly by Central Wildlife Division (Dachigam HQ). Reports for Kangan, Wangath, and Sonamarg fringe routed through Central Control.',
    fallbackRegionalContactId: 'kew-wec-sgr-01'
  },

  // ── JAMMU ──────────────────────────────────────────────────────────────────
  {
    id: 'kew-wec-jam-01',
    region: 'Jammu',
    district: 'Jammu',
    coveredDistricts: ['Jammu', 'Samba', 'Kathua', 'Reasi'],
    officeName: 'Regional Wildlife Warden Office Jammu',
    authorityDepartment: 'Department of Wildlife Protection, Jammu & Kashmir',
    serviceCategory: 'Wildlife Division / Warden Office',
    primaryPhoneNumber: '0191-2544575',
    formattedDisplayNumber: '0191-2544575',
    e164PhoneNumber: '+911912544575',
    physicalLocation: 'Manda Hills, Near Hotel Ashok, Jammu',
    operatingHours: '09:30 - 17:30 (Weekdays) / Emergency squad on-call',
    is24x7Verified: false,
    verificationStatus: 'Officially Published',
    lastDirectVerificationDate: '2026-08-18',
    sourcePublicationDate: '2024-04-10',
    officialSourceUrl: 'https://jkwildlife.com',
    sourceDocumentTitle: 'J&K DWP Jammu Regional Office Directory',
    operationalNotes: 'Regional headquarters for Jammu division. Directs rescue squads for leopard and monkey conflicts across Jammu urban, Manda Sanctuary, and Shivalik foothills.',
    fallbackRegionalContactId: undefined
  },
  {
    id: 'kew-wec-jam-02',
    region: 'Jammu',
    district: 'Jammu',
    coveredDistricts: ['Jammu', 'Samba'],
    officeName: 'Manda Wildlife Sanctuary Control Room & Rescue Centre',
    authorityDepartment: 'Department of Wildlife Protection, Jammu & Kashmir',
    serviceCategory: 'Wildlife Emergency Control Room',
    primaryPhoneNumber: '0191-2520948',
    formattedDisplayNumber: '0191-2520948',
    e164PhoneNumber: '+911912520948',
    physicalLocation: 'Manda Wildlife Sanctuary Complex, Jammu',
    operatingHours: '08:00 - 20:00 (Emergency calls patched)',
    is24x7Verified: false,
    verificationStatus: 'Recently Confirmed',
    lastDirectVerificationDate: '2026-09-01',
    sourcePublicationDate: '2024-04-10',
    officialSourceUrl: 'https://jkwildlife.com',
    sourceDocumentTitle: 'J&K DWP Wildlife Rescue Center Directory',
    operationalNotes: 'Equipped with tranquilizer equipment and transport cages for wild animals captured in human-dominated areas of Jammu district.',
    fallbackRegionalContactId: 'kew-wec-jam-01'
  },
  {
    id: 'kew-wec-kis-01',
    region: 'Jammu',
    district: 'Kishtwar',
    coveredDistricts: ['Kishtwar', 'Doda', 'Ramban'],
    officeName: 'Wildlife Warden Office Kishtwar',
    authorityDepartment: 'Department of Wildlife Protection, Jammu & Kashmir',
    serviceCategory: 'Wildlife Division / Warden Office',
    primaryPhoneNumber: '9419155156',
    formattedDisplayNumber: '+91 94191 55156',
    e164PhoneNumber: '+919419155156',
    physicalLocation: 'Kishtwar High Altitude National Park HQ, Kishtwar',
    operatingHours: '09:30 - 17:30 (On-call for Chenab valley emergencies)',
    is24x7Verified: false,
    verificationStatus: 'Officially Published',
    lastDirectVerificationDate: '2026-08-20',
    sourcePublicationDate: '2024-04-10',
    officialSourceUrl: 'https://jkwildlife.com/wild/wild/orders/contact%20Nos%20for%20reporting%20human%20wild%20animal%20conflict.pdf',
    sourceDocumentTitle: 'J&K DWP Official Emergency Directory',
    operationalNotes: 'Serves Kishtwar High Altitude National Park buffer zones, Padder valley, and high alpine pastoral corrals facing brown bear and leopard predation.',
    fallbackRegionalContactId: 'kew-wec-jam-01'
  },
  {
    id: 'kew-wec-kat-01',
    region: 'Jammu',
    district: 'Kathua',
    coveredDistricts: ['Kathua', 'Samba'],
    officeName: 'Jasrota Wildlife Sanctuary & Kathua Range Office',
    authorityDepartment: 'Department of Wildlife Protection, Jammu & Kashmir',
    serviceCategory: 'Wildlife Division / Warden Office',
    primaryPhoneNumber: '01922-234672',
    formattedDisplayNumber: '01922-234672',
    e164PhoneNumber: '+911922234672',
    physicalLocation: 'Jasrota Sanctuary Range, Kathua',
    operatingHours: '09:30 - 17:00',
    is24x7Verified: false,
    verificationStatus: 'Verification Pending',
    lastDirectVerificationDate: '2026-07-15',
    sourcePublicationDate: '2023-11-01',
    officialSourceUrl: 'https://kathua.nic.in/directory/',
    sourceDocumentTitle: 'District Administration Kathua Official Directory',
    operationalNotes: 'Monitors cheetah/leopard and wild boar agricultural crop raiding in Kathua foothill plains.',
    fallbackRegionalContactId: 'kew-wec-jam-01'
  },
  {
    id: 'kew-wec-pnc-01',
    region: 'Jammu',
    district: 'Poonch',
    coveredDistricts: ['Poonch', 'Rajouri'],
    officeName: 'Poonch-Rajouri Wildlife Division Office',
    authorityDepartment: 'Department of Wildlife Protection, Jammu & Kashmir',
    serviceCategory: 'Wildlife Division / Warden Office',
    primaryPhoneNumber: '01965-220145',
    formattedDisplayNumber: '01965-220145',
    e164PhoneNumber: '+911965220145',
    physicalLocation: 'Near DC Office Complex, Poonch',
    operatingHours: '09:30 - 17:00 (Field alerts patched via district control)',
    is24x7Verified: false,
    verificationStatus: 'Verification Pending',
    lastDirectVerificationDate: '2026-07-20',
    sourcePublicationDate: '2023-12-05',
    officialSourceUrl: 'https://poonch.nic.in',
    sourceDocumentTitle: 'District Administration Poonch Directory',
    operationalNotes: 'Covers Pir Panjal slope settlements, Surankote, and Mandi valleys where common leopard and black bear encounters peak in winter.',
    fallbackRegionalContactId: 'kew-wec-jam-01'
  },

  // ── LADAKH ─────────────────────────────────────────────────────────────────
  {
    id: 'kew-wec-leh-01',
    region: 'Ladakh',
    district: 'Leh',
    coveredDistricts: ['Leh'],
    officeName: 'Wildlife Warden Office Leh',
    authorityDepartment: 'Department of Wildlife Protection, UT of Ladakh',
    serviceCategory: 'Wildlife Division / Warden Office',
    primaryPhoneNumber: '9891403625',
    formattedDisplayNumber: '+91 98914 03625',
    e164PhoneNumber: '+919891403625',
    alternatePhone: '01982-252171',
    tollFreeHelpline: '01982-252541',
    physicalLocation: 'Hemis National Park Complex / Badami Bagh, Leh',
    operatingHours: '09:00 - 18:00 (Field emergency calls monitored)',
    is24x7Verified: false,
    verificationStatus: 'Officially Published',
    lastDirectVerificationDate: '2026-08-25',
    sourcePublicationDate: '2024-05-12',
    officialSourceUrl: 'https://leh.nic.in/department/wildlife-department/',
    sourceDocumentTitle: 'District Administration Leh - Wildlife Department Directory',
    operationalNotes: 'Primary authority for snow leopard, Tibetan wolf, and lynx livestock corral predation across Leh, Changthang, and Nubra Valley. Coordinates with local conservation committees.',
    fallbackRegionalContactId: undefined
  },
  {
    id: 'kew-wec-kgl-01',
    region: 'Ladakh',
    district: 'Kargil',
    coveredDistricts: ['Kargil'],
    officeName: 'Wildlife Warden Office Kargil',
    authorityDepartment: 'Department of Wildlife Protection, UT of Ladakh',
    serviceCategory: 'Wildlife Division / Warden Office',
    primaryPhoneNumber: '9596219055',
    formattedDisplayNumber: '+91 95962 19055',
    e164PhoneNumber: '+919596219055',
    alternatePhone: '01985-232264',
    physicalLocation: 'Baroo Colony, Kargil HQ',
    operatingHours: '09:30 - 17:30 (On-call response)',
    is24x7Verified: false,
    verificationStatus: 'Officially Published',
    lastDirectVerificationDate: '2026-08-25',
    sourcePublicationDate: '2024-05-12',
    officialSourceUrl: 'https://kargil.nic.in/directory/',
    sourceDocumentTitle: 'District Administration Kargil Official Directory',
    operationalNotes: 'Serves Suru Valley, Drass (brown bear interface), Zanskar (snow leopard/wolf conflict), and Sankoo pastoral rangelands.',
    fallbackRegionalContactId: 'kew-wec-leh-01'
  },

  // ── AZAD JAMMU & KASHMIR ───────────────────────────────────────────────────
  {
    id: 'kew-wec-ajk-01',
    region: 'Azad Jammu and Kashmir',
    district: 'Muzaffarabad',
    coveredDistricts: ['Muzaffarabad', 'Neelum', 'Jhelum Valley'],
    officeName: 'AJK Forestry, Wildlife & Fisheries Central Control',
    authorityDepartment: 'Forestry, Wildlife & Fisheries Department, Govt of AJ&K',
    serviceCategory: 'Wildlife Emergency Control Room',
    primaryPhoneNumber: '+92 582 2920713',
    formattedDisplayNumber: '+92 582 2920713',
    e164PhoneNumber: '+925822920713',
    alternatePhone: '+92-5822-921630',
    tollFreeHelpline: '+92-5822-920158',
    physicalLocation: 'Sathra Complex, Muzaffarabad, Azad Kashmir',
    operatingHours: '08:30 - 16:30 (Weekdays) / Emergency field wardens on call',
    is24x7Verified: false,
    verificationStatus: 'Officially Published',
    lastDirectVerificationDate: '2026-09-05',
    sourcePublicationDate: '2024-02-18',
    officialSourceUrl: 'https://forest.ajk.gov.pk/contact-us/',
    sourceDocumentTitle: 'AJK Forest, Wildlife & Fisheries Official Contact Registry',
    operationalNotes: 'Central command for Machiara National Park buffer zones, Neelum valley corridor, and common leopard human conflict response across northern AJK.',
    fallbackRegionalContactId: undefined
  },
  {
    id: 'kew-wec-ajk-02',
    region: 'Azad Jammu and Kashmir',
    district: 'Poonch (AJK)',
    coveredDistricts: ['Poonch (AJK)', 'Bagh', 'Sudhanoti', 'Haveli'],
    officeName: 'Rawalakot Wildlife Range Office',
    authorityDepartment: 'Forestry, Wildlife & Fisheries Department, Govt of AJ&K',
    serviceCategory: 'Wildlife Division / Warden Office',
    primaryPhoneNumber: '+92-5824-920114',
    formattedDisplayNumber: '+92 5824 920114',
    e164PhoneNumber: '+925824920114',
    physicalLocation: 'District Complex, Rawalakot, Poonch Division',
    operatingHours: '09:00 - 16:00',
    is24x7Verified: false,
    verificationStatus: 'Verification Pending',
    lastDirectVerificationDate: '2026-07-28',
    sourcePublicationDate: '2023-10-15',
    officialSourceUrl: 'https://forest.ajk.gov.pk',
    sourceDocumentTitle: 'AJK Departmental Field Office List',
    operationalNotes: 'Handles reported common leopard and rhesus macaque crop interactions across Rawalakot, Banjosa, and Bagh hills.',
    fallbackRegionalContactId: 'kew-wec-ajk-01'
  },
  {
    id: 'kew-wec-ajk-03',
    region: 'Azad Jammu and Kashmir',
    district: 'Mirpur',
    coveredDistricts: ['Mirpur', 'Kotli', 'Bhimber'],
    officeName: 'Mirpur & Mangla Reservoir Wildlife Range',
    authorityDepartment: 'Forestry, Wildlife & Fisheries Department, Govt of AJ&K',
    serviceCategory: 'Wildlife Division / Warden Office',
    primaryPhoneNumber: '+92-5827-920450',
    formattedDisplayNumber: '+92 5827 920450',
    e164PhoneNumber: '+925827920450',
    physicalLocation: 'Mangla Dam Enclave, Mirpur',
    operatingHours: '09:00 - 16:30',
    is24x7Verified: false,
    verificationStatus: 'Verification Pending',
    lastDirectVerificationDate: '2026-07-30',
    sourcePublicationDate: '2023-11-10',
    officialSourceUrl: 'https://forest.ajk.gov.pk',
    sourceDocumentTitle: 'AJK Departmental Field Office List',
    operationalNotes: 'Focuses on wetland bird protection, porcupine and wild boar agricultural conflict across southern AJK districts.',
    fallbackRegionalContactId: 'kew-wec-ajk-01'
  },

  // ── GILGIT-BALTISTAN ───────────────────────────────────────────────────────
  {
    id: 'kew-wec-gb-01',
    region: 'Gilgit-Baltistan',
    district: 'Gilgit',
    coveredDistricts: ['Gilgit', 'Hunza', 'Nagar', 'Ghizer'],
    officeName: 'Gilgit Forest, Wildlife & Environment Department HQ',
    authorityDepartment: 'Forest, Wildlife & Environment Department, Govt of Gilgit-Baltistan',
    serviceCategory: 'Wildlife Division / Warden Office',
    primaryPhoneNumber: '+92 5811 920146',
    formattedDisplayNumber: '+92 5811 920146 / 920273',
    e164PhoneNumber: '+925811920146',
    alternatePhone: '+92-5811-920273',
    physicalLocation: 'Jutial, Gilgit, Gilgit-Baltistan',
    operatingHours: '08:30 - 16:30 (Weekdays) / Emergency field teams patched on-call',
    is24x7Verified: false,
    verificationStatus: 'Officially Published',
    lastDirectVerificationDate: '2026-09-08',
    sourcePublicationDate: '2024-03-01',
    officialSourceUrl: 'https://fwegb.gov.pk/',
    sourceDocumentTitle: 'FW&ED Gilgit-Baltistan Official Web Portal Directory',
    operationalNotes: 'Central administrative and dispatch command for wildlife conservancy, snow leopard, brown bear, and wolf coexistence programs across GB.',
    fallbackRegionalContactId: undefined
  },
  {
    id: 'kew-wec-gb-02',
    region: 'Gilgit-Baltistan',
    district: 'Skardu',
    coveredDistricts: ['Skardu', 'Shigar', 'Kharmang', 'Roundu'],
    officeName: 'Baltistan Wildlife & Central Karakoram National Park Desk',
    authorityDepartment: 'Forest, Wildlife & Environment Department, Govt of Gilgit-Baltistan',
    serviceCategory: 'Wildlife Emergency Control Room',
    primaryPhoneNumber: '+92-5815-920156',
    formattedDisplayNumber: '+92 5815 920156',
    e164PhoneNumber: '+925815920156',
    alternatePhone: '+92-5815-920214',
    physicalLocation: 'Hussainabad Road, Skardu Town',
    operatingHours: '08:30 - 17:00 (On-call pastoral emergency lines)',
    is24x7Verified: false,
    verificationStatus: 'Recently Confirmed',
    lastDirectVerificationDate: '2026-08-30',
    sourcePublicationDate: '2024-03-01',
    officialSourceUrl: 'https://fwegb.gov.pk/',
    sourceDocumentTitle: 'Baltistan Wildlife Division Directory',
    operationalNotes: 'Serves CKNP fringe, Shigar wolf predation corridors, and Deosai high-altitude bear monitoring outposts.',
    fallbackRegionalContactId: 'kew-wec-gb-01'
  },
  {
    id: 'kew-wec-gb-03',
    region: 'Gilgit-Baltistan',
    district: 'Astore',
    coveredDistricts: ['Astore', 'Diamer'],
    officeName: 'Deosai National Park Directorate & Astore Wildlife Desk',
    authorityDepartment: 'Forest, Wildlife & Environment Department, Govt of Gilgit-Baltistan',
    serviceCategory: 'Wildlife Division / Warden Office',
    primaryPhoneNumber: '+92-5817-920112',
    formattedDisplayNumber: '+92 5817 920112',
    e164PhoneNumber: '+925817920112',
    physicalLocation: 'Gorikot / Eidgah, Astore District',
    operatingHours: '09:00 - 16:30 (Seasonal field monitoring)',
    is24x7Verified: false,
    verificationStatus: 'Verification Pending',
    lastDirectVerificationDate: '2026-07-22',
    sourcePublicationDate: '2023-11-20',
    officialSourceUrl: 'https://fwegb.gov.pk/',
    sourceDocumentTitle: 'Deosai Directorate Contact Memo',
    operationalNotes: 'Focal agency for Himalayan brown bear encounters and livestock herder alerts on the Deosai alpine plateau.',
    fallbackRegionalContactId: 'kew-wec-gb-01'
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPER QUERY FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get contacts specifically assigned to or covering a district.
 * If no direct contact is registered for that district, returns the regional fallback.
 */
export function getContactsForDistrict(districtName: string, region: KewRegion): {
  directContacts: WildlifeEmergencyContact[];
  regionalFallbacks: WildlifeEmergencyContact[];
} {
  const direct = EMERGENCY_DIRECTORY_ENTRIES.filter(
    (c) => c.district === districtName || c.coveredDistricts.includes(districtName)
  );

  const fallbacks = EMERGENCY_DIRECTORY_ENTRIES.filter(
    (c) => c.region === region && !c.coveredDistricts.includes(districtName) && c.fallbackRegionalContactId === undefined
  );

  return {
    directContacts: direct,
    regionalFallbacks: fallbacks
  };
}

/**
 * Get directory statistics for transparency reporting
 */
export function getEmergencyDirectoryStats() {
  const totalRegions = 5;
  const totalDistricts = OFFICIAL_DISTRICTS.length; // 42
  const districtsWithPublished = OFFICIAL_DISTRICTS.filter((d) => d.hasDirectContact).length;
  const districtsPendingDirect = totalDistricts - districtsWithPublished;
  const totalContactRecords = EMERGENCY_DIRECTORY_ENTRIES.length;
  const controlRooms = EMERGENCY_DIRECTORY_ENTRIES.filter(
    (c) => c.serviceCategory === 'Wildlife Emergency Control Room'
  ).length;
  const rescueCentres = EMERGENCY_DIRECTORY_ENTRIES.filter(
    (c) => c.serviceCategory === 'Wildlife Rescue Centre'
  ).length;

  return {
    totalRegions,
    totalDistricts,
    districtsWithPublished,
    districtsPendingDirect,
    totalContactRecords,
    controlRooms,
    rescueCentres
  };
}
