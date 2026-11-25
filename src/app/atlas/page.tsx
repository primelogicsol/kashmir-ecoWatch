'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildDatasetJsonLd } from '@/lib/seo/structured-data';

const AtlasClient = dynamic(() => import('./AtlasClient'), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400 gap-4">
      <div className="w-10 h-10 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
      <p className="text-xs font-mono tracking-widest uppercase">Loading Kashmir Geospatial Canvas...</p>
    </div>
  ),
});

const atlasDatasetSchema = buildDatasetJsonLd({
  id: 'KEW-GIS-ATLAS-WESTERN-HIMALAYA',
  name: 'Kashmir EcoWatch Western Himalayan Multi-Layer Ecological & Geospatial GIS Atlas',
  description:
    'Interactive geospatial intelligence layers mapping 182 Protected Areas, Ramsar Wetlands (Hokersar, Wular, Haigam, Shallabugh), Alpine & Urban Lakes (Dal, Wular, Sheshnag, Anchar, Manasbal), Glaciers (Kolahoi, Machoi, Siachen), Rivers (Jhelum, Lidder, Sind, Chenab, Indus), Watersheds, Wildlife Corridors, and Natural Hazard Zones across the Western Himalaya.',
  canonicalPath: '/atlas',
  spatialName: 'Western Himalaya (Kashmir, Jammu, Ladakh, Azad Jammu & Kashmir, Gilgit-Baltistan)',
  csvDownloadPath: '/api/datasets/open-data/all?format=csv',
  jsonDownloadPath: '/api/datasets/open-data/all?format=json',
  keywords: [
    'Kashmir GIS Atlas',
    'Western Himalayan geospatial layers',
    'Dal Lake map',
    'Sheshnag Lake coordinates',
    'Kolahoi Glacier map',
    'Kashmir protected areas GIS',
  ],
});

export default function AtlasPage() {
  return (
    <>
      <JsonLd id="kew-atlas-dataset" data={atlasDatasetSchema} />
      {/* Accessible, crawler-discoverable geospatial index alongside interactive WebGL/Leaflet canvas */}
      <section className="sr-only" aria-label="Geospatial Atlas Layer Directory">
        <h1>Western Himalayan Interactive Geospatial and Ecological GIS Atlas — Kashmir EcoWatch</h1>
        <p>
          Explore georeferenced spatial layers curated by Kashmir EcoWatch Western Himalayan covering protected habitats,
          freshwater and glacial lakes, Ramsar wetlands, rivers, glaciers, watersheds, wildlife corridors, and hazard zones.
        </p>
        <ul>
          <li><Link href="/water-systems/lakes/sheshnag-lake">Sheshnag Lake (34.0931° N, 75.4981° E · 3,590m · Anantnag)</Link></li>
          <li><Link href="/water-systems/lakes/dal-lake">Dal Lake (34.1150° N, 74.8650° E · 1,583m · Srinagar)</Link></li>
          <li><Link href="/water-systems/lakes/wular-lake">Wular Lake Ramsar Basin (34.3333° N, 74.6000° E · Bandipora)</Link></li>
          <li><Link href="/water-systems/lakes/anchar-lake">Anchar Lake (34.1450° N, 74.7850° E · Srinagar)</Link></li>
          <li><Link href="/water-systems/wetlands/hokersar-wetland">Hokersar Wetland Reserve (Ramsar Site · Srinagar)</Link></li>
          <li><Link href="/water-systems/wetlands/hygam-wetland">Haigam (Hygam) Wetland Reserve (Baramulla)</Link></li>
          <li><Link href="/water-systems/glaciers/kolahoi-glacier">Kolahoi Glacier Cryosphere Layer (Pahalgam / Lidder)</Link></li>
          <li><Link href="/water-systems/rivers/jhelum-river">Jhelum River Hydrological Corridor</Link></li>
          <li><Link href="/protected-network/atlas">Protected Areas Network GIS Atlas (182 Reserves &amp; 43 Corridors)</Link></li>
          <li><Link href="/open-data">Open Geospatial &amp; Environmental Datasets Catalog</Link></li>
        </ul>
      </section>
      <AtlasClient />
    </>
  );
}
