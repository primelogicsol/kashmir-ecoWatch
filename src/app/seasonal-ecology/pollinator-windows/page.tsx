import { SeasonalListingPage } from '@/components/common/SeasonalListingPage';
import { getSeasonalEcologyData } from '@/data/seasonal-ecology';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Bug, Flower2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function PollinatorWindowsPage() {
  const pollinators = getSeasonalEcologyData.pollinators.all();

  const districts = Array.from(new Set(pollinators.flatMap(p => p.districts).filter(Boolean)));
  const pollinatorGroups = Array.from(new Set(pollinators.map(p => p.pollinatorGroup).filter(Boolean)));

  return (
    <div className="min-h-screen mx-auto bg-slate-950">
      <SeasonalListingPage
        title="Western Himalayan Pollinator Windows"
        subtitle="Orchard bee flights, high-altitude bumblebee windows, and butterfly migrations across Kashmir"
        icon="Bug"
        color="from-amber-500 to-orange-600"
        entities={pollinators}
        entityVariant="pollinator"
        metrics={[
          { label: 'Pollinator Windows', value: pollinators.length, icon: 'Bug' as const },
          { label: 'Bee Species', value: '47+', icon: 'Bug' as const },
          { label: 'Butterfly Species', value: '150+', icon: 'Bird' as const },
          { label: 'Orchard Area', value: '850 km²', icon: 'TreeDeciduous' as const },
        ]}
        filters={{
          districts: districts as string[],
          seasons: ['spring', 'summer', 'autumn'],
          additionalFilters: [
            { label: 'Pollinator Group', options: pollinatorGroups as string[] },
          ],
        }}
        detailPageBaseRoute="/seasonal-ecology/pollinator-windows"
        mapPreviewEnabled
        mapCoordinates={{ lat: 34.0500, lng: 74.8000, zoom: 9 }}
      />

      {/* Cross-Link Intelligence Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/biodiversity/pollinator-activity">
            <Card className="glass-intense border-amber-500/30 hover:border-amber-500/50 transition-all cursor-pointer group overflow-hidden h-full">
              <div className="relative p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shrink-0 shadow-lg">
                    <Bug className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Badge variant="outline" className="border-amber-500/50 text-amber-400 mb-1">
                      Entomological Core
                    </Badge>
                    <h4 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                      Kashmir Pollinator Activity Hub
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                      Thermodynamic flight thresholds, buzz-pollination mechanics, and floral visitor inventories across all districts.
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform shrink-0" />
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/seasonal-ecology/bloom-mapping">
            <Card className="glass-intense border-pink-500/30 hover:border-pink-500/50 transition-all cursor-pointer group overflow-hidden h-full">
              <div className="relative p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shrink-0 shadow-lg">
                    <Flower2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Badge variant="outline" className="border-pink-500/50 text-pink-400 mb-1">
                      Floral Waves
                    </Badge>
                    <h4 className="text-lg font-bold text-white group-hover:text-pink-400 transition-colors truncate">
                      Bloom Mapping & Floral Landscapes
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                      Correlate insect foraging windows with almond, apple, saffron, and alpine wildflower bloom waves.
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-pink-400 group-hover:translate-x-1 transition-transform shrink-0" />
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
