// ─────────────────────────────────────────────────────────────────────────────
// KASHMIR ECOWATCH (KEW) — NGOS & COMMUNITY GREEN CHAMPIONS REGISTRY
// Wetland Restoration · Community Conservation · Mountain Stewardship · Spring Rejuvenation
// Expansion: 14 Calibrated Community Records + 13 New NGO Founders & Leaders + 3 Cross-Links + 2 Queue Leads
// Research Review: November 22, 2026
// ─────────────────────────────────────────────────────────────────────────────

import type { KEWRegion } from './kew-green-heroes';

export type NgoLeaderTier =
  | 'INDEPENDENTLY_DOCUMENTED'
  | 'RESEARCH_CANDIDATE'
  | 'HISTORICAL_CONSERVATION_LEGACY'
  | 'VERIFICATION_QUEUE';

export interface NgoDocumentedWork {
  year: number | string;
  title: string;
  evidenceTier: string;
  description: string;
  documentedOutcome: string;
  sourceOutlet: string;
  sourceUrl?: string;
}

export interface NgoSourceProvenance {
  title: string;
  url: string;
  outletOrType: string;
}

export interface NgoLeaderDossier {
  id: string;
  name: string;
  honorific?: string;
  sortName?: string;
  sort_name?: string;
  role: string;
  organization: string;
  region: KEWRegion;
  district: string;
  geographicLocus: string;
  subgroup: 'NGO_FOUNDERS_HEADS' | 'HISTORICAL_CROSS_REGIONAL' | 'COMMUNITY_GUARDIANS';
  period: string;
  verificationTier: NgoLeaderTier;
  verificationBadge: string;
  tagline: string;
  editorialTribute: string;
  biography: string;
  keyImpact: string;
  documentedWorks: NgoDocumentedWork[];
  sourceProvenance: NgoSourceProvenance[];
  researchStatus: string;
  evidenceAuditNotes: string;
  linkedModules: Array<{ label: string; url: string }>;
}

export interface NgoCrossLinkHero {
  name: string;
  honorific?: string;
  sortName?: string;
  sort_name?: string;
  originalCategory: string;
  ngoLeadership: string;
  organization: string;
  sourceCitation: string;
  profileId: string;
}

export interface AjkVerificationQueueLead {
  name: string;
  honorific?: string;
  sortName?: string;
  sort_name?: string;
  organization: string;
  registrationNo: string;
  locus: string;
  environmentalScope: string;
  sourceCitation: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// TELEMETRY & STRATEGIC GOVERNANCE PRINCIPLES
// ─────────────────────────────────────────────────────────────────────────────

export const NGOS_COMMUNITY_TELEMETRY = {
  existingRecords: 14,
  newNgoCandidates: 13,
  crossLinksIdentified: 3,
  queueLeads: 2,
  totalCombinedEntities: 29,
  reviewDate: 'November 22, 2026',
  strategicQuestion:
    'Should KEW make NGO registration evidence and independently documented fieldwork mandatory before granting the VERIFIED CONTRIBUTOR designation, even if that requires moving some of the existing 14 profiles back into research review?',
  auditPrinciple:
    'Reported figures (such as thousands of truckloads of silt or specific counts of ponds/springs) are archived as reported cleanup/activity metrics rather than empirical measurements of ecological recovery. Official NGO registration and dated project records are required for permanent verified tiers.'
};

// ─────────────────────────────────────────────────────────────────────────────
// 1. MANZOOR AHMAD WANGNOO (FEATURED DOSSIER)
// ─────────────────────────────────────────────────────────────────────────────

export const MANZOOR_WANGNOO_DOSSIER: NgoLeaderDossier = {
  id: 'ngo-001',
  name: 'Manzoor Ahmad Wangnoo',
  role: 'Founder and Chairman',
  organization: 'Nigeen Lake Conservation Organisation (NLCO)',
  region: 'Kashmir Valley',
  district: 'Srinagar',
  geographicLocus: 'Nigeen Lake, Khushalsar & Gilsar Basins',
  subgroup: 'NGO_FOUNDERS_HEADS',
  period: 'Documented Program: 2021–2026',
  verificationTier: 'INDEPENDENTLY_DOCUMENTED',
  verificationBadge: 'INDEPENDENTLY DOCUMENTED',
  tagline:
    'Community-led restoration of Khushalsar and Gilsar lakes, spring rejuvenation and wetland conservation through Mission Ehsaas.',
  editorialTribute:
    'Mobilizing communities to restore Kashmir\'s degraded urban lakes, wetlands and natural springs.',
  biography:
    'Manzoor Ahmad Wangnoo is a Kashmiri environmental campaigner and NGO founder whose organization has led long-running cleanup and wetland-restoration efforts around Nigeen, Khushalsar and Gilsar lakes. His Mission Ehsaas, launched in February 2021, brought together residents, volunteers and government agencies for removing accumulated waste, reopening water channels, restoring springs and advocating long-term lake management.',
  keyImpact:
    'Large-scale volunteer mobilization and documented cleanup and spring-restoration initiatives in Srinagar\'s connected lake ecosystems.',
  documentedWorks: [
    {
      year: '2021',
      title: 'Mission Ehsaas and Khushalsar Lake',
      evidenceTier: 'INDEPENDENT ENVIRONMENTAL JOURNALISM',
      description:
        'Launched a community-led campaign to remove accumulated municipal waste, plastic debris, and choked silt to restore degraded water channels in Khushalsar Lake.',
      documentedOutcome:
        'News reporting describes thousands of truckloads of sediment and waste removed through collective action. These are reported cleanup figures, not independent measurements of ecosystem recovery.',
      sourceOutlet: 'Awaz The Voice',
      sourceUrl: 'https://www.awazthevoice.in'
    },
    {
      year: '2024',
      title: 'Gasiyar Khushalsar Spring Restoration',
      evidenceTier: 'DOCUMENTED COMMUNITY CONSERVATION PROJECT',
      description:
        'NLCO initiated desiltation, stone bunding, and perimeter protection on two historic natural springs in the Khushalsar area with public-agency collaboration.',
      documentedOutcome:
        'Spring-restoration activities commenced. Long-term water quality and spring discharge require scientific monitoring.',
      sourceOutlet: 'KNS Kashmir',
      sourceUrl: 'https://www.knskashmir.com'
    },
    {
      year: '2025',
      title: 'Community Spring Restoration',
      evidenceTier: 'INDEPENDENT MEDIA',
      description:
        'Helped coordinate a further urban spring-restoration initiative in Srinagar alongside the Srinagar Municipal Corporation (SMC) and Kashmir Concern.',
      documentedOutcome:
        'Media reported the launch of cleanup and channel reconnection work on an eleventh urban spring.',
      sourceOutlet: 'Kashmir Ahead',
      sourceUrl: 'https://kashmirahead.com'
    },
    {
      year: '2026',
      title: 'Gilsar–Khushalsar Restoration Accountability',
      evidenceTier: 'PUBLIC ENVIRONMENTAL ADVOCACY',
      description:
        'Continued pressing the Lake Conservation and Management Authority (LCMA) and regional administration for scientific sewage diversion and sustained maintenance of both lakes.',
      documentedOutcome:
        'Memoranda submitted, multi-agency stakeholder meetings held, and community concerns regarding delayed sewage interception reported publicly.',
      sourceOutlet: 'Daily Excelsior',
      sourceUrl: 'https://www.dailyexcelsior.com'
    }
  ],
  sourceProvenance: [
    {
      title: 'How Manzoor Wangnoo and NLCO revived Khushalsar Lake',
      url: 'https://www.indiawaterportal.org',
      outletOrType: 'India Water Portal, August 2025'
    },
    {
      title: 'Mission Ehsaas: The revival of Srinagar twin lakes',
      url: 'https://www.awazthevoice.in',
      outletOrType: 'Awaz the Voice, July 2025'
    },
    {
      title: 'NLCO flags urgent issues on Gilsar-Khushalsar restoration',
      url: 'https://www.dailyexcelsior.com',
      outletOrType: 'Daily Excelsior, June 2026'
    }
  ],
  researchStatus:
    'NGO leadership and restoration activities independently documented · KEW editorial approval pending',
  evidenceAuditNotes:
    'Independent media accounts verify extensive community mobilization, water channel clearing, and spring desiltation. Quantitative cleanup volumes (e.g., thousands of truckloads) reflect reported organizational figures and are subject to upcoming KEW lake bathymetry and water quality sensor corroboration.',
  linkedModules: [
    { label: 'Water Systems: Lakes & Wetlands', url: '/water-systems/lakes' },
    { label: 'Gilsar & Khushalsar Intelligence', url: '/water-systems/wetlands' },
    { label: 'Wetland Restoration Tracker', url: '/water-systems/restoration' },
    { label: 'Community Conservation', url: '/resources' },
    { label: 'Environmental Compliance Tracker', url: '/resources/environmental-pil' }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. ADDITIONAL NGO FOUNDERS & HEADS (10 CANDIDATES ARRANGED A–Z)
// ─────────────────────────────────────────────────────────────────────────────

export const ADDITIONAL_NGO_LEADERS: NgoLeaderDossier[] = [
  // 1. Bhushan Lal Parimoo (Jammu)
  {
    id: 'ngo-002',
    name: 'Bhushan Lal Parimoo',
    role: 'Chairman',
    organization: 'Environment Awareness Forum',
    region: 'Jammu',
    district: 'Jammu',
    geographicLocus: 'River Tawi Basin & Jammu Urban Corridor',
    subgroup: 'NGO_FOUNDERS_HEADS',
    period: 'Advocacy: 1998–2026',
    verificationTier: 'RESEARCH_CANDIDATE',
    verificationBadge: 'RESEARCH CANDIDATE',
    tagline: 'Longstanding Save Tawi advocacy, river pollution investigations and scrutiny of artificial lake / riverfront development.',
    editorialTribute: 'Decades of vigilant watchdog advocacy protecting River Tawi from municipal effluent and artificial embankments.',
    biography: 'Bhushan Lal Parimoo is an environmental advocate and long-serving Chairman of the Environment Awareness Forum in Jammu. His work encompasses sustained legal and public advocacy concerning industrial and municipal sewage discharge into the Tawi River, scrutiny of concrete artificial lake projects, and persistent RTI documentation of water pollution.',
    keyImpact: 'Systematic public documentation of River Tawi pollution loads and critical policy interventions regarding urban riverfront engineering.',
    documentedWorks: [
      {
        year: '2023',
        title: 'Tawi Riverfront Development & Ecological Inundation Alerts',
        evidenceTier: 'INDEPENDENT POLICY ANALYSIS',
        description: 'Challenged artificial lake and concrete channelization models along River Tawi, warning of altered hydrological flows during monsoon flash floods.',
        documentedOutcome: 'Published critiques and representations to environmental regulators citing SANDRP and CPCB standards.',
        sourceOutlet: 'SANDRP / Daily Excelsior'
      }
    ],
    sourceProvenance: [
      {
        title: 'River Tawi Pollution and Riverfront Challenges in Jammu',
        url: 'https://sandrp.in',
        outletOrType: 'SANDRP Archive, 2023'
      }
    ],
    researchStatus: 'Research candidate with documented organizational affiliation and public advocacy · Primary fieldwork verification pending',
    evidenceAuditNotes: 'Longstanding public record of advocacy. Formal registration certificate of Environment Awareness Forum and court intervention dockets are queued for archival confirmation.',
    linkedModules: [
      { label: 'Tawi River Water Quality', url: '/water-systems/rivers' },
      { label: 'Flood Risk Engineering', url: '/water-systems/flood-risk' }
    ]
  },

  // 2. Didar Ali (Gilgit-Baltistan, Hunza)
  {
    id: 'ngo-003',
    name: 'Didar Ali',
    role: 'Chief Executive Officer',
    organization: 'Mountains & People',
    region: 'Gilgit-Baltistan',
    district: 'Hunza',
    geographicLocus: 'Gulmit, Gojal, Upper Hunza',
    subgroup: 'NGO_FOUNDERS_HEADS',
    period: '2016–2026',
    verificationTier: 'RESEARCH_CANDIDATE',
    verificationBadge: 'RESEARCH CANDIDATE',
    tagline: 'Environmental education and community-led protection of fragile high-altitude mountain ecosystems across Gojal.',
    editorialTribute: 'Fostering mountain stewardship and climate education among youth in the Karakoram highlands.',
    biography: 'Didar Ali is the CEO of Mountains & People, an NGO based in Gulmit, Gojal, Upper Hunza. Listed by the FAO Mountain Partnership, his initiative trains local youth in environmental education, climate vulnerability awareness, and community-based eco-tourism in high-altitude Karakoram valleys.',
    keyImpact: 'Pioneered community mountain stewardship curricula and climate adaptation workshops across upper Hunza villages.',
    documentedWorks: [
      {
        year: '2022',
        title: 'Mountain Youth Climate Education Network',
        evidenceTier: 'INTERNATIONAL INSTITUTIONAL CITATION',
        description: 'Conducted high-altitude environmental learning modules focused on glacier monitoring, waste reduction, and mountain biodiversity.',
        documentedOutcome: 'Formally listed and indexed as an active mountain education partner by the FAO Mountain Partnership.',
        sourceOutlet: 'FAO Mountain Partnership'
      }
    ],
    sourceProvenance: [
      {
        title: 'Mountains & People Member Directory Listing',
        url: 'https://www.fao.org/mountain-partnership',
        outletOrType: 'FAO Mountain Partnership Roster'
      }
    ],
    researchStatus: 'Documented affiliation with FAO Mountain Partnership · Project field outcomes pending KEW audit',
    evidenceAuditNotes: 'International institutional listing confirmed. Local legal registration and verified workshop headcounts are logged in the research queue.',
    linkedModules: [
      { label: 'Cryosphere & High Mountain Ecology', url: '/hazard-intelligence/glofs' },
      { label: 'Regional Profiles: Gilgit-Baltistan', url: '/resources' }
    ]
  },

  // 3. Dr. Eshey Tondup (Eshey Tundup) (Ladakh, Leh)
  {
    id: 'ngo-004',
    name: 'Dr. Eshey Tondup',
    honorific: 'Dr.',
    role: 'Executive Director',
    organization: 'Ladakh Ecological Development Group (LEDeG)',
    region: 'Ladakh',
    district: 'Leh',
    geographicLocus: 'Leh & Changthang Sub-Divisions',
    subgroup: 'NGO_FOUNDERS_HEADS',
    period: '2015–2026',
    verificationTier: 'RESEARCH_CANDIDATE',
    verificationBadge: 'RESEARCH CANDIDATE',
    tagline: 'Renewable energy, sustainable sanitation, waste reduction and urban environmental planning in cold-desert Leh.',
    editorialTribute: 'Advancing sustainable ecological infrastructure and passive solar technology in cold-desert habitats.',
    biography: 'Dr. Eshey Tondup serves as the Executive Director of the Ladakh Ecological Development Group (LEDeG), one of the oldest ecological organizations in the trans-Himalayan region. He has coordinated renewable energy installations, decentralized wastewater treatment systems (DEWATS), and urban sustainable mobility frameworks for Leh town.',
    keyImpact: 'Implementation of decentralized wastewater treatment systems and passive solar technology across Ladakh communities.',
    documentedWorks: [
      {
        year: '2021',
        title: 'Decentralized Urban Sanitation & DEWATS Implementation',
        evidenceTier: 'TECHNICAL DEVELOPMENT REPORT',
        description: 'Engineered sub-surface constructed wetlands and insulated decentralized sanitation units operating under sub-zero winter temperatures in Leh.',
        documentedOutcome: 'Sanitation facilities operational in peri-urban Leh, mitigating blackwater infiltration into fragile alluvial aquifers.',
        sourceOutlet: 'Reach Ladakh / LEDeG Official Records'
      }
    ],
    sourceProvenance: [
      {
        title: 'LEDeG Environmental Interventions in Cold Arid Ladakh',
        url: 'https://www.reachladakh.com',
        outletOrType: 'Reach Ladakh Bulletin, 2021'
      }
    ],
    researchStatus: 'Executive directorship and institutional programs documented · Scientific sanitation effluent metrics pending',
    evidenceAuditNotes: 'LEDeG is an established registered society. Individual executive directorship confirmed. Long-term groundwater quality impacts remain in research calibration.',
    linkedModules: [
      { label: 'Cold-Desert Water Systems', url: '/water-systems/groundwater' },
      { label: 'Regional Profiles: Ladakh', url: '/resources' }
    ]
  },

  // 4. Ghulam Mohammad (Gilgit-Baltistan, Skardu)
  {
    id: 'ngo-005',
    name: 'Ghulam Mohammad',
    role: 'Chief Executive Officer',
    organization: 'Baltistan Wildlife Conservation and Development Organization (BWCDO)',
    region: 'Gilgit-Baltistan',
    district: 'Skardu',
    geographicLocus: 'Baltistan Valleys & Karakoram Wildlife Corridors',
    subgroup: 'NGO_FOUNDERS_HEADS',
    period: '2010–2026',
    verificationTier: 'RESEARCH_CANDIDATE',
    verificationBadge: 'RESEARCH CANDIDATE',
    tagline: 'Community-based snow leopard conservation and livestock-loss insurance schemes in Baltistan.',
    editorialTribute: 'Leading grassroots coexistence programs transforming snow leopard conflict into community-insured stewardship.',
    biography: 'Ghulam Mohammad is the CEO of the Baltistan Wildlife Conservation and Development Organization (BWCDO). Documented in a UNDP conservation interview, he has managed community-led predator insurance programs and constructed predator-proof corrals that directly protect snow leopards from retaliatory killings by herders across Baltistan.',
    keyImpact: 'Scaled community-managed livestock insurance across 30+ Baltistan villages, substantially reducing retaliatory snow leopard mortality.',
    documentedWorks: [
      {
        year: '2020',
        title: 'Community Livestock Insurance & Predator-Proof Corrals',
        evidenceTier: 'UNDP / EQUATOR INITIATIVE INTERVIEW',
        description: 'Implemented co-financed insurance pools compensating pastoralists for confirmed snow leopard predation while constructing mesh-reinforced corrals.',
        documentedOutcome: 'Zero retaliatory killings recorded across target project valleys over consecutive seasonal grazing cycles.',
        sourceOutlet: 'UNDP Learning for Nature'
      }
    ],
    sourceProvenance: [
      {
        title: 'Community Conservation and Snow Leopard Protection in Baltistan',
        url: 'https://www.learningfornature.org',
        outletOrType: 'UNDP Learning for Nature, 2020'
      }
    ],
    researchStatus: 'CEO position and UNDP interview documented · Independent annual herd-loss audit records pending',
    evidenceAuditNotes: 'BWCDO received the 2017 Equator Prize. CEO role substantiated by international interview recordings. Exact livestock claims data queued for archival verification.',
    linkedModules: [
      { label: 'Protected Network: Snow Leopard', url: '/protected-network/species-intelligence' },
      { label: 'Human-Wildlife Conflict', url: '/protected-network/human-wildlife-conflict' }
    ]
  },

  // 5. Dr. Mohammed Deen (Ladakh, Leh)
  {
    id: 'ngo-006',
    name: 'Dr. Mohammed Deen',
    honorific: 'Dr.',
    role: 'Founder and President',
    organization: 'Ladakh Environment and Health Organisation (LEHO)',
    region: 'Ladakh',
    district: 'Leh',
    geographicLocus: 'Leh, Sham & Nubra Valleys',
    subgroup: 'NGO_FOUNDERS_HEADS',
    period: '1991–2026',
    verificationTier: 'RESEARCH_CANDIDATE',
    verificationBadge: 'RESEARCH CANDIDATE',
    tagline: 'Ecological farming, passive solar design and responsible community-based tourism in trans-Himalayan villages.',
    editorialTribute: 'Four decades of promoting indigenous organic agriculture, solar greenhouses, and public health in Ladakh.',
    biography: 'Dr. Mohammed Deen is a veteran veterinarian, rural development specialist, and Founder-President of LEHO. Since 1991, LEHO has championed chemical-free organic farming, passive solar greenhouses for winter vegetable cultivation, and community-led health and sanitation initiatives in Ladakh.',
    keyImpact: 'Pioneered passive solar pit greenhouses enabling fresh winter vegetable production in -30°C trans-Himalayan valleys.',
    documentedWorks: [
      {
        year: '2019',
        title: 'Passive Solar Greenhouse Expansion & Organic Agriculture',
        evidenceTier: 'ORGANIZATIONAL ANNUAL REPORT',
        description: 'Constructed rammed-earth and polythene passive greenhouses allowing Ladakh farmers to produce greens through freezing winter months without energy inputs.',
        documentedOutcome: 'Hundreds of village households achieved winter nutrition autonomy and eliminated chemical fertilizer dependency.',
        sourceOutlet: 'LEHO Official Gazette'
      }
    ],
    sourceProvenance: [
      {
        title: 'LEHO Three Decades of Community Ecological Development',
        url: 'https://www.leho.org.in',
        outletOrType: 'LEHO Institutional Archive'
      }
    ],
    researchStatus: 'Founder-President status and organic farming programs documented · External soil carbon metrics pending',
    evidenceAuditNotes: 'LEHO is a legally registered society in Leh. Founder role verified. Independent third-party audits of agricultural yields are placed in research queue.',
    linkedModules: [
      { label: 'Agricultural Soil & Climate', url: '/resources' },
      { label: 'Regional Profiles: Ladakh', url: '/resources' }
    ]
  },

  // 6. Mushtaq Pahalgami (Kashmir Valley, Anantnag)
  {
    id: 'ngo-007',
    name: 'Mushtaq Pahalgami',
    role: 'Founder and President',
    organization: 'Himalayan Welfare Organization (HWO)',
    region: 'Kashmir Valley',
    district: 'Anantnag',
    geographicLocus: 'Pahalgam, Lidder Valley & Aru Wildlife Corridor',
    subgroup: 'NGO_FOUNDERS_HEADS',
    period: '2008–2026',
    verificationTier: 'RESEARCH_CANDIDATE',
    verificationBadge: 'RESEARCH CANDIDATE',
    tagline: 'Eco-trekking, environmental awareness, and public scrutiny of land encroachment and illegal construction around Pahalgam.',
    editorialTribute: 'Frontline watchdog activism protecting the Upper Lidder basin and alpine trails from unregulated tourist sprawl.',
    biography: 'Mushtaq Pahalgami is a grassroots environmental activist and Founder-President of Himalayan Welfare Organization (HWO), established in 2008 in Pahalgam. He has campaigned persistently against plastic pollution along trekking routes to Kolahoi Glacier, documented municipal sewage discharge into River Lidder, and intervened before regulatory authorities against master plan violations.',
    keyImpact: 'Organized high-altitude cleanup drives along alpine trekking routes and consistently flagged unauthorized riverbank commercial construction.',
    documentedWorks: [
      {
        year: '2022',
        title: 'Lidder Valley Solid Waste & Riverbank Encroachment Campaign',
        evidenceTier: 'INDEPENDENT INVESTIGATIVE REPORTING',
        description: 'Organized civil society cleanups along Lidder riverbanks and filed representations against hotel construction violating riparian buffer zones.',
        documentedOutcome: 'Increased administrative vigilance and seasonal waste collection checkpoints instituted around Pahalgam town.',
        sourceOutlet: 'HWO Portal / Kashmir Reader'
      }
    ],
    sourceProvenance: [
      {
        title: 'Himalayan Welfare Organization Environmental Mandate',
        url: 'https://hwojk.org.in',
        outletOrType: 'HWO Official Portal'
      }
    ],
    researchStatus: 'HWO leadership and local campaign activities documented · Litigation docket verification pending',
    evidenceAuditNotes: 'Organization established in 2008. Public interventions in regional press verified. Formal legal registration certificates and specific cleanup volumes are undergoing confirmation.',
    linkedModules: [
      { label: 'Lidder River Systems', url: '/water-systems/rivers' },
      { label: 'Pahalgam Eco-Sensitive Zone', url: '/protected-network' }
    ]
  },

  // 7. Dr. Rouf Ur Rafiq (Kashmir Valley, Pampore)
  {
    id: 'ngo-008',
    name: 'Dr. Rouf Ur Rafiq',
    honorific: 'Dr.',
    role: 'Founder-Chairman',
    organization: 'SR Foundation',
    region: 'Kashmir Valley',
    district: 'Pulwama',
    geographicLocus: 'Pampore & Khrew Industrial Belts',
    subgroup: 'NGO_FOUNDERS_HEADS',
    period: '2018–2026',
    verificationTier: 'RESEARCH_CANDIDATE',
    verificationBadge: 'RESEARCH CANDIDATE',
    tagline: 'Pollution-control education and community health advocacy addressing cement industrial emissions in Khrew and saffron soils.',
    editorialTribute: 'Raising environmental health awareness and organizing community education against airborne industrial particulate matter.',
    biography: 'Dr. Rouf Ur Rafiq is the Founder-Chairman of SR Foundation. His work focuses on environmental health education, organizing community seminars and public awareness programs regarding airborne particulate emissions from cement factories in the Khrew-Pampore belt and their damaging impact on saffron cultivation and respiratory health.',
    keyImpact: 'Organized community health screenings and public education on industrial particulate pollution impacting saffron karewas.',
    documentedWorks: [
      {
        year: '2023',
        title: 'Khrew Industrial Belt Environmental Health Seminars',
        evidenceTier: 'INDEPENDENT LOCAL MEDIA',
        description: 'Convened multi-stakeholder awareness camps highlighting PM2.5 and PM10 particulate deposition on saffron flowers and local water bodies.',
        documentedOutcome: 'Local community petitions submitted to the Pollution Control Committee demanding continuous emission monitoring systems.',
        sourceOutlet: 'Srinagar Mail'
      }
    ],
    sourceProvenance: [
      {
        title: 'SR Foundation Organizes Environmental Awareness in Pampore',
        url: 'https://srinagarmail.net',
        outletOrType: 'Srinagar Mail, 2023'
      }
    ],
    researchStatus: 'Foundation chairmanship and public seminars documented · Ambient air sensor data pending',
    evidenceAuditNotes: 'Seminar reports in regional media verified. Primary air quality monitoring data and formal society registration documentation are logged for verification.',
    linkedModules: [
      { label: 'Air Pollution Surveillance', url: '/environmental-monitoring/air-pollution' },
      { label: 'Environmental Health', url: '/environmental-monitoring/environmental-health' }
    ]
  },

  // 8. Dr. Shafqat Hussain (Gilgit-Baltistan, Baltistan)
  {
    id: 'ngo-009',
    name: 'Dr. Shafqat Hussain',
    honorific: 'Dr.',
    role: 'Founder',
    organization: 'Project Snow Leopard (now BWCDO)',
    region: 'Gilgit-Baltistan',
    district: 'Skardu',
    geographicLocus: 'Baltistan & Karakoram Mountain Range',
    subgroup: 'NGO_FOUNDERS_HEADS',
    period: '1999–2026',
    verificationTier: 'RESEARCH_CANDIDATE',
    verificationBadge: 'RESEARCH CANDIDATE',
    tagline: 'Pioneered livestock-insurance approaches to eliminate retaliatory killings of snow leopards in the Karakoram.',
    editorialTribute: 'Global pioneer of community-based predator insurance aligning pastoral economics with snow leopard survival.',
    biography: 'Dr. Shafqat Hussain is an environmental anthropologist and founder of Project Snow Leopard (later institutionalized as BWCDO). In 1999, he developed the groundbreaking community livestock-insurance model wherein farmers contribute premiums matched by conservation funds to compensate for verified livestock losses, effectively dismantling the economic incentive for retaliatory killing of endangered snow leopards. He was awarded a Rolex Award for Enterprise in 2006, and the organization received the Equator Prize in 2017.',
    keyImpact: 'Created the worldwide benchmark model for community-based carnivore coexistence, practically eliminating retaliatory snow leopard killings in monitored valleys.',
    documentedWorks: [
      {
        year: '2006',
        title: 'Rolex Award for Enterprise: Coexistence Project',
        evidenceTier: 'INTERNATIONAL AWARD CITATION & PEER-REVIEWED RESEARCH',
        description: 'Established co-financed community insurance and predator-proof corral design across Baltistan mountain valleys.',
        documentedOutcome: 'Model validated internationally and published extensively in conservation biology literature; won Rolex Enterprise Award.',
        sourceOutlet: 'Rolex Awards for Enterprise'
      }
    ],
    sourceProvenance: [
      {
        title: 'Rolex Awards for Enterprise Laureate: Shafqat Hussain',
        url: 'https://www.rolex.org/rolex-awards',
        outletOrType: 'Rolex Enterprise Archive, 2006'
      }
    ],
    researchStatus: 'Founder role, Rolex Award, and peer-reviewed methodology verified · Current localized compensation logs queued for verification',
    evidenceAuditNotes: 'International accolades and scientific publications fully verified. Organizational management transitioned to BWCDO in Skardu.',
    linkedModules: [
      { label: 'Snow Leopard Habitat Intelligence', url: '/protected-network/species-intelligence' },
      { label: 'Human-Wildlife Coexistence', url: '/protected-network/human-wildlife-conflict' }
    ]
  },

  // 9. Sifat Uddin Shah (Gilgit-Baltistan, Ghulkin)
  {
    id: 'ngo-010',
    name: 'Sifat Uddin Shah',
    role: 'Founding President',
    organization: 'Ghulkin Nature Conservation (GNC)',
    region: 'Gilgit-Baltistan',
    district: 'Hunza',
    geographicLocus: 'Ghulkin, Gojal, Upper Hunza',
    subgroup: 'NGO_FOUNDERS_HEADS',
    period: '2012–2026',
    verificationTier: 'RESEARCH_CANDIDATE',
    verificationBadge: 'RESEARCH CANDIDATE',
    tagline: 'Community hunting restrictions, sustainable pasture grazing, and local wildlife conservation mobilization in Ghulkin.',
    editorialTribute: 'Mobilizing indigenous village councils for community pasture reserves and wildlife sanctuary bylaws.',
    biography: 'Sifat Uddin Shah is the Founding President of Ghulkin Nature Conservation in Gojal, upper Hunza. Documented by the Braldu Valley Foundation and local community chronicles, his organization mobilized villagers to enact self-imposed community bans on illegal hunting of Himalayan ibex, established rotational grazing reserves to prevent pasture degradation, and promoted local eco-tourism.',
    keyImpact: 'Instituted self-enforcing community wildlife sanctuaries leading to documented recovery of local Himalayan ibex populations.',
    documentedWorks: [
      {
        year: '2021',
        title: 'Ghulkin Community Wildlife Sanctuary & Pasture Bylaws',
        evidenceTier: 'SECONDARY CONSERVATION RECORD',
        description: 'Enacted village-level conservation rules regulating seasonal livestock grazing in alpine pastures and establishing zero-tolerance community monitoring against poaching.',
        documentedOutcome: 'Himalayan ibex sightings stabilized around Ghulkin moraines; community reporting mechanism active.',
        sourceOutlet: 'Braldu Valley Foundation Chronicle'
      }
    ],
    sourceProvenance: [
      {
        title: 'Community Conservation Mobilization in Upper Hunza',
        url: 'https://www.braldu.org',
        outletOrType: 'Braldu Valley Foundation Report'
      }
    ],
    researchStatus: 'Community presidency and local bylaws documented in secondary records · Independent wildlife census corroboration needed',
    evidenceAuditNotes: 'Indigenous conservation rules documented in secondary accounts. Primary government wildlife department census and formal registration certificate are in the verification queue.',
    linkedModules: [
      { label: 'Protected Network Corridors', url: '/protected-network/corridors-and-connectivity' },
      { label: 'Regional Profiles: Gilgit-Baltistan', url: '/resources' }
    ]
  },

  // 10. Vivek Parihar (Jammu)
  {
    id: 'ngo-011',
    name: 'Vivek Parihar',
    role: 'Founder and CEO',
    organization: 'Live For Others - Being Helpful Foundation (LFO-BHF)',
    region: 'Jammu',
    district: 'Jammu',
    geographicLocus: 'River Tawi Riverbed & Jammu City',
    subgroup: 'NGO_FOUNDERS_HEADS',
    period: '2019–2026',
    verificationTier: 'RESEARCH_CANDIDATE',
    verificationBadge: 'RESEARCH CANDIDATE',
    tagline: 'Youth-driven river cleanup drives, solid waste management and Save River Tawi community campaigns.',
    editorialTribute: 'Mobilizing hundreds of university students and youth volunteers for riverbank waste recovery along River Tawi.',
    biography: 'Vivek Parihar is the Founder and CEO of LFO-BHF, a youth-led social and environmental organization active in Jammu. The foundation has organized prominent public cleanup drives along the Tawi riverbanks, most notably the October 2023 Save River Tawi campaign, removing single-use plastic waste and raising public awareness against throwing non-biodegradable debris into the river.',
    keyImpact: 'Mobilized hundreds of student volunteers for recurring plastic recovery drives along River Tawi ghats and bridges.',
    documentedWorks: [
      {
        year: '2023',
        title: 'Save River Tawi Megacleanup Campaign',
        evidenceTier: 'INDEPENDENT REGIONAL JOURNALISM',
        description: 'Coordinated a multi-college youth volunteer cleanup along the Tawi bridge and temple ghats, recovering over 2 metric tonnes of discarded polythene and ritual waste.',
        documentedOutcome: 'Substantial plastic debris collected and delivered to Jammu Municipal Corporation waste transport facilities.',
        sourceOutlet: 'Early Post Daily'
      }
    ],
    sourceProvenance: [
      {
        title: 'LFO-BHF Organizes Save River Tawi Mega Cleanup in Jammu',
        url: 'https://earlypost.in',
        outletOrType: 'Early Post Daily, October 2023'
      }
    ],
    researchStatus: 'Founder role and youth cleanup drives documented in press · Long-term riparian monitoring pending',
    evidenceAuditNotes: 'Youth cleanup drives documented with photo-evidence in regional newspapers. Legal trust registration verified; long-term waste audit metrics queued for evaluation.',
    linkedModules: [
      { label: 'Plastic Pollution Surveillance', url: '/environmental-monitoring/plastic-pollution' },
      { label: 'River Tawi Water Systems', url: '/water-systems/rivers' }
    ]
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 3. HISTORICAL & CROSS-REGIONAL NGO LEADERSHIP (2 PROFILES)
// ─────────────────────────────────────────────────────────────────────────────

export const HISTORICAL_CROSS_REGIONAL_NGO_LEADERS: NgoLeaderDossier[] = [
  // 1. Dr. Anis-ur-Rahman (AJ&K conservation coverage · Neelum Valley)
  {
    id: 'ngo-012',
    name: 'Dr. Anis-ur-Rahman',
    honorific: 'Dr.',
    role: 'Co-founder',
    organization: 'Himalayan Wildlife Foundation (HWF)',
    region: 'Azad Jammu & Kashmir',
    district: 'Neelum',
    geographicLocus: 'Neelum Valley & Musk Deer National Park',
    subgroup: 'HISTORICAL_CROSS_REGIONAL',
    period: 'Conservation Leadership: 1993–2026',
    verificationTier: 'RESEARCH_CANDIDATE',
    verificationBadge: 'RESEARCH CANDIDATE',
    tagline: 'Pioneered biodiversity conservation in Neelum Valley, including the establishment and stewardship of Musk Deer National Park.',
    editorialTribute: 'Leading pioneering high-altitude wildlife conservation and protected area management in AJ&K.',
    biography: 'Dr. Anis-ur-Rahman is a veteran conservationist and co-founder of the Himalayan Wildlife Foundation (HWF). The foundation has executed foundational biodiversity conservation work in AJ&K\'s Neelum Valley, most prominently the Musk Deer National Park initiative and community anti-poaching programs. He is registered as an external NGO leader with documented AJ&K conservation projects, rather than an AJ&K resident.',
    keyImpact: 'Instrumental in the institutional establishment, boundary demarcation, and community-warden training for Musk Deer National Park.',
    documentedWorks: [
      {
        year: '2004',
        title: 'Musk Deer National Park Conservation Master Plan',
        evidenceTier: 'OFFICIAL CONSERVATION REPORT',
        description: 'Coordinated technical baseline surveys, habitat mapping, and community participatory wildlife protection in Upper Neelum.',
        documentedOutcome: 'Formally gazetted and protected 52,815 hectares of alpine birch and conifer habitat for the endangered Kashmir musk deer.',
        sourceOutlet: 'Himalayan Wildlife Foundation'
      }
    ],
    sourceProvenance: [
      {
        title: 'Himalayan Wildlife Foundation Conservation Portfolio in Neelum',
        url: 'https://hwf.org.pk',
        outletOrType: 'HWF Official Archives'
      }
    ],
    researchStatus: 'Founding leadership and Neelum project history documented · External NGO leader with AJ&K project scope',
    evidenceAuditNotes: 'Registered as an external NGO leader with verified project footprint in AJ&K. HWF official records and park notifications substantiate historical role.',
    linkedModules: [
      { label: 'Protected Network: Musk Deer National Park', url: '/protected-network' },
      { label: 'Regional Profiles: AJ&K', url: '/resources' }
    ]
  },

  // 2. Rinchen Wangchuk (Ladakh · Leh · Historical conservation legacy)
  {
    id: 'ngo-013',
    name: 'Rinchen Wangchuk',
    role: 'Co-founder',
    organization: 'Snow Leopard Conservancy India Trust (SLC-IT)',
    region: 'Ladakh',
    district: 'Leh',
    geographicLocus: 'Hemis National Park, Rumbak & Markha Valleys',
    subgroup: 'HISTORICAL_CROSS_REGIONAL',
    period: '1968–2011 (Historical Legacy)',
    verificationTier: 'HISTORICAL_CONSERVATION_LEGACY',
    verificationBadge: 'HISTORICAL CONSERVATION LEGACY',
    tagline: 'Visionary co-founder of SLC-IT who built community-based snow leopard conservation, predator-proof corrals, and Himalayan homestays.',
    editorialTribute: 'Legendary Ladakhi naturalist who turned pastoral communities from wildlife adversaries into frontline snow leopard protectors.',
    biography: 'Rinchen Wangchuk (1968–2011) was a pioneering Ladakhi mountaineer, naturalist, and co-founder of the Snow Leopard Conservancy India Trust alongside Dr. Rodney Jackson. He recognized that snow leopard survival depended completely on pastoralist support. He pioneered predator-proof mesh corrals to stop pen massacres, launched the Himalayan Homestays program so villagers earned income directly from snow leopard tourists, and trained local youth as nature guides. He passed away in 2011, leaving an indelible international legacy.',
    keyImpact: 'Invented the Himalayan Homestays model and predator-proof corrals, transforming Hemis National Park into the premier global snow leopard sanctuary.',
    documentedWorks: [
      {
        year: '2002',
        title: 'Himalayan Homestays & Community-Based Conservation Protocol',
        evidenceTier: 'INTERNATIONAL CONSERVATION MONOGRAPH',
        description: 'Trained pastoralist women and families in Rumbak and Markha valleys to host trekkers, diverting tourism revenue directly into community conservation funds.',
        documentedOutcome: 'Eliminated retaliatory trapping across target valleys; won global ecotourism and conservation awards.',
        sourceOutlet: 'Snow Leopard Conservancy / Mountain Institute'
      }
    ],
    sourceProvenance: [
      {
        title: 'In Memory of Rinchen Wangchuk: A Visionary Conservationist',
        url: 'https://snowleopardconservancy.org',
        outletOrType: 'Snow Leopard Conservancy International, 2011'
      }
    ],
    researchStatus: 'Historical legacy verified through international publications, awards, and SLC-IT institutional archives',
    evidenceAuditNotes: 'Deceased in 2011. Formally archived under Historical NGO Conservation Leadership. Recognized globally as foundational figure in community-based big cat conservation.',
    linkedModules: [
      { label: 'Hemis National Park Intelligence', url: '/protected-network' },
      { label: 'Community Eco-Tourism Models', url: '/resources' }
    ]
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 4. EXISTING GREEN HEROES WHO ALSO HEAD NGOS (CROSS-LINKS)
// ─────────────────────────────────────────────────────────────────────────────

export const EXISTING_HEROES_NGO_CROSS_LINKS: NgoCrossLinkHero[] = [
  {
    name: 'Nadeem Qadri',
    honorific: 'Advocate',
    originalCategory: 'Advocates & Legal Professionals',
    ngoLeadership: 'Executive Director, Wildlife Conservation Fund (WCF)',
    organization: 'Wildlife Conservation Fund (WCF)',
    sourceCitation: 'Jammu & Kashmir Youth Parliament (JKYP) / High Court Bar',
    profileId: 'kew-hero-006'
  },
  {
    name: 'Dr. Raja Muzaffar Bhat',
    honorific: 'Dr.',
    originalCategory: 'Advocates & Legal Professionals / Community Champions',
    ngoLeadership: 'Chairman, J&K Climate Action Group',
    organization: 'J&K Climate Action Group',
    sourceCitation: 'India Live / RTI Movement Archives',
    profileId: 'kew-hero-001'
  },
  {
    name: 'Dr. Tsewang Namgail',
    honorific: 'Dr.',
    originalCategory: 'Scientists & Conservationists',
    ngoLeadership: 'Director, Snow Leopard Conservancy India Trust (SLC-IT)',
    organization: 'Snow Leopard Conservancy India Trust (SLC-IT)',
    sourceCitation: 'Reach Ladakh / SLC-IT Directorate',
    profileId: 'sci-011'
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 5. AJ&K GOVERNMENT-REGISTERED NGO LEADS (VERIFICATION QUEUE)
// ─────────────────────────────────────────────────────────────────────────────

export const AJK_NGO_VERIFICATION_QUEUE: AjkVerificationQueueLead[] = [
  {
    name: 'Jalal-ud-Din Akbar',
    organization: 'Tehreek Samaji Behbud',
    registrationNo: 'Registration No. 101',
    locus: 'Tehsil Authmuqam, Neelum Valley, AJ&K',
    environmentalScope: 'Reforestation, women\'s community empowerment and rural water infrastructure.',
    sourceCitation: 'AJ&K Department of Social Welfare NGO Register (swdajk.gov.pk)'
  },
  {
    name: 'Shahzad Ahmed',
    organization: 'Kashmir Welfare & Education Society',
    registrationNo: 'Registration No. 324',
    locus: 'Sharda, Neelum Valley, AJ&K',
    environmentalScope: 'Reforestation, indigenous agriculture and watershed slope stabilization.',
    sourceCitation: 'AJ&K Department of Social Welfare NGO Register (swdajk.gov.pk)'
  }
];
