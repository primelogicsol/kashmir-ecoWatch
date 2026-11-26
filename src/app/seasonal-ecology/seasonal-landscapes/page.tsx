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
      <div className="container mx-auto pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/protected-network">
            <div className="kew-card-shell kew-card-shell--interactive group h-full">
              <div className="kew-card-top-row">
                <div className="kew-card-icon-box bg-emerald-500/15 border-emerald-500/30 text-emerald-400">
                  <Shield className="w-5 h-5" />
                </div>
                <Badge variant="outline" className="border-emerald-500/50 text-emerald-400">
                      Conservation Core
                    </Badge>
              </div>
              <h4 className="kew-card-title">Protected Area Corridors</h4>
              <p className="kew-card-desc">National parks, wildlife sanctuaries, and conservation reserves safeguarding critical Himalayan wildlife corridors.</p>
              <div className="kew-card-cta">
                <span>Explore Module</span>
                <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          <Link href="/seasonal-ecology?habitat=temperate-forest">
            <div className="kew-card-shell kew-card-shell--interactive group h-full">
              <div className="kew-card-top-row">
                <div className="kew-card-icon-box bg-emerald-500/15 border-emerald-500/30 text-emerald-400">
                  <Trees className="w-5 h-5" />
                </div>
                <Badge variant="outline" className="border-teal-500/50 text-teal-400">
                      Habitat Telemetry
                    </Badge>
              </div>
              <h4 className="kew-card-title">Temperate Forest Sentinel Dynamics</h4>
              <p className="kew-card-desc">Explore four-season phenological rhythms, canopy flora, and altitudinal ungulate movements across temperate forests.</p>
              <div className="kew-card-cta">
                <span>Explore Module</span>
                <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
