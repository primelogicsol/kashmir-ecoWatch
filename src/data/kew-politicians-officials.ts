// ─────────────────────────────────────────────────────────────────────────────
// KASHMIR ECOWATCH (KEW) — ENVIRONMENTAL POLITICIANS & PUBLIC OFFICIALS REGISTRY
// Legislative Oversight · Mineral Regulation · Wetland Protection · Compliance Directives
// Two Source-Documented Profiles in Alphabetical Order: Ghulam Hassan Mir & Mohammad Yousuf Tarigami
// Research Review: November 22, 2026
// ─────────────────────────────────────────────────────────────────────────────

import type { KEWRegion } from './kew-green-heroes';

export type PoliticianVerificationTier =
  | 'SOURCE_DOCUMENTED'
  | 'EDITORIAL_PENDING'
  | 'VERIFIED_BY_EDITORIAL_BOARD';

export interface PoliticianDocumentedWork {
  year: number | string;
  title: string;
  evidenceTier: string;
  description: string;
  documentedOutcome: string;
  sourceOutlet: string;
  sourceUrl: string;
}

export interface PoliticianSourceProvenance {
  title: string;
  url: string;
  outletOrType: string;
}

export interface PoliticianDossier {
  id: string;
  name: string;
  honorific?: string;
  sortName?: string;
  sort_name?: string;
  designation: string;
  currentRole: string;
  region: KEWRegion;
  district: string;
  geographicLocus: string;
  period: string;
  category: string;
  verificationTier: PoliticianVerificationTier;
  verificationBadge: string;
  editorialTribute: string;
  tagline: string;
  biography: string;
  keyImpact: string;
  documentedWorks: PoliticianDocumentedWork[];
  sourceProvenance: PoliticianSourceProvenance[];
  researchStatus: string;
  evidenceAuditNotes: string;
  identitySafeguardNote?: string;
  pcbClaimStatusNote?: string;
  linkedModules: Array<{ label: string; url: string }>;
}

// ─────────────────────────────────────────────────────────────────────────────
// REGISTRY TELEMETRY & EDITORIAL STANDARDS
// ─────────────────────────────────────────────────────────────────────────────

export const POLITICIANS_REGISTRY_TELEMETRY = {
  totalProfiles: 2,
  profilesAlphabetical: ['Ghulam Hassan Mir', 'Mohammad Yousuf Tarigami'],
  editorialStatus: 'Source-Documented Research Profiles (Formal Board Audit Pending)',
  reviewDate: 'November 22, 2026',
  coreDistinction:
    'KEW distinguishes between recorded legislative/public interventions and empirically verified environmental remediation on the ground. Profiles represent documented public policy and legislative committee records, not uncritical endorsements.'
};

// ─────────────────────────────────────────────────────────────────────────────
// DOSSIERS (ALPHABETICAL A–Z)
// ─────────────────────────────────────────────────────────────────────────────

export const POLITICIANS_OFFICIALS_DOSSIERS: PoliticianDossier[] = [
  // 1. Ghulam Hassan Mir
  {
    id: 'pol-001',
    name: 'Ghulam Hassan Mir',
    honorific: 'Hon.',
    designation: 'Former J&K Cabinet Minister and Legislator',
    currentRole: 'Former Member, J&K Legislative Assembly (Gulmarg Constituency)',
    region: 'Kashmir Valley',
    district: 'Baramulla',
    geographicLocus: 'Gulmarg / Tangmarg',
    period: 'Environmental advocacy: 2020–2022',
    category: 'Environmental Politicians',
    verificationTier: 'SOURCE_DOCUMENTED',
    verificationBadge: 'SOURCE-DOCUMENTED',
    tagline:
      'Public advocate for regulating riverbed mineral extraction and protecting irrigation infrastructure. His reported founding chairmanship of the J&K Pollution Control Board remains unverified.',
    editorialTribute:
      'Advocacy for responsible riverbed mining, protection of irrigation systems and regulatory accountability.',
    biography:
      'Ghulam Hassan Mir is a former legislator representing the Gulmarg area and a former J&K cabinet minister. In his public interventions on mineral extraction, he raised concerns that mechanized sand and gravel mining could damage rivers, streams and agricultural irrigation systems. His statements called for stronger enforcement of mining regulations and reconsideration of mining policies.',
    keyImpact:
      'Documented environmental policy interventions addressing natural-resource extraction and protection of water-dependent livelihoods.',
    documentedWorks: [
      {
        year: '2020',
        title: 'Opposition to Mineral Extraction Practices',
        evidenceTier: 'PUBLIC POLICY INTERVENTION · INDEPENDENT MEDIA',
        description:
          'On March 3, 2020, Mir raised concerns about the auction-based extraction of sand and gravel and the potential impact of heavy machinery on streams, rivers and irrigation systems.',
        documentedOutcome:
          'Public policy objections and requests for reconsideration recorded. No resulting legislative amendment or environmental remediation has been verified.',
        sourceOutlet: 'Kashmir News Service (KNS)',
        sourceUrl: 'https://www.knskashmir.com/new-mining-policy-assault-on-people--resources-of-j-k--mir-41977'
      },
      {
        year: '2022',
        title: 'Call for Stronger Mining Regulation',
        evidenceTier: 'ENVIRONMENTAL POLICY ADVOCACY',
        description:
          'On July 28, 2022, he criticized alleged excessive mineral extraction, enforcement failures and risks to irrigation infrastructure.',
        documentedOutcome:
          'His concerns and appeal to the administration were published. Subsequent enforcement results require independent evidence.',
        sourceOutlet: 'Daily Excelsior / KNS',
        sourceUrl: 'https://www.dailyexcelsior.com/news/archive/mir-urges-administration-to-roll-back-harmful-mineral-policy'
      }
    ],
    sourceProvenance: [
      {
        title: 'New mining policy assault on people & resources of J&K: Mir',
        url: 'https://www.knskashmir.com/new-mining-policy-assault-on-people--resources-of-j-k--mir-41977',
        outletOrType: 'Kashmir News Service, March 3, 2020'
      },
      {
        title: 'Mineral policy in J&K is a disaster: G. H. Mir',
        url: 'https://www.knskashmir.com/mineral-policy-in-j-k-is-a-disaster--g-h-mir-158064',
        outletOrType: 'KNS Kashmir Archive'
      },
      {
        title: 'Mir urges administration to roll back harmful mineral policy',
        url: 'https://www.dailyexcelsior.com/news/archive/mir-urges-administration-to-roll-back-harmful-mineral-policy',
        outletOrType: 'Daily Excelsior, July 29, 2022'
      }
    ],
    researchStatus:
      'PUBLIC POLICY CONTRIBUTIONS DOCUMENTED · PCB founding chairmanship pending primary archival verification · KEW editorial approval pending',
    evidenceAuditNotes:
      'Historical institutional claim requiring verification: Mir has been described as a pioneer and first chairman of the J&K Pollution Control Board, but no appointment notification establishing this has been located. A CAG audit records a predecessor pollution-control board in 1976, with further statutory and institutional changes in 1987–1988. The title must remain unpublished as an established fact until primary appointment records are obtained.',
    pcbClaimStatusNote:
      'First Archival Verification Priority: Confirmation of the founding chairmanship of the J&K Pollution Control Board through official gazette notifications (1987–1988) prior to any final Green Hero formal tier designation.',
    linkedModules: [
      { label: 'Energy & Sectoral EIA', url: '/sectoral-eia' },
      { label: 'Regional Profiles & Resources', url: '/resources' },
      { label: 'Riverbed Mining & Water Systems', url: '/water-systems/rivers' }
    ]
  },

  // 2. Mohammad Yousuf Tarigami
  {
    id: 'pol-002',
    name: 'Mohammad Yousuf Tarigami',
    honorific: 'Hon.',
    designation: 'Member, J&K Legislative Assembly · Chairman, Committee on Environment',
    currentRole: 'Chairman, Committee on Environment (Notification LA-129-156/Legn/2026)',
    region: 'Kashmir Valley',
    district: 'Kulgam',
    geographicLocus: 'Kulgam / Srinagar',
    period: 'Legislative Session: 2026–2027',
    category: 'Environmental Politicians',
    verificationTier: 'SOURCE_DOCUMENTED',
    verificationBadge: 'SOURCE-DOCUMENTED',
    tagline:
      'Legislative oversight of Kashmir\'s wetlands, riverbed mining, pollution management and environmental compliance.',
    editorialTribute:
      'Legislative oversight of wetland conservation, riverbed mining, waste management and environmental compliance.',
    biography:
      'Mohammad Yousuf Tarigami is the Chairman of the Jammu & Kashmir Legislative Assembly Committee on Environment, appointed under notification LA-129-156/Legn/2026, dated May 12, 2026, for a term ending March 31, 2027. Under his chairmanship, the committee has examined wetland encroachment, illegal mining, wastewater pollution, tourism-related environmental safeguards and compliance reporting.',
    keyImpact:
      'Documented legislative oversight requiring environmental reporting, enforcement review and time-bound action from government agencies.',
    documentedWorks: [
      {
        year: '2026',
        title: 'Chairmanship of the Legislative Committee on Environment',
        evidenceTier: 'OFFICIAL J&K LEGISLATIVE ASSEMBLY NOTIFICATION',
        description:
          'Appointed chairman of the Assembly Committee on Environment for the period ending March 31, 2027 under official notification LA-129-156/Legn/2026.',
        documentedOutcome:
          'Statutory legislative committee appointment confirmed by the Assembly Secretariat.',
        sourceOutlet: 'J&K Legislative Assembly Secretariat / Greater Jammu',
        sourceUrl: 'https://cms.neva.gov.in/NeVA/JK/FileStructures/Notices/00bb31a4-89fa-470f-a8d6-03c5aa49b276.pdf'
      },
      {
        year: 'August 2026',
        title: 'Oversight of Illegal Mineral Extraction',
        evidenceTier: 'LEGISLATIVE COMMITTEE PROCEEDINGS',
        description:
          'Chaired a review of the Geology and Mining Department concerning unauthorized mining and regulatory enforcement. Called for satellite monitoring, GPS tracking, digital permits and coordinated oversight.',
        documentedOutcome:
          'Recommendations and action-taken reports reviewed; implementation and actual reduction of illegal extraction remain to be verified.',
        sourceOutlet: 'Kashmir Vision',
        sourceUrl: 'https://kashmirvision.in'
      },
      {
        year: 'August–October 2026',
        title: 'Wetland Protection and Anchar Lake Review',
        evidenceTier: 'LEGISLATIVE OVERSIGHT · FIELD INSPECTION',
        description:
          'Chaired a review covering six major lakes and wetlands. Subsequently inspected Anchar Lake and the SKIMS waste-management system, highlighting encroachments, sewage risks, siltation and the need for scientific restoration.',
        documentedOutcome:
          'Government departments were directed to provide conservation action reports, encroachment information and implementation timelines.',
        sourceOutlet: 'JK Monitor',
        sourceUrl: 'https://www.jkmonitor.org/environment-committee-reviews-anchar-lake-conservation-inspects-skims-waste-management-directs-time-bound-remedial-action'
      },
      {
        year: 'November 2026',
        title: 'Jammu Environmental Infrastructure Inspection',
        evidenceTier: 'LEGISLATIVE FIELD INSPECTION',
        description:
          'Led an Assembly committee visit addressing sewage treatment, water supply, waste management, River Tawi pollution and environmental infrastructure in Jammu city.',
        documentedOutcome:
          'Inspections conducted on November 16, 2026, with public concerns recorded. Completed remediation not established.',
        sourceOutlet: 'Daily Excelsior',
        sourceUrl: 'https://www.dailyexcelsior.com/tarigami-led-assembly-panel-inspects-jammu-areas-flags-civic-issues/amp/'
      }
    ],
    sourceProvenance: [
      {
        title: 'Official J&K Legislative Assembly Committee Notification (May 12, 2026)',
        url: 'https://cms.neva.gov.in/NeVA/JK/FileStructures/Notices/00bb31a4-89fa-470f-a8d6-03c5aa49b276.pdf',
        outletOrType: 'National e-Vidhan Application (NeVA) Secretariat'
      },
      {
        title: 'Environment committee reviews Anchar Lake conservation, directs time-bound action',
        url: 'https://www.jkmonitor.org/environment-committee-reviews-anchar-lake-conservation-inspects-skims-waste-management-directs-time-bound-remedial-action',
        outletOrType: 'JK Monitor, October 15, 2026'
      },
      {
        title: 'Tarigami-led assembly panel inspects Jammu areas, flags civic issues',
        url: 'https://www.dailyexcelsior.com/tarigami-led-assembly-panel-inspects-jammu-areas-flags-civic-issues/amp/',
        outletOrType: 'Daily Excelsior, November 16, 2026'
      }
    ],
    researchStatus:
      'OFFICIAL APPOINTMENT AND LEGISLATIVE ACTIONS DOCUMENTED · Environmental compliance outcomes pending · KEW editorial approval pending',
    evidenceAuditNotes:
      'Statutory legislative committee chairmanship established by official gazette notification LA-129-156/Legn/2026. Evidentiary standard records committee proceedings and inspection directives; on-ground environmental remediation by relevant executive agencies is tracked separately.',
    linkedModules: [
      { label: 'Energy & Sectoral EIA', url: '/sectoral-eia' },
      { label: 'Regional Profiles & Resources', url: '/resources' },
      { label: 'Wetlands & Anchar Lake Conservation', url: '/water-systems/wetlands' }
    ]
  }
];
