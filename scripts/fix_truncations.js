const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replacements) {
  const fullPath = path.resolve(filePath);
  if (!fs.existsSync(fullPath)) {
    console.log('File not found:', filePath);
    return;
  }
  let content = fs.readFileSync(fullPath, 'utf8');
  let changed = false;

  for (const { from, to } of replacements) {
    if (content.includes(from)) {
      content = content.split(from).join(to);
      changed = true;
      console.log(`Replaced in ${filePath}: "${from.substring(0, 40)}..." -> "${to.substring(0, 40)}..."`);
    } else {
      console.log(`Pattern not found in ${filePath}: "${from.substring(0, 40)}..."`);
    }
  }

  if (changed) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Saved ${filePath}`);
  }
}

// 1. Protected Areas page
replaceInFile('src/app/protected-areas/page.tsx', [
  {
    from: '<div className="text-xl lg:text-xl font-bold text-white tabular-nums leading-tight truncate">',
    to: '<div className="text-xl lg:text-xl font-bold text-white tabular-nums leading-tight break-words">'
  },
  {
    from: '<h3 className="text-base font-semibold text-white truncate">{pa.name}</h3>',
    to: '<h3 className="text-base font-semibold text-white break-words">{pa.name}</h3>'
  },
  {
    from: '<p className="text-sm text-slate-400 truncate">{pa.description}</p>',
    to: '<p className="text-sm text-slate-400 line-clamp-2">{pa.description}</p>'
  }
]);

// 2. WaterEntityListingPage.tsx
replaceInFile('src/components/common/WaterEntityListingPage.tsx', [
  {
    from: '<span className="truncate max-w-[120px]">{entity.district} District</span>',
    to: '<span className="break-words">{entity.district} District</span>'
  },
  {
    from: '<span className="text-slate-600 truncate max-w-[120px]">{getScopeForUnit(entity.district)}</span>',
    to: '<span className="text-slate-600 break-words">{getScopeForUnit(entity.district)}</span>'
  },
  {
    from: '<span className="text-blue-400/80 truncate max-w-[150px]" title={entity.watershed}>{entity.watershed}</span>',
    to: '<span className="text-blue-400/80 break-words" title={entity.watershed}>{entity.watershed}</span>'
  },
  {
    from: 'max-w-[120px] truncate',
    to: 'break-words'
  }
]);

// 3. ProtectedCategoryPage.tsx
replaceInFile('src/components/common/ProtectedCategoryPage.tsx', [
  {
    from: '<div className="text-base sm:text-lg lg:text-base xl:text-lg font-bold text-white tabular-nums leading-tight truncate">',
    to: '<div className="text-base sm:text-lg lg:text-base xl:text-lg font-bold text-white tabular-nums leading-tight break-words">'
  },
  {
    from: '<div className="text-white font-bold truncate">{area.district}</div>',
    to: '<div className="text-white font-bold break-words">{area.district}</div>'
  },
  {
    from: '<div className="text-emerald-400 font-bold truncate">{(area as any).altitudeRange || `${(area as any).elevation_min_m || 1500}m+`}</div>',
    to: '<div className="text-emerald-400 font-bold break-words">{(area as any).altitudeRange || `${(area as any).elevation_min_m || 1500}m+`}</div>'
  },
  {
    from: '<span className="truncate">{(area as any).hydrological_system}</span>',
    to: '<span className="break-words">{(area as any).hydrological_system}</span>'
  }
]);

// 4. SpeciesDetailPage.tsx & CorridorDetailPage.tsx
replaceInFile('src/components/common/SpeciesDetailPage.tsx', [
  {
    from: '<div className="text-lg font-bold text-white truncate">',
    to: '<div className="text-lg font-bold text-white break-words">'
  }
]);

replaceInFile('src/components/common/CorridorDetailPage.tsx', [
  {
    from: '<div className="text-base font-bold text-white truncate">',
    to: '<div className="text-base font-bold text-white break-words">'
  }
]);

// 5. ImmersiveHero.tsx
replaceInFile('src/components/sections/ImmersiveHero.tsx', [
  {
    from: '<div className="text-xs sm:text-sm text-slate-500 truncate">{item.scientificName}</div>',
    to: '<div className="text-xs sm:text-sm text-slate-400 italic break-words">{item.scientificName}</div>'
  },
  {
    from: '<div className="text-xs sm:text-sm text-slate-500 truncate">{item.district}</div>',
    to: '<div className="text-xs sm:text-sm text-slate-400 break-words">{item.district}</div>'
  },
  {
    from: '<div className="text-xs sm:text-sm text-slate-500 truncate">{item.location}</div>',
    to: '<div className="text-xs sm:text-sm text-slate-400 break-words">{item.location}</div>'
  }
]);

// 6. GlobalFilterBar.tsx
replaceInFile('src/components/common/GlobalFilterBar.tsx', [
  {
    from: '<span className="max-w-[140px] truncate">{isActive ? activeLabel : placeholder}</span>',
    to: '<span className="break-words max-w-[200px]">{isActive ? activeLabel : placeholder}</span>'
  },
  {
    from: '<span className="max-w-[120px] truncate">{selectedDistrictLabel}</span>',
    to: '<span className="break-words max-w-[180px]">{selectedDistrictLabel}</span>'
  }
]);

// 7. Entity Explorer
replaceInFile('src/app/entity-explorer/page.tsx', [
  {
    from: '<h3 className="text-base font-semibold text-white truncate">',
    to: '<h3 className="text-base font-semibold text-white break-words">'
  },
  {
    from: '<span className="truncate">{entity.district}</span>',
    to: '<span className="break-words">{entity.district}</span>'
  }
]);

console.log('Batch truncation fixes applied successfully.');
