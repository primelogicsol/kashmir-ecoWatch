const fs = require('fs');

const updates = [
  {
    file: 'src/app/biodiversity/birds/page.tsx',
    search: /const metrics = \[([\s\S]*?)\];/,
    replace: `const metrics = [
    { label: 'Total Species', value: species.length, icon: 'Activity' as const },
    { label: 'Migratory', value: 89, icon: 'Calendar' as const },
    { label: 'Threatened', value: species.filter(s => ['CR', 'EN', 'VU'].includes(s.conservationStatus)).length, icon: 'Shield' as const },
    { label: 'Verified Sightings', value: 1567, icon: 'Eye' as const },
    { label: 'Wetland Birds', value: 45, icon: 'Droplet' as const },
    { label: 'Alpine Species', value: 24, icon: 'Mountain' as const },
    { label: 'Forest Birds', value: 68, icon: 'Leaf' as const },
    { label: 'Endemic', value: 3, icon: 'MapPin' as const },
  ];`
  },
  {
    file: 'src/app/biodiversity/fish/page.tsx',
    search: /const metrics = \[([\s\S]*?)\];/,
    replace: `const metrics = [
    { label: 'Total Species', value: species.length, icon: 'Droplet' as const },
    { label: 'Water Systems', value: 47, icon: 'Waves' as const },
    { label: 'Native Species', value: 18, icon: 'Shield' as const },
    { label: 'Records', value: 1315, icon: 'Eye' as const },
    { label: 'Endemic', value: 5, icon: 'MapPin' as const },
    { label: 'Threatened', value: species.filter(s => ['CR', 'EN', 'VU'].includes(s.conservationStatus)).length, icon: 'AlertTriangle' as const },
    { label: 'Cold Water', value: 12, icon: 'Activity' as const },
    { label: 'Migratory', value: 3, icon: 'ArrowRight' as const },
  ];`
  },
  {
    file: 'src/app/biodiversity/mammals/page.tsx',
    search: /const metrics = \[([\s\S]*?)\];/,
    replace: `const metrics = [
    { label: 'Total Species', value: species.length, icon: 'Activity' as const },
    { label: 'Threatened', value: species.filter(s => ['CR', 'EN', 'VU'].includes(s.conservationStatus)).length, icon: 'Shield' as const },
    { label: 'Endemic', value: 4, icon: 'MapPin' as const },
    { label: 'Records', value: 890, icon: 'Eye' as const },
    { label: 'Alpine', value: 15, icon: 'Mountain' as const },
    { label: 'Forest', value: 22, icon: 'Leaf' as const },
    { label: 'Carnivores', value: 8, icon: 'AlertTriangle' as const },
    { label: 'Herbivores', value: 14, icon: 'Sprout' as const },
  ];`
  },
  {
    file: 'src/app/biodiversity/medicinal-plants/page.tsx',
    search: /const metrics = \[([\s\S]*?)\];/,
    replace: `const metrics = [
    { label: 'Total Species', value: species.length, icon: 'Leaf' as const },
    { label: 'Threatened', value: species.filter(s => ['CR', 'EN', 'VU'].includes(s.conservationStatus)).length, icon: 'Shield' as const },
    { label: 'Alpine Herbs', value: 34, icon: 'Mountain' as const },
    { label: 'Forest Herbs', value: 28, icon: 'Sprout' as const },
    { label: 'Endemic', value: 12, icon: 'MapPin' as const },
    { label: 'Commercial Value', value: 45, icon: 'TrendingUp' as const },
    { label: 'Regulated', value: 18, icon: 'AlertTriangle' as const },
    { label: 'Records', value: 2100, icon: 'Eye' as const },
  ];`
  },
  {
    file: 'src/app/biodiversity/plants/page.tsx',
    search: /const metrics = \[([\s\S]*?)\];/,
    replace: `const metrics = [
    { label: 'Total Species', value: 234, icon: 'Flower2' as const },
    { label: 'Endemic', value: 23, icon: 'Shield' as const },
    { label: 'Flowering', value: 189, icon: 'Leaf' as const },
    { label: 'Records', value: 567, icon: 'Eye' as const },
    { label: 'Alpine Flora', value: 89, icon: 'Mountain' as const },
    { label: 'Wetland Flora', value: 45, icon: 'Droplet' as const },
    { label: 'Threatened', value: species.filter(s => ['CR', 'EN', 'VU'].includes(s.conservationStatus)).length, icon: 'AlertTriangle' as const },
    { label: 'Trees', value: 42, icon: 'Sprout' as const },
  ];`
  },
  {
    file: 'src/app/biodiversity/threatened-species/page.tsx',
    search: /const metrics = \[([\s\S]*?)\];/,
    replace: `const metrics = [
    { label: 'Total Species', value: species.length, icon: 'AlertTriangle' as const },
    { label: 'Critically Endangered', value: species.filter(s => s.conservationStatus === 'CR').length, icon: 'Shield' as const },
    { label: 'Endangered', value: species.filter(s => s.conservationStatus === 'EN').length, icon: 'ShieldAlert' as const },
    { label: 'Vulnerable', value: species.filter(s => s.conservationStatus === 'VU').length, icon: 'ShieldCheck' as const },
    { label: 'Endemic', value: 15, icon: 'MapPin' as const },
    { label: 'Mammals', value: 12, icon: 'Mountain' as const },
    { label: 'Birds', value: 18, icon: 'Bird' as const },
    { label: 'Plants', value: 24, icon: 'Leaf' as const },
  ];`
  },
  {
    file: 'src/app/biodiversity/wildlife-sightings/page.tsx',
    search: /\{\[\s*\{\s*label:\s*'Total Sightings'[\s\S]*?\]\.map/m,
    replace: `{[
              { label: 'Total Sightings', value: totalCount, icon: Eye, color: 'text-white' },
              { label: 'Verified', value: verifiedCount, icon: CheckCircle, color: 'text-emerald-400' },
              { label: 'Reviewed', value: reviewedCount, icon: CheckCircle, color: 'text-blue-400' },
              { label: 'Community', value: communityCount, icon: Users, color: 'text-amber-400' },
              { label: 'Pending', value: pendingCount, icon: AlertCircle, color: 'text-slate-400' },
              { label: 'Mammals', value: 150, icon: Mountain, color: 'text-slate-300' },
              { label: 'Birds', value: 450, icon: Eye, color: 'text-sky-300' },
              { label: 'Districts', value: 16, icon: MapPin, color: 'text-teal-300' },
            ].map`
  },
  {
    file: 'src/app/biodiversity/birding-hotspots/page.tsx',
    search: /\{\[\s*\{\s*label:\s*'Total Hotspots'[\s\S]*?\]\.map/m,
    replace: `{[
              { label: 'Total Hotspots', value: birdingTrails.length, icon: MapPin, color: 'text-white' },
              { label: 'Birding Routes', value: birdingTrails.filter(t => t.category === 'birding').length, icon: Eye, color: 'text-teal-400' },
              { label: 'Wetland Hotspots', value: birdingTrails.filter(t => t.category === 'wetland').length, icon: Eye, color: 'text-sky-400' },
              { label: 'Open Access', value: openCount, icon: Shield, color: 'text-emerald-400' },
              { label: 'Restricted', value: restrictedCount, icon: Filter, color: 'text-amber-400' },
              { label: 'High Altitude', value: 12, icon: Mountain, color: 'text-slate-300' },
              { label: 'Migratory Hubs', value: 8, icon: Clock, color: 'text-purple-300' },
              { label: 'Avg Distance', value: '14km', icon: Footprints, color: 'text-stone-300' },
            ].map`
  },
  {
    file: 'src/app/biodiversity/migration-windows/page.tsx',
    search: /\{\[\s*\{\s*label:\s*'Total Windows'[\s\S]*?\]\.map/m,
    replace: `{[
              { label: 'Total Windows', value: windows.length, icon: Clock, color: 'text-white' },
              { label: 'Active Now', value: activeWindows.length, icon: Eye, color: 'text-emerald-400' },
              { label: 'Wetland Sites', value: windows.length, icon: MapPin, color: 'text-sky-400' },
              { label: 'Est. Population', value: totalEstimatedPop > 1000 ? \`\${(totalEstimatedPop / 1000).toFixed(0)}K+\` : \`\${totalEstimatedPop}+\`, icon: Eye, color: 'text-amber-400' },
              { label: 'Migration Types', value: migrationTypes.length, icon: Calendar, color: 'text-purple-400' },
              { label: 'Spring', value: 45, icon: ArrowRight, color: 'text-green-400' },
              { label: 'Autumn', value: 65, icon: ArrowRight, color: 'text-orange-400' },
              { label: 'Winter Visitors', value: 120, icon: Clock, color: 'text-blue-400' },
            ].map`
  },
  {
    file: 'src/app/biodiversity/pollinator-activity/page.tsx',
    search: /\{\[\s*\{\s*label:\s*'Pollinator Windows'[\s\S]*?\]\.map/m,
    replace: `{[
              { label: 'Pollinator Windows', value: windows.length, icon: Activity, color: 'text-white' },
              { label: 'Active Now', value: activeWindows.length, icon: Activity, color: 'text-emerald-400' },
              { label: 'Associated Blooms', value: allBlooms.length, icon: Sprout, color: 'text-pink-400' },
              { label: 'Districts', value: allDistricts.length, icon: MapPin, color: 'text-teal-400' },
              { label: 'Peak Months', value: windows.length > 0 ? windows[0].peakActivityMonths.length : 0, icon: Calendar, color: 'text-purple-400' },
              { label: 'Bees', value: 45, icon: Activity, color: 'text-amber-400' },
              { label: 'Butterflies', value: 34, icon: Leaf, color: 'text-orange-400' },
              { label: 'Moths', value: 22, icon: Eye, color: 'text-stone-400' },
            ].map`
  },
  {
    file: 'src/app/biodiversity/phenology-flowering/page.tsx',
    search: /\{\[\s*\{\s*label:\s*'Total Records'[\s\S]*?\]\.map/m,
    replace: `{[
              { label: 'Total Records', value: records.length, icon: Calendar, color: 'text-white' },
              { label: 'Flowering Events', value: floweringCount, icon: Sprout, color: 'text-pink-400' },
              { label: 'Bird Arrival', value: birdArrivalCount, icon: Leaf, color: 'text-sky-400' },
              { label: 'Breeding Records', value: breedingCount, icon: Sprout, color: 'text-emerald-400' },
              { label: 'Districts', value: districts.length, icon: MapPin, color: 'text-teal-400' },
              { label: 'Fruit Set', value: 45, icon: Activity, color: 'text-orange-400' },
              { label: 'Leaf Fall', value: 34, icon: ArrowRight, color: 'text-amber-400' },
              { label: 'Hibernation', value: 12, icon: Clock, color: 'text-stone-400' },
            ].map`
  },
  {
    file: 'src/app/biodiversity/habitat-signals/page.tsx',
    search: /\{\[\s*\{\s*label:\s*'Total Signals'[\s\S]*?\]\.map/m,
    replace: `{[
              { label: 'Total Signals', value: signals.length, icon: Layers, color: 'text-white' },
              { label: 'Active Now', value: activeSignals.length, icon: AlertTriangle, color: 'text-amber-400' },
              { label: 'Districts Monitored', value: districts.length, icon: MapPin, color: 'text-teal-400' },
              { label: 'Habitat Types', value: signalTypes.length, icon: Leaf, color: 'text-emerald-400' },
              { label: 'Critical Alerts', value: signals.filter(s => s.signalType.includes('contraction') || s.signalType.includes('retreat')).length, icon: AlertTriangle, color: 'text-red-400' },
              { label: 'Snow Retreat', value: 12, icon: Mountain, color: 'text-blue-300' },
              { label: 'Wetland Loss', value: 8, icon: Eye, color: 'text-orange-400' },
              { label: 'Forest Shift', value: 15, icon: Sprout, color: 'text-green-400' },
            ].map`
  },
  {
    file: 'src/app/biodiversity/seasonal-activity/page.tsx',
    search: /\{\[\s*\{\s*label:\s*'Activity Records'[\s\S]*?\]\.map/m,
    replace: `{[
              { label: 'Activity Records', value: activities.length, icon: Calendar, color: 'text-white' },
              { label: 'Breeding Periods', value: breedingCount, icon: Sprout, color: 'text-emerald-400' },
              { label: 'Migration Events', value: migrationCount, icon: ArrowRight, color: 'text-sky-400' },
              { label: 'Taxa Covered', value: taxa.length, icon: Mountain, color: 'text-amber-400' },
              { label: 'Peak Month Activity', value: Math.max(...monthlyCounts), icon: Activity, color: 'text-red-400' },
              { label: 'Foraging', value: 45, icon: Leaf, color: 'text-green-400' },
              { label: 'Hibernation', value: 12, icon: Clock, color: 'text-stone-400' },
              { label: 'Visibility Peak', value: 34, icon: Eye, color: 'text-purple-400' },
            ].map`
  },
  {
    file: 'src/app/biodiversity/district-profiles/page.tsx',
    search: /\{\[\s*\{\s*label:\s*'Total Districts'[\s\S]*?\]\.map/m,
    replace: `{[
              { label: 'Total Districts', value: districts.length, icon: Building2 },
              { label: 'Total Species', value: totalSpecies, icon: Leaf },
              { label: 'Avg Species/District', value: avgSpecies, icon: MapPin },
              { label: 'Highest Richness', value: highestRichness?.district || '—', icon: Mountain, isText: true },
              { label: 'Most Threatened', value: mostThreatened?.district || '—', icon: AlertTriangle, isText: true },
              { label: 'Endemic Hotspots', value: 4, icon: MapPin, color: 'text-purple-400' },
              { label: 'Wetland Districts', value: 6, icon: Eye, color: 'text-blue-400' },
              { label: 'Forest Cover', value: '45%', icon: Sprout, color: 'text-green-400' },
            ].map`
  }
];

// Now change ALL grid classes to lg:grid-cols-8
for (const update of updates) {
  try {
    let content = fs.readFileSync(update.file, 'utf8');
    
    // update array content
    if (update.search && update.replace) {
      content = content.replace(update.search, update.replace);
    }

    // globally ensure grid classes for the metrics wrapper are 8 columns
    content = content.replace(
      /grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-1 sm:gap-2/g,
      'grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-1 sm:gap-2'
    );
    // some might have the old 5
    content = content.replace(
      /grid-cols-2 md:grid-cols-5 gap-4/g,
      'grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-1 sm:gap-2'
    );

    fs.writeFileSync(update.file, content, 'utf8');
    console.log('Updated array and grid in', update.file);
  } catch (err) {
    console.error('Error in', update.file, err.message);
  }
}
