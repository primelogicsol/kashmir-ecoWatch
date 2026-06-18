const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const dirToWalk = path.join(__dirname, 'src');

walkDir(dirToWalk, (filePath) => {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. General replacements for simple text in strings or JSX
  content = content.replace(/Greater Kashmir Ecology/g, "Western Himalayan");
  content = content.replace(/Greater Kashmir ecology/g, "Western Himalayan ecology");
  content = content.replace(/Greater Kashmir Ecology/gi, "Western Himalayan");
  content = content.replace(/Greater Kashmir/g, "Western Himalayan");
  content = content.replace(/Across Western Himalayan/g, "Western Himalayan");
  content = content.replace(/across Western Himalayan/g, "across Western Himalayan");
  
  // Clean up "Across " in front of Western Himalayan, but keep it if it's lowercase 'across' in a sentence
  content = content.replace(/Across the Western Himalayan/g, "Western Himalayan");
  content = content.replace(/Across Western Himalayan/g, "Western Himalayan");

  // Specific module renames requested by user
  content = content.replace(/Western Himalayan Flood Risk/g, "Western Himalayan Flood Intelligence");
  content = content.replace(/Western Himalayan Wastewater/g, "Western Himalayan Wastewater Systems");
  content = content.replace(/Western Himalayan Solid Waste/g, "Western Himalayan Solid Waste Intelligence");
  content = content.replace(/Western Himalayan Bio-Waste Management/g, "Western Himalayan Bio-Waste Intelligence");

  // Fix Heading component JSX structure:
  // Usually: <span ...>Module Name</span><span ...>Western Himalayan</span>
  // The user wants: Line 1: Western Himalayan, Line 2: Module Name
  // So we swap the spans inside the title={<> ... </>} block.
  
  // This regex finds the two spans. Span 1 is the module name, Span 2 is "Western Himalayan".
  const headingRegex = /title=\{\s*<>\s*(<span className="block whitespace-nowrap[^>]*>(.*?)<\/span>)\s*(<span className="block whitespace-nowrap[^>]*bg-gradient[^>]*>(?:Western Himalayan|Western Himalayan Ecology|Greater Kashmir|Greater Kashmir Ecology|Ecology)<\/span>)\s*<\/>\s*\}/g;
  
  content = content.replace(headingRegex, (match, span1, moduleName, span2) => {
    // We want Western Himalayan first, then the Module Name
    // Let's modify span2 to just say "Western Himalayan"
    let newSpan2 = span2.replace(/>.*?</, '>Western Himalayan<');
    
    // We want Line 1 (Western Himalayan) to be normal white text (like span1 usually is)
    // and Line 2 (Module Name) to have the gradient (like span2 usually has)
    // Wait, let's just swap their positions and keep their original classNames, or apply gradient to Line 2.
    // The user just said: Line 1: Western Himalayan, Line 2: [Module Name].
    
    // We will strip the gradient from span2 and add it to span1
    // Actually, just extract the gradient classes.
    const gradientMatch = span2.match(/bg-gradient-to-r [^" ]+ [^" ]+ bg-clip-text text-transparent/);
    const gradientClasses = gradientMatch ? gradientMatch[0] : 'bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent';
    
    // Create new Line 1 (Western Himalayan)
    const line1 = `<span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Western Himalayan</span>`;
    
    // Create new Line 2 (Module Name) with gradient
    const line2 = `<span className="block whitespace-nowrap leading-[1.12] overflow-visible ${gradientClasses}">${moduleName.replace(/Across|Ecology/g, '').trim()}</span>`;
    
    return `title={<>\n            ${line1}\n            ${line2}\n          </>}`;
  });

  // Handle plain string titles: title="Birds Western Himalayan" -> title="Western Himalayan Birds"
  // Wait, our previous replace made it "title="Birds Western Himalayan""
  content = content.replace(/title="([^"]+) Western Himalayan"/g, 'title="Western Himalayan $1"');
  content = content.replace(/title="Western Himalayan ([^"]+) Western Himalayan"/g, 'title="Western Himalayan $1"');

  // Specific cleanups
  content = content.replace(/Observation Hotspots Western Himalayan/g, 'Western Himalayan Observation Hotspots');
  content = content.replace(/Birds Western Himalayan/g, 'Western Himalayan Birds');
  content = content.replace(/Endemic Species Western Himalayan/g, 'Western Himalayan Endemic Species');
  content = content.replace(/Aquatic Life Western Himalayan/g, 'Western Himalayan Aquatic Life');
  content = content.replace(/Forest Ecosystems Western Himalayan/g, 'Western Himalayan Forest Ecosystems');
  content = content.replace(/Habitat Signals Western Himalayan/g, 'Western Himalayan Habitat Signals');
  content = content.replace(/Mammals Western Himalayan/g, 'Western Himalayan Mammals');
  content = content.replace(/Medicinal Flora Western Himalayan/g, 'Western Himalayan Medicinal Flora');
  content = content.replace(/Migration Windows Western Himalayan/g, 'Western Himalayan Migration Windows');
  content = content.replace(/Biodiversity Western Himalayan/g, 'Western Himalayan Biodiversity');
  content = content.replace(/Species Western Himalayan/g, 'Western Himalayan Species');
  content = content.replace(/Phenology Records Western Himalayan/g, 'Western Himalayan Phenology Records');
  content = content.replace(/Flora Western Himalayan/g, 'Western Himalayan Flora');
  content = content.replace(/Pollinator Activity Western Himalayan/g, 'Western Himalayan Pollinator Activity');
  content = content.replace(/Seasonal Species Activity Western Himalayan/g, 'Western Himalayan Seasonal Species Activity');
  content = content.replace(/Threatened Species Western Himalayan/g, 'Western Himalayan Threatened Species');
  content = content.replace(/Wildlife Sightings Western Himalayan/g, 'Western Himalayan Wildlife Sightings');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
});
console.log('Update complete.');
