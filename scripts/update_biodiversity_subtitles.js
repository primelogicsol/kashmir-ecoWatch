const fs = require('fs');
const path = require('path');

const newSubtitles = {
  // SPECIES
  "biodiversity/page.tsx": "A comprehensive species directory mapping Kashmir's terrestrial and aquatic biodiversity, including mammals, birds, fish, and flora. Integrating detailed conservation status, habitat associations, elevational ranges, and critical intelligence for threatened ecosystems and protected zones.",
  "biodiversity/mammals/page.tsx": "A detailed conservation database mapping Kashmir's terrestrial mammals, from critically endangered high-altitude ungulates to forest carnivores. Integrating verified habitat boundaries, regional conservation frameworks, and detailed species population metrics across transboundary protected zones.",
  "biodiversity/birds/page.tsx": "A comprehensive ornithological intelligence layer tracking resident and migratory bird populations across Kashmir's ecosystems. Integrating seasonal flight corridors, breeding habitat parameters, and specialized environmental signals to support targeted wetland and alpine conservation initiatives.",
  "biodiversity/fish/page.tsx": "An aquatic biodiversity matrix analyzing freshwater fish and associated aquatic life across Kashmir's intricate river and lake networks. Integrating critical hydrological parameters, endemic population baselines, and environmental sensitivity indexing for continuous aquatic conservation monitoring.",
  "biodiversity/plants/page.tsx": "A foundational botanical repository indexing vascular plants and diverse flora across Kashmir's varied ecological gradients. Integrating detailed geographical distribution models, intricate ecological associations, and highly verified spatial occurrences across critical conservation landscapes.",
  "biodiversity/medicinal-plants/page.tsx": "A specialized ecological database cataloging Kashmir's traditional medicinal flora and commercially sensitive alpine species. Integrating sustainable harvesting guidelines, ethnobotanical intelligence, and dynamic conservation vulnerability assessments across heavily utilized high-altitude zones.",
  "biodiversity/threatened-species/page.tsx": "A priority conservation intelligence hub monitoring Kashmir's most vulnerable taxa classified under critical IUCN criteria. Integrating active threat assessments, strategic recovery program analytics, and actionable legislative protection frameworks specifically designed for critically endangered species.",

  // OBSERVATION & ECOLOGY
  "biodiversity/wildlife-sightings/page.tsx": "A real-time geospatial ledger capturing verified wildlife observations and critically important community sightings across Kashmir. Integrating expert field intelligence, high-confidence species encounters, and crucial geographical data to formulate dynamic regional distribution models.",
  "biodiversity/birding-hotspots/page.tsx": "An interactive spatial directory identifying prime ornithological observation territories and high-density birding locations in Kashmir. Integrating seasonal accessibility metrics, verified species congregation data, and detailed habitat infrastructure for enhanced avifaunal conservation monitoring.",
  "biodiversity/migration-windows/page.tsx": "A temporal analytical matrix mapping critical migratory bird timelines and cyclical movement patterns across the Himalayan flyways. Integrating precise seasonal arrival models, critical layover habitat evaluations, and real-time environmental indicators to predict dynamic international migration corridors.",
  "biodiversity/pollinator-activity/page.tsx": "A specialized ecological tracking system monitoring essential pollinator activity periods across Kashmir's transitional ecosystems. Integrating advanced phenological markers, seasonal climatic dependencies, and crucial interaction networks between endemic flora and high-altitude insect populations.",
  "biodiversity/phenology-flowering/page.tsx": "A detailed seasonal intelligence ledger recording systematic flowering events and critical phenological transitions in Kashmir. Integrating crucial climate change indicators, dynamic vegetation responses, and highly specialized reproductive success metrics across diverse botanical communities.",
  "biodiversity/habitat-signals/page.tsx": "An advanced environmental early-warning system tracking significant habitat stress and structural transitions across Kashmir. Integrating vital ecological indicators, critical vulnerability thresholds, and dynamic conservation alerts to predict impending ecosystem degradation and fragmentation risks.",
  "biodiversity/seasonal-activity/page.tsx": "A comprehensive temporal intelligence dashboard mapping critical breeding and behavioral windows for Kashmir's wildlife. Integrating foundational reproductive timelines, seasonal habitat utilization models, and vital climatic dependencies to formulate highly targeted regional conservation strategies.",

  // INTELLIGENCE
  "biodiversity/district-profiles/page.tsx": "A regional intelligence matrix providing comprehensive district-level biodiversity assessments across Kashmir's administrative zones. Integrating localized species richness metrics, specific regional conservation priorities, and foundational ecological infrastructure data for decentralized habitat management.",
  "biodiversity/dashboards/page.tsx": "A centralized analytical command layer visualizing macro-level biodiversity trends and critical conservation metrics in Kashmir. Integrating complex ecological datasets, dynamic threat vulnerability indices, and real-time intelligence feeds to empower strategic and data-driven environmental governance."
};

function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walkDir(file));
        } else if (file.endsWith('page.tsx')) {
            results.push(file);
        }
    });
    return results;
}

const pages = walkDir('src/app/biodiversity');
let modified = 0;

pages.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let match = content.match(/subtitle="([^"]*)"/);
  
  if (match) {
    // try to match the short path
    const shortPath = file.replace(/\\/g, '/').replace('src/app/', '');
    if (newSubtitles[shortPath]) {
      content = content.replace(/subtitle="([^"]*)"/, `subtitle="${newSubtitles[shortPath]}"`);
      fs.writeFileSync(file, content);
      modified++;
      console.log('Updated: ' + shortPath + ' | Length: ' + newSubtitles[shortPath].length);
    } else {
        // Just generic replace if missed
        const generic = "An integrated ecological intelligence layer analyzing Kashmir's specific biodiversity domain with verified metrics. Integrating complex spatial distribution mapping, real-time threat vulnerability analysis, and critical longitudinal conservation analytics to protect high-priority regional ecosystems.";
        content = content.replace(/subtitle="([^"]*)"/, `subtitle="${generic}"`);
        fs.writeFileSync(file, content);
        modified++;
        console.log('Updated (Generic): ' + shortPath + ' | Length: ' + generic.length);
    }
  }
});

console.log('Total files modified: ' + modified);
