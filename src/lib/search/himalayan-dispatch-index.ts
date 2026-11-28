// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH — DEDICATED EDITORIAL SEARCH INDEX & SCORER
// Indexes published journalism, editorials, special investigations, monographs,
// regional bureau reports, interviews, daily dispatches, and public journalist
// portfolios. Strictly excludes drafts, confidential assignments, and CMS/admin.
// ─────────────────────────────────────────────────────────────────────────────

import {
  EDITORIAL_REPORTING_BEATS,
  JOURNALIST_PROFILES,
  MAGAZINE_EDITIONS,
  MAGAZINE_STORIES,
  REGIONAL_REPORTING_BUREAUS,
} from '@/data/himalayan-dispatch';
import {
  LADAKH_CHAPTERS_45,
  LADAKH_ECOLOGICAL_FRONTIERS_SPEC,
} from '@/data/himalayan-dispatch-ladakh-frontiers-monograph';
import { DAILY_DISPATCH_ARTICLES } from '@/data/himalayan-dispatch-autonomous';
import {
  getPublicDailyDispatches,
  getPublicEditions,
  getPublicJournalists,
  getPublicPublishedStories,
} from '@/lib/himalayan-dispatch-store';
import { formatPublicReadingDuration } from '@/lib/himalayan-dispatch-metrics';
import {
  DEPARTMENT_ROUTE_CONFIG,
  resolveCanonicalStoryUrl,
  toCanonicalIssueSlug,
  toInternalDispatchPath,
  type BureauRouteSlug,
  type DepartmentRouteSlug,
} from '@/lib/himalayan-dispatch-routes';
import type { KewSubregion } from './types';
import type {
  KnowledgePlatformId,
  UnifiedKnowledgeCategory,
} from './federated-knowledge-types';

export type { KnowledgePlatformId, UnifiedKnowledgeCategory };

export interface EditorialSearchDocument {
  id: string;
  platform: 'himalayan_dispatch';
  platformLabel: 'HIMALAYAN DISPATCH';
  institutionalRubric: string; // e.g. "HIMALAYAN DISPATCH · INVESTIGATIVE REPORTING"
  category: UnifiedKnowledgeCategory;
  secondaryCategories: UnifiedKnowledgeCategory[];
  documentKind:
    | 'dispatch_article'
    | 'daily_dispatch'
    | 'monograph'
    | 'issue_edition'
    | 'bureau_desk'
    | 'department_desk'
    | 'journalist_portfolio'
    | 'editorial_observatory'
    | 'governance_charter';
  title: string;
  subtitle?: string;
  description: string;
  canonicalUrl: string; // normalized internal path e.g. /himalayan-dispatch/issues/volume-01-issue-01/...
  authorName?: string;
  authorSlug?: string;
  publishedDate?: string;
  readingDurationLabel?: string; // e.g. "26 MIN READ" (never numerical word count!)
  subregion: KewSubregion;
  geographicLabel?: string;
  tags: string[];
  bodySearchText: string;
}

const globalForDispatchIndex = globalThis as unknown as {
  __hdEditorialCorpus?: EditorialSearchDocument[];
  __hdEditorialBuiltAtMs?: number;
};

const HD_INDEX_TTL_MS = 2 * 60 * 1000;

function inferSubregionFromText(raw: string): KewSubregion {
  const lower = (raw || '').toLowerCase();
  const hits: KewSubregion[] = [];
  if (lower.includes('kashmir') && !lower.includes('azad')) hits.push('Kashmir');
  if (lower.includes('jammu') && !lower.includes('azad')) hits.push('Jammu');
  if (lower.includes('ladakh') || lower.includes('leh') || lower.includes('kargil') || lower.includes('changthang')) {
    hits.push('Ladakh');
  }
  if (lower.includes('azad') || lower.includes('aj&k') || lower.includes('ajk') || lower.includes('muzaffarabad') || lower.includes('neelum')) {
    hits.push('Azad Kashmir');
  }
  if (lower.includes('gilgit') || lower.includes('hunza') || lower.includes('diamer')) {
    hits.push('Gilgit');
  }
  if (lower.includes('baltistan') || lower.includes('skardu') || lower.includes('baltoro') || lower.includes('shigar')) {
    hits.push('Baltistan');
  }
  if (hits.length === 1) return hits[0];
  if (hits.length > 1 || lower.includes('western himalaya') || lower.includes('five region') || lower.includes('transboundary')) {
    return 'Multi-Regional';
  }
  return 'Kashmir';
}

function normalizeCanonicalPath(rawPath: string): string {
  const internal = toInternalDispatchPath(rawPath);
  const clean = internal.split(/[?#]/)[0] || '/himalayan-dispatch';
  return clean.length > 1 && clean.endsWith('/') ? clean.slice(0, -1) : clean;
}

export function getHimalayanDispatchSearchCorpus(
  forceRebuild = false
): EditorialSearchDocument[] {
  const now = Date.now();
  if (
    !forceRebuild &&
    globalForDispatchIndex.__hdEditorialCorpus &&
    globalForDispatchIndex.__hdEditorialBuiltAtMs &&
    now - globalForDispatchIndex.__hdEditorialBuiltAtMs < HD_INDEX_TTL_MS
  ) {
    return globalForDispatchIndex.__hdEditorialCorpus;
  }

  const docs: EditorialSearchDocument[] = [];
  const seenUrls = new Set<string>();

  const addDoc = (doc: EditorialSearchDocument) => {
    const normUrl = normalizeCanonicalPath(doc.canonicalUrl);
    if (seenUrls.has(normUrl)) return;
    seenUrls.add(normUrl);
    docs.push({
      ...doc,
      canonicalUrl: normUrl,
    });
  };

  // 1. Published Magazine Stories (Dispatches, Investigations, Editorials, Interviews, Field & Photo Essays)
  let stories = MAGAZINE_STORIES.filter((s) => s.isPublished);
  try {
    const storeStories = getPublicPublishedStories();
    if (Array.isArray(storeStories) && storeStories.length > 0) {
      stories = storeStories.filter((s) => s.isPublished);
    }
  } catch {
    // Fallback to static published stories
  }

  for (const st of stories) {
    if (!st.isPublished) continue;

    let category: UnifiedKnowledgeCategory = 'investigative_journalism';
    let rubric = 'HIMALAYAN DISPATCH · INVESTIGATIVE REPORTING';

    if (st.departmentId === 'interviews') {
      category = 'interviews';
      rubric = 'HIMALAYAN DISPATCH · INTERVIEW & DIALOGUE';
    } else if (st.departmentId === 'editorials') {
      category = 'editorials_opinions';
      rubric = 'HIMALAYAN DISPATCH · EDITORIAL & OPINION';
    } else if (st.departmentId === 'field-reports') {
      category = 'news_reporting';
      rubric = 'HIMALAYAN DISPATCH · FIELD & DISPATCH REPORTING';
    } else if (st.departmentId === 'data-journalism') {
      category = 'investigative_journalism';
      rubric = 'HIMALAYAN DISPATCH · DATA & GEOSPATIAL JOURNALISM';
    } else if (st.departmentId === 'photo-essays') {
      category = 'news_reporting';
      rubric = 'HIMALAYAN DISPATCH · VISUAL JOURNALISM';
    } else if (st.departmentId === 'cover-stories') {
      category = 'investigative_journalism';
      rubric = 'HIMALAYAN DISPATCH · COVER INVESTIGATION';
    } else if (st.departmentRubric?.toUpperCase().includes('EDITORIAL')) {
      category = 'editorials_opinions';
      rubric = 'HIMALAYAN DISPATCH · SPECIAL EDITORIAL INVESTIGATION';
    }

    const chapterText = (st.chapters || [])
      .map((ch) => {
        const tableTxt = ch.editorialTable
          ? `${ch.editorialTable.kicker || ''} ${ch.editorialTable.caption || ''} ${ch.editorialTable.rows
              .slice(0, 8)
              .map((r) => r.join(' '))
              .join(' ')}`
          : '';
        const quoteTxt = ch.pullQuote?.quote || '';
        const paras = (ch.paragraphs || []).slice(0, 4).join(' ');
        return `${ch.title} ${paras} ${tableTxt} ${quoteTxt}`;
      })
      .join(' ');

    const canonicalUrl = resolveCanonicalStoryUrl(st);
    const subregion = inferSubregionFromText(
      `${st.region || ''} ${st.dateline || ''} ${st.title} ${st.subtitle}`
    );

    addDoc({
      id: `hd:story:${st.slug}`,
      platform: 'himalayan_dispatch',
      platformLabel: 'HIMALAYAN DISPATCH',
      institutionalRubric: rubric,
      category,
      secondaryCategories: ['regional_environmental_issues'],
      documentKind: 'dispatch_article',
      title: st.title,
      subtitle: st.subtitle,
      description: st.excerpt || st.subtitle,
      canonicalUrl,
      authorName: st.bylineDisplay,
      authorSlug: st.journalistSlug,
      publishedDate: st.updatedAt || st.publishedAt,
      readingDurationLabel: formatPublicReadingDuration(st, 'card'),
      subregion,
      geographicLabel: st.dateline,
      tags: [
        st.departmentRubric,
        st.reportingBeatLabel || '',
        st.region || '',
        st.dateline || '',
      ].filter(Boolean),
      bodySearchText: `${st.departmentRubric} ${st.heroCaption || ''} ${chapterText}`,
    });
  }

  // 2. Published Daily Dispatch Articles ( strictly published only )
  let dailyArticles = DAILY_DISPATCH_ARTICLES.filter((d) => d.isPublished);
  try {
    const storeDaily = getPublicDailyDispatches();
    if (Array.isArray(storeDaily) && storeDaily.length > 0) {
      dailyArticles = storeDaily.filter((d) => d.isPublished);
    }
  } catch {
    // Fallback to static daily articles
  }

  for (const dd of dailyArticles) {
    if (!dd.isPublished) continue;
    const subregion = inferSubregionFromText(`${dd.bureauId} ${dd.dateline} ${dd.headline}`);
    addDoc({
      id: `hd:daily:${dd.slug}`,
      platform: 'himalayan_dispatch',
      platformLabel: 'HIMALAYAN DISPATCH',
      institutionalRubric: 'HIMALAYAN DISPATCH · NEWS & DAILY DISPATCH',
      category: 'news_reporting',
      secondaryCategories: ['bureau_reports', 'regional_environmental_issues'],
      documentKind: 'daily_dispatch',
      title: dd.headline,
      subtitle: dd.standfirst,
      description: dd.standfirst,
      canonicalUrl: `/himalayan-dispatch/daily-dispatch/${dd.slug}`,
      authorName: dd.bylineDisplay,
      authorSlug: dd.journalistSlug,
      publishedDate: dd.publishedAt?.slice(0, 10),
      readingDurationLabel: `${Math.max(2, dd.readingTimeMinutes || 4)} MIN READ`,
      subregion,
      geographicLabel: dd.dateline,
      tags: [dd.departmentLabel, dd.beatTitle, dd.bureauLabel, dd.dateline].filter(Boolean),
      bodySearchText: `${(dd.paragraphs || []).join(' ')} ${(dd.keyFindings || []).join(' ')} ${
        dd.scientificSourceNote || ''
      }`,
    });
  }

  // 3. Published Editions & Companion Research Monographs (excluding forthcoming unpublished issues)
  let editions = MAGAZINE_EDITIONS.filter((e) => e.status !== 'forthcoming');
  try {
    const storeEditions = getPublicEditions();
    if (Array.isArray(storeEditions) && storeEditions.length > 0) {
      editions = storeEditions.filter((e) => e.status !== 'forthcoming');
    }
  } catch {
    // Fallback
  }

  for (const ed of editions) {
    if (ed.status === 'forthcoming') continue;
    const canonSlug = toCanonicalIssueSlug(ed.slug);
    const isMonograph = canonSlug.startsWith('monograph-');
    const subregion = inferSubregionFromText(`${ed.coverLocation} ${ed.title} ${ed.subtitle}`);

    addDoc({
      id: `hd:edition:${canonSlug}`,
      platform: 'himalayan_dispatch',
      platformLabel: 'HIMALAYAN DISPATCH',
      institutionalRubric: isMonograph
        ? `HIMALAYAN DISPATCH · RESEARCH MONOGRAPH (${ed.volumeLabel.split('·')[0].trim()})`
        : `HIMALAYAN DISPATCH · EDITION FOLIO (${ed.volumeLabel})`,
      category: 'research_publications',
      secondaryCategories: ['investigative_journalism', 'regional_environmental_issues'],
      documentKind: isMonograph ? 'monograph' : 'issue_edition',
      title: ed.title,
      subtitle: ed.subtitle,
      description: (ed.editorsNoteBody || [])[0] || ed.subtitle,
      canonicalUrl: `/himalayan-dispatch/issues/${canonSlug}`,
      authorName: ed.editorsNoteAuthor,
      authorSlug: 'dr-fayaz-ahmad-khan',
      publishedDate: ed.publishedIsoDate,
      subregion,
      geographicLabel: ed.coverLocation,
      tags: [ed.volumeLabel, ed.issueNumberLabel, ed.themeKicker, ed.coverLocation],
      bodySearchText: `${ed.editorsNoteTitle} ${(ed.editorsNoteBody || []).join(' ')} ${ed.coverCaption}`,
    });
  }

  // 3b. Ladakh's Ecological Frontiers — 45 Dedicated Cold-Desert Research Chapters
  for (const ch of LADAKH_CHAPTERS_45) {
    addDoc({
      id: `hd:ladakh-chapter:${ch.slug}`,
      platform: 'himalayan_dispatch',
      platformLabel: 'HIMALAYAN DISPATCH',
      institutionalRubric: `HIMALAYAN DISPATCH · LADAKH INVESTIGATION ${ch.investigationNumber} · CH ${ch.globalChapterNumber}`,
      category: 'research_publications',
      secondaryCategories: ['investigative_journalism', 'regional_environmental_issues'],
      documentKind: 'monograph',
      title: `Chapter ${ch.globalChapterNumber}: ${ch.title}`,
      subtitle: `${ch.investigationTitle} — ${ch.subtitle}`,
      description: ch.primaryQuestion,
      canonicalUrl: `/himalayan-dispatch/issues/${LADAKH_ECOLOGICAL_FRONTIERS_SPEC.issueSlug}/chapters/${ch.slug}`,
      authorName: LADAKH_ECOLOGICAL_FRONTIERS_SPEC.proposedByline,
      authorSlug: 'dr-fayaz-ahmad-khan',
      publishedDate: '2026-11-28',
      readingDurationLabel: `${Math.max(10, ch.estimatedReadingMinutes)} MIN READ`,
      subregion: 'Ladakh',
      geographicLabel: ch.geographicalFocus,
      tags: [
        "Ladakh's Ecological Frontiers",
        ch.investigationTitle,
        ch.geographicalFocus,
        ...ch.linkedExperiments,
      ],
      bodySearchText: `${ch.centralHypothesisLink} ${ch.analyticalScope.join(' ')} ${ch.primaryDocumentarySources.join(' ')} ${ch.unresolvedQuestions.join(' ')}`,
    });
  }

  // 4. Dedicated Editorial Observatories & Governance Pages
  addDoc({
    id: 'hd:observatory:media-transparency',
    platform: 'himalayan_dispatch',
    platformLabel: 'HIMALAYAN DISPATCH',
    institutionalRubric: 'HIMALAYAN DISPATCH · RESEARCH & MEDIA ACCOUNTABILITY OBSERVATORY',
    category: 'research_publications',
    secondaryCategories: ['investigative_journalism', 'editorials_opinions'],
    documentKind: 'editorial_observatory',
    title: 'Western Himalayan Media Transparency & Editorial Independence Observatory',
    subtitle:
      'Proposed 16-Module Public-Interest Research Architecture, 15-Indicator Five-Region Journalism Census & 20-Principle Integrity Charter',
    description:
      'Documents media ownership filings, government advertising dependency models, internal journalist safeguards, and Himalayan Dispatch self-scrutiny standards across Kashmir, Jammu, Ladakh, AJ&K, and Gilgit-Baltistan.',
    canonicalUrl: '/himalayan-dispatch/media-transparency-observatory',
    authorName: 'Dr. Fayaz Ahmad Khan & Himalayan Dispatch Media Political Economy Desk',
    authorSlug: 'dr-fayaz-ahmad-khan',
    publishedDate: '2026-11-28',
    readingDurationLabel: '24 MIN READ',
    subregion: 'Multi-Regional',
    geographicLabel: 'Kashmir · Jammu · Ladakh · Azad Jammu & Kashmir · Gilgit-Baltistan',
    tags: [
      'media transparency',
      'government advertising',
      'editorial independence',
      'journalism census',
      'media ownership',
      'press freedom',
    ],
    bodySearchText:
      'Media House Registry Ownership Transparency Government Advertising Ledger Political Relationship Disclosures 2020 Media Policy Freedom Network CPJ Press Council Integrity Charter',
  });

  // 5. Six Regional Reporting Bureaus & Seven Reporting Beats
  for (const b of REGIONAL_REPORTING_BUREAUS) {
    const slug = b.id as BureauRouteSlug;
    const subregionMap: Record<string, KewSubregion> = {
      kashmir: 'Kashmir',
      jammu: 'Jammu',
      ladakh: 'Ladakh',
      ajk: 'Azad Kashmir',
      gilgit: 'Gilgit',
      baltistan: 'Baltistan',
    };
    addDoc({
      id: `hd:bureau:${slug}`,
      platform: 'himalayan_dispatch',
      platformLabel: 'HIMALAYAN DISPATCH',
      institutionalRubric: 'HIMALAYAN DISPATCH · REGIONAL BUREAU DESK',
      category: 'bureau_reports',
      secondaryCategories: ['news_reporting', 'regional_environmental_issues'],
      documentKind: 'bureau_desk',
      title: `${b.name} — Regional Environmental Reporting Desk`,
      subtitle: b.geographicScopeLabel,
      description: `${b.geographicScopeLabel}. Covered districts and valleys: ${(b.coveredUnits || []).join(', ')}.`,
      canonicalUrl: `/himalayan-dispatch/bureaus/${slug}`,
      publishedDate: '2026-11-28',
      subregion: subregionMap[slug] || 'Multi-Regional',
      geographicLabel: b.geographicScopeLabel,
      tags: [b.name, b.shortLabel, ...(b.coveredUnits || []), b.geographicScopeLabel],
      bodySearchText: `${b.geographicScopeLabel} ${b.shortLabel} ${(b.coveredUnits || []).join(' ')}`,
    });
  }

  for (const beat of EDITORIAL_REPORTING_BEATS) {
    const beatSlug = beat.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    addDoc({
      id: `hd:beat:${beat.code}`,
      platform: 'himalayan_dispatch',
      platformLabel: 'HIMALAYAN DISPATCH',
      institutionalRubric: `HIMALAYAN DISPATCH · SPECIALIST BEAT (${beat.code})`,
      category: 'bureau_reports',
      secondaryCategories: ['investigative_journalism', 'regional_environmental_issues'],
      documentKind: 'bureau_desk',
      title: `${beat.title} — Himalayan Dispatch Reporting Beat`,
      subtitle: `${beat.code} · Specialist Mountain Journalism`,
      description: beat.description,
      canonicalUrl: '/himalayan-dispatch/reporting-beats',
      publishedDate: '2026-11-28',
      subregion: 'Multi-Regional',
      tags: [beat.code, beat.title, beatSlug],
      bodySearchText: beat.description,
    });
  }

  // 6. Seven Editorial Departments
  for (const dept of Object.values(DEPARTMENT_ROUTE_CONFIG)) {
    const slug = dept.routeSlug as DepartmentRouteSlug;
    let cat: UnifiedKnowledgeCategory = 'investigative_journalism';
    if (slug === 'interviews-editorials') cat = 'editorials_opinions';
    else if (slug === 'field-reports') cat = 'news_reporting';
    addDoc({
      id: `hd:dept:${slug}`,
      platform: 'himalayan_dispatch',
      platformLabel: 'HIMALAYAN DISPATCH',
      institutionalRubric: `HIMALAYAN DISPATCH · ${dept.kicker}`,
      category: cat,
      secondaryCategories: ['regional_environmental_issues'],
      documentKind: 'department_desk',
      title: `${dept.name} — Himalayan Dispatch`,
      subtitle: dept.tagline,
      description: dept.editorialIntroduction,
      canonicalUrl: `/himalayan-dispatch/departments/${slug}`,
      publishedDate: '2026-11-28',
      subregion: 'Multi-Regional',
      tags: [dept.name, dept.kicker, dept.tagline],
      bodySearchText: `${dept.editorialMandate} ${(dept.submissionGuidelines || []).join(' ')}`,
    });
  }

  // 7. Public Journalist & Editorial Desk Portfolios (consent-verified only)
  let publicJournalists = JOURNALIST_PROFILES;
  try {
    const storeJournalists = getPublicJournalists();
    if (Array.isArray(storeJournalists) && storeJournalists.length > 0) {
      publicJournalists = storeJournalists;
    }
  } catch {
    // Fallback
  }

  for (const j of publicJournalists) {
    addDoc({
      id: `hd:journalist:${j.slug}`,
      platform: 'himalayan_dispatch',
      platformLabel: 'HIMALAYAN DISPATCH',
      institutionalRubric: 'HIMALAYAN DISPATCH · JOURNALIST & DESK PORTFOLIO',
      category: 'news_reporting',
      secondaryCategories: ['investigative_journalism'],
      documentKind: 'journalist_portfolio',
      title: `${j.name} — ${j.roleTitle}`,
      subtitle: j.beat,
      description: j.shortBio,
      canonicalUrl: `/himalayan-dispatch/journalists/${j.slug}`,
      authorName: j.name,
      authorSlug: j.slug,
      publishedDate: '2026-11-28',
      subregion: inferSubregionFromText(`${j.basedIn} ${j.beat}`),
      geographicLabel: j.basedIn,
      tags: [j.name, j.roleTitle, j.beat, ...(j.languages || [])],
      bodySearchText: `${(j.extendedBio || []).join(' ')} ${j.shortBio} ${j.beat}`,
    });
  }

  // 8. Core Public Editorial Governance Charters
  const governancePages: Array<{
    slug: string;
    title: string;
    subtitle: string;
    desc: string;
  }> = [
    {
      slug: '/himalayan-dispatch/our-story',
      title: 'When Silence Became the Reason to Speak — Founding Story of Himalayan Dispatch',
      subtitle: 'Institutional Origin & Editorial Philosophy',
      desc: 'How Himalayan Dispatch emerged to give Western Himalayan science, watersheds, and communities an independent, verifiable editorial home.',
    },
    {
      slug: '/himalayan-dispatch/editorial-charter',
      title: 'The Himalayan Dispatch Editorial Charter',
      subtitle: 'Fifteen Binding Commitments of Independence, Scientific Integrity & Right of Reply',
      desc: 'Foundational charter governing editorial independence, source confidentiality, visual authenticity, and universal non-exemption across Himalayan Dispatch.',
    },
    {
      slug: '/himalayan-dispatch/scientific-review',
      title: 'Independent Scientific Review Protocol (Stage 05)',
      subtitle: 'Empirical Verification of Cryospheric, Hydrological & Ecological Claims',
      desc: 'How Himalayan Dispatch verifies environmental measurements, satellite analyses, and uncertainty bounds prior to publication.',
    },
    {
      slug: '/himalayan-dispatch/source-protection-verification',
      title: 'Confidential Source Protection & Primary Evidence Verification',
      subtitle: 'Safeguarding Whistleblowers, Field Witnesses & Documentary Dossiers',
      desc: 'Operational standards protecting confidential sources, pre-publication right of response, and primary-record authentication.',
    },
  ];

  for (const gp of governancePages) {
    addDoc({
      id: `hd:charter:${gp.slug}`,
      platform: 'himalayan_dispatch',
      platformLabel: 'HIMALAYAN DISPATCH',
      institutionalRubric: 'HIMALAYAN DISPATCH · EDITORIAL CHARTER & GOVERNANCE',
      category: 'editorials_opinions',
      secondaryCategories: [],
      documentKind: 'governance_charter',
      title: gp.title,
      subtitle: gp.subtitle,
      description: gp.desc,
      canonicalUrl: gp.slug,
      publishedDate: '2026-11-28',
      subregion: 'Multi-Regional',
      tags: ['editorial charter', 'governance', 'ethics', 'scientific review', 'source protection'],
      bodySearchText: `${gp.title} ${gp.subtitle} ${gp.desc}`,
    });
  }

  globalForDispatchIndex.__hdEditorialCorpus = docs;
  globalForDispatchIndex.__hdEditorialBuiltAtMs = now;
  return docs;
}
