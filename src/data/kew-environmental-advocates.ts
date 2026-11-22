// ─────────────────────────────────────────────────────────────────────────────
// KASHMIR ECOWATCH (KEW) — ENVIRONMENTAL ADVOCATES & LEGAL PROFESSIONALS REGISTRY
// Five-Region Environmental Lawyers, PIL Petitioners, Amicus Curiae & Judicial Contributors
// Coverage: Kashmir Valley, Jammu, Ladakh, AJ&K, Gilgit-Baltistan
// 17 Candidate Dossiers · Evidentiary Standard: Court Direction vs Ecological Compliance
// ─────────────────────────────────────────────────────────────────────────────

import type { KEWRegion } from './kew-green-heroes';

export type LegalRole =
  | 'PETITIONER_LITIGANT'
  | 'COUNSEL_ADVOCATE'
  | 'AMICUS_CURIAE'
  | 'JUDICIAL_CONTRIBUTOR'
  | 'LEGAL_EDUCATOR'
  | 'GOVERNMENT_LEGAL_PROFESSIONAL'
  | 'PIL_ORIGINATOR'
  | 'FOUNDING_LEGAL_PIONEER';

export interface AdvocateContribution {
  year: number | string;
  title: string;
  legalForum: string;
  description: string;
  documentedOutcome: string;
  courtOrderCitation?: string;
}

export interface AdvocateSourceProvenance {
  title: string;
  url: string;
  recordType: string;
}

export interface EnvironmentalAdvocateDossier {
  id: string;
  name: string;
  honorific?: string;
  sortName?: string;
  sort_name?: string;
  legalRole: LegalRole;
  primaryDesignation: string;
  affiliationOrChamber: string;
  region: KEWRegion;
  districtOrCircuit: string;
  activeWindow: string;
  specializations: string[];
  specializationsSummary: string;
  editorialTribute: string;
  narrative: string;
  keyImpact: string;
  recognition?: string;
  dockets?: string[];
  caseReferences: string[];
  documentedContributions: AdvocateContribution[];
  sourceProvenance: AdvocateSourceProvenance[];
  legalStatus: string;
  evidentiaryNotes: string;
  crossClassification?: string;
  linkedKewModules: Array<{ label: string; url: string }>;
}

export interface LegalAdvocatesTelemetry {
  candidateDossiers: number;
  regionsCovered: string;
  petitionersCount: number;
  counselAndAmicusCount: number;
  judicialContributorsCount: number;
  legalEducatorsCount: number;
  foundingPioneersCount?: number;
  kewApproved: number;
  underEvidentiaryAudit: number;
  reviewDate: string;
}

export const LEGAL_ADVOCATES_REGISTRY_TELEMETRY: LegalAdvocatesTelemetry = {
  candidateDossiers: 18,
  regionsCovered: '5/5',
  petitionersCount: 4,
  counselAndAmicusCount: 6,
  judicialContributorsCount: 3,
  legalEducatorsCount: 4,
  foundingPioneersCount: 1,
  kewApproved: 0,
  underEvidentiaryAudit: 18,
  reviewDate: 'November 22, 2026'
};

export const LEGAL_ROLES_FRAMEWORK = [
  {
    role: 'Founding Legal Pioneer',
    requirement: 'Foundational constitutional litigation establishing national environmental jurisprudence (absolute liability, PIL standing) and court-appointed lake conservation expert oversight'
  },
  {
    role: 'Petitioner / Public-Interest Litigant',
    requirement: 'Who initiated the case, standing, and specific environmental remedies requested'
  },
  {
    role: 'Counsel / Advocate',
    requirement: 'Who represented which party, in which proceedings, and arguments placed on court record'
  },
  {
    role: 'Amicus Curiae',
    requirement: 'Official appointment and documented independent assistance delivered to the bench'
  },
  {
    role: 'Judicial Contributor',
    requirement: 'Specific binding orders, directions and judicial reasoning (recorded as institutional judicial actions, not personal activism)'
  },
  {
    role: 'Environmental Legal Educator',
    requirement: 'Educational program, audience, statutes covered and verifiable institutional activity'
  },
  {
    role: 'Government Legal Professional',
    requirement: 'Official legal representation, legislative drafting, and statutory regulatory compliance enforcement'
  }
];

export interface CrossRegionalSpecialist {
  name: string;
  sortName?: string;
  sort_name?: string;
  role: string;
  jurisdiction: string;
  documentedContribution: string;
  sourceLabel: string;
  sourceUrl: string;
}

export const CROSS_REGIONAL_LEGAL_SPECIALISTS: CrossRegionalSpecialist[] = [
  {
    name: 'Advocate Ritwick Dutta',
    role: 'Environmental Lawyer',
    jurisdiction: 'Supreme Court of India / National Green Tribunal (NGT)',
    documentedContribution: 'Practicing environmental lawyer who participated in Kashmir environmental-law proceedings and legal capacity roundtables on Western Himalayan forest clearances.',
    sourceLabel: 'Kashmir News Service (KNS)',
    sourceUrl: 'https://knskashmir.com'
  },
  {
    name: 'Advocate Rahul Chowdhary',
    role: 'Environmental Litigator',
    jurisdiction: 'National Green Tribunal (NGT) / High Court',
    documentedContribution: 'Participated in the April 2022 Srinagar legal roundtable concerning environmental degradation, riverbed mining impacts, and public-interest legal remedies.',
    sourceLabel: 'Greater Kashmir',
    sourceUrl: 'https://greaterkashmir.com'
  },
  {
    name: 'Advocate Saurabh Sharma',
    role: 'Counsel before NGT',
    jurisdiction: 'National Green Tribunal (Principal Bench, New Delhi)',
    documentedContribution: 'Represented community applicants before the NGT in 2026 concerning the siting, flood-plain vulnerability, and environmental clearance of the proposed Alouchibagh sewage treatment plant.',
    sourceLabel: 'Kashmir Life',
    sourceUrl: 'https://kashmirlife.net'
  },
  {
    name: 'Dr. Raja Muzaffar Bhat',
    role: 'Environmental PIL Petitioner & RTI Activist',
    jurisdiction: 'High Court of J&K and Ladakh / NGT',
    documentedContribution: 'Pioneering public-interest litigant on River Doodh Ganga pollution, Poonch legacy waste, and Jhelum floodplain encroachments. (Cross-registered under Environmental Advocates & RTI; not a practicing advocate).',
    sourceLabel: 'SANDRP / Kashmir Life',
    sourceUrl: 'https://sandrp.in'
  }
];

export const ENVIRONMENTAL_ADVOCATES_DOSSIERS: EnvironmentalAdvocateDossier[] = [
  // ─── Kashmir Valley (6 Candidates) ───────────────────────────────────────────
  {
    id: 'adv-001',
    name: 'Nadeem Qadri',
    honorific: 'Advocate',
    legalRole: 'COUNSEL_ADVOCATE',
    primaryDesignation: 'Environmental Lawyer | Legal Counsel & Amicus Curiae',
    affiliationOrChamber: 'Kashmir Environmental Protection · Wildlife Conservation Fund',
    region: 'Kashmir Valley',
    districtOrCircuit: 'Srinagar / Wular Lake / High Court Circuit',
    activeWindow: '2006–2026',
    specializations: ['Wetlands & Ramsar Sites', 'Encroachment Litigation', 'PIL Advocacy', 'Wildlife Law'],
    specializationsSummary: 'Wetland PIL litigation, amicus curiae in Wular Lake conservation, Ramsar management plans',
    editorialTribute: '“Using public-interest law to require accountability for Kashmir\'s threatened wetlands.”',
    narrative:
      'Advocate Nadeem Qadri is an environmental lawyer associated with long-running proceedings on wetland conservation, particularly the Wular Lake ecosystem. He has represented Kashmir Environmental Protection and served as amicus curiae in environmental proceedings before the High Court of Jammu & Kashmir and Ladakh. His conservation-related institutional associations also include the Wildlife Conservation Fund.',
    keyImpact: 'Judicial scrutiny of wetland encroachments, Ramsar conservation plans and administrative noncompliance',
    caseReferences: ['PIL No. 345/2006 (Wular Lake Protection)', 'WP(C) PIL Ramsar Wetland Management Plans 2026'],
    documentedContributions: [
      {
        year: '2006–2026',
        title: 'Kashmir Environmental Protection PIL No. 345/2006',
        legalForum: 'High Court of Jammu & Kashmir and Ladakh',
        description: 'Associated with long-running litigation concerning Wular Lake, wetland encroachments, demarcation boundaries, and conservation administration.',
        documentedOutcome: 'The High Court continued reviewing wetland conservation obligations and government compliance orders.',
        courtOrderCitation: 'HC Order in PIL 345/2006'
      },
      {
        year: 2026,
        title: 'Integrated Management Plans for Ramsar Wetlands',
        legalForum: 'High Court Direction',
        description: 'Appeared in proceedings where the High Court examined delays by the administration in submitting compliant wetland management plans for designated Ramsar sites.',
        documentedOutcome: 'Government directed to explain delays and the omission of other Ramsar sites from its initial proposals.',
        courtOrderCitation: 'LiveLaw Report, August 24, 2026'
      },
      {
        year: 2012,
        title: 'Chatlam Wetland Community Conservation Reserve Establishment',
        legalForum: 'Community Stewardship & Administrative Demarcation',
        description: 'Founded Wildlife Conservation Fund (2010) and mobilized local youth and village panchayats to halt bird poaching and construct siltation traps around Chatlam Wetland Reserve, Pampore.',
        documentedOutcome: 'Recognized as a precedent-setting model of community-managed wetland conservation in Kashmir.',
        courtOrderCitation: 'Sanctuary Nature Foundation & Wildlife Conservation Fund Archive'
      }
    ],
    sourceProvenance: [
      { title: 'LiveLaw: Ramsar Wetlands Management Plans Hearing (Aug 24, 2026)', url: 'https://livelaw.in', recordType: 'Legal Portal' },
      { title: 'Kashmir Life: Wular Lake Litigation & Environmental Protections', url: 'https://kashmirlife.net', recordType: 'Regional Media' },
      { title: 'High Court of J&K and Ladakh Registry: PIL 345/2006 Docket', url: 'https://jkhighcourt.nic.in', recordType: 'Court Record' },
      { title: 'Sanctuary Nature Foundation: Wildlife Conservation Fund Profile', url: 'https://sanctuarynaturefoundation.org', recordType: 'Conservation Profile' }
    ],
    legalStatus: 'COURT PARTICIPATION DOCUMENTED · Long-term ecological recovery not established',
    evidentiaryNotes: 'Court appearances and filings confirmed. A court order is not the same as completed wetland restoration; Wular sedimentation remains acute.',
    crossClassification: 'Environmental Advocates & Conservationists',
    linkedKewModules: [
      { label: 'Environmental PIL Portal', url: '/resources/environmental-pil' },
      { label: 'Wular Lake Scorecard', url: '/water-systems/lakes' },
      { label: 'Ramsar Wetlands', url: '/water-systems/wetlands' }
    ]
  },
  {
    id: 'adv-002',
    name: 'Zaffar Ahmad Shah',
    honorific: 'Senior Advocate',
    legalRole: 'AMICUS_CURIAE',
    primaryDesignation: 'Senior Advocate | Amicus Curiae in Dal, Nigeen and Anchar Lake PIL',
    affiliationOrChamber: 'High Court Bar Association / High Court of J&K and Ladakh',
    region: 'Kashmir Valley',
    districtOrCircuit: 'Srinagar / Dal Lake Circuit',
    activeWindow: '2002–2026',
    specializations: ['Urban Lake Conservation', 'Amicus Curiae', 'Sewage Infrastructure Audits', 'Building Permission Controls'],
    specializationsSummary: 'Sustained judicial scrutiny and amicus assistance in the 24-year Dal Lake continuing mandamus litigation',
    editorialTribute: '“Sustained legal scrutiny of the protection obligations owed to Kashmir\'s urban lakes.”',
    narrative:
      'Zaffar Ahmad Shah, identified in court records as Z. A. Shah, has served as amicus curiae in the long-running litigation concerning Dal Lake, Nigeen Lake, and Anchar Lake. An order dated November 17, 2026, records his submissions concerning earlier conservation directions, untreated municipal sewage, commercial encroachments, and the need for updated government compliance reports.',
    keyImpact: 'Continued judicial monitoring of Dal, Nigeen and Anchar Lake conservation obligations',
    caseReferences: ['PIL No. 159/2002 (Dal Lake Protection Matter)', 'Continuing Mandamus Orders 2002–2026'],
    documentedContributions: [
      {
        year: '2016–2018',
        title: 'Dal Lake Monitoring and Judicial Assistance',
        legalForum: 'High Court Memorialized Record',
        description: 'Participated as amicus curiae and was included in the high-powered lake monitoring committee overseeing de-weeding and resettlement.',
        documentedOutcome: 'Formal institutional involvement in the court-supervised conservation and compliance process.',
        courtOrderCitation: 'Lawsisto Memorialized Record'
      },
      {
        year: 2026,
        title: 'PIL No. 159/2002, Continuing Urban Lake Protection',
        legalForum: 'High Court Order (Nov 17, 2026)',
        description: 'Requested updated compliance data on untreated sewage, STPs functionality, illegal construction in green belt, and houseboat sanitation.',
        documentedOutcome: 'Court required further comprehensive status reporting and a summary of continuing non-compliance issues for next hearing.',
        courtOrderCitation: 'HC Order dated Nov 17, 2026'
      }
    ],
    sourceProvenance: [
      { title: 'High Court of J&K and Ladakh: Order in PIL 159/2002 (Nov 17, 2026)', url: 'https://jkhighcourt.nic.in', recordType: 'Court Order' },
      { title: 'Daily Excelsior: Dal Lake Judicial Supervision Proceedings', url: 'https://dailyexcelsior.com', recordType: 'Regional Media' },
      { title: 'Indian Kanoon: Dal Lake Conservation Orders', url: 'https://indiankanoon.org', recordType: 'Legal Database' }
    ],
    legalStatus: 'ONGOING LITIGATION · Amicus curiae verified; completed lake recovery unverified',
    evidentiaryNotes: 'Court records verified. Amicus curiae role confirmed. Continued judicial monitoring is evidentiary proof of legal oversight, not of completed lake ecological restoration.',
    crossClassification: 'Urban Water Systems & Judicial Amicus',
    linkedKewModules: [
      { label: 'Dal Lake Health Scorecard', url: '/water-systems/lakes' },
      { label: 'Environmental PIL Portal', url: '/resources/environmental-pil' },
      { label: 'Compliance Monitoring', url: '/environmental-monitoring' }
    ]
  },
  {
    id: 'adv-003',
    name: 'Shakir Parray',
    honorific: 'Advocate',
    legalRole: 'LEGAL_EDUCATOR',
    primaryDesignation: 'Environmental Lawyer | Legal Adviser, J&K Climate Action Group',
    affiliationOrChamber: 'J&K Climate Action Group / District Bar Srinagar',
    region: 'Kashmir Valley',
    districtOrCircuit: 'Srinagar / Budgam / Poonch',
    activeWindow: '2025–2026',
    specializations: ['Riverbed Mining Compliance', 'Municipal Solid Waste', 'Environmental Law Education', 'NGT Advocacy'],
    specializationsSummary: 'Legal advisory on riverbed mining violations, legacy waste remediation, and public environmental law clinics',
    editorialTribute: '“Environmental laws must be enforced beyond the courtroom.”',
    narrative:
      'Advocate Shakir Parray works on environmental legal issues including riverbed mining, municipal solid waste management, and environmental accountability. He is publicly identified as legal adviser to the J&K Climate Action Group and has participated in environmental-law education, legal clinics, and the monitoring of litigation-related compliance.',
    keyImpact: 'Legal advocacy concerning riverbed mining violations and municipal waste pollution',
    caseReferences: ['NGT OA on Poonch River Waste', 'Pulwama Environmental Law Roundtable 2026'],
    documentedContributions: [
      {
        year: 2026,
        title: 'Poonch River Legacy-Waste Accountability',
        legalForum: 'NGT-Related Public Legal Advocacy',
        description: 'Supported legal scrutiny of municipal solid waste dumping violations along the Poonch River corridor.',
        documentedOutcome: 'Approximately 1,900 metric tonnes of legacy waste were reported cleared following NGT directions in litigation initiated by Dr. Raja Muzaffar Bhat.',
        courtOrderCitation: 'Kashmir Life, May 2026'
      },
      {
        year: 2026,
        title: 'Sukhnag Riverbed Mining Legal Education',
        legalForum: 'Public Environmental Law Education',
        description: 'Delivered clinical legal training on environmental clearances, replenishment studies, and mining prohibitions at a Pulwama law-college roundtable.',
        documentedOutcome: 'Public legal training conducted; reinforced local community scrutiny over riverbed mining compliance.',
        courtOrderCitation: 'KNS News Report, 2026'
      }
    ],
    sourceProvenance: [
      { title: 'Kashmir Life: Poonch Municipal Waste Remediation Reporting', url: 'https://kashmirlife.net', recordType: 'Regional Media' },
      { title: 'Kashmir News Service (KNS): Environmental Law Roundtable', url: 'https://knskashmir.com', recordType: 'Press Report' }
    ],
    legalStatus: 'LEGAL ADVOCACY DOCUMENTED · Adviser role confirmed; primary petitioner status pending',
    evidentiaryNotes: 'Legal advocacy and public education verified. In the Poonch matter, documented role is legal adviser/advocate, not named petitioner.',
    linkedKewModules: [
      { label: 'Environmental PIL Portal', url: '/resources/environmental-pil' },
      { label: 'Riverbed Mining Audits', url: '/water-systems/rivers' }
    ]
  },
  {
    id: 'adv-004',
    name: 'Qazi Rashid Shams',
    honorific: 'Advocate',
    legalRole: 'PETITIONER_LITIGANT',
    primaryDesignation: 'Public-Interest Litigant | Environmental Protection of the Sindh River',
    affiliationOrChamber: 'High Court of Jammu & Kashmir and Ladakh',
    region: 'Kashmir Valley',
    districtOrCircuit: 'Sonamarg / Ganderbal / Sindh River',
    activeWindow: 'Year: 2011',
    specializations: ['Riverine Ecology', 'Master Planning Controls', 'Sonamarg Ecosensitive Zone', 'Construction Bans'],
    specializationsSummary: 'Original petitioner in PIL 404/2011 halting unregulated construction on River Sindh riparian zone',
    editorialTribute: '“Challenging pollution and construction pressures along the Sindh River.”',
    narrative:
      'Advocate Qazi Rashid Shams initiated environmental PIL No. 404/2011 concerning pollution, unauthorized constructions, and commercial encroachments along the Sindh River, especially around the ecologically fragile tourist hub of Sonamarg. The case evolved into continuing judicial supervision of Sonamarg master planning, river protection, and strict building controls.',
    keyImpact: 'Initiated litigation that developed into the High Court\'s landmark Sonamarg environmental monitoring proceedings',
    caseReferences: ['PIL No. 404/2011: Court on Its Own Motion v. State of J&K (Sonamarg Matter)'],
    documentedContributions: [
      {
        year: 2011,
        title: 'Sindh River and Sonamarg Environmental PIL',
        legalForum: 'High Court of Jammu & Kashmir',
        description: 'Filed public-interest litigation challenging unregulated commercial construction, hotel sewage dumping, and riparian encroachment along River Sindh.',
        documentedOutcome: 'Proceedings initiated; court took suo motu cognizance, restrained construction in non-permitted zones, and mandated master plan compliance.',
        courtOrderCitation: 'CaseMine: PIL 404/2011'
      }
    ],
    sourceProvenance: [
      { title: 'CaseMine: Court on Its Own Motion v. State of J&K, PIL 404/2011', url: 'https://casemine.com', recordType: 'Judicial Database' },
      { title: 'Greater Kashmir: Sonamarg Development Authority Judicial Directives', url: 'https://greaterkashmir.com', recordType: 'Regional Media' }
    ],
    legalStatus: 'HISTORICAL PIL DOCUMENTED · Precedent established for Sonamarg conservation',
    evidentiaryNotes: 'Historical case verified. Subsequent orders were issued in court-led continuing proceedings, not all personally attributable to original petitioner.',
    linkedKewModules: [
      { label: 'River Sindh Basin', url: '/water-systems/rivers' },
      { label: 'Environmental PIL Portal', url: '/resources/environmental-pil' }
    ]
  },
  {
    id: 'adv-005',
    name: 'Shafqat Nazir',
    honorific: 'Advocate',
    legalRole: 'COUNSEL_ADVOCATE',
    primaryDesignation: 'Legal Counsel | Environmental Policy Group (EPG)',
    affiliationOrChamber: 'Environmental Policy Group / High Court of J&K and Ladakh',
    region: 'Kashmir Valley',
    districtOrCircuit: 'Srinagar / High Court Circuit',
    activeWindow: '2024–2026',
    specializations: ['Civil Society Environmental Defense', 'Wetlands Mandamus', 'Lake Conservation Advocacy'],
    specializationsSummary: 'Legal representation for civil society coalition in Dal Lake and regional water body preservation hearings',
    editorialTribute: '“Providing courtroom voice to regional conservation coalitions.”',
    narrative:
      'Advocate Shafqat Nazir is identified as legal adviser to the Environmental Policy Group (EPG). He appeared in 2024 and 2026 proceedings concerning Dal Lake, highlighting deficiencies in sewerage networks, lake siltation, and delays in notifying eco-sensitive zones.',
    keyImpact: 'Legal representation ensuring civil society environmental petitions maintain formal standing before the High Court',
    caseReferences: ['Dal Lake Compliance Proceedings 2026', 'EPG Environmental Representations 2024'],
    documentedContributions: [
      {
        year: '2024–2026',
        title: 'Dal Lake Civil Society Submissions',
        legalForum: 'High Court of J&K and Ladakh',
        description: 'Appeared in environmental hearings placing civil society findings on lake perimeter encroachments and de-weeding contracts onto court record.',
        documentedOutcome: 'Submissions recorded in order sheets; contributed to court\'s direction requiring updated compliance audits.',
        courtOrderCitation: 'HC Order Sheet 2026'
      }
    ],
    sourceProvenance: [
      { title: 'Indian Kanoon: Dal Lake Proceedings 2026', url: 'https://indiankanoon.org', recordType: 'Legal Database' },
      { title: 'EPG Official Directory: Legal Advisory Panel', url: 'https://epgonline.org', recordType: 'Civil Society Roster' }
    ],
    legalStatus: 'REPRESENTATION DOCUMENTED · Counsel appearance confirmed',
    evidentiaryNotes: 'Appeared as counsel for environmental society. Standing and court appearances verified in official order sheets.',
    linkedKewModules: [
      { label: 'Dal Lake Health Scorecard', url: '/water-systems/lakes' },
      { label: 'Environmental PIL Portal', url: '/resources/environmental-pil' }
    ]
  },
  {
    id: 'adv-006',
    name: 'Syed Iqbal Tahir Geelani',
    honorific: 'Mr.',
    legalRole: 'PIL_ORIGINATOR',
    primaryDesignation: 'Environmental PIL Originator | Initiator of Landmark Dal Lake Matter (PIL 159/2002)',
    affiliationOrChamber: 'Original Petitioner (Initiated as LLB Student)',
    region: 'Kashmir Valley',
    districtOrCircuit: 'Srinagar / Dal Lake',
    activeWindow: 'Year: 2002',
    specializations: ['Public-Interest Letter Petitions', 'Citizen Legal Standing', 'Dal Lake Restoration'],
    specializationsSummary: 'Penned the foundational 2002 letter petition converted into the historic continuing PIL 159/2002',
    editorialTribute: '“A student letter that triggered two decades of judicial supervision over Kashmir\'s iconic lake.”',
    narrative:
      'Syed Iqbal Tahir Geelani initiated the landmark Dal Lake public-interest matter in 2002 through a handwritten letter sent to the High Court of Jammu & Kashmir while an LLB law student. The court treated the letter as a formal petition, registered PIL No. 159/2002 (Syed Iqbal Tahir Geelani v. State of J&K), which remains the foundational continuous judicial monitoring vehicle for Srinagar\'s lakes over the past 24 years.',
    keyImpact: 'Originated the longest-running, most consequential environmental continuing mandamus docket in Western Himalayan history',
    caseReferences: ['PIL No. 159/2002: Syed Iqbal Tahir Geelani v. State of J&K & Ors.'],
    documentedContributions: [
      {
        year: 2002,
        title: 'Dal Lake Letter Petition Conversion',
        legalForum: 'High Court of Jammu & Kashmir',
        description: 'Authored letter highlighting the dying state of Dal Lake, raw sewage inflow, encroachment by commercial houseboats, and municipal inertia.',
        documentedOutcome: 'Letter registered as PIL 159/2002; established continuous judicial monitoring that has yielded hundreds of binding environmental directions.',
        courtOrderCitation: 'HC Order Registering PIL 159/2002'
      }
    ],
    sourceProvenance: [
      { title: 'Indian Kanoon: Syed Iqbal Tahir Geelani v. State of J&K (PIL 159/2002)', url: 'https://indiankanoon.org', recordType: 'Court Record' },
      { title: 'Kashmir Observer: The Story Behind the Dal Lake PIL', url: 'https://kashmirobserver.net', recordType: 'Media History' }
    ],
    legalStatus: 'PIL ORIGINATOR DOCUMENTED · Category explicitly defined as PIL Originator',
    evidentiaryNotes: 'Historical originator verified. Current professional practice as an advocate is unverified; designated accurately as Environmental PIL Originator.',
    linkedKewModules: [
      { label: 'Dal Lake Health Scorecard', url: '/water-systems/lakes' },
      { label: 'Environmental PIL Portal', url: '/resources/environmental-pil' }
    ]
  },

  // ─── Jammu (4 Candidates) ───────────────────────────────────────────────────
  {
    id: 'adv-018',
    name: 'Mahesh Chander Mehta (M. C. Mehta)',
    honorific: 'Advocate',
    legalRole: 'FOUNDING_LEGAL_PIONEER',
    primaryDesignation: 'Supreme Court Environmental Lawyer | Founder, M. C. Mehta Environmental Foundation',
    affiliationOrChamber: 'Supreme Court Bar Association / J&K High Court Bar / M. C. Mehta Environmental Foundation',
    region: 'Jammu',
    districtOrCircuit: 'Rajouri',
    activeWindow: '1985–Present',
    specializations: [
      'Constitutional Environmental Law',
      'Absolute Liability',
      'PIL & River Protection',
      'Lake Conservation Committees'
    ],
    specializationsSummary: 'Absolute liability, public-interest environmental litigation, Ganga & Tawi river conservation, Dal & Wular lake expert committee oversight',
    editorialTribute: '“A founding pioneer of modern Indian environmental public-interest litigation and judicial accountability for ecological harm.”',
    narrative:
      'Born on October 12, 1946, in Rajouri district, Jammu and Kashmir, M. C. Mehta studied law at the University of Jammu and began his legal career before the Jammu and Kashmir High Court. He subsequently became internationally recognized for public-interest environmental litigation before the Supreme Court of India. His cases contributed to landmark judicial principles governing hazardous industries, river pollution, industrial emissions, environmental health and the constitutional protection of life. His connection to Western Himalayan conservation is particularly significant. In 2018, the Jammu and Kashmir High Court appointed him to its Committee of Experts on Dal Lake. In 2020, the court extended the committee\'s advisory mandate to Wular Lake and other water bodies.',
    keyImpact: 'Foundational environmental litigation that shaped Indian pollution-control jurisprudence, together with court-appointed expert participation in Kashmir\'s lake-conservation proceedings.',
    recognition: 'Goldman Environmental Prize (1996) · Ramon Magsaysay Award (1997) · Padma Shri (2016)',
    dockets: [
      'W.P. (Civil) 12739/1985, Oleum Gas Leak',
      'W.P. (Civil) 3727/1985, Ganga Pollution',
      'M. C. Mehta v. Union of India, Taj Trapezium Matter',
      'PIL 159/2002, Dal Lake Protection, Committee of Experts',
      'Central Auqaf Committee Tarzoo proceedings, Wular Lake'
    ],
    caseReferences: [
      'Oleum Gas Leak (W.P. Civil 12739/1985)',
      'Ganga Pollution (W.P. Civil 3727/1985)',
      'Taj Trapezium Matter (M. C. Mehta v. UOI)',
      'PIL 159/2002 (Dal Lake Committee of Experts)',
      'Wular Lake Conservation Proceedings (2020)'
    ],
    documentedContributions: [
      {
        year: 1986,
        title: 'Oleum Gas Leak and Absolute Liability',
        legalForum: 'Supreme Court Constitution Bench',
        description: 'His petition concerning hazardous industrial operations became the basis for a landmark Supreme Court judgment establishing absolute liability for harm caused by inherently dangerous enterprises.',
        documentedOutcome: 'The Supreme Court articulated the absolute-liability principle governing hazardous industrial activity.',
        courtOrderCitation: '1987 SCR (1) 819 / AIR 1987 SC 1086'
      },
      {
        year: 1987,
        title: 'Ganga River Industrial Pollution',
        legalForum: 'Supreme Court Environmental Judgment',
        description: 'Challenged untreated industrial effluent discharged into the Ganga, including toxic pollution from tanneries.',
        documentedOutcome: 'Supreme Court directions addressing industrial effluent treatment and regulatory compliance.',
        courtOrderCitation: '1988 SCR (1) 279 / AIR 1988 SC 1037'
      },
      {
        year: 1996,
        title: 'Taj Trapezium Industrial Emissions',
        legalForum: 'Supreme Court Environmental Judgment',
        description: 'Brought legal scrutiny to industrial air pollution threatening the Taj Mahal and surrounding communities.',
        documentedOutcome: 'The Supreme Court issued directions covering 292 identified industries, requiring transition to cleaner fuels or operational restrictions.',
        courtOrderCitation: '(1997) 2 SCC 353 / AIR 1997 SC 734'
      },
      {
        year: 2018,
        title: 'Dal Lake Conservation Committee of Experts',
        legalForum: 'Jammu & Kashmir High Court',
        description: 'Appointed to the court\'s Committee of Experts for Dal Lake restoration, environmental monitoring, encroachment concerns, sewage treatment and institutional compliance.',
        documentedOutcome: 'The committee submitted expert recommendations and the High Court issued further conservation and monitoring directions.',
        courtOrderCitation: 'PIL 159/2002 J&K High Court Order dated 2018'
      },
      {
        year: 2020,
        title: 'Wular Lake and Kashmir Waterbody Protection',
        legalForum: 'Jammu & Kashmir High Court',
        description: 'The High Court extended the Committee of Experts\' responsibilities to evaluating Wular Lake and other water bodies.',
        documentedOutcome: 'Judicially authorized expert review and recommendations concerning protection, rejuvenation and management of additional water bodies.',
        courtOrderCitation: 'J&K High Court Order in Wular Lake Conservation (2020)'
      }
    ],
    sourceProvenance: [
      {
        title: 'Supreme Court of India: Oleum Gas Leak Judgment (1986)',
        url: 'https://indiankanoon.org/doc/1486949/',
        recordType: 'Supreme Court Constitution Bench'
      },
      {
        title: 'Supreme Court of India: Ganga Pollution Judgment (1987)',
        url: 'https://indiankanoon.org/doc/1208005/',
        recordType: 'Supreme Court Environmental Judgment'
      },
      {
        title: 'Supreme Court of India: Taj Trapezium Judgment (1996)',
        url: 'https://indiankanoon.org/doc/1964392/',
        recordType: 'Supreme Court Environmental Judgment'
      },
      {
        title: 'J&K High Court: Dal Lake Committee of Experts (2018)',
        url: 'https://indiankanoon.org/doc/52574074/',
        recordType: 'High Court Expert Committee Appointment'
      },
      {
        title: 'J&K High Court: Wular Lake Expert Mandate (2020)',
        url: 'https://indiankanoon.org/doc/74974004/',
        recordType: 'High Court Extended Waterbody Mandate'
      },
      {
        title: 'Goldman Environmental Prize: Official Recipient Biography',
        url: 'https://www.goldmanprize.org/recipient/mc-mehta/',
        recordType: 'Goldman Environmental Prize (1996)'
      },
      {
        title: 'Ramon Magsaysay Award Foundation: Official Recipient Record',
        url: 'https://rmaward.asia/rmawardees/mehta-mahesh-chander/',
        recordType: 'Ramon Magsaysay Award (1997)'
      }
    ],
    legalStatus: 'FOUNDATIONAL JUDICIAL CONTRIBUTIONS DOCUMENTED · Primary judicial decisions available · KEW editorial approval pending',
    evidentiaryNotes: 'Founding legal pioneer is an editorial classification, not an officially conferred title. Catalogued in the living Advocates & Legal Professionals directory as a foundational figure. All five principal legal proceedings are supported by original Supreme Court judgments or J&K High Court orders.',
    crossClassification: 'Founding Environmental Legal Pioneer',
    linkedKewModules: [
      { label: 'Environmental PIL & Legal Dockets', url: '/resources/environmental-pil' },
      { label: 'SEIAE Scientific Reports', url: '/sectoral-eia' },
      { label: 'Dal Lake Environmental Monitoring', url: '/water-systems/lakes' },
      { label: 'Wular Lake Conservation', url: '/water-systems/wetlands' },
      { label: 'Pollution Control & Compliance', url: '/environmental-monitoring/air-pollution' },
      { label: 'Environmental Legal Education', url: '/resources/environmental-pil' },
      { label: 'Environmental Legacy & Legal History', url: '/resources' }
    ]
  },
  {
    id: 'adv-007',
    name: 'Dewakar Sharma',
    honorific: 'Advocate',
    legalRole: 'PETITIONER_LITIGANT',
    primaryDesignation: 'Advocate and Environmental PIL Petitioner | Save My Tawi Campaign',
    affiliationOrChamber: 'Jammu High Court Bar / Save My Tawi Campaign',
    region: 'Jammu',
    districtOrCircuit: 'Jammu City / Tawi River Basin',
    activeWindow: '2014–2021',
    specializations: ['Riverbed Mining Litigation', 'Riparian Encroachments', 'Municipal Sewage Pollution', 'Tawi River Basin'],
    specializationsSummary: 'Filed landmark Tawi River PILs restraining construction and triggering police checkpoints against illegal night mining',
    editorialTribute: '“Protecting the Tawi River through legal action against encroachment and illegal extraction.”',
    narrative:
      'Advocate Dewakar Sharma (also reported as Diwakar Sharma) filed public-interest litigation in the High Court involving rampant encroachment, unauthorized commercial construction, raw municipal sewage discharge, and illegal motorized mining along the Tawi River bed. The petitions led to landmark orders restraining construction from Nagrota to Phallian Mandal and mandating multi-agency anti-mining checkpoints.',
    keyImpact: 'Judicial directions restraining Tawi River encroachments and curbing nighttime riverbed mining',
    caseReferences: ['Save My Tawi PIL (2014)', 'Tawi Mining Enforcement Orders (2017–2021)'],
    documentedContributions: [
      {
        year: 2014,
        title: 'Save My Tawi Environmental PIL',
        legalForum: 'High Court of Jammu & Kashmir (Jammu Wing)',
        description: 'Filed comprehensive litigation concerning illegal construction, property transactions, and commercial encroachments on the Tawi River bed.',
        documentedOutcome: 'High Court restrained further construction and certain transactions along the entire riverbed stretch from Nagrota to Phallian Mandal.',
        courtOrderCitation: 'Early Times, September 2014'
      },
      {
        year: '2017–2021',
        title: 'Illegal Mining & Riverbank Compliance Scrutiny',
        legalForum: 'High Court Directions & Monitoring Orders',
        description: 'Pursued active scrutiny of heavy mechanized night mining, encroachment removal, and municipal sewage treatment plant setup.',
        documentedOutcome: 'Court ordered establishment of dedicated police checkpoints, seizure of offending JCBs/tippers, and monthly status filings.',
        courtOrderCitation: 'Daily Excelsior, November 2021'
      }
    ],
    sourceProvenance: [
      { title: 'Early Times: High Court Injunction on Tawi Bed Construction (Sept 2014)', url: 'https://earlytimes.in', recordType: 'Regional Press' },
      { title: 'Daily Excelsior: Tawi River Encroachment & Mining Hearing (Nov 2021)', url: 'https://dailyexcelsior.com', recordType: 'Regional Press' }
    ],
    legalStatus: 'COURT-DOCUMENTED LITIGATION · Landmark riverbed injunctions established',
    evidentiaryNotes: 'Litigation and court directions confirmed. Note: Court-ordered restrictions did not fully halt surreptitious extraction; ground compliance audits remain ongoing.',
    linkedKewModules: [
      { label: 'Tawi River Basin', url: '/water-systems/rivers' },
      { label: 'Environmental PIL Portal', url: '/resources/environmental-pil' },
      { label: 'Riverbed Mining Audits', url: '/water-systems' }
    ]
  },
  {
    id: 'adv-008',
    name: 'Sunil Sethi',
    honorific: 'Senior Advocate',
    legalRole: 'COUNSEL_ADVOCATE',
    primaryDesignation: 'Senior Advocate | Counsel in Tawi River Environmental Litigation',
    affiliationOrChamber: 'High Court Bar Association Jammu / Senior Bar',
    region: 'Jammu',
    districtOrCircuit: 'Jammu / Tawi River Circuit',
    activeWindow: 'Year: 2017',
    specializations: ['Environmental Litigation Representation', 'Mining Statutory Enforcement', 'Court Injunctions'],
    specializationsSummary: 'Represented petitioner in high-profile Tawi River proceedings compelling nighttime extraction crackdowns',
    editorialTribute: '“Courtroom representation addressing unauthorized extraction from riverbeds.”',
    narrative:
      'Senior Advocate Sunil Sethi represented petitioner Advocate Dewakar Sharma in high-profile proceedings concerning the illegal extraction of minor minerals from the Tawi River bed. Reporting on the 2017 hearing records his arguments on regulatory non-enforcement, flouting of earlier stay orders, and severe riverbank erosion.',
    keyImpact: 'Legal representation compelling judicial orders for night-mining checkpoints and administrative accountability',
    caseReferences: ['Tawi River Extraction Enforcement Proceedings (2017)'],
    documentedContributions: [
      {
        year: 2017,
        title: 'Tawi River Night-Mining Enforcement Proceedings',
        legalForum: 'High Court of Jammu & Kashmir',
        description: 'Argued evidence demonstrating widespread nighttime motorized excavation in direct violation of court restrictions.',
        documentedOutcome: 'High Court directed immediate administrative measures, including dedicated police checkpoints and equipment seizures.',
        courtOrderCitation: 'Daily Excelsior Hearing Report, 2017'
      }
    ],
    sourceProvenance: [
      { title: 'Daily Excelsior: Tawi Mining Hearing Report 2017', url: 'https://dailyexcelsior.com', recordType: 'Court Report' }
    ],
    legalStatus: 'COUNSEL APPEARANCE DOCUMENTED · Specific hearing arguments confirmed',
    evidentiaryNotes: 'Senior counsel appearance verified. Individual contribution limited to verified hearing representation.',
    linkedKewModules: [
      { label: 'Tawi River Basin', url: '/water-systems/rivers' },
      { label: 'Environmental PIL Portal', url: '/resources/environmental-pil' }
    ]
  },
  {
    id: 'adv-009',
    name: 'Raman Sharma',
    honorific: 'Mr.',
    legalRole: 'PETITIONER_LITIGANT',
    primaryDesignation: 'Environmental Co-Petitioner & Activist | Save My Tawi Campaign',
    affiliationOrChamber: 'Save My Tawi Campaign / Citizen Litigant Panel',
    region: 'Jammu',
    districtOrCircuit: 'Jammu City',
    activeWindow: 'Year: 2014',
    specializations: ['Citizen Public-Interest Petitions', 'RTI on River Encroachments', 'Civic Mobilization'],
    specializationsSummary: 'Co-petitioner alongside Dewakar Sharma in the 2014 Tawi River bed encroachment PIL',
    editorialTribute: '“Citizen participation demanding legal accountability for urban rivers.”',
    narrative:
      'Raman Sharma is named alongside Dewakar Sharma in the landmark 2014 Tawi River PIL as co-founder of the Save My Tawi campaign. While not a practicing advocate by profession, his documented civic activism and co-petitioning role provided essential ground evidence for the judicial injunction on riverbed transactions.',
    keyImpact: 'Citizen co-petitioning establishing community standing in riverbed conservation litigation',
    caseReferences: ['Save My Tawi PIL (2014)'],
    documentedContributions: [
      {
        year: 2014,
        title: 'Tawi Riverbed Injunction Co-Petition',
        legalForum: 'High Court of Jammu & Kashmir',
        description: 'Co-initiated the public-interest docket challenging unlawful revenue transactions and constructions on the Tawi floodway.',
        documentedOutcome: 'Injunction granted restraining revenue authorities from registering deeds on the designated river area.',
        courtOrderCitation: 'Early Times, September 2014'
      }
    ],
    sourceProvenance: [
      { title: 'Early Times Newspaper Jammu: Save My Tawi Founders Dossier', url: 'https://earlytimes.in', recordType: 'Regional Press' }
    ],
    legalStatus: 'CITIZEN PARTICIPANT DOCUMENTED · Explicitly designated as citizen co-petitioner, not advocate',
    evidentiaryNotes: 'Verified as citizen co-petitioner. Strictly distinguished from professional lawyers to maintain professional registry accuracy.',
    linkedKewModules: [
      { label: 'Tawi River Basin', url: '/water-systems/rivers' },
      { label: 'Community Green Heroes', url: '/resources/kew-green-heroes' }
    ]
  },

  // ─── Ladakh (3 Candidates) ──────────────────────────────────────────────────
  {
    id: 'adv-010',
    name: 'Tonyot Gyaltson',
    honorific: 'Advocate',
    legalRole: 'LEGAL_EDUCATOR',
    primaryDesignation: 'Advocate & Legal Professional | Legal Assistant, Law & Justice Establishment',
    affiliationOrChamber: 'District Bar Leh / Ladakh Administration Law Department',
    region: 'Ladakh',
    districtOrCircuit: 'Leh',
    activeWindow: '2022–2026',
    specializations: ['Trans-Himalayan Environmental Law', 'Glacier Protection Frameworks', 'Tourism Carrying Capacity', 'Water Law'],
    specializationsSummary: 'Authored legal commentaries on Ladakh\'s fragile mountain ecology and legal safeguards against tourism pollution',
    editorialTribute: '“Balancing economic development with the protection of Ladakh\'s fragile ecology.”',
    narrative:
      'Tonyot Gyaltson authored a May 2022 environmental-law commentary on Ladakh\'s fragile cold-desert ecosystem, addressing rapid groundwater depletion, glacial melt vulnerability, Ramsar wetlands, wildlife corridors, and plastic pollution. The publication identifies him as a practicing advocate in Leh with previous experience at an environmental law firm in New Delhi. He was subsequently appointed as a Legal Assistant in the Ladakh administration\'s Law and Justice establishment.',
    keyImpact: 'Published legal and environmental policy commentary on Ladakh\'s fragile mountain ecosystems',
    caseReferences: ['Ladakh Fragile Ecosystem Legal Commentary (2022)'],
    documentedContributions: [
      {
        year: 2022,
        title: 'Ladakh\'s Fragile Ecosystem: Legal & Policy Critique',
        legalForum: 'Published Environmental Law Commentary',
        description: 'Analyzed groundwater depletion, unchecked tourist footprint, solid waste crisis in Leh, and the imperative for statutory ecological zoning.',
        documentedOutcome: 'Published reference commentary widely cited in regional sustainable development dialogues.',
        courtOrderCitation: 'Reach Ladakh, May 3, 2022'
      }
    ],
    sourceProvenance: [
      { title: 'Reach Ladakh: Ladakh\'s Fragile Ecosystem (May 3, 2022)', url: 'https://reachladakh.com', recordType: 'Regional Publication' },
      { title: 'Administration of UT Ladakh: Law and Justice Professional Listing', url: 'https://ladakh.gov.in', recordType: 'Official Government Register' }
    ],
    legalStatus: 'LEGAL COMMENTARY DOCUMENTED · Environmental litigation record pending',
    evidentiaryNotes: 'Professional identity and legal commentary verified. Court-based environmental PIL litigation has not yet been filed.',
    linkedKewModules: [
      { label: 'Ladakh Glaciers & Hydrology', url: '/water-systems/glaciers' },
      { label: 'Environmental PIL Portal', url: '/resources/environmental-pil' }
    ]
  },
  {
    id: 'adv-011',
    name: 'Nissar Hussain',
    honorific: 'Advocate',
    legalRole: 'LEGAL_EDUCATOR',
    primaryDesignation: 'Assistant Legal Aid Defence Counsel | District Legal Services Authority (DLSA), Kargil',
    affiliationOrChamber: 'District Legal Services Authority, Kargil / Ladakh Administration',
    region: 'Ladakh',
    districtOrCircuit: 'Kargil / Sankoo / Fokar',
    activeWindow: '2025–2026',
    specializations: ['Environmental Statutes Education', 'Water Act Enforcement', 'Constitutional Environmental Duties (Art 51A(g))', 'Biodiversity Law'],
    specializationsSummary: 'Delivers official environmental law education across Kargil and remote Suru Valley community clusters',
    editorialTribute: '“Environmental legal awareness supports community participation in protecting natural resources.”',
    narrative:
      'Advocate Nissar Hussain is a legal-aid professional serving as Assistant Legal Aid Defence Counsel with the District Legal Services Authority, Kargil. Official Ladakh administration reports document his educational programs on environmental statutes, water pollution, biodiversity protection, and constitutional environmental duties under Article 51A(g).',
    keyImpact: 'Grassroots environmental law education for students and remote Himalayan communities',
    caseReferences: ['World Environment Day DLSA Kargil (2025)', 'Fokar Biodiversity Legal Clinic (2026)'],
    documentedContributions: [
      {
        year: 2025,
        title: 'World Environment Day Legal Awareness Session',
        legalForum: 'Official Government & DLSA Event Record',
        description: 'Instructed students and community participants on the Environment (Protection) Act 1986 and Water (Prevention & Control of Pollution) Act 1974.',
        documentedOutcome: 'Legal awareness delivered across multiple Kargil secondary and higher educational institutions.',
        courtOrderCitation: 'DLSA Kargil Administrative Bulletin 2025'
      },
      {
        year: 2026,
        title: 'Biodiversity Awareness Legal Program, Fokar',
        legalForum: 'Official Government Event Record',
        description: 'Addressed trans-Himalayan biodiversity conservation, wildlife protection legislation, and citizen legal rights during field-awareness camps.',
        documentedOutcome: 'Public legal education integrated into rural biodiversity preservation initiatives.',
        courtOrderCitation: 'Ladakh Admin Bulletin 2026'
      }
    ],
    sourceProvenance: [
      { title: 'Administration of UT Ladakh: DLSA Kargil Official Activity Bulletin 2025', url: 'https://ladakh.gov.in', recordType: 'Government Record' },
      { title: 'District Legal Services Authority Kargil: Lawyer Roster', url: 'https://kargil.nic.in', recordType: 'Official Directory' }
    ],
    legalStatus: 'GOVERNMENT DOCUMENTED · Statutory education confirmed; litigation pending',
    evidentiaryNotes: 'Official government legal-aid activities verified. No individual environmental litigation casework located in this review.',
    linkedKewModules: [
      { label: 'Environmental PIL Portal', url: '/resources/environmental-pil' },
      { label: 'Community Education', url: '/environmental-calendar' }
    ]
  },
  {
    id: 'adv-012',
    name: 'Zarina Banoo',
    honorific: 'Advocate',
    legalRole: 'LEGAL_EDUCATOR',
    primaryDesignation: 'Deputy Chief Legal Aid Defence Counsel | District Legal Services Authority, Kargil',
    affiliationOrChamber: 'District Legal Services Authority, Kargil',
    region: 'Ladakh',
    districtOrCircuit: 'Kargil',
    activeWindow: 'Year: 2025',
    specializations: ['National Green Tribunal Act', 'Constitutional Environmental Rights', 'Biodiversity Legislation', 'Women in Environmental Law'],
    specializationsSummary: 'Public legal education on National Green Tribunal accessibility and citizen remedies for pollution',
    editorialTribute: '“Making environmental rights and legal responsibilities understandable to the public.”',
    narrative:
      'Advocate Zarina Banoo is a senior legal-aid professional serving as Deputy Chief Legal Aid Defence Counsel in Kargil. During official World Environment Day programs, she delivered detailed briefings on the National Green Tribunal Act 2010, the constitutional mandate for nature stewardship, and citizen access to environmental justice.',
    keyImpact: 'Demystifying the National Green Tribunal and environmental remedies for remote mountainous populations',
    caseReferences: ['Kargil Legal Aid Environmental Rights Forum (2025)'],
    documentedContributions: [
      {
        year: 2025,
        title: 'Environmental Legislation and Legal Awareness Program',
        legalForum: 'Official Government & DLSA Event Record',
        description: 'Educated border-district residents on how to access the NGT, file complaints regarding solid waste dumping, and invoke statutory environmental protections.',
        documentedOutcome: 'Government-reported legal-aid seminar empowering local residents on pollution remedies.',
        courtOrderCitation: 'DLSA Kargil World Environment Day Bulletin'
      }
    ],
    sourceProvenance: [
      { title: 'Official World Environment Day Record: DLSA Kargil Bulletin', url: 'https://ladakh.gov.in', recordType: 'Government Report' },
      { title: 'Ladakh Legal Services Authority Lawyer Register', url: 'https://kargil.nic.in', recordType: 'Official Register' }
    ],
    legalStatus: 'GOVERNMENT DOCUMENTED · Legal-aid credentials and education confirmed',
    evidentiaryNotes: 'Official legal-aid appointment and educational programs verified. Court-based casework pending.',
    linkedKewModules: [
      { label: 'Environmental PIL Portal', url: '/resources/environmental-pil' }
    ]
  },

  // ─── Azad Jammu & Kashmir (2 Candidates) ────────────────────────────────────
  {
    id: 'adv-013',
    name: 'Syed Zulqarnain Raza Naqvi',
    honorific: 'Advocate',
    legalRole: 'COUNSEL_ADVOCATE',
    primaryDesignation: 'High Court Advocate | Counsel in Neelum Valley Forest Protection Litigation',
    affiliationOrChamber: 'High Court & Supreme Court Bar of AJ&K / Muzaffarabad Circuit',
    region: 'Azad Jammu & Kashmir',
    districtOrCircuit: 'Neelum Valley / Muzaffarabad Circuit',
    activeWindow: 'Year: 2023',
    specializations: ['Forest Conservation Law', 'Timber Extraction Injunctions', 'Riparian Ecosystem Rights', 'High Court Litigation'],
    specializationsSummary: 'Obtained High Court stay suspending timber auction notices and prohibiting transport of raw timber out of Neelum Valley',
    editorialTribute: '“Using forest legislation to challenge timber extraction and transportation in a vulnerable mountain valley.”',
    narrative:
      'Advocate Syed Zulqarnain Raza Naqvi represented civil society petitioner Mumtaz Ahmed in landmark litigation before the High Court of Azad Jammu & Kashmir challenging timber-auction notices and the transportation of green-felled raw timber outside Neelum Valley. His submissions invoked statutory forest regulations, environmental safeguards, and local community rights in the face of rapid deforestation and landslide vulnerability.',
    keyImpact: 'Interim judicial suspension of disputed commercial timber auctions and raw timber transportation in Neelum Valley',
    caseReferences: ['Mumtaz Ahmed v. Forest Department & Ors. (AJ&K High Court 2023)'],
    documentedContributions: [
      {
        year: 2023,
        title: 'Neelum Valley Forest-Timber Litigation Injunction',
        legalForum: 'High Court of Azad Jammu & Kashmir (Muzaffarabad)',
        description: 'Argued petition challenging Forest Department auction tenders that permitted raw timber transport out of ecologically fragile Neelum Valley.',
        documentedOutcome: 'On April 27, 2023, the High Court issued an interim order suspending the operation of two tender notices and restraining transportation of raw timber outside Neelum Valley.',
        courtOrderCitation: 'Dawn Court Report, April 28, 2023'
      }
    ],
    sourceProvenance: [
      { title: 'Dawn: AJ&K High Court Restrains Raw Wood Transport (April 28, 2023)', url: 'https://dawn.com', recordType: 'National Newspaper' },
      { title: 'AJ&K Supreme Court Advocate Record & High Court Docket', url: 'https://ajkhighcourt.gok.pk', recordType: 'Court Registry' }
    ],
    legalStatus: 'COURT-DOCUMENTED INJUNCTION · Representation and interim timber stay verified',
    evidentiaryNotes: 'Representation and interim stay confirmed. Final decision and long-term administrative compliance require ongoing registry tracking.',
    linkedKewModules: [
      { label: 'Forest Ecosystems', url: '/biodiversity/forest-ecosystems' },
      { label: 'Environmental PIL Portal', url: '/resources/environmental-pil' }
    ]
  },
  {
    id: 'adv-014',
    name: 'Sadaqat Hussain Raja',
    honorific: 'Justice',
    legalRole: 'JUDICIAL_CONTRIBUTOR',
    primaryDesignation: 'Chief Justice (Then), High Court of Azad Jammu & Kashmir',
    affiliationOrChamber: 'High Court of Azad Jammu & Kashmir',
    region: 'Azad Jammu & Kashmir',
    districtOrCircuit: 'Muzaffarabad Circuit',
    activeWindow: 'Year: 2023',
    specializations: ['Judicial Environmental Governance', 'Forest Resource Injunctions', 'Constitutional Mandates'],
    specializationsSummary: 'Issued binding interim order suspending commercial timber auction notices in Neelum Valley pending ecological review',
    editorialTribute: '“Judicial examination of forest-resource governance and timber-auction legality.”',
    narrative:
      'As Chief Justice of the High Court of Azad Jammu & Kashmir, Justice Sadaqat Hussain Raja presided over the 2023 Neelum Valley forest-timber matter. Hearing submissions regarding unchecked deforestation and regulatory non-compliance, he issued an order on April 27, 2023, halting disputed auction notices and prohibiting the movement of raw timber outside the valley.',
    keyImpact: 'Judicial protection of Neelum Valley forests through binding interim orders',
    caseReferences: ['Order in Forest Petition, AJ&K High Court (April 27, 2023)'],
    documentedContributions: [
      {
        year: 2023,
        title: 'Neelum Valley Forest Resource Protection Order',
        legalForum: 'High Court of Azad Jammu & Kashmir',
        description: 'Heard arguments on forest legislation compliance, timber auction validity, and community environmental rights.',
        documentedOutcome: 'Issued binding interim suspension of two timber auction tenders and restrained raw timber transportation pending full hearing.',
        courtOrderCitation: 'Reported in Dawn, April 28, 2023'
      }
    ],
    sourceProvenance: [
      { title: 'Dawn Court Report: High Court Order on Forest Auctions', url: 'https://dawn.com', recordType: 'Court Reporting' },
      { title: 'High Court of Azad Jammu & Kashmir Official Order Sheet', url: 'https://ajkhighcourt.gok.pk', recordType: 'Judicial Portal' }
    ],
    legalStatus: 'JUDICIAL ACTION DOCUMENTED · Record classified as judicial institutional contribution',
    evidentiaryNotes: 'Judicial order verified. Recorded as a judicial institutional contribution, not as personal advocacy or activism.',
    linkedKewModules: [
      { label: 'Environmental PIL Portal', url: '/resources/environmental-pil' },
      { label: 'Forest Ecosystems', url: '/biodiversity/forest-ecosystems' }
    ]
  },

  // ─── Gilgit-Baltistan (3 Candidates) ────────────────────────────────────────
  {
    id: 'adv-015',
    name: 'Raja Shakeel Ahmed',
    honorific: 'Justice',
    legalRole: 'JUDICIAL_CONTRIBUTOR',
    primaryDesignation: 'Judge, Gilgit-Baltistan Chief Court | Former IUCN Professional',
    affiliationOrChamber: 'Gilgit-Baltistan Chief Court',
    region: 'Gilgit-Baltistan',
    districtOrCircuit: 'Ghizer / Gilgit Circuit',
    activeWindow: '2002–2026',
    specializations: ['Natural Resource Governance', 'IUCN Institutional Conservation', 'Mountain Environmental Jurisprudence'],
    specializationsSummary: 'Judicial officer with documented historical career in international conservation institutions (IUCN)',
    editorialTribute: '“A legal career with an identifiable historical connection to nature conservation institutions.”',
    narrative:
      'Justice Raja Shakeel Ahmed\'s official judicial biography records professional involvement with the International Union for Conservation of Nature (IUCN) from 2002 to 2005. He subsequently practiced law in Gilgit-Baltistan and was appointed a Judge of the Gilgit-Baltistan Chief Court in September 2021.',
    keyImpact: 'Judicial service with documented institutional grounding in international conservation frameworks',
    caseReferences: ['Official Judicial Profile (gbcc.gov.pk)'],
    documentedContributions: [
      {
        year: '2002–2005',
        title: 'IUCN Professional Conservation Service',
        legalForum: 'International Union for Conservation of Nature (IUCN)',
        description: 'Served as an environmental professional with the IUCN in Northern Areas during regional conservation strategy formulation.',
        documentedOutcome: 'Institutional conservation involvement established in official judicial biography.',
        courtOrderCitation: 'Chief Court Official Biography'
      }
    ],
    sourceProvenance: [
      { title: 'Gilgit-Baltistan Chief Court: Official Judicial Biography', url: 'https://gbcc.gov.pk', recordType: 'Official Government Register' }
    ],
    legalStatus: 'INSTITUTIONAL RECORD · Historical conservation association confirmed',
    evidentiaryNotes: 'Historical IUCN association verified. Specific environmental judicial rulings remain under archival docket retrieval.',
    linkedKewModules: [
      { label: 'Protected Areas Registry', url: '/protected-areas' },
      { label: 'Environmental PIL Portal', url: '/resources/environmental-pil' }
    ]
  },
  {
    id: 'adv-016',
    name: 'Hassan Shigri',
    honorific: 'Advocate',
    legalRole: 'LEGAL_EDUCATOR',
    primaryDesignation: 'Advocate | Public Commentary on Mountain and Mineral Resources',
    affiliationOrChamber: 'Shigar / Gilgit-Baltistan Bar',
    region: 'Gilgit-Baltistan',
    districtOrCircuit: 'Shigar / Skardu Circuit',
    activeWindow: 'Year: 2025',
    specializations: ['Mineral Rights Legislation', 'Community Land Ownership', 'Mountain Resource Governance'],
    specializationsSummary: 'Public legal commentary on proposed Gilgit-Baltistan mining legislation and community mineral rights',
    editorialTribute: '“Public scrutiny of legal ownership and control of mountain natural resources.”',
    narrative:
      'Advocate Hassan Shigri was identified in 2025 reporting as a legal speaker during public demonstrations against proposed mining legislation in Shigar. He addressed constitutional rights, local community ownership of alpine mineral reserves, and the ecological vulnerability of mountain valleys.',
    keyImpact: 'Public legal commentary on community mineral ownership and mountain natural resource governance',
    caseReferences: ['Shigar Mines & Minerals Legislation Public Debate (2025)'],
    documentedContributions: [
      {
        year: 2025,
        title: 'Shigar Mines & Minerals Legislation Debate',
        legalForum: 'Public Civic & Media Assembly',
        description: 'Delivered legal critique on proposed mining concessions, arguing for community consultation, environmental impact audits, and local resource sovereignty.',
        documentedOutcome: 'Public legal commentary reported in regional media; helped mobilize public scrutiny over proposed mining bills.',
        courtOrderCitation: 'HUM News English Report, 2025'
      }
    ],
    sourceProvenance: [
      { title: 'HUM News English: Shigar Mines & Minerals Demonstration', url: 'https://humnews.pk', recordType: 'Independent Media' }
    ],
    legalStatus: 'RESOURCE GOVERNANCE COMMENTARY · Public advocacy documented; court litigation unverified',
    evidentiaryNotes: 'Legal professional credentials and public advocacy verified. Formal environmental court filings have not yet been corroborated.',
    linkedKewModules: [
      { label: 'Mountain & Glacier Guardians', url: '/resources/kew-green-heroes' },
      { label: 'Environmental PIL Portal', url: '/resources/environmental-pil' }
    ]
  },
  {
    id: 'adv-017',
    name: 'Aurangzeb Khan',
    honorific: 'Senior Advocate',
    legalRole: 'GOVERNMENT_LEGAL_PROFESSIONAL',
    primaryDesignation: 'Legal Counsel | Forest Department Land Litigation Representation',
    affiliationOrChamber: 'Supreme Appellate Court Bar, Gilgit-Baltistan',
    region: 'Gilgit-Baltistan',
    districtOrCircuit: 'Skardu / Hussainabad Circuit',
    activeWindow: 'Year: 2026',
    specializations: ['State Forest Land Demarcation', 'Appellate Litigation', 'Public Land Recovery'],
    specializationsSummary: 'Represented Forest Department before Supreme Appellate Court in Khachping Hussainabad state land dispute',
    editorialTribute: '“Representation in litigation concerning government forest-land claims.”',
    narrative:
      'Senior Advocate Aurangzeb Khan appeared for the Gilgit-Baltistan Forest Department in a major land dispute concerning state-owned forest land at Khachping Hussainabad. The Gilgit-Baltistan Supreme Appellate Court converted the department\'s petition into a regular appeal and suspended lower-court orders pending final adjudication.',
    keyImpact: 'Appellate representation protecting state forest-land demarcation against unauthorized private civil claims',
    caseReferences: ['Forest Department v. Private Claimants (GB Supreme Appellate Court 2026)'],
    documentedContributions: [
      {
        year: 2026,
        title: 'Hussainabad Forest Department Appellate Stay',
        legalForum: 'Gilgit-Baltistan Supreme Appellate Court',
        description: 'Represented the Forest Department challenging adverse lower civil court orders that alienated demarcated state forest land.',
        documentedOutcome: 'Appellate court suspended lower-court orders, restraining alienation of the contested forest land pending further hearing.',
        courtOrderCitation: 'Gilgiti News, Sept 10, 2026'
      }
    ],
    sourceProvenance: [
      { title: 'Gilgiti News: Supreme Appellate Court Suspends Lower Court Orders (Sept 10, 2026)', url: 'https://gilgitinews.com', recordType: 'Regional Court Reporting' }
    ],
    legalStatus: 'FOREST LAND LITIGATION DOCUMENTED · Appellate stay granted; final decree pending',
    evidentiaryNotes: 'Court appearance reported by regional legal media. Case docket undergoing formal certified copy retrieval.',
    linkedKewModules: [
      { label: 'Forest Ecosystems', url: '/biodiversity/forest-ecosystems' },
      { label: 'Environmental PIL Portal', url: '/resources/environmental-pil' }
    ]
  }
];
