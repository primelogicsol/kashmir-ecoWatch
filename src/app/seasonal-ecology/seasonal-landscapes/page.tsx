import { SeasonalListingPage } from '@/components/common/SeasonalListingPage';
import { getSeasonalEcologyData } from '@/data/seasonal-ecology';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Mountain, Shield, Trees, ArrowRight, Compass } from 'lucide-react';
import Link from 'next/link';

export default function SeasonalLandscapesPage() {
  const landscapes = getSeasonalEcologyData.landscapes.all();

  const districts = Array.from(new Set(landscapes.flatMap(l => l.districts)));
  const elevationZones = Array.from(new Set(landscapes.map(l => l.elevationZone)));
  const seasons = Array.from(new Set(landscapes.flatMap(l => l.primarySeasons)));
  const categories = Array.from(new Set(landscapes.map(l => l.category).filter(Boolean)));

  return (
    <div className="min-h-screen mx-auto bg-slate-950">
      <SeasonalListingPage
        title="Seasonal Landscapes &amp; Biome Dynamics"
        subtitle="Landscape-scale seasonal patterns, bioclimatic gradients, and pristine ecological corridors across Kashmir"
        icon="Mountain"
        color="from-emerald-500 to-teal-600"
        entities={landscapes}
        entityVariant="landscape"
        metrics={[
          { label: 'Ecosystem Landscapes', value: landscapes.length, icon: 'Mountain' },
          { label: 'Valley & Lowland', value: landscapes.filter(l => l.elevationZone === 'lowland').length, icon: 'Trees' },
          { label: 'Subalpine & Highland', value: landscapes.filter(l => l.elevationZone === 'highland' || l.elevationZone === 'mid-hills').length, icon: 'Compass' },
          { label: 'Alpine Meadows', value: landscapes.filter(l => l.elevationZone === 'alpine').length, icon: 'Mountain' },
        ]}
        filters={{
          districts: districts as string[],
          elevationZones: elevationZones as string[],
          seasons: seasons as string[],
          additionalFilters: [
            { label: 'Landscape Type', options: categories as string[] },
          ],
        }}
        detailPageBaseRoute="/seasonal-ecology/seasonal-landscapes"
        mapPreviewEnabled
        mapCoordinates={{ lat: 34.0837, lng: 74.7973, zoom: 9 }}
      />

      {/* Cross-Link Intelligence Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/protected-network">
            <Card className="glass-intense border-emerald-500/30 hover:border-emerald-500/50 transition-all cursor-pointer group overflow-hidden h-full">
              <div className="relative p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shrink-0 shadow-lg">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Badge variant="outline" className="border-emerald-500/50 text-emerald-400 mb-1">
                      Conservation Core
                    </Badge>
                    <h4 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors truncate">
                      Protected Area Corridors
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                      National parks, wildlife sanctuaries, and conservation reserves safeguarding critical Himalayan wildlife corridors.
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform shrink-0" />
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/seasonal-ecology?habitat=temperate-forest">
            <Card className="glass-intense border-teal-500/30 hover:border-teal-500/50 transition-all cursor-pointer group overflow-hidden h-full">
              <div className="relative p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shrink-0 shadow-lg">
                    <Trees className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Badge variant="outline" className="border-teal-500/50 text-teal-400 mb-1">
                      Habitat Telemetry
                    </Badge>
                    <h4 className="text-lg font-bold text-white group-hover:text-teal-400 transition-colors truncate">
                      Temperate Forest Sentinel Dynamics
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                      Explore four-season phenological rhythms, canopy flora, and altitudinal ungulate movements across temperate forests.
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-teal-400 group-hover:translate-x-1 transition-transform shrink-0" />
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
