const fs = require('fs');
let code = fs.readFileSync('src/components/common/BiodiversityCategoryPage.tsx', 'utf8');
code = code.replace(/const \[drawerOpen, setDrawerOpen\] = useState\(false\);/, 'const [drawerOpen, setDrawerOpen] = useState(false);\n  const [currentPage, setCurrentPage] = useState(1);\n  const itemsPerPage = 9;');
fs.writeFileSync('src/components/common/BiodiversityCategoryPage.tsx', code);
