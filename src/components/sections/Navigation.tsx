'use client';

import React from 'react';
import { PremiumStickyHeader } from '@/components/sections/PremiumStickyHeader';

/**
 * Compatibility alias delegating directly to PremiumStickyHeader
 * so global navigation configuration is never duplicated.
 */
export function Navigation() {
  return <PremiumStickyHeader />;
}
