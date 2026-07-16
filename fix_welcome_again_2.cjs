const fs = require('fs');
let code = fs.readFileSync('src/components/WelcomeScreen.tsx', 'utf8');
code = code.replace(/ease: \[0.25, 0.1, 0.25, 1\]/g, 'ease: [0.25, 0.1, 0.25, 1] as const');
fs.writeFileSync('src/components/WelcomeScreen.tsx', code);
