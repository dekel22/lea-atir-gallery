import fs from 'fs';

const filePath = 'src/data/galleries.js';
let content = fs.readFileSync(filePath, 'utf8');

const oldTitle = '2026- ש.ב.ר רמות מנשה גלריה לאומנות';
const newTitle = 'ש.ב.ר 2026';

// Only replace the title, NOT the paths (since rename failed)
content = content.split(oldTitle).join(newTitle);

fs.writeFileSync(filePath, content);
console.log('Successfully updated gallery title in galleries.js.');
