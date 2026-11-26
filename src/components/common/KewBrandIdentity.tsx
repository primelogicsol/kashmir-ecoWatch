'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface KewBrandIdentityProps {
  /** Primary institutional badge text — defaults to 'KEW' */
  badgeText?: string;
  /** Regional or recurring identity label alongside the badge — defaults to 'Western Himalayan' */
  identityLabel?: string;
  /**
   * 'hero': Inside an <h1> stack — identical badge & label typography on mobile (<768px),
   *         preserving full H1 display scale on desktop (>=768px).
   * 'eyebrow': Standalone brand lockup above custom <h1> titles — compact matched typography
   *            across mobile and desktop.
   */
  variant?: 'hero' | 'eyebrow';
  className?: string;
}

/**
 * Canonical KEW Institutional Brand Identity Lockup (`KEW | WESTERN HIMALAYAN`)
 *
 * Enforces the global KEW institutional identity standard across mobile, tablet, desktop & 4K:
 * 1. `KEW` badge and `WESTERN HIMALAYAN` render on a single horizontal line aligned on the same baseline.
 * 2. Identical font-family, font-size, font-weight, line-height, letter-spacing, and uppercase cap-height via shared CSS tokens.
 * 3. KEW emerald badge preserved; `WESTERN HIMALAYAN` renders in Pure White (#FFFFFF) without badge background.
 */
export function KewBrandIdentity({
  badgeText = 'KEW',
  identityLabel = 'Western Himalayan',
  variant = 'hero',
  className,
}: KewBrandIdentityProps) {
  return (
    <span
      data-kew-brand-identity={variant}
      className={cn(
        'kew-brand-identity',
        variant === 'hero' ? 'kew-brand-identity--hero' : 'kew-brand-identity--eyebrow',
        className
      )}
    >
      <span className="kew-brand-badge">{badgeText}</span>
      <span className="sr-only">{' '}</span>
      <span className="kew-brand-region">{identityLabel}</span>
    </span>
  );
}

KewBrandIdentity.displayName = 'KewBrandIdentity';
(KewBrandIdentity as unknown as { __isKewBrandIdentity?: boolean }).__isKewBrandIdentity = true;

function isKewBrandComponentType(type: unknown): boolean {
  if (!type) return false;
  if (type === KewBrandIdentity) return true;
  if (typeof type === 'function' || typeof type === 'object') {
    const candidate = type as {
      __isKewBrandIdentity?: boolean;
      displayName?: string;
      name?: string;
      type?: unknown;
      render?: unknown;
    };
    if (
      candidate.__isKewBrandIdentity ||
      candidate.displayName === 'KewBrandIdentity' ||
      candidate.name === 'KewBrandIdentity'
    ) {
      return true;
    }
    if (candidate.type && candidate.type !== type && isKewBrandComponentType(candidate.type)) {
      return true;
    }
    if (candidate.render && candidate.render !== type && isKewBrandComponentType(candidate.render)) {
      return true;
    }
  }
  return false;
}

/**
 * Recursively inspects a ReactNode tree to determine whether `<KewBrandIdentity />`
 * is already rendered inside a custom `title` prop, including across HMR/RSC wrappers.
 */
export function hasEmbeddedKewBrandIdentity(node: React.ReactNode): boolean {
  if (!node) return false;
  if (Array.isArray(node)) {
    return node.some((child) => hasEmbeddedKewBrandIdentity(child));
  }
  if (React.isValidElement(node)) {
    if (isKewBrandComponentType(node.type)) {
      return true;
    }
    const props = node.props as { children?: React.ReactNode; 'data-kew-brand-identity'?: string };
    if (props?.['data-kew-brand-identity']) return true;
    if (props?.children) {
      return hasEmbeddedKewBrandIdentity(props.children);
    }
  }
  return false;
}
