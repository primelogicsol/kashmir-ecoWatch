'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { ArrowDown, Compass } from 'lucide-react';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';
import { CinematicCarouselController } from '@/components/ui/CinematicCarouselController';
import styles from './CinematicIntroduction.module.css';

interface CinematicScene {
  id: string;
  pillar: string;
  /** Accessible plain-text subtitle */
  subtitle: string;
  /** Intentional typographic phrasing with non-breaking bindings to prevent orphan words */
  formattedHeadline: string;
  /** Optional balanced two-line split for compact headlines on desktop/landscape stages */
  desktopHeadlineLines?: [string, string];
  description: string;
  ecosystemTags: string[];
  locationCaption: string;
  imageSrc: string;
  imageAlt: string;
  /** Landscape / desktop focal point preserving key wildlife, scientists, and landforms */
  focalLandscape: { x: string; y: string };
  /** Portrait / mobile focal point preventing blind subject cropping on narrow screens */
  focalPortrait: { x: string; y: string };
  /** Localized text-zone scrim alpha calibrated to background luminance (0.76–0.88) */
  scrimStrength: number;
  /** Adaptive reading window calibrated to scene copy density (ms) */
  readingDurationMs: number;
  isCulmination?: boolean;
}

const CINEMATIC_SCENES: readonly CinematicScene[] = [
  {
    id: 'observe',
    pillar: 'Observe',
    subtitle: 'Seeing Beyond the Visible.',
    formattedHeadline: 'Seeing Beyond the\u00A0Visible.',
    desktopHeadlineLines: ['Seeing Beyond', 'the\u00A0Visible.'],
    description:
      'Continuous satellite Earth observation, alpine GNSS stations, and real-time sensor networks track glaciers, watersheds, atmospheric chemistry, and multi-hazard signals across the Western Himalaya.',
    ecosystemTags: [
      'Scientific Intelligence',
      'Environmental Monitoring',
      'Satellite & GIS Telemetry',
    ],
    locationCaption: 'High-Altitude Cryosphere & GNSS Station · Western Himalaya',
    imageSrc: '/images/earth-human-impact/ehii-cryosphere-glacier-station.jpg',
    imageAlt:
      'Western Himalayan field glaciologists operating GNSS and telemetry instruments above an alpine glacial tarn',
    focalLandscape: { x: '64%', y: '42%' },
    focalPortrait: { x: '62%', y: '36%' },
    scrimStrength: 0.86,
    readingDurationMs: 7600,
  },
  {
    id: 'understand',
    pillar: 'Understand',
    subtitle: 'Every Ecosystem Has a Story.',
    formattedHeadline: 'Every Ecosystem Has a\u00A0Story.',
    desktopHeadlineLines: ['Every Ecosystem', 'Has a\u00A0Story.'],
    description:
      'Multidisciplinary research connects snowpack hydrology, Ramsar wetlands, temperate forests, seasonal phenology, Sectoral EIA studies, and 2,847+ Himalayan species into one living scientific record.',
    ecosystemTags: [
      'Ecological Research',
      'Biodiversity Science',
      'Cryosphere-to-Wetland Synthesis',
    ],
    locationCaption: 'Dachigam Temperate Sanctuary · Hangul Habitat Matrix',
    imageSrc: '/images/protected-network/protected-national-parks-dachigam.jpg',
    imageAlt:
      'Critically endangered Kashmir stag (Hangul) standing on a mossy ridge in misty Dachigam forest',
    // Preserves the Hangul stag on the right crag in both landscape and narrow portrait frames
    focalLandscape: { x: '74%', y: '48%' },
    focalPortrait: { x: '74%', y: '42%' },
    scrimStrength: 0.78,
    readingDurationMs: 7600,
  },
  {
    id: 'investigate',
    pillar: 'Investigate',
    subtitle: 'Evidence Before Conclusions.',
    formattedHeadline: 'Evidence Before\u00A0Conclusions.',
    desktopHeadlineLines: ['Evidence Before', 'Conclusions.'],
    description:
      'Forensic geospatial terrain surveys, laboratory water analytics, statutory CAG and NGT compliance audits, and 24-section scientific dossiers establish verifiable empirical facts before conclusions.',
    ecosystemTags: [
      'Environmental Investigations',
      'Forensic GIS & Lab Audits',
      'Public Accountability',
    ],
    locationCaption: 'Pampore–Budgam Pleistocene Karewa Terraces · Field Survey',
    imageSrc: '/images/earth-human-impact/ehii-karewa-land-transformation.jpg',
    imageAlt:
      'Geoscientists conducting total-station and digital terrain field surveys across Kashmir Karewa plateaus',
    focalLandscape: { x: '56%', y: '42%' },
    focalPortrait: { x: '52%', y: '34%' },
    scrimStrength: 0.88,
    readingDurationMs: 7600,
  },
  {
    id: 'educate',
    pillar: 'Educate',
    subtitle: 'Nature Is the Greatest Classroom.',
    formattedHeadline: 'Nature Is the Greatest\u00A0Classroom.',
    desktopHeadlineLines: ['Nature Is the', 'Greatest\u00A0Classroom.'],
    description:
      'Through Adopt-an-Ecosystem school observatories, guided field learning transects, and student citizen-science gauges, classrooms across Kashmir learn directly inside living watersheds and forests.',
    ecosystemTags: [
      'Environmental Education',
      'Adopt-an-Ecosystem Schools',
      'Student Citizen Science',
    ],
    locationCaption: 'Western Himalayan Deodar Forest · Outdoor Classroom Transect',
    imageSrc: '/images/environmental-calendar/calendar-hero-outdoor-classroom.jpg',
    imageAlt:
      'Kashmiri students and field educators measuring conifer sapling growth and GPS coordinates in a forest classroom',
    focalLandscape: { x: '62%', y: '36%' },
    focalPortrait: { x: '56%', y: '30%' },
    scrimStrength: 0.84,
    readingDurationMs: 7600,
  },
  {
    id: 'communicate',
    pillar: 'Communicate',
    subtitle: 'Giving Nature a Voice.',
    formattedHeadline: 'Giving Nature a\u00A0Voice.',
    desktopHeadlineLines: ['Giving Nature', 'a\u00A0Voice.'],
    description:
      'Evidence-led environmental journalism, EcoVoices musical and literary expression, and international webinars and scientific conferences translate Himalayan data into shared public stewardship.',
    ecosystemTags: [
      'Environmental Journalism',
      'Creative Expression (EcoVoices)',
      'Webinars & Conferences',
    ],
    locationCaption: 'Himalayan Science Exchange & EcoVoices Cultural Studio',
    imageSrc: '/images/environmental-calendar/calendar-hero-ecovoices-studio.jpg',
    imageAlt:
      'Researchers, writers, and musicians collaborating beside Kashmir EcoWatch lake telemetry displays overlooking a mountain valley',
    focalLandscape: { x: '66%', y: '40%' },
    focalPortrait: { x: '64%', y: '36%' },
    scrimStrength: 0.8,
    readingDurationMs: 7600,
  },
  {
    id: 'protect',
    pillar: 'Protect',
    subtitle: 'What We Protect Defines Us.',
    formattedHeadline: 'What We Protect Defines\u00A0Us.',
    desktopHeadlineLines: ['What We Protect', 'Defines\u00A0Us.'],
    description:
      'Across 182 protected and bird areas, grassroots conservation NGOs, Green Heroes, CSR fellowships, and mountain communities unite empirical science with enduring habitat restoration and stewardship.',
    ecosystemTags: [
      'Biodiversity Conservation',
      'Community Stewardship',
      '182 Protected & Bird Areas',
    ],
    locationCaption: 'Upper Catchment Reforestation & Stream Quality Stewardship',
    imageSrc: '/images/green-heroes/stewardship-action.jpg',
    imageAlt:
      'Kashmiri elder and youth conservationists planting native conifers and testing mountain stream water beneath snow-clad peaks',
    focalLandscape: { x: '66%', y: '38%' },
    focalPortrait: { x: '62%', y: '35%' },
    scrimStrength: 0.86,
    readingDurationMs: 7600,
  },
  {
    id: 'kashmir-ecowatch',
    pillar: 'Kashmir EcoWatch',
    subtitle: 'Understanding the Himalayas. Protecting Their Future.',
    formattedHeadline: 'Understanding the Himalayas. Protecting Their Future.',
    description:
      'Uniting scientific intelligence, environmental monitoring, research, investigations, education, journalism, creative expression, scientific dialogues, and stewardship across the Western Himalaya.',
    ecosystemTags: [
      'Scientific Intelligence & Research',
      'Education, Journalism & Dialogues',
      'Conservation & Community Stewardship',
    ],
    locationCaption: 'Sheshnag Alpine Glacial Basin · 3,590 m ASL · Western Himalaya',
    imageSrc: '/images/publications/sheshnag-alpine-glacial-lake.jpg',
    imageAlt:
      'Sheshnag turquoise alpine glacial lake surrounded by snow-covered Western Himalayan peaks',
    focalLandscape: { x: '58%', y: '46%' },
    focalPortrait: { x: '54%', y: '44%' },
    scrimStrength: 0.82,
    readingDurationMs: 8000,
    isCulmination: true,
  },
];

export function CinematicIntroduction() {
  const sectionRef = useRef<HTMLElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isInView, setIsInView] = useState(true);
  const [isFocusWithin, setIsFocusWithin] = useState(false);
  const [announcePolite, setAnnouncePolite] = useState(false);
  const [loadedIndices, setLoadedIndices] = useState<Set<number>>(() => new Set([0, 1]));

  // Detect OS prefers-reduced-motion and KEW user accessibility preferences
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const applyMotionPreference = () => {
      let userReduced = false;
      try {
        const raw = localStorage.getItem('kew_user_settings');
        if (raw) {
          const parsed = JSON.parse(raw);
          userReduced = Boolean(parsed?.reducedMotion);
        }
      } catch {
        // Ignore storage read errors
      }
      const shouldReduce = mediaQuery.matches || userReduced;
      setPrefersReducedMotion(shouldReduce);
      if (shouldReduce) {
        setIsPlaying(false);
      }
    };

    applyMotionPreference();
    mediaQuery.addEventListener('change', applyMotionPreference);
    return () => mediaQuery.removeEventListener('change', applyMotionPreference);
  }, []);

  // Pause background timers when scrolled past the cinematic introduction
  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Pre-stage active + next scene on initial paint, then warm remaining scenes during browser idle time
  useEffect(() => {
    const nextIdx = (activeIndex + 1) % CINEMATIC_SCENES.length;
    setLoadedIndices((prev) => {
      if (prev.has(activeIndex) && prev.has(nextIdx)) return prev;
      const updated = new Set(prev);
      updated.add(activeIndex);
      updated.add(nextIdx);
      return updated;
    });
  }, [activeIndex]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoadedIndices(new Set(CINEMATIC_SCENES.map((_, idx) => idx)));
    }, 900);
    return () => window.clearTimeout(timer);
  }, []);

  const activeScene = CINEMATIC_SCENES[activeIndex];

  // Adaptive per-scene reading duration; extends reading comfort on narrow mobile viewports
  useEffect(() => {
    if (!isPlaying || !isInView || isFocusWithin || prefersReducedMotion) return;

    const isCompactReadingViewport =
      typeof window !== 'undefined' && window.innerWidth < 640;
    const effectiveDuration =
      activeScene.readingDurationMs + (isCompactReadingViewport ? 900 : 0);

    const timer = window.setTimeout(() => {
      setAnnouncePolite(false);
      setActiveIndex((prev) => (prev + 1) % CINEMATIC_SCENES.length);
    }, effectiveDuration);

    return () => window.clearTimeout(timer);
  }, [activeIndex, activeScene.readingDurationMs, isPlaying, isInView, isFocusWithin, prefersReducedMotion]);

  const selectScene = useCallback((index: number) => {
    const normalized = (index + CINEMATIC_SCENES.length) % CINEMATIC_SCENES.length;
    setAnnouncePolite(true);
    setActiveIndex(normalized);
  }, []);

  const togglePlayback = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const slidesMeta = useMemo(
    () =>
      CINEMATIC_SCENES.map((scene, idx) => ({
        id: scene.id,
        label: `${String(idx + 1).padStart(2, '0')} · ${scene.pillar} — ${scene.subtitle}`,
        controlsId: `kew-cinematic-scene-${scene.id}`,
      })),
    []
  );

  // Scroll directly to Section 01 (the Environmental Command Center hero)
  const scrollToSection01 = useCallback(() => {
    const currentSection = sectionRef.current;
    const section01 = currentSection?.nextElementSibling as HTMLElement | null;
    if (!section01) return;

    const targetTop = Math.max(0, section01.getBoundingClientRect().top + window.scrollY);
    window.scrollTo({
      top: targetTop,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }, [prefersReducedMotion]);

  const isActivelyAnimating = isPlaying && isInView && !prefersReducedMotion;

  const sceneCustomVars = {
    '--scene-focal-x': activeScene.focalLandscape.x,
    '--scene-focal-y': activeScene.focalLandscape.y,
    '--scene-focal-portrait-x': activeScene.focalPortrait.x,
    '--scene-focal-portrait-y': activeScene.focalPortrait.y,
    '--scene-scrim-strength': String(activeScene.scrimStrength),
  } as React.CSSProperties;

  return (
    <section
      ref={sectionRef}
      id="kew-cinematic-introduction"
      data-kew-dark-surface="true"
      aria-label="Kashmir EcoWatch Institutional Cinematic Introduction"
      style={sceneCustomVars}
      onFocusCapture={() => setIsFocusWithin(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setIsFocusWithin(false);
        }
      }}
      className={styles.cinematicRoot}
    >
      {/* Layer 1: Full-Bleed Western Himalayan Documentary Media Stage (No Audio) */}
      <div className={styles.mediaStage} aria-hidden="true">
        {CINEMATIC_SCENES.map((scene, idx) => {
          const shouldMountMedia = loadedIndices.has(idx);
          const isCurrent = idx === activeIndex;
          if (!shouldMountMedia) return null;

          const perLayerFocalVars = {
            '--scene-focal-x': scene.focalLandscape.x,
            '--scene-focal-y': scene.focalLandscape.y,
            '--scene-focal-portrait-x': scene.focalPortrait.x,
            '--scene-focal-portrait-y': scene.focalPortrait.y,
          } as React.CSSProperties;

          return (
            <div
              key={scene.id}
              style={perLayerFocalVars}
              className={`${styles.sceneMediaLayer} ${
                isCurrent ? styles.sceneMediaLayerActive : ''
              }`}
            >
              <div
                key={isCurrent && !prefersReducedMotion ? `${scene.id}-active` : scene.id}
                className={`${styles.sceneImageMotion} ${
                  isCurrent && isActivelyAnimating ? styles.sceneImageMotionAnimated : ''
                }`}
              >
                <Image
                  src={scene.imageSrc}
                  alt={scene.imageAlt}
                  fill
                  sizes="100vw"
                  quality={85}
                  priority={idx === 0}
                  className={styles.scenePhoto}
                />
              </div>
            </div>
          );
        })}

        <div className={styles.scrimLocalized} />
        <div className={styles.scrimTopHeader} />
        <div className={styles.scrimBottomTransition} />
      </div>

      {/* Layer 2: Viewport-Intelligent Editorial Narrative & Standardized Carousel Controller */}
      <div className={`${styles.foregroundShell} kew-has-hero-rail`}>
        <div className={styles.editorialStage}>
          <div className={styles.brandLockup}>
            <KewBrandIdentity variant="eyebrow" />
          </div>

          <div className={styles.scenesSubgridStage}>
            {CINEMATIC_SCENES.map((scene, idx) => {
              const isCurrent = idx === activeIndex;
              return (
                <div
                  key={scene.id}
                  id={isCurrent ? `kew-cinematic-scene-${scene.id}` : undefined}
                  role={isCurrent ? 'tabpanel' : undefined}
                  aria-labelledby={isCurrent ? `kew-cc-tab-${scene.id}` : undefined}
                  aria-live={isCurrent && announcePolite ? 'polite' : 'off'}
                  aria-hidden={!isCurrent ? true : undefined}
                  className={`${styles.sceneSlideRowGroup} ${
                    isCurrent
                      ? `${styles.sceneSlideActive} ${
                          !prefersReducedMotion ? styles.narrativeFrameAnimated : ''
                        }`
                      : styles.sceneSlideInactive
                  }`}
                >
                  <span className={styles.sceneCategoryHeading}>{scene.pillar}</span>

                  {scene.isCulmination ? (
                    <h2 className={styles.sceneHeadline}>
                      <span className={styles.headlineStatementLine}>
                        Understanding the{'\u00A0'}Himalayas.
                      </span>
                      <span className={`${styles.headlineStatementLine} ${styles.headlineAccent}`}>
                        Protecting Their{'\u00A0'}Future.
                      </span>
                    </h2>
                  ) : scene.desktopHeadlineLines ? (
                    <h2 className={styles.sceneHeadline}>
                      <span className={styles.headlineDesktopLine}>
                        {scene.desktopHeadlineLines[0]}{' '}
                      </span>
                      <span className={styles.headlineDesktopLine}>
                        {scene.desktopHeadlineLines[1]}
                      </span>
                    </h2>
                  ) : (
                    <h2 className={styles.sceneHeadline}>{scene.formattedHeadline}</h2>
                  )}

                  <p className={styles.sceneDescription}>{scene.description}</p>

                  <div className={styles.capabilityRow} aria-label={isCurrent ? 'Capabilities' : undefined}>
                    {scene.ecosystemTags.map((tag) => (
                      <span key={tag} className={styles.capabilityLabel}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className={styles.ctaRow}>
                    <button
                      type="button"
                      tabIndex={isCurrent ? 0 : -1}
                      onClick={scrollToSection01}
                      className={styles.primaryScrollCta}
                    >
                      <span>Explore Kashmir EcoWatch</span>
                      <ArrowDown aria-hidden="true" />
                    </button>

                    <div className={styles.locationCaption}>
                      <Compass aria-hidden="true" />
                      <span>{scene.locationCaption}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Standardized KEW Cinematic Carousel Controller (Right vertical rail >=768px · Compact inline <768px) */}
        <CinematicCarouselController
          slideCount={CINEMATIC_SCENES.length}
          currentIndex={activeIndex}
          onSelectSlide={selectScene}
          isPaused={!isPlaying}
          onTogglePause={togglePlayback}
          slidesMeta={slidesMeta}
          ariaLabel="Cinematic introduction scenes"
          mobilePlacement="inline"
        />
      </div>
    </section>
  );
}
