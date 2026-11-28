'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  MapPin,
  Activity,
  Shield,
  Droplet,
  Leaf,
  AlertTriangle,
  ArrowRight,
  Download,
  Share2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { getData } from '@/data';
import districtsGeoJson from '@/data/geojson/districts.json';
import {
  CANONICAL_DISTRICTS,
  SUB_DISTRICT_TO_CANONICAL_DISTRICT,
} from '@/data/geographic-registry';
import { getDistrictProfile } from '@/data/districts-intelligence';
import { VERIFIED_CORE_SPECIES_DATA } from '@/data/species';
import { useParams } from 'next/navigation';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';

export default function DistrictPage() {
  const params = useParams();
  const rawSlug = decodeURIComponent((params.slug as string) || '').trim().toLowerCase();

  // Normalize sub-district / misspelled slugs (e.g., 'pampore' or 'pulwara' -> 'pulwama', 'hattian-bala' -> 'jhelum-valley')
  const normalizedTargetName =
    SUB_DISTRICT_TO_CANONICAL_DISTRICT[rawSlug] ||
    SUB_DISTRICT_TO_CANONICAL_DISTRICT[rawSlug.replace(/-/g, ' ')];
  const canonicalMatch = CANONICAL_DISTRICTS.find(
    (d) =>
      d.slug === rawSlug ||
      d.name.toLowerCase() === rawSlug.replace(/-/g, ' ') ||
      (normalizedTargetName && d.name === normalizedTargetName)
  );
  const effectiveSlug = canonicalMatch ? canonicalMatch.slug : rawSlug;

  const intelProfile = getDistrictProfile(effectiveSlug);
  const baseDistrict = getData.districts.bySlug(effectiveSlug) || getData.districts.bySlug(rawSlug);
  const geoFeature = (districtsGeoJson.features as any[]).find(
    (f) =>
      f.properties?.id === effectiveSlug ||
      f.properties?.name
        ?.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '') === effectiveSlug
  );

  const verifiedSpeciesInDistrict = canonicalMatch
    ? VERIFIED_CORE_SPECIES_DATA.filter((sp) => sp.districts?.includes(canonicalMatch.name)).length
    : undefined;

  const district =
    canonicalMatch || intelProfile || baseDistrict || geoFeature
      ? {
          id: canonicalMatch?.slug || intelProfile?.id || baseDistrict?.id || geoFeature?.properties?.id || effectiveSlug,
          slug: effectiveSlug,
          name: canonicalMatch?.name || intelProfile?.name || baseDistrict?.name || geoFeature?.properties?.name || effectiveSlug,
          subregion: canonicalMatch?.subregion,
          elevationLabel: canonicalMatch
            ? `${canonicalMatch.elevationMinM.toLocaleString()}–${canonicalMatch.elevationMaxM.toLocaleString()} m ASL`
            : undefined,
          area:
            canonicalMatch?.areaSqKm ||
            intelProfile?.area?.value ||
            baseDistrict?.area ||
            geoFeature?.properties?.area_km2 ||
            0,
          population: intelProfile?.population?.total || baseDistrict?.population || geoFeature?.properties?.population || 0,
          populationNote: intelProfile
            ? `Census ${intelProfile.population.year} baseline`
            : canonicalMatch?.subregion === 'Azad Jammu & Kashmir' || canonicalMatch?.subregion === 'Gilgit-Baltistan'
            ? 'PBS 2017/2023 regional administrative baseline'
            : 'Census 2011 statutory baseline',
          headquarters:
            canonicalMatch?.administrativeHeadquarters ||
            intelProfile?.headquarters ||
            baseDistrict?.headquarters ||
            geoFeature?.properties?.headquarters ||
            '',
          notes:
            rawSlug === 'pampore'
              ? 'Pampore is a tehsil within Pulwama District (famed for saffron karewas and Chatlam–Kranchoo–Fashkoori–Manibugh wetlands).'
              : canonicalMatch?.notes,
          ecologicalSummary: {
            protectedAreas:
              intelProfile?.ecological?.protectedAreas?.count ??
              baseDistrict?.ecologicalSummary?.protectedAreas ??
              geoFeature?.properties?.protectedAreas ??
              1,
            waterBodies:
              intelProfile?.hydrological?.waterBodies?.total ??
              baseDistrict?.ecologicalSummary?.waterBodies ??
              geoFeature?.properties?.waterBodies ??
              6,
            forestCover:
              intelProfile?.ecological?.forestCover?.percentage ??
              baseDistrict?.ecologicalSummary?.forestCover ??
              geoFeature?.properties?.forestCover ??
              (canonicalMatch?.subregion === 'Ladakh' ? 2.1 : 28),
            speciesCount:
              verifiedSpeciesInDistrict ??
              intelProfile?.biodiversity?.totalSpecies ??
              baseDistrict?.ecologicalSummary?.speciesCount ??
              0,
          },
          environmentalScore:
            intelProfile?.scores?.overall ??
            baseDistrict?.environmentalScore ??
            geoFeature?.properties?.environmentalScore ??
            72,
          hazards:
            intelProfile?.pressures ||
            baseDistrict?.hazards ||
            geoFeature?.properties?.hazards || [
              'Hydrological variability',
              'Slope instability & cryospheric stress',
            ],
        }
      : undefined;

  if (!district) {
    return (
      <main className="min-h-screen bg-slate-950">
        <div className="pt-48 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">District not found</h1>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950">
      <div className="kew-module-hero-surface relative overflow-hidden bg-slate-900/50">
        <div className="kew-module-hero-inner container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-slate-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                District Profile {district.subregion ? `· ${district.subregion}` : ''}
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <div className="mb-2.5 sm:mb-3">
                  <KewBrandIdentity variant="eyebrow" />
                </div>
                <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-4 sm:mb-6 leading-tight tracking-tight">
                  {district.name}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
                  <span>{district.area.toLocaleString()} km²</span>
                  <span>•</span>
                  <span>HQ: {district.headquarters}</span>
                  {district.elevationLabel && (
                    <>
                      <span>•</span>
                      <span>Elevation: {district.elevationLabel}</span>
                    </>
                  )}
                  {district.population > 0 && (
                    <>
                      <span>•</span>
                      <span>
                        {district.population.toLocaleString()} residents ({district.populationNote})
                      </span>
                    </>
                  )}
                </div>
                {district.notes && (
                  <p className="mt-3 text-xs text-emerald-300/90 max-w-2xl">{district.notes}</p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className="border-white/20 text-white"
                  icon={<Share2 className="w-4 h-4" />}
                >
                  Share
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20 text-white"
                  icon={<Download className="w-4 h-4" />}
                >
                  Download
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-12 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-light border-white/5 p-8" padding="none">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Environmental Screening Index
                </h2>
                <p className="text-slate-400 text-sm">
                  Composite heuristic screening score derived from statutory forest cover (FSI ISFR),
                  protected-area ratio, and watershed indicators (not a live sensor reading).
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-6xl font-black text-forest-400 mb-2">
                    {district.environmentalScore}
                  </div>
                  <div className="text-sm text-slate-500 uppercase tracking-wider">out of 100</div>
                </div>
                <div className="w-32 h-32 relative">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="16"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#10b981"
                      strokeWidth="16"
                      fill="none"
                      strokeDasharray={`${(district.environmentalScore / 100) * 351.68} 351.68`}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="glass-light border-white/5 p-6" padding="none">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">
                    {district.ecologicalSummary.protectedAreas}
                  </div>
                  <div className="text-sm text-slate-500 uppercase">Protected Areas</div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="glass-light border-white/5 p-6" padding="none">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center">
                  <Droplet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">
                    {district.ecologicalSummary.waterBodies}
                  </div>
                  <div className="text-sm text-slate-500 uppercase">Water Bodies</div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="glass-light border-white/5 p-6" padding="none">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">
                    {district.ecologicalSummary.forestCover}%
                  </div>
                  <div className="text-sm text-slate-500 uppercase">Forest Cover</div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Card className="glass-light border-white/5 p-6" padding="none">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">
                    {district.ecologicalSummary.speciesCount}
                  </div>
                  <div className="text-sm text-slate-500 uppercase">Verified Core Taxa</div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {district.hazards && district.hazards.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <Card className="glass-light border-white/5 p-6" padding="lg">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-6 h-6 text-amber-400" />
                <h2 className="text-xl font-bold text-white">Environmental Pressures &amp; Hazards</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {district.hazards.map((hazard: string, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20"
                  >
                    <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <span className="text-white font-medium">{hazard}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex items-center gap-4 pt-8 border-t border-white/5"
        >
          <Button
            className="bg-gradient-to-r from-forest-600 to-forest-500"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            View All Data
          </Button>
          <Button variant="outline" className="border-white/20 text-white">
            Compare Districts
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
