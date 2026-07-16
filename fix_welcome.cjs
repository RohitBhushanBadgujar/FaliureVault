const fs = require('fs');
let code = fs.readFileSync('src/components/WelcomeScreen.tsx', 'utf8');
code = code.replace(/ease: \[0.16, 1, 0.3, 1\]/g, 'ease: "easeOut"');
fs.writeFileSync('src/components/WelcomeScreen.tsx', code);
