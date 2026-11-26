import React from 'react';
import { cn } from '@/lib/utils';

export type KewContainerVariant =
  | 'cinematic'
  | 'standard'
  | 'wide'
  | 'dashboard'
  | 'gis'
  | 'report'
  | 'reading'
  | 'admin';

export const KEW_CONTAINER_CLASSES: Record<KewContainerVariant, string> = {
  cinematic: 'kew-container-cinematic',
  standard: 'kew-container-standard',
  wide: 'kew-container-wide',
  dashboard: 'kew-container-dashboard',
  gis: 'kew-container-gis',
  report: 'kew-container-report',
  reading: 'kew-container-reading',
  admin: 'kew-container-admin',
};

export interface KewContainerProps extends React.HTMLAttributes<HTMLElement> {
  variant?: KewContainerVariant;
  as?: 'div' | 'section' | 'main' | 'article' | 'header' | 'footer';
}

/**
 * Centralized KEW Screen-Aware Layout Container.
 * Harmonizes horizontal keylines, fluid gutters, and screen utilization across
 * mobile, tablet, laptop, vertical desktop, QHD, ultrawide, and 4K viewports.
 */
export function KewContainer({
  variant = 'standard',
  as: Component = 'div',
  className,
  children,
  ...props
}: KewContainerProps) {
  return (
    <Component
      data-kew-container={variant}
      className={cn(KEW_CONTAINER_CLASSES[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
