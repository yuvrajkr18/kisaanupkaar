import fs from 'fs';
let content = fs.readFileSync('src/pages/Dashboard.tsx', 'utf8');
content = content.replace('>{t("next_actions")}</button>', '>{t("next_actions")}</h4>');
fs.writeFileSync('src/pages/Dashboard.tsx', content, 'utf8');
