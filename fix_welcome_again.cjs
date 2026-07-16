const fs = require('fs');
let code = fs.readFileSync('src/components/WelcomeScreen.tsx', 'utf8');
// Framer Motion accepts standard easing strings in newer versions, but if typing requires an array or predefined function for strict Variants:
code = code.replace(/ease: "easeOut"/g, 'ease: [0.25, 0.1, 0.25, 1]');
fs.writeFileSync('src/components/WelcomeScreen.tsx', code);
