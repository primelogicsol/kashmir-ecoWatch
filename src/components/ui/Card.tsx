import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export function Card({ children, className, hover = true, padding = 'md', onClick }: CardProps) {
  const paddingStyles = {
    none: '',
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-5 md:p-6',
    lg: 'p-5 sm:p-6 md:p-7',
  };

  const handleKeyDown = onClick
    ? (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }
    : undefined;

  return (
    <div
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={cn(
        'kew-card backdrop-blur-sm rounded-lg min-w-0 max-w-full',
        'border border-slate-200 dark:border-white/10',
        'bg-white dark:bg-slate-900/85 text-slate-900 dark:text-slate-100',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
        paddingStyles[padding],
        hover && 'card-hover',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return <div className={cn('mb-3 min-w-0', className)}>{children}</div>;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h3 className={cn('kew-card-title text-lg font-bold text-slate-900 dark:text-white', className)}>
      {children}
    </h3>
  );
}

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={cn('kew-card-desc text-sm text-slate-600 dark:text-slate-300 mt-1', className)}>
      {children}
    </p>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn('min-w-0', className)}>{children}</div>;
}

/* ==========================================================================
   KEW UNIVERSAL CARD DESIGN SYSTEM — STANDARDIZED CARD VARIANTS
   Mandatory Vertical Hierarchy:
     1. ICON (top-left, consistent container) + optional top-right badge/actions
     2. TITLE (below icon, 100% horizontal width, natural word wrapping)
     3. KPI / METRIC (below title, where applicable)
     4. DESCRIPTION (below KPI or title, naturally wrapping)
     5. BODY / METADATA (optional contextual chips, breakdowns, or stats)
     6. CTA (near bottom via mt-auto flex column)
   ========================================================================== */

export type KewCardVariant =
  | 'feature'
  | 'module'
  | 'statistic'
  | 'directory'
  | 'navigation'
  | 'carousel';

export interface UniversalCardProps {
  variant?: KewCardVariant;
  /** Top-left icon ReactNode (e.g. `<Shield className="w-5 h-5 text-emerald-400" />`) */
  icon?: React.ReactNode;
  /** Optional custom styling for the top-left icon container */
  iconBoxClassName?: string;
  /** Optional badge or status pill rendered at top-right of the icon row */
  badge?: React.ReactNode;
  /** Optional extra quick-action controls rendered at top-right */
  headerActions?: React.ReactNode;
  /** Optional small uppercase category/eyebrow above the title */
  eyebrow?: React.ReactNode;
  /** Full-width card heading below the icon */
  title: React.ReactNode;
  /** Heading HTML tag — defaults to 'h3' */
  titleAs?: 'h2' | 'h3' | 'h4';
  titleClassName?: string;
  /** Optional subtitle (e.g. scientific name, district/basin subtitle) directly under title */
  subtitle?: React.ReactNode;
  /** Primary KPI numeral or formatted metric value below title */
  kpi?: React.ReactNode;
  /** Unit or label beside KPI numeral */
  kpiUnit?: React.ReactNode;
  /** Optional trend/delta pill beside or below KPI */
  kpiMeta?: React.ReactNode;
  /** Natural-wrapping card description */
  description?: React.ReactNode;
  descriptionClassName?: string;
  /** Optional structured body content (chips, mini-metrics, attributes) between description and CTA */
  children?: React.ReactNode;
  /** Text label for the standardized bottom CTA */
  ctaLabel?: React.ReactNode;
  /** Custom icon for the bottom CTA (defaults to ArrowRight) */
  ctaIcon?: React.ReactNode;
  /** Custom full footer/CTA node when multiple buttons or custom actions are needed */
  footer?: React.ReactNode;
  /** Navigation link — wraps the card in a Next.js `<Link>` */
  href?: string;
  /** Click handler when card triggers state/drawer/router action */
  onClick?: () => void;
  /** Accessible selected state */
  selected?: boolean;
  className?: string;
}

export function UniversalCard({
  variant = 'module',
  icon,
  iconBoxClassName,
  badge,
  headerActions,
  eyebrow,
  title,
  titleAs: TitleTag = 'h3',
  titleClassName,
  subtitle,
  kpi,
  kpiUnit,
  kpiMeta,
  description,
  descriptionClassName,
  children,
  ctaLabel,
  ctaIcon,
  footer,
  href,
  onClick,
  selected = false,
  className,
}: UniversalCardProps) {
  const isInteractive = Boolean(href || onClick);

  const handleKeyDown =
    !href && onClick
      ? (e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }
      : undefined;

  const inner = (
    <div
      data-kew-card-variant={variant}
      data-selected={selected ? 'true' : undefined}
      onClick={!href ? onClick : undefined}
      onKeyDown={handleKeyDown}
      role={!href && onClick ? 'button' : undefined}
      tabIndex={!href && onClick ? 0 : undefined}
      className={cn(
        'kew-card-shell group',
        isInteractive && 'kew-card-shell--interactive',
        selected && 'kew-card-shell--selected',
        variant === 'statistic' && 'gap-2 p-3.5 sm:p-4',
        className
      )}
    >
      {/* 1. ICON (top-left) + optional top-right status/category badge */}
      {(icon || badge || headerActions) && (
        <div className="kew-card-top-row">
          {icon ? (
            <div className={cn('kew-card-icon-box', iconBoxClassName)}>{icon}</div>
          ) : (
            <span />
          )}
          {(badge || headerActions) && (
            <div className="flex flex-wrap items-center justify-end gap-1.5 min-w-0">
              {badge}
              {headerActions}
            </div>
          )}
        </div>
      )}

      {/* 2. TITLE — full horizontal width below icon */}
      <div className="w-full min-w-0 space-y-1">
        {eyebrow && (
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 break-words">
            {eyebrow}
          </div>
        )}
        <TitleTag
          className={cn(
            'kew-card-title',
            variant === 'statistic' && 'text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-300',
            titleClassName
          )}
        >
          {title}
        </TitleTag>
        {subtitle && (
          <div className="text-xs text-slate-400 break-words leading-snug">{subtitle}</div>
        )}
      </div>

      {/* 3. KPI / METRIC — below title */}
      {(kpi !== undefined && kpi !== null) && (
        <div className="kew-card-kpi">
          <span className="kew-card-kpi-value">
            {typeof kpi === 'number' ? kpi.toLocaleString() : kpi}
          </span>
          {kpiUnit && <span className="kew-card-kpi-unit">{kpiUnit}</span>}
          {kpiMeta && <div className="w-full text-xs text-slate-400 mt-0.5">{kpiMeta}</div>}
        </div>
      )}

      {/* 4. DESCRIPTION — naturally wrapping */}
      {description && (
        <p className={cn('kew-card-desc', descriptionClassName)}>{description}</p>
      )}

      {/* 5. OPTIONAL METADATA / BODY */}
      {children && <div className="kew-card-body">{children}</div>}

      {/* 6. CTA — consistently anchored near bottom */}
      {footer ? (
        <div className="mt-auto pt-3 border-t border-white/10 w-full min-w-0">{footer}</div>
      ) : ctaLabel ? (
        <div className="kew-card-cta">
          <span className="break-words">{ctaLabel}</span>
          {ctaIcon ?? (
            <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
          )}
        </div>
      ) : null}
    </div>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className="block h-full min-w-0 no-underline group focus:outline-none">
        {inner}
      </Link>
    );
  }

  return inner;
}

export function FeatureCard(props: Omit<UniversalCardProps, 'variant'>) {
  return <UniversalCard {...props} variant="feature" />;
}

export function ModuleCard(props: Omit<UniversalCardProps, 'variant'>) {
  return <UniversalCard {...props} variant="module" />;
}

export function StatisticCard(props: Omit<UniversalCardProps, 'variant'>) {
  return <UniversalCard {...props} variant="statistic" />;
}

export function DirectoryCard(props: Omit<UniversalCardProps, 'variant'>) {
  return <UniversalCard {...props} variant="directory" />;
}

export function NavigationCard(props: Omit<UniversalCardProps, 'variant'>) {
  return <UniversalCard {...props} variant="navigation" />;
}

export function CarouselCard(props: Omit<UniversalCardProps, 'variant'>) {
  return <UniversalCard {...props} variant="carousel" />;
}
