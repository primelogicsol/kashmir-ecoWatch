const fs = require('fs');
let code = fs.readFileSync('src/components/common/WaterEntityListingPage.tsx', 'utf8');

const oldKPI = code.match(/<Card className="glass-intense border-white\/10[\s\S]*?<\/Card>/);
if (oldKPI) {
  const newKPI = `<Card className="glass-intense border-white/10 p-4 lg:p-5" padding="none">
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-1 sm:gap-2">
            {metrics.map((metric, idx) => {
              const MetricIcon = (Icons as any)[metric.icon] || Icons.Activity;
              return (
                <div key={idx} className="py-2 px-1 lg:py-3 lg:px-2 rounded-xl text-center min-w-0">
                  <MetricIcon className={\`w-4 h-4 \${color.includes('blue') ? 'text-blue-500' : 'text-slate-500'} mx-auto mb-1\`} />
                  <div className="text-base sm:text-lg lg:text-base xl:text-lg font-bold text-white tabular-nums leading-tight truncate">
                    {typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}
                  </div>
                  <div className="text-[9px] sm:text-[10px] lg:text-[9px] xl:text-[10px] text-slate-500 uppercase tracking-wide mt-0.5 leading-tight break-words">
                    {metric.label}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>`;

  code = code.replace(oldKPI[0], newKPI);
  fs.writeFileSync('src/components/common/WaterEntityListingPage.tsx', code);
  console.log('WaterEntityListingPage updated');
}
