const fs = require('fs');
let code = fs.readFileSync('src/components/common/BiodiversityCategoryPage.tsx', 'utf8');
code = code.replace(
  /variant=\{pageNum === currentPage \? 'default' : 'ghost'\}/g,
  "variant={pageNum === currentPage ? 'primary' : 'ghost'}"
);
fs.writeFileSync('src/components/common/BiodiversityCategoryPage.tsx', code);
