const fs = require('fs');

let code = fs.readFileSync('src/components/common/BiodiversityCategoryPage.tsx', 'utf8');

const imports = `import { Heading } from '@/components/common/Heading';`;
if (!code.includes('import { Heading }')) {
  code = code.replace(/import { useRouter } from 'next\/navigation';/, `import { useRouter } from 'next/navigation';\n${imports}`);
}

const customHeroRegex = /<div className="relative pt-20 sm:pt-24 md:pt-28 lg:pt-48 pb-4 sm:pb-8 md:pb-12 lg:pb-20 overflow-hidden">[\s\S]*?<\/div>\s*<\/div>/;

const newHero = `      <Heading
        title={<><span className="block whitespace-nowrap">{title.split(' ')[0]}</span><span className="block whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">{title.split(' ').slice(1).join(' ') || 'Species'}</span></>}
        subtitle={subtitle}
        icon={<Icon className={\`w-6 h-6 \${color.includes('emerald') ? 'text-emerald-400' : 'text-slate-400'}\`} />}
        label="Biodiversity Intelligence"
        gridOverlay
        actions={
          <>
            <Button 
              size="lg" 
              className={\`bg-gradient-to-r \${color}\`}
              icon={<Search className="w-5 h-5" />}
            >
              Search {title}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/20 text-white"
              icon={<Map className="w-5 h-5" />}
            >
              Distribution Map
            </Button>
          </>
        }
      />`;

code = code.replace(customHeroRegex, newHero);
fs.writeFileSync('src/components/common/BiodiversityCategoryPage.tsx', code);
