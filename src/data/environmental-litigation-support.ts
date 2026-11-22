// KEW ENVIRONMENTAL LITIGATION SUPPORT & JUSTICE CENTRE DATA ENGINE
// Covers 5 Himalayan Regions: Kashmir Valley, Jammu, Ladakh, Azad Jammu & Kashmir (AJK), Gilgit-Baltistan (GB)

export interface JurisdictionForum {
  id: string;
  name: string;
  shortName: string;
  jurisdiction: string;
  type: 'Apex Court' | 'High Court' | 'Environmental Tribunal' | 'Statutory Authority';
  benchLocation: string;
  constitutionalArticle: string;
  governingLegislation: string;
  statutoryPreConditions: string[];
  approximateCourtFee: string;
  filingMode: 'e-Filing & Physical' | 'Physical Only' | 'e-Filing Mandatory';
  portalUrl: string;
  rulesReference: string;
  standingCriteria: string;
}

export const JURISDICTION_FORUMS: JurisdictionForum[] = [
  {
    id: 'jk-hc-srinagar',
    name: 'High Court of Jammu & Kashmir and Ladakh (Srinagar Wing)',
    shortName: 'J&K High Court (Srinagar)',
    jurisdiction: 'Kashmir Valley & Ladakh UT',
    type: 'High Court',
    benchLocation: 'Srinagar (May–Oct) / Year-round Virtual',
    constitutionalArticle: 'Article 226 of Constitution of India',
    governingLegislation: 'High Court of Jammu & Kashmir Rules, 1999 & PIL Rules, 2010',
    statutoryPreConditions: [
      'Prior representation submitted to administrative respondent at least 30 days prior',
      'Mandatory disclosure of petitioner identity, annual income, PAN/Aadhaar',
      'Affidavit of bona fides confirming zero personal profit or commercial motivation',
      'Specific averment confirming no prior identical or parallel litigation pending'
    ],
    approximateCourtFee: '₹250 - ₹500 (Writ Stamp & Welfare Fund)',
    filingMode: 'e-Filing & Physical',
    portalUrl: 'https://jkhighcourt.nic.in',
    rulesReference: 'Notification No. 817/RG dated 24.12.2010 (J&K High Court PIL Rules)',
    standingCriteria: 'Bona fide citizen or registered society acting pro bono publico for environmental protection'
  },
  {
    id: 'jk-hc-jammu',
    name: 'High Court of Jammu & Kashmir and Ladakh (Jammu Wing)',
    shortName: 'J&K High Court (Jammu)',
    jurisdiction: 'Jammu Division (10 Districts)',
    type: 'High Court',
    benchLocation: 'Janipur, Jammu',
    constitutionalArticle: 'Article 226 of Constitution of India',
    governingLegislation: 'High Court of Jammu & Kashmir Rules, 1999 & PIL Rules, 2010',
    statutoryPreConditions: [
      'Exhaustion of statutory remedies or proof of urgent irreparable environmental degradation',
      'Strict disclosure of NGO source of funding and registration under Societies Registration Act',
      'Proof of service on Advocate General / Standing Counsel prior to listing'
    ],
    approximateCourtFee: '₹250 - ₹500',
    filingMode: 'e-Filing & Physical',
    portalUrl: 'https://jkhighcourt.nic.in',
    rulesReference: 'J&K High Court PIL Practice Guidelines & Gazette Notifications',
    standingCriteria: 'Aggrieved regional citizens, public-interest activists, registered conservation trusts'
  },
  {
    id: 'ngt-pb',
    name: 'National Green Tribunal (Principal Bench, New Delhi)',
    shortName: 'NGT Principal Bench',
    jurisdiction: 'J&K, Ladakh, Delhi, Northern States (All civil environmental disputes)',
    type: 'Environmental Tribunal',
    benchLocation: 'Faridkot House, Copernicus Marg, New Delhi (Hybrid Video Conferencing)',
    constitutionalArticle: 'Statutory Tribunal under Article 21 rights',
    governingLegislation: 'National Green Tribunal Act, 2010 (Sections 14, 15, 18)',
    statutoryPreConditions: [
      'Substantial question relating to environment arising from implementation of enactments in Schedule I (Water, Air, Environment, Forest Conservation, Biological Diversity Acts)',
      'Filing within 6 months of the first cause of action arising (Section 14(3)) or 5 years for restitution (Section 15(3))',
      'Payment of prescribed tribunal fee per NGT (Practices & Procedure) Rules, 2011'
    ],
    approximateCourtFee: '₹1,000 (Compensation claims > ₹5 Lakhs incur 1% fee capped at ₹1 Lakh)',
    filingMode: 'e-Filing Mandatory',
    portalUrl: 'https://ngtonline.nic.in',
    rulesReference: 'NGT (Practices and Procedure) Rules, 2011 & Rule 12 Fee Schedule',
    standingCriteria: 'Any person aggrieved, including local residents, environmental groups, or suo motu cognisance'
  },
  {
    id: 'sci',
    name: 'Supreme Court of India (Apex Court)',
    shortName: 'Supreme Court of India',
    jurisdiction: 'Pan-India Apex Jurisdiction & Statutory Appellate Bench',
    type: 'Apex Court',
    benchLocation: 'Tilak Marg, New Delhi',
    constitutionalArticle: 'Article 32 & Article 136 of Constitution of India',
    governingLegislation: 'Supreme Court Rules, 2013 (Order XXXVIII - Public Interest Litigation)',
    statutoryPreConditions: [
      'Infringement of fundamental rights under Part III (Article 21 Right to Clean Environment)',
      'Petitioner must explain why High Court under Article 226 was bypassed',
      'Letter petitions screened by PIL Cell before listing before Chief Justice of India'
    ],
    approximateCourtFee: '₹500 - ₹2,000 (Supreme Court filing schedule)',
    filingMode: 'e-Filing Mandatory',
    portalUrl: 'https://main.sci.gov.in',
    rulesReference: 'Compilation of Guidelines to be followed for Entertaining Letters/Petitions as PIL',
    standingCriteria: 'Broad public interest locus standi for macro-policy, trans-boundary, or Himalayan ecological threats'
  },
  {
    id: 'ajk-hc',
    name: 'High Court of Azad Jammu & Kashmir',
    shortName: 'AJK High Court',
    jurisdiction: 'Azad Jammu & Kashmir (10 Districts: Muzaffarabad, Mirpur, Poonch, etc.)',
    type: 'High Court',
    benchLocation: 'Muzaffarabad (Circuit Benches at Mirpur, Rawalakot, Kotli)',
    constitutionalArticle: 'Article 44 of Azad Jammu & Kashmir Interim Constitution Act, 1974',
    governingLegislation: 'High Court of AJK Procedure Rules & Environmental Protection Act, 2000',
    statutoryPreConditions: [
      'Proof of public injury regarding Neelum-Jhelum basin, municipal dumping, or illegal timber harvesting',
      'Prior notice served on AJK Environmental Protection Agency (AJK-EPA)',
      'Petitioner citizenship affidavit under AJK State Subject Laws'
    ],
    approximateCourtFee: 'PKR 500 - 1,500',
    filingMode: 'Physical Only',
    portalUrl: 'https://highcourt.ajk.gov.pk',
    rulesReference: 'AJK High Court Writ Rules & PIL Practice Notes',
    standingCriteria: 'State subjects of AJK acting pro bono publico or registered civil society organizations'
  },
  {
    id: 'gb-chief-court',
    name: 'Chief Court of Gilgit-Baltistan',
    shortName: 'GB Chief Court',
    jurisdiction: 'Gilgit-Baltistan (10 Districts: Gilgit, Skardu, Diamer, Hunza, etc.)',
    type: 'High Court',
    benchLocation: 'Gilgit (Circuit Bench at Skardu)',
    constitutionalArticle: 'Article 71 of Gilgit-Baltistan (Empowerment and Self-Governance) Order, 2009',
    governingLegislation: 'Gilgit-Baltistan Environmental Protection Act, 2014 & Chief Court Rules',
    statutoryPreConditions: [
      'Prior formal grievance lodged with GB Environmental Protection Agency (GB-EPA)',
      'Protection of glaciers, Karakoram highway transit corridors, or Indus headwater tributaries',
      'Affidavit of bona fides and standing'
    ],
    approximateCourtFee: 'PKR 500 - 1,000',
    filingMode: 'Physical Only',
    portalUrl: 'https://gbchiefcourt.gov.pk',
    rulesReference: 'GB Chief Court Writ & Constitutional Petitions Manual',
    standingCriteria: 'Residents of Gilgit-Baltistan, indigenous pastoral communities, environmental societies'
  },
  {
    id: 'scp',
    name: 'Supreme Court of Pakistan',
    shortName: 'Supreme Court of Pakistan',
    jurisdiction: 'Federal Jurisdiction & Appellate Review',
    type: 'Apex Court',
    benchLocation: 'Constitution Avenue, Islamabad (Branch Registries at Lahore, Karachi, Peshawar, Quetta)',
    constitutionalArticle: 'Article 184(3) of Constitution of the Islamic Republic of Pakistan, 1973',
    governingLegislation: 'Supreme Court Rules, 1980 & Human Rights Cell Procedures',
    statutoryPreConditions: [
      'Question of public importance with reference to enforcement of Fundamental Rights (Article 9 Right to Life)',
      'Substantiated scientific evidence regarding trans-Indus pollution or glacial melting hazards'
    ],
    approximateCourtFee: 'PKR 1,000 - 2,500',
    filingMode: 'e-Filing & Physical',
    portalUrl: 'https://supremecourt.gov.pk',
    rulesReference: 'Supreme Court Human Rights Cell (HRC) Standard Operating Procedures',
    standingCriteria: 'Any bona fide citizen, non-governmental group, or suo motu invocation by the court'
  }
];

export interface ChecklistItem {
  id: string;
  category: string;
  title: string;
  description: string;
  regionalNotes: string;
  mandatoryDocuments: string[];
  statutoryBasis: string;
  qualityStandard: string;
}

export const PIL_READINESS_CHECKLIST_DATA: ChecklistItem[] = [
  {
    id: 'chk-1',
    category: 'Jurisdiction & Standing',
    title: 'Jurisdiction and Locus Standi Verification',
    description: 'Verify the competent court or tribunal, petitioner eligibility under public-interest doctrine, absence of personal conflict, and statutory limitation deadlines.',
    regionalNotes: 'In J&K High Court, mandatory compliance with 2010 PIL Rules requiring declaration of no private motive or commercial dispute with respondents.',
    mandatoryDocuments: ['Petitioner Identity Proof (Aadhaar / Voter ID / CNIC)', 'Organizational By-laws & Registration Certificate (if NGO)'],
    statutoryBasis: 'Article 226 / Article 32 / Section 14 NGT Act 2010 / Article 44 AJK Constitution',
    qualityStandard: 'Strict legal standing check: Pro Bono Publico verified; no competing private litigation.'
  },
  {
    id: 'chk-2',
    category: 'Environmental Grievance',
    title: 'Precise Location, Affected Ecosystem & Chronology',
    description: 'Pinpoint GPS coordinates, catchment area boundaries, upstream/downstream impact zones, timeline of degradation, and specific nature of environmental injury.',
    regionalNotes: 'Must cite specific river basin, municipal ward, forest compartment, or wetland boundary (e.g., Dal Lake, Doodh Ganga, River Tawi, Hokersar).',
    mandatoryDocuments: ['Georeferenced Map / Site Transect', 'Dated Photographic Evidence Log (with camera metadata)'],
    statutoryBasis: 'Indian Evidence Act / BSA 2023 / PEPA 1997',
    qualityStandard: 'Coordinates certified within ±5m; minimum 3 timestamped site inspection records.'
  },
  {
    id: 'chk-3',
    category: 'Legal Provisions',
    title: 'Applicable Statutory Provisions & Precedents',
    description: 'Pinpoint specific environmental statutes, rules, statutory standards, notifications, and binding judicial precedents violated by authorities.',
    regionalNotes: 'Water Act 1974, Air Act 1981, EPA 1986, Solid Waste Management Rules 2016, Wetland Conservation Rules 2017, J&K Water Resources Act 2010.',
    mandatoryDocuments: ['Citation Index of Statutory Sections', 'Compilation of Applicable Gazette Notifications'],
    statutoryBasis: 'Schedule I of NGT Act 2010 / Statutory Rules',
    qualityStandard: 'Every allegation tied directly to a specific statutory section or rule number.'
  },
  {
    id: 'chk-4',
    category: 'Administrative Representations',
    title: 'Prior Government Representations & Statutory Notices',
    description: 'Proof of formal grievance submitted to regulatory bodies and local authorities, accompanied by registered postal receipts, speed post tracking, or e-portal acknowledgments.',
    regionalNotes: 'High Courts routinely dismiss PILs if petitioner has not given administrative authorities 30–60 days to respond.',
    mandatoryDocuments: ['Copy of Written Representation', 'Speed Post / Courier / Email Delivery Acknowledgment', '30-Day Expiry Proof'],
    statutoryBasis: 'Doctrine of Exhaustion of Administrative Remedies',
    qualityStandard: 'Minimum 1 formal written representation served on administrative secretary + regulatory head.'
  },
  {
    id: 'chk-5',
    category: 'Scientific Evidence',
    title: 'Certified Laboratory Testing & Environmental Baseline Data',
    description: 'Water quality, air pollution, noise telemetry, or soil chemical analyses conducted by accredited laboratories using standard methodology.',
    regionalNotes: 'NABL-accredited or State PCB approved lab tests required for NGT and High Court admissibility.',
    mandatoryDocuments: ['NABL / ISO 17025 Test Certificate', 'Sample Chain of Custody Record', 'Sampling Methodology Description'],
    statutoryBasis: 'Section 45 Indian Evidence Act / Section 19 NGT Act (Principles of Natural Justice)',
    qualityStandard: 'Accredited lab certificate with parameters (BOD, COD, Fecal Coliform, PM2.5) compared against statutory limits.'
  },
  {
    id: 'chk-6',
    category: 'Spatial & Satellite Evidence',
    title: 'GIS Maps, Remote Sensing & Satellite Imagery Time-Series',
    description: 'Multitemporal satellite observations showing encroachment, deforestation, shoreline shrinkage, or land-use change over time.',
    regionalNotes: 'Sentinel-2, Landsat, or Google Earth historical imagery with verified dates and scale bars.',
    mandatoryDocuments: ['High-Resolution Satellite Comparison (Before vs. After)', 'GIS Polygon GeoJSON / Shapefile Metadata'],
    statutoryBasis: 'Judicial acceptance of remote sensing under Supreme Court precedents (M.C. Mehta, T.N. Godavarman)',
    qualityStandard: 'Dated imagery from verified platforms with documented sensor resolution and coordinate reference system (EPSG:4326 / UTM 43N).'
  },
  {
    id: 'chk-7',
    category: 'Responsible Authorities',
    title: 'Legally Necessary & Proper Respondents',
    description: 'Accurate identification and arraying of government departments, municipal corporations, pollution control boards, and private polluters.',
    regionalNotes: 'Must name Principal Secretaries / Commissioners through official designation, not personal names, plus statutory enforcement bodies.',
    mandatoryDocuments: ['List of Respondents with Official Office Addresses & Department Heads'],
    statutoryBasis: 'Order I Rule 10 CPC (Necessary and Proper Parties)',
    qualityStandard: 'Correct administrative hierarchy: Department Secretary, Chief Engineer, PCB Chairman, District Magistrate.'
  },
  {
    id: 'chk-8',
    category: 'Existing Proceedings',
    title: 'Litigation History & Search of Existing Case Records',
    description: 'Search of High Court, NGT, and Supreme Court registries to verify no identical writ petition is pending or previously disposed on the same grounds.',
    regionalNotes: 'Must cite existing matters (e.g., Dal Lake WP(PIL) 159/2002, Doodh Ganga OA 241/2021) to prevent res judicata or dismissal with costs.',
    mandatoryDocuments: ['Court E-Registry Search Summary', 'Affidavit of Non-Pendency'],
    statutoryBasis: 'Section 11 CPC (Res Judicata) & High Court PIL Rules Disclosures',
    qualityStandard: 'Comprehensive search of KEW 40-year inventory and official court cause lists.'
  },
  {
    id: 'chk-9',
    category: 'Petition & Affidavits',
    title: 'Structured Petition, Grounds of Challenge & Sworn Affidavit',
    description: 'Complete formal draft containing Synopsis, Chronology of Events, Statement of Facts, Grounds, Relief Sought, and verified Affidavit.',
    regionalNotes: 'Affidavit must be sworn before an authorized Oath Commissioner / Notary Public with formal judicial court stamps.',
    mandatoryDocuments: ['Draft Petition / Application', 'Affidavit of Petitioner on Non-Judicial Stamp Paper', 'Power of Attorney / Vakalatnama'],
    statutoryBasis: 'High Court Writ Rules & Order XIX CPC',
    qualityStandard: 'Precise legal drafting; allegations separated into verified personal knowledge vs. legal advice.'
  },
  {
    id: 'chk-10',
    category: 'Annexures & Indexing',
    title: 'Chronological Annexure Index, Pagination & Service Proof',
    description: 'All documents marked Annexure P-1, P-2 sequentially, paginated, indexed, and served on Standing Counsels of the state.',
    regionalNotes: 'Registry will reject filings with bad pagination, illegible copies, or missing English translations of Urdu/regional documents.',
    mandatoryDocuments: ['Master Index & List of Dates', 'Legible Copies of All Annexures', 'Proof of Advance Service on Respondents'],
    statutoryBasis: 'High Court Registry Rules & Scrutiny Code',
    qualityStandard: 'Continuous pagination, indexed exhibits, certified true copies verified.'
  },
  {
    id: 'chk-11',
    category: 'Legal Representation & Costs',
    title: 'Advocate Review, Filing Fees & Lawful Budgeting',
    description: 'Vetting by qualified advocate, execution of Vakalatnama, verification of filing fees, and compliance with litigation funding laws.',
    regionalNotes: 'Ensure petitioner has checked NALSA / JKSLSA legal aid eligibility before committing private financial resources.',
    mandatoryDocuments: ['Vakalatnama executed in favor of enrolled Advocate', 'Filing Fee Receipts / e-Challan'],
    statutoryBasis: 'Advocates Act 1961 / Legal Services Authorities Act 1987',
    qualityStandard: 'Enrolled bar advocate engagement; verified fee challan; zero champerty risk.'
  },
  {
    id: 'chk-12',
    category: 'Post-Filing Monitoring Plan',
    title: 'Hearing Schedule, Interim Relief & Compliance Monitoring',
    description: 'Framework to track court orders, ensure immediate transmission of stay/status-quo orders to local authorities, and monitor ground-level compliance.',
    regionalNotes: 'Court disposal does not equal compliance. Plan must track engineering works, STP installations, and environmental restoration.',
    mandatoryDocuments: ['Compliance Verification Tracker Template', 'Designated Citizen Monitoring Protocol'],
    statutoryBasis: 'Contempt of Courts Act 1971 / Section 26 NGT Act',
    qualityStandard: 'Independent field verification protocol scheduled at 30, 90, and 180 days post-order.'
  }
];

export interface LegalAidProvider {
  id: string;
  name: string;
  region: string;
  coverage: string;
  typeOfSupport: string;
  eligibilityCriteria: string;
  applicationMode: string;
  feeStructure: string;
  contactDetails: {
    address: string;
    phone: string;
    email: string;
    website: string;
  };
  verifiedDate: string;
  limitations: string;
}

export const LEGAL_AID_PROVIDERS: LegalAidProvider[] = [
  {
    id: 'nalsa-india',
    name: 'National Legal Services Authority (NALSA)',
    region: 'Pan-India',
    coverage: 'All Indian citizens meeting statutory criteria, including J&K & Ladakh',
    typeOfSupport: 'Free legal representation, advocate appointment, court fee payment, preparation of pleadings',
    eligibilityCriteria: 'Section 12 of LSA Act: Women, children, SC/ST, persons with disabilities, victims of disaster, persons in custody, and citizens with annual income below statutory threshold (₹3,00,000 in J&K).',
    applicationMode: 'Online through NALSA Legal Aid Portal, Front Offices at District Courts, or Toll-Free 15100',
    feeStructure: 'Completely Free (Statutory Scheme)',
    contactDetails: {
      address: 'B-Block, Additional Office Complex, Supreme Court of India, New Delhi 110001',
      phone: '+91-11-23382778 / Toll-Free: 15100',
      email: 'nalsa-dla@nic.in',
      website: 'https://nalsa.gov.in'
    },
    verifiedDate: '2026-02-15',
    limitations: 'Subject to statutory means test; social action litigation evaluated on public merits by Legal Aid Committee.'
  },
  {
    id: 'jkslsa-jk',
    name: 'J&K Legal Services Authority (JKSLSA)',
    region: 'Jammu & Kashmir',
    coverage: 'Jammu & Kashmir (20 District Legal Services Authorities & High Court Legal Services Committee)',
    typeOfSupport: 'Free legal aid counsel for High Court PILs, District Court representations, NGT video filings, and mediator conciliation',
    eligibilityCriteria: 'Resident of J&K with annual income below ₹3,00,000, marginalized community members, women, victims of environmental catastrophes',
    applicationMode: 'District Legal Services Authority (DLSA) office in every district court complex or online at jammukashmir.nalsa.gov.in',
    feeStructure: 'Zero Fee for eligible applicants',
    contactDetails: {
      address: 'Old Secretariat, Srinagar (May–Oct) / Janipur High Court Complex, Jammu (Nov–Apr)',
      phone: '+91-194-2479631 (Srinagar) / +91-191-2539962 (Jammu)',
      email: 'jkslsa-jk@nic.in',
      website: 'https://jammukashmir.nalsa.gov.in'
    },
    verifiedDate: '2026-02-18',
    limitations: 'Formal application scrutinized by Secretary DLSA; does not fund private commercial environmental litigation.'
  },
  {
    id: 'nyaya-bandhu',
    name: 'Nyaya Bandhu (Department of Justice, GoI)',
    region: 'Pan-India',
    coverage: 'India (including J&K and Ladakh High Courts & Supreme Court)',
    typeOfSupport: 'Pro Bono Legal Representation by enrolled volunteer advocates across High Courts and Supreme Court',
    eligibilityCriteria: 'Section 12 LSA Act beneficiaries registered on the Nyaya Bandhu Android / iOS App or UMANG platform',
    applicationMode: 'Mobile App / Web Portal submission; automated matching with verified volunteer lawyers',
    feeStructure: 'Free Pro Bono service by voluntary lawyers',
    contactDetails: {
      address: 'Department of Justice, Ministry of Law & Justice, Jaisalmer House, 26 Man Singh Road, New Delhi 110011',
      phone: '+91-11-23072145',
      email: 'probono-doj@gov.in',
      website: 'https://www.probono-doj.in'
    },
    verifiedDate: '2026-02-10',
    limitations: 'Advocate availability depends on voluntary acceptance of briefs by panel attorneys.'
  },
  {
    id: 'ljcp-pakistan',
    name: 'Access to Justice Development Fund (Law and Justice Commission of Pakistan)',
    region: 'Pakistan, AJK & Gilgit-Baltistan',
    coverage: 'Pakistan federal jurisdiction, with statutory eligibility extendable through legal empowerment projects',
    typeOfSupport: 'Project funding for legal research, public-interest law, access-to-justice initiatives, and civil society legal defense',
    eligibilityCriteria: 'Registered non-governmental organizations, academic institutions, and bar associations demonstrating public interest',
    applicationMode: 'Formal grant proposal submitted to Secretary, Law and Justice Commission of Pakistan (LJCP)',
    feeStructure: 'Institutional Grant Funding (Project Based)',
    contactDetails: {
      address: 'Supreme Court Building, Constitution Avenue, Islamabad, Pakistan',
      phone: '+92-51-9220455',
      email: 'info@ljcp.gov.pk',
      website: 'https://ljcp.gov.pk'
    },
    verifiedDate: '2026-01-28',
    limitations: 'Provides funding to institutions and research initiatives; does not fund individual commercial litigation.'
  },
  {
    id: 'dlec-pakistan',
    name: 'District Legal Empowerment Committees (DLECs)',
    region: 'Pakistan / Northern Districts',
    coverage: 'Operational across district headquarters under LJCP coordination',
    typeOfSupport: 'Direct provision of free legal aid counsel and litigation costs for deserving and indigent litigants',
    eligibilityCriteria: 'Means-tested indigent individuals; income ceiling determined by district committee chaired by District & Sessions Judge',
    applicationMode: 'Physical application to Office of the District & Sessions Judge / Superintendent District Jail',
    feeStructure: 'Free Legal Defense & State-Covered Advocate Fees',
    contactDetails: {
      address: 'District & Sessions Court Headquarters in each district',
      phone: 'Through Local Bar Association / District Court Registrar',
      email: 'dlec@ljcp.gov.pk',
      website: 'https://ljcp.gov.pk'
    },
    verifiedDate: '2026-01-30',
    limitations: 'Subject to local committee budget approval and geographic operational presence.'
  },
  {
    id: 'laja-pakistan',
    name: 'Legal Aid and Justice Authority (LAJA)',
    region: 'Pakistan',
    coverage: 'Federal and provincial territory coverage for vulnerable sections',
    typeOfSupport: 'Legal, financial, and ancillary assistance to women, children, and underprivileged groups facing injustice',
    eligibilityCriteria: 'Statutory eligibility under Legal Aid and Justice Authority Act, 2020',
    applicationMode: 'Online submission through LAJA Citizen Portal or designated provincial facilitation desks',
    feeStructure: 'State-Funded Free Legal Representation',
    contactDetails: {
      address: 'Ministry of Law & Justice, Evacuee Trust Complex, F-5/1, Islamabad',
      phone: '+92-51-9201990',
      email: 'support@laja.gov.pk',
      website: 'https://laja.gov.pk'
    },
    verifiedDate: '2026-02-05',
    limitations: 'Primarily mandates assistance to individual vulnerable victims; environmental claims require human-rights intersection.'
  },
  {
    id: 'pilap-pakistan',
    name: 'Public Interest Law Association of Pakistan (PILAP)',
    region: 'Pakistan / Cross-Territory',
    coverage: 'National public interest litigation, environmental advocacy, and legal research',
    typeOfSupport: 'Pro bono research, amicus briefs, petition co-drafting, and strategic litigation advice',
    eligibilityCriteria: 'Cases with substantial public interest, widespread ecological threat, or systemic governance failure',
    applicationMode: 'Case submission form on official website or formal referral through legal academic network',
    feeStructure: 'Non-profit Public Interest Collaboration',
    contactDetails: {
      address: 'Suite 203, Marine Point, Block 9, Clifton, Karachi, Pakistan',
      phone: '+92-21-35874211',
      email: 'info@pilap.pk',
      website: 'https://pilap.pk'
    },
    verifiedDate: '2026-02-12',
    limitations: 'Case selection is discretionary based on internal PILAP litigation committee review.'
  },
  {
    id: 'dlaf-pakistan',
    name: 'Dastageer Legal Aid Foundation (DLAF)',
    region: 'Pakistan & Northern Regions',
    coverage: 'Community legal aid, marginalized population defense, and resource rights advocacy',
    typeOfSupport: 'Legal counseling, petition drafting assistance, and community paralegal support',
    eligibilityCriteria: 'Indigent individuals, rural communities, victims of resource displacement',
    applicationMode: 'Helpline / Walk-in community legal clinics',
    feeStructure: 'Free Legal Services',
    contactDetails: {
      address: 'Regional Offices in Rawalpindi, Lahore, and Northern Outreach Centres',
      phone: '+92-51-4853012',
      email: 'contact@dlaf.org.pk',
      website: 'https://www.dlaf.org.pk'
    },
    verifiedDate: '2026-02-01',
    limitations: 'Capacity constrained by foundation grant availability.'
  },
  {
    id: 'uni-clinics',
    name: 'University Environmental Law Clinics (Kashmir & Jammu)',
    region: 'Kashmir Valley & Jammu',
    coverage: 'Department of Law, University of Kashmir (Hazratbal) & The Law School, University of Jammu',
    typeOfSupport: 'Academic legal research, precedent compilation, field fact-finding assistance, draft petition review',
    eligibilityCriteria: 'Grassroots environmental groups, students, panchayats, and affected riparian communities',
    applicationMode: 'Direct representation to Clinical Legal Education Coordinator / Dean of Law',
    feeStructure: 'Academic Pro Bono Service',
    contactDetails: {
      address: 'Hazratbal, Srinagar 190006 / Baba Saheb Ambedkar Road, Jammu 180006',
      phone: '+91-194-2272002 / +91-191-2435259',
      email: 'lawclinic@kashmiruniversity.ac.in',
      website: 'https://kashmiruniversity.net'
    },
    verifiedDate: '2026-02-14',
    limitations: 'Academic schedule constraints; student researchers provide drafting and research, not advocate bar appearances.'
  }
];

export interface CostPhase {
  phaseNumber: number;
  phaseName: string;
  typicalCostRangeINR: string;
  typicalCostRangePKR: string;
  costItems: string[];
  mitigationAndSupport: string;
  statutoryFeeDetails: string;
}

export const LITIGATION_COST_PHASES: CostPhase[] = [
  {
    phaseNumber: 1,
    phaseName: 'Preliminary Investigation & Evidence Gathering',
    typicalCostRangeINR: '₹3,000 – ₹15,000',
    typicalCostRangePKR: 'PKR 10,000 – PKR 45,000',
    costItems: [
      'Site travel and GPS field transect documentation',
      'Right to Information (RTI) application fees and document copying',
      'Certified land revenue records (Khasra/Girdawari) procurement',
      'Initial photographic survey and drone footage processing'
    ],
    mitigationAndSupport: 'University law clinic volunteers, community citizen science groups, KEW Open Data repository.',
    statutoryFeeDetails: 'RTI application fee: ₹10 per application; photocopies: ₹2/page under RTI Rules.'
  },
  {
    phaseNumber: 2,
    phaseName: 'Certified Scientific & Laboratory Testing',
    typicalCostRangeINR: '₹8,000 – ₹45,000',
    typicalCostRangePKR: 'PKR 25,000 – PKR 120,000',
    costItems: [
      'NABL-accredited water quality test (pH, BOD, COD, Heavy Metals, Fecal Coliform)',
      'Ambient air quality monitor calibration and particulate matter sampling',
      'High-resolution multi-spectral satellite imagery acquisition (if commercial resolution required)',
      'Soil chemical contamination profile'
    ],
    mitigationAndSupport: 'Academic research collaborations, state university labs, KEW Sentinel-2 free spatial data.',
    statutoryFeeDetails: 'State PCB lab test fees range from ₹1,200 (basic water) to ₹8,500 (heavy metals).'
  },
  {
    phaseNumber: 3,
    phaseName: 'Drafting, Affidavits & Court Registry Scrutiny',
    typicalCostRangeINR: '₹5,000 – ₹25,000',
    typicalCostRangePKR: 'PKR 15,000 – PKR 75,000',
    costItems: [
      'Advocate drafting fee (Synopsis, Facts, Grounds, Prayers)',
      'Non-judicial stamp paper for petition and sworn affidavits',
      'Notary Public / Oath Commissioner attestation',
      'High-volume printing, double-space formatting, continuous pagination, and binding (4–6 sets)'
    ],
    mitigationAndSupport: 'Pro bono counsel through Nyaya Bandhu, NALSA/JKSLSA legal aid, PILAP pro bono review.',
    statutoryFeeDetails: 'Court fee stamp: ₹250–₹1,000; Oath Commissioner stamp: ₹50–₹100 per affidavit.'
  },
  {
    phaseNumber: 4,
    phaseName: 'Filing Fees & Initial Listing',
    typicalCostRangeINR: '₹1,000 – ₹5,000',
    typicalCostRangePKR: 'PKR 2,500 – PKR 15,000',
    costItems: [
      'Statutory court fee / Tribunal fee challan',
      'Advocate Welfare Fund stamps',
      'Process fee / Speed post summons service on official respondents',
      'Caveat search and registry clearance'
    ],
    mitigationAndSupport: 'Filing fees waived or reimbursed for indigent petitioners under Legal Services Authorities Act.',
    statutoryFeeDetails: 'NGT Rule 12 application fee: ₹1,000; High Court writ fee: ₹250–₹500.'
  },
  {
    phaseNumber: 5,
    phaseName: 'Interim Proceedings & Urgent Relief Hearings',
    typicalCostRangeINR: '₹5,000 – ₹35,000',
    typicalCostRangePKR: 'PKR 15,000 – PKR 100,000',
    costItems: [
      'Drafting urgent miscellaneous interim stay applications',
      'Court appearance fees for interim argument',
      'Certified copy procurement of interim stay orders',
      'Immediate physical service of court injunction on local police & municipal authorities'
    ],
    mitigationAndSupport: 'Pro bono advocate representation; electronic certified order downloads via e-Courts portal.',
    statutoryFeeDetails: 'Certified copy fee: ₹5–₹10 per page under High Court copyist rules.'
  },
  {
    phaseNumber: 6,
    phaseName: 'Main Hearing, Rejoinders & Expert Committees',
    typicalCostRangeINR: '₹10,000 – ₹60,000',
    typicalCostRangePKR: 'PKR 30,000 – PKR 180,000',
    costItems: [
      'Rejoinder affidavits rebutting government compliance reports',
      'Expert witness travel or appearance (if summoned by court)',
      'Submissions before court-appointed Expert Committee / Court Commissioner',
      'Multiple hearing dates across seasonal terms'
    ],
    mitigationAndSupport: 'Co-petitioner cost sharing, university faculty expert testimony, legal aid panel attorneys.',
    statutoryFeeDetails: 'Court Commissioner expenses shared per court order among parties.'
  },
  {
    phaseNumber: 7,
    phaseName: 'Post-Judgment Implementation & Ground Verification',
    typicalCostRangeINR: '₹5,000 – ₹25,000',
    typicalCostRangePKR: 'PKR 15,000 – PKR 75,000',
    costItems: [
      'Post-judgment satellite verification of boundary demarcation',
      'Follow-up water effluent tests to verify sewage treatment plant (STP) operation',
      'Site inspection travel to verify demolished encroachments or tree plantation survivorship',
      'RTI filing to inspect government compliance expenditure records'
    ],
    mitigationAndSupport: 'KEW Environmental Accountability Register telemetry, local citizen science volunteers.',
    statutoryFeeDetails: 'Zero court fee; expenses are purely scientific and investigative monitoring costs.'
  },
  {
    phaseNumber: 8,
    phaseName: 'Contempt of Court & Enforcement Proceedings (If Disobeyed)',
    typicalCostRangeINR: '₹5,000 – ₹30,000',
    typicalCostRangePKR: 'PKR 15,000 – PKR 90,000',
    costItems: [
      'Drafting Contempt of Courts petition under Section 11/12 Contempt of Courts Act 1971',
      'Service of legal statutory contempt notice on Chief Secretary / Municipal Commissioner',
      'Execution application under Section 25/26 NGT Act 2010',
      'Hearings to enforce judicial directions against non-compliant agencies'
    ],
    mitigationAndSupport: 'Legal aid assignment; court-directed recovery of litigation costs from contemnors.',
    statutoryFeeDetails: 'Contempt petition court fee: ₹100–₹500 depending on High Court schedule.'
  }
];

export interface FundingScheme {
  id: string;
  name: string;
  category: 'Legal Aid' | 'Research Grant' | 'Monitoring Grant' | 'Academic Clinic' | 'Civil Society';
  provider: string;
  coverage: string;
  eligibleExpenses: string[];
  ineligibleExpenses: string[];
  maxGrantLimit: string;
  complianceWarning: string;
  url: string;
  lastVerified: string;
}

export const FUNDING_SCHEMES_REGISTRY: FundingScheme[] = [
  {
    id: 'fnd-1',
    name: 'State Legal Services Authority Litigation Assistance',
    category: 'Legal Aid',
    provider: 'JKSLSA / NALSA',
    coverage: 'India (J&K & Ladakh)',
    eligibleExpenses: ['Advocate appearance honorarium', 'Court filing fees', 'Process service expenses', 'Clerical drafting charges'],
    ineligibleExpenses: ['Cash advances to petitioners', 'Commercial environmental campaigns', 'Private property litigation'],
    maxGrantLimit: '100% of approved statutory advocate fees and filing expenses',
    complianceWarning: 'Statutory means test applies. Beneficiaries must produce valid income or community documentation.',
    url: 'https://jammukashmir.nalsa.gov.in',
    lastVerified: '2026-02-15'
  },
  {
    id: 'fnd-2',
    name: 'Access to Justice Development Fund (Research & Legal Empowerment)',
    category: 'Research Grant',
    provider: 'Law & Justice Commission of Pakistan',
    coverage: 'Pakistan, AJK, GB',
    eligibleExpenses: ['Public-interest research studies', 'Legal aid clinic operations', 'Community legal awareness campaigns', 'Baseline governance reports'],
    ineligibleExpenses: ['Direct financing of private commercial litigation', 'Individual personal stipends'],
    maxGrantLimit: 'Project-based (PKR 500,000 to PKR 5,000,000 depending on project scale)',
    complianceWarning: 'Subject to LJCP project approval and institutional audit reporting.',
    url: 'https://ljcp.gov.pk',
    lastVerified: '2026-01-28'
  },
  {
    id: 'fnd-3',
    name: 'Scientific Ecological Monitoring Research Grant',
    category: 'Monitoring Grant',
    provider: 'Academic Consortium & Research Trusts',
    coverage: 'Himalayan Basin (J&K, Ladakh, AJK, GB)',
    eligibleExpenses: ['NABL laboratory water testing', 'Hydrological sediment sampling', 'Satellite data processing', 'Field equipment sensors'],
    ineligibleExpenses: ['Lawyer courtroom fees', 'Court stamp duty', 'Political lobbying'],
    maxGrantLimit: '₹50,000 – ₹2,50,000 (Research Support Only)',
    complianceWarning: 'FCRA COMPLIANCE STRICTLY MANDATORY in India. Foreign funds cannot be used to sponsor court litigation. KEW data is open-source research.',
    url: 'https://kashmirecowatch.org/research',
    lastVerified: '2026-02-10'
  },
  {
    id: 'fnd-4',
    name: 'Pro Bono Legal Representation Network (Nyaya Bandhu)',
    category: 'Legal Aid',
    provider: 'Ministry of Law and Justice, Government of India',
    coverage: 'Pan-India High Courts and Supreme Court',
    eligibleExpenses: ['Pro bono advocate services (Advocate accepts case without charging professional fee)'],
    ineligibleExpenses: ['Direct financial cash grants', 'Independent laboratory expenses'],
    maxGrantLimit: 'Free Professional Legal Representation',
    complianceWarning: 'Petitioner pays incidental out-of-pocket costs (printing, photocopies) unless covered by DLSA.',
    url: 'https://www.probono-doj.in',
    lastVerified: '2026-02-18'
  }
];

export interface CaseLifecycleStep {
  stepNumber: number;
  title: string;
  subTitle: string;
  duration: string;
  keyActions: string[];
  kewIntegration: string;
  commonPitfalls: string;
  statutoryMilestone: string;
}

export const CASE_LIFECYCLE_STAGES: CaseLifecycleStep[] = [
  {
    stepNumber: 1,
    title: 'Environmental Grievance Intake & Field Reconnaissance',
    subTitle: 'Site inspection, geotagged evidence, initial harm assessment',
    duration: 'Weeks 1–2',
    keyActions: [
      'Document precise location with GPS coordinates and date-stamped photographs',
      'Identify affected ecosystem components (water table, riparian corridor, air quality, wetland)',
      'Record statements of affected community members and panchayat representatives',
      'Check KEW GIS Atlas for baseline boundary and historical land cover'
    ],
    kewIntegration: 'KEW GIS Atlas layer overlay; preliminary watershed and air basin telemetry.',
    commonPitfalls: 'Vague location descriptions without GPS coordinates; failing to preserve camera metadata.',
    statutoryMilestone: 'Establishment of prima facie environmental injury.'
  },
  {
    stepNumber: 2,
    title: 'Pre-Litigation Action & Statutory Representations',
    subTitle: 'Mandatory administrative notice, RTI filings, existing case search',
    duration: 'Weeks 3–6',
    keyActions: [
      'Issue formal representation to Chairman SPCB/PCC, Deputy Commissioner, and Municipal Commissioner',
      'File RTI application for government discharge consents, environmental clearances, and STP audit records',
      'Search KEW 40-Year Judicial Archive to check for pending or disposed PILs on identical subjects',
      'Wait for 30–60 days statutory period to establish administrative failure or refusal to act'
    ],
    kewIntegration: 'KEW Judicial Inventory Search & Court Cause-List Completeness Matrix.',
    commonPitfalls: 'Rushing to court without prior notice; High Court dismissing PIL for failure to exhaust administrative remedies.',
    statutoryMilestone: 'Section 19 notice expiry / proof of service.'
  },
  {
    stepNumber: 3,
    title: 'Legal Viability, Standing & Forum Selection',
    subTitle: 'Jurisdiction screening, High Court PIL rules check, standing verification',
    duration: 'Weeks 7–8',
    keyActions: [
      'Determine appropriate forum: NGT (technical environmental enactment) vs. High Court (Article 226 constitutional duty) vs. Supreme Court',
      'Screen petitioner credentials against J&K High Court PIL Rules 2010 (income, background, litigation history)',
      'Review limitation periods (e.g., Section 14(3) NGT Act: 6 months from first cause of action)',
      'Assess risk of adverse costs or frivolous petition allegations'
    ],
    kewIntegration: 'KEW 5-Region Jurisdiction & Forum Matrix.',
    commonPitfalls: 'Filing in High Court when NGT has specialized statutory jurisdiction, causing transfer delays.',
    statutoryMilestone: 'Locus standi affidavit cleared.'
  },
  {
    stepNumber: 4,
    title: 'Funding, Legal Aid & Counsel Engagement',
    subTitle: 'Budgeting, legal aid application, Vakalatnama execution, FCRA compliance',
    duration: 'Weeks 8–9',
    keyActions: [
      'Calculate phase-based litigation budget across investigation, drafting, hearings, and compliance',
      'Apply to DLSA / JKSLSA / Nyaya Bandhu for free legal representation if eligible',
      'Verify strict compliance with FCRA 2010/2026 rules (zero foreign funding for court litigation)',
      'Execute formal Vakalatnama with enrolled High Court / NGT advocate'
    ],
    kewIntegration: 'KEW Legal Aid Directory & Phase-Based Budget Calculator.',
    commonPitfalls: 'Accepting improper third-party financing with hidden commercial interests (champerty risk).',
    statutoryMilestone: 'Vakalatnama executed.'
  },
  {
    stepNumber: 5,
    title: 'Petition Drafting, Scrutiny & Formal Registry Filing',
    subTitle: 'Synopsis, chronology, grounds, prayer for relief, registry clearance',
    duration: 'Weeks 10–12',
    keyActions: [
      'Draft structured petition: Synopsis, Chronology of Events, Facts, Legal Grounds, Prayers',
      'Draft Interim Application (IA) for urgent interim injunction / stop-work order',
      'Attach certified annexures (lab tests, satellite maps, government representations)',
      'Submit to Court Registry; clear defects/objections raised by Scrutiny Branch'
    ],
    kewIntegration: 'KEW PIL Drafting Studio & Verified Scientific Data Packages.',
    commonPitfalls: 'Drafting vague prayers (e.g., "save the river") instead of specific enforceable directives (e.g., "construct 10 MLD STP by date X").',
    statutoryMilestone: 'Filing Number & Diary Number assigned.'
  },
  {
    stepNumber: 6,
    title: 'Initial Admission, Notice & Interim Relief Hearings',
    subTitle: 'Notice to respondents, interim stay orders, expert committee constitution',
    duration: 'Months 3–6',
    keyActions: [
      'First listing before the Bench; argue prima facie case and urgency for interim relief',
      'Court issues formal Notice of Motion to respondents and directs status quo / stay on illegal activity',
      'Court may appoint Court Commissioner or Joint Expert Committee (CPCB, JKPCC, Forest Dept)',
      'Ensure immediate physical service of stay order on local enforcement agencies and police'
    ],
    kewIntegration: 'KEW Latest Proceedings Feed & Court Order Archive.',
    commonPitfalls: 'Failing to serve certified copy of stay order immediately, allowing polluter to continue destruction.',
    statutoryMilestone: 'Interim Injunction / Court Committee constituted.'
  },
  {
    stepNumber: 7,
    title: 'Substantive Hearings, Rejoinders & Final Judgment',
    subTitle: 'Rebuttal of agency status reports, judicial directions, final orders',
    duration: 'Months 6–18',
    keyActions: [
      'File Rejoinder Affidavit rebutting false or delayed compliance claims filed by government agencies',
      'Present continuous monitoring evidence (follow-up water tests, ongoing satellite degradation)',
      'Final arguments on statutory liability, polluter pays principle, and restitution of ecology',
      'Court pronounces Final Judgment with specific binding directions and timeframes'
    ],
    kewIntegration: 'KEW Judgments & Directives Database.',
    commonPitfalls: 'Assuming government status reports are accurate without conducting independent ground checks.',
    statutoryMilestone: 'Pronouncement of Final Judgment / Order.'
  },
  {
    stepNumber: 8,
    title: 'Implementation, Scientific Monitoring & Ground Verification',
    subTitle: 'Disposal does not equal compliance; tracking engineering works and restitution',
    duration: 'Months 18–48+',
    keyActions: [
      'Do not close file upon judicial disposal; extract every authenticated direction and deadline',
      'Log directives into the Environmental Accountability Register with designated agency deadlines',
      'Conduct scheduled scientific audits: effluent testing, drone photography, satellite vegetation recovery',
      'Submit periodic compliance evidence to overseeing monitoring committee'
    ],
    kewIntegration: 'KEW Government Environmental Accountability Register & Scientific Monitoring Engine.',
    commonPitfalls: 'Abandoning the case upon formal disposal; agencies delaying execution indefinitely once media attention fades.',
    statutoryMilestone: 'Verification of engineering implementation & environmental baseline recovery.'
  },
  {
    stepNumber: 9,
    title: 'Contempt of Court, Further Enforcement or Closure',
    subTitle: 'Contempt petitions for non-compliance, statutory penalties, or validated restoration',
    duration: 'As required',
    keyActions: [
      'If agency fails to comply within court deadline, issue statutory contempt notice to Principal Secretary',
      'File Contempt Petition under Section 11/12 Contempt of Courts Act or Section 26 NGT Act',
      'If environmental restoration is verified through accredited testing and satellite proof, formal closure',
      'Archive validated compliance dossier for public research and regulatory accountability'
    ],
    kewIntegration: 'KEW Archival Gaps Ledger & Historical Environmental Impact Score.',
    commonPitfalls: 'Failing to take follow-up legal action when court deadlines are missed by bureaucracy.',
    statutoryMilestone: 'Full statutory compliance achieved or contempt order issued.'
  }
];

export interface ScientificEvidenceStandard {
  category: string;
  parameter: string;
  standardMethod: string;
  admissibilityRequirement: string;
  chainOfCustodyProtocol: string;
  kewDataSource: string;
}

export const SCIENTIFIC_EVIDENCE_STANDARDS: ScientificEvidenceStandard[] = [
  {
    category: 'Water Quality & Sewage Outfalls',
    parameter: 'pH, BOD, COD, Fecal Coliform, Total Dissolved Solids (TDS), Heavy Metals (Lead, Chromium, Arsenic)',
    standardMethod: 'IS 3025 (Standard Methods for the Examination of Water and Wastewater) / APHA 23rd Edition',
    admissibilityRequirement: 'Testing must be conducted by NABL-accredited laboratory under Section 45 Indian Evidence Act / Section 19 NGT Act.',
    chainOfCustodyProtocol: 'Sterilized glass bottles, cold storage at 4°C, GPS timestamp at collection, signature of field officer and neutral witness.',
    kewDataSource: 'KEW Water Systems Telemetry (Dal Lake, Jhelum River, Doodh Ganga, Wular Lake, Tawi River).'
  },
  {
    category: 'Air Quality & Brick Kilns / Asphalt Plants',
    parameter: 'PM2.5, PM10, Nitrogen Dioxide (NO2), Sulfur Dioxide (SO2), Carbon Monoxide (CO)',
    standardMethod: 'CPCB Guidelines for Ambient Air Quality Monitoring (NAAQS 2009 Standards) / Continuous BAM-1020 Telemetry',
    admissibilityRequirement: 'Calibrated sensors with zero/span check certificates; gravimetric reference comparison within ±10%.',
    chainOfCustodyProtocol: 'Factory calibration certificates attached; filter paper desiccator weigh records before and after 24h cycle.',
    kewDataSource: 'KEW Transportation Pollution & Air Quality Telemetry Engine.'
  },
  {
    category: 'Acoustic Pollution & Commercial Horns',
    parameter: 'LAeq (Equivalent Continuous Sound Pressure Level), L10, L90, Lmax, Octave Band Frequency Spectrum',
    standardMethod: 'IEC 61672-1 Class 1 / Class 2 Sound Level Meter specifications; CPCB Noise Pollution Rules 2000 Protocol',
    admissibilityRequirement: 'Acoustic calibrator field check (94 dB / 114 dB at 1 kHz) before and after each measurement run.',
    chainOfCustodyProtocol: 'Microphone windscreen fitted, 1.2–1.5m above ground, 3.5m from reflecting facades, audio recording log.',
    kewDataSource: 'KEW Noise Pollution 42-District Monitoring Engine.'
  },
  {
    category: 'Spatial Land Use & Wetland Encroachment',
    parameter: 'Normalized Difference Vegetation Index (NDVI), Normalized Difference Water Index (NDWI), Encroachment Polygons',
    standardMethod: 'Copernicus Sentinel-2 MSI (10m resolution) & USGS Landsat-8/9 multi-temporal imagery processing',
    admissibilityRequirement: 'Certified satellite processing methodology, cloud cover <5%, documented sensor calibration metadata.',
    chainOfCustodyProtocol: 'Original imagery archive tile IDs, processing script (Google Earth Engine / QGIS workflow), coordinate system WGS 84.',
    kewDataSource: 'KEW Judicial GIS Atlas & Satellite Wetland Shrinkage Ledger.'
  },
  {
    category: 'Solid Waste & Illegal Riverbed Mining',
    parameter: 'Excavation depth below riverbed equilibrium, unsegregated municipal dumpsite footprint, Leachate migration',
    standardMethod: 'Drone photogrammetry Digital Surface Models (DSM) & Total Station topographic survey',
    admissibilityRequirement: 'Licensed drone operator certificate (DGCA compliant in India), ground control points (GCPs) accuracy <5cm.',
    chainOfCustodyProtocol: 'Raw geo-tagged EXIF data, flight log files, ground reference survey coordinates, video recording hash.',
    kewDataSource: 'KEW Riverbed Mining & Bio-Waste Telemetry Registers.'
  }
];
