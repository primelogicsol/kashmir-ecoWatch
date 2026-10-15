'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const AtlasClient = dynamic(() => import('./AtlasClient'), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400 gap-4">
      <div className="w-10 h-10 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
      <p className="text-xs font-mono tracking-widest uppercase">Loading Kashmir Geospatial Canvas...</p>
    </div>
  ),
});

export default function AtlasPage() {
  return <AtlasClient />;
}
