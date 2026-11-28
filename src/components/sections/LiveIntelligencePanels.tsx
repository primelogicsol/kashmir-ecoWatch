'use client';

import React from 'react';
import { ExpandableLivePanels } from '@/components/sections/ExpandableLivePanels';
import type { BaselineTelemetryData } from '@/lib/telemetry/getBaselineTelemetry';

export interface LiveIntelligencePanelsProps {
  initialData: BaselineTelemetryData;
}

export function LiveIntelligencePanels({ initialData }: LiveIntelligencePanelsProps) {
  return <ExpandableLivePanels initialData={initialData} />;
}
