const fs = require('fs');
const glob = require('fast-glob');

function getClosingBrace(str, startIndex) {
  let depth = 0;
  for (let i = startIndex; i < str.length; i++) {
    if (str[i] === '{') depth++;
    else if (str[i] === '}') {
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
    
    // Find array mapping: { [ ... ].map(
    const mapMatch = content.match(/\{\s*(\[[^\]]*\]|\{\s*\[[\s\S]*?\]\s*\})\.map/);
    if (!mapMatch) {
      // It might be using a variable: metrics.map(
      if (content.includes('metrics.map(') && content.includes('<div className="grid grid-cols-')) {
        // Handle variable map later or just skip if it's already using metrics.
        // Actually, if it's already metrics.map, we can just replace the wrapper.
      }
      continue;
    }

    const mapStartIndex = mapMatch.index;
    
    // Search backward to find the wrapping container.
    // Usually it's <section> or <div className="grid...
    let containerStart = -1;
    let tagName = 'div';
    
    const sectionIndex = content.lastIndexOf('<section', mapStartIndex);
    const gridIndex = content.lastIndexOf('<div className="grid', mapStartIndex);
    const containerIndex = content.lastIndexOf('<div className="container', mapStartIndex);
    
    // If there's a section very close to the map, replace the section
    if (sectionIndex !== -1 && mapStartIndex - sectionIndex < 500) {
      containerStart = sectionIndex;
      tagName = 'section';
    } else if (containerIndex !== -1 && mapStartIndex - containerIndex < 200) {
      containerStart = containerIndex;
      tagName = 'div';
    } else {
      containerStart = gridIndex;
      tagName = 'div';
    }
    
    if (containerStart === -1) {
      console.log('Could not find wrapper for', file);
      continue;
    }

    const containerEnd = getClosingTag(content, containerStart, tagName);
    if (containerEnd === -1) {
      console.log('Could not find closing tag for', file);
      continue;
    }

    // Extract the array string
    // The mapMatch[1] might just be `[` if it matched greedily. Let's extract properly:
    const arrayMatch = content.match(/(\[\s*\{[\s\S]*?\}[,\s]*\])\.map/);
    let arrayStr = '[]';
    if (arrayMatch) {
      arrayStr = arrayMatch[1];
    } else {
      // Try to find it manually
      const bracketIndex = content.lastIndexOf('[', mapStartIndex + 10);
      const closeBracketIndex = getClosingBrace(content.replace(/\[/g, '{').replace(/\]/g, '}'), bracketIndex);
      arrayStr = content.substring(bracketIndex, closeBracketIndex + 1);
    }
    
    if (!arrayStr || arrayStr.length < 5) {
       console.log('Could not extract array for', file);
       continue;
    }

    const replacement = `<LiveMetricsBar metrics={${arrayStr}} />`;
    
    let newContent = content.substring(0, containerStart) + replacement + content.substring(containerEnd);
    
    // Add import if needed
    if (!newContent.includes('LiveMetricsBar')) {
      newContent = newContent.replace(
        "import { Heading } from '@/components/common/Heading';",
        "import { Heading } from '@/components/common/Heading';\nimport { LiveMetricsBar } from '@/components/common/LiveMetricsBar';"
      );
      // Fallback import injection
      if (!newContent.includes('LiveMetricsBar')) {
         newContent = newContent.replace(
           "import React",
           "import React from 'react';\nimport { LiveMetricsBar } from '@/components/common/LiveMetricsBar';\nimport React2"
         ).replace("import React2 from 'react';", "");
      }
    }
    
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Upgraded', file);
  }
}
run();
