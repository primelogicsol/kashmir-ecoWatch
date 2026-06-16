const fs = require('fs');
const glob = require('fast-glob');

function getClosingBracket(str, startIndex) {
  let depth = 0;
  for (let i = startIndex; i < str.length; i++) {
    if (str[i] === '[') depth++;
    else if (str[i] === ']') {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function getClosingTag(str, startIndex, tagName) {
  let depth = 0;
  const tagRegex = new RegExp(`<\/?${tagName}[^>]*>`, 'g');
  tagRegex.lastIndex = startIndex;
  
  let match;
  while ((match = tagRegex.exec(str)) !== null) {
    if (match[0].startsWith(`</${tagName}`)) {
      depth--;
      if (depth === 0) return match.index + match[0].length;
    } else if (!match[0].endsWith('/>')) {
      depth++;
    }
  }
  return -1;
}

async function run() {
  const files = await glob('src/app/{water-systems,environmental-monitoring,field-reports,contribute-data,risk-monitoring,protected-areas}/**/page.tsx', { cwd: process.cwd() });
  
  for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('<LiveMetricsBar')) continue;

    // Search for <div className="grid grid-cols-... that is closely followed by .map
    const gridRegex = /<div className="grid grid-cols-[^>]+>/g;
    let gridMatch;
    let found = false;

    while ((gridMatch = gridRegex.exec(content)) !== null) {
      const gridIndex = gridMatch.index;
      const nextMapIndex = content.indexOf('.map(', gridIndex);
      
      // If there's a map within 1000 characters
      if (nextMapIndex !== -1 && nextMapIndex - gridIndex < 1000) {
        
        // Find the array definition before the map
        const bracketIndex = content.lastIndexOf('[', nextMapIndex);
        if (bracketIndex < gridIndex) continue;

        const closeBracketIndex = getClosingBracket(content, bracketIndex);
        if (closeBracketIndex === -1 || closeBracketIndex > nextMapIndex + 10) continue;

        const arrayStr = content.substring(bracketIndex, closeBracketIndex + 1);

        // Find container to replace
        const sectionIndex = content.lastIndexOf('<section', gridIndex);
        const containerIndex = content.lastIndexOf('<div className="container', gridIndex);
        
        let containerStart = gridIndex;
        let tagName = 'div';
        
        if (sectionIndex !== -1 && gridIndex - sectionIndex < 200) {
          containerStart = sectionIndex;
          tagName = 'section';
        } else if (containerIndex !== -1 && gridIndex - containerIndex < 100) {
           containerStart = containerIndex;
           tagName = 'div';
        }

        const containerEnd = getClosingTag(content, containerStart, tagName);
        if (containerEnd === -1) continue;

        const replacement = `<LiveMetricsBar metrics={${arrayStr}} />`;
        let newContent = content.substring(0, containerStart) + replacement + content.substring(containerEnd);
        
        if (!newContent.includes('LiveMetricsBar')) {
          if (newContent.includes("import { Heading }")) {
            newContent = newContent.replace(
              "import { Heading }",
              "import { LiveMetricsBar } from '@/components/common/LiveMetricsBar';\nimport { Heading }"
            );
          } else {
            newContent = newContent.replace(
              "import React",
              "import { LiveMetricsBar } from '@/components/common/LiveMetricsBar';\nimport React"
            );
          }
        }
        
        fs.writeFileSync(file, newContent, 'utf8');
        console.log('Upgraded', file);
        found = true;
        break; // Only replace the first match per file
      }
    }
  }
}
run();
