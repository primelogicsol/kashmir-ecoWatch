const fs = require('fs');
let code = fs.readFileSync('src/components/common/BiodiversityCard.tsx', 'utf8');

// Replace validationStatus checks
code = code.replace(
  /\(species as any\)\.validationStatus === 'Pending source validation'/g,
  "species.commonName === 'Pending Validation'"
);

fs.writeFileSync('src/components/common/BiodiversityCard.tsx', code);
