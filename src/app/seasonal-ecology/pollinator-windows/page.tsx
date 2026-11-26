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
      <div className="container mx-auto pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/biodiversity/pollinator-activity">
            <div className="kew-card-shell kew-card-shell--interactive group h-full">
              <div className="kew-card-top-row">
                <div className="kew-card-icon-box bg-emerald-500/15 border-emerald-500/30 text-emerald-400">
                  <Bug className="w-5 h-5" />
                </div>
                <Badge variant="outline" className="border-amber-500/50 text-amber-400">
                      Entomological Core
                    </Badge>
              </div>
              <h4 className="kew-card-title">Kashmir Pollinator Activity Hub</h4>
              <p className="kew-card-desc">Thermodynamic flight thresholds, buzz-pollination mechanics, and floral visitor inventories across all districts.</p>
              <div className="kew-card-cta">
                <span>Explore Module</span>
                <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          <Link href="/seasonal-ecology/bloom-mapping">
            <div className="kew-card-shell kew-card-shell--interactive group h-full">
              <div className="kew-card-top-row">
                <div className="kew-card-icon-box bg-emerald-500/15 border-emerald-500/30 text-emerald-400">
                  <Flower2 className="w-5 h-5" />
                </div>
                <Badge variant="outline" className="border-pink-500/50 text-pink-400">
                      Floral Waves
                    </Badge>
              </div>
              <h4 className="kew-card-title">Bloom Mapping & Floral Landscapes</h4>
              <p className="kew-card-desc">Correlate insect foraging windows with almond, apple, saffron, and alpine wildflower bloom waves.</p>
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
