const fs = require('fs');
let code = fs.readFileSync('src/types.ts', 'utf8');
code = code.replace(
  "failureStage: 'Ideation' | 'MVP / Validation' | 'Early Traction' | 'Scale' | 'Mature Operational';",
  "failureStage: string;"
);
code = code.replace(
  "companyStatus?: 'Active' | 'Struggling' | 'Shut Down' | 'Acquired' | 'Merged' | 'Inactive' | 'Unknown';",
  "companyStatus?: string;"
);
fs.writeFileSync('src/types.ts', code);
