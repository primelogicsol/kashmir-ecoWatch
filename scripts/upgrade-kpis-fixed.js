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
    
    const mapRegex = /\{\s*\[[\s\S]*?\]\.map\(([^=]+)=>\s*\(/;
    const mapMatch = content.match(mapRegex);
    if (!mapMatch) {
      continue;
    }

    const mapStartIndex = mapMatch.index;
    const sectionIndex = content.lastIndexOf('<section', mapStartIndex);
    const gridIndex = content.lastIndexOf('<div className="grid', mapStartIndex);
    
    let containerStart = sectionIndex !== -1 && mapStartIndex - sectionIndex < 500 ? sectionIndex : gridIndex;
    let tagName = containerStart === sectionIndex ? 'section' : 'div';
    
    if (containerStart === -1) {
      console.log('Skipped', file, 'containerStart -1');
      continue;
    }

    const containerEnd = getClosingTag(content, containerStart, tagName);
    if (containerEnd === -1) {
      console.log('Skipped', file, 'containerEnd -1', tagName, containerStart);
      continue;
    }

    const bracketIndex = content.indexOf('[', mapStartIndex);
    const closeBracketIndex = getClosingBracket(content, bracketIndex);
    if (closeBracketIndex === -1) {
      console.log('Skipped', file, 'closeBracketIndex -1');
      continue;
    }

    const arrayStr = content.substring(bracketIndex, closeBracketIndex + 1);

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
  }
}
run();
