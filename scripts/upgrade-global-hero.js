const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else if (filePath.endsWith('page.tsx')) {
      results.push(filePath);
    }
  });
  return results;
}

const allPages = walk('src/app');

for (const p of allPages) {
  let c = fs.readFileSync(p, 'utf8');
  let originalC = c;
  
  if (!c.includes('<Heading')) continue;

  // 1. Fix the Icon (Layer 1)
  // If we find an icon defined as a huge box, or any icon that is not just <IconName className="w-6 h-6 text-emerald-400" />
  // This regex matches icon={<div ...> <IconName ... /> </div>}
  const iconMatch = c.match(/icon=\{\s*<div[^>]*>\s*<([A-Za-z0-9]+)[^>]*\/>\s*<\/div>\s*\}/);
  if (iconMatch) {
    c = c.replace(iconMatch[0], `icon={<${iconMatch[1]} className="w-6 h-6 text-emerald-400" />}`);
  } else {
    // If it's already a component but maybe has wrong classes
    const simpleIconMatch = c.match(/icon=\{<([A-Za-z0-9]+) className="([^"]*)"\s*\/>\}/);
    if (simpleIconMatch) {
       c = c.replace(simpleIconMatch[0], `icon={<${simpleIconMatch[1]} className="w-6 h-6 text-emerald-400" />}`);
    } else {
        // Look for string icons like icon="Mountain"
        const stringIconMatch = c.match(/icon="([A-Za-z0-9]+)"/);
        // It's fine for ProtectedCategoryPage or WaterEntityListingPage, they handle string icons internally.
        // Wait, WaterEntityListingPage takes string? No, WaterEntityListingPage takes icon="Wind" etc.
    }
  }

  // 2. Fix the Badge -> Label (Layer 1)
  const badgeMatch = c.match(/badge=\{<Badge[^>]*>(.*?)<\/Badge>\}/);
  if (badgeMatch) {
    const labelText = badgeMatch[1].replace(/<[^>]+>/g, '').trim(); // Remove inner tags if any
    c = c.replace(badgeMatch[0], `label="${labelText}"`);
  }

  // 3. Fix Title (Layer 2)
  // Look for titles that are not using the 2-span format
  // Example: title={<>Risk & <span className="text-emerald-400">Monitoring</span> Intelligence</>}
  // Example: title="Something Something"
  
  // We want to avoid touching already perfect titles.
  const perfectTitleMatch = c.match(/title=\{<><span className="block whitespace-nowrap">.*?<\/span><span className="block whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">.*?<\/span><\/>\}/);
  
  if (!perfectTitleMatch) {
     const titlePropMatch = c.match(/title=\{([^}]*)\}/) || c.match(/title="([^"]*)"/);
     if (titlePropMatch) {
        let rawText = titlePropMatch[1];
        // strip HTML tags
        rawText = rawText.replace(/<[^>]+>/g, '').replace(/\{\/\*.*?\*\/\}/g, '').replace(/[\{\}]/g, '').trim();
        // Remove extra spaces
        rawText = rawText.replace(/\s+/g, ' ');
        // Split in half
        const words = rawText.split(' ');
        if (words.length >= 2) {
            const mid = Math.ceil(words.length / 2);
            const firstHalf = words.slice(0, mid).join(' ');
            const secondHalf = words.slice(mid).join(' ');
            const newTitle = `title={<><span className="block whitespace-nowrap">${firstHalf}</span><span className="block whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">${secondHalf}</span></>}`;
            
            if (c.match(/title=\{([^}]*)\}/)) {
                c = c.replace(/title=\{([^}]*)\}/, newTitle);
            } else {
                c = c.replace(/title="([^"]*)"/, newTitle);
            }
        }
     }
  }

  // 4. Fix CTA Buttons (Layer 4)
  // Ensure primary buttons use from-emerald-600 to-emerald-500
  // Secondary buttons should be variant="outline" className="border-white/20 text-white"
  
  const actionsMatch = c.match(/actions=\{([\s\S]*?)\}/);
  if (actionsMatch) {
     let actionsCode = actionsMatch[1];
     // Replace blue/red/amber gradients with emerald
     actionsCode = actionsCode.replace(/from-[a-z]+-\d+ to-[a-z]+-\d+/g, "from-emerald-600 to-emerald-500");
     
     // Also, if a button doesn't have a gradient but is primary, add it
     actionsCode = actionsCode.replace(/className="(bg-[a-z]+-\d+ hover:bg-[a-z]+-\d+ [^"]*)"/g, 'className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-xl"');
     
     c = c.replace(actionsMatch[0], `actions={${actionsCode}}`);
  }

  if (c !== originalC) {
    fs.writeFileSync(p, c, 'utf8');
    console.log('Upgraded global hero in:', p);
  }
}
