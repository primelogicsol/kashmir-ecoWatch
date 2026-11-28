// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH NEWSROOM (HDN) — UNIFIED PERSISTENT CMS & WORKFLOW STORE
// Connects Human Journalists, 18-Role RBAC, 18-Block Editorial CMS, Revisions,
// Scientific Review, Fact-Checking, Confidential Source Vault, Regional Bureaus,
// Monthly Editions, and the HD-ANIE Autonomous Engine in ONE shared store.
// ─────────────────────────────────────────────────────────────────────────────

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import {
  EDITORIAL_DEPARTMENTS,
  FORTHCOMING_ASSIGNMENTS,
  JOURNALIST_PROFILES,
  MAGAZINE_EDITIONS,
  MAGAZINE_STORIES,
  REGIONAL_REPORTING_BUREAUS,
} from '@/data/himalayan-dispatch';
import { REPORTING_BEATS_FULL } from '@/data/himalayan-dispatch-autonomous';
import {
  BureauSlugId,
  DailyDispatchArticle,
  EditorialDepartmentId,
  MagazineEdition,
  MagazineStory,
  StoryChapter,
  StoryCorrectionEntry,
} from '@/types/himalayan-dispatch';
import { AnieEditorialDraft } from '@/types/hd-anie';
import {
  HdnAccountRecord,
  HdnArticleManuscript,
  HdnAssignmentHistoryEntry,
  HdnAuditLogRecord,
  HdnConfidentialSourceRecord,
  HdnContentBlock,
  HdnEditorialAssignment,
  HdnEditorialComment,
  HdnFactCheckRecord,
  HdnLifecycleStageNumber,
  HdnManuscriptRevision,
  HdnMediaAsset,
  HdnMonthlyEditionRecord,
  HdnNotificationItem,
  HdnPersistentStore,
  HdnPriorityLevel,
  HdnPublicationStream,
  HdnReviewTrack,
  HdnRoleId,
  HdnScientificReviewRecord,
  HdnWorkflowStatus,
} from '@/types/hdn-newsroom';
import {
  canAccessManuscript,
  canEditManuscript,
  hasPermission,
  HDN_ROLE_DEFINITIONS,
  isExecutiveOrAdmin,
  validateWorkflowTransition,
} from './rbac';
import { readAnieStore, writeAnieStore, recordAnieAudit } from '@/lib/hd-anie/store';
import { computeStoryMetrics } from '@/lib/himalayan-dispatch-metrics';
import { HIMALAYAN_DISPATCH_GOVERNED_MEDIA_REGISTRY } from '@/data/himalayan-dispatch-visual-governance';

const HDN_STORE_FILE = path.join(process.cwd(), 'data', 'hdn-newsroom-store.json');
const DISPATCH_LEGACY_STORE_FILE = path.join(
  process.cwd(),
  'data',
  'himalayan-dispatch-store.json'
);

export const RECONCILED_14_STAGE_LIFECYCLE: Array<{
  stage: HdnLifecycleStageNumber;
  title: string;
  mappedStatuses: HdnWorkflowStatus[];
  description: string;
  responsibleRoles: HdnRoleId[];
}> = [
  {
    stage: '01',
    title: 'Discovery & Pitch',
    mappedStatuses: ['assigned'],
    description: 'HD-ANIE signal discovery or human journalist story pitch evaluation.',
    responsibleRoles: ['commissioning_editor', 'managing_editor', 'autonomous_ai_engine'],
  },
  {
    stage: '02',
    title: 'Commissioning & Assignment',
    mappedStatuses: ['assigned'],
    description: 'Editor approves scope, reporting brief, bureau, department, and review track.',
    responsibleRoles: ['commissioning_editor', 'managing_editor', 'bureau_chief', 'department_editor'],
  },
  {
    stage: '03',
    title: 'Research & Evidence Collection',
    mappedStatuses: ['researching'],
    description: 'Primary source gathering, KEW baseline retrieval, and interview logging.',
    responsibleRoles: ['journalist', 'senior_correspondent', 'freelance_contributor'],
  },
  {
    stage: '04',
    title: 'Manuscript Development',
    mappedStatuses: ['drafting'],
    description: 'Block-based human authoring or AI-assisted draft synthesis.',
    responsibleRoles: ['journalist', 'senior_correspondent', 'photojournalist', 'autonomous_ai_engine'],
  },
  {
    stage: '05',
    title: 'Editorial Submission',
    mappedStatuses: ['submitted'],
    description: 'Complete manuscript enters the desk editorial queue.',
    responsibleRoles: ['journalist', 'senior_correspondent', 'freelance_contributor'],
  },
  {
    stage: '06',
    title: 'Editorial Assessment',
    mappedStatuses: ['editorial_review', 'revision_requested'],
    description: 'Assessment of relevance, narrative craft, and reporting completeness.',
    responsibleRoles: ['department_editor', 'bureau_chief', 'managing_editor'],
  },
  {
    stage: '07',
    title: 'Independent Fact-Checking',
    mappedStatuses: ['fact_checking'],
    description: 'Claim-by-claim source, citation, date, and elevation verification.',
    responsibleRoles: ['fact_checker', 'managing_editor', 'founding_eic'],
  },
  {
    stage: '08',
    title: 'Scientific Review',
    mappedStatuses: ['scientific_review'],
    description: 'Independent technical assessment of substantive scientific/data claims.',
    responsibleRoles: ['scientific_reviewer', 'founding_eic'],
  },
  {
    stage: '09',
    title: 'Legal & Ethical Review',
    mappedStatuses: ['legal_review'],
    description: 'Right-of-reply verification, source protection, and legal sensitivity review.',
    responsibleRoles: ['legal_reviewer', 'managing_editor', 'founding_eic'],
  },
  {
    stage: '10',
    title: 'Revision & Copy Editing',
    mappedStatuses: ['copy_editing'],
    description: 'House style, literary clarity, headline/standfirst polish, and author responses.',
    responsibleRoles: ['copy_editor', 'department_editor', 'managing_editor'],
  },
  {
    stage: '11',
    title: 'Visual Production',
    mappedStatuses: ['visual_production'],
    description: 'Documentary plates, KEW scientific maps, bespoke charts, and licensing checks.',
    responsibleRoles: ['visual_editor', 'photojournalist'],
  },
  {
    stage: '12',
    title: 'Final Editorial Approval',
    mappedStatuses: ['ready_for_approval', 'approved', 'scheduled'],
    description: 'Final release authorization by Founding Editor-in-Chief or authorized editor.',
    responsibleRoles: ['founding_eic', 'executive_editor', 'managing_editor', 'system_administrator'],
  },
  {
    stage: '13',
    title: 'Publication',
    mappedStatuses: ['published'],
    description: 'Live release to Daily Dispatch or Monthly Edition, RSS, and public archives.',
    responsibleRoles: ['founding_eic', 'executive_editor', 'managing_editor', 'system_administrator'],
  },
  {
    stage: '14',
    title: 'Post-Publication Monitoring',
    mappedStatuses: ['published', 'archived', 'rejected', 'withdrawn', 'trashed'],
    description: 'Transparent corrections, empirical updates, and archival preservation.',
    responsibleRoles: ['public_editor', 'founding_eic', 'system_administrator'],
  },
];

export function mapStatusToLifecycleStage(status: HdnWorkflowStatus): HdnLifecycleStageNumber {
  switch (status) {
    case 'assigned':
      return '02';
    case 'researching':
      return '03';
    case 'drafting':
      return '04';
    case 'submitted':
      return '05';
    case 'editorial_review':
    case 'revision_requested':
      return '06';
    case 'fact_checking':
      return '07';
    case 'scientific_review':
      return '08';
    case 'legal_review':
      return '09';
    case 'copy_editing':
      return '10';
    case 'visual_production':
      return '11';
    case 'ready_for_approval':
    case 'approved':
    case 'scheduled':
      return '12';
    case 'published':
      return '13';
    case 'archived':
    case 'rejected':
    case 'withdrawn':
    case 'trashed':
      return '14';
  }
}

function hashAccessCode(code: string): string {
  return crypto.createHash('sha256').update(code.trim().toUpperCase()).digest('hex');
}

function slugifyText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 72);
}

export function computeManuscriptWordCount(
  headline: string,
  standfirst: string,
  blocks: HdnContentBlock[]
): { wordCount: number; readingTimeMinutes: number } {
  const parts: string[] = [headline, standfirst];
  for (const b of blocks) {
    if (b.heading) parts.push(b.heading);
    if (b.subheading) parts.push(b.subheading);
    if (b.bodyText) parts.push(b.bodyText);
    if (b.quoteText) parts.push(b.quoteText);
    if (b.caption) parts.push(b.caption);
    if (b.keyFindingNarrative) parts.push(b.keyFindingNarrative);
    if (b.equationExplanation) parts.push(b.equationExplanation);
    if (b.memorialTribute) parts.push(b.memorialTribute);
    if (b.bulletItems) parts.push(...b.bulletItems);
    if (b.interviewExchanges) parts.push(...b.interviewExchanges.map((x) => x.text));
    if (b.timelineEvents) parts.push(...b.timelineEvents.map((e) => `${e.title} ${e.detail}`));
    if (b.galleryPlates) parts.push(...b.galleryPlates.map((g) => g.narrative));
  }
  const words = parts
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return {
    wordCount: words,
    readingTimeMinutes: Math.max(2, Math.round(words / 215)),
  };
}

/**
 * Converts legacy `StoryChapter[]` into structured 18-type `HdnContentBlock[]`
 * preserving every paragraph, pull quote, plate, table, and bullet list.
 */
export function chaptersToBlocks(chapters: StoryChapter[]): HdnContentBlock[] {
  const blocks: HdnContentBlock[] = [];
  let order = 1;

  for (const ch of chapters) {
    blocks.push({
      id: `blk-rt-${order}`,
      type: 'rich_text',
      order: order++,
      chapterRoman: ch.numberRoman,
      heading: ch.title,
      subheading: ch.subtitle,
      bodyText: ch.paragraphs.join('\n\n'),
      dropCap: order === 2,
      bulletItems: ch.bulletList,
    });

    if (ch.pullQuote) {
      blocks.push({
        id: `blk-pq-${order}`,
        type: 'pull_quote',
        order: order++,
        quoteText: ch.pullQuote.quote,
        quoteAttribution: ch.pullQuote.attribution,
        quoteContext: ch.pullQuote.context,
      });
    }

    if (ch.plate) {
      blocks.push({
        id: `blk-ph-${order}`,
        type: 'full_bleed_photo',
        order: order++,
        mediaUrl: ch.plate.imageUrl,
        caption: ch.plate.caption,
        credit: ch.plate.credit,
        provenanceType: 'authentic_documentary_photograph',
        aspect: ch.plate.aspect || 'wide',
        monochrome: ch.plate.monochrome,
      });
    }

    if (ch.editorialTable) {
      blocks.push({
        id: `blk-tb-${order}`,
        type: 'data_table',
        order: order++,
        tableKicker: ch.editorialTable.kicker,
        caption: ch.editorialTable.caption,
        tableHeaders: [...ch.editorialTable.headers],
        tableRows: ch.editorialTable.rows.map((r) => [...r]),
        tableFootnote: ch.editorialTable.footnote,
      });
    }
  }

  return blocks;
}

/**
 * Converts structured `HdnContentBlock[]` back into `StoryChapter[]` + rich fields
 * so `StoryReaderClient` renders all 18 block types with full luxury editorial fidelity!
 */
export function blocksToChapters(blocks: HdnContentBlock[]): StoryChapter[] {
  const sorted = [...blocks].sort((a, b) => a.order - b.order);
  const chapters: StoryChapter[] = [];
  const romans = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
  let romIdx = 0;

  for (const blk of sorted) {
    if (blk.type === 'headline_standfirst' || blk.type === 'dateline') {
      continue;
    }

    if (blk.type === 'rich_text') {
      const paragraphs = (blk.bodyText || '')
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean);
      chapters.push({
        numberRoman: blk.chapterRoman || romans[romIdx] || String(romIdx + 1),
        title: blk.heading || `Section ${romans[romIdx] || romIdx + 1}`,
        subtitle: blk.subheading,
        paragraphs: paragraphs.length > 0 ? paragraphs : [''],
        bulletList: blk.bulletItems && blk.bulletItems.length > 0 ? blk.bulletItems : undefined,
      });
      romIdx++;
      continue;
    }

    // Ensure there is a host chapter to attach inline blocks or create a dedicated section
    const current =
      chapters[chapters.length - 1] ||
      (() => {
        const ch: StoryChapter = {
          numberRoman: romans[romIdx++] || 'I',
          title: blk.heading || 'Editorial Dossier',
          paragraphs: [],
        };
        chapters.push(ch);
        return ch;
      })();

    if (blk.type === 'pull_quote' && blk.quoteText) {
      if (!current.pullQuote) {
        current.pullQuote = {
          quote: blk.quoteText,
          attribution: blk.quoteAttribution,
          context: blk.quoteContext,
        };
      } else {
        current.paragraphs.push(`“${blk.quoteText}” — ${blk.quoteAttribution || 'Verified Source'}`);
      }
    } else if (blk.type === 'full_bleed_photo' && blk.mediaUrl) {
      if (!current.plate) {
        current.plate = {
          imageUrl: blk.mediaUrl,
          caption: blk.caption || '',
          credit: blk.credit || 'Himalayan Dispatch Visual Desk',
          aspect: blk.aspect || 'wide',
          monochrome: blk.monochrome,
        };
      }
    } else if (blk.type === 'data_table' && blk.tableHeaders && blk.tableRows) {
      current.editorialTable = {
        kicker: blk.tableKicker,
        caption: blk.caption,
        headers: [blk.tableHeaders[0] || 'Indicator', blk.tableHeaders[1] || 'Value / Record'],
        rows: blk.tableRows.map((r) => [r[0] || '', r.slice(1).join(' · ')]),
        footnote: blk.tableFootnote,
      };
    } else if (blk.type === 'scientific_equation' && blk.equationLatex) {
      chapters.push({
        numberRoman: romans[romIdx++] || String(chapters.length + 1),
        title: blk.heading || 'Scientific Formulation & Parameters',
        paragraphs: [
          `Mathematical / Physical Relation: ${blk.equationLatex}`,
          ...(blk.equationExplanation ? [blk.equationExplanation] : []),
        ],
        bulletList: blk.equationVariables?.map(
          (v) => `${v.symbol}: ${v.meaning}${v.unit ? ` (${v.unit})` : ''}`
        ),
      });
    } else if (blk.type === 'historical_timeline' && blk.timelineEvents) {
      chapters.push({
        numberRoman: romans[romIdx++] || String(chapters.length + 1),
        title: blk.heading || 'Chronological Documentation',
        paragraphs: blk.bodyText ? [blk.bodyText] : [],
        editorialTable: {
          kicker: 'HISTORICAL CHRONOLOGY',
          caption: blk.subheading || 'Verified chronological sequence',
          headers: ['Date / Period', 'Documented Development'],
          rows: blk.timelineEvents.map((ev) => [
            ev.dateOrEra,
            `${ev.title} — ${ev.detail}${ev.sourceRef ? ` (${ev.sourceRef})` : ''}`,
          ]),
        },
      });
    } else if (blk.type === 'memorial_profile' && blk.memorialName) {
      chapters.push({
        numberRoman: romans[romIdx++] || String(chapters.length + 1),
        title: `In Memoriam: ${blk.memorialName}`,
        subtitle: `${blk.memorialDesignation || 'Environmental Guardian'} · ${
          blk.memorialDivisionOrRegion || 'Western Himalayas'
        }${blk.memorialYear ? ` (${blk.memorialYear})` : ''}`,
        paragraphs: [
          blk.memorialTribute || '',
          ...(blk.memorialSourceNote ? [`Documentary Record: ${blk.memorialSourceNote}`] : []),
        ].filter(Boolean),
      });
    } else if (blk.type === 'scientific_map') {
      current.fieldNote = {
        label: `KEW GEOSPATIAL INTELLIGENCE · ${(blk.kewMapLayerId || 'watershed_basins').toUpperCase()}`,
        detail: `${blk.caption || 'Spatial baseline layer'}${
          blk.mapMethodologyNote ? ` — ${blk.mapMethodologyNote}` : ''
        }`,
        coordinates:
          blk.mapCenterLat !== undefined && blk.mapCenterLng !== undefined
            ? `${blk.mapCenterLat.toFixed(4)}°N, ${blk.mapCenterLng.toFixed(4)}°E`
            : blk.coordinates,
      };
    } else if (blk.type === 'research_citation' || blk.type === 'evidence_dossier') {
      const citeLine = [
        blk.heading,
        blk.citationAuthors,
        blk.citationJournalOrBody,
        blk.citationYear ? `(${blk.citationYear})` : '',
        blk.citationDoi ? `DOI: ${blk.citationDoi}` : '',
        blk.corroborationNote,
      ]
        .filter(Boolean)
        .join(' · ');
      if (citeLine) current.paragraphs.push(citeLine);
    } else if (blk.type === 'video_audio' && blk.mediaUrl) {
      current.paragraphs.push(
        `[Approved Documentary Media — ${
          blk.mediaKind === 'field_audio' ? 'Field Audio Recording' : 'Documentary Video'
        }${blk.durationLabel ? ` (${blk.durationLabel})` : ''}]: ${blk.caption || blk.heading || blk.mediaUrl}${
          blk.transcriptSummary ? ` — ${blk.transcriptSummary}` : ''
        }`
      );
    } else if (blk.type === 'editorial_disclosure' && blk.aiDisclosureText) {
      chapters.push({
        numberRoman: romans[romIdx++] || String(chapters.length + 1),
        title: 'Methodology, Disclosures & Limitations',
        paragraphs: [
          blk.aiDisclosureText,
          ...(blk.conflictOfInterestNote ? [`Conflict-of-Interest Disclosure: ${blk.conflictOfInterestNote}`] : []),
          ...(blk.scientificLimitationsNote ? [`Scientific Limitations: ${blk.scientificLimitationsNote}`] : []),
        ],
      });
    }
  }

  return chapters.length > 0
    ? chapters
    : [
        {
          numberRoman: 'I',
          title: 'Dispatch',
          paragraphs: ['Manuscript body in preparation.'],
        },
      ];
}

function buildSeededAccounts(): HdnAccountRecord[] {
  const nowIso = '2026-11-25T00:00:00.000Z';
  const configuredMasthead =
    process.env.DISPATCH_MASTHEAD_CODE && process.env.DISPATCH_MASTHEAD_CODE.trim().length >= 10
      ? process.env.DISPATCH_MASTHEAD_CODE.trim()
      : null;
  const configuredReviewer =
    process.env.DISPATCH_REVIEWER_CODE && process.env.DISPATCH_REVIEWER_CODE.trim().length >= 10
      ? process.env.DISPATCH_REVIEWER_CODE.trim()
      : null;
  const mastheadCodeHash = configuredMasthead
    ? hashAccessCode(configuredMasthead)
    : `UNCONFIGURED_MASTHEAD_${crypto.randomBytes(16).toString('hex')}`;
  const reviewerCodeHash = configuredReviewer
    ? hashAccessCode(configuredReviewer)
    : `UNCONFIGURED_REVIEWER_${crypto.randomBytes(16).toString('hex')}`;

  const roleConfigBySlug: Record<
    string,
    {
      email: string;
      roles: HdnRoleId[];
      bureaus: BureauSlugId[];
      depts: EditorialDepartmentId[];
      beats: string[];
      codeHash: string;
      agreement: HdnAccountRecord['contributorAgreementType'];
    }
  > = {
    'dr-fayaz-ahmad-khan': {
      email: 'fayaz@kashmir-ecowatch.com',
      roles: ['founding_eic', 'system_administrator', 'scientific_reviewer'],
      bureaus: ['kashmir', 'jammu', 'ladakh', 'ajk', 'gilgit', 'baltistan'],
      depts: [
        'cover-stories',
        'longform-features',
        'field-reports',
        'investigative-journalism',
        'photo-essays',
        'data-journalism',
        'interviews',
        'editorials',
      ],
      beats: ['cryosphere-glaciers-high-passes', 'transboundary-rivers-hydropower'],
      codeHash: mastheadCodeHash,
      agreement: 'founding_masthead',
    },
    'investigations-urban-water-desk': {
      email: 'investigations@kashmir-ecowatch.com',
      roles: ['managing_editor', 'commissioning_editor', 'bureau_chief', 'department_editor'],
      bureaus: ['kashmir', 'jammu'],
      depts: ['investigative-journalism', 'longform-features', 'field-reports'],
      beats: ['lakes-wetlands-springs-waterways', 'transboundary-rivers-hydropower'],
      codeHash: mastheadCodeHash,
      agreement: 'founding_masthead',
    },
    'visual-editions-desk': {
      email: 'visual@kashmir-ecowatch.com',
      roles: ['visual_editor', 'photojournalist', 'department_editor'],
      bureaus: ['kashmir', 'ladakh'],
      depts: ['photo-essays'],
      beats: ['documentary-photography-oral-memory'],
      codeHash: mastheadCodeHash,
      agreement: 'founding_masthead',
    },
    'data-cartography-desk': {
      email: 'data@kashmir-ecowatch.com',
      roles: ['department_editor', 'scientific_reviewer', 'fact_checker'],
      bureaus: ['kashmir', 'ladakh'],
      depts: ['data-journalism'],
      beats: ['earth-observation-climate-records', 'cryosphere-glaciers-high-passes'],
      codeHash: mastheadCodeHash,
      agreement: 'founding_masthead',
    },
    'wetlands-forest-desk': {
      email: 'field@kashmir-ecowatch.com',
      roles: ['senior_correspondent', 'journalist'],
      bureaus: ['kashmir', 'jammu'],
      depts: ['field-reports'],
      beats: ['biodiversity-forests-pastoral-commons', 'lakes-wetlands-springs-waterways'],
      codeHash: mastheadCodeHash,
      agreement: 'founding_masthead',
    },
    'himalayan-dispatch-desk': {
      email: 'desk@kashmir-ecowatch.com',
      roles: ['autonomous_ai_engine'],
      bureaus: ['kashmir', 'jammu', 'ladakh', 'ajk', 'gilgit', 'baltistan'],
      depts: ['field-reports', 'data-journalism', 'cover-stories'],
      beats: ['environmental-legacy-conservation-accountability'],
      codeHash: mastheadCodeHash,
      agreement: 'founding_masthead',
    },
  };

  const accounts: HdnAccountRecord[] = JOURNALIST_PROFILES.map((prof) => {
    const cfg = roleConfigBySlug[prof.slug] || {
      email: `${prof.slug}@kashmir-ecowatch.com`,
      roles: ['journalist'] as HdnRoleId[],
      bureaus: ['kashmir'] as BureauSlugId[],
      depts: ['field-reports'] as EditorialDepartmentId[],
      beats: [],
      codeHash: mastheadCodeHash,
      agreement: 'voluntary_editorial_fellow' as const,
    };

    return {
      id: `hdn-acc-${prof.slug}`,
      slug: prof.slug,
      fullName: prof.name,
      email: cfg.email,
      primaryRoleTitle: prof.roleTitle,
      roles: cfg.roles,
      assignedBureaus: cfg.bureaus,
      assignedDepartments: cfg.depts,
      reportingBeats: cfg.beats,
      basedIn: prof.basedIn,
      shortBio: prof.shortBio,
      portraitUrl: prof.portraitUrl,
      languages: prof.languages,
      verifiedCredentials: prof.awardsAndFellowships,
      approvedProfessionalLinks: [
        { label: 'Public Portfolio', url: `/himalayan-dispatch/journalists/${prof.slug}` },
      ],
      accessCodeHash: cfg.codeHash,
      status: 'active',
      charterAccepted: true,
      charterAcceptedAt: nowIso,
      contributorAgreementAccepted: true,
      contributorAgreementType: cfg.agreement,
      publicPortfolioConsent: true,
      publicPortfolioApproved: true,
      createdAt: nowIso,
      updatedAt: nowIso,
    };
  });

  // Institutional Scientific Review Panel seat (strictly `scientific_reviewer` ONLY — enables testing confidential source isolation!)
  accounts.push({
    id: 'hdn-acc-scientific-review-council',
    slug: 'scientific-review-council',
    fullName: 'KEW Scientific Review Panelist',
    email: 'reviewer@kashmir-ecowatch.com',
    primaryRoleTitle: 'External Scientific Reviewer · KEW Council',
    roles: ['scientific_reviewer'],
    assignedBureaus: ['kashmir', 'jammu', 'ladakh'],
    assignedDepartments: ['data-journalism', 'longform-features', 'cover-stories'],
    reportingBeats: ['cryosphere-glaciers-high-passes', 'lakes-wetlands-springs-waterways'],
    basedIn: 'Western Himalayan Scientific Network',
    shortBio:
      'Independent technical peer reviewer evaluating empirical hydrological, cryospheric, ecological, and geospatial claims without access to confidential journalistic source identities.',
    languages: ['English'],
    verifiedCredentials: ['KEW Multidisciplinary Scientific Review Council'],
    approvedProfessionalLinks: [],
    accessCodeHash: reviewerCodeHash,
    status: 'active',
    charterAccepted: true,
    charterAcceptedAt: nowIso,
    contributorAgreementAccepted: true,
    contributorAgreementType: 'scientific_review_council',
    publicPortfolioConsent: false,
    publicPortfolioApproved: false,
    createdAt: nowIso,
    updatedAt: nowIso,
  });

  return accounts;
}

function buildSeededEditions(): HdnMonthlyEditionRecord[] {
  return MAGAZINE_EDITIONS.map((ed, idx) => ({
    id: ed.id,
    slug: ed.slug,
    volumeNumber: ed.slug === 'monograph-00-watershed-voices' ? 0 : 1,
    issueNumber: ed.slug === 'vol-01-no-01' ? 1 : ed.slug === 'issue-02-a-world-in-transition' ? 2 : 0,
    volumeLabel: ed.volumeLabel,
    issueNumberLabel: ed.issueNumberLabel,
    themeTitle: ed.title,
    themeKicker: ed.themeKicker,
    editionIntroduction: ed.subtitle,
    coverStorySlug: ed.storySlugs[0],
    coverImage: ed.coverImage,
    coverLocation: ed.coverLocation,
    coverCaption: ed.coverCaption,
    coverCredit: ed.coverCredit,
    editorsLetter: {
      title: ed.editorsNoteTitle,
      paragraphs: ed.editorsNoteBody,
      authorName: ed.editorsNoteAuthor,
      authorRole: ed.editorsNoteRole,
      approvedByFoundingEic: ed.status !== 'forthcoming',
      approvedAt: ed.publishedIsoDate ? `${ed.publishedIsoDate}T00:00:00.000Z` : undefined,
    },
    orderedManuscriptIds: ed.storySlugs.map((s) => `hdn-ms-${s}`),
    orderedStorySlugs: [...ed.storySlugs],
    visualEssaySlugs: ed.storySlugs.filter((s) => s === 'an-elegy-for-winter'),
    contributorCredits: JOURNALIST_PROFILES.map((j) => `${j.name} (${j.roleTitle})`),
    publishedIsoDate: ed.publishedIsoDate,
    status:
      ed.status === 'current'
        ? 'current'
        : ed.status === 'archived'
          ? 'archived'
          : idx === 1
            ? 'in_production'
            : 'planning',
    readinessPercent: ed.status === 'current' || ed.status === 'archived' ? 100 : 65,
    approvedBy: ed.status !== 'forthcoming' ? 'Dr. Fayaz Ahmad Khan' : undefined,
    updatedAt: '2026-11-25T00:00:00.000Z',
  }));
}

function buildSeededAssignments(): HdnEditorialAssignment[] {
  return FORTHCOMING_ASSIGNMENTS.map((fa) => ({
    id: fa.id,
    title: fa.workingTitle,
    editorialBrief: fa.synopsis,
    assignedJournalistSlug: fa.journalistSlug || 'wetlands-forest-desk',
    assignedJournalistName:
      JOURNALIST_PROFILES.find((j) => j.slug === fa.journalistSlug)?.name || fa.bylineDisplay,
    responsibleEditorSlug: 'dr-fayaz-ahmad-khan',
    responsibleEditorName: 'Dr. Fayaz Ahmad Khan',
    bureauId: fa.region.toLowerCase().includes('ladakh')
      ? 'ladakh'
      : fa.region.toLowerCase().includes('jammu')
        ? 'jammu'
        : 'kashmir',
    departmentId: fa.departmentId,
    reportingBeatSlug:
      REPORTING_BEATS_FULL.find((b) => b.leadDepartmentId === fa.departmentId)?.slug ||
      'lakes-wetlands-springs-waterways',
    expectedDeliverables: [
      'Complete block-based longform manuscript',
      'Primary source citation & verification dossier',
      'Verified dateline & documentary visual metadata',
    ],
    targetWordCount: fa.departmentId === 'field-reports' ? 2200 : 3800,
    researchRequirements:
      'Cross-reference primary field observations against Kashmir EcoWatch observatory baselines and official records.',
    scientificReviewRequired:
      fa.departmentId === 'data-journalism' ||
      fa.workflowStage === 'scientific_review' ||
      fa.departmentId === 'cover-stories',
    mediaRequirements: 'Natural-light documentary photographs or KEW cartographic plate with provenance.',
    deadlineIso: '2026-12-20T18:00:00.000Z',
    priority: fa.isConfidential ? 'high' : 'standard',
    publicationStream: 'monthly_edition',
    proposedEditionSlug: fa.editionSlug,
    status:
      fa.workflowStage === 'drafting'
        ? 'drafting'
        : fa.workflowStage === 'fact_checking' || fa.workflowStage === 'scientific_review'
          ? 'submitted'
          : 'researching',
    isConfidential: fa.isConfidential,
    sourceProtectionLevel: fa.sourceProtectionLevel,
    publicPreviewApproved: fa.publicPreviewApproved,
    correspondence: [],
    history: [
      {
        id: `hist-${fa.id}`,
        timestamp: '2026-11-20T12:00:00.000Z',
        actorName: 'Himalayan Dispatch Commissioning Desk',
        action: 'commissioned',
        note: `Commissioned for ${fa.editionSlug} (${fa.departmentLabel}).`,
      },
    ],
    createdAt: '2026-11-20T12:00:00.000Z',
    updatedAt: '2026-11-25T00:00:00.000Z',
  }));
}

function projectCanonicalStoriesToManuscripts(): HdnArticleManuscript[] {
  return MAGAZINE_STORIES.map((st) => {
    const blocks = chaptersToBlocks(st.chapters);
    if (st.dataVisualization) {
      blocks.unshift({
        id: `blk-chart-${st.slug}`,
        type: 'interactive_chart',
        order: 0,
        heading: st.dataVisualization.title,
        subheading: st.dataVisualization.subtitle,
        chartStyle: st.dataVisualization.chartStyle,
        chartUnit: st.dataVisualization.unit,
        keyFindingStat: st.dataVisualization.keyFindingStat,
        keyFindingNarrative: st.dataVisualization.keyFindingNarrative,
        chartPoints: st.dataVisualization.points,
        corroborationNote: st.dataVisualization.sourceCitation,
      });
    }
    if (st.relatedKewModule) {
      blocks.push({
        id: `blk-kew-${st.slug}`,
        type: 'related_kew_intelligence',
        order: blocks.length + 1,
        kewModuleLabel: st.relatedKewModule.label,
        kewModuleHref: st.relatedKewModule.href,
        kewScientificContext: st.relatedKewModule.scientificContext,
      });
    }

    const bureauId: BureauSlugId = st.region.toLowerCase().includes('ladakh')
      ? 'ladakh'
      : st.region.toLowerCase().includes('jammu')
        ? 'jammu'
        : 'kashmir';

    const computedMetrics = computeStoryMetrics(st);
    const isPreReleaseStage08 =
      st.publicationGates?.currentStage === 'administrator_approval';
    const sciRequired = st.publicationGates
      ? st.publicationGates.scientificReviewApplicable
      : st.departmentId !== 'editorials' && st.departmentId !== 'photo-essays';

    return {
      id: `hdn-ms-${st.slug}`,
      slug: st.slug,
      originType: 'canonical_magazine_story',
      headline: st.title,
      standfirst: st.subtitle,
      subtitle: st.excerpt,
      bylineDisplay: st.bylineDisplay,
      bylineRole: st.bylineRole,
      primaryAuthorSlug: st.journalistSlug,
      coAuthorSlugs: [],
      photographyByline: st.photographyByline,
      dateline: st.dateline,
      isAiAssisted: false,
      publicationStream: 'monthly_edition',
      targetEditionSlug: st.editionSlug,
      editionLabel: st.editionLabel,
      departmentId: st.departmentId,
      bureauId,
      reportingBeatSlug: st.reportingBeatSlug || 'lakes-wetlands-springs-waterways',
      reportingBeatLabel: st.reportingBeatLabel || 'Western Himalayan Environment',
      articleFormat:
        st.departmentId === 'cover-stories'
          ? 'Cover Story'
          : st.departmentId === 'photo-essays'
            ? 'Photo Essay'
            : st.departmentId === 'data-journalism'
              ? 'Data Journalism Essay'
              : st.departmentId === 'investigative-journalism'
                ? 'Investigative Dossier'
                : st.departmentId === 'interviews'
                  ? 'Interview / Q&A'
                  : 'Longform Feature',
      lifecycleStage: isPreReleaseStage08 ? '12' : '13',
      workflowStatus: isPreReleaseStage08
        ? 'ready_for_approval'
        : st.isPublished
          ? 'published'
          : 'editorial_review',
      reviewTrack:
        st.departmentId === 'investigative-journalism'
          ? 'sensitive_investigative'
          : 'scientific_technical',
      riskLevel: 'GREEN',
      priority: 'standard',
      isFeatured: Boolean(st.isFeaturedCoverStory),
      isConfidential: false,
      factCheckRequired: true,
      factCheckCompleted: Boolean(st.hasCompletedIndependentReview),
      factCheckedBy: st.factCheckedBy,
      scientificReviewRequired: sciRequired,
      scientificReviewCompleted: sciRequired ? Boolean(st.hasCompletedIndependentReview) : true,
      scientificReviewedBy: st.scientificReviewer,
      legalReviewRequired: st.departmentId === 'investigative-journalism',
      legalReviewCompleted: true,
      copyEditCompleted: true,
      visualProductionCompleted: true,
      finalApprovedBy: isPreReleaseStage08 ? undefined : 'Dr. Fayaz Ahmad Khan',
      heroImage: st.heroImage,
      heroCaption: st.heroCaption,
      heroCredit: st.heroCredit,
      heroLicense: 'Himalayan Dispatch × KEW Archive',
      heroProvenance:
        st.visualEssayMode === 'illustrative_monochrome_study'
          ? 'labeled_conceptual_illustration'
          : 'authentic_documentary_photograph',
      heroMonochrome: st.heroMonochrome,
      blocks,
      scientificLimitations: [],
      editorialDisclosure:
        st.editorialVerificationNote ||
        'Prepared under the Himalayan Dispatch 10-Stage Editorial Governance Charter.',
      conflictOfInterestDisclosure: 'No competing financial or institutional interests declared.',
      sourceReferenceIds: [],
      relatedArticleSlugs: [],
      relatedKewModules: st.relatedKewModule ? [st.relatedKewModule] : [],
      wordCount: computedMetrics.wordCount,
      readingTimeMinutes: computedMetrics.readingTimeMinutes,
      seoTitle: st.seoTitle || `${st.title} — Himalayan Dispatch`,
      metaDescription: st.excerpt.slice(0, 158),
      canonicalUrl: `/himalayan-dispatch/issues/${
        st.editionSlug === 'vol-01-no-01' ? 'volume-01-issue-01' : st.editionSlug
      }/${st.slug}`,
      seoKeywords: st.seoKeywords,
      versionNumber: 1,
      createdAt: `${st.publishedAt}T00:00:00.000Z`,
      updatedAt: `${st.updatedAt || st.publishedAt}T00:00:00.000Z`,
      publishedAt:
        st.isPublished && !isPreReleaseStage08 ? `${st.publishedAt}T00:00:00.000Z` : undefined,
      comments: [],
      revisions: [
        {
          id: `rev-init-${st.slug}`,
          versionNumber: 1,
          savedAt: `${st.updatedAt || st.publishedAt}T00:00:00.000Z`,
          saveKind: 'manual',
          actorSlug: st.journalistSlug,
          actorName: st.bylineDisplay,
          actorRole: st.bylineRole,
          summary: isPreReleaseStage08
            ? 'Stage 08 Pre-Release Edition Folio awaiting Administrator Approval.'
            : 'Published canonical edition folio.',
          workflowStatus: isPreReleaseStage08 ? 'ready_for_approval' : 'published',
          wordCount: computedMetrics.wordCount,
          headline: st.title,
          standfirst: st.subtitle,
          blocksSnapshot: blocks,
        },
      ],
      corrections: st.corrections,
    };
  });
}

function mapAnieStatusToHdn(status: AnieEditorialDraft['editorialStatus']): HdnWorkflowStatus {
  switch (status) {
    case 'awaiting_review':
      return 'editorial_review';
    case 'in_scientific_review':
      return 'scientific_review';
    case 'in_legal_review':
      return 'legal_review';
    case 'scheduled':
      return 'scheduled';
    case 'published':
      return 'published';
    case 'unpublished':
      return 'revision_requested';
    case 'rejected':
      return 'rejected';
    case 'trashed':
      return 'trashed';
  }
}

export function projectAnieDraftToHdnManuscript(draft: AnieEditorialDraft): HdnArticleManuscript {
  const validBureau: BureauSlugId = (
    ['kashmir', 'jammu', 'ladakh', 'ajk', 'gilgit', 'baltistan'].includes(draft.bureauId)
      ? draft.bureauId
      : 'kashmir'
  ) as BureauSlugId;

  const blocks = chaptersToBlocks(draft.chapters);
  blocks.push({
    id: `blk-disc-${draft.id}`,
    type: 'editorial_disclosure',
    order: blocks.length + 1,
    authorshipOrigin: draft.assignedJournalistSlug
      ? 'human_with_ai_research'
      : 'autonomous_hd_anie_desk',
    aiDisclosureText: draft.editorialDisclosure,
    scientificLimitationsNote: draft.limitationsAndEvidenceGaps.join(' '),
  });

  const wfStatus = mapAnieStatusToHdn(draft.editorialStatus);
  const effectiveByline =
    draft.bylineDisplay === 'Himalayan Dispatch Intelligence Desk'
      ? 'Himalayan Dispatch Desk'
      : draft.bylineDisplay;

  return {
    id: `anie-ms-${draft.id}`,
    slug: draft.slug,
    originType: 'ai_autonomous_draft',
    linkedAnieDraftId: draft.id,
    headline: draft.headline,
    standfirst: draft.standfirst,
    subtitle: draft.executiveSummary,
    bylineDisplay: effectiveByline,
    bylineRole: draft.bylineRole,
    primaryAuthorSlug: draft.assignedJournalistSlug || 'himalayan-dispatch-desk',
    coAuthorSlugs: [],
    dateline: draft.dateline,
    isAiAssisted: true,
    publicationStream: draft.stream,
    targetEditionSlug: draft.targetEditionSlug,
    editionLabel: draft.editionLabel,
    departmentId: draft.departmentId,
    bureauId: validBureau,
    reportingBeatSlug:
      REPORTING_BEATS_FULL.find((b) => b.leadDepartmentId === draft.departmentId)?.slug ||
      'lakes-wetlands-springs-waterways',
    reportingBeatLabel: draft.reportingBeat,
    articleFormat:
      draft.stream === 'monthly_edition' ? 'Longform Feature' : 'Regional Dispatch',
    lifecycleStage: mapStatusToLifecycleStage(wfStatus),
    workflowStatus: wfStatus,
    reviewTrack:
      draft.riskLevel === 'RED'
        ? 'sensitive_investigative'
        : draft.riskLevel === 'AMBER'
          ? 'scientific_technical'
          : 'routine_low_risk',
    riskLevel: draft.riskLevel,
    priority: draft.riskLevel === 'RED' ? 'high' : 'standard',
    isFeatured: draft.isFeatured,
    isConfidential: draft.riskLevel === 'RED',
    factCheckRequired: true,
    factCheckCompleted: draft.qualityReport.overallPassed,
    factCheckedBy: draft.qualityReport.overallPassed
      ? 'HD-ANIE Deterministic Claim & Citation Gate'
      : undefined,
    scientificReviewRequired: draft.scientificReviewRequired,
    scientificReviewCompleted: draft.scientificReviewApproved,
    scientificReviewedBy: draft.scientificReviewedBy,
    legalReviewRequired: draft.legalReviewRequired,
    legalReviewCompleted: draft.legalReviewApproved,
    legalReviewedBy: draft.legalReviewedBy,
    copyEditCompleted: draft.editorialStatus === 'published',
    visualProductionCompleted: draft.qualityReport.imageProvenancePassed,
    heroImage: draft.heroImage,
    heroCaption: draft.heroCaption,
    heroCredit: draft.heroCredit,
    heroLicense: draft.heroLicense,
    heroProvenance:
      draft.visualProvenanceType === 'kew_scientific_cartography'
        ? 'kew_scientific_cartography'
        : draft.visualProvenanceType === 'labeled_conceptual_illustration'
          ? 'labeled_conceptual_illustration'
          : 'authentic_documentary_photograph',
    heroMonochrome: draft.heroMonochrome,
    blocks,
    scientificLimitations: draft.limitationsAndEvidenceGaps,
    editorialDisclosure: draft.editorialDisclosure,
    conflictOfInterestDisclosure: 'Automated source-based synthesis; zero external sponsorship.',
    sourceReferenceIds: draft.sourceReferences.map((r) => String(r.refNumber)),
    relatedArticleSlugs: [],
    relatedKewModules: draft.relatedKewModules,
    wordCount: draft.wordCount,
    readingTimeMinutes: draft.readingTimeMinutes,
    seoTitle: draft.seoTitle,
    metaDescription: draft.metaDescription,
    canonicalUrl:
      draft.stream === 'daily_dispatch'
        ? `/himalayan-dispatch/daily-dispatch/${draft.slug}`
        : `/himalayan-dispatch/issues/${draft.targetEditionSlug}/${draft.slug}`,
    seoKeywords: draft.seoKeywords,
    versionNumber: Math.max(1, draft.revisionHistory.length),
    createdAt: draft.createdAt,
    updatedAt: draft.updatedAt,
    scheduledPublicationAt: draft.scheduledPublicationAt,
    publishedAt: draft.publishedAt,
    trashedAt: draft.trashedAt,
    comments: [],
    revisions: draft.revisionHistory.map((r, idx) => ({
      id: r.id,
      versionNumber: draft.revisionHistory.length - idx,
      savedAt: r.timestamp,
      saveKind: r.actorType === 'hd_anie_engine' ? 'ai_generation' : 'manual',
      actorSlug:
        r.actorType === 'hd_anie_engine' ? 'himalayan-dispatch-desk' : 'dr-fayaz-ahmad-khan',
      actorName: r.actor,
      actorRole: r.actorType,
      summary: r.summary,
      workflowStatus: mapAnieStatusToHdn(r.newStatus),
      wordCount: draft.wordCount,
      headline: r.previousHeadline || draft.headline,
      standfirst: draft.standfirst,
      blocksSnapshot: blocks,
    })),
    corrections: draft.corrections,
  };
}

function createInitialHdnStore(): HdnPersistentStore {
  return {
    schemaVersion: 8,
    accounts: buildSeededAccounts(),
    manuscripts: projectCanonicalStoriesToManuscripts(),
    assignments: buildSeededAssignments(),
    scientificReviews: [],
    factChecks: [],
    confidentialSources: [],
    mediaAssets: [...HIMALAYAN_DISPATCH_GOVERNED_MEDIA_REGISTRY],
    editions: buildSeededEditions(),
    notifications: [
      {
        id: 'hdn-notif-welcome',
        recipientSlug: 'all_newsroom',
        category: 'announcement',
        title: 'Himalayan Dispatch Newsroom (HDN) Operating System Active',
        body: 'Human manuscripts and HD-ANIE autonomous research dossiers now operate inside one unified block-based Editorial CMS with 18-role server-side governance.',
        href: '/newsroom',
        readBySlugs: [],
        createdAt: '2026-11-25T00:00:00.000Z',
      },
    ],
    auditLogs: [
      {
        id: 'hdn-aud-bootstrap',
        timestamp: '2026-11-25T00:00:00.000Z',
        actorSlug: 'dr-fayaz-ahmad-khan',
        actorName: 'HDN System Bootstrap',
        actorRoles: ['founding_eic', 'system_administrator'],
        category: 'rbac_security',
        action: 'initialize_hdn_os',
        details:
          'Initialized Himalayan Dispatch Newsroom (HDN) store with Founding Masthead accounts, canonical Vol. 01 stories, and 18-role RBAC enforcement.',
      },
    ],
  };
}

/**
 * Synchronizes approved applications & legacy journalist drafts from `himalayan-dispatch-store.json`
 * into the HDN store on read so both onboarding portals & workspaces stay 100% unified!
 */
function syncLegacyDispatchRecordsIntoHdn(store: HdnPersistentStore): boolean {
  let mutated = false;
  try {
    if (!fs.existsSync(DISPATCH_LEGACY_STORE_FILE)) return false;
    const raw = JSON.parse(fs.readFileSync(DISPATCH_LEGACY_STORE_FILE, 'utf8'));

    // 1. Sync approved contributor applications -> active HdnAccountRecord
    const apps = Array.isArray(raw.applications) ? raw.applications : [];
    for (const app of apps) {
      if (!app.email) continue;
      const slug =
        app.assignedJournalistSlug ||
        slugifyText(app.fullName || app.email.split('@')[0] || 'contributor');
      const existing = store.accounts.find(
        (a) => a.linkedApplicationId === app.id || a.email.toLowerCase() === app.email.toLowerCase()
      );

      const mappedRole: HdnRoleId =
        app.roleCategoryId === 'photojournalist' || app.roleCategoryId === 'documentary-filmmaker'
          ? 'photojournalist'
          : app.roleCategoryId === 'freelance-contributor' || app.roleCategoryId === 'guest-columnist'
            ? 'freelance_contributor'
            : 'journalist';

      const targetStatus: HdnAccountRecord['status'] =
        app.status === 'Approved' && app.charterAccepted
          ? 'active'
          : app.status === 'Suspended'
            ? 'suspended'
            : app.status === 'Declined' || app.status === 'Withdrawn'
              ? 'inactive'
              : 'pending_approval';

      if (!existing && app.status === 'Approved') {
        store.accounts.push({
          id: `hdn-acc-${slug}`,
          slug,
          fullName: app.fullName,
          email: app.email.toLowerCase(),
          primaryRoleTitle: app.roleCategoryTitle || 'Accredited Contributor',
          roles: [mappedRole],
          assignedBureaus: ['kashmir'],
          assignedDepartments: [app.preferredDepartmentId || 'field-reports'],
          reportingBeats: [],
          basedIn: app.locationOrDistrict || 'Western Himalayas',
          shortBio: app.professionalBackground || '',
          languages: Array.isArray(app.languages) && app.languages.length > 0 ? app.languages : ['English'],
          verifiedCredentials: app.publishedWorkNotes ? [app.publishedWorkNotes] : [],
          approvedProfessionalLinks: app.portfolioUrl
            ? [{ label: 'Portfolio', url: app.portfolioUrl }]
            : [],
          accessCodeHash: app.workspaceAccessCode
            ? hashAccessCode(app.workspaceAccessCode)
            : undefined,
          status: targetStatus,
          charterAccepted: Boolean(app.charterAccepted),
          charterAcceptedAt: app.charterAcceptedAt,
          contributorAgreementAccepted: Boolean(app.nonEmploymentAcknowledged),
          contributorAgreementType: app.engagementBasis || 'voluntary_editorial_fellow',
          publicPortfolioConsent: Boolean(app.publicPortfolioConsent),
          publicPortfolioApproved: Boolean(app.publicPortfolioApproved),
          linkedApplicationId: app.id,
          createdAt: app.submittedAt || new Date().toISOString(),
          updatedAt: app.updatedAt || new Date().toISOString(),
        });
        mutated = true;
      } else if (existing && existing.linkedApplicationId === app.id) {
        if (existing.status !== targetStatus) {
          existing.status = targetStatus;
          mutated = true;
        }
        if (app.workspaceAccessCode) {
          const nextHash = hashAccessCode(app.workspaceAccessCode);
          if (existing.accessCodeHash !== nextHash) {
            existing.accessCodeHash = nextHash;
            mutated = true;
          }
        }
      }
    }

    // 2. Sync legacy `journalistDrafts` -> `HdnArticleManuscript` if not already imported
    const jDrafts = Array.isArray(raw.journalistDrafts) ? raw.journalistDrafts : [];
    for (const jd of jDrafts) {
      const msId = `hdn-jd-${jd.id}`;
      if (store.manuscripts.some((m) => m.id === msId)) continue;
      const authorAcc = store.accounts.find((a) => a.slug === jd.journalistSlug);
      const blocks: HdnContentBlock[] = [
        {
          id: `blk-${jd.id}-1`,
          type: 'rich_text',
          order: 1,
          chapterRoman: 'I',
          heading: jd.workingTitle,
          subheading: jd.subtitle,
          bodyText: jd.bodyMarkdown || '',
          dropCap: true,
        },
      ];
      store.manuscripts.unshift({
        id: msId,
        slug: `${slugifyText(jd.workingTitle)}-${String(jd.id).slice(-4)}`,
        originType: 'human_manuscript',
        headline: jd.workingTitle,
        standfirst: jd.subtitle || '',
        subtitle: jd.subtitle || '',
        bylineDisplay: authorAcc?.fullName || jd.journalistSlug,
        bylineRole: authorAcc?.primaryRoleTitle || 'Himalayan Dispatch Contributor',
        primaryAuthorSlug: jd.journalistSlug,
        coAuthorSlugs: [],
        dateline: jd.dateline || 'WESTERN HIMALAYAS',
        isAiAssisted: String(jd.id).startsWith('jd-anie-'),
        publicationStream: 'monthly_edition',
        targetEditionSlug: jd.targetEditionSlug || 'issue-02-a-world-in-transition',
        editionLabel: 'ISSUE 02 · IN DEVELOPMENT',
        departmentId: jd.departmentId || 'longform-features',
        bureauId: 'kashmir',
        reportingBeatSlug: 'lakes-wetlands-springs-waterways',
        reportingBeatLabel: 'Western Himalayan Environment',
        articleFormat: 'Longform Feature',
        lifecycleStage: jd.workflowStage === 'fact_checking' ? '07' : '04',
        workflowStatus: jd.workflowStage === 'fact_checking' ? 'fact_checking' : 'drafting',
        reviewTrack: 'standard_reporting',
        riskLevel: 'GREEN',
        priority: 'standard',
        isFeatured: false,
        isConfidential: false,
        factCheckRequired: true,
        factCheckCompleted: false,
        scientificReviewRequired: false,
        scientificReviewCompleted: false,
        legalReviewRequired: false,
        legalReviewCompleted: false,
        copyEditCompleted: false,
        visualProductionCompleted: false,
        heroImage: '/images/publications/kolahoi-glacier-cryosphere.jpg',
        heroCaption: 'Documentary landscape plate pending visual production selection.',
        heroCredit: 'Himalayan Dispatch Archive',
        heroLicense: 'KEW Institutional Archive',
        heroProvenance: 'authentic_documentary_photograph',
        blocks,
        scientificLimitations: [],
        editorialDisclosure: 'Human-authored manuscript in the Himalayan Dispatch Newsroom.',
        conflictOfInterestDisclosure: 'None declared.',
        sourceReferenceIds: [],
        relatedArticleSlugs: [],
        relatedKewModules: [],
        wordCount: jd.wordCount || 0,
        readingTimeMinutes: Math.max(2, Math.round((jd.wordCount || 200) / 215)),
        seoTitle: `${jd.workingTitle} — Himalayan Dispatch`,
        metaDescription: jd.subtitle || jd.workingTitle,
        canonicalUrl: '',
        seoKeywords: ['Himalayan Dispatch'],
        versionNumber: 1,
        createdAt: jd.updatedAt || new Date().toISOString(),
        updatedAt: jd.updatedAt || new Date().toISOString(),
        comments: [],
        revisions: [
          {
            id: `rev-${jd.id}`,
            versionNumber: 1,
            savedAt: jd.updatedAt || new Date().toISOString(),
            saveKind: 'manual',
            actorSlug: jd.journalistSlug,
            actorName: authorAcc?.fullName || jd.journalistSlug,
            actorRole: 'journalist',
            summary: 'Imported existing Journalist Workspace draft.',
            workflowStatus: jd.workflowStage === 'fact_checking' ? 'fact_checking' : 'drafting',
            wordCount: jd.wordCount || 0,
            headline: jd.workingTitle,
            standfirst: jd.subtitle || '',
            blocksSnapshot: blocks,
          },
        ],
        corrections: [],
      });
      mutated = true;
    }
  } catch {
    // Ignore transient parse issue
  }
  return mutated;
}

export function readHdnStore(): HdnPersistentStore {
  try {
    if (!fs.existsSync(HDN_STORE_FILE)) {
      const initial = createInitialHdnStore();
      syncLegacyDispatchRecordsIntoHdn(initial);
      writeHdnStore(initial);
      return initial;
    }
    const parsed = JSON.parse(fs.readFileSync(HDN_STORE_FILE, 'utf8')) as Partial<HdnPersistentStore>;
    const defaults = createInitialHdnStore();

    const deprecatedSyntheticSlugs = new Set([
      'aaliya-andrabi',
      'danish-wani',
      'dr-nida-hamdani',
      'rafiq-ahmad-bhat',
    ]);
    // Ensure canonical seeded accounts exist without retaining deprecated prototype personas
    const existingAccs = (Array.isArray(parsed.accounts) ? parsed.accounts : []).filter(
      (a) => !deprecatedSyntheticSlugs.has(a.slug)
    );
    const seenSlugs = new Set(existingAccs.map((a) => a.slug));
    for (const seedAcc of defaults.accounts) {
      if (!seenSlugs.has(seedAcc.slug)) {
        existingAccs.push(seedAcc);
      }
    }

    // Ensure canonical seeded stories exist and v1 canonical projections stay synchronized with code
    const existingMs = Array.isArray(parsed.manuscripts) ? parsed.manuscripts : [];
    const defaultMsById = new Map(defaults.manuscripts.map((m) => [m.id, m]));
    const refreshedMs = existingMs.map((m) => {
      const seed = defaultMsById.get(m.id);
      if (seed && m.originType === 'canonical_magazine_story' && m.versionNumber <= 1) {
        const cleanedCorrections = (m.corrections || []).filter((c) => c.id !== 'corr-hd-06-1');
        return {
          ...seed,
          corrections: cleanedCorrections.length ? cleanedCorrections : seed.corrections,
          comments: m.comments || [],
        };
      }
      return m;
    });
    const seenMsIds = new Set(refreshedMs.map((m) => m.id));
    for (const seedMs of defaults.manuscripts) {
      if (!seenMsIds.has(seedMs.id)) {
        refreshedMs.push(seedMs);
      }
    }

    // Merge restricted Visual Governance Registry without losing custom uploaded assets
    const existingMedia = Array.isArray(parsed.mediaAssets)
      ? parsed.mediaAssets.filter((m) => !m.id.startsWith('hdn-media-0'))
      : [];
    const seenMediaUrls = new Set(defaults.mediaAssets.map((m) => m.url));
    const mergedMedia = [
      ...defaults.mediaAssets,
      ...existingMedia.filter((m) => !seenMediaUrls.has(m.url)),
    ];

    const isSchemaUpgrade = (parsed.schemaVersion || 1) < 8;
    const defaultEditionsById = new Map(defaults.editions.map((e) => [e.id, e]));
    const existingEditions = Array.isArray(parsed.editions) ? parsed.editions : [];
    const mergedEditions = [
      ...defaults.editions,
      ...existingEditions.filter((e) => !defaultEditionsById.has(e.id)),
    ];
    const store: HdnPersistentStore = {
      schemaVersion: 8,
      accounts: existingAccs,
      manuscripts: refreshedMs,
      assignments:
        !isSchemaUpgrade && Array.isArray(parsed.assignments)
          ? parsed.assignments
          : defaults.assignments,
      scientificReviews: Array.isArray(parsed.scientificReviews) ? parsed.scientificReviews : [],
      factChecks: Array.isArray(parsed.factChecks) ? parsed.factChecks : [],
      confidentialSources: Array.isArray(parsed.confidentialSources)
        ? parsed.confidentialSources
        : [],
      mediaAssets: mergedMedia,
      editions: mergedEditions,
      notifications: Array.isArray(parsed.notifications)
        ? parsed.notifications
        : defaults.notifications,
      auditLogs: Array.isArray(parsed.auditLogs) ? parsed.auditLogs : defaults.auditLogs,
    };

    if (syncLegacyDispatchRecordsIntoHdn(store) || isSchemaUpgrade) {
      writeHdnStore(store);
    }
    return store;
  } catch {
    return createInitialHdnStore();
  }
}

export function writeHdnStore(store: HdnPersistentStore): void {
  try {
    const dir = path.dirname(HDN_STORE_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    store.auditLogs = store.auditLogs.slice(0, 500);
    store.notifications = store.notifications.slice(0, 200);
    const tmp = `${HDN_STORE_FILE}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(store, null, 2), 'utf8');
    fs.renameSync(tmp, HDN_STORE_FILE);
  } catch (err) {
    console.error('[HDN Store] Write failed:', err);
  }
}

export function recordHdnAudit(
  store: HdnPersistentStore,
  actor: Pick<HdnAccountRecord, 'slug' | 'fullName' | 'roles'>,
  entry: Omit<HdnAuditLogRecord, 'id' | 'timestamp' | 'actorSlug' | 'actorName' | 'actorRoles'>
): void {
  store.auditLogs.unshift({
    id: `hdn-aud-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    timestamp: new Date().toISOString(),
    actorSlug: actor.slug,
    actorName: actor.fullName,
    actorRoles: actor.roles,
    ...entry,
  });
}

export function pushHdnNotification(
  store: HdnPersistentStore,
  notif: Omit<HdnNotificationItem, 'id' | 'readBySlugs' | 'createdAt'>
): void {
  store.notifications.unshift({
    id: `hdn-ntf-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
    readBySlugs: [],
    createdAt: new Date().toISOString(),
    ...notif,
  });
}

// ─── UNIFIED MANUSCRIPT VIEW (COMBINES HDN MANUSCRIPTS + LIVE HD-ANIE DRAFTS) ─

export function getAllUnifiedManuscripts(includeTrashed = false): HdnArticleManuscript[] {
  const hdnStore = readHdnStore();
  const anieStore = readAnieStore();

  // Map any AnieEditorialDraft not already adopted/overridden in hdnStore.manuscripts
  const overriddenAnieIds = new Set(
    hdnStore.manuscripts.map((m) => m.linkedAnieDraftId).filter(Boolean)
  );

  const anieProjected = anieStore.drafts
    .filter((d) => !overriddenAnieIds.has(d.id))
    .map(projectAnieDraftToHdnManuscript);

  const combined = [...hdnStore.manuscripts, ...anieProjected];
  const filtered = includeTrashed
    ? combined
    : combined.filter((m) => m.workflowStatus !== 'trashed');

  return filtered.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function getUnifiedManuscriptByIdOrSlug(idOrSlug: string): HdnArticleManuscript | null {
  const all = getAllUnifiedManuscripts(true);
  return (
    all.find(
      (m) =>
        m.id === idOrSlug ||
        m.slug === idOrSlug ||
        (m.linkedAnieDraftId && m.linkedAnieDraftId === idOrSlug)
    ) || null
  );
}

export function getScopedManuscriptsForAccount(
  account: HdnAccountRecord,
  includeTrashed = false
): HdnArticleManuscript[] {
  return getAllUnifiedManuscripts(includeTrashed).filter((m) => canAccessManuscript(account, m));
}

/**
 * Ensures an `anie-ms-*` virtual projection is materialized into `hdnStore.manuscripts`
 * before inline block-editing, commenting, or revision comparison, while syncing status back to HD-ANIE!
 */
function ensureMaterializedManuscript(
  hdnStore: HdnPersistentStore,
  idOrSlug: string
): HdnArticleManuscript | null {
  const existing = hdnStore.manuscripts.find(
    (m) => m.id === idOrSlug || m.slug === idOrSlug || m.linkedAnieDraftId === idOrSlug
  );
  if (existing) return existing;

  const anieStore = readAnieStore();
  const rawId = idOrSlug.startsWith('anie-ms-') ? idOrSlug.slice('anie-ms-'.length) : idOrSlug;
  const anieDraft = anieStore.drafts.find((d) => d.id === rawId || d.slug === idOrSlug);
  if (!anieDraft) return null;

  const projected = projectAnieDraftToHdnManuscript(anieDraft);
  hdnStore.manuscripts.unshift(projected);
  return projected;
}

function syncHdnManuscriptBackToAnieIfLinked(
  ms: HdnArticleManuscript,
  actorName: string
): void {
  if (!ms.linkedAnieDraftId) return;
  const anieStore = readAnieStore();
  const draft = anieStore.drafts.find((d) => d.id === ms.linkedAnieDraftId);
  if (!draft) return;

  draft.headline = ms.headline;
  draft.standfirst = ms.standfirst;
  draft.bylineDisplay = ms.bylineDisplay;
  draft.dateline = ms.dateline;
  draft.departmentId = ms.departmentId;
  draft.stream = ms.publicationStream;
  draft.chapters = blocksToChapters(ms.blocks);
  draft.heroImage = ms.heroImage;
  draft.heroCaption = ms.heroCaption;
  draft.heroCredit = ms.heroCredit;
  draft.editorialDisclosure = ms.editorialDisclosure;
  draft.wordCount = ms.wordCount;
  draft.readingTimeMinutes = ms.readingTimeMinutes;
  draft.scientificReviewApproved = ms.scientificReviewCompleted;
  draft.scientificReviewedBy = ms.scientificReviewedBy;
  draft.legalReviewApproved = ms.legalReviewCompleted;
  draft.legalReviewedBy = ms.legalReviewedBy;
  draft.isFeatured = ms.isFeatured;
  draft.corrections = ms.corrections;
  draft.updatedAt = ms.updatedAt;

  if (ms.workflowStatus === 'published') {
    draft.editorialStatus = 'published';
    draft.publishedAt = ms.publishedAt || ms.updatedAt;
  } else if (ms.workflowStatus === 'scheduled') {
    draft.editorialStatus = 'scheduled';
    draft.scheduledPublicationAt = ms.scheduledPublicationAt;
  } else if (ms.workflowStatus === 'scientific_review') {
    draft.editorialStatus = 'in_scientific_review';
  } else if (ms.workflowStatus === 'legal_review') {
    draft.editorialStatus = 'in_legal_review';
  } else if (ms.workflowStatus === 'rejected') {
    draft.editorialStatus = 'rejected';
  } else if (ms.workflowStatus === 'trashed') {
    draft.editorialStatus = 'trashed';
    draft.trashedAt = ms.trashedAt;
  } else {
    draft.editorialStatus = 'awaiting_review';
  }

  recordAnieAudit(anieStore, {
    actor: actorName,
    category: ms.workflowStatus === 'published' ? 'publication' : 'editorial_action',
    action: `hdn_cms_sync_${ms.workflowStatus}`,
    targetId: draft.id,
    targetTitle: draft.headline,
    details: `Synchronized unified HDN CMS update (${ms.workflowStatus}, v${ms.versionNumber}).`,
  });
  writeAnieStore(anieStore);
}

// ─── AUTHENTICATION VERIFICATION FOR HDN LOGIN PORTAL ────────────────────────

export function authenticateHdnCredentials(input: {
  email: string;
  passcodeOrAccessCode: string;
}):
  | { ok: true; account: HdnAccountRecord }
  | { ok: false; status: 401 | 403; error: string } {
  const normEmail = input.email.trim().toLowerCase();
  const code = input.passcodeOrAccessCode.trim();
  if (!normEmail || !code) {
    return { ok: false, status: 401, error: 'Email and Newsroom Access Code / Passcode are required.' };
  }

  const store = readHdnStore();
  const acc = store.accounts.find((a) => a.email.toLowerCase() === normEmail);

  // Allow Founding EIC login via configured ADMIN_PASSCODE (never fallback to hardcoded literal)
  const configuredAdminPasscode = process.env.ADMIN_PASSCODE?.trim();
  const retiredDigest = 'fd50a0c4e0f20ef554e9858d22d57c3cc7b405f97d318d8a812ea3d4cc51535c';
  const configuredLowerDigest = configuredAdminPasscode
    ? crypto.createHash('sha256').update(configuredAdminPasscode.toLowerCase(), 'utf8').digest('hex')
    : '';
  const isValidAdminCode =
    Boolean(configuredAdminPasscode) &&
    configuredAdminPasscode!.length >= 10 &&
    configuredLowerDigest !== retiredDigest &&
    crypto.timingSafeEqual(
      crypto.createHash('sha256').update(code, 'utf8').digest(),
      crypto.createHash('sha256').update(configuredAdminPasscode!, 'utf8').digest()
    );
  if (
    isValidAdminCode &&
    (normEmail === 'fayaz@kashmir-ecowatch.com' ||
      normEmail === 'admin@kashmir-ecowatch.com' ||
      normEmail === 'editor@kashmir-ecowatch.com')
  ) {
    const founder = store.accounts.find((a) => a.slug === 'dr-fayaz-ahmad-khan')!;
    return { ok: true, account: founder };
  }

  if (!acc) {
    return {
      ok: false,
      status: 401,
      error: 'No Himalayan Dispatch Newsroom account found for that email address.',
    };
  }

  if (acc.status !== 'active') {
    return {
      ok: false,
      status: 403,
      error: `Workspace access blocked: account status is "${acc.status}". Editorial approval and charter acceptance are required.`,
    };
  }

  const providedHash = hashAccessCode(code);
  const validAdminPass = isValidAdminCode && isExecutiveOrAdmin(acc);
  const validStoredHash = Boolean(acc.accessCodeHash && acc.accessCodeHash === providedHash);

  if (!validAdminPass && !validStoredHash) {
    return {
      ok: false,
      status: 401,
      error: 'Invalid Newsroom Access Code or Passcode.',
    };
  }

  recordHdnAudit(store, acc, {
    category: 'authentication',
    action: 'newsroom_sign_in',
    details: `Authenticated into HDN Operating System (${acc.roles.join(', ')}).`,
  });
  writeHdnStore(store);

  return { ok: true, account: acc };
}

// ─── CREATE, EDIT, AUTOSAVE, REVISION DIFF/RESTORE & WORKFLOW MUTATIONS ──────

export function createHdnManuscript(
  account: HdnAccountRecord,
  input: {
    headline: string;
    standfirst?: string;
    subtitle?: string;
    dateline?: string;
    publicationStream?: HdnPublicationStream;
    targetEditionSlug?: string;
    departmentId?: EditorialDepartmentId;
    bureauId?: BureauSlugId;
    reportingBeatSlug?: string;
    articleFormat?: HdnArticleManuscript['articleFormat'];
    linkedAssignmentId?: string;
    isConfidential?: boolean;
    blocks?: HdnContentBlock[];
  }
): { ok: true; manuscript: HdnArticleManuscript } | { ok: false; error: string } {
  if (!hasPermission(account, 'manuscript:create_own') && !hasPermission(account, 'manuscript:edit_any')) {
    return { ok: false, error: 'Your newsroom role is not authorized to create manuscripts.' };
  }

  const store = readHdnStore();
  const nowIso = new Date().toISOString();
  const cleanHeadline = input.headline.trim() || 'Untitled Himalayan Dispatch Manuscript';
  const baseSlug = slugifyText(cleanHeadline) || 'manuscript';
  const slug = `${baseSlug}-${Date.now().toString(36).slice(-4)}`;

  const stream: HdnPublicationStream = input.publicationStream || 'monthly_edition';
  const deptId: EditorialDepartmentId = input.departmentId || 'field-reports';
  const bureauId: BureauSlugId =
    input.bureauId || account.assignedBureaus[0] || 'kashmir';
  const beatObj =
    REPORTING_BEATS_FULL.find((b) => b.slug === input.reportingBeatSlug) ||
    REPORTING_BEATS_FULL.find((b) => b.leadDepartmentId === deptId) ||
    REPORTING_BEATS_FULL[0];

  // Respect establishment bureau dateline honesty!
  const bureauObj = REGIONAL_REPORTING_BUREAUS.find((b) => b.id === bureauId);
  const defaultDateline =
    bureauObj && bureauObj.operationalStatus === 'in_establishment'
      ? `${bureauObj.name.toUpperCase()} REPORTING BEAT`
      : `${(bureauObj?.name || 'Kashmir Bureau').toUpperCase()}`;

  const initialBlocks: HdnContentBlock[] =
    input.blocks && input.blocks.length > 0
      ? input.blocks
      : [
          {
            id: `blk-${Date.now()}-1`,
            type: 'rich_text',
            order: 1,
            chapterRoman: 'I',
            heading: 'Opening Dispatch',
            bodyText: '',
            dropCap: true,
          },
        ];

  const { wordCount, readingTimeMinutes } = computeManuscriptWordCount(
    cleanHeadline,
    input.standfirst || '',
    initialBlocks
  );

  const isInvestigative = deptId === 'investigative-journalism' || Boolean(input.isConfidential);
  const isScientific =
    deptId === 'data-journalism' ||
    deptId === 'cover-stories' ||
    input.articleFormat === 'Scientific Explainer';

  const ms: HdnArticleManuscript = {
    id: `hdn-ms-${Date.now().toString(36)}-${crypto.randomBytes(2).toString('hex')}`,
    slug,
    originType: input.linkedAssignmentId ? 'commissioned_draft' : 'human_manuscript',
    linkedAssignmentId: input.linkedAssignmentId,
    headline: cleanHeadline,
    standfirst: (input.standfirst || '').trim(),
    subtitle: (input.subtitle || '').trim(),
    bylineDisplay: account.fullName,
    bylineRole: account.primaryRoleTitle,
    primaryAuthorSlug: account.slug,
    coAuthorSlugs: [],
    dateline: (input.dateline || defaultDateline).trim(),
    isAiAssisted: false,
    publicationStream: stream,
    targetEditionSlug:
      input.targetEditionSlug ||
      (stream === 'monthly_edition' ? 'issue-02-a-world-in-transition' : 'daily-dispatch-stream'),
    editionLabel:
      stream === 'monthly_edition' ? 'ISSUE 02 · A WORLD IN TRANSITION' : 'THE DAILY DISPATCH',
    departmentId: deptId,
    bureauId,
    reportingBeatSlug: beatObj.slug,
    reportingBeatLabel: beatObj.title,
    articleFormat: input.articleFormat || (stream === 'daily_dispatch' ? 'Regional Dispatch' : 'Field Report'),
    lifecycleStage: '04',
    workflowStatus: 'drafting',
    reviewTrack: isInvestigative
      ? 'sensitive_investigative'
      : isScientific
        ? 'scientific_technical'
        : 'standard_reporting',
    riskLevel: isInvestigative ? 'RED' : isScientific ? 'AMBER' : 'GREEN',
    priority: 'standard',
    isFeatured: false,
    isConfidential: Boolean(input.isConfidential),
    factCheckRequired: true,
    factCheckCompleted: false,
    scientificReviewRequired: isScientific,
    scientificReviewCompleted: false,
    legalReviewRequired: isInvestigative,
    legalReviewCompleted: false,
    copyEditCompleted: false,
    visualProductionCompleted: false,
    heroImage: '/images/publications/kolahoi-glacier-cryosphere.jpg',
    heroCaption: 'Documentary field plate (select or upload in Media tab).',
    heroCredit: account.fullName,
    heroLicense: 'Himalayan Dispatch Contributor License',
    heroProvenance: 'authentic_documentary_photograph',
    blocks: initialBlocks,
    scientificLimitations: [],
    editorialDisclosure: 'Original human-reported manuscript prepared in the Himalayan Dispatch Newsroom.',
    conflictOfInterestDisclosure: 'No conflict of interest declared.',
    sourceReferenceIds: [],
    relatedArticleSlugs: [],
    relatedKewModules: [
      {
        label: beatObj.kewObservatoryLabel,
        href: beatObj.kewObservatoryHref,
        scientificContext: beatObj.summary,
      },
    ],
    wordCount,
    readingTimeMinutes,
    seoTitle: `${cleanHeadline} — Himalayan Dispatch`,
    metaDescription: (input.standfirst || cleanHeadline).slice(0, 158),
    canonicalUrl:
      stream === 'daily_dispatch'
        ? `/himalayan-dispatch/daily-dispatch/${slug}`
        : `/himalayan-dispatch/issues/issue-02-a-world-in-transition/${slug}`,
    seoKeywords: ['Himalayan Dispatch', beatObj.title],
    versionNumber: 1,
    activeEditorSlug: account.slug,
    activeEditorLeaseUntil: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
    createdAt: nowIso,
    updatedAt: nowIso,
    comments: [],
    revisions: [
      {
        id: `rev-${Date.now()}`,
        versionNumber: 1,
        savedAt: nowIso,
        saveKind: 'manual',
        actorSlug: account.slug,
        actorName: account.fullName,
        actorRole: account.primaryRoleTitle,
        summary: 'Created new manuscript in block-based Editorial CMS.',
        workflowStatus: 'drafting',
        wordCount,
        headline: cleanHeadline,
        standfirst: (input.standfirst || '').trim(),
        blocksSnapshot: initialBlocks,
      },
    ],
    corrections: [],
  };

  if (input.linkedAssignmentId) {
    const asg = store.assignments.find((a) => a.id === input.linkedAssignmentId);
    if (asg) {
      asg.linkedManuscriptId = ms.id;
      asg.status = 'drafting';
      asg.updatedAt = nowIso;
    }
  }

  store.manuscripts.unshift(ms);
  recordHdnAudit(store, account, {
    category: 'manuscript_cms',
    action: 'create_manuscript',
    targetId: ms.id,
    targetLabel: ms.headline,
    details: `Created manuscript (${ms.publicationStream}, ${ms.departmentId}).`,
  });
  writeHdnStore(store);

  return { ok: true, manuscript: ms };
}

export function updateHdnManuscriptContent(
  account: HdnAccountRecord,
  manuscriptId: string,
  patch: Partial<
    Pick<
      HdnArticleManuscript,
      | 'headline'
      | 'standfirst'
      | 'subtitle'
      | 'bylineDisplay'
      | 'bylineRole'
      | 'photographyByline'
      | 'dateline'
      | 'publicationStream'
      | 'targetEditionSlug'
      | 'departmentId'
      | 'bureauId'
      | 'reportingBeatSlug'
      | 'articleFormat'
      | 'reviewTrack'
      | 'riskLevel'
      | 'priority'
      | 'deadlineIso'
      | 'isFeatured'
      | 'isConfidential'
      | 'heroImage'
      | 'heroCaption'
      | 'heroCredit'
      | 'heroLicense'
      | 'heroProvenance'
      | 'heroMonochrome'
      | 'blocks'
      | 'scientificLimitations'
      | 'editorialDisclosure'
      | 'conflictOfInterestDisclosure'
      | 'relatedArticleSlugs'
      | 'relatedKewModules'
      | 'seoTitle'
      | 'metaDescription'
      | 'canonicalUrl'
      | 'seoKeywords'
    >
  > & {
    saveKind?: 'manual' | 'autosave';
    revisionSummary?: string;
    expectedVersionNumber?: number;
    forceOverwriteConcurrent?: boolean;
  }
): { ok: true; manuscript: HdnArticleManuscript } | { ok: false; status?: number; error: string } {
  const store = readHdnStore();
  const ms = ensureMaterializedManuscript(store, manuscriptId);
  if (!ms) {
    return { ok: false, status: 404, error: 'Manuscript not found.' };
  }

  if (!canEditManuscript(account, ms)) {
    return {
      ok: false,
      status: 403,
      error: 'Unauthorized: You do not have permission to edit this manuscript.',
    };
  }

  // Concurrent editing safeguard: prevent silent overwrite when another user saved a newer version!
  if (
    patch.expectedVersionNumber !== undefined &&
    patch.expectedVersionNumber < ms.versionNumber &&
    !patch.forceOverwriteConcurrent &&
    ms.activeEditorSlug &&
    ms.activeEditorSlug !== account.slug
  ) {
    return {
      ok: false,
      status: 409,
      error: `Concurrent edit conflict: ${ms.activeEditorSlug} saved version v${ms.versionNumber} while you were editing v${patch.expectedVersionNumber}. Reload or confirm force-merge.`,
    };
  }

  const nowIso = new Date().toISOString();
  if (patch.headline !== undefined && patch.headline.trim()) ms.headline = patch.headline.trim();
  if (patch.standfirst !== undefined) ms.standfirst = patch.standfirst.trim();
  if (patch.subtitle !== undefined) ms.subtitle = patch.subtitle.trim();
  if (patch.bylineDisplay !== undefined && patch.bylineDisplay.trim()) {
    ms.bylineDisplay = patch.bylineDisplay.trim();
  }
  if (patch.bylineRole !== undefined) ms.bylineRole = patch.bylineRole.trim();
  if (patch.photographyByline !== undefined) ms.photographyByline = patch.photographyByline.trim();
  if (patch.dateline !== undefined) ms.dateline = patch.dateline.trim();
  if (patch.publicationStream !== undefined) ms.publicationStream = patch.publicationStream;
  if (patch.targetEditionSlug !== undefined) ms.targetEditionSlug = patch.targetEditionSlug;
  if (patch.departmentId !== undefined) ms.departmentId = patch.departmentId;
  if (patch.bureauId !== undefined) ms.bureauId = patch.bureauId;
  if (patch.reportingBeatSlug !== undefined) {
    ms.reportingBeatSlug = patch.reportingBeatSlug;
    const bt = REPORTING_BEATS_FULL.find((b) => b.slug === patch.reportingBeatSlug);
    if (bt) ms.reportingBeatLabel = bt.title;
  }
  if (patch.articleFormat !== undefined) ms.articleFormat = patch.articleFormat;
  if (patch.reviewTrack !== undefined && hasPermission(account, 'manuscript:edit_assigned_desk')) {
    ms.reviewTrack = patch.reviewTrack;
    ms.scientificReviewRequired =
      patch.reviewTrack === 'scientific_technical' ||
      patch.reviewTrack === 'sensitive_investigative';
    ms.legalReviewRequired = patch.reviewTrack === 'sensitive_investigative';
    ms.factCheckRequired = true;
  }
  if (patch.riskLevel !== undefined && hasPermission(account, 'manuscript:edit_assigned_desk')) {
    ms.riskLevel = patch.riskLevel;
  }
  if (patch.priority !== undefined) ms.priority = patch.priority;
  if (patch.deadlineIso !== undefined) ms.deadlineIso = patch.deadlineIso;
  if (patch.isFeatured !== undefined && hasPermission(account, 'publication:publish')) {
    ms.isFeatured = patch.isFeatured;
  }
  if (patch.isConfidential !== undefined) ms.isConfidential = patch.isConfidential;
  if (patch.heroImage !== undefined) ms.heroImage = patch.heroImage.trim();
  if (patch.heroCaption !== undefined) ms.heroCaption = patch.heroCaption.trim();
  if (patch.heroCredit !== undefined) ms.heroCredit = patch.heroCredit.trim();
  if (patch.heroLicense !== undefined) ms.heroLicense = patch.heroLicense.trim();
  if (patch.heroProvenance !== undefined) ms.heroProvenance = patch.heroProvenance;
  if (patch.heroMonochrome !== undefined) ms.heroMonochrome = patch.heroMonochrome;
  if (Array.isArray(patch.blocks)) {
    ms.blocks = patch.blocks.map((b, idx) => ({ ...b, order: idx + 1 }));
  }
  if (Array.isArray(patch.scientificLimitations)) ms.scientificLimitations = patch.scientificLimitations;
  if (patch.editorialDisclosure !== undefined) ms.editorialDisclosure = patch.editorialDisclosure;
  if (patch.conflictOfInterestDisclosure !== undefined) {
    ms.conflictOfInterestDisclosure = patch.conflictOfInterestDisclosure;
  }
  if (Array.isArray(patch.relatedArticleSlugs)) ms.relatedArticleSlugs = patch.relatedArticleSlugs;
  if (Array.isArray(patch.relatedKewModules)) ms.relatedKewModules = patch.relatedKewModules;
  if (patch.seoTitle !== undefined) ms.seoTitle = patch.seoTitle.trim();
  if (patch.metaDescription !== undefined) ms.metaDescription = patch.metaDescription.trim();
  if (patch.canonicalUrl !== undefined) ms.canonicalUrl = patch.canonicalUrl.trim();
  if (Array.isArray(patch.seoKeywords)) ms.seoKeywords = patch.seoKeywords;

  const metrics = computeManuscriptWordCount(ms.headline, ms.standfirst, ms.blocks);
  ms.wordCount = metrics.wordCount;
  ms.readingTimeMinutes = metrics.readingTimeMinutes;
  ms.updatedAt = nowIso;
  ms.activeEditorSlug = account.slug;
  ms.activeEditorLeaseUntil = new Date(Date.now() + 5 * 60 * 1000).toISOString();

  const saveKind = patch.saveKind || 'manual';
  if (saveKind === 'autosave') {
    ms.autoSavedAt = nowIso;
    // Coalesce frequent autosaves by same author within 3 minutes so revision history stays clean
    const latestRev = ms.revisions[0];
    if (
      latestRev &&
      latestRev.saveKind === 'autosave' &&
      latestRev.actorSlug === account.slug &&
      Date.now() - new Date(latestRev.savedAt).getTime() < 3 * 60 * 1000
    ) {
      latestRev.savedAt = nowIso;
      latestRev.wordCount = ms.wordCount;
      latestRev.headline = ms.headline;
      latestRev.standfirst = ms.standfirst;
      latestRev.blocksSnapshot = JSON.parse(JSON.stringify(ms.blocks));
    } else {
      ms.versionNumber += 1;
      ms.revisions.unshift({
        id: `rev-${Date.now()}`,
        versionNumber: ms.versionNumber,
        savedAt: nowIso,
        saveKind: 'autosave',
        actorSlug: account.slug,
        actorName: account.fullName,
        actorRole: account.primaryRoleTitle,
        summary: 'Automatic draft checkpoint saved.',
        workflowStatus: ms.workflowStatus,
        wordCount: ms.wordCount,
        headline: ms.headline,
        standfirst: ms.standfirst,
        blocksSnapshot: JSON.parse(JSON.stringify(ms.blocks)),
      });
    }
  } else {
    ms.versionNumber += 1;
    ms.revisions.unshift({
      id: `rev-${Date.now()}`,
      versionNumber: ms.versionNumber,
      savedAt: nowIso,
      saveKind: 'manual',
      actorSlug: account.slug,
      actorName: account.fullName,
      actorRole: account.primaryRoleTitle,
      summary: patch.revisionSummary?.trim() || 'Saved manuscript changes in Editorial CMS.',
      workflowStatus: ms.workflowStatus,
      wordCount: ms.wordCount,
      headline: ms.headline,
      standfirst: ms.standfirst,
      blocksSnapshot: JSON.parse(JSON.stringify(ms.blocks)),
    });
    recordHdnAudit(store, account, {
      category: 'manuscript_cms',
      action: 'save_manuscript',
      targetId: ms.id,
      targetLabel: ms.headline,
      details: `Saved version v${ms.versionNumber} (${ms.wordCount} words).`,
    });
  }

  ms.revisions = ms.revisions.slice(0, 50);
  syncHdnManuscriptBackToAnieIfLinked(ms, account.fullName);
  writeHdnStore(store);

  return { ok: true, manuscript: ms };
}

export function restoreHdnManuscriptRevision(
  account: HdnAccountRecord,
  manuscriptId: string,
  revisionId: string
): { ok: true; manuscript: HdnArticleManuscript } | { ok: false; error: string } {
  const store = readHdnStore();
  const ms = ensureMaterializedManuscript(store, manuscriptId);
  if (!ms) return { ok: false, error: 'Manuscript not found.' };
  if (!canEditManuscript(account, ms)) {
    return { ok: false, error: 'Not authorized to restore revisions on this manuscript.' };
  }

  const targetRev = ms.revisions.find((r) => r.id === revisionId);
  if (!targetRev) return { ok: false, error: 'Revision snapshot not found.' };

  const nowIso = new Date().toISOString();
  ms.headline = targetRev.headline;
  ms.standfirst = targetRev.standfirst;
  ms.blocks = JSON.parse(JSON.stringify(targetRev.blocksSnapshot));
  const metrics = computeManuscriptWordCount(ms.headline, ms.standfirst, ms.blocks);
  ms.wordCount = metrics.wordCount;
  ms.readingTimeMinutes = metrics.readingTimeMinutes;
  ms.versionNumber += 1;
  ms.updatedAt = nowIso;

  ms.revisions.unshift({
    id: `rev-restore-${Date.now()}`,
    versionNumber: ms.versionNumber,
    savedAt: nowIso,
    saveKind: 'restored',
    actorSlug: account.slug,
    actorName: account.fullName,
    actorRole: account.primaryRoleTitle,
    summary: `Restored manuscript from revision v${targetRev.versionNumber} (${targetRev.savedAt.slice(0, 16)}).`,
    workflowStatus: ms.workflowStatus,
    wordCount: ms.wordCount,
    headline: ms.headline,
    standfirst: ms.standfirst,
    blocksSnapshot: JSON.parse(JSON.stringify(ms.blocks)),
  });

  recordHdnAudit(store, account, {
    category: 'manuscript_cms',
    action: 'restore_revision',
    targetId: ms.id,
    targetLabel: ms.headline,
    details: `Restored revision v${targetRev.versionNumber} as new v${ms.versionNumber}.`,
  });
  syncHdnManuscriptBackToAnieIfLinked(ms, account.fullName);
  writeHdnStore(store);

  return { ok: true, manuscript: ms };
}

export function transitionHdnManuscriptWorkflow(
  account: HdnAccountRecord,
  manuscriptId: string,
  actionPayload: {
    targetStatus?: HdnWorkflowStatus;
    signOffGate?:
      | 'complete_fact_check'
      | 'complete_scientific_review'
      | 'complete_legal_review'
      | 'complete_copy_edit'
      | 'complete_visual_production'
      | 'unpublish'
      | 'restore_from_trash';
    scheduledPublicationAt?: string;
    note?: string;
  }
): { ok: true; manuscript: HdnArticleManuscript } | { ok: false; status?: number; error: string } {
  const store = readHdnStore();
  const ms = ensureMaterializedManuscript(store, manuscriptId);
  if (!ms) return { ok: false, status: 404, error: 'Manuscript not found.' };

  const nowIso = new Date().toISOString();

  // Handle specialist gate sign-offs with Separation of Duties enforcement!
  if (actionPayload.signOffGate) {
    const gate = actionPayload.signOffGate;
    const isSelfAuthor = ms.primaryAuthorSlug === account.slug;
    const isFounderOverride = account.roles.includes('founding_eic') || account.roles.includes('system_administrator');

    if (gate === 'complete_fact_check') {
      if (!hasPermission(account, 'workflow:fact_check')) {
        return { ok: false, status: 403, error: 'Fact-Checker or Managing Editor authority required.' };
      }
      if (isSelfAuthor && ms.riskLevel === 'RED' && !isFounderOverride) {
        return {
          ok: false,
          status: 403,
          error: 'Separation of Duties: Author of a RED-classified investigation cannot self-certify Stage 07 Fact-Checking.',
        };
      }
      ms.factCheckCompleted = true;
      ms.factCheckedBy = account.fullName;
      ms.factCheckedAt = nowIso;
    } else if (gate === 'complete_scientific_review') {
      if (!hasPermission(account, 'workflow:scientific_review')) {
        return { ok: false, status: 403, error: 'Scientific Reviewer authority required.' };
      }
      if (isSelfAuthor && !isFounderOverride) {
        return {
          ok: false,
          status: 403,
          error: 'Separation of Duties: Manuscript author cannot complete independent Scientific Review on their own work.',
        };
      }
      ms.scientificReviewCompleted = true;
      ms.scientificReviewedBy = account.fullName;
      ms.scientificReviewedAt = nowIso;
    } else if (gate === 'complete_legal_review') {
      if (!hasPermission(account, 'workflow:legal_review')) {
        return { ok: false, status: 403, error: 'Legal Reviewer or Founding Editor-in-Chief authority required.' };
      }
      ms.legalReviewCompleted = true;
      ms.legalReviewedBy = account.fullName;
      ms.legalReviewedAt = nowIso;
    } else if (gate === 'complete_copy_edit') {
      if (!hasPermission(account, 'workflow:copy_edit')) {
        return { ok: false, status: 403, error: 'Copy Editor authority required.' };
      }
      ms.copyEditCompleted = true;
      ms.copyEditedBy = account.fullName;
    } else if (gate === 'complete_visual_production') {
      if (!hasPermission(account, 'workflow:visual_production')) {
        return { ok: false, status: 403, error: 'Visual Editor authority required.' };
      }
      ms.visualProductionCompleted = true;
      ms.visualApprovedBy = account.fullName;
    } else if (gate === 'unpublish') {
      if (!hasPermission(account, 'publication:unpublish')) {
        return { ok: false, status: 403, error: 'Unauthorized: Unpublishing requires Administrator or Executive Editor authority.' };
      }
      ms.workflowStatus = 'editorial_review';
      ms.lifecycleStage = '06';
      ms.unpublishedAt = nowIso;
    } else if (gate === 'restore_from_trash') {
      if (!hasPermission(account, 'manuscript:restore_trash') && ms.primaryAuthorSlug !== account.slug) {
        return { ok: false, status: 403, error: 'Not authorized to restore this item from Trash.' };
      }
      ms.workflowStatus = ms.previousStatusBeforeTrash || 'drafting';
      ms.lifecycleStage = mapStatusToLifecycleStage(ms.workflowStatus);
      ms.trashedAt = undefined;
    }
  }

  // Handle workflow board status transition
  if (actionPayload.targetStatus) {
    const target = actionPayload.targetStatus;
    const validation = validateWorkflowTransition(account, ms, target);
    if (!validation.allowed) {
      return { ok: false, status: 403, error: validation.error || 'Transition denied.' };
    }

    if (target === 'trashed') {
      ms.previousStatusBeforeTrash = ms.workflowStatus;
      ms.trashedAt = nowIso;
    }
    if (target === 'scheduled') {
      if (!actionPayload.scheduledPublicationAt) {
        return { ok: false, status: 400, error: 'Scheduled publication date/time is required.' };
      }
      ms.scheduledPublicationAt = new Date(actionPayload.scheduledPublicationAt).toISOString();
    }
    if (target === 'approved') {
      ms.finalApprovedBy = account.fullName;
      ms.finalApprovedAt = nowIso;
    }
    if (target === 'published') {
      ms.finalApprovedBy = ms.finalApprovedBy || account.fullName;
      ms.finalApprovedAt = ms.finalApprovedAt || nowIso;
      ms.publishedAt = ms.publishedAt || nowIso;
      ms.scheduledPublicationAt = undefined;
    }

    ms.workflowStatus = target;
    ms.lifecycleStage = mapStatusToLifecycleStage(target);

    // Notify author on revision request, approval, or publication
    if (target === 'revision_requested' || target === 'published' || target === 'approved') {
      pushHdnNotification(store, {
        recipientSlug: ms.primaryAuthorSlug,
        category: target === 'revision_requested' ? 'revision_request' : 'publication',
        title:
          target === 'revision_requested'
            ? `Revision Requested: ${ms.headline}`
            : target === 'published'
              ? `Published Live: ${ms.headline}`
              : `Approved for Release: ${ms.headline}`,
        body: actionPayload.note || `Updated by ${account.fullName} (${account.primaryRoleTitle}).`,
        href: `/newsroom/stories/${ms.id}/edit`,
      });
    }
  }

  ms.updatedAt = nowIso;
  ms.versionNumber += 1;
  ms.revisions.unshift({
    id: `rev-wf-${Date.now()}`,
    versionNumber: ms.versionNumber,
    savedAt: nowIso,
    saveKind: 'workflow_transition',
    actorSlug: account.slug,
    actorName: account.fullName,
    actorRole: account.primaryRoleTitle,
    summary:
      actionPayload.note ||
      `Workflow updated: ${actionPayload.signOffGate || actionPayload.targetStatus || ms.workflowStatus}.`,
    workflowStatus: ms.workflowStatus,
    wordCount: ms.wordCount,
    headline: ms.headline,
    standfirst: ms.standfirst,
    blocksSnapshot: JSON.parse(JSON.stringify(ms.blocks)),
  });

  if (actionPayload.note?.trim()) {
    ms.comments.unshift({
      id: `cmt-${Date.now()}`,
      authorSlug: account.slug,
      authorName: account.fullName,
      authorRoleTitle: account.primaryRoleTitle,
      kind:
        actionPayload.targetStatus === 'revision_requested'
          ? 'revision_request'
          : 'editorial_comment',
      message: actionPayload.note.trim(),
      resolved: false,
      createdAt: nowIso,
    });
  }

  recordHdnAudit(store, account, {
    category: ms.workflowStatus === 'published' ? 'publication' : 'workflow_gate',
    action: actionPayload.signOffGate || `status_${ms.workflowStatus}`,
    targetId: ms.id,
    targetLabel: ms.headline,
    details: actionPayload.note || `Manuscript now in status "${ms.workflowStatus}" (Stage ${ms.lifecycleStage}).`,
  });

  syncHdnManuscriptBackToAnieIfLinked(ms, account.fullName);
  writeHdnStore(store);

  return { ok: true, manuscript: ms };
}

export function addHdnManuscriptComment(
  account: HdnAccountRecord,
  manuscriptId: string,
  input: {
    blockId?: string;
    kind: HdnEditorialComment['kind'];
    message: string;
    resolveCommentId?: string;
  }
): { ok: true; manuscript: HdnArticleManuscript } | { ok: false; error: string } {
  const store = readHdnStore();
  const ms = ensureMaterializedManuscript(store, manuscriptId);
  if (!ms) return { ok: false, error: 'Manuscript not found.' };
  if (!canAccessManuscript(account, ms)) return { ok: false, error: 'Access denied.' };

  if (input.resolveCommentId) {
    const cmt = ms.comments.find((c) => c.id === input.resolveCommentId);
    if (cmt) {
      cmt.resolved = true;
      cmt.resolvedBy = account.fullName;
    }
  }

  if (input.message.trim()) {
    ms.comments.unshift({
      id: `cmt-${Date.now()}`,
      blockId: input.blockId,
      authorSlug: account.slug,
      authorName: account.fullName,
      authorRoleTitle: account.primaryRoleTitle,
      kind: input.kind,
      message: input.message.trim(),
      resolved: false,
      createdAt: new Date().toISOString(),
    });
  }

  writeHdnStore(store);
  return { ok: true, manuscript: ms };
}

export function promoteDailyManuscriptToMonthlyFeature(
  account: HdnAccountRecord,
  sourceId: string,
  targetEditionSlug = 'issue-02-a-world-in-transition'
): { ok: true; featureManuscript: HdnArticleManuscript } | { ok: false; error: string } {
  if (!hasPermission(account, 'edition:manage') && !hasPermission(account, 'manuscript:edit_any')) {
    return { ok: false, error: 'Authorized editor required to promote Daily Dispatch to Monthly Edition.' };
  }
  const store = readHdnStore();
  const source = getUnifiedManuscriptByIdOrSlug(sourceId);
  if (!source) return { ok: false, error: 'Source manuscript not found.' };

  const nowIso = new Date().toISOString();
  const clonedBlocks: HdnContentBlock[] = JSON.parse(JSON.stringify(source.blocks));
  clonedBlocks.push({
    id: `blk-exp-${Date.now()}`,
    type: 'rich_text',
    order: clonedBlocks.length + 1,
    chapterRoman: 'IV',
    heading: 'Expanded Longform Watershed & Policy Analysis',
    bodyText:
      'Expanded Monthly Edition section: integrate deeper multi-seasonal context, documentary plates, and scientific review synthesis while preserving the original Daily Dispatch record.',
  });

  const newSlug = `${source.slug}-edition-feature`;
  const metrics = computeManuscriptWordCount(source.headline, source.standfirst, clonedBlocks);

  const feature: HdnArticleManuscript = {
    ...JSON.parse(JSON.stringify(source)),
    id: `hdn-ms-promo-${Date.now().toString(36)}`,
    slug: newSlug,
    originType: 'human_manuscript',
    linkedAnieDraftId: undefined,
    promotedFromDailyId: source.id,
    publicationStream: 'monthly_edition',
    targetEditionSlug,
    editionLabel: 'ISSUE 02 · A WORLD IN TRANSITION',
    articleFormat: 'Longform Feature',
    lifecycleStage: '04',
    workflowStatus: 'drafting',
    reviewTrack: 'scientific_technical',
    scientificReviewRequired: true,
    scientificReviewCompleted: false,
    publishedAt: undefined,
    blocks: clonedBlocks,
    wordCount: metrics.wordCount,
    readingTimeMinutes: metrics.readingTimeMinutes,
    canonicalUrl: `/himalayan-dispatch/issues/${targetEditionSlug}/${newSlug}`,
    versionNumber: 1,
    createdAt: nowIso,
    updatedAt: nowIso,
    revisions: [
      {
        id: `rev-promo-${Date.now()}`,
        versionNumber: 1,
        savedAt: nowIso,
        saveKind: 'manual',
        actorSlug: account.slug,
        actorName: account.fullName,
        actorRole: account.primaryRoleTitle,
        summary: `Promoted from Daily Dispatch "${source.headline}" into independent Monthly Edition feature without overwriting original dispatch.`,
        workflowStatus: 'drafting',
        wordCount: metrics.wordCount,
        headline: source.headline,
        standfirst: source.standfirst,
        blocksSnapshot: clonedBlocks,
      },
    ],
    corrections: [],
  };

  store.manuscripts.unshift(feature);
  recordHdnAudit(store, account, {
    category: 'edition_builder',
    action: 'promote_daily_to_monthly',
    targetId: feature.id,
    targetLabel: feature.headline,
    details: `Created linked Monthly Edition feature (${targetEditionSlug}) from ${source.id}.`,
  });
  writeHdnStore(store);

  return { ok: true, featureManuscript: feature };
}

// ─── SCIENTIFIC REVIEW WORKSPACE (STRICT CONFIDENTIAL SOURCE REDACTION!) ─────

export function getSanitizedManuscriptForScientificReviewer(
  manuscriptId: string
): {
  manuscript: Partial<HdnArticleManuscript>;
  confidentialSourcesRedacted: true;
} | null {
  const ms = getUnifiedManuscriptByIdOrSlug(manuscriptId);
  if (!ms) return null;

  // Strip any confidential source notes, active editor info, or private reporter comments!
  const safeBlocks = ms.blocks.map((b) => ({
    ...b,
    verifiedSourceId: undefined,
  }));

  return {
    confidentialSourcesRedacted: true,
    manuscript: {
      id: ms.id,
      slug: ms.slug,
      headline: ms.headline,
      standfirst: ms.standfirst,
      dateline: ms.dateline,
      departmentId: ms.departmentId,
      bureauId: ms.bureauId,
      reportingBeatLabel: ms.reportingBeatLabel,
      articleFormat: ms.articleFormat,
      workflowStatus: ms.workflowStatus,
      blocks: safeBlocks,
      scientificLimitations: ms.scientificLimitations,
      editorialDisclosure: ms.editorialDisclosure,
      relatedKewModules: ms.relatedKewModules,
      wordCount: ms.wordCount,
      readingTimeMinutes: ms.readingTimeMinutes,
    },
  };
}

export function submitOrUpdateScientificReview(
  account: HdnAccountRecord,
  input: {
    reviewId?: string;
    manuscriptId: string;
    assignedReviewerSlug?: string;
    claimAssessments?: HdnScientificReviewRecord['claimAssessments'];
    supportingReferences?: string[];
    methodologicalComments?: string;
    statisticalVerificationStatus?: HdnScientificReviewRecord['statisticalVerificationStatus'];
    statisticalNotes?: string;
    geospatialVerificationStatus?: HdnScientificReviewRecord['geospatialVerificationStatus'];
    geospatialNotes?: string;
    uncertaintyAssessment?: string;
    conflictOfInterestDeclared?: boolean;
    conflictOfInterestDetails?: string;
    recommendation?: HdnScientificReviewRecord['recommendation'];
    completeReview?: boolean;
  }
): { ok: true; review: HdnScientificReviewRecord } | { ok: false; error: string } {
  const store = readHdnStore();
  const ms = ensureMaterializedManuscript(store, input.manuscriptId);
  if (!ms) return { ok: false, error: 'Manuscript not found.' };

  const nowIso = new Date().toISOString();

  // Editor assigning a scientific reviewer
  if (input.assignedReviewerSlug && !input.completeReview && !input.methodologicalComments) {
    if (!hasPermission(account, 'manuscript:edit_assigned_desk') && !hasPermission(account, 'manuscript:edit_any')) {
      return { ok: false, error: 'Editorial authority required to assign a scientific reviewer.' };
    }
    const revAcc = store.accounts.find((a) => a.slug === input.assignedReviewerSlug);
    if (!revAcc) return { ok: false, error: 'Reviewer account not found.' };

    const created: HdnScientificReviewRecord = {
      id: `hdn-sr-${Date.now().toString(36)}`,
      manuscriptId: ms.id,
      manuscriptTitle: ms.headline,
      assignedReviewerSlug: revAcc.slug,
      assignedReviewerName: revAcc.fullName,
      assignedBy: account.fullName,
      assignedAt: nowIso,
      status: 'assigned',
      claimAssessments: [],
      supportingReferences: [],
      methodologicalComments: '',
      statisticalVerificationStatus: 'not_applicable',
      statisticalNotes: '',
      geospatialVerificationStatus: 'not_applicable',
      geospatialNotes: '',
      uncertaintyAssessment: '',
      conflictOfInterestDeclared: false,
      conflictOfInterestDetails: '',
    };
    ms.scientificReviewRequired = true;
    ms.workflowStatus = 'scientific_review';
    ms.lifecycleStage = '08';
    store.scientificReviews.unshift(created);
    pushHdnNotification(store, {
      recipientSlug: revAcc.slug,
      category: 'scientific_review',
      title: `Scientific Review Assigned: ${ms.headline}`,
      body: `Assigned by ${account.fullName} for technical & empirical verification.`,
      href: `/newsroom/review/${created.id}`,
    });
    recordHdnAudit(store, account, {
      category: 'scientific_review',
      action: 'assign_scientific_reviewer',
      targetId: ms.id,
      targetLabel: ms.headline,
      details: `Assigned ${revAcc.fullName} to conduct Stage 08 Scientific Review.`,
    });
    syncHdnManuscriptBackToAnieIfLinked(ms, account.fullName);
    writeHdnStore(store);
    return { ok: true, review: created };
  }

  // Reviewer submitting assessment
  if (!hasPermission(account, 'workflow:scientific_review')) {
    return { ok: false, error: 'Verified Scientific Reviewer credentials required.' };
  }

  const isFounderOverride = account.roles.includes('founding_eic') || account.roles.includes('system_administrator');
  if (ms.primaryAuthorSlug === account.slug && !isFounderOverride) {
    return {
      ok: false,
      error: 'Separation of Duties: Manuscript author cannot submit independent Scientific Review on own manuscript.',
    };
  }

  let rec = store.scientificReviews.find(
    (r) =>
      (input.reviewId && r.id === input.reviewId) ||
      (r.manuscriptId === ms.id && r.assignedReviewerSlug === account.slug)
  );

  if (!rec) {
    rec = {
      id: `hdn-sr-${Date.now().toString(36)}`,
      manuscriptId: ms.id,
      manuscriptTitle: ms.headline,
      assignedReviewerSlug: account.slug,
      assignedReviewerName: account.fullName,
      assignedBy: account.fullName,
      assignedAt: nowIso,
      status: 'in_progress',
      claimAssessments: [],
      supportingReferences: [],
      methodologicalComments: '',
      statisticalVerificationStatus: 'not_applicable',
      statisticalNotes: '',
      geospatialVerificationStatus: 'not_applicable',
      geospatialNotes: '',
      uncertaintyAssessment: '',
      conflictOfInterestDeclared: false,
      conflictOfInterestDetails: '',
    };
    store.scientificReviews.unshift(rec);
  }

  if (input.claimAssessments !== undefined) rec.claimAssessments = input.claimAssessments;
  if (input.supportingReferences !== undefined) rec.supportingReferences = input.supportingReferences;
  if (input.methodologicalComments !== undefined) {
    rec.methodologicalComments = input.methodologicalComments;
  }
  if (input.statisticalVerificationStatus !== undefined) {
    rec.statisticalVerificationStatus = input.statisticalVerificationStatus;
  }
  if (input.statisticalNotes !== undefined) rec.statisticalNotes = input.statisticalNotes;
  if (input.geospatialVerificationStatus !== undefined) {
    rec.geospatialVerificationStatus = input.geospatialVerificationStatus;
  }
  if (input.geospatialNotes !== undefined) rec.geospatialNotes = input.geospatialNotes;
  if (input.uncertaintyAssessment !== undefined) {
    rec.uncertaintyAssessment = input.uncertaintyAssessment;
  }
  if (input.conflictOfInterestDeclared !== undefined) {
    rec.conflictOfInterestDeclared = input.conflictOfInterestDeclared;
  }
  if (input.conflictOfInterestDetails !== undefined) {
    rec.conflictOfInterestDetails = input.conflictOfInterestDetails;
  }
  if (input.recommendation !== undefined) rec.recommendation = input.recommendation;

  if (input.completeReview) {
    rec.status = 'completed';
    rec.completedAt = nowIso;
    if (rec.recommendation === 'approve') {
      ms.scientificReviewCompleted = true;
      ms.scientificReviewedBy = account.fullName;
      ms.scientificReviewedAt = nowIso;
      if (ms.workflowStatus === 'scientific_review') {
        ms.workflowStatus = 'ready_for_approval';
        ms.lifecycleStage = '12';
      }
    } else if (rec.recommendation === 'minor_revisions' || rec.recommendation === 'major_revisions') {
      ms.workflowStatus = 'revision_requested';
      ms.lifecycleStage = '06';
      ms.comments.unshift({
        id: `cmt-sr-${Date.now()}`,
        authorSlug: account.slug,
        authorName: account.fullName,
        authorRoleTitle: 'Scientific Reviewer',
        kind: 'revision_request',
        message: `Scientific Review (${rec.recommendation.replace('_', ' ')}): ${rec.methodologicalComments}`,
        resolved: false,
        createdAt: nowIso,
      });
    }
    recordHdnAudit(store, account, {
      category: 'scientific_review',
      action: 'complete_scientific_review',
      targetId: ms.id,
      targetLabel: ms.headline,
      details: `Completed Scientific Review with recommendation: ${rec.recommendation || 'recorded'}.`,
    });
    syncHdnManuscriptBackToAnieIfLinked(ms, account.fullName);
  } else {
    rec.status = 'in_progress';
  }

  writeHdnStore(store);
  return { ok: true, review: rec };
}

// ─── CONFIDENTIAL SOURCE VAULT (STRICT ACCESS + AUDIT TRAIL) ─────────────────

export function getAccessibleConfidentialSources(
  account: HdnAccountRecord,
  includeRestrictedNotes = false
): Array<Omit<HdnConfidentialSourceRecord, 'restrictedNotes'> & { restrictedNotes?: string }> {
  // Scientific reviewers NEVER receive confidential journalistic source records!
  if (
    account.roles.includes('scientific_reviewer') &&
    !isExecutiveOrAdmin(account) &&
    !account.roles.includes('journalist')
  ) {
    return [];
  }

  const store = readHdnStore();
  let mutatedAudit = false;

  const accessible = store.confidentialSources.filter((src) => {
    if (isExecutiveOrAdmin(account) || account.roles.includes('managing_editor')) return true;
    if (src.ownerJournalistSlug === account.slug) return true;
    if (src.authorizedViewerSlugs.includes(account.slug)) return true;
    return false;
  });

  const mapped = accessible.map((src) => {
    const canSeeRestricted =
      includeRestrictedNotes &&
      (src.ownerJournalistSlug === account.slug ||
        src.authorizedViewerSlugs.includes(account.slug) ||
        hasPermission(account, 'sources:view_confidential_vault'));

    if (canSeeRestricted && src.confidentialityLevel === 'strict_confidential') {
      src.accessAuditTrail.unshift({
        timestamp: new Date().toISOString(),
        actorSlug: account.slug,
        actorRole: account.primaryRoleTitle,
        action: 'viewed_restricted',
      });
      src.accessAuditTrail = src.accessAuditTrail.slice(0, 40);
      mutatedAudit = true;
    }

    return {
      ...src,
      restrictedNotes: canSeeRestricted
        ? src.restrictedNotes
        : '[RESTRICTED SOURCE VAULT — AUTHORIZED VIEW ACCESS REQUIRED]',
    };
  });

  if (mutatedAudit) {
    writeHdnStore(store);
  }

  return mapped;
}

export function createOrUpdateConfidentialSource(
  account: HdnAccountRecord,
  input: {
    id?: string;
    codeName: string;
    bureauId: BureauSlugId;
    linkedAssignmentId?: string;
    linkedManuscriptId?: string;
    confidentialityLevel: HdnConfidentialSourceRecord['confidentialityLevel'];
    publicDescription: string;
    restrictedNotes: string;
    consentRecorded: boolean;
    consentScopeNote: string;
    retentionPolicy: HdnConfidentialSourceRecord['retentionPolicy'];
    newInterview?: {
      interviewDate: string;
      mode: HdnConfidentialSourceRecord['interviewRecords'][0]['mode'];
      permissionStatus: HdnConfidentialSourceRecord['interviewRecords'][0]['permissionStatus'];
      summaryNotes: string;
    };
  }
): { ok: true; source: HdnConfidentialSourceRecord } | { ok: false; error: string } {
  if (!hasPermission(account, 'sources:manage_own') && !isExecutiveOrAdmin(account)) {
    return { ok: false, error: 'Not authorized to manage journalistic source records.' };
  }

  const store = readHdnStore();
  const nowIso = new Date().toISOString();

  if (input.id) {
    const existing = store.confidentialSources.find((s) => s.id === input.id);
    if (!existing) return { ok: false, error: 'Source record not found.' };
    if (existing.ownerJournalistSlug !== account.slug && !isExecutiveOrAdmin(account)) {
      return { ok: false, error: 'Only the source custodian or Founding EIC may modify this record.' };
    }
    existing.publicDescription = input.publicDescription.trim();
    existing.restrictedNotes = input.restrictedNotes.trim();
    existing.confidentialityLevel = input.confidentialityLevel;
    existing.consentRecorded = input.consentRecorded;
    existing.consentScopeNote = input.consentScopeNote.trim();
    existing.retentionPolicy = input.retentionPolicy;
    existing.updatedAt = nowIso;
    if (input.newInterview) {
      existing.interviewRecords.unshift({
        id: `int-${Date.now()}`,
        ...input.newInterview,
      });
    }
    existing.accessAuditTrail.unshift({
      timestamp: nowIso,
      actorSlug: account.slug,
      actorRole: account.primaryRoleTitle,
      action: input.newInterview ? 'interview_logged' : 'updated',
    });
    recordHdnAudit(store, account, {
      category: 'confidential_source_access',
      action: 'update_source_record',
      targetId: existing.id,
      targetLabel: existing.codeName,
      details: `Updated source record (${existing.confidentialityLevel}).`,
    });
    writeHdnStore(store);
    return { ok: true, source: existing };
  }

  const created: HdnConfidentialSourceRecord = {
    id: `hdn-src-${Date.now().toString(36)}`,
    codeName: input.codeName.trim().toUpperCase(),
    ownerJournalistSlug: account.slug,
    ownerJournalistName: account.fullName,
    bureauId: input.bureauId,
    linkedAssignmentId: input.linkedAssignmentId,
    linkedManuscriptId: input.linkedManuscriptId,
    confidentialityLevel: input.confidentialityLevel,
    publicDescription: input.publicDescription.trim(),
    restrictedNotes: (() => {
      const plain = input.restrictedNotes.trim();
      if (!plain) return '';
      const key = crypto
        .createHash('sha256')
        .update(process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || 'kew-dev-ephemeral-vault')
        .digest();
      const iv = crypto.randomBytes(12);
      const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
      const enc = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()]);
      const tag = cipher.getAuthTag();
      return `enc:aes256gcm:v1:${iv.toString('base64')}:${tag.toString('base64')}:${enc.toString('base64')}`;
    })(),
    consentRecorded: Boolean(input.consentRecorded),
    consentScopeNote: input.consentScopeNote.trim(),
    retentionPolicy: input.retentionPolicy || 'retain_encrypted_archive',
    interviewRecords: input.newInterview
      ? [{ id: `int-${Date.now()}`, ...input.newInterview }]
      : [],
    authorizedViewerSlugs: [account.slug, 'dr-fayaz-ahmad-khan', 'investigations-urban-water-desk'],
    accessAuditTrail: [
      {
        timestamp: nowIso,
        actorSlug: account.slug,
        actorRole: account.primaryRoleTitle,
        action: 'created',
      },
    ],
    createdAt: nowIso,
    updatedAt: nowIso,
  };

  store.confidentialSources.unshift(created);
  recordHdnAudit(store, account, {
    category: 'confidential_source_access',
    action: 'register_source',
    targetId: created.id,
    targetLabel: created.codeName,
    details: `Registered ${created.confidentialityLevel} source record (${created.bureauId}).`,
  });
  writeHdnStore(store);
  return { ok: true, source: created };
}

// ─── PUBLIC PUBLICATION PROJECTION BRIDGE (SYNCED TO ALL PUBLIC PAGES & RSS) ─

/**
 * Projects published HDN Monthly Edition manuscripts into canonical `MagazineStory[]`
 * so public edition pages, department pages, bureau pages, portfolios, RSS, and sitemaps
 * reflect HDN publication/unpublication/corrections instantaneously!
 */
export function getHdnPublishedMagazineStories(): MagazineStory[] {
  const store = readHdnStore();
  return store.manuscripts
    .filter(
      (m) =>
        m.workflowStatus === 'published' &&
        m.publicationStream === 'monthly_edition' &&
        m.originType !== 'canonical_magazine_story'
    )
    .map((m) => {
      const dept =
        EDITORIAL_DEPARTMENTS.find((d) => d.id === m.departmentId) || EDITORIAL_DEPARTMENTS[2];
      const bureauObj = REGIONAL_REPORTING_BUREAUS.find((b) => b.id === m.bureauId);
      const chartBlock = m.blocks.find((b) => b.type === 'interactive_chart');
      const galleryBlock = m.blocks.find((b) => b.type === 'photo_gallery');
      const interviewBlock = m.blocks.find((b) => b.type === 'interview_transcript');

      return {
        id: m.id,
        slug: m.slug,
        editionSlug: m.targetEditionSlug || 'issue-02-a-world-in-transition',
        editionLabel: m.editionLabel || 'HIMALAYAN DISPATCH EDITION',
        departmentId: m.departmentId,
        departmentRubric: dept.shortLabel.toUpperCase(),
        folioCode: `FOLIO ${dept.folioNumber}`,
        title: m.headline,
        subtitle: m.standfirst || m.subtitle,
        excerpt: m.subtitle || m.standfirst || m.headline,
        dateline: m.dateline,
        region: bureauObj?.name || 'Western Himalayas',
        readingTimeMinutes: m.readingTimeMinutes,
        wordCount: m.wordCount,
        publishedAt: (m.publishedAt || m.updatedAt).slice(0, 10),
        updatedAt: m.updatedAt.slice(0, 10),
        heroImage: m.heroImage,
        heroCaption: m.heroCaption,
        heroCredit: `${m.heroCredit} (${m.heroLicense})`,
        heroMonochrome: m.heroMonochrome,
        journalistSlug: m.primaryAuthorSlug,
        bylineDisplay: m.bylineDisplay,
        bylineRole: m.bylineRole,
        photographyByline: m.photographyByline,
        factCheckedBy: m.factCheckedBy || 'Himalayan Dispatch Verification Desk',
        scientificReviewer: m.scientificReviewCompleted && m.scientificReviewedBy
          ? m.scientificReviewedBy
          : 'Methodological Scope Verified · Editorial Desk',
        workflowStage: 'publication',
        isPublished: true,
        isFeaturedCoverStory: m.isFeatured && m.departmentId === 'cover-stories',
        isBigRead: m.departmentId === 'longform-features',
        isVisualJournal: m.departmentId === 'photo-essays',
        chapters: blocksToChapters(m.blocks),
        photoPlates: galleryBlock?.galleryPlates,
        dataVisualization:
          chartBlock && chartBlock.chartPoints
            ? {
                id: chartBlock.id,
                kicker: 'EDITORIAL DATA PROFILE',
                title: chartBlock.heading || 'Quantitative Series',
                subtitle: chartBlock.subheading || '',
                unit: chartBlock.chartUnit || '',
                chartStyle: chartBlock.chartStyle || 'snowline_horizon',
                keyFindingStat: chartBlock.keyFindingStat || '',
                keyFindingNarrative: chartBlock.keyFindingNarrative || '',
                methodologyNote: chartBlock.mapMethodologyNote || 'Verified KEW series.',
                sourceCitation: chartBlock.corroborationNote || 'Kashmir EcoWatch Observatory',
                points: chartBlock.chartPoints,
              }
            : undefined,
        interviewExchanges: interviewBlock?.interviewExchanges,
        interviewSubjectBio: interviewBlock?.interviewSubjectBio,
        corrections: m.corrections,
        relatedKewModule: m.relatedKewModules[0],
        seoTitle: m.seoTitle,
        seoKeywords: m.seoKeywords,
        reportingBeatSlug: m.reportingBeatSlug,
        reportingBeatLabel: m.reportingBeatLabel,
        editorialVerificationNote: m.editorialDisclosure,
      };
    });
}

/**
 * Projects published HDN Daily Dispatch manuscripts into `DailyDispatchArticle[]`
 */
export function getHdnPublishedDailyDispatches(): DailyDispatchArticle[] {
  const store = readHdnStore();
  return store.manuscripts
    .filter((m) => m.workflowStatus === 'published' && m.publicationStream === 'daily_dispatch')
    .map((m) => {
      const bureauObj =
        REGIONAL_REPORTING_BUREAUS.find((b) => b.id === m.bureauId) ||
        REGIONAL_REPORTING_BUREAUS[0];
      const dept =
        EDITORIAL_DEPARTMENTS.find((d) => d.id === m.departmentId) || EDITORIAL_DEPARTMENTS[2];
      const beat =
        REPORTING_BEATS_FULL.find((b) => b.slug === m.reportingBeatSlug) ||
        REPORTING_BEATS_FULL[0];
      const chaps = blocksToChapters(m.blocks);

      return {
        id: m.id,
        slug: m.slug,
        headline: m.headline,
        standfirst: m.standfirst || m.subtitle,
        dateline: m.dateline,
        bureauId: m.bureauId,
        bureauLabel:
          bureauObj.operationalStatus === 'in_establishment'
            ? `${bureauObj.name} (In Establishment)`
            : bureauObj.name,
        beatSlug: beat.slug,
        beatTitle: beat.title,
        departmentId: dept.id,
        departmentLabel: dept.name,
        publishedAt: (m.publishedAt || m.updatedAt).slice(0, 10),
        updatedAt: m.updatedAt.slice(0, 10),
        readingTimeMinutes: m.readingTimeMinutes,
        bylineDisplay: m.bylineDisplay,
        journalistSlug: m.primaryAuthorSlug,
        factCheckedBy: m.factCheckedBy || 'Himalayan Dispatch Editorial Desk',
        scientificSourceNote: m.editorialDisclosure,
        aiAssistanceDisclosure: m.isAiAssisted ? m.editorialDisclosure : undefined,
        heroImage: m.heroImage,
        heroCaption: m.heroCaption,
        heroCredit: `${m.heroCredit} (${m.heroLicense})`,
        keyFindings: m.scientificLimitations.length > 0
          ? m.scientificLimitations
          : [`Reported under ${beat.title} (${bureauObj.name}).`],
        paragraphs: chaps.flatMap((c) => c.paragraphs).filter(Boolean),
        relatedKewModule: m.relatedKewModules[0]
          ? {
              label: m.relatedKewModules[0].label,
              href: m.relatedKewModules[0].href,
              context: m.relatedKewModules[0].scientificContext,
            }
          : {
              label: beat.kewObservatoryLabel,
              href: beat.kewObservatoryHref,
              context: beat.summary,
            },
        isPublished: true,
        corrections: m.corrections,
      };
    });
}

/**
 * Returns workflow overrides for canonical `MAGAZINE_STORIES` edited in HDN
 * (e.g., if an administrator unpublishes, edits, or appends corrections to a canonical story!).
 */
export function getCanonicalStoryHdnOverrides(): Map<string, HdnArticleManuscript> {
  const store = readHdnStore();
  const map = new Map<string, HdnArticleManuscript>();
  for (const m of store.manuscripts) {
    if (m.originType === 'canonical_magazine_story') {
      map.set(m.slug, m);
    }
  }
  return map;
}

export function getPublicHdnEditionsMerged(): MagazineEdition[] {
  const store = readHdnStore();
  return store.editions.map((ed) => ({
    id: ed.id,
    slug: ed.slug,
    volumeLabel: ed.volumeLabel,
    issueNumberLabel: ed.issueNumberLabel,
    status:
      ed.status === 'current'
        ? 'current'
        : ed.status === 'archived'
          ? 'archived'
          : 'forthcoming',
    title: ed.themeTitle,
    themeKicker: ed.themeKicker,
    subtitle: ed.editionIntroduction,
    publicationDateLabel: ed.publishedIsoDate
      ? `Published ${ed.publishedIsoDate}`
      : ed.scheduledReleaseDate
        ? `Scheduled ${ed.scheduledReleaseDate.slice(0, 10)}`
        : 'Forthcoming Monthly Edition',
    publishedIsoDate: ed.publishedIsoDate,
    coverImage: ed.coverImage,
    coverLocation: ed.coverLocation,
    coverCaption: ed.coverCaption,
    coverCredit: ed.coverCredit,
    editorsNoteTitle: ed.editorsLetter.title,
    editorsNoteBody: ed.editorsLetter.paragraphs,
    editorsNoteAuthor: ed.editorsLetter.approvedByFoundingEic
      ? ed.editorsLetter.authorName
      : 'Himalayan Dispatch Editorial Desk',
    editorsNoteRole: ed.editorsLetter.approvedByFoundingEic
      ? ed.editorsLetter.authorRole
      : 'Working Edition Plan',
    storySlugs: ed.orderedStorySlugs,
  }));
}
