'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  Cpu,
  Database,
  ExternalLink,
  FileText,
  Globe2,
  Info,
  Layers,
  Satellite,
  ShieldCheck
} from 'lucide-react';
import { EarthHumanImpactNav } from '@/components/earth-human-impact/EarthHumanImpactNav';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { EhiiHeroShowcaseCard } from '@/components/earth-human-impact/EhiiHeroShowcaseCard';
import { EHII_HERO_CONFIGS } from '@/data/ehii-hero-presets';
import { Heading } from '@/components/common/Heading';
import { Button } from '@/components/ui/Button';

export default function MethodologyDataSourcesPage() {
  const sensorCatalog = [
    {
      sensor: 'USGS / NASA Landsat Collection 2',
      spatialRes: '30m Multi-Spectral / 100m Thermal',
      temporalCoverage: '1982 to Present (44 Years)',
      primaryUse: 'Historical long-term land cover baselines, multi-decadal wetland retreat, and urban thermal dynamics (TIRS).',
      calibrationStandard: 'Level-2 Surface Reflectance (SR) and Top-of-Atmosphere (TOA) Brightness Temperature.'
    },
    {
      sensor: 'Copernicus Sentinel-2 MSI (A & B)',
      spatialRes: '10m (VNIR) / 20m (Red Edge & SWIR)',
      temporalCoverage: '2015 to Present (5-day cadence)',
      primaryUse: 'Contemporary high-frequency monitoring of agricultural phenology, forest canopy closures, and wetland shorelines.',
      calibrationStandard: 'Level-2A Bottom-Of-Atmosphere (BOA) corrected with sen2cor.'
    },
    {
      sensor: 'Copernicus Sentinel-1 C-SAR (A & B)',
      spatialRes: '10m (IW Mode Interferometric)',
      temporalCoverage: '2014 to Present (6-day cadence)',
      primaryUse: 'All-weather cloud-penetrating wetland water masks, flood inundation extents, and millimeter slope deformation (InSAR).',
      calibrationStandard: 'Level-1 Single Look Complex (SLC) & Ground Range Detected (GRD) with gamma-naught calibration.'
    },
    {
      sensor: 'Copernicus 30m Global DEM & SRTM',
      spatialRes: '30m Elevation Grid',
      temporalCoverage: 'Static Geomorphological Reference',
      primaryUse: 'Topographic shadow illumination correction, slope aspect stratification, and Karewa plateau contour extraction.',
      calibrationStandard: 'WGS84 EGM2008 geoid reference.'
    },
    {
      sensor: 'PlanetScope Constellation (Dove/SuperDove)',
      spatialRes: '3m Multi-Spectral Orthomosaic',
      temporalCoverage: 'Daily Target Tasking',
      primaryUse: 'Cadastral parcel-scale ground verification, active quarry machinery tracking, and fine-scale riverbed incision.',
      calibrationStandard: 'Planet Ortho Scene Surface Reflectance Product.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Canonical Institutional Hero Section */}
      <Heading
        label="Open Science Protocol • Telemetry & Satellites"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Earth & Human Impact', href: '/earth-human-impact' },
          { label: 'Scientific Methodology & Sensor Registry' }
        ]}
        icon={<ShieldCheck className="w-6 h-6 text-teal-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-teal-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                EHII-METH
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent pr-6 tracking-normal">
                Scientific Methodology & Sensor Registry
              </span>
            </div>
          </div>
        }
        subtitle="Technical documentation detailing satellite constellations, atmospheric correction algorithms, PostGIS spatial indexing, and non-negotiable scientific safeguards."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
        rightContent={
          <EhiiHeroShowcaseCard
            tag={EHII_HERO_CONFIGS['methodology-data-sources'].tag}
            badge={EHII_HERO_CONFIGS['methodology-data-sources'].badge}
            items={EHII_HERO_CONFIGS['methodology-data-sources'].showcaseItems}
          />
        }
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/earth-human-impact">
              <Button size="sm" variant="outline" className="border-teal-500/40 text-teal-300 hover:bg-teal-950/40 font-bold">
                <Globe2 className="w-4 h-4 mr-1.5" />
                EHII Hub
              </Button>
            </Link>
            <Link href="/earth-human-impact/change-detection-observatory">
              <Button size="sm" className="bg-teal-600 hover:bg-teal-500 font-bold text-white shadow-md shadow-teal-500/20">
                <Satellite className="w-4 h-4 mr-1.5" />
                Observatory
              </Button>
            </Link>
          </div>
        }
      />

      {/* Persistent Submodule Navigation */}
      {/* Canonical Overlapping Telemetry KPI Strip */}
      <ModuleKpiStrip kpis={EHII_HERO_CONFIGS['methodology-data-sources'].kpis} iconColor="text-teal-400" />

      {/* Persistent Submodule Navigation */}
      <EarthHumanImpactNav />

      <div className="page-content__inner py-10 space-y-12">
        {/* Sensor Catalog Table */}
        <section className="bg-slate-900/60 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-2">Spaceborne Sensor Infrastructure</h2>
          <p className="text-xs text-slate-400 mb-6">Standardized orbital instruments powering the Change Detection Observatory.</p>

          <div className="space-y-4">
            {sensorCatalog.map((s) => (
              <div key={s.sensor} className="p-4 rounded-xl bg-slate-950/70 border border-white/5 text-xs space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-sm font-bold text-teal-300">{s.sensor}</h3>
                  <span className="font-mono text-slate-400 text-[11px]">{s.spatialRes} • {s.temporalCoverage}</span>
                </div>
                <p className="text-slate-300 leading-relaxed">{s.primaryUse}</p>
                <div className="text-[11px] text-slate-500 font-mono pt-1 border-t border-white/5">
                  Calibration: {s.calibrationStandard}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Processing Engine Architecture */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2">
            <Cpu className="w-5 h-5 text-teal-400" />
            <h3 className="text-base font-bold text-white">Google Earth Engine (GEE)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cloud-parallel computation executing pixel-level time-series decomposition, Otsu thresholding, and atmospheric mask filtering over multi-terabyte raster imagery.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2">
            <Database className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">PostGIS Spatial Database</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Geodesic polygon vector storage, spatial intersection queries against statutory revenue Khasra maps, and Ramsar boundary proximity buffers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2">
            <Layers className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Leaflet & Next.js Interface</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              High-performance client-side cartography with vector tile rendering, dynamic layer comparisons, and responsive spatial telemetry visualization.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
