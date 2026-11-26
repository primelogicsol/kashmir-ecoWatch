'use client';

import React, { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { MasterLakeRecord, MasterTrophicStatus } from '@/data/hydrology/master-lake-registry';

const MapContainer = dynamic(() => import('react-leaflet').then((m) => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((m) => m.TileLayer), { ssr: false });
const CircleMarker = dynamic(() => import('react-leaflet').then((m) => m.CircleMarker), { ssr: false });
const Polygon = dynamic(() => import('react-leaflet').then((m) => m.Polygon), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((m) => m.Popup), { ssr: false });

const TROPHIC_COLORS: Record<MasterTrophicStatus, string> = {
  Oligotrophic: '#10b981',
  Mesotrophic: '#14b8a6',
  Eutrophic: '#f59e0b',
  Hypereutrophic: '#f43f5e',
  'Insufficient Evidence': '#64748b',
};

export function RegionalLakeTrophicAtlasMap({ lakes }: { lakes: MasterLakeRecord[] }) {
  const [mounted, setMounted] = useState(false);
  const [showDistrictRefRecords, setShowDistrictRefRecords] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Deterministic tiny spiral offset ONLY for overlapping district-reference markers when toggled on,
  // with explicit disclosure in popup that exact coordinates are pending SOI/LISS-III georeferencing!
  const plottedLakes = useMemo(() => {
    const bucketIdx = new Map<string, number>();
    return lakes
      .filter((l) => showDistrictRefRecords || !l.coordinatePrecision.includes('District-Level'))
      .map((l) => {
        const isDistRef = l.coordinatePrecision.includes('District-Level');
        if (!isDistRef) {
          return { lake: l, lat: l.coordinates.lat, lng: l.coordinates.lng, isDistRef: false };
        }
        const key = l.district;
        const n = bucketIdx.get(key) || 0;
        bucketIdx.set(key, n + 1);
        const angle = n * 2.39996; // golden angle
        const r = 0.008 * Math.sqrt(n + 1);
        return {
          lake: l,
          lat: Number((l.coordinates.lat + r * Math.cos(angle)).toFixed(5)),
          lng: Number((l.coordinates.lng + r * Math.sin(angle)).toFixed(5)),
          isDistRef: true,
        };
      });
  }, [lakes, showDistrictRefRecords]);

  if (!mounted) {
    return (
      <div className="h-[480px] w-full rounded-xl border border-white/10 bg-slate-950 flex items-center justify-center text-xs font-mono text-slate-400">
        Initializing Regional Lake Trophic Status Cartographic Engine...
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          {(Object.entries(TROPHIC_COLORS) as Array<[MasterTrophicStatus, string]>).map(([lbl, hex]) => (
            <span key={lbl} className="inline-flex items-center gap-1.5 text-slate-300">
              <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: hex }} />
              {lbl}
            </span>
          ))}
        </div>
        <label className="inline-flex items-center gap-2 text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={showDistrictRefRecords}
            onChange={(e) => setShowDistrictRefRecords(e.target.checked)}
            className="rounded border-slate-700 bg-slate-900"
          />
          <span>
            Include district-referenced DEERS tabular lakes ({plottedLakes.length} plotted)
          </span>
        </label>
      </div>

      <div className="h-[480px] w-full rounded-xl overflow-hidden border border-white/10 bg-slate-950 relative z-0">
        <MapContainer
          center={[34.08, 74.82]}
          zoom={8}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%', background: '#020617' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; CARTO'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          {plottedLakes.map(({ lake, lat, lng, isDistRef }) => {
            const color = TROPHIC_COLORS[lake.trophicStatus] || '#64748b';
            const hasPoly = lake.polygonRingWgs84 && lake.polygonRingWgs84.length >= 4;

            return (
              <React.Fragment key={lake.kewLakeId}>
                {hasPoly && (
                  <Polygon
                    positions={lake.polygonRingWgs84!.map(([lonP, latP]) => [latP, lonP] as [number, number])}
                    pathOptions={{ color: '#38bdf8', weight: 1.5, fillColor: color, fillOpacity: 0.45 }}
                  />
                )}
                <CircleMarker
                  center={[lat, lng]}
                  radius={lake.trophicStatus !== 'Insufficient Evidence' ? 6.5 : isDistRef ? 3.5 : 4.5}
                  pathOptions={{
                    color: isDistRef ? '#475569' : '#e2e8f0',
                    weight: isDistRef ? 0.6 : 1.1,
                    fillColor: color,
                    fillOpacity: isDistRef ? 0.65 : 0.9,
                  }}
                >
                  <Popup>
                    <div className="text-xs space-y-1 min-w-[220px] text-slate-900">
                      <div className="font-mono text-[10px] font-bold text-slate-500">
                        {lake.kewLakeId} · {lake.district} District
                      </div>
                      <div className="font-bold text-sm">{lake.officialName}</div>
                      <div>
                        <strong>Setting:</strong> {lake.ecologicalSetting} ({lake.elevationM} m)
                      </div>
                      <div>
                        <strong>Latest Area:</strong>{' '}
                        {lake.latestVerifiedAreaHa !== null ? `${lake.latestVerifiedAreaHa} ha` : 'Tabular'} ({lake.latestAreaEpoch})
                      </div>
                      <div>
                        <strong>Trophic State:</strong> {lake.trophicStatus}
                      </div>
                      {lake.carlsonTsi.tsiSecchi !== null && (
                        <div>
                          <strong>Carlson TSI(SD):</strong> {lake.carlsonTsi.tsiSecchi} (SD {lake.carlsonTsi.secchiDepthM} m)
                        </div>
                      )}
                      {lake.carlsonTsi.tsiTotalPhosphorus !== null && (
                        <div>
                          <strong>Carlson TSI(TP):</strong> {lake.carlsonTsi.tsiTotalPhosphorus} (TP {lake.carlsonTsi.totalPhosphorusUgL} µg/L)
                        </div>
                      )}
                      {lake.glofSusceptibility && (
                        <div>
                          <strong>GLOF Hazard (Separate):</strong> {lake.glofSusceptibility.susceptibilityClass}
                        </div>
                      )}
                      <div className="text-[10px] text-slate-600">
                        <strong>Coord Basis:</strong> {lake.coordinatePrecision}
                      </div>
                      <div className="pt-1">
                        <Link
                          href={`/water-systems/lakes/${lake.slug}`}
                          className="font-semibold text-teal-700 underline"
                        >
                          Open Scientific Lake Profile →
                        </Link>
                      </div>
                    </div>
                  </Popup>
                </CircleMarker>
              </React.Fragment>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}
