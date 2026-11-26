/**
 * Centralized Nine-Scene Cinematic Hero Carousel Registry
 * Kashmir EcoWatch · Scientific Conference Network (`/webinars`)
 *
 * Single source of truth for:
 * 1. Synchronized 9-scene hero presentation on `/webinars` (eyebrow, headline, description, CTAs, WebP/JPEG assets, responsive focal points).
 * 2. Contextual hero background image allocation across all 41 hero-bearing routes in `/webinars/*`.
 * 3. Session-type contextual image selection for dynamic webinar/session dossiers.
 * 4. Conceptual online studio visual attribution & media credit disclosures (kept off the visible hero surface).
 */

export type WebinarEventClassification =
  | 'flagship_conference'
  | 'specialist_webinar'
  | 'scientific_dialogue_podcast'
  | 'applied_workshop'
  | 'symposium_panel'
  | 'virtual_infrastructure'
  | 'institutional_hosting'
  | 'institutional_network'
  | 'environmental_observance';

export interface WebinarHeroCta {
  label: string;
  href: string;
  badge?: string;
  reconciliationNote?: string;
}

export interface WebinarHeroMediaAttribution {
  assetId: string;
  sceneNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  assetOrigin: 'existing_preserved' | 'generated_studio_scene';
  originalJpgPath: string;
  optimizedWebpPath: string;
  originalJpgSha256Prefix: string;
  dimensions: '1376x768';
  depictedSubjects: string;
  onlineOnlyCompliance: true;
  conceptualDisclosure: string;
}

export interface WebinarHeroSlide {
  id: string;
  sceneNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  imagePath: string;
  fallbackJpgPath: string;
  focalPositionDesktop: string;
  focalPositionMobile: string;
  altText: string;
  eyebrow: string;
  headline: string;
  description: string;
  primaryCta: WebinarHeroCta;
  secondaryCta?: WebinarHeroCta;
  applicableRoutes: string[];
  eventClassification: WebinarEventClassification;
  countsToward104Program: boolean;
  programCategoryCountLabel: string;
  mediaAttribution: WebinarHeroMediaAttribution;
}

export interface CarouselSlideAssetMeta {
  src: string;
  fallbackSrc?: string;
  focalDesktop?: string;
  focalMobile?: string;
  alt?: string;
}

/** 9-second auto-advance interval (within the 8–10s institutional specification) */
export const WEBINAR_HERO_SLIDE_INTERVAL_MS = 9000;

/** Webinars-specific hero scrim — governed globally by BackgroundCarousel's luminance-adaptive directional KEW atmospheric scrim */
export const WEBINAR_HERO_OVERLAY_CLASS = '';

export const WEBINAR_CONCEPTUAL_MEDIA_DISCLOSURE =
  'Online conference studio visuals across the Kashmir EcoWatch Scientific Conference Network (/webinars) are conceptual digital studio illustrations depicting exclusively online scientific collaboration. Depicted individuals do not represent confirmed speakers, university officials, or ratified institutional partners, and depicted interiors do not represent physical Kashmir EcoWatch broadcast facilities.';

export const WEBINAR_HERO_SLIDES: readonly WebinarHeroSlide[] = [
  {
    id: 'webinar-scene-01',
    sceneNumber: 1,
    imagePath: '/images/webinars/webinar-hero-1.webp',
    fallbackJpgPath: '/images/webinars/webinar-hero-1.jpg',
    focalPositionDesktop: '52% 40%',
    focalPositionMobile: '38% 40%',
    altText: 'Online scientific conference broadcast studio with moderator, remote researcher video wall, and Western Himalayan glacier visualization',
    eyebrow: 'FLAGSHIP SCIENTIFIC CONFERENCES',
    headline: 'Connecting Science Across the Himalayas',
    description:
      "An international platform for multidisciplinary environmental research, scientific dialogue and academic collaboration through advanced online conferences addressing the Western Himalayas' most consequential ecological challenges.",
    primaryCta: {
      label: 'Explore Conferences',
      href: '/webinars/conferences',
    },
    secondaryCta: {
      label: 'View Program Calendar',
      href: '/webinars/calendar',
    },
    applicableRoutes: [
      '/webinars',
      '/webinars/conferences',
      '/webinars/conferences/[conferenceId]',
      '/webinars/calendar',
      '/webinars/upcoming',
      '/webinars/certificates',
    ],
    eventClassification: 'flagship_conference',
    countsToward104Program: true,
    programCategoryCountLabel: '8 proposed flagship conferences · 2027–2028',
    mediaAttribution: {
      assetId: 'webinar-hero-1',
      sceneNumber: 1,
      assetOrigin: 'existing_preserved',
      originalJpgPath: '/images/webinars/webinar-hero-1.jpg',
      optimizedWebpPath: '/images/webinars/webinar-hero-1.webp',
      originalJpgSha256Prefix: '5D9C4728BA0E',
      dimensions: '1376x768',
      depictedSubjects: 'Female conference moderator at online studio console with remote participant grid and Himalayan cryosphere display',
      onlineOnlyCompliance: true,
      conceptualDisclosure: WEBINAR_CONCEPTUAL_MEDIA_DISCLOSURE,
    },
  },
  {
    id: 'webinar-scene-02',
    sceneNumber: 2,
    imagePath: '/images/webinars/webinar-hero-2.webp',
    fallbackJpgPath: '/images/webinars/webinar-hero-2.jpg',
    focalPositionDesktop: '58% 36%',
    focalPositionMobile: '64% 36%',
    altText: 'Online specialist scientific webinar workstation with scientist presenting satellite glacier imagery to remote participants',
    eyebrow: 'SPECIALIST SCIENTIFIC WEBINARS',
    headline: 'Where Knowledge Knows No Boundaries',
    description:
      'Engage with multidisciplinary scientific expertise through specialist webinars exploring climate systems, biodiversity, hydrology, geological processes and environmental governance across the Western Himalayas.',
    primaryCta: {
      label: 'Explore Upcoming Webinars',
      href: '/webinars/upcoming',
    },
    secondaryCta: {
      label: 'View Calendar',
      href: '/webinars/calendar?type=specialist_webinar',
    },
    applicableRoutes: [
      '/webinars',
      '/webinars/upcoming',
      '/webinars/conferences',
      '/webinars/calendar',
      '/webinars/proceedings',
      '/webinars/past-events',
    ],
    eventClassification: 'specialist_webinar',
    countsToward104Program: true,
    programCategoryCountLabel: '48 proposed specialist webinars · Two per month',
    mediaAttribution: {
      assetId: 'webinar-hero-2',
      sceneNumber: 2,
      assetOrigin: 'existing_preserved',
      originalJpgPath: '/images/webinars/webinar-hero-2.jpg',
      optimizedWebpPath: '/images/webinars/webinar-hero-2.webp',
      originalJpgSha256Prefix: '417AA750C7E6',
      dimensions: '1376x768',
      depictedSubjects: 'Male scientist at dual-screen online webinar desk with glacier remote-sensing display and remote attendee grid',
      onlineOnlyCompliance: true,
      conceptualDisclosure: WEBINAR_CONCEPTUAL_MEDIA_DISCLOSURE,
    },
  },
  {
    id: 'webinar-scene-03',
    sceneNumber: 3,
    imagePath: '/images/webinars/webinar-hero-3.webp',
    fallbackJpgPath: '/images/webinars/webinar-hero-3.jpg',
    focalPositionDesktop: '52% 38%',
    focalPositionMobile: '52% 36%',
    altText: 'Online scientific conversation studio with host speaking to remote senior researcher over digital video link',
    eyebrow: 'SCIENTIFIC PODCASTS & EXPERT CONVERSATIONS',
    headline: 'Conversations That Change Perspectives',
    description:
      'Bringing scientific knowledge into public discourse through thoughtful online conversations with researchers, environmental professionals, policy specialists and intellectual voices addressing the future of mountain ecosystems.',
    primaryCta: {
      label: 'Explore Expert Dialogues',
      href: '/webinars/upcoming',
      reconciliationNote:
        'Reconciled from "Explore Scientific Podcasts" to /webinars/upcoming (Technical Lectures & Roundtables) because no standalone podcast archive module exists yet.',
    },
    secondaryCta: {
      label: 'Propose Expert Session',
      href: '/webinars/create?format=roundtable',
      reconciliationNote:
        'Reconciled from "Become a Guest Speaker" to /webinars/create?format=roundtable (active Expert Roundtable & Keynote Faculty proposal workflow).',
    },
    applicableRoutes: [
      '/webinars',
      '/webinars/calendar',
      '/webinars/create',
      '/webinars/sessions/[sessionId]/questions',
    ],
    eventClassification: 'scientific_dialogue_podcast',
    countsToward104Program: false,
    programCategoryCountLabel: 'Expert conversations · Scientific communication · Public understanding',
    mediaAttribution: {
      assetId: 'webinar-hero-3',
      sceneNumber: 3,
      assetOrigin: 'existing_preserved',
      originalJpgPath: '/images/webinars/webinar-hero-3.jpg',
      optimizedWebpPath: '/images/webinars/webinar-hero-3.webp',
      originalJpgSha256Prefix: '6818E94E9794',
      dimensions: '1376x768',
      depictedSubjects: 'Female host in acoustic broadcast studio conversing online with remote senior male academic',
      onlineOnlyCompliance: true,
      conceptualDisclosure: WEBINAR_CONCEPTUAL_MEDIA_DISCLOSURE,
    },
  },
  {
    id: 'webinar-scene-04',
    sceneNumber: 4,
    imagePath: '/images/webinars/webinar-hero-4.webp',
    fallbackJpgPath: '/images/webinars/webinar-hero-4.jpg',
    focalPositionDesktop: '54% 38%',
    focalPositionMobile: '46% 36%',
    altText: 'Online applied scientific workshop studio with specialist demonstrating 3D watershed terrain model to remote participants',
    eyebrow: 'APPLIED SCIENTIFIC WORKSHOPS',
    headline: 'Transforming Knowledge Into Capability',
    description:
      'Advance professional and institutional capacity through interactive online workshops integrating geospatial intelligence, environmental modelling, scientific methodologies, data interpretation and practical approaches to ecosystem management.',
    primaryCta: {
      label: 'Explore Applied Workshops',
      href: '/webinars/calendar?type=applied_workshop',
    },
    secondaryCta: {
      label: 'Training Calendar',
      href: '/webinars/calendar',
    },
    applicableRoutes: [
      '/webinars',
      '/webinars/calendar',
      '/webinars/upcoming',
      '/webinars/proceedings',
      '/webinars/certificates',
    ],
    eventClassification: 'applied_workshop',
    countsToward104Program: true,
    programCategoryCountLabel: '24 proposed applied workshops · One per month',
    mediaAttribution: {
      assetId: 'webinar-hero-4',
      sceneNumber: 4,
      assetOrigin: 'existing_preserved',
      originalJpgPath: '/images/webinars/webinar-hero-4.jpg',
      optimizedWebpPath: '/images/webinars/webinar-hero-4.webp',
      originalJpgSha256Prefix: 'BFE415D78808',
      dimensions: '1376x768',
      depictedSubjects: 'Female geospatial specialist conducting interactive online workshop with 3D watershed DEM monitor and remote participant wall',
      onlineOnlyCompliance: true,
      conceptualDisclosure: WEBINAR_CONCEPTUAL_MEDIA_DISCLOSURE,
    },
  },
  {
    id: 'webinar-scene-05',
    sceneNumber: 5,
    imagePath: '/images/webinars/webinar-hero-5.webp',
    fallbackJpgPath: '/images/webinars/webinar-hero-5.jpg',
    focalPositionDesktop: '50% 38%',
    focalPositionMobile: '44% 38%',
    altText: 'Online scientific symposium studio with moderator and four remote expert panelists alongside mountain contour analytics',
    eyebrow: 'SCIENTIFIC SYMPOSIUMS & EXPERT PANELS',
    headline: 'Different Perspectives. Shared Scientific Purpose.',
    description:
      'Facilitating multidisciplinary scientific dialogue through online symposiums, expert panels and academic roundtables that connect environmental evidence, institutional knowledge and emerging policy perspectives.',
    primaryCta: {
      label: 'Explore Scientific Dialogue',
      href: '/webinars/conferences',
    },
    secondaryCta: {
      label: 'Upcoming Events',
      href: '/webinars/upcoming',
    },
    applicableRoutes: [
      '/webinars',
      '/webinars/conferences',
      '/webinars/conferences/[conferenceId]',
      '/webinars/calendar',
      '/webinars/proceedings',
    ],
    eventClassification: 'symposium_panel',
    countsToward104Program: false,
    programCategoryCountLabel: 'Multidisciplinary dialogue · Research exchange · Policy perspectives',
    mediaAttribution: {
      assetId: 'webinar-hero-5',
      sceneNumber: 5,
      assetOrigin: 'existing_preserved',
      originalJpgPath: '/images/webinars/webinar-hero-5.jpg',
      optimizedWebpPath: '/images/webinars/webinar-hero-5.webp',
      originalJpgSha256Prefix: '550D0F09D746',
      dimensions: '1376x768',
      depictedSubjects: 'Male symposium moderator at studio desk with remote four-panelist video wall and topographic contour plot',
      onlineOnlyCompliance: true,
      conceptualDisclosure: WEBINAR_CONCEPTUAL_MEDIA_DISCLOSURE,
    },
  },
  {
    id: 'webinar-scene-06',
    sceneNumber: 6,
    imagePath: '/images/webinars/webinar-hero-6.webp',
    fallbackJpgPath: '/images/webinars/webinar-hero-6.jpg',
    focalPositionDesktop: '58% 40%',
    focalPositionMobile: '62% 40%',
    altText: 'Digital virtual conference control room with male and female broadcast engineers managing multi-hall online sessions',
    eyebrow: 'ADVANCED VIRTUAL CONFERENCE INFRASTRUCTURE',
    headline: 'Technology That Connects Scientific Minds',
    description:
      'An integrated digital conference environment designed to support virtual scientific presentations, parallel online sessions, interactive collaboration, delegate participation and professional academic event management.',
    primaryCta: {
      label: 'Explore Virtual Hall Demo',
      href: '/webinars/room/kew-conf-2027-cryo',
    },
    secondaryCta: {
      label: 'Hosting Facilities',
      href: '/webinars/host-a-conference',
    },
    applicableRoutes: [
      '/webinars',
      '/webinars/calendar',
      '/webinars/host-a-conference',
      '/webinars/institution/[institutionId]/dashboard',
      '/webinars/admin',
    ],
    eventClassification: 'virtual_infrastructure',
    countsToward104Program: false,
    programCategoryCountLabel: 'Virtual halls · Digital presentations · Online collaboration',
    mediaAttribution: {
      assetId: 'webinar-hero-6',
      sceneNumber: 6,
      assetOrigin: 'existing_preserved',
      originalJpgPath: '/images/webinars/webinar-hero-6.jpg',
      optimizedWebpPath: '/images/webinars/webinar-hero-6.webp',
      originalJpgSha256Prefix: 'FB1846EFBBD6',
      dimensions: '1376x768',
      depictedSubjects: 'Male and female broadcast technical directors operating digital multi-track online conference control gallery',
      onlineOnlyCompliance: true,
      conceptualDisclosure: WEBINAR_CONCEPTUAL_MEDIA_DISCLOSURE,
    },
  },
  {
    id: 'webinar-scene-07',
    sceneNumber: 7,
    imagePath: '/images/webinars/webinar-hero-7.webp',
    fallbackJpgPath: '/images/webinars/webinar-hero-7.jpg',
    focalPositionDesktop: '62% 38%',
    focalPositionMobile: '68% 38%',
    altText: 'Contemporary Kashmiri female academic leader hosting an online institutional conference with remote university representatives',
    eyebrow: 'FREE INSTITUTIONAL CONFERENCE HOSTING',
    headline: 'Your Institution. Your Conference. Our Platform.',
    description:
      'Empowering eligible universities, research institutions, environmental NGOs and scientific societies to organize their own online conferences, webinars and workshops without platform hosting charges, subject to institutional verification and applicable hosting policies.',
    primaryCta: {
      label: 'Host Your Conference',
      href: '/webinars/host-a-conference',
    },
    secondaryCta: {
      label: 'Institutional Verification',
      href: '/webinars/institution/verification',
    },
    applicableRoutes: [
      '/webinars',
      '/webinars/host-a-conference',
      '/webinars/institution/verification',
      '/webinars/calendar',
    ],
    eventClassification: 'institutional_hosting',
    countsToward104Program: false,
    programCategoryCountLabel: 'Eligible institutions · Free platform hosting · Independent event organization',
    mediaAttribution: {
      assetId: 'webinar-hero-7',
      sceneNumber: 7,
      assetOrigin: 'generated_studio_scene',
      originalJpgPath: '/images/webinars/webinar-hero-7.jpg',
      optimizedWebpPath: '/images/webinars/webinar-hero-7.webp',
      originalJpgSha256Prefix: 'D7798C059D46',
      dimensions: '1376x768',
      depictedSubjects: 'Contemporary Kashmiri female institutional leader in modern professional attire hosting online conference with remote university representatives',
      onlineOnlyCompliance: true,
      conceptualDisclosure: WEBINAR_CONCEPTUAL_MEDIA_DISCLOSURE,
    },
  },
  {
    id: 'webinar-scene-08',
    sceneNumber: 8,
    imagePath: '/images/webinars/webinar-hero-8.webp',
    fallbackJpgPath: '/images/webinars/webinar-hero-8.jpg',
    focalPositionDesktop: '64% 38%',
    focalPositionMobile: '70% 38%',
    altText: 'Contemporary Kashmiri male and female academic representatives collaborating online with international research colleagues via digital video wall',
    eyebrow: 'INSTITUTIONAL SCIENTIFIC NETWORK',
    headline: 'Building a Connected Scientific Community',
    description:
      'Bringing universities, research organizations, environmental advocacy groups and scientific institutions together through institutional verification, online academic partnerships, knowledge exchange and collaborative environmental initiatives.',
    primaryCta: {
      label: 'Join the Institutional Network',
      href: '/webinars/institution/verification',
    },
    secondaryCta: {
      label: 'Explore Hosting Opportunities',
      href: '/webinars/host-a-conference',
    },
    applicableRoutes: [
      '/webinars',
      '/webinars/institution/verification',
      '/webinars/institution/register',
      '/webinars/institution/[institutionId]/dashboard',
      '/webinars/host-a-conference',
      '/webinars/calendar',
    ],
    eventClassification: 'institutional_network',
    countsToward104Program: false,
    programCategoryCountLabel: 'Institutional verification · Research partnerships · Academic collaboration',
    mediaAttribution: {
      assetId: 'webinar-hero-8',
      sceneNumber: 8,
      assetOrigin: 'generated_studio_scene',
      originalJpgPath: '/images/webinars/webinar-hero-8.jpg',
      optimizedWebpPath: '/images/webinars/webinar-hero-8.webp',
      originalJpgSha256Prefix: '71C83DAD364E',
      dimensions: '1376x768',
      depictedSubjects: 'Contemporary Kashmiri male and female academic representatives connected online with remote researchers via multi-panel digital video wall',
      onlineOnlyCompliance: true,
      conceptualDisclosure: WEBINAR_CONCEPTUAL_MEDIA_DISCLOSURE,
    },
  },
  {
    id: 'webinar-scene-09',
    sceneNumber: 9,
    imagePath: '/images/webinars/webinar-hero-9.webp',
    fallbackJpgPath: '/images/webinars/webinar-hero-9.jpg',
    focalPositionDesktop: '64% 40%',
    focalPositionMobile: '68% 40%',
    altText: 'Contemporary Kashmiri scientific educators leading an online environmental education session with Himalayan forest and watershed displays',
    eyebrow: 'ENVIRONMENTAL OBSERVANCES & SCIENTIFIC EDUCATION',
    headline: 'Inspiring a Generation of Environmental Stewards',
    description:
      'Connecting students, educators, researchers and communities through online environmental observances, interactive scientific education and digital learning experiences celebrating the ecological heritage of the Western Himalayas.',
    primaryCta: {
      label: 'Explore Environmental Observances',
      href: '/webinars/calendar?type=environmental_observance',
    },
    secondaryCta: {
      label: 'Outdoor Classroom',
      href: '/environmental-calendar/outdoor-classroom',
    },
    applicableRoutes: [
      '/webinars',
      '/webinars/calendar',
    ],
    eventClassification: 'environmental_observance',
    countsToward104Program: true,
    programCategoryCountLabel: '24 proposed environmental observances · Scientific education',
    mediaAttribution: {
      assetId: 'webinar-hero-9',
      sceneNumber: 9,
      assetOrigin: 'generated_studio_scene',
      originalJpgPath: '/images/webinars/webinar-hero-9.jpg',
      optimizedWebpPath: '/images/webinars/webinar-hero-9.webp',
      originalJpgSha256Prefix: 'D018D223943C',
      dimensions: '1376x768',
      depictedSubjects: 'Young contemporary Kashmiri scientific educators delivering interactive online environmental session with Himalayan ecosystem screens and remote student grid',
      onlineOnlyCompliance: true,
      conceptualDisclosure: WEBINAR_CONCEPTUAL_MEDIA_DISCLOSURE,
    },
  },
] as const;

const SLIDE_BY_SCENE = new Map<number, WebinarHeroSlide>(
  WEBINAR_HERO_SLIDES.map((s) => [s.sceneNumber, s])
);

const SLIDE_BY_ANY_PATH = new Map<string, WebinarHeroSlide>();
WEBINAR_HERO_SLIDES.forEach((slide) => {
  SLIDE_BY_ANY_PATH.set(slide.imagePath, slide);
  SLIDE_BY_ANY_PATH.set(slide.fallbackJpgPath, slide);
});

/** Look up responsive focal points & WebP/JPEG fallback metadata for any known webinar hero image path */
export function resolveWebinarSlideAssetMeta(src: string): CarouselSlideAssetMeta {
  const matched = SLIDE_BY_ANY_PATH.get(src);
  if (!matched) {
    return { src };
  }
  return {
    src: matched.imagePath,
    fallbackSrc: matched.fallbackJpgPath,
    focalDesktop: matched.focalPositionDesktop,
    focalMobile: matched.focalPositionMobile,
    alt: matched.altText,
  };
}

/** Convert scene numbers (1..9) into optimized WebP paths */
export function getWebinarScenesByNumbers(sceneNumbers: readonly number[]): string[] {
  return sceneNumbers
    .map((n) => SLIDE_BY_SCENE.get(n)?.imagePath)
    .filter((p): p is string => Boolean(p));
}

/**
 * Contextual image allocation for dynamic webinar/conference session types:
 * - Flagship conferences / Plenary keynotes -> [1, 5, 2]
 * - Specialist webinars / Technical papers -> [2, 1, 4]
 * - Scientific podcasts / Expert conversations -> [3]
 * - Applied workshops -> [4, 2]
 * - Symposiums / Expert panels / Roundtables -> [5, 3]
 * - Environmental observances -> [9]
 */
export function getContextualWebinarSessionImages(sessionType?: string | null): string[] {
  const normalized = (sessionType || '').toLowerCase().trim();
  if (normalized.includes('podcast') || normalized.includes('conversation')) {
    return getWebinarScenesByNumbers([3]);
  }
  if (normalized.includes('workshop')) {
    return getWebinarScenesByNumbers([4, 2]);
  }
  if (
    normalized.includes('symposium') ||
    normalized.includes('panel') ||
    normalized.includes('roundtable') ||
    normalized.includes('dialogue')
  ) {
    return getWebinarScenesByNumbers([5, 3]);
  }
  if (normalized.includes('observance') || normalized.includes('education')) {
    return getWebinarScenesByNumbers([9]);
  }
  if (normalized.includes('conference') || normalized.includes('plenary') || normalized.includes('keynote')) {
    return getWebinarScenesByNumbers([1, 5, 2]);
  }
  return getWebinarScenesByNumbers([2, 1, 4]);
}

/**
 * Centralized route-to-scene allocation across all `/webinars/*` hero surfaces:
 * - Main hub (`/webinars`): 1..9
 * - Program Calendar (`/webinars/calendar`): 1..9 (or filtered by activity type when provided)
 * - Flagship Conferences (`/webinars/conferences`, `/webinars/conferences/[id]/*`): 1, 5, 2
 * - Conference Proceedings (`/webinars/proceedings`, `/webinars/conferences/[id]/proceedings`, `/webinars/past-events`): 2, 4, 5
 * - Specialist Webinars / Upcoming (`/webinars/upcoming`, `/webinars/create`): 2, 1, 4
 * - Host a Conference (`/webinars/host-a-conference`): 7, 8, 6
 * - Institutional Verification (`/webinars/institution/verification`): 8, 7
 * - Institutional Registration (`/webinars/institution/register`): 8
 * - Institutional Workspace (`/webinars/institution/[institutionId]/*`): 8, 6 (applications/partnerships: 8, 7)
 * - Certificates (`/webinars/certificates`): 4, 1
 * - Administrative Hub (`/webinars/admin`, `/webinars/admin/*`): 6
 */
export function getWebinarRouteHeroImages(
  pathname: string | null | undefined,
  activityTypeFilter?: string | null
): string[] {
  const cleanPath = (pathname || '/webinars').split('?')[0].replace(/\/+$/, '') || '/webinars';

  // Main Hub -> 1 through 9
  if (cleanPath === '/webinars') {
    return getWebinarScenesByNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  }

  // Program Calendar -> 1 through 9 (or contextual subset when filtered by activity type)
  if (cleanPath === '/webinars/calendar') {
    if (activityTypeFilter && activityTypeFilter !== 'all') {
      return getContextualWebinarSessionImages(activityTypeFilter);
    }
    return getWebinarScenesByNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  }

  // Administrative Hub & Submodules -> 6
  if (cleanPath === '/webinars/admin' || cleanPath.startsWith('/webinars/admin/')) {
    return getWebinarScenesByNumbers([6]);
  }

  // Host a Conference -> 7, 8, 6
  if (cleanPath === '/webinars/host-a-conference') {
    return getWebinarScenesByNumbers([7, 8, 6]);
  }

  // Institutional Verification -> 8, 7
  if (cleanPath === '/webinars/institution/verification') {
    return getWebinarScenesByNumbers([8, 7]);
  }

  // Institutional Registration -> 8
  if (cleanPath === '/webinars/institution/register') {
    return getWebinarScenesByNumbers([8]);
  }

  // Institutional Workspace & Partnerships -> 8, 7 for applications/partnerships; 8, 6 for workspace
  if (cleanPath.startsWith('/webinars/institution/')) {
    if (cleanPath.endsWith('/applications')) {
      return getWebinarScenesByNumbers([8, 7]);
    }
    return getWebinarScenesByNumbers([8, 6]);
  }

  // Certificates -> 4, 1
  if (cleanPath === '/webinars/certificates') {
    return getWebinarScenesByNumbers([4, 1]);
  }

  // Proceedings & Past Archives -> 2, 4, 5
  if (
    cleanPath === '/webinars/proceedings' ||
    cleanPath === '/webinars/past-events' ||
    (cleanPath.startsWith('/webinars/conferences/') && cleanPath.endsWith('/proceedings'))
  ) {
    return getWebinarScenesByNumbers([2, 4, 5]);
  }

  // Flagship Conferences & Sub-routes -> 1, 5, 2
  if (cleanPath === '/webinars/conferences' || cleanPath.startsWith('/webinars/conferences/')) {
    return getWebinarScenesByNumbers([1, 5, 2]);
  }

  // Specialist Webinars / Upcoming / Create -> 2, 1, 4
  if (cleanPath === '/webinars/upcoming' || cleanPath === '/webinars/create') {
    return getWebinarScenesByNumbers([2, 1, 4]);
  }

  // Session Q&A -> 5, 3 (Symposiums, Dialogue & Expert Panels)
  if (cleanPath.startsWith('/webinars/sessions/') && cleanPath.endsWith('/questions')) {
    return getWebinarScenesByNumbers([5, 3]);
  }

  // Session Recording -> 2, 4, 5
  if (cleanPath.startsWith('/webinars/sessions/') && cleanPath.endsWith('/recording')) {
    return getWebinarScenesByNumbers([2, 4, 5]);
  }

  // Default Specialist Webinar fallback -> 2, 1, 4
  return getWebinarScenesByNumbers([2, 1, 4]);
}
