import fs from 'fs';

const filePath = 'src/data/galleries.js';
let content = fs.readFileSync(filePath, 'utf8');

const oldDesc = 'סדרת ציורים: ש.ב.ר 2026';
const newDesc = 'ש.ב.ר ונעקרת - תערוכת יחיד גלריה לאומנות רמות מנשה';

content = content.split(oldDesc).join(newDesc);

fs.writeFileSync(filePath, content);
console.log('Successfully updated gallery description in galleries.js.');
