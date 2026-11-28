'use client';

import React from 'react';
import { MapIntelligenceCore } from '@/components/sections/MapIntelligenceCore';
import type { BaselineTelemetryData } from '@/lib/telemetry/getBaselineTelemetry';

export interface InteractiveAtlasPreviewProps {
  initialData?: BaselineTelemetryData;
}

export function InteractiveAtlasPreview({ initialData }: InteractiveAtlasPreviewProps) {
  return <MapIntelligenceCore initialData={initialData} />;
}
