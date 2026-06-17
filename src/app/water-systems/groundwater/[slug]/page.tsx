'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { WaterEntityDetailPageComponent } from '@/components/common/WaterEntityDetailPageComponent';
import { groundwaterData } from '@/data/water-systems';

export default function GroundwaterDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const gwRecord = groundwaterData.find(g => g.slug === slug);

  if (!gwRecord) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="max-w-xl text-4xl font-bold text-white mb-4">Groundwater Record Not Found</h1>
          <p className="text-slate-400">The groundwater observation station or tube well you are looking for does not exist or is not yet verified.</p>
        </div>
      </main>
    );
  }

  const relatedRecords = groundwaterData.filter(g => g.id !== gwRecord.id && (g.district === gwRecord.district || g.region === gwRecord.region)).slice(0, 4);

  return (
    <WaterEntityDetailPageComponent
      entity={gwRecord}
      relatedEntities={relatedRecords}
      color="from-sky-500 to-blue-600"
      icon="Database"
      backRoute="/water-systems"
      listRoute="/water-systems/groundwater"
    />
  );
}
