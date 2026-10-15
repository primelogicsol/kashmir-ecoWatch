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
    <div className={cn('relative bg-slate-900/40 overflow-visible', className)}>
      <BackgroundCarousel images={images} overlayClassName={overlayClassName} />

      {gridOverlay && (
        <div className="absolute inset-0 bg-grid" />
      )}

      <div className={cn('relative pt-20 sm:pt-24 md:pt-28 lg:pt-36 pb-6 sm:pb-10 md:pb-14 lg:pb-20 container mx-auto px-6', contentClassName)}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn('max-w-4xl', (rightContent || featuredImage) && 'max-w-3xl flex-1')}
          >
            {breadcrumbs && breadcrumbs.length > 0 && (
              <nav className="flex items-center gap-1 text-xs md:text-sm text-slate-400 mb-6">
                {breadcrumbs.map((crumb, idx) => (
                  <React.Fragment key={idx}>
                    {idx > 0 && <span className="text-slate-600">/</span>}
                    {crumb.href ? (
                      <button
                        onClick={() => router.push(crumb.href)}
                        className="hover:text-white transition-colors"
                      >
                        {crumb.label}
                      </button>
                    ) : (
                      <span className="text-white font-medium">{crumb.label}</span>
                    )}
                  </React.Fragment>
                ))}
              </nav>
            )}

            <div className="flex items-center gap-3 mb-6">
              {icon}
              {badge ? badge : label ? (
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-slate-400">
                  {label}
                </span>
              ) : null}
            </div>

            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-6xl font-black text-white mb-4 sm:mb-6 leading-[1.12] tracking-tight overflow-visible pb-2">
              {typeof title === 'string' ? (
                (() => {
                  const moduleName = title.replace(/^Western Himalayan\s*/i, '').trim();
                  return (
                    <>
                      <span className="block leading-[1.12] overflow-visible whitespace-nowrap pb-2">Western Himalayan</span>
                      <span className="block leading-[1.12] pb-2 overflow-visible whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
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
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-400 mb-8 leading-relaxed max-w-3xl line-clamp-3">
                {subtitle}
              </p>
            )}

            {actions && (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center flex-wrap gap-3 pb-4 sm:pb-2 [&_button]:w-full sm:[&_button]:w-auto [&_a]:w-full sm:[&_a]:w-auto">
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
                <div className="relative rounded-2xl overflow-hidden border border-emerald-500/30 shadow-2xl bg-slate-900/80 backdrop-blur-md p-2 group">
                  <div className="relative h-64 sm:h-72 w-full rounded-xl overflow-hidden">
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
