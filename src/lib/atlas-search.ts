// Atlas search utility
// Enterprise Geospatial Search across all Western Himalayan spatial assets

import districtsGeoJson from '@/data/geojson/districts.json';
import protectedAreasGeoJson from '@/data/geojson/protected-areas.json';
import lakesGeoJson from '@/data/geojson/lakes.json';
import wetlandsGeoJson from '@/data/geojson/wetlands.json';
import riversGeoJson from '@/data/geojson/rivers.json';
import glaciersGeoJson from '@/data/geojson/glaciers.json';
import watershedsGeoJson from '@/data/geojson/watersheds.json';
import trailsGeoJson from '@/data/geojson/trails.json';
import hazardsGeoJson from '@/data/geojson/hazards.json';
import { speciesData } from '@/data';

export interface SearchResult {
  type: 'species' | 'protected_area' | 'lake' | 'wetland' | 'river' | 'glacier' | 'watershed' | 'trail' | 'district' | 'hazard';
  id: string;
  slug: string;
  name: string;
  description: string;
  district?: string;
  region?: string;
  category?: string;
  coordinates?: { lat: number; lng: number };
  bounds?: [[number, number], [number, number]];
  verificationStatus?: string;
}

// Helper to calculate centroid of polygon
function computePolygonCenter(coords: number[][]): { lat: number; lng: number } {
  if (!coords || coords.length === 0) return { lat: 34.0837, lng: 74.7973 };
  let sumLat = 0;
  let sumLng = 0;
  coords.forEach(([lng, lat]) => {
    sumLng += lng;
    sumLat += lat;
  });
  return { lat: sumLat / coords.length, lng: sumLng / coords.length };
}

export function searchAtlas(query: string): Record<string, SearchResult[]> {
  const lowerQuery = query.toLowerCase().trim();
  
  if (!lowerQuery || lowerQuery.length < 2) {
    return {
      districts: [],
      protectedAreas: [],
      waterBodies: [],
      rivers: [],
      glaciers: [],
      watersheds: [],
      trails: [],
      hazards: [],
      species: [],
    };
  }

  // 1. Districts (42 districts across all 5 regions)
  const districts: SearchResult[] = districtsGeoJson.features
    .filter((f: any) => 
      f.properties.name.toLowerCase().includes(lowerQuery) ||
      (f.properties.headquarters && f.properties.headquarters.toLowerCase().includes(lowerQuery)) ||
      (f.properties.region && f.properties.region.toLowerCase().includes(lowerQuery))
    )
    .slice(0, 5)
    .map((f: any) => {
      const p = f.properties;
      const coords = f.geometry.coordinates[0];
      const center = computePolygonCenter(coords);
      return {
        type: 'district',
        id: p.id,
        slug: p.id,
        name: p.name,
        description: `${p.region} • Area: ${p.area_km2.toLocaleString()} km² • HQ: ${p.headquarters}`,
        district: p.name,
        region: p.region,
        coordinates: center,
        verificationStatus: p.verificationStatus,
      };
    });

  // 2. Protected Areas (National Parks, Sanctuaries, Reserves, IBAs)
  const protectedAreas: SearchResult[] = protectedAreasGeoJson.features
    .filter((f: any) =>
      f.properties.name.toLowerCase().includes(lowerQuery) ||
      (f.properties.district && f.properties.district.toLowerCase().includes(lowerQuery)) ||
      (f.properties.category && f.properties.category.toLowerCase().includes(lowerQuery)) ||
      (Array.isArray(f.properties.keySpecies) && f.properties.keySpecies.some((s: string) => s.toLowerCase().includes(lowerQuery)))
    )
    .slice(0, 6)
    .map((f: any) => {
      const p = f.properties;
      let center: { lat: number; lng: number };
      if (f.geometry.type === 'Polygon') {
        center = computePolygonCenter(f.geometry.coordinates[0]);
      } else {
        const [lng, lat] = f.geometry.coordinates;
        center = { lat, lng };
      }
      return {
        type: 'protected_area',
        id: p.id,
        slug: p.id,
        name: p.name,
        description: `${p.category?.replace(/_/g, ' ').toUpperCase()} in ${p.district || 'Western Himalayas'}`,
        district: p.district,
        category: p.category,
        coordinates: center,
        verificationStatus: p.verificationStatus,
      };
    });

  // 3. Water Bodies (Lakes & Wetlands)
  const lakesFiltered = lakesGeoJson.features
    .filter((f: any) =>
      f.properties.name.toLowerCase().includes(lowerQuery) ||
      (f.properties.district && f.properties.district.toLowerCase().includes(lowerQuery)) ||
      (f.properties.category && f.properties.category.toLowerCase().includes(lowerQuery))
    )
    .slice(0, 4)
    .map((f: any) => {
      const p = f.properties;
      const [lng, lat] = f.geometry.coordinates;
      return {
        type: 'lake' as const,
        id: p.id,
        slug: p.slug,
        name: p.name,
        description: `${p.category} in ${p.district} • ${p.area_km2} km² • ${p.elevation_m}m alt`,
        district: p.district,
        category: p.category,
        coordinates: { lat, lng },
        verificationStatus: p.verificationStatus,
      };
    });

  const wetlandsFiltered = wetlandsGeoJson.features
    .filter((f: any) =>
      f.properties.name.toLowerCase().includes(lowerQuery) ||
      (f.properties.district && f.properties.district.toLowerCase().includes(lowerQuery))
    )
    .slice(0, 4)
    .map((f: any) => {
      const p = f.properties;
      const [lng, lat] = f.geometry.coordinates;
      return {
        type: 'wetland' as const,
        id: p.id,
        slug: p.slug,
        name: p.name,
        description: `${p.category} in ${p.district} • ${p.area_km2} km² ${p.ramsarSite ? '(Ramsar Site)' : ''}`,
        district: p.district,
        category: p.category,
        coordinates: { lat, lng },
        verificationStatus: p.verificationStatus,
      };
    });

  const waterBodies = [...lakesFiltered, ...wetlandsFiltered];

  // 4. Rivers & Streams
  const rivers: SearchResult[] = riversGeoJson.features
    .filter((f: any) =>
      f.properties.name.toLowerCase().includes(lowerQuery) ||
      (f.properties.region && f.properties.region.toLowerCase().includes(lowerQuery)) ||
      (f.properties.origin && f.properties.origin.toLowerCase().includes(lowerQuery))
    )
    .slice(0, 4)
    .map((f: any) => {
      const p = f.properties;
      const coords = f.geometry.coordinates;
      const midPoint = coords[Math.floor(coords.length / 2)] || coords[0];
      return {
        type: 'river',
        id: p.id,
        slug: p.id,
        name: p.name,
        description: `${p.region} • Length: ${p.length_km} km • Origin: ${p.origin}`,
        region: p.region,
        coordinates: { lat: midPoint[1], lng: midPoint[0] },
        verificationStatus: p.verificationStatus,
      };
    });

  // 5. Glaciers
  const glaciers: SearchResult[] = glaciersGeoJson.features
    .filter((f: any) =>
      f.properties.name.toLowerCase().includes(lowerQuery) ||
      (f.properties.district && f.properties.district.toLowerCase().includes(lowerQuery)) ||
      (f.properties.rgiId && f.properties.rgiId.toLowerCase().includes(lowerQuery))
    )
    .slice(0, 4)
    .map((f: any) => {
      const p = f.properties;
      const center = computePolygonCenter(f.geometry.coordinates[0]);
      return {
        type: 'glacier',
        id: p.id,
        slug: p.id,
        name: p.name,
        description: `RGI: ${p.rgiId} in ${p.district} • ${p.area_km2} km² • Retreat: ~${p.retreat_rate_m_yr} m/yr`,
        district: p.district,
        region: p.region,
        coordinates: center,
        verificationStatus: p.verificationStatus,
      };
    });

  // 6. Watersheds
  const watersheds: SearchResult[] = watershedsGeoJson.features
    .filter((f: any) =>
      f.properties.name.toLowerCase().includes(lowerQuery) ||
      (f.properties.basin && f.properties.basin.toLowerCase().includes(lowerQuery))
    )
    .slice(0, 3)
    .map((f: any) => {
      const p = f.properties;
      const center = computePolygonCenter(f.geometry.coordinates[0]);
      return {
        type: 'watershed',
        id: p.id,
        slug: p.id,
        name: p.name,
        description: `${p.basin} • Catchment Area: ${p.area_km2.toLocaleString()} km²`,
        region: p.region,
        coordinates: center,
        verificationStatus: p.verificationStatus,
      };
    });

  // 7. Trails
  const trails: SearchResult[] = trailsGeoJson.features
    .filter((f: any) => 
      f.properties.name.toLowerCase().includes(lowerQuery) ||
      (f.properties.district && f.properties.district.toLowerCase().includes(lowerQuery)) ||
      (f.properties.trailhead?.name && f.properties.trailhead.name.toLowerCase().includes(lowerQuery))
    )
    .slice(0, 4)
    .map((f: any) => {
      const p = f.properties;
      return {
        type: 'trail',
        id: p.id,
        slug: p.id,
        name: p.name,
        description: `${p.distance_km} km (${p.duration}) • Trailhead: ${p.trailhead?.name}`,
        district: p.district,
        region: p.region,
        coordinates: { lat: p.trailhead.lat, lng: p.trailhead.lng },
        verificationStatus: p.verificationStatus,
      };
    });

  // 8. Hazards
  const hazards: SearchResult[] = hazardsGeoJson.features
    .filter((f: any) =>
      f.properties.title.toLowerCase().includes(lowerQuery) ||
      (f.properties.district && f.properties.district.toLowerCase().includes(lowerQuery)) ||
      (f.properties.type && f.properties.type.toLowerCase().includes(lowerQuery))
    )
    .slice(0, 3)
    .map((f: any) => {
      const p = f.properties;
      return {
        type: 'hazard',
        id: p.id,
        slug: p.id,
        name: p.title,
        description: `${p.type.toUpperCase()} • Severity: ${p.severity.toUpperCase()} in ${p.district}`,
        district: p.district,
        region: p.region,
        coordinates: { lat: p.coordinates.lat, lng: p.coordinates.lng },
        verificationStatus: p.verificationStatus,
      };
    });

  // 9. Species
  const species: SearchResult[] = speciesData
    .filter(s => 
      s.name.toLowerCase().includes(lowerQuery) ||
      s.scientificName.toLowerCase().includes(lowerQuery) ||
      s.commonName.toLowerCase().includes(lowerQuery) ||
      s.localName?.toLowerCase().includes(lowerQuery)
    )
    .slice(0, 4)
    .map(s => ({
      type: 'species' as const,
      id: s.id,
      slug: s.slug,
      name: s.name,
      description: `${s.taxonomicGroup} • Status: ${s.conservationStatus} • Range: ${s.districts.slice(0, 3).join(', ')}`,
      district: s.districts.join(', '),
      coordinates: undefined, // Species don't have fixed coordinates
    }));

  return {
    districts,
    protectedAreas,
    waterBodies,
    rivers,
    glaciers,
    watersheds,
    trails,
    hazards,
    species,
  };
}

// Get total result count
export function getTotalResults(results: Record<string, SearchResult[]>): number {
  return Object.values(results).reduce((sum, arr) => sum + (arr ? arr.length : 0), 0);
}
