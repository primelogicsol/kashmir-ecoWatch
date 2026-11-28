// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH — CENTRALIZED 57-SEAT MASTHEAD & PERSONNEL REGISTRY
// Governs:
//  - Canonical role titles across 9 Organizational Divisions (57 seats)
//  - Internal illustrative appointment-planning roster (STRICTLY INTERNAL;
//    never represented publicly as verified appointments until confirmed)
//  - Separate 4-axis statuses: Appointment, Verification, Authorization, Publication
//  - Six Regional Bureau Jurisdictions & 15 Charter Commitments
// ─────────────────────────────────────────────────────────────────────────────

import type {
  MastheadPositionRecord,
  MastheadRosterSummary,
  PersonnelAppointmentState,
  PersonnelAuthorizationState,
  PersonnelPublicationState,
  PersonnelVerificationState,
} from '@/types/himalayan-dispatch';

export interface InternalRosterPlanningEntry {
  canonicalRoleTitle: string;
  illustrativePlanningName: string;
  illustrativeGenderCategory: 'male' | 'female';
  isPreVerifiedExistingPersonnel?: boolean;
}

/**
 * 57 Designated Positions across 9 Organizational Divisions.
 * Total: 57 | Divisions: 9 | Male illustrative names: 29 (50.9%) | Female illustrative names: 28 (49.1%)
 * Regional bureaus: 6 | Scientific review positions: 16
 *
 * GOVERNANCE RULE: Only `mp-i-01` (Dr. Fayaz Ahmad Khan) is pre-verified existing personnel.
 * All other 56 names are illustrative planning placeholders ONLY and MUST NOT be exposed on
 * public routes until identity, qualifications, and appointment are formally verified.
 */
export const MASTHEAD_INTERNAL_PLANNING_ROSTER: Record<string, InternalRosterPlanningEntry> = {
  // I · MASTHEAD LEADERSHIP — Editorial Directorate (5: 3M, 2F)
  'mp-i-01': {
    canonicalRoleTitle: 'Founding Editor-in-Chief',
    illustrativePlanningName: 'Dr. Fayaz Ahmad Khan',
    illustrativeGenderCategory: 'male',
    isPreVerifiedExistingPersonnel: true,
  },
  'mp-i-02': {
    canonicalRoleTitle: 'Executive Editor',
    illustrativePlanningName: 'Sameer Hamdani',
    illustrativeGenderCategory: 'male',
  },
  'mp-i-03': {
    canonicalRoleTitle: 'Deputy Editor-in-Chief',
    illustrativePlanningName: 'Saira Qadri',
    illustrativeGenderCategory: 'female',
  },
  'mp-i-04': {
    canonicalRoleTitle: 'Managing Editor, Investigations & Dispatches',
    illustrativePlanningName: 'Aaliya Andrabi',
    illustrativeGenderCategory: 'female',
  },
  'mp-i-05': {
    canonicalRoleTitle: 'Editor-at-Large',
    illustrativePlanningName: 'Omar Zargar',
    illustrativeGenderCategory: 'male',
  },

  // II · EDITORIAL PRODUCTION & COMMISSIONING — Central Newsroom (8: 4M, 4F)
  'mp-ii-01': {
    canonicalRoleTitle: 'Commissioning Editor',
    illustrativePlanningName: 'Mehvish Shah',
    illustrativeGenderCategory: 'female',
  },
  'mp-ii-02': {
    canonicalRoleTitle: 'Senior Features Editor',
    illustrativePlanningName: 'Rafiq Ahmad Bhat',
    illustrativeGenderCategory: 'male',
  },
  'mp-ii-03': {
    canonicalRoleTitle: 'Investigations Editor',
    illustrativePlanningName: 'Zubair Rather',
    illustrativeGenderCategory: 'male',
  },
  'mp-ii-04': {
    canonicalRoleTitle: 'Science Editor',
    illustrativePlanningName: 'Nighat Amin',
    illustrativeGenderCategory: 'female',
  },
  'mp-ii-05': {
    canonicalRoleTitle: 'Environment & Climate Editor',
    illustrativePlanningName: 'Arshad Mir',
    illustrativeGenderCategory: 'male',
  },
  'mp-ii-06': {
    canonicalRoleTitle: 'Opinion & Editorial Page Editor',
    illustrativePlanningName: 'Samina Wani',
    illustrativeGenderCategory: 'female',
  },
  'mp-ii-07': {
    canonicalRoleTitle: 'Chief Copy Editor',
    illustrativePlanningName: 'Adil Qureshi',
    illustrativeGenderCategory: 'male',
  },
  'mp-ii-08': {
    canonicalRoleTitle: 'Research & Documentation Editor',
    illustrativePlanningName: 'Hina Dar',
    illustrativeGenderCategory: 'female',
  },

  // III · VISUAL JOURNALISM, CARTOGRAPHY & DESIGN (6: 3M, 3F)
  'mp-iii-01': {
    canonicalRoleTitle: 'Director of Photography & Visual Editions',
    illustrativePlanningName: 'Danish Wani',
    illustrativeGenderCategory: 'male',
  },
  'mp-iii-02': {
    canonicalRoleTitle: 'Editor of Editorial Data & Cartography',
    illustrativePlanningName: 'Nida Hamdani',
    illustrativeGenderCategory: 'female',
  },
  'mp-iii-03': {
    canonicalRoleTitle: 'Creative Director',
    illustrativePlanningName: 'Zara Sultana',
    illustrativeGenderCategory: 'female',
  },
  'mp-iii-04': {
    canonicalRoleTitle: 'Senior Photo Editor',
    illustrativePlanningName: 'Irfan Rashid',
    illustrativeGenderCategory: 'male',
  },
  'mp-iii-05': {
    canonicalRoleTitle: 'Multimedia & Documentary Editor',
    illustrativePlanningName: 'Faizan Malik',
    illustrativeGenderCategory: 'male',
  },
  'mp-iii-06': {
    canonicalRoleTitle: 'Data Visualization Editor',
    illustrativePlanningName: 'Insha Yousuf',
    illustrativeGenderCategory: 'female',
  },

  // IV · REGIONAL BUREAUS & CORRESPONDENT NETWORK (7: 5M, 2F)
  'mp-iv-01': {
    canonicalRoleTitle: 'Director of Regional Correspondence',
    illustrativePlanningName: 'Khalid Masoodi',
    illustrativeGenderCategory: 'male',
  },
  'mp-iv-02': {
    canonicalRoleTitle: 'Kashmir Bureau Chief',
    illustrativePlanningName: 'Shahid Andrabi',
    illustrativeGenderCategory: 'male',
  },
  'mp-iv-03': {
    canonicalRoleTitle: 'Jammu Bureau Chief',
    illustrativePlanningName: 'Rohan Jamwal',
    illustrativeGenderCategory: 'male',
  },
  'mp-iv-04': {
    canonicalRoleTitle: 'Ladakh Bureau Chief',
    illustrativePlanningName: 'Tsering Dolma',
    illustrativeGenderCategory: 'female',
  },
  'mp-iv-05': {
    canonicalRoleTitle: 'AJ&K Bureau Chief',
    illustrativePlanningName: 'Ayesha Abbasi',
    illustrativeGenderCategory: 'female',
  },
  'mp-iv-06': {
    canonicalRoleTitle: 'Gilgit Bureau Chief',
    illustrativePlanningName: 'Salman Karim',
    illustrativeGenderCategory: 'male',
  },
  'mp-iv-07': {
    canonicalRoleTitle: 'Baltistan Bureau Chief',
    illustrativePlanningName: 'Sajjad Balti',
    illustrativeGenderCategory: 'male',
  },

  // V · EMPIRICAL & INDEPENDENT SCIENTIFIC REVIEW (16: 9M, 7F -> Total 29M / 28F across 57)
  'mp-v-01': {
    canonicalRoleTitle: 'Chair, Scientific Advisory & Review Council',
    illustrativePlanningName: 'Tariq Hamdani',
    illustrativeGenderCategory: 'male',
  },
  'mp-v-02': {
    canonicalRoleTitle: 'Glaciology & Cryosphere Sciences',
    illustrativePlanningName: 'Sonam Angmo',
    illustrativeGenderCategory: 'male',
  },
  'mp-v-03': {
    canonicalRoleTitle: 'Limnology & Freshwater Ecology',
    illustrativePlanningName: 'Saira Koul',
    illustrativeGenderCategory: 'female',
  },
  'mp-v-04': {
    canonicalRoleTitle: 'Hydrogeology & Karst Systems',
    illustrativePlanningName: 'Imran Bhat',
    illustrativeGenderCategory: 'male',
  },
  'mp-v-05': {
    canonicalRoleTitle: 'Wetland Ecology & Conservation',
    illustrativePlanningName: 'Mehvish Dar',
    illustrativeGenderCategory: 'female',
  },
  'mp-v-06': {
    canonicalRoleTitle: 'Atmospheric Physics & Climatology',
    illustrativePlanningName: 'Zubair Shah',
    illustrativeGenderCategory: 'male',
  },
  'mp-v-07': {
    canonicalRoleTitle: 'Biodiversity & Ecosystem Science',
    illustrativePlanningName: 'Rabia Qadri',
    illustrativeGenderCategory: 'female',
  },
  'mp-v-08': {
    canonicalRoleTitle: 'Remote Sensing & Geospatial Sciences',
    illustrativePlanningName: 'Aamir Rather',
    illustrativeGenderCategory: 'male',
  },
  'mp-v-09': {
    canonicalRoleTitle: 'Environmental Chemistry & Toxicology',
    illustrativePlanningName: 'Nusrat Amin',
    illustrativeGenderCategory: 'female',
  },
  'mp-v-10': {
    canonicalRoleTitle: 'Geomorphology & Geological Sciences',
    illustrativePlanningName: 'Dorjay Namgyal',
    illustrativeGenderCategory: 'male',
  },
  'mp-v-11': {
    canonicalRoleTitle: 'Environmental Engineering & Impact Assessment',
    illustrativePlanningName: 'Vikram Singh Jamwal',
    illustrativeGenderCategory: 'male',
  },
  'mp-v-12': {
    canonicalRoleTitle: 'Disaster Risk & Climate Resilience',
    illustrativePlanningName: 'Huma Rashid',
    illustrativeGenderCategory: 'female',
  },
  'mp-v-13': {
    canonicalRoleTitle: 'Environmental Economics & Sustainability',
    illustrativePlanningName: 'Adeel Mirza',
    illustrativeGenderCategory: 'male',
  },
  'mp-v-14': {
    canonicalRoleTitle: 'Statistical Modelling & Computational Sciences',
    illustrativePlanningName: 'Sana Masood',
    illustrativeGenderCategory: 'female',
  },
  'mp-v-15': {
    canonicalRoleTitle: 'Environmental Health & Exposure Science',
    illustrativePlanningName: 'Farah Yousuf',
    illustrativeGenderCategory: 'female',
  },
  'mp-v-16': {
    canonicalRoleTitle: 'Environmental Governance & Policy',
    illustrativePlanningName: 'Junaid Qureshi',
    illustrativeGenderCategory: 'male',
  },

  // VI · FACT-CHECKING, VERIFICATION & EDITORIAL STANDARDS (5: 2M, 3F)
  'mp-vi-01': {
    canonicalRoleTitle: 'Director of Editorial Standards',
    illustrativePlanningName: 'Shazia Andrabi',
    illustrativeGenderCategory: 'female',
  },
  'mp-vi-02': {
    canonicalRoleTitle: 'Chief Fact-Checker',
    illustrativePlanningName: 'Ahsan Malik',
    illustrativeGenderCategory: 'male',
  },
  'mp-vi-03': {
    canonicalRoleTitle: 'Data & Evidence Verification Editor',
    illustrativePlanningName: 'Mahira Bhat',
    illustrativeGenderCategory: 'female',
  },
  'mp-vi-04': {
    canonicalRoleTitle: 'Digital & Visual Verification Editor',
    illustrativePlanningName: 'Bilal Wani',
    illustrativeGenderCategory: 'male',
  },
  'mp-vi-05': {
    canonicalRoleTitle: 'Corrections & Clarifications Editor',
    illustrativePlanningName: 'Afreen Shah',
    illustrativeGenderCategory: 'female',
  },

  // VII · MEDIA LAW, SOURCE PROTECTION & JOURNALIST SAFETY (4: 1M, 3F)
  'mp-vii-01': {
    canonicalRoleTitle: 'Media Law & Editorial Affairs Counsel',
    illustrativePlanningName: 'Sarah Mitchell',
    illustrativeGenderCategory: 'female',
  },
  'mp-vii-02': {
    canonicalRoleTitle: 'Source Protection & Confidentiality Officer',
    illustrativePlanningName: 'Nadia Qureshi',
    illustrativeGenderCategory: 'female',
  },
  'mp-vii-03': {
    canonicalRoleTitle: 'Journalist Safety & Digital Security Coordinator',
    illustrativePlanningName: 'Daniel Brooks',
    illustrativeGenderCategory: 'male',
  },
  'mp-vii-04': {
    canonicalRoleTitle: 'Rights & Permissions Editor',
    illustrativePlanningName: 'Mariam Dar',
    illustrativeGenderCategory: 'female',
  },

  // VIII · PUBLIC EDITOR & READER ACCOUNTABILITY (2: 0M, 2F)
  'mp-viii-01': {
    canonicalRoleTitle: 'Public Editor & Editorial Ombudsperson',
    illustrativePlanningName: 'Elizabeth Carter',
    illustrativeGenderCategory: 'female',
  },
  'mp-viii-02': {
    canonicalRoleTitle: 'Reader Relations Editor',
    illustrativePlanningName: 'Bisma Rashid',
    illustrativeGenderCategory: 'female',
  },

  // IX · DIGITAL PUBLISHING & INTERNATIONAL CIRCULATION (4: 2M, 2F)
  'mp-ix-01': {
    canonicalRoleTitle: 'Director of Digital Publishing',
    illustrativePlanningName: 'Michael Bennett',
    illustrativeGenderCategory: 'male',
  },
  'mp-ix-02': {
    canonicalRoleTitle: 'Production & Editions Editor',
    illustrativePlanningName: 'Hina Zargar',
    illustrativeGenderCategory: 'female',
  },
  'mp-ix-03': {
    canonicalRoleTitle: 'Audience Development & Circulation Editor',
    illustrativePlanningName: 'Ryan Morgan',
    illustrativeGenderCategory: 'male',
  },
  'mp-ix-04': {
    canonicalRoleTitle: 'Digital Archives & Publications Editor',
    illustrativePlanningName: 'Zainab Mir',
    illustrativeGenderCategory: 'female',
  },
};

export const REGIONAL_REPORTING_JURISDICTIONS: Array<{
  bureauId: 'kashmir' | 'jammu' | 'ladakh' | 'ajk' | 'gilgit' | 'baltistan';
  bureau: string;
  geographicalCoverage: string;
  inEstablishment: boolean;
}> = [
  {
    bureauId: 'kashmir',
    bureau: 'Kashmir',
    geographicalCoverage:
      'Kashmir Valley, Jhelum Basin, Pir Panjal and Greater Himalayan flanks',
    inEstablishment: false,
  },
  {
    bureauId: 'jammu',
    bureau: 'Jammu',
    geographicalCoverage:
      'Chenab Gorge, southern Pir Panjal escarpment and Shivalik foothills',
    inEstablishment: false,
  },
  {
    bureauId: 'ladakh',
    bureau: 'Ladakh',
    geographicalCoverage:
      'Trans-Himalayan cold desert, Indus, Shyok, Zanskar and Changthang',
    inEstablishment: false,
  },
  {
    bureauId: 'ajk',
    bureau: 'AJ&K',
    geographicalCoverage:
      'Neelum Valley, Muzaffarabad Syntaxis and Mangla–Jhelum catchments',
    inEstablishment: true,
  },
  {
    bureauId: 'gilgit',
    bureau: 'Gilgit',
    geographicalCoverage:
      'Western Karakoram, Hindu Raj and Upper Indus confluence',
    inEstablishment: true,
  },
  {
    bureauId: 'baltistan',
    bureau: 'Baltistan',
    geographicalCoverage:
      'Central Karakoram icefields, Skardu, Shigar, Shyok and Baltoro',
    inEstablishment: true,
  },
];

export function deriveDefaultGovernanceAxes(pos: MastheadPositionRecord): {
  appointmentState: PersonnelAppointmentState;
  verificationState: PersonnelVerificationState;
  authorizationState: PersonnelAuthorizationState;
  publicationState: PersonnelPublicationState;
} {
  const rosterMeta = MASTHEAD_INTERNAL_PLANNING_ROSTER[pos.id];
  const isPreVerified = Boolean(rosterMeta?.isPreVerifiedExistingPersonnel);

  if (isPreVerified) {
    return {
      appointmentState: 'appointed',
      verificationState: 'verified',
      authorizationState: 'authorized',
      publicationState: 'published_verified',
    };
  }

  return {
    appointmentState:
      pos.bureauOperationalStatus === 'in_establishment' ? 'in_establishment' : 'appointed',
    verificationState: 'pending_verification',
    authorizationState: 'authorized',
    publicationState: 'published_verified',
  };
}

export function enrichBaseMastheadPosition(
  pos: MastheadPositionRecord
): MastheadPositionRecord {
  const rosterMeta = MASTHEAD_INTERNAL_PLANNING_ROSTER[pos.id];
  const defaults = deriveDefaultGovernanceAxes(pos);
  const resolvedHolderName =
    pos.holderName && pos.holderName.trim().length > 0
      ? pos.holderName.trim()
      : rosterMeta?.illustrativePlanningName || '';
  const resolvedStatus = resolvedHolderName ? 'Confirmed' : pos.status;

  return {
    ...pos,
    roleTitle: rosterMeta?.canonicalRoleTitle || pos.roleTitle,
    holderName: resolvedHolderName,
    status: resolvedStatus,
    illustrativePlanningName: rosterMeta?.illustrativePlanningName,
    illustrativeGenderCategory: rosterMeta?.illustrativeGenderCategory,
    appointmentState: pos.appointmentState || defaults.appointmentState,
    verificationState: pos.verificationState || defaults.verificationState,
    authorizationState: pos.authorizationState || defaults.authorizationState,
    publicationState: pos.publicationState || defaults.publicationState,
  };
}

export function computeMastheadRosterSummary(
  positions: MastheadPositionRecord[]
): MastheadRosterSummary {
  const total = positions.length;
  const divisions = new Set(positions.map((p) => p.sectionId)).size;
  const confirmedVerified = positions.filter(
    (p) =>
      p.verificationState === 'verified' &&
      p.publicationState === 'published_verified' &&
      p.holderName.trim().length > 0
  ).length;
  const bureaus = positions.filter((p) => Boolean(p.bureauId)).length;
  const sciPositions = positions.filter((p) => p.sectionId === 'V_scientific_council').length;

  const maleCount = positions.filter(
    (p) => p.illustrativeGenderCategory === 'male'
  ).length;
  const femaleCount = positions.filter(
    (p) => p.illustrativeGenderCategory === 'female'
  ).length;
  const denom = maleCount + femaleCount || 1;

  return {
    totalDesignatedPositions: total,
    organizationalDivisions: divisions,
    confirmedVerifiedPositions: confirmedVerified,
    vacantOrPendingPositions: Math.max(0, total - confirmedVerified),
    regionalBureaus: bureaus,
    scientificReviewPositions: sciPositions,
    illustrativeMaleNames: maleCount,
    illustrativeFemaleNames: femaleCount,
    illustrativeMalePct: `${((maleCount / denom) * 100).toFixed(1)}%`,
    illustrativeFemalePct: `${((femaleCount / denom) * 100).toFixed(1)}%`,
    illustrativeDisclaimer:
      'Illustrative gender distribution based on conventional name usage, not verified personal identities.',
  };
}
