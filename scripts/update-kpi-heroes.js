const fs = require('fs');
const glob = require('fast-glob');

async function main() {
  const files = await glob('src/app/biodiversity/**/page.tsx', { cwd: process.cwd(), absolute: true });
  
  for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // 1. Ensure Heading is imported
    if (!content.includes("import { Heading }") && content.includes("<div className=\"relative pt-20")) {
      content = content.replace(
        /import \{ motion \} from 'framer-motion';/,
        "import { motion } from 'framer-motion';\nimport { Heading } from '@/components/common/Heading';"
      );
    }

    // 2. Fix KPI Strips

    // Match Card: <Card className="glass-intense border-white/10 p-5" padding="none">
    content = content.replace(
      /<Card className="glass-intense border-white\/10 p-5" padding="none">/g,
      '<Card className="glass-intense border-white/10 p-4 lg:p-5" padding="none">'
    );

    // Match grid: <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
    // Some are md:grid-cols-4
    content = content.replace(
      /<div className="grid grid-cols-2 md:grid-cols-[45] gap-4">/g,
      '<div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-1 sm:gap-2">'
    );

    // Match Item Wrapper: <div key={idx} className="text-center p-3 border-r border-white/5 last:border-r-0">
    content = content.replace(
      /<div key=\{idx\} className="text-center p-3 border-r border-white\/5 last:border-r-0">/g,
      '<div key={idx} className="py-2 px-1 lg:py-3 lg:px-2 rounded-xl text-center min-w-0">'
    );

    // Replace <stat.icon className={`w-5 h-5 ${...} mx-auto mb-1`} />
    content = content.replace(
      /<stat\.icon className=\{`w-5 h-5 \$\{'color' in stat \? \(stat as any\)\.color : '[^']+'\} mx-auto mb-1`\} \/>/g,
      '<stat.icon className="w-4 h-4 text-forest-500 mx-auto mb-1" />'
    );

    // Replace value: <div className="text-xl font-bold text-white">{stat.value}</div>
    // Ensure we handle typeof correctly.
    const valueRegex = /<div className="text-xl font-bold text-white">\{([^}]+)\}<\/div>/g;
    content = content.replace(valueRegex, (match, innerCode) => {
      return `<div className="text-base sm:text-lg lg:text-base xl:text-lg font-bold text-white tabular-nums leading-tight truncate">
                  {typeof ${innerCode} === 'number' ? ${innerCode}.toLocaleString() : ${innerCode}}
                </div>`;
    });

    // Replace label: <div className="text-xs text-slate-500">{stat.label}</div>
    content = content.replace(
      /<div className="text-xs text-slate-500">\{stat\.label\}<\/div>/g,
      '<div className="text-[9px] sm:text-[10px] lg:text-[9px] xl:text-[10px] text-slate-500 uppercase tracking-wide mt-0.5 leading-tight break-words">{stat.label}</div>'
    );

    // 3. Hero Section replacement strategy
    // We will find the block starting with `<div className="relative pt-20` and ending at its closing `</div>` that is immediately before `</div>\n      </div>` etc.
    // It's easier to regex out the specific fields.
    const heroRegex = /<div className="relative pt-20[^>]+>[\s\S]*?<h1[^>]*>([\s\S]*?)<\/h1>\s*<p[^>]*>([\s\S]*?)<\/p>\s*(<div className="flex flex-col sm:flex-row[^>]*>[\s\S]*?<\/div>)?[\s\S]*?<\/motion\.div>\s*<\/div>\s*<\/div>/;

    const match = content.match(heroRegex);
    if (match) {
      let title = match[1].replace(/<[^>]+>/g, '').trim();
      let subtitle = match[2].trim();
      let actions = match[3] || '';
      
      // Try to find the icon and label
      const labelRegex = /<span className="text-xs[^>]+>(.*?)<\/span>/;
      const labelMatch = match[0].match(labelRegex);
      const label = labelMatch ? labelMatch[1] : 'Biodiversity Intelligence';

      const iconRegex = /<([A-Z][a-zA-Z0-9]+) className="w-6 h-6[^"]+"/;
      const iconMatch = match[0].match(iconRegex);
      const iconName = iconMatch ? iconMatch[1] : 'Leaf';

      let headingMarkup = `
      <Heading
        title="${title}"
        subtitle="${subtitle.replace(/\n\s*/g, ' ')}"
        icon={<${iconName} className="w-6 h-6 text-forest-400" />}
        label="${label}"
        gridOverlay
        images={['/images/biodiversity.png', '/images/bird.png', '/images/plant.png']}
        actions={
          <>
            ${actions.replace(/<div className="flex flex-col sm:flex-row flex-wrap gap-3">/, '').replace(/<\/div>$/, '').trim()}
          </>
        }
      />`;
      
      content = content.replace(heroRegex, headingMarkup);
    }

    if (original !== content) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated ${file}`);
    }
  }
}

main().catch(console.error);
