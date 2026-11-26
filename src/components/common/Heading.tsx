'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BackgroundCarousel } from '@/components/ui/BackgroundCarousel';
import { KewBrandIdentity, hasEmbeddedKewBrandIdentity } from '@/components/common/KewBrandIdentity';
import { DismissibleHeroOverlay } from '@/components/common/DismissibleHeroOverlay';
import { Button } from '@/components/ui/Button';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbJsonLd } from '@/lib/seo/structured-data';
import {
  getWebinarRouteHeroImages,
  WEBINAR_HERO_OVERLAY_CLASS,
  WEBINAR_HERO_SLIDE_INTERVAL_MS,
  type WebinarHeroSlide,
} from '@/data/webinar-hero-carousel';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface HeadingProps {
  title: React.ReactNode;
  subtitle: string;
  icon?: React.ReactNode;
  label?: string;
  badge?: React.ReactNode;
  images?: string[];
  /** Optional synchronized multi-scene hero slides (synchronizes background image, eyebrow, headline, description & CTAs) */
  slides?: readonly WebinarHeroSlide[];
  /** Optional custom slide interval in milliseconds */
  carouselIntervalMs?: number;
  overlayClassName?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: React.ReactNode;
  gridOverlay?: boolean;
  className?: string;
  contentClassName?: string;
  rightContent?: React.ReactNode;
  featuredImage?: string;
  featuredImageAlt?: string;
  showBrandIdentity?: boolean;
  brandBadgeText?: string;
  brandIdentityLabel?: string;
  visualAttribution?: string;
  overlayRestoreLabel?: string;
  overlayPanelId?: string;
}

export function Heading({
  title,
  subtitle,
  icon,
  label,
  badge,
  images,
  slides,
  carouselIntervalMs,
  overlayClassName,
  breadcrumbs,
  actions,
  gridOverlay = false,
  className,
  contentClassName,
  rightContent,
  featuredImage,
  featuredImageAlt,
  showBrandIdentity = true,
  brandBadgeText,
  brandIdentityLabel,
  visualAttribution,
  overlayRestoreLabel,
  overlayPanelId,
}: HeadingProps) {
  const pathname = usePathname();
  const isWebinarSurface = Boolean(pathname?.startsWith('/webinars'));
  const hasSyncedSlides = Boolean(slides && slides.length > 0);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isCtaInteracting, setIsCtaInteracting] = useState(false);

  const resolvedImages = hasSyncedSlides
    ? slides!.map((s) => s.imagePath)
    : images && images.length > 0
    ? images
    : isWebinarSurface
    ? getWebinarRouteHeroImages(pathname)
    : ['/images/protected-network.png'];

  const resolvedOverlayClassName =
    overlayClassName !== undefined
      ? overlayClassName
      : isWebinarSurface
      ? WEBINAR_HERO_OVERLAY_CLASS
      : undefined;

  const resolvedIntervalMs =
    carouselIntervalMs ?? (isWebinarSurface ? WEBINAR_HERO_SLIDE_INTERVAL_MS : 5000);

  const isStringTitle = typeof title === 'string';
  const embedsBrand = !isStringTitle && hasEmbeddedKewBrandIdentity(title);

  const uniqueSlideCheck = Array.from(new Set((resolvedImages || []).filter(Boolean)));
  const hasMultipleHeroSlides = uniqueSlideCheck.length > 1;
  const syncedSlidesMeta = hasSyncedSlides
    ? slides!.map((s, idx) => ({
        id: s.id,
        label: `${String(idx + 1).padStart(2, '0')} · ${s.eyebrow} — ${s.headline}`,
      }))
    : undefined;

  return (
    <div
      data-kew-dark-surface="true"
      className={cn(
        'kew-heading-surface relative bg-slate-950 w-full max-w-full overflow-x-clip text-slate-100',
        className
      )}
    >
      {breadcrumbs && breadcrumbs.length > 0 && (
        <JsonLd data={buildBreadcrumbJsonLd(breadcrumbs)} />
      )}

      <BackgroundCarousel
        images={resolvedImages}
        interval={resolvedIntervalMs}
        overlayClassName={resolvedOverlayClassName}
        activeIndex={hasSyncedSlides ? activeSlideIndex : undefined}
        onActiveIndexChange={hasSyncedSlides ? setActiveSlideIndex : undefined}
        externalPaused={hasSyncedSlides ? isCtaInteracting : false}
        slidesMeta={syncedSlidesMeta}
      />

      {gridOverlay && <div className="absolute inset-0 bg-grid pointer-events-none" />}

      {/* Keep visible conceptual visualization badges off webinar heroes; preserve for non-webinar modules when set */}
      {!isWebinarSurface && visualAttribution && (
        <div
          aria-label="Visual asset disclosure"
          className={cn(
            'hidden md:inline-flex items-center absolute z-20 bottom-2 px-2.5 py-0.5 rounded bg-slate-950/75 border border-white/10 text-[10px] font-mono text-slate-400/90 pointer-events-none select-none',
            hasMultipleHeroSlides ? 'right-14 lg:right-16' : 'right-4 lg:right-6'
          )}
        >
          {visualAttribution}
        </div>
      )}

      <div
        className={cn(
          'kew-heading-inner relative z-10 page-content__inner w-full max-w-full min-w-0',
          hasMultipleHeroSlides && 'kew-has-hero-rail',
          contentClassName
        )}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8 lg:gap-12 3xl:gap-16 w-full max-w-full min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="kew-heading-scope w-full flex-1 min-w-0"
          >
            {breadcrumbs && breadcrumbs.length > 0 && (
              <nav
                aria-label="Breadcrumb"
                className="flex flex-wrap items-center gap-1.5 text-xs md:text-sm text-slate-300 mb-3 sm:mb-6 min-w-0"
              >
                {breadcrumbs.map((crumb, idx) => (
                  <React.Fragment key={idx}>
                    {idx > 0 && (
                      <span className="text-slate-400/80" aria-hidden="true">
                        /
                      </span>
                    )}
                    {crumb.href ? (
                      <Link
                        href={crumb.href}
                        className="hover:text-white transition-colors break-words text-left"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-white font-medium break-words" aria-current="page">
                        {crumb.label}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </nav>
            )}

            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 min-w-0 flex-wrap">
              {icon}
              {badge ? (
                badge
              ) : label ? (
                <span className="kew-hero-eyebrow text-xs sm:text-sm font-semibold uppercase tracking-widest text-slate-300 break-words">
                  {label}
                </span>
              ) : null}
            </div>

            {hasSyncedSlides ? (
              <>
                {/* Stationary Institutional Brand Lockup (`KEW | WESTERN HIMALAYAN` on one horizontal line) */}
                {showBrandIdentity && (
                  <div
                    data-kew-stationary-brand="true"
                    className="mb-2 sm:mb-3"
                  >
                    <KewBrandIdentity
                      badgeText={brandBadgeText}
                      identityLabel={brandIdentityLabel}
                      variant="hero"
                    />
                  </div>
                )}

                {/* Synchronized 9-Scene Content Stack (CSS Grid reserves tallest natural height = 0px vertical layout shift) */}
                <div
                  data-kew-synced-slides="true"
                  aria-live="polite"
                  aria-atomic="true"
                  className="grid grid-cols-1 w-full min-w-0"
                >
                  {slides!.map((slide, idx) => {
                    const isActive = idx === activeSlideIndex;
                    const headlineClasses =
                      'w-full max-w-full text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] 3xl:text-[3.75rem] font-black leading-[1.14] tracking-tight pb-1.5 whitespace-normal break-words min-w-0 drop-shadow-[0_2px_12px_rgba(2,6,23,0.85)]';

                    return (
                      <div
                        key={slide.id}
                        data-hero-scene-id={slide.id}
                        data-hero-scene-active={isActive ? 'true' : 'false'}
                        aria-hidden={!isActive ? true : undefined}
                        inert={!isActive ? true : undefined}
                        className={cn(
                          'col-start-1 row-start-1 flex flex-col justify-between min-w-0 transition-opacity duration-1000 ease-in-out motion-reduce:transition-none',
                          isActive
                            ? 'opacity-100 visible z-10 pointer-events-auto'
                            : 'opacity-0 invisible z-0 pointer-events-none select-none'
                        )}
                      >
                        <div className="space-y-2.5 sm:space-y-3.5 min-w-0">
                          <div
                            data-hero-scene-eyebrow="true"
                            className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.16em] text-emerald-300 drop-shadow-[0_1px_6px_rgba(2,6,23,0.85)]"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" aria-hidden="true" />
                            <span>{slide.eyebrow}</span>
                          </div>

                          {isActive ? (
                            <h1 className={headlineClasses}>
                              <span className="sr-only">
                                {brandBadgeText || 'KEW'} {brandIdentityLabel || 'Western Himalayan'} —{' '}
                              </span>
                              <span className="kew-hero-headline-gradient bg-gradient-to-r from-emerald-400 via-teal-300 to-teal-200 bg-clip-text text-transparent">
                                {slide.headline}
                              </span>
                            </h1>
                          ) : (
                            <div className={headlineClasses}>
                              <span className="kew-hero-headline-gradient bg-gradient-to-r from-emerald-400 via-teal-300 to-teal-200 bg-clip-text text-transparent">
                                {slide.headline}
                              </span>
                            </div>
                          )}

                          <p
                            data-hero-scene-description="true"
                            className="kew-hero-description text-xs sm:text-sm md:text-base lg:text-[1.05rem] 3xl:text-lg text-slate-200 leading-relaxed max-w-[70ch] break-words min-w-0"
                          >
                            {slide.description}
                          </p>
                        </div>

                        {/* Contextual CTAs — identical placement & dimensions across all 9 scenes; pauses auto-advance while interacting */}
                        <div
                          data-hero-scene-ctas="true"
                          onMouseEnter={() => setIsCtaInteracting(true)}
                          onMouseLeave={() => setIsCtaInteracting(false)}
                          onFocusCapture={() => setIsCtaInteracting(true)}
                          onBlurCapture={(e) => {
                            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                              setIsCtaInteracting(false);
                            }
                          }}
                          className="pt-5 sm:pt-6 pb-2 flex flex-col sm:flex-row items-stretch sm:items-center flex-wrap gap-2.5 sm:gap-3 w-full min-w-0 [&_a]:w-full sm:[&_a]:w-auto [&_button]:w-full sm:[&_button]:w-auto"
                        >
                          <Link href={slide.primaryCta.href} tabIndex={isActive ? 0 : -1}>
                            <Button
                              size="sm"
                              tabIndex={-1}
                              className="h-10 px-5 bg-emerald-600 hover:bg-emerald-500 font-bold text-white shadow-lg shadow-emerald-950/50 inline-flex items-center justify-center gap-2"
                            >
                              <span>{slide.primaryCta.label}</span>
                              {slide.primaryCta.badge && (
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-400/20 text-amber-200 border border-amber-300/40">
                                  {slide.primaryCta.badge}
                                </span>
                              )}
                              <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                            </Button>
                          </Link>

                          {slide.secondaryCta && (
                            <Link href={slide.secondaryCta.href} tabIndex={isActive ? 0 : -1}>
                              <Button
                                size="sm"
                                variant="outline"
                                tabIndex={-1}
                                className="h-10 px-5 border-slate-200/35 bg-[#080E1C]/80 hover:bg-slate-900/90 text-white font-bold backdrop-blur-sm inline-flex items-center justify-center gap-1.5"
                              >
                                <span>{slide.secondaryCta.label}</span>
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                {showBrandIdentity && !isStringTitle && !embedsBrand && (
                  <div className="kew-heading-brand-eyebrow mb-2.5 sm:mb-3">
                    <KewBrandIdentity
                      badgeText={brandBadgeText}
                      identityLabel={brandIdentityLabel}
                      variant="eyebrow"
                    />
                  </div>
                )}

                <h1 className="w-full max-w-full text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl 3xl:text-[4rem] 4xl:text-[4.5rem] font-black text-white mb-3 sm:mb-6 leading-[1.14] tracking-tight overflow-visible pb-1.5 sm:pb-2 whitespace-normal break-words min-w-0 [&_.whitespace-nowrap]:!whitespace-normal [&_.whitespace-nowrap]:break-words">
                  {isStringTitle ? (
                    (() => {
                      const moduleName = (title as string)
                        .replace(/^Western Himalayan\s*/i, '')
                        .trim();
                      return (
                        <>
                          {showBrandIdentity && (
                            <>
                              <KewBrandIdentity
                                badgeText={brandBadgeText}
                                identityLabel={brandIdentityLabel}
                                variant="hero"
                              />
                              <span className="sr-only">{' '}</span>
                            </>
                          )}
                          <span className="kew-hero-headline-gradient block w-full leading-[1.14] pb-1.5 sm:pb-2 overflow-visible whitespace-normal break-words bg-gradient-to-r from-emerald-400 via-teal-300 to-teal-200 bg-clip-text text-transparent">
                            {moduleName}
                          </span>
                        </>
                      );
                    })()
                  ) : (
                    title
                  )}
                </h1>

                {subtitle && (
                  <p className="kew-hero-description text-xs sm:text-sm md:text-base lg:text-lg 3xl:text-xl mb-6 sm:mb-8 leading-relaxed max-w-[72ch] 3xl:max-w-[76ch] break-words min-w-0 text-slate-200">
                    {subtitle}
                  </p>
                )}

                {actions && (
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center flex-wrap gap-2.5 sm:gap-3 pb-3 sm:pb-2 w-full min-w-0 [&_button]:w-full sm:[&_button]:w-auto [&_a]:w-full sm:[&_a]:w-auto">
                    {actions}
                  </div>
                )}
              </>
            )}
          </motion.div>

          {(rightContent || featuredImage) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="w-full lg:max-w-md xl:max-w-lg 3xl:max-w-xl 4xl:max-w-2xl shrink-0"
            >
              <DismissibleHeroOverlay
                panelId={overlayPanelId}
                restoreLabel={overlayRestoreLabel}
              >
                {rightContent ? (
                  rightContent
                ) : (
                  <div className="relative rounded-lg overflow-hidden border border-emerald-500/30 shadow-2xl bg-slate-900/80 backdrop-blur-md p-2 group">
                    <div className="relative h-64 sm:h-72 w-full rounded-lg overflow-hidden">
                      <img
                        src={featuredImage}
                        alt={featuredImageAlt || 'Hero Section Visual'}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    </div>
                  </div>
                )}
              </DismissibleHeroOverlay>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
