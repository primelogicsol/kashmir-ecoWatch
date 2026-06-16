const fs = require('fs');
let code = fs.readFileSync('src/data/biodiversity.ts', 'utf8');

if (!code.includes('./species/birds')) {
  code = code.replace(/import type \{[\s\S]*?\} from '\.\.\/types\/biodiversity';/, match => match + "\nimport { birdsPhase1 } from './species/birds';");
  fs.writeFileSync('src/data/biodiversity.ts', code);
}
