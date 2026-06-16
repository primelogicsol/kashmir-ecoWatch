const fs = require('fs');
let code = fs.readFileSync('src/app/biodiversity/species/[slug]/page.tsx', 'utf8');

// Fix primary CTAs
code = code.replace(
  '<Button className="bg-gradient-to-r from-emerald-600 to-emerald-500" icon={<Map className="w-5 h-5" />}>',
  '<Button onClick={() => setActiveTab(\'distribution\')} className="bg-gradient-to-r from-emerald-600 to-emerald-500" icon={<Map className="w-5 h-5" />}>'
);
code = code.replace(
  '<Button variant="outline" className="border-white/20 text-white" icon={<Eye className="w-5 h-5" />}>\n                    View Sightings',
  '<Button onClick={() => setActiveTab(\'sightings\')} variant="outline" className="border-white/20 text-white" icon={<Eye className="w-5 h-5" />}>\n                    View Sightings'
);
code = code.replace(
  '<Button variant="outline" className="border-white/20 text-white" icon={<FileText className="w-5 h-5" />}>\n                    Related Reports',
  '<Button onClick={() => setActiveTab(\'reports\')} variant="outline" className="border-white/20 text-white" icon={<FileText className="w-5 h-5" />}>\n                    Related Reports'
);

// Fix tab-specific CTAs
code = code.replace(
  '<Button variant="outline" size="sm" className="border-white/20 text-white" icon={<Map className="w-4 h-4" />}>\n                  Open Full Atlas',
  '<Button onClick={() => router.push(\'/atlas\')} variant="outline" size="sm" className="border-white/20 text-white" icon={<Map className="w-4 h-4" />}>\n                  Open Full Atlas'
);
code = code.replace(
  '<Button className="bg-gradient-to-r from-emerald-600 to-emerald-500" icon={<Eye className="w-4 h-4" />}>\n                  View All Sightings',
  '<Button onClick={() => router.push(\'/biodiversity/wildlife-sightings\')} className="bg-gradient-to-r from-emerald-600 to-emerald-500" icon={<Eye className="w-4 h-4" />}>\n                  View All Sightings'
);
code = code.replace(
  '<Button variant="outline" size="sm" className="border-white/20 text-white" icon={<ExternalLink className="w-4 h-4" />}>\n                          View',
  '<Button onClick={() => router.push(\'/library\')} variant="outline" size="sm" className="border-white/20 text-white" icon={<ExternalLink className="w-4 h-4" />}>\n                          View'
);

fs.writeFileSync('src/app/biodiversity/species/[slug]/page.tsx', code);
