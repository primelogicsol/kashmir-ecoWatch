const fs = require('fs');
const glob = require('fast-glob');

async function main() {
  const files = await glob('src/app/biodiversity/**/page.tsx', { cwd: process.cwd(), absolute: true });
  
  let updatedCount = 0;

  for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // 1. Update Card classes
    content = content.replace(
      /<Card className="glass-intense border-white\/10 p-6" padding="none">/g,
      '<Card className="glass-intense border-white/10 p-4 lg:p-5" padding="none">'
    );

    // 2. Update Grid classes
    content = content.replace(
      /<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">/g,
      '<div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-1 sm:gap-2">'
    );

    // 3. Update Metric Item Wrapper (with the complex border-r classes)
    content = content.replace(
      /<div key=\{idx\} className="text-center p-4 border-r border-white\/5 even:border-r-0 md:even:border-r md:\[&:nth-child\(4n\)\]:border-r-0 lg:\[&:nth-child\(4n\)\]:border-r lg:last:border-r-0">/g,
      '<div key={idx} className="py-2 px-1 lg:py-3 lg:px-2 rounded-xl text-center min-w-0">'
    );

    // 4. Update Metric Icon
    content = content.replace(
      /<metric\.icon className="w-5 h-5 text-slate-500 mx-auto mb-2" \/>/g,
      '<metric.icon className="w-4 h-4 text-forest-500 mx-auto mb-1" />'
    );
    
    // Also catch variants where icon color might be different
    content = content.replace(
      /<metric\.icon className="w-5 h-5 text-[^"]+ mx-auto mb-2" \/>/g,
      '<metric.icon className="w-4 h-4 text-forest-500 mx-auto mb-1" />'
    );

    // 5. Update Value Container
    // Old: <div className="text-2xl font-bold text-white tabular-nums">\n  {metric.value.toLocaleString()}\n</div>
    // Note: Some use {metric.value.toLocaleString()}, some just {metric.value}
    // We'll replace the div wrapper and its inner content
    const valueRegex = /<div className="text-2xl font-bold text-white tabular-nums">\s*\{?([^}]+)\}?\s*<\/div>/g;
    content = content.replace(valueRegex, (match, innerCode) => {
      // If it already contains typeof, skip
      if (innerCode.includes('typeof')) return match;
      
      // If it's something like `metric.value.toLocaleString()`, map it to metric.value
      let baseVar = innerCode.replace(/\.toLocaleString\(\)/g, '').trim();
      if (baseVar.startsWith('{') && baseVar.endsWith('}')) {
          baseVar = baseVar.substring(1, baseVar.length - 1);
      }
      return `<div className="text-base sm:text-lg lg:text-base xl:text-lg font-bold text-white tabular-nums leading-tight truncate">
                    {typeof ${baseVar} === 'number' ? ${baseVar}.toLocaleString() : ${baseVar}}
                  </div>`;
    });

    // 6. Update Label Container
    content = content.replace(
      /<div className="text-xs text-slate-500 uppercase tracking-wider mt-1">/g,
      '<div className="text-[9px] sm:text-[10px] lg:text-[9px] xl:text-[10px] text-slate-500 uppercase tracking-wide mt-0.5 leading-tight break-words">'
    );

    // Also need to check if they use <Heading> component.
    // If they have a custom hero div, we can't safely auto-replace without knowing properties, 
    // but the user only explicitly mentioned the kpi strip layout, font size, icon color, number. Wait, the user said:
    // "see reference hero section and kpi stip modles are implement in all these Biodiversity"
    // So I must ensure they use Heading. I will flag files that don't have <Heading>.
    
    if (original !== content) {
      fs.writeFileSync(file, content, 'utf8');
      updatedCount++;
      console.log(`Updated KPI strip in: ${file}`);
    }
    
    if (!content.includes('<Heading')) {
      console.log(`WARNING: No <Heading> found in: ${file}`);
    }
  }

  console.log(`Updated ${updatedCount} files.`);
}

main().catch(console.error);
