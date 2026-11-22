// ─────────────────────────────────────────────────────────────────────────────
// KASHMIR ECOWATCH (KEW) — FOREST PROTECTION MARTYRS & FALLEN DEFENDERS REGISTRY
// Five-Region Environmental Defense Memorial & Evidentiary Dossiers (1990–2026)
// Coverage: Kashmir Valley, Jammu, Ladakh, AJ&K, Gilgit-Baltistan
// ─────────────────────────────────────────────────────────────────────────────

import { KEWRegion } from './kew-green-heroes';

export type MartyrVerificationType =
  | 'HISTORICAL_CASE'
  | 'DOCUMENTED_FATALITY'
  | 'OFFICIAL_MEMORIAL'
  | 'IDENTITY_RECONCILIATION'
  | 'JUDICIAL_OUTCOME_REPORTED';

export type MartyrCategory =
  | 'Forest Protection Martyrs'
  | 'Fallen Environmental Service Personnel'
  | 'Forest Protection Martyrs | Supporting Enforcement Personnel'
  | 'Forest Protection Martyrs | Supporting Security Personnel';

export interface MartyrContribution {
  year: number | string;
  title: string;
  evidenceTier: string;
  description: string;
  documentedOutcome: string;
}

export interface MartyrSource {
  title: string;
  url: string;
  publisher?: string;
}

export interface GreenMartyrDossier {
  id: string;
  name: string;
  honorific?: string;
  sortName?: string;
  sort_name?: string;
  designation: string;
  category: MartyrCategory;
  martyrType: MartyrVerificationType;
  region: KEWRegion;
  district: string;
  year: number | string;
  editorialTribute: string;
  narrative: string;
  keyImpact: string;
  documentedContributions: MartyrContribution[];
  sourceProvenance: MartyrSource[];
  researchStatus: string;
  resolvedDetailsNote?: string;
  identityReconciliationNote?: string;
  commonLinks?: Array<{ label: string; url: string }>;
}

export interface MartyrsRegistrySummary {
  profilesDrafted: number;
  regionsRepresented: string;
  editoriallyApproved: number;
  underVerificationAudit: number;
  reviewDate: string;
}

export const MARTYRS_REGISTRY_SUMMARY: MartyrsRegistrySummary = {
  profilesDrafted: 21,
  regionsRepresented: '4/5',
  editoriallyApproved: 0,
  underVerificationAudit: 21,
  reviewDate: 'November 22, 2026'
};

export const COMMON_DOSSIER_LINKS = [
  { label: 'KEW Green Heroes Directory', url: '/resources/kew-green-heroes?tab=all-heroes' },
  { label: 'Green Martyrs Memorial', url: '/resources/kew-green-heroes?tab=green-martyrs' },
  { label: 'Forest & Biodiversity Monitoring', url: '/biodiversity/forest-ecosystems' },
  { label: 'Environmental Crime Registry', url: '/resources/environmental-pil?tab=inventory' },
  { label: 'Environmental Justice & Accountability Tracker', url: '/resources/environmental-pil?tab=overview' }
];

export const GREEN_MARTYRS_DOSSIERS: GreenMartyrDossier[] = [
  // ───────────────────────────────────────────────────────────────────────────
  // KASHMIR VALLEY (16 Profiles)
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'martyr-001',
    name: 'Sonaullah Zargar',
    designation: 'Forest protection activist and reported ad-hoc forest guard | Sukhnag Forests',
    category: 'Forest Protection Martyrs',
    martyrType: 'HISTORICAL_CASE',
    region: 'Kashmir Valley',
    district: 'Budgam',
    year: 2011,
    editorialTribute: '“He stood against the destruction of the forests he was entrusted to protect.”',
    narrative:
      'Sonaullah Zargar was associated with forest protection work in the Sukhnag area of Budgam. He was murdered in June 2011. Police investigations linked the case to suspected timber smugglers and reported the arrest of a Block Forest Officer and three alleged smugglers. His case illustrates the dangers of confronting illegal timber extraction and suspected institutional complicity.',
    keyImpact: 'Exposed lethal risks associated with organized timber smuggling',
    documentedContributions: [
      {
        year: 2011,
        title: 'Sukhnag Forest Protection',
        evidenceTier: 'INDEPENDENT MEDIA',
        description: 'Worked to resist illegal timber extraction in Budgam\'s Sukhnag forest landscape.',
        documentedOutcome: 'His environmental protection activities were described in national and regional reporting.'
      },
      {
        year: 2011,
        title: 'Murder Investigation',
        evidenceTier: 'POLICE INVESTIGATION REPORTED BY MEDIA',
        description: 'Police investigated suspected involvement of timber smugglers and a departmental official.',
        documentedOutcome: 'Four reported arrests; final judicial disposition requires verification.'
      }
    ],
    sourceProvenance: [
      { title: 'NDTV investigation: Killed for protecting forests in Kashmir', url: 'https://www.ndtv.com/india-news/killed-for-protecting-forests-in-kashmir-459951' },
      { title: 'The Telegraph report: Valley green crusader killed', url: 'https://www.telegraphindia.com/india/valley-green-crusader-killed/cid/368883' }
    ],
    researchStatus: 'Independently documented. Court disposition pending.'
  },
  {
    id: 'martyr-002',
    name: 'Imran Yousaf Wani',
    designation: 'Forest Guard | J&K Forest Department, Budgam',
    category: 'Forest Protection Martyrs',
    martyrType: 'DOCUMENTED_FATALITY',
    region: 'Kashmir Valley',
    district: 'Pulwama / Budgam',
    year: 2023,
    editorialTribute: '“A frontline forest protector whose service ended in an armed attack.”',
    narrative:
      'Imran Yousaf Wani was part of a Forest Department team attempting to apprehend timber smugglers near Bangender Bridge in Pulwama. Gunmen attacked the checkpoint on July 18, 2023, injuring Wani and Forester Jahangir Ahmed Chechi. Wani succumbed to his injuries the following day.',
    keyImpact: 'Fatal sacrifice during an anti-timber-smuggling operation',
    documentedContributions: [
      {
        year: 2023,
        title: 'Bangender Forest Protection Checkpoint',
        evidenceTier: 'POLICE-REPORTED INCIDENT',
        description: 'Served in a forest enforcement operation to intercept suspected illegal timber movement.',
        documentedOutcome: 'Two departmental employees were injured; Wani died on July 19, 2023.'
      }
    ],
    sourceProvenance: [
      { title: 'Daily Excelsior: Forest guard killed, forester injured in militant attack', url: 'https://www.dailyexcelsior.com/news/archive/forest-guard-killed-forester-injured-in-militant-attack' },
      { title: 'Kashmir Observer: Unknown gunmen fire at two forest dept employees in South Kashmir’s Pulwama', url: 'https://kashmirobserver.net/2023/07/19/unknown-gunmen-fire-at-two-forest-dept-employees-in-south-kashmirs-pulwama/' }
    ],
    researchStatus: 'Independently documented. Police investigation outcome pending.'
  },
  {
    id: 'martyr-003',
    name: 'Gull Mohammad Shah',
    designation: 'Forest Guard | Verinag Forest Range, Anantnag',
    category: 'Forest Protection Martyrs',
    martyrType: 'DOCUMENTED_FATALITY',
    region: 'Kashmir Valley',
    district: 'Anantnag',
    year: 2025,
    editorialTribute: '“He confronted a forest fire without the protection his service demanded.”',
    narrative:
      'Gull Mohammad Shah, 54, was involved in combating a forest fire in the Hengipora area of Verinag. On December 7, 2025, he fell down a steep slope while attempting to move away from advancing flames. An investigation published by Kashmir Observer described significant shortages of personal protective equipment among the firefighting personnel.',
    keyImpact: 'Fatality highlighting gaps in frontline forest-fire safety',
    documentedContributions: [
      {
        year: 2025,
        title: 'Hengipora Forest Fire Response',
        evidenceTier: 'INVESTIGATIVE ENVIRONMENTAL REPORTING',
        description: 'Participated in firefighting operations in Compartment 48 of the Verinag forest landscape.',
        documentedOutcome: 'Fatal accident during firefighting; published calls for improved equipment and worker safety.'
      }
    ],
    sourceProvenance: [
      { title: 'Kashmir Observer investigative report by Dr Raja Muzaffar Bhat: Bare-handed battle ends in tragedy for forest guard in Kashmir', url: 'https://kashmirobserver.net/2025/12/09/bare-handed-battle-ends-in-tragedy-for-forest-guard-in-kashmir/' }
    ],
    researchStatus: 'Independently documented. Departmental safety inquiry and compensation outcome pending.'
  },
  {
    id: 'martyr-004',
    name: 'Shameem Ahmad Mir',
    designation: 'Forest Guard | Paribal Forest Division',
    category: 'Fallen Environmental Service Personnel',
    martyrType: 'DOCUMENTED_FATALITY',
    region: 'Kashmir Valley',
    district: 'Ganderbal',
    year: 2025,
    editorialTribute: '“Remembered for his service in a riverine forest landscape.”',
    narrative:
      'Shameem Ahmad Mir, a forest guard from the Ganderbal area, drowned in Nallah Sindh while reportedly performing departmental duty in May 2025. His body was recovered after a search operation lasting several days. Published accounts support his duty-related death, but the exact activity immediately preceding the incident requires further official confirmation.',
    keyImpact: 'Highlighted the risks of forest duty around fast-flowing waterways',
    documentedContributions: [
      {
        year: 2025,
        title: 'Paribal Forest Duty Incident',
        evidenceTier: 'INDEPENDENT MEDIA',
        description: 'Was performing forest duty near the Sindh watercourse when the incident occurred.',
        documentedOutcome: 'Body recovered in May 2025; duty-related drowning reported.'
      }
    ],
    sourceProvenance: [
      { title: 'Kashmir Observer: Forest guard’s body recovered after 4 days in central Kashmir’s Ganderbal', url: 'https://kashmirobserver.net/2025/05/26/forest-guards-body-recovered-after-4-days-in-central-kashmirs-ganderbal/' }
    ],
    researchStatus: 'Independently documented. Exact duty circumstances pending.'
  },
  {
    id: 'martyr-005',
    name: 'Mohammad Maqbool Khandey',
    designation: 'Deputy Forester | Lehenvan Block, Daksum Forest Range',
    category: 'Forest Protection Martyrs',
    martyrType: 'OFFICIAL_MEMORIAL',
    region: 'Kashmir Valley',
    district: 'Anantnag',
    year: 2019,
    editorialTribute: '“His final patrol remains part of Kashmir\'s forest protection history.”',
    narrative:
      'Mohammad Maqbool Khandey served as Deputy Forester in Anantnag Forest Division. The J&K Forest Department records that he died on December 18, 2019, while patrolling Compartment 43/K in Lehenvan Block, Daksum Forest Range. The memorial does not specify the medical or physical cause of death.',
    keyImpact: 'Officially commemorated for his death during forest patrol',
    resolvedDetailsNote: 'Research confirmed service specifically in Anantnag Forest Division via official departmental memorial.',
    documentedContributions: [
      {
        year: 2019,
        title: 'Lehenvan Forest Patrol',
        evidenceTier: 'OFFICIAL DEPARTMENTAL RECORD',
        description: 'Undertook field patrol duties in the Daksum forest landscape.',
        documentedOutcome: 'Departmentally commemorated following his death on December 18, 2019.'
      }
    ],
    sourceProvenance: [
      { title: 'J&K Forest Department, Green Hearts (Page 24)', url: 'https://www.scribd.com/document/777149877/Green-Hearts-Martyrs' },
      { title: 'Government of India Forest Martyrs List', url: 'https://static.pib.gov.in/WriteReadData/userfiles/List%20of%20Forest%20Personnel.pdf' }
    ],
    researchStatus: 'Officially commemorated. Cause of death and local incident report pending.'
  },
  {
    id: 'martyr-006',
    name: 'Parvez Qadri',
    designation: 'Conservator of Forests | Kashmir South Circle',
    category: 'Forest Protection Martyrs',
    martyrType: 'OFFICIAL_MEMORIAL',
    region: 'Kashmir Valley',
    district: 'South Kashmir',
    year: 1990,
    editorialTribute: '“A senior naturalist and forest officer who died during a field inspection.”',
    narrative:
      'Parvez Qadri, originally from the Jammu region, served as Conservator of Forests for Kashmir South Circle. In 1990, he accompanied then Divisional Forest Officer Mia Javed on an inspection of the Daksum forests. According to the departmental memorial, an armed attacker shot him in the leg. He died from blood loss while being taken for medical treatment.',
    keyImpact: 'Senior forest officer killed during forest inspection',
    documentedContributions: [
      {
        year: 1990,
        title: 'Daksum Forest Inspection',
        evidenceTier: 'OFFICIAL DEPARTMENTAL MEMORIAL',
        description: 'Conducted an inspection of vulnerable forest areas in South Kashmir.',
        documentedOutcome: 'Died following an armed attack; departmentally commemorated.'
      }
    ],
    sourceProvenance: [
      { title: 'J&K Forest Department, Green Hearts (Page 1)', url: 'https://www.scribd.com/document/777149877/Green-Hearts-Martyrs' }
    ],
    researchStatus: 'Official memorial record. Independent criminal investigation documentation pending.'
  },
  {
    id: 'martyr-007',
    name: 'Mumtaz Ahmad Mir',
    designation: 'Chowkidar | Bandipora Forest Division, Kodara',
    category: 'Forest Protection Martyrs',
    martyrType: 'OFFICIAL_MEMORIAL',
    region: 'Kashmir Valley',
    district: 'Bandipora',
    year: 1997,
    editorialTribute: '“His life was taken during patrol in the forests of Kodara.”',
    narrative:
      'Mumtaz Ahmad Mir was serving as Chowkidar in the Kodara forest area of Bandipora. On October 4, 1997, he was patrolling inside the forest when unidentified gunmen abducted him and subsequently shot him dead. The case is included in the J&K Forest Department\'s official memorial.',
    keyImpact: 'Fatal sacrifice during forest patrol',
    documentedContributions: [
      {
        year: 1997,
        title: 'Kodara Forest Patrol',
        evidenceTier: 'OFFICIAL DEPARTMENTAL MEMORIAL',
        description: 'Performed field patrol duty in the vulnerable Kodara forest area.',
        documentedOutcome: 'Abducted and killed on October 4, 1997.'
      }
    ],
    sourceProvenance: [
      { title: 'J&K Forest Department, Green Hearts (Page 7)', url: 'https://www.scribd.com/document/777149877/Green-Hearts-Martyrs' }
    ],
    researchStatus: 'Official memorial record. Perpetrator identities and case outcome pending.'
  },
  {
    id: 'martyr-008',
    name: 'Farooq Ahmad Lone',
    designation: 'Chowkidar | Panar Block, Bandipora Forest Division',
    category: 'Forest Protection Martyrs',
    martyrType: 'IDENTITY_RECONCILIATION',
    region: 'Kashmir Valley',
    district: 'Bandipora',
    year: 2003,
    editorialTribute: '“Remembered for resisting a violent attack while guarding the forest.”',
    narrative:
      'The departmental memorial identifies the individual in its heading as Farooq Ahmad Lone, but the narrative names Farooq Ahmad Khan. The account states that a Chowkidar on night duty in Panar Block was attacked by suspected smugglers on February 12–13, 2003, sustained serious injuries, and was subsequently found dead. KEW must not resolve the two names by assumption.',
    keyImpact: 'Reported resistance against a violent timber-smuggling attack',
    identityReconciliationNote: 'Identity discrepancy unresolved (Lone vs Khan). Service register or death certificate required before final verification.',
    documentedContributions: [
      {
        year: 2003,
        title: 'Panar Night Protection Duty',
        evidenceTier: 'DEPARTMENTAL RECORD, IDENTITY DISCREPANCY',
        description: 'The memorial describes an attack by suspected timber smugglers during forest protection duty.',
        documentedOutcome: 'Fatality recorded for February 12–13, 2003.'
      }
    ],
    sourceProvenance: [
      { title: 'J&K Forest Department, Green Hearts (Page 8)', url: 'https://www.scribd.com/document/777149877/Green-Hearts-Martyrs' }
    ],
    researchStatus: 'Identity discrepancy unresolved. Service register or death certificate needed before publication as verified.'
  },
  {
    id: 'martyr-009',
    name: 'Mohammad Yaqoob Khan',
    designation: 'Deputy Forester | Panar Block, Bandipora Forest Division',
    category: 'Forest Protection Martyrs',
    martyrType: 'OFFICIAL_MEMORIAL',
    region: 'Kashmir Valley',
    district: 'Bandipora',
    year: 2003,
    editorialTribute: '“His final patrol took place in the forests he served.”',
    narrative:
      'Mohammad Yaqoob Khan was patrolling Panar forests on August 22, 2003, when armed smugglers reportedly abducted him. His body was recovered near Athwatoo on August 23. The J&K Forest Department memorial identifies this as a fatal attack against a serving Deputy Forester.',
    keyImpact: 'Fatality during a forest protection patrol involving armed smugglers',
    documentedContributions: [
      {
        year: 2003,
        title: 'Panar Forest Patrol',
        evidenceTier: 'OFFICIAL DEPARTMENTAL MEMORIAL',
        description: 'Undertook patrol duties in Panar Block to safeguard the forest area.',
        documentedOutcome: 'Abduction and killing reported; body recovered August 23, 2003.'
      }
    ],
    sourceProvenance: [
      { title: 'J&K Forest Department, Green Hearts (Page 9)', url: 'https://www.scribd.com/document/777149877/Green-Hearts-Martyrs' }
    ],
    researchStatus: 'Officially commemorated. FIR and final judicial disposition pending.'
  },
  {
    id: 'martyr-010',
    name: 'Mushtaq Ahmad Sofi',
    designation: 'Forest Guard | Ningli Beat, Bandipora Forest Division',
    category: 'Forest Protection Martyrs',
    martyrType: 'OFFICIAL_MEMORIAL',
    region: 'Kashmir Valley',
    district: 'Bandipora',
    year: 2011,
    editorialTribute: '“A frontline forest guard killed during official duty.”',
    narrative:
      'Mushtaq Ahmad Sofi was serving in Ningli Beat III, Compartment 9, when unidentified armed attackers shot him dead during the night of November 19–20, 2011. The J&K Forest Department officially commemorates his service and death.',
    keyImpact: 'Death during active forest protection service',
    documentedContributions: [
      {
        year: 2011,
        title: 'Ningli Forest Duty',
        evidenceTier: 'OFFICIAL DEPARTMENTAL MEMORIAL',
        description: 'Was on official duty with colleagues in the Ningli forest area.',
        documentedOutcome: 'Killed in an armed attack during the night of November 19–20, 2011.'
      }
    ],
    sourceProvenance: [
      { title: 'J&K Forest Department, Green Hearts (Page 10)', url: 'https://www.scribd.com/document/777149877/Green-Hearts-Martyrs' }
    ],
    researchStatus: 'Official memorial record. Motive and investigation outcome pending.'
  },
  {
    id: 'martyr-011',
    name: 'Ghulam Mohammad Itoo',
    designation: 'Forest Guard | Qazigund Range, Anantnag Forest Division',
    category: 'Forest Protection Martyrs',
    martyrType: 'OFFICIAL_MEMORIAL',
    region: 'Kashmir Valley',
    district: 'Anantnag',
    year: 2007,
    editorialTribute: '“He lost his life confronting a forest fire.”',
    narrative:
      'Ghulam Mohammad Itoo was engaged in forest firefighting in Compartment 35–36/V, Akhal Block, on November 2, 2007. During the operation, he slipped and fell into a deep gorge. His death is recorded in the official departmental memorial.',
    keyImpact: 'Fatal sacrifice during forest-fire suppression',
    documentedContributions: [
      {
        year: 2007,
        title: 'Akhal Forest Fire Response',
        evidenceTier: 'OFFICIAL DEPARTMENTAL MEMORIAL',
        description: 'Participated in forest-fire suppression in the Qazigund forest landscape.',
        documentedOutcome: 'Died following a fall into a gorge on November 2, 2007.'
      }
    ],
    sourceProvenance: [
      { title: 'J&K Forest Department, Green Hearts (Page 20)', url: 'https://www.scribd.com/document/777149877/Green-Hearts-Martyrs' }
    ],
    researchStatus: 'Officially commemorated. Fire operation and safety records pending.'
  },
  {
    id: 'martyr-012',
    name: 'Nazir Ahmad Sheikh',
    designation: 'Forest Department Helper | Verinag Range, Anantnag',
    category: 'Forest Protection Martyrs',
    martyrType: 'OFFICIAL_MEMORIAL',
    region: 'Kashmir Valley',
    district: 'Anantnag',
    year: 2014,
    editorialTribute: '“His service ended while confronting fire in the forest.”',
    narrative:
      'Nazir Ahmad Sheikh was serving in Batagund Beat, Verinag Range, on June 14, 2014. The J&K Forest Department memorial records that he died while fighting a forest fire in Compartment 56/V, Batagund Block.',
    keyImpact: 'Fatality during frontline forest-fire response',
    documentedContributions: [
      {
        year: 2014,
        title: 'Batagund Fire Suppression',
        evidenceTier: 'OFFICIAL DEPARTMENTAL MEMORIAL',
        description: 'Participated in firefighting activities in the Verinag forest landscape.',
        documentedOutcome: 'Died during the forest-fire response on June 14, 2014.'
      }
    ],
    sourceProvenance: [
      { title: 'J&K Forest Department, Green Hearts (Page 21)', url: 'https://www.scribd.com/document/777149877/Green-Hearts-Martyrs' }
    ],
    researchStatus: 'Officially commemorated. Specific mechanism of death and safety investigation pending.'
  },
  {
    id: 'martyr-013',
    name: 'Mohammad Amin Wani',
    designation: 'Forest Guard | Bindoo Zalangam Beat, Kokernag Range',
    category: 'Fallen Environmental Service Personnel',
    martyrType: 'OFFICIAL_MEMORIAL',
    region: 'Kashmir Valley',
    district: 'Anantnag',
    year: 2017,
    editorialTribute: '“Remembered for his final night patrol in the Kokernag forests.”',
    narrative:
      'Mohammad Amin Wani served as the Forest Guard responsible for Bindoo Zalangam Beat. The departmental memorial records that he died on August 18, 2017, in a motorcycle accident at Bindoo Kokernag while undertaking night patrol duties in Compartments 67–68/V.',
    keyImpact: 'Departmentally commemorated following a fatal night-patrol accident',
    documentedContributions: [
      {
        year: 2017,
        title: 'Kokernag Night Patrol',
        evidenceTier: 'OFFICIAL DEPARTMENTAL MEMORIAL',
        description: 'Was undertaking night patrol in the Bindoo Zalangam forest area.',
        documentedOutcome: 'Fatal motorcycle accident on August 18, 2017.'
      }
    ],
    sourceProvenance: [
      { title: 'J&K Forest Department, Green Hearts (Page 23)', url: 'https://www.scribd.com/document/777149877/Green-Hearts-Martyrs' }
    ],
    researchStatus: 'Official memorial record. Classified as duty-related accidental death.'
  },
  {
    id: 'martyr-014',
    name: 'Ghulam Mohammad Kawa',
    designation: 'Forest Guard | Yamberzalwari Block, Kamraj Forest Division',
    category: 'Forest Protection Martyrs',
    martyrType: 'OFFICIAL_MEMORIAL',
    region: 'Kashmir Valley',
    district: 'Kamraj / Baramulla',
    year: 1995,
    editorialTribute: '“Remembered for his forest patrol service and the violence that ended his life.”',
    narrative:
      'Ghulam Mohammad Kawa served in the Yamberzalwari area of Kamraj Forest Division. The departmental memorial records that he was returning home from routine forest patrol on April 19, 1995, when unidentified gunmen shot and killed him near Tujer Sharief.',
    keyImpact: 'Forest protection employee killed following patrol duty',
    documentedContributions: [
      {
        year: 1995,
        title: 'Yamberzalwari Forest Patrol',
        evidenceTier: 'OFFICIAL DEPARTMENTAL MEMORIAL',
        description: 'Performed forest patrol duty in Yamberzalwari Block.',
        documentedOutcome: 'Killed while returning from duty on April 19, 1995.'
      }
    ],
    sourceProvenance: [
      { title: 'J&K Forest Department, Green Hearts (Page 25)', url: 'https://www.scribd.com/document/777149877/Green-Hearts-Martyrs' }
    ],
    researchStatus: 'Officially commemorated. Attack motive and criminal case outcome pending.'
  },
  {
    id: 'martyr-015',
    name: 'Shabir Ahmad Khan',
    designation: 'Daily-Rated Forest Worker | Terds Beat, Kulangame Block',
    category: 'Forest Protection Martyrs',
    martyrType: 'OFFICIAL_MEMORIAL',
    region: 'Kashmir Valley',
    district: 'Kamraj / Baramulla',
    year: 1999,
    editorialTribute: '“His death reflects the risks borne by frontline workers regardless of employment status.”',
    narrative:
      'Shabir Ahmad Khan was working as a daily-rated employee in Compartment 18/K, Terds Beat, Kamraj Forest Division. On May 8, 1999, unidentified gunmen shot him dead while he was performing his official duties inside the forest compartment.',
    keyImpact: 'Forest worker killed during official field duty',
    documentedContributions: [
      {
        year: 1999,
        title: 'Terds Forest Field Duty',
        evidenceTier: 'OFFICIAL DEPARTMENTAL MEMORIAL',
        description: 'Performed assigned field duties in Compartment 18/K of Kamraj Forest Division.',
        documentedOutcome: 'Killed on duty on May 8, 1999.'
      }
    ],
    sourceProvenance: [
      { title: 'J&K Forest Department, Green Hearts (Page 26)', url: 'https://www.scribd.com/document/777149877/Green-Hearts-Martyrs' }
    ],
    researchStatus: 'Official memorial record. Criminal investigation and worker benefit records pending.'
  },
  {
    id: 'martyr-016',
    name: 'Ghulam Hassan Bhat',
    designation: 'Forest Guard | Shangus Beat, Kuthar Range',
    category: 'Forest Protection Martyrs',
    martyrType: 'OFFICIAL_MEMORIAL',
    region: 'Kashmir Valley',
    district: 'Anantnag (Shangus)',
    year: 1994,
    editorialTribute: '“A forest guard killed at his assigned forest beat.”',
    narrative:
      'Ghulam Hassan Bhat served in Shangus Beat of Kuthar Forest Range. According to the J&K Forest Department memorial, he was killed by unidentified gunmen during nighttime in September 1994 while posted in the Shangus forest area. The precise day of death is not specified.',
    keyImpact: 'Fatality during forest service in Shangus Beat',
    documentedContributions: [
      {
        year: 1994,
        title: 'Shangus Forest Protection Duty',
        evidenceTier: 'OFFICIAL DEPARTMENTAL MEMORIAL',
        description: 'Served as Forest Guard responsible for protection duties in Shangus Beat.',
        documentedOutcome: 'Killed in September 1994.'
      }
    ],
    sourceProvenance: [
      { title: 'J&K Forest Department, Green Hearts (Page 42)', url: 'https://www.scribd.com/document/777149877/Green-Hearts-Martyrs' }
    ],
    researchStatus: 'Officially commemorated. Exact date, motive and investigation outcome pending.'
  },

  // ───────────────────────────────────────────────────────────────────────────
  // JAMMU REGION (3 Profiles)
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'martyr-017',
    name: 'Mohammad Iqbal Zargar',
    designation: 'Forest Guard | Doda Forest Service',
    category: 'Fallen Environmental Service Personnel',
    martyrType: 'DOCUMENTED_FATALITY',
    region: 'Jammu',
    district: 'Doda',
    year: 2025,
    editorialTribute: '“A forest guard whose life was lost to a hazardous mountain slope.”',
    narrative:
      'Mohammad Iqbal Zargar, from Mancher in the Bhagwa area of Doda, was killed after being struck by falling stones near Gaadi Nallah on December 29, 2025. News reporting identifies him as a forest guard. Confirmation of the precise operational assignment at the time of the incident remains necessary.',
    keyImpact: 'Fatality highlighting terrain-related risks faced by forest personnel',
    documentedContributions: [
      {
        year: 2025,
        title: 'Gaadi Nallah Stone-Slide Incident',
        evidenceTier: 'INDEPENDENT MEDIA',
        description: 'Reported fatal stone-slide involving a serving Forest Guard in Doda.',
        documentedOutcome: 'Death reported on December 29, 2025.'
      }
    ],
    sourceProvenance: [
      { title: 'Kashmir Vision incident report: Forest guard dies after hit by stone in Doda', url: 'https://kashmirvision.in/2025/12/31/forest-guard-dies-after-hit-by-stone-in-doda-2/' }
    ],
    researchStatus: 'Independently documented. Duty circumstances and departmental inquiry pending.'
  },
  {
    id: 'martyr-018',
    name: 'Bashir Ahmad Malik',
    designation: 'Forest Department Helper | Neel Block, Ramban Forest Division',
    category: 'Fallen Environmental Service Personnel',
    martyrType: 'OFFICIAL_MEMORIAL',
    region: 'Jammu',
    district: 'Ramban',
    year: 2019,
    editorialTribute: '“Remembered for his final patrol in the mountain forests of Ramban.”',
    narrative:
      'Bashir Ahmad Malik was a Helper posted in Neel Forest Block of Ramban Division. The departmental memorial states that he slipped from a ridge during routine patrol on July 21, 2019, fell into a deep gorge, and died at the scene. He is also included in the Government of India\'s national forest martyrs list.',
    keyImpact: 'Officially recognized line-of-duty forest patrol fatality',
    resolvedDetailsNote: 'Research confirmed service specifically in Ramban Forest Division via official departmental and national records.',
    documentedContributions: [
      {
        year: 2019,
        title: 'Neel Forest Block Patrol',
        evidenceTier: 'TWO OFFICIAL RECORDS',
        description: 'Performed routine patrol duty in Forest Compartment 04/R.',
        documentedOutcome: 'Fatal fall on July 21, 2019, recognized in departmental and national memorial records.'
      }
    ],
    sourceProvenance: [
      { title: 'J&K Forest Department, Green Hearts (Page 12)', url: 'https://www.scribd.com/document/777149877/Green-Hearts-Martyrs' },
      { title: 'Government of India Forest Martyrs List', url: 'https://static.pib.gov.in/WriteReadData/userfiles/List%20of%20Forest%20Personnel.pdf' }
    ],
    researchStatus: 'Officially recognized. Exact patrol conditions and workplace safety review pending.'
  },
  {
    id: 'martyr-019',
    name: 'Tariq Hussain',
    designation: 'Forest Guard | Chenab Forest Division',
    category: 'Fallen Environmental Service Personnel',
    martyrType: 'DOCUMENTED_FATALITY',
    region: 'Jammu',
    district: 'Kishtwar',
    year: 2021,
    editorialTribute: '“His life was lost in one of the devastating mountain flood disasters of 2021.”',
    narrative:
      'Tariq Hussain was identified by the Wildlife Trust of India as a Forest Guard associated with Chenab Division who died during the catastrophic Honzar flash flood in Kishtwar in July 2021. Contemporary reports documented his name among people missing after the disaster. The available sources do not establish that he was undertaking an environmental protection operation when the flood struck.',
    keyImpact: 'Forest service personnel lost in the Honzar flash-flood disaster',
    documentedContributions: [
      {
        year: 2021,
        title: 'Honzar Flood Fatality',
        evidenceTier: 'CONSERVATION REPORT / DISASTER REPORTING',
        description: 'Was identified among those affected by the July 27–28, 2021, cloudburst and flash floods in Honzar.',
        documentedOutcome: 'Fatality recorded in the Wildlife Trust of India\'s conservation memorial research.'
      }
    ],
    sourceProvenance: [
      { title: 'Wildlife Trust of India, Guardians of the Wild', url: 'https://www.wti.org.in/wp-content/uploads/2025/10/Guardians-of-the-Wild-Digital-_-C.pdf' },
      { title: 'Kashmir Life disaster reporting: Hopes fade as rescuers fail to trace missing people in Dacchan', url: 'https://kashmirlife.net/hopes-fade-as-rescuers-fail-to-trace-missing-people-in-dacchan-273613/' }
    ],
    researchStatus: 'Conservation publication documented. Connection to active forest duty at time of death unestablished.'
  },

  // ───────────────────────────────────────────────────────────────────────────
  // AZAD JAMMU & KASHMIR (1 Profile)
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'martyr-020',
    name: 'Muhammad Farman',
    designation: 'Police Head Constable | Forest Land Encroachment Response',
    category: 'Forest Protection Martyrs | Supporting Enforcement Personnel',
    martyrType: 'DOCUMENTED_FATALITY',
    region: 'Azad Jammu & Kashmir',
    district: 'Bhimber',
    year: 2026,
    editorialTribute: '“Killed while participating in an operation responding to suspected forest encroachment.”',
    narrative:
      'Muhammad Farman was a police head constable killed on June 26, 2026, when armed assailants opened fire on a police team responding to reports of encroachment on government forest land in Bhimber. Another officer was injured. His case demonstrates the risks faced by enforcement personnel supporting forest-land protection, although he was not a Forest Department employee.',
    keyImpact: 'Fatal attack on a forest-land encroachment enforcement operation',
    documentedContributions: [
      {
        year: 2026,
        title: 'Bhimber Forest Encroachment Response',
        evidenceTier: 'POLICE ACCOUNT REPORTED BY MEDIA',
        description: 'Participated in an official response to reported encroachment on government-owned forest land.',
        documentedOutcome: 'Killed on June 26, 2026; another police officer injured.'
      }
    ],
    sourceProvenance: [
      { title: 'ARY News, June 26, 2026: Cop killed, another injured in firing incident in AJK Bhimber', url: 'https://arynews.tv/cop-killed-another-injured-in-firing-incident-in-ajk-bhimber' }
    ],
    researchStatus: 'Independently documented. Police service confirmation and final prosecution outcome pending.'
  },

  // ───────────────────────────────────────────────────────────────────────────
  // GILGIT-BALTISTAN (1 Profile)
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'martyr-021',
    name: 'Muhammad Gul Sher',
    designation: 'Frontier Constabulary Personnel | Thore Forest Checkpost',
    category: 'Forest Protection Martyrs | Supporting Security Personnel',
    martyrType: 'JUDICIAL_OUTCOME_REPORTED',
    region: 'Gilgit-Baltistan',
    district: 'Diamer',
    year: 2025,
    editorialTribute: '“A security officer killed at a checkpoint established to monitor illegal timber movement.”',
    narrative:
      'Muhammad Gul Sher, originally from Dera Ismail Khan, was serving at a forest checkpost in the Thore area of Diamer on July 20, 2025, when gunmen attacked the post. The checkpoint was reportedly used to inspect vehicles for illegal timber transportation. Dawn subsequently reported that two men were convicted in connection with the killing in October 2026. He must be classified as supporting security personnel, not a Forest Department guard.',
    keyImpact: 'Forest-checkpost attack resulting in a documented criminal conviction',
    documentedContributions: [
      {
        year: 2025,
        title: 'Thore Forest Checkpost Duty',
        evidenceTier: 'POLICE-REPORTED INCIDENT',
        description: 'Served at a checkpoint involved in monitoring vehicles for possible illegal timber movement.',
        documentedOutcome: 'Killed during an armed attack on July 20, 2025.'
      },
      {
        year: 2026,
        title: 'Criminal Court Proceedings',
        evidenceTier: 'JUDICIAL OUTCOME REPORTED BY INDEPENDENT MEDIA',
        description: 'An anti-terrorism court heard the case concerning his death.',
        documentedOutcome: 'Two defendants convicted, as reported in October 2026. The original judgment and appeal status require verification.'
      }
    ],
    sourceProvenance: [
      { title: 'Dawn, July 2025: FC personnel martyred as unknown gunmen open fire at checkpoint in GB’s Diamer: police', url: 'https://www.dawn.com/news/1925424/fc-personnel-martyred-as-unknown-gunmen-open-fire-at-checkpoint-in-gbs-diamer-police' },
      { title: 'Dawn, October 2026 court reporting: ATC convicts two in checkpost attack case', url: 'https://www.dawn.com/news/2038421' }
    ],
    researchStatus: 'Independently documented with reported convictions. Certified judgment and appeal status pending.'
  }
];

export const LADAKH_MARTYRS_RESEARCH_NOTE = {
  region: 'Ladakh',
  status: 'RESEARCH_ACTIVE',
  title: 'Active Archival Research: Trans-Himalayan Forest & Wildlife Protection',
  summary:
    'No named forest protection martyr from Ladakh has yet met the rigorous documentary standard required for the 21 individual dossiers above. KEW strictly refrains from creating speculative placeholder biographies or claiming that no historical sacrifices occurred.',
  ongoingInvestigativeSources: [
    'Ladakh Forest, Ecology and Environment Department personnel archives',
    'Department of Wildlife Protection (Leh & Kargil high-altitude sanctuary teams)',
    'Territorial Forest Divisions of Leh and Kargil records',
    'Historical pre-2019 Jammu & Kashmir Forest Department service rolls and gazettes'
  ]
};
