import { SeasonalListingPage } from '@/components/common/SeasonalListingPage';
import { getSeasonalEcologyData } from '@/data/seasonal-ecology';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Calendar, Leaf, ArrowRight, Flower2 } from 'lucide-react';
import Link from 'next/link';

export default function PhenologyRecordsPage() {
  const records = getSeasonalEcologyData.phenology.all();

  const districts = Array.from(new Set(records.flatMap(r => r.districts).filter(Boolean)));
  const recordTypes = Array.from(new Set(records.map(r => r.recordType).filter(Boolean)));
  const taxonomicGroups = Array.from(new Set(records.map(r => r.taxonomicGroup).filter(Boolean)));

  return (
    <div className="min-h-screen mx-auto bg-slate-950">
      <SeasonalListingPage
        title="Western Himalayan Phenology Records"
        subtitle="Flowering onsets, leaf flushing, autumn senescence, and climate-induced shift telemetry across Kashmir"
        icon="Calendar"
        color="from-violet-500 to-purple-600"
        entities={records}
        entityVariant="phenology"
        metrics={[
          { label: 'Phenology Records', value: records.length, icon: 'Calendar' as const },
          { label: 'Flowering Records', value: records.filter(r => r.recordType === 'flowering').length, icon: 'Flower2' as const },
          { label: 'Faunal Cycles', value: records.filter(r => r.recordType.includes('bird') || r.recordType.includes('wildlife')).length, icon: 'Bird' as const },
          { label: 'Verified Records', value: records.filter(r => r.verificationStatus === 'verified').length, icon: 'CheckCircle' as const },
        ]}
        filters={{
          districts: districts as string[],
          elevationZones: ['lowland', 'mid-elevation', 'highland', 'alpine'],
          seasons: ['spring', 'summer', 'autumn', 'winter'],
          additionalFilters: [
            { label: 'Record Type', options: recordTypes as string[] },
            { label: 'Taxonomic Group', options: taxonomicGroups as string[] },
          ],
        }}
        detailPageBaseRoute="/seasonal-ecology/phenology-records"
        mapPreviewEnabled
        mapCoordinates={{ lat: 34.0837, lng: 74.7973, zoom: 9 }}
      />

      {/* Cross-Link Intelligence Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/biodiversity/phenology-flowering">
            <Card className="glass-intense border-violet-500/30 hover:border-violet-500/50 transition-all cursor-pointer group overflow-hidden h-full">
              <div className="relative p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0 shadow-lg">
                    <Flower2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Badge variant="outline" className="border-violet-500/50 text-violet-400 mb-1">
                      Phenological Telemetry
                    </Badge>
                    <h4 className="text-lg font-bold text-white group-hover:text-violet-400 transition-colors truncate">
                      Kashmir Phenology & Flowering Hub
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                      Growing degree days (GDD), chilling hour thresholds, and bloom advance indicators across orchard and alpine flora.
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-violet-400 group-hover:translate-x-1 transition-transform shrink-0" />
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/biodiversity/medicinal-plants">
            <Card className="glass-intense border-emerald-500/30 hover:border-emerald-500/50 transition-all cursor-pointer group overflow-hidden h-full">
              <div className="relative p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shrink-0 shadow-lg">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Badge variant="outline" className="border-emerald-500/50 text-emerald-400 mb-1">
                      Ethnobotanical Flora
                    </Badge>
                    <h4 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors truncate">
                      Medicinal Plant Flowering Windows
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                      Flowering dates, active chemical constituent windows, and conservation red-list statuses for high-altitude herbs.
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform shrink-0" />
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
