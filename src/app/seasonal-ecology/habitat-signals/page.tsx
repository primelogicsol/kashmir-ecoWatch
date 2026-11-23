import { SeasonalListingPage } from '@/components/common/SeasonalListingPage';
import { getSeasonalEcologyData } from '@/data/seasonal-ecology';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Radar, Trees, Waves, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HabitatSignalsPage() {
  const signals = getSeasonalEcologyData.habitatSignals.all();

  const districts = Array.from(new Set(signals.flatMap(h => h.districts).filter(Boolean)));
  const signalTypes = Array.from(new Set(signals.map(h => h.signalType).filter(Boolean)));

  return (
    <div className="min-h-screen mx-auto bg-slate-950">
      <SeasonalListingPage
        title="Western Himalayan Habitat Signals"
        subtitle="Wetland water pulses, forest canopy green-up, alpine snow retreat, and ecotone shift dynamics across Kashmir"
        icon="Radar"
        color="from-green-500 to-emerald-600"
        entities={signals}
        entityVariant="habitat"
        metrics={[
          { label: 'Habitat Signals', value: signals.length, icon: 'Radar' as const },
          { label: 'Wetland Signals', value: signals.filter(h => h.signalType.includes('wetland')).length, icon: 'Waves' as const },
          { label: 'Forest Ecotones', value: signals.filter(h => h.signalType.includes('forest')).length, icon: 'Trees' as const },
          { label: 'Alpine & Snow Signals', value: signals.filter(h => h.elevationZone === 'alpine' || h.elevationZone === 'nival').length, icon: 'Mountain' as const },
        ]}
        filters={{
          districts: districts as string[],
          elevationZones: ['lowland', 'mid-elevation', 'highland', 'alpine', 'nival'],
          seasons: ['spring', 'summer', 'autumn', 'winter'],
          additionalFilters: [
            { label: 'Signal Type', options: signalTypes as string[] },
          ],
        }}
        detailPageBaseRoute="/seasonal-ecology/habitat-signals"
        mapPreviewEnabled
        mapCoordinates={{ lat: 34.1800, lng: 74.7500, zoom: 9 }}
      />

      {/* Cross-Link Intelligence Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/biodiversity/habitat-signals">
            <div className="kew-card-shell kew-card-shell--interactive group h-full">
              <div className="kew-card-top-row">
                <div className="kew-card-icon-box bg-emerald-500/15 border-emerald-500/30 text-emerald-400">
                  <Radar className="w-5 h-5" />
                </div>
                <Badge variant="outline" className="border-emerald-500/50 text-emerald-400">
                      Sentinel Telemetry
                    </Badge>
              </div>
              <h4 className="kew-card-title">Biodiversity Habitat Signals Monitor</h4>
              <p className="kew-card-desc">Satellite NDVI trends, vegetation moisture indices, and subalpine ecotone migration benchmarks.</p>
              <div className="kew-card-cta">
                <span>Explore Module</span>
                <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          <Link href="/biodiversity/forest-ecosystems">
            <div className="kew-card-shell kew-card-shell--interactive group h-full">
              <div className="kew-card-top-row">
                <div className="kew-card-icon-box bg-emerald-500/15 border-emerald-500/30 text-emerald-400">
                  <Trees className="w-5 h-5" />
                </div>
                <Badge variant="outline" className="border-teal-500/50 text-teal-400">
                      Canopy Architecture
                    </Badge>
              </div>
              <h4 className="kew-card-title">Kashmir Forest Ecosystems</h4>
              <p className="kew-card-desc">Explore deodar, blue pine, silver fir, and subalpine birch stands across northern and southern forest divisions.</p>
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
