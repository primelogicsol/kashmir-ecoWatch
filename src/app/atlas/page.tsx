import React from 'react';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildDatasetJsonLd } from '@/lib/seo/structured-data';
import AtlasClient from './AtlasClient';

import districtsGeoJson from '@/data/geojson/districts.json';
import protectedAreasGeoJson from '@/data/geojson/protected-areas.json';
import lakesGeoJson from '@/data/geojson/lakes.json';
import wetlandsGeoJson from '@/data/geojson/wetlands.json';
import riversGeoJson from '@/data/geojson/rivers.json';
import glaciersGeoJson from '@/data/geojson/glaciers.json';
import watershedsGeoJson from '@/data/geojson/watersheds.json';
import trailsGeoJson from '@/data/geojson/trails.json';
import hazardsGeoJson from '@/data/geojson/hazards.json';
import sightingsGeoJson from '@/data/geojson/sightings.json';

const atlasDatasetSchema = buildDatasetJsonLd({
  id: 'KEW-GIS-ATLAS-WESTERN-HIMALAYA',
  name: 'Kashmir EcoWatch Western Himalayan Multi-Layer Ecological & Geospatial GIS Atlas',
  description:
    'Interactive geospatial intelligence layers mapping Protected Areas, Ramsar Wetlands, Alpine & Urban Lakes, Glaciers, Rivers, Watersheds, Wildlife Corridors, and Natural Hazard Zones across the Western Himalaya.',
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

const SPATIAL_LAYER_CATALOG = [
  { name: 'Districts & Subregional Boundaries', count: districtsGeoJson.features.length, provenance: 'Administrative GIS Baselines (5 Western Himalayan Subregions)', href: '/districts' },
  { name: 'Protected Areas Network', count: protectedAreasGeoJson.features.length, provenance: 'National Parks, Wildlife Sanctuaries, Wetland & Conservation Reserves, IBAs', href: '/protected-network/atlas' },
  { name: 'Open Water & Alpine Lakes', count: lakesGeoJson.features.length, provenance: 'NWIA, Sentinel-2 Optical Delineations & KEW Limnological Inventory', href: '/water-systems/lakes' },
  { name: 'Ramsar & Floodplain Wetlands', count: wetlandsGeoJson.features.length, provenance: 'Ramsar Secretariat & J&K Wetland Hydro-Morphological Series', href: '/water-systems/wetlands' },
  { name: 'Rivers & Fluvial Corridors', count: riversGeoJson.features.length, provenance: 'HydroSHEDS & Copernicus DEM Thalweg Vectors', href: '/water-systems/rivers' },
  { name: 'Watershed Basins', count: watershedsGeoJson.features.length, provenance: 'Catchment Delineation Units (Indus, Jhelum, Chenab, Shyok, Neelum)', href: '/water-systems/watersheds' },
  { name: 'Dated Glaciers (RGI)', count: glaciersGeoJson.features.length, provenance: 'Randolph Glacier Inventory (RGI 7.0) & Landsat/Sentinel Snout Baselines', href: '/water-systems/glaciers' },
  { name: 'Verified Ecological Trails', count: trailsGeoJson.features.length, provenance: 'Field Survey Transects & Regulated Alpine Routes', href: '/protected-network/trails-and-sightings' },
  { name: 'Wildlife Observations (Privacy Fuzzed)', count: sightingsGeoJson.features.length, provenance: 'Coarsened >=1.1 km Grid Cells Protecting Threatened Taxa (CR/EN/VU)', href: '/biodiversity/wildlife-sightings' },
  { name: 'Documented Hazard Zones', count: hazardsGeoJson.features.length, provenance: 'USGS/EMSC Seismic, Landslide Susceptibility & Flood Corridor Polygons', href: '/hazard-intelligence' },
];

export default function AtlasPage() {
  return (
    <div className="bg-slate-950 text-slate-100">
      <JsonLd id="kew-atlas-dataset" data={atlasDatasetSchema} />

      {/* Interactive Workbench (SSR-renders TopCommandBar, LayerRail, LegendCard; Leaflet canvas is client-only) */}
      <AtlasClient />

      {/* Server-Rendered Geospatial Layer Catalog & Provenance Disclosure Below Workbench */}
      <section
        aria-labelledby="atlas-layer-catalog-heading"
        className="border-t border-white/10 bg-slate-950 py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-400">
                GEOSPATIAL LAYER CATALOG &amp; DATA PROVENANCE
              </span>
              <h1 id="atlas-layer-catalog-heading" className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Western Himalayan Interactive Geospatial &amp; Ecological GIS Atlas
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                Explore 10 georeferenced spatial layers curated by Kashmir EcoWatch Western Himalayan across Kashmir Valley, Jammu, Ladakh, Azad Jammu &amp; Kashmir, and Gilgit-Baltistan. All coordinates use WGS84 (EPSG:4326); threatened wildlife locations are spatially coarsened to prevent poaching or disturbance.
              </p>
            </div>
            <Link
              href="/open-data"
              className="inline-flex items-center px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shrink-0 transition-colors"
            >
              Open Geospatial Datasets (CC BY-NC 4.0) →
            </Link>
          </div>

          <div className="overflow-x-auto rounded-lg border border-white/10 bg-slate-900/60">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-slate-950/80 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-4">Spatial Layer</th>
                  <th className="py-3 px-4">Indexed Features</th>
                  <th className="py-3 px-4">Primary Scientific Provenance &amp; Safeguards</th>
                  <th className="py-3 px-4">Companion Module</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {SPATIAL_LAYER_CATALOG.map((layer) => (
                  <tr key={layer.name} className="hover:bg-white/[0.02]">
                    <td className="py-2.5 px-4 font-semibold text-white">{layer.name}</td>
                    <td className="py-2.5 px-4 font-mono text-emerald-400 font-bold">{layer.count}</td>
                    <td className="py-2.5 px-4 text-slate-300">{layer.provenance}</td>
                    <td className="py-2.5 px-4">
                      <Link href={layer.href} className="text-emerald-400 hover:underline font-medium">
                        Explore →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
