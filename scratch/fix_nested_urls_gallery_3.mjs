import fs from 'fs';

const filePath = 'src/data/galleries.js';
let content = fs.readFileSync(filePath, 'utf8');

// We need to fix the paths for gallery_3
// They currently look like /galleries/2026- ש.ב.ר רמות מנשה גלריה לאומנות/ש.ב.ר 2026/...
// They should look like /galleries/2026- ש.ב.ר רמות מנשה גלריה לאומנות/2026- ש.ב.ר רמות מנשה גלריה לאומנות/...

const badPath = '/galleries/2026- ש.ב.ר רמות מנשה גלריה לאומנות/ש.ב.ר 2026/';
const goodPath = '/galleries/2026- ש.ב.ר רמות מנשה גלריה לאומנות/2026- ש.ב.ר רמות מנשה גלריה לאומנות/';

content = content.split(badPath).join(goodPath);

// Also handle the cover image if it was broken
const badCover = '/galleries/ש.ב.ר 2026/ש.ב.ר 2026/';
content = content.split(badCover).join(goodPath);

fs.writeFileSync(filePath, content);
console.log('Fixed nested URLs for gallery_3.');
