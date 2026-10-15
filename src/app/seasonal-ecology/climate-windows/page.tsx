import { SeasonalListingPage } from '@/components/common/SeasonalListingPage';
import { getSeasonalEcologyData } from '@/data/seasonal-ecology';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Sun, AlertTriangle, CloudSun, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ClimateWindowsPage() {
  const windows = getSeasonalEcologyData.climateWindows.all();

  const districts = Array.from(new Set(windows.flatMap(c => c.districts).filter(Boolean)));
  const windowTypes = Array.from(new Set(windows.map(c => c.windowType).filter(Boolean)));

  return (
    <div className="min-h-screen mx-auto bg-slate-950">
      <SeasonalListingPage
        title="Western Himalayan Climate Windows"
        subtitle="Traditional Kashmiri bioclimatic epochs: Chillai Kalan freeze, Mediterranean snow pulses, and vernal thaw regimes"
        icon="Sun"
        color="from-yellow-500 to-amber-600"
        entities={windows}
        entityVariant="climate"
        metrics={[
          { label: 'Climate Windows', value: windows.length, icon: 'Sun' as const },
          { label: 'Deep Freeze Epochs', value: windows.filter(c => c.windowType.includes('winter')).length, icon: 'Snowflake' as const },
          { label: 'Thaw & Access', value: windows.filter(c => c.windowType.includes('spring') || c.windowType.includes('access')).length, icon: 'Route' as const },
          { label: 'Atmospheric Inversions', value: windows.filter(c => c.windowType.includes('autumn')).length, icon: 'Eye' as const },
        ]}
        filters={{
          districts: districts as string[],
          elevationZones: ['lowland', 'mid-elevation', 'highland', 'alpine'],
          seasons: ['spring', 'summer', 'autumn', 'winter'],
          additionalFilters: [
            { label: 'Window Epoch', options: windowTypes as string[] },
          ],
        }}
        detailPageBaseRoute="/seasonal-ecology/climate-windows"
        mapPreviewEnabled
        mapCoordinates={{ lat: 34.0837, lng: 74.7973, zoom: 9 }}
      />

      {/* Cross-Link Intelligence Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/risk-monitoring">
            <Card className="glass-intense border-amber-500/30 hover:border-amber-500/50 transition-all cursor-pointer group overflow-hidden h-full">
              <div className="relative p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shrink-0 shadow-lg">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Badge variant="outline" className="border-amber-500/50 text-amber-400 mb-1">
                      Hazard Intelligence
                    </Badge>
                    <h4 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                      Multi-Hazard Risk Monitoring
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                      Live flood gauges, real-time SASE avalanche bulletins, landslide corridor risk models, and wildfire telemetry.
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform shrink-0" />
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/environmental-monitoring">
            <Card className="glass-intense border-teal-500/30 hover:border-teal-500/50 transition-all cursor-pointer group overflow-hidden h-full">
              <div className="relative p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shrink-0 shadow-lg">
                    <CloudSun className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Badge variant="outline" className="border-teal-500/50 text-teal-400 mb-1">
                      Environmental Telemetry
                    </Badge>
                    <h4 className="text-lg font-bold text-white group-hover:text-teal-400 transition-colors truncate">
                      Air Quality & Weather Telemetry
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                      Real-time AQI readings, diurnal temperature variations, and automated meteorological station tracking.
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
