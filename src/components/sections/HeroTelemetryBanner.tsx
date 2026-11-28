'use client';

import React from 'react';
import { ImmersiveHero } from '@/components/sections/ImmersiveHero';
import type { BaselineTelemetryData } from '@/lib/telemetry/getBaselineTelemetry';

export interface HeroTelemetryBannerProps {
  initialData: BaselineTelemetryData;
}

export function HeroTelemetryBanner({ initialData }: HeroTelemetryBannerProps) {
  return <ImmersiveHero initialData={initialData} />;
}
