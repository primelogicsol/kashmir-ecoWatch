'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { BackgroundCarousel } from '@/components/ui/BackgroundCarousel';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface HeadingProps {
  title: React.ReactNode;
  subtitle: string;
  icon: React.ReactNode;
  label?: string;
  badge?: React.ReactNode;
  images?: string[];
  overlayClassName?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: React.ReactNode;
  gridOverlay?: boolean;
  className?: string;
  contentClassName?: string;
  rightContent?: React.ReactNode;
  featuredImage?: string;
  featuredImageAlt?: string;
}

export function Heading({
  title,
  subtitle,
  icon,
  label,
  badge,
  images = ['/images/protected-network.png'],
  overlayClassName,
  breadcrumbs,
  actions,
  gridOverlay = false,
  className,
  contentClassName,
  rightContent,
  featuredImage,
  featuredImageAlt,
}: HeadingProps) {
  const router = useRouter();

  return (
    <div className={cn('relative bg-slate-900/40 w-full max-w-full overflow-hidden sm:overflow-visible', className)}>
      <BackgroundCarousel images={images} overlayClassName={overlayClassName} />

      {gridOverlay && (
        <div className="absolute inset-0 bg-grid" />
      )}

      <div className={cn('relative pt-16 sm:pt-24 md:pt-28 lg:pt-36 pb-20 sm:pb-24 md:pb-24 lg:pb-28 page-content__inner w-full max-w-full min-w-0', contentClassName)}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8 lg:gap-12 w-full max-w-full min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn('w-full max-w-4xl min-w-0', (rightContent || featuredImage) && 'max-w-3xl flex-1')}
          >
            {breadcrumbs && breadcrumbs.length > 0 && (
              <nav className="flex flex-wrap items-center gap-1.5 text-xs md:text-sm text-slate-400 mb-3 sm:mb-6 min-w-0">
                {breadcrumbs.map((crumb, idx) => (
                  <React.Fragment key={idx}>
                    {idx > 0 && <span className="text-slate-600">/</span>}
                    {crumb.href ? (
                      <button
                        onClick={() => router.push(crumb.href)}
                        className="hover:text-white transition-colors break-words text-left"
                      >
                        {crumb.label}
                      </button>
                    ) : (
                      <span className="text-white font-medium break-words">{crumb.label}</span>
                    )}
                  </React.Fragment>
                ))}
              </nav>
            )}

            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 min-w-0 flex-wrap">
              {icon}
              {badge ? badge : label ? (
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-slate-400 break-words">
                  {label}
                </span>
              ) : null}
            </div>

            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-6 leading-[1.12] tracking-tight overflow-visible pb-1 sm:pb-2 break-words min-w-0 max-sm:[&_.whitespace-nowrap]:!whitespace-normal [&_.whitespace-nowrap]:break-words sm:[&_.whitespace-nowrap]:whitespace-normal md:[&_.whitespace-nowrap]:whitespace-nowrap [&_.word-keep]:!whitespace-nowrap [&_.word-keep]:![word-break:keep-all] [&_.word-keep]:![overflow-wrap:normal]">
              {typeof title === 'string' ? (
                (() => {
                  const moduleName = title.replace(/^Western Himalayan\s*/i, '').trim();
                  return (
                    <>
                      <span className="block leading-[1.12] overflow-visible break-words pb-1 sm:pb-2">Western Himalayan</span>
                      <span className="block leading-[1.12] pb-1 sm:pb-2 overflow-visible break-words bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
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
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-400 mb-6 sm:mb-8 leading-relaxed max-w-3xl break-words min-w-0">
                {subtitle}
              </p>
            )}

            {actions && (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center flex-wrap gap-2.5 sm:gap-3 pb-3 sm:pb-2 w-full min-w-0 [&_button]:w-full sm:[&_button]:w-auto [&_a]:w-full sm:[&_a]:w-auto">
                {actions}
              </div>
            )}
          </motion.div>

          {(rightContent || featuredImage) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="w-full lg:max-w-md shrink-0"
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
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
