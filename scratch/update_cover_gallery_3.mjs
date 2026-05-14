import fs from 'fs';

const filePath = 'src/data/galleries.js';
let content = fs.readFileSync(filePath, 'utf8');

// Current cover image
const oldCover = '/galleries/2026- ש.ב.ר רמות מנשה גלריה לאומנות/2026- ש.ב.ר רמות מנשה גלריה לאומנות/הזמנה של ש.ב.ר.jpg';
// New cover image
const newCover = '/galleries/2026- ש.ב.ר רמות מנשה גלריה לאומנות/2026- ש.ב.ר רמות מנשה גלריה לאומנות/שבר1.jpg';

content = content.split(oldCover).join(newCover);

fs.writeFileSync(filePath, content);
console.log('Successfully updated gallery cover image in galleries.js.');
